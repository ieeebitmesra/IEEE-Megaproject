// Import sample data as raw string
import sampleDataSQL from './sample-data.sql?raw'

// Create and manage the PGlite worker
let worker: Worker | null = null
let messageId = 0
let initPromise: Promise<void> | null = null
let isInitialized = false
const pendingQueries = new Map<
  number,
  {
    resolve: (value: Array<unknown>) => void
    reject: (error: Error) => void
  }
>()

function getWorker(): Worker {
  if (!worker) {
    // Create the worker from the worker file
    worker = new Worker(new URL('./pglite.worker.ts', import.meta.url), {
      type: 'module',
    })

    // Handle messages from the worker
    worker.onmessage = (event: MessageEvent) => {
      const { id, success, data, error } = event.data
      const pending = pendingQueries.get(id)

      if (pending) {
        pendingQueries.delete(id)
        if (success) {
          pending.resolve(data)
        } else {
          pending.reject(new Error(error))
        }
      }
    }

    // Handle worker errors
    worker.onerror = (error) => {
      console.error('Worker error:', error)
      // Reject all pending queries
      pendingQueries.forEach(({ reject }) => {
        reject(new Error('Worker crashed'))
      })
      pendingQueries.clear()
    }
  }

  return worker
}

/**
 * Initialize the database (triggers OPFS loading)
 * Call this early to pre-load the database
 * This function is idempotent - multiple calls will return the same promise
 */
export async function initializeDatabase(): Promise<void> {
  // Return existing promise if initialization is in progress
  if (initPromise) {
    return initPromise
  }

  // Return immediately if already initialized
  if (isInitialized) {
    return Promise.resolve()
  }

  // Just mark as initialized without executing any SQL
  // This ensures the worker is ready but doesn't create OPFS yet
  isInitialized = true
  return Promise.resolve()
}

/**
 * Execute a SQL query using PGlite in a Web Worker with OPFS persistence
 * @param sql - The SQL query to execute
 * @returns Promise that resolves with query results
 */
export async function executeSQL(sql: string): Promise<Array<unknown>> {
  return new Promise((resolve, reject) => {
    const id = messageId++
    const workerInstance = getWorker()

    // Store the promise callbacks
    pendingQueries.set(id, { resolve, reject })

    // Determine if this is a query (SELECT) or exec (INSERT/UPDATE/DELETE/CREATE/etc)
    const trimmedSQL = sql.trim().toUpperCase()
    const isQuery =
      trimmedSQL.startsWith('SELECT') ||
      trimmedSQL.startsWith('WITH') ||
      trimmedSQL.startsWith('SHOW') ||
      trimmedSQL.startsWith('DESCRIBE') ||
      trimmedSQL.startsWith('EXPLAIN')

    // Send message to worker
    workerInstance.postMessage({
      id,
      type: isQuery ? 'query' : 'exec',
      sql,
    })

    // Set a timeout for the query
    setTimeout(() => {
      if (pendingQueries.has(id)) {
        pendingQueries.delete(id)
        reject(new Error('Query timeout after 30 seconds'))
      }
    }, 30000)
  })
}

/**
 * Get the database schema (tables and their columns)
 */
export async function getDatabaseSchema(): Promise<
  Array<{
    name: string
    columns: Array<{
      name: string
      type: string
      notnull: boolean
      default_value: string | null
      pk: number
    }>
  }>
