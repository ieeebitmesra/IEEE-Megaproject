import type { MongoSampleData } from './sample-mongo'

// Declare global Mingo type (loaded via CDN)
declare global {
  interface Window {
    mingo: any
  }
}

// In-memory database storage
let collections: Record<string, Array<any>> = {}
const STORAGE_KEY = 'mongo-practice-db'

// Check if we're in browser environment
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

// Get Mingo from global window object (loaded via CDN)
function getMingo() {
  if (!isBrowser()) {
    throw new Error('Mingo requires browser environment')
  }

  if (typeof window === 'undefined' || !window.mingo) {
    throw new Error(
      'Mingo not loaded. Make sure the CDN script is included in your HTML.',
    )
  }

  return window.mingo
}

// Save collections to localStorage for persistence
function saveToStorage() {
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }
  }
}

// Load collections from localStorage
function loadFromStorage() {
  if (isBrowser()) {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        collections = JSON.parse(data)
      }
    } catch (e) {
      console.warn('Failed to load from localStorage:', e)
      collections = {}
    }
  }
}

// Reset/clear all collections
export async function resetMongo(): Promise<void> {
  if (!isBrowser()) {
    console.warn('resetMongo called in non-browser environment')
    return
  }

  collections = {}

  // Clear localStorage
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to clear localStorage:', e)
  }
}

// Load default sample data
export async function loadDefaultMongoData(
  data: MongoSampleData,
): Promise<void> {
  if (!isBrowser()) {
    throw new Error('Cannot load data in non-browser environment')
  }

  // Clear existing data
  collections = {}

  // Load data into memory
  for (const [collectionName, docs] of Object.entries(data.collections)) {
    if (Array.isArray(docs)) {
      // Deep clone to avoid reference issues
      collections[collectionName] = JSON.parse(JSON.stringify(docs))
    }
  }

  // Save to localStorage
  saveToStorage()
}

// Load custom data from JSON
export async function loadCustomMongoDataFromJSON(
  jsonText: string,
): Promise<void> {
  if (!isBrowser()) {
    throw new Error('Cannot load data in non-browser environment')
  }

  let parsed: any
  try {
    parsed = JSON.parse(jsonText)
  } catch (e) {
    throw new Error('Invalid JSON file. Please provide valid JSON.')
  }

  // Support either { collections: { name: docs[] } } or { name: docs[] } directly
  const inputCollections: Record<string, Array<unknown>> = parsed.collections ??
  parsed
  if (!inputCollections || typeof inputCollections !== 'object') {
    throw new Error(
      'JSON must be an object of collections mapping to arrays of documents.',
    )
  }

  for (const [k, v] of Object.entries(inputCollections)) {
    if (!Array.isArray(v)) {
      throw new Error(`Collection "${k}" must be an array of documents.`)
    }
  }

  // Clear existing data
  collections = {}

  // Load data into memory
  for (const [collectionName, docs] of Object.entries(inputCollections)) {
    collections[collectionName] = JSON.parse(JSON.stringify(docs))
  }

  // Save to localStorage
  saveToStorage()
}

// Infer type of a value
function inferType(value: any): string {
  if (value === null) return 'null'
  const t = typeof value
  if (t === 'number' && Number.isInteger(value)) return 'int'
  if (t === 'number') return 'double'
  if (t === 'string') return 'string'
  if (t === 'boolean') return 'bool'
  if (Array.isArray(value)) return 'array'
  if (t === 'object') return 'object'
  return t
}

// Get schema information for all collections
export async function getMongoSchemaJSON(): Promise<any> {
  if (!isBrowser()) return { collections: [] }

  // Load from storage if not in memory
  if (Object.keys(collections).length === 0) {
    loadFromStorage()
  }

  try {
    const collectionSchemas: Array<any> = []

    for (const [name, docs] of Object.entries(collections)) {
      try {
        const sampleDocs = docs.slice(0, 50)
        const fieldTypes: Record<string, Set<string>> = {}

        for (const doc of sampleDocs) {
          Object.keys(doc).forEach((k) => {
            const t = inferType(doc[k])
            if (!fieldTypes[k]) fieldTypes[k] = new Set()
            fieldTypes[k].add(t)
          })
        }

        const fields = Object.entries(fieldTypes).map(([k, set]) => ({
          name: k,
          types: Array.from(set).sort(),
        }))

        collectionSchemas.push({
          name,
          count: docs.length,
          fields,
        })
      } catch (e) {
        console.error(`Error getting schema for collection ${name}:`, e)
        collectionSchemas.push({ name, count: 0, fields: [], error: true })
      }
    }

    return { collections: collectionSchemas }
  } catch (e) {
    console.error('Error getting schema:', e)
    return { collections: [] }
  }
}