> {
  try {
    // Get all tables (PostgreSQL syntax)
    const tablesResult = (await executeSQL(
      "SELECT tablename as name FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename",
    )) as Array<{ name: string }>

    // Get columns for each table
    const tables = await Promise.all(
      tablesResult.map(async (table) => {
        // Get column information using PostgreSQL information_schema
        const columnsResult = (await executeSQL(`
          SELECT 
            c.column_name as name,
            c.data_type as type,
            CASE WHEN c.is_nullable = 'NO' THEN 1 ELSE 0 END as notnull,
            c.column_default as default_value,
            CASE WHEN pk.column_name IS NOT NULL THEN 1 ELSE 0 END as pk
          FROM information_schema.columns c
          LEFT JOIN (
            SELECT ku.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage ku
              ON tc.constraint_name = ku.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
              AND tc.table_name = '${table.name}'
              AND tc.table_schema = 'public'
          ) pk ON c.column_name = pk.column_name
          WHERE c.table_name = '${table.name}'
            AND c.table_schema = 'public'
          ORDER BY c.ordinal_position
        `)) as Array<{
          name: string
          type: string
          notnull: number
          default_value: string | null
          pk: number
        }>

        return {
          name: table.name,
          columns: columnsResult.map((col) => ({
            name: col.name,
            type: col.type,
            notnull: col.notnull === 1,
            default_value: col.default_value,
            pk: col.pk,
          })),
        }
      }),
    )

    return tables
  } catch (error) {
    console.error('Error getting database schema:', error)
    return []
  }
}

/**
 * Load sample data from the sample-data.sql file
 */
export async function loadDefaultData(): Promise<void> {
  try {
    // Use the imported sample data SQL
    const sql = sampleDataSQL

    // Execute the entire SQL file as a batch to maintain transaction integrity
    await executeBatchSQL(sql)

    console.log('Default data loaded successfully')
  } catch (error) {
    console.error('Error loading default data:', error)
    throw error
  }
}

/**
 * Drop all user tables in the database
 */
async function dropAllTables(): Promise<void> {
  try {
    // Get all user tables (PostgreSQL syntax)
    const tablesResult = (await executeSQL(
      "SELECT tablename as name FROM pg_tables WHERE schemaname = 'public'",
    )) as Array<{ name: string }>

    if (tablesResult.length === 0) {
      console.log('No tables to drop')
      return
    }

    // Drop all tables with CASCADE to handle foreign keys
    for (const table of tablesResult) {
      await executeSQL(`DROP TABLE IF EXISTS "${table.name}" CASCADE`)
    }

    console.log('All tables dropped successfully')
  } catch (error) {
    // If error is about tables not existing, that's fine
    if (error instanceof Error && error.message.includes('does not exist')) {
      console.log('No tables exist to drop')
      return
    }
    console.error('Error dropping tables:', error)
    throw error
  }
}

/**
 * Load custom SQL data
 */
export async function loadCustomData(sql: string): Promise<void> {
  try {
    // Execute the entire SQL file as a batch to maintain transaction integrity
    await executeBatchSQL(sql)

    console.log('Custom data loaded successfully')
  } catch (error) {
    console.error('Error loading custom data:', error)
    throw error
  }
}

/**
 * Execute SQL as a batch (for loading data files)
 */
async function executeBatchSQL(sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = messageId++
    const workerInstance = getWorker()

    // Store the promise callbacks
    pendingQueries.set(id, {
      resolve: () => resolve(),
      reject,
    })

    // Send message to worker with batch type
    workerInstance.postMessage({
      id,
      type: 'batch',
      sql,
    })

    // Set a timeout for the query
    setTimeout(() => {
      if (pendingQueries.has(id)) {
        pendingQueries.delete(id)
        reject(new Error('Batch SQL timeout after 60 seconds'))
      }
    }, 60000)
  })
}

/**
 * Reset the entire database by clearing OPFS storage
 */
export async function resetDatabase(): Promise<void> {
  try {
    // Close current worker
    closeDatabase()

    // Try to clear OPFS storage
    try {
      const root = await navigator.storage.getDirectory()
      // @ts-ignore - removeEntry exists but types may not be complete
      await root.removeEntry('sqlpractice-db', { recursive: true })
      console.log('OPFS storage cleared')
    } catch (e) {
      // OPFS might not exist yet, which is fine
      console.log('No OPFS to clear or already cleared')
    }

    // Reinitialize
    isInitialized = false
    await initializeDatabase()
  } catch (error) {
    console.error('Error resetting database:', error)
    throw error
  }
}

/**
 * Close the worker and clean up resources
 */
export function closeDatabase(): void {
  if (worker) {
    worker.terminate()
    worker = null
    pendingQueries.clear()
    isInitialized = false
    initPromise = null
  }
}