// List all collection names
export async function listCollections(): Promise<Array<string>> {
  if (!isBrowser()) return []

  // Load from storage if not in memory
  if (Object.keys(collections).length === 0) {
    loadFromStorage()
  }

  return Object.keys(collections)
}

// Execute a find query with optional projection, sort, skip, limit
export async function executeFindJSON(
  collectionName: string,
  queryJSON: string,
): Promise<Array<unknown>> {
  if (!isBrowser())
    throw new Error('Cannot execute queries in non-browser environment')

  // Load from storage if not in memory
  if (Object.keys(collections).length === 0) {
    loadFromStorage()
  }

  if (!collections[collectionName]) {
    throw new Error(
      `Collection "${collectionName}" not found. Load data first.`,
    )
  }

  const mingo = getMingo()
  const docs = collections[collectionName]

  let spec: any = {}
  if (queryJSON && queryJSON.trim().length) {
    try {
      spec = JSON.parse(queryJSON)
    } catch {
      throw new Error('Query must be valid JSON')
    }
  }

  const { filter = {}, projection, sort, skip = 0, limit } = spec

  // Use Mingo's find function
  const query = new mingo.Query(filter)
  let cursor = query.find(docs)

  // Apply sort
  if (sort) {
    cursor = cursor.sort(sort)
  }

  // Apply skip
  if (typeof skip === 'number' && skip > 0) {
    cursor = cursor.skip(skip)
  }

  // Apply limit
  if (typeof limit === 'number' && limit > 0) {
    cursor = cursor.limit(limit)
  }

  // Get results
  let results = cursor.all()

  // Apply projection if specified
  if (projection) {
    results = results.map((doc) => {
      const projected: any = {}
      const isInclusion = Object.values(projection).some(
        (v) => v === 1 || v === true,
      )

      if (isInclusion) {
        // Inclusion projection
        for (const [key, value] of Object.entries(projection)) {
          if (value === 1 || value === true) {
            projected[key] = doc[key]
          }
        }
      } else {
        // Exclusion projection
        Object.assign(projected, doc)
        for (const [key, value] of Object.entries(projection)) {
          if (value === 0 || value === false) {
            delete projected[key]
          }
        }
      }

      return projected
    })
  }

  return results
}

// Execute an aggregation pipeline
export async function executeAggregateJSON(
  collectionName: string,
  pipelineJSON: string,
): Promise<Array<unknown>> {
  if (!isBrowser())
    throw new Error('Cannot execute queries in non-browser environment')

  // Load from storage if not in memory
  if (Object.keys(collections).length === 0) {
    loadFromStorage()
  }

  if (!collections[collectionName]) {
    throw new Error(
      `Collection "${collectionName}" not found. Load data first.`,
    )
  }

  const mingo = getMingo()
  const docs = collections[collectionName]

  let pipeline: Array<any>
  try {
    const parsed = JSON.parse(pipelineJSON)
    if (!Array.isArray(parsed)) throw new Error('Pipeline must be a JSON array')
    pipeline = parsed
  } catch (e: any) {
    throw new Error(e?.message || 'Invalid pipeline JSON')
  }

  // Create options with collectionResolver for $lookup support
  const options = {
    collectionResolver: (name: string) => {
      return collections[name] || []
    },
  }

  // Use Mingo's Aggregator with options
  const aggregator = new mingo.Aggregator(pipeline, options)
  const results = aggregator.run(docs)

  return results
}

// Get all collections (for debugging/testing)
export function getCollections(): Record<string, Array<any>> {
  return collections
}
