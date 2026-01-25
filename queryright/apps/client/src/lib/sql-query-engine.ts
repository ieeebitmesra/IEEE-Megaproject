import dagre from 'dagre'
import { MarkerType } from 'reactflow'

// --- Types ---
export type FilterOperator =
  | '='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | 'LIKE'
  | 'NOT LIKE'
  | 'IN'
  | 'NOT IN'
  | 'BETWEEN'
  | 'IS NULL'
  | 'IS NOT NULL'
  | 'EXISTS'
  | 'NOT EXISTS'

export type LogicalOperator = 'AND' | 'OR'

export type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL' | 'CROSS'

export type AggregateFunction =
  | 'COUNT'
  | 'SUM'
  | 'AVG'
  | 'MIN'
  | 'MAX'
  | 'COUNT DISTINCT'

export type WindowFunction =
  | 'ROW_NUMBER'
  | 'RANK'
  | 'DENSE_RANK'
  | 'NTILE'
  | 'LAG'
  | 'LEAD'
  | 'FIRST_VALUE'
  | 'LAST_VALUE'

export type SortDirection = 'ASC' | 'DESC'

export type SetOperation = 'UNION' | 'UNION ALL' | 'INTERSECT' | 'EXCEPT'

export type FilterCondition = {
  id: string
  operator: FilterOperator
  value: string
  value2?: string
  logicalOperator?: LogicalOperator
  subqueryId?: string
}

export type FilterGroup = {
  id: string
  conditions: Array<FilterCondition>
  logicalOperator: LogicalOperator
  groups?: Array<FilterGroup>
}

export type WindowConfig = {
  function: WindowFunction
  partitionBy?: Array<string>
  orderBy?: Array<{ column: string; direction: SortDirection }>
  frameStart?: string
  frameEnd?: string
}

export type CaseWhen = {
  id: string
  conditions: Array<{
    when: string
    then: string
  }>
  elseValue?: string
}

export type Expression = {
  id: string
  name: string
  expression: string
  type: 'custom' | 'case' | 'window' | 'subquery'
  caseWhen?: CaseWhen
  window?: WindowConfig
  subqueryId?: string
}

export type ColumnRef = {
  table: string
  column: string
  alias?: string
  aggregate?: AggregateFunction
  sort?: SortDirection
  sortOrder?: number
  filter?: FilterCondition
  filterGroup?: FilterGroup
  having?: FilterCondition
  window?: WindowConfig
  expression?: Expression
  isExpression?: boolean
}

export type CTEDefinition = {
  id: string
  name: string
  columns: Array<ColumnRef>
  recursive?: boolean
}

export type SubqueryDefinition = {
  id: string
  name: string
  columns: Array<ColumnRef>
  asTable?: boolean
}

export type QueryOptions = {
  distinct: boolean
  limit: number
  offset: number
  joinType: JoinType
  setOperations?: Array<{
    type: SetOperation
    queryId: string
  }>
  ctes?: Array<CTEDefinition>
  subqueries?: Array<SubqueryDefinition>
  customWhere?: string
  groupByAll?: boolean
}

export type SchemaNode = {
  id: string
  columns: Array<{ name: string; type: string; isPk: boolean }>
}

export type SchemaEdge = {
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
}

export type ParsedColumn = {
  name: string
  type: string
  isPk: boolean
  state?: {
    selected: boolean
    aggregate?: AggregateFunction
    sort?: SortDirection
    sortOrder?: number
    filter?: FilterCondition
    filterGroup?: FilterGroup
    having?: FilterCondition
    alias?: string
    window?: WindowConfig
    expression?: Expression
  }
}

// --- Schema Parsing ---
export const parseSchema = (text: string) => {
  const nodes: Array<any> = []
  const edges: Array<any> = []

  const tableMatches = [
    ...text.matchAll(/(\w+)\s*(?:\[(.*?)\])?\s*\{([\s\S]*?)\}/g),
  ]
  const relMatches = [...text.matchAll(/(\w+)\.(\w+)\s*([><])\s*(\w+)\.(\w+)/g)]

  tableMatches.forEach((match) => {
    const [_, tableName, props, body] = match

    const styles: any = { color: '#10b981', icon: 'database' }
    if (props) {
      props.split(',').forEach((p) => {
        const [k, v] = p.split(':').map((s) => s.trim())
        if (k && v) styles[k] = v
      })
    }

    const columns = body
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('//'))
      .map((line) => {
        const parts = line.split(/\s+/)
        return {
          name: parts[0],
          type: parts[1] || 'string',
          isPk: parts.includes('pk'),
        }
      })

    nodes.push({
      id: tableName,
      type: 'eraserTable',
      data: { label: tableName, columns, styles },
      position: { x: 0, y: 0 },
    })
  })

  relMatches.forEach((match, i) => {
    const [_, source, sourceCol, direction, target, targetCol] = match
    edges.push({
      id: `e-${i}`,
      source: direction === '>' ? source : target,
      target: direction === '>' ? target : source,
      sourceHandle: direction === '>' ? sourceCol : targetCol,
      targetHandle: direction === '>' ? targetCol : sourceCol,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#71717a', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#71717a',
        width: 20,
        height: 20,
      },
    })
  })

  return { nodes, edges }
}

export const getLayoutedElements = (nodes: Array<any>, edges: Array<any>) => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const nodeWidth = 300
  const nodeHeight = 350

  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 140, nodesep: 80 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  return { nodes: layoutedNodes, edges }
}

// --- Graph Algorithms ---
const buildGraph = (edges: Array<SchemaEdge>) => {
  const adj: Record<string, Array<{ to: string; via: SchemaEdge }>> = {}
  edges.forEach((edge) => {
    if (!adj[edge.source]) adj[edge.source] = []
    if (!adj[edge.target]) adj[edge.target] = []
    adj[edge.source].push({ to: edge.target, via: edge })
    adj[edge.target].push({ to: edge.source, via: edge })
  })
  return adj
}

const findPath = (graph: any, start: string, end: string) => {
  const queue = [[start]]
  const visited = new Set([start])
  const pathMap: Record<string, SchemaEdge> = {}

  while (queue.length > 0) {
    const path = queue.shift()!
    const node = path[path.length - 1]

    if (node === end) return { path, pathMap }

    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor.to)) {
          visited.add(neighbor.to)
          pathMap[`${node}->${neighbor.to}`] = neighbor.via
          queue.push([...path, neighbor.to])
        }
      }
    }
  }
  return null
}

// --- Filter Value Formatting ---
const formatFilterValue = (
  value: string,
  operator: FilterOperator,
  value2?: string,
): string => {
  if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
    return ''
  }

  if (operator === 'EXISTS' || operator === 'NOT EXISTS') {
    return value // value is a subquery
  }

  if (operator === 'IN' || operator === 'NOT IN') {
    // Check if value looks like a subquery
    if (value.trim().toUpperCase().startsWith('SELECT')) {
      return `(${value})`
    }
    const values = value.split(',').map((v) => {
      const trimmed = v.trim()
      return !isNaN(Number(trimmed)) ? trimmed : `'${trimmed}'`
    })
    return `(${values.join(', ')})`
  }

  if (operator === 'BETWEEN') {
    const v1 = !isNaN(Number(value)) ? value : `'${value}'`
    const v2 = !isNaN(Number(value2)) ? value2 : `'${value2}'`
    return `${v1} AND ${v2}`
  }

  if (operator === 'LIKE' || operator === 'NOT LIKE') {
    return `'${value}'`
  }

  return !isNaN(Number(value)) ? value : `'${value}'`
}

// --- Filter Group to SQL ---
const filterGroupToSQL = (group: FilterGroup, tablePrefix?: string): string => {
  const parts: Array<string> = []

  group.conditions.forEach((cond, idx) => {
    let condSQL = ''
    const colExpr = tablePrefix ? `${tablePrefix}.${cond.value}` : cond.value

    if (cond.operator === 'IS NULL' || cond.operator === 'IS NOT NULL') {
      condSQL = `${colExpr} ${cond.operator}`
    } else if (cond.operator === 'EXISTS' || cond.operator === 'NOT EXISTS') {
      condSQL = `${cond.operator} (${cond.value})`
    } else {
      condSQL = `${colExpr} ${cond.operator} ${formatFilterValue(cond.value, cond.operator, cond.value2)}`
    }

    if (idx > 0) {
      parts.push(cond.logicalOperator || 'AND')
    }
    parts.push(condSQL)
  })

  if (group.groups) {
    group.groups.forEach((subGroup, idx) => {
      if (parts.length > 0 || idx > 0) {
        parts.push(group.logicalOperator)
      }
      parts.push(`(${filterGroupToSQL(subGroup, tablePrefix)})`)
    })
  }

  return parts.join(' ')
}

// --- Window Function to SQL ---
const windowToSQL = (window: WindowConfig, _columnExpr: string): string => {
  let sql = `${window.function}()`

  sql += ' OVER ('

  if (window.partitionBy && window.partitionBy.length > 0) {
    sql += `PARTITION BY ${window.partitionBy.join(', ')}`
  }

  if (window.orderBy && window.orderBy.length > 0) {
    if (window.partitionBy && window.partitionBy.length > 0) sql += ' '
    sql += `ORDER BY ${window.orderBy.map((o) => `${o.column} ${o.direction}`).join(', ')}`
  }

  if (window.frameStart || window.frameEnd) {
    sql += ` ROWS BETWEEN ${window.frameStart || 'UNBOUNDED PRECEDING'} AND ${window.frameEnd || 'CURRENT ROW'}`
  }

  sql += ')'

  return sql
}

// --- CASE WHEN to SQL ---
const caseWhenToSQL = (caseWhen: CaseWhen): string => {
  let sql = 'CASE'

  caseWhen.conditions.forEach((cond) => {
    sql += ` WHEN ${cond.when} THEN ${cond.then}`
  })

  if (caseWhen.elseValue) {
    sql += ` ELSE ${caseWhen.elseValue}`
  }

  sql += ' END'

  return sql
}

// --- Main SQL Generator ---
export const generateComplexQuery = (
  selectedCols: Array<ColumnRef>,
  edges: Array<SchemaEdge>,
  options: QueryOptions = {
    distinct: false,
    limit: 100,
    offset: 0,
    joinType: 'INNER',
  },
) => {
  if (selectedCols.length === 0) {
    return '-- Click columns in the diagram to build your query\n-- Right-click columns for aggregate, filter, sort options\n-- Use the Options panel for advanced query features'
  }

  const activeTables = new Set<string>()
  selectedCols.forEach((c) => {
    if (!c.isExpression) activeTables.add(c.table)
  })
  const tablesArray = Array.from(activeTables)

  if (tablesArray.length === 0 && selectedCols.every((c) => c.isExpression)) {
    // Expression-only query
    const selectParts = selectedCols.map((col) => {
      if (col.expression) {
        if (col.expression.type === 'case' && col.expression.caseWhen) {
          return `${caseWhenToSQL(col.expression.caseWhen)}${col.alias ? ` AS "${col.alias}"` : ''}`
        }
        return `${col.expression.expression}${col.alias ? ` AS "${col.alias}"` : ''}`
      }
      return col.column
    })
    return `SELECT\n  ${selectParts.join(',\n  ')};`
  }

  if (tablesArray.length === 0) return ''

  const primaryTable = tablesArray[0]
  const graph = buildGraph(edges)

  // Build CTEs
  let cteSection = ''
  if (options.ctes && options.ctes.length > 0) {
    const cteParts = options.ctes.map((cte) => {
      const cteSQL = generateComplexQuery(cte.columns, edges, {
        ...options,
        ctes: undefined,
      })
      return `${cte.name} AS (\n${cteSQL
        .replace(/;$/, '')
        .split('\n')
        .map((l) => '  ' + l)
        .join('\n')}\n)`
    })
    cteSection = `WITH${options.ctes.some((c) => c.recursive) ? ' RECURSIVE' : ''}\n${cteParts.join(',\n')}\n\n`
  }

  // Build JOINs
  const joinClauses: Array<string> = []
  const joinedTables = new Set([primaryTable])
  const joinWarnings: Array<string> = []

  for (const targetTable of tablesArray) {
    if (joinedTables.has(targetTable)) continue

    if (options.joinType === 'CROSS') {
      joinClauses.push(`CROSS JOIN ${targetTable}`)
      joinedTables.add(targetTable)
      continue
    }

    let bestPath: any = null

    for (const startNode of Array.from(joinedTables)) {
      const result = findPath(graph, startNode, targetTable)
      if (result && (!bestPath || result.path.length < bestPath.path.length)) {
        bestPath = result
      }
    }

    if (bestPath) {
      const path = bestPath.path
      for (let i = 0; i < path.length - 1; i++) {
        const curr = path[i]
        const next = path[i + 1]
        if (joinedTables.has(next)) continue

        const edge =
          bestPath.pathMap[`${curr}->${next}`] ||
          bestPath.pathMap[`${next}->${curr}`]
        if (edge) {
          const joinCond =
            edge.source === curr
              ? `${edge.source}.${edge.sourceHandle} = ${edge.target}.${edge.targetHandle}`
              : `${edge.target}.${edge.targetHandle} = ${edge.source}.${edge.sourceHandle}`

          joinClauses.push(`${options.joinType} JOIN ${next} ON ${joinCond}`)
          joinedTables.add(next)
        }
      }
    } else {
      joinWarnings.push(
        `-- ⚠ No relationship found for table "${targetTable}" - using CROSS JOIN`,
      )
      joinClauses.push(`CROSS JOIN ${targetTable}`)
      joinedTables.add(targetTable)
    }
  }

  // Build SELECT
  const hasAggregate = selectedCols.some((c) => c.aggregate)
  const hasWindow = selectedCols.some((c) => c.window)
  const selectParts: Array<string> = []
  const groupByParts: Array<string> = []
  const orderByParts: Array<string> = []
  const whereParts: Array<string> = []
  const havingParts: Array<string> = []

  // Sort columns by sortOrder for ORDER BY
  const sortedCols = [...selectedCols].sort(
    (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999),
  )

  selectedCols.forEach((col) => {
    let expr = col.isExpression ? '' : `${col.table}.${col.column}`

    // Handle expressions
    if (col.expression) {
      if (col.expression.type === 'case' && col.expression.caseWhen) {
        expr = caseWhenToSQL(col.expression.caseWhen)
      } else if (col.expression.type === 'window' && col.expression.window) {
        expr = windowToSQL(col.expression.window, expr)
      } else if (col.expression.type === 'custom') {
        expr = col.expression.expression
      }
    } else if (col.window) {
      // Window function on column
      expr = windowToSQL(col.window, expr)
    } else if (col.aggregate) {
      if (col.aggregate === 'COUNT DISTINCT') {
        expr = `COUNT(DISTINCT ${expr})`
      } else {
        expr = `${col.aggregate}(${expr})`
      }
    }

    if (col.alias) {
      expr += ` AS "${col.alias}"`
    }

    selectParts.push(expr)

    // Group By (non-aggregated, non-window columns when aggregation exists)
    if (
      (hasAggregate || hasWindow) &&
      !col.aggregate &&
      !col.window &&
      !col.expression?.window &&
      !col.isExpression
    ) {
      if (!options.groupByAll) {
        groupByParts.push(`${col.table}.${col.column}`)
      }
    }

    // Where (pre-aggregation filters)
    if (col.filter && !col.aggregate) {
      const { operator, value, value2 } = col.filter
      const colExpr = `${col.table}.${col.column}`

      if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
        whereParts.push(`${colExpr} ${operator}`)
      } else if (operator === 'EXISTS' || operator === 'NOT EXISTS') {
        whereParts.push(`${operator} (${value})`)
      } else {
        whereParts.push(
          `${colExpr} ${operator} ${formatFilterValue(value, operator, value2)}`,
        )
      }
    }

    // Handle filter groups (complex AND/OR conditions)
    if (col.filterGroup) {
      whereParts.push(`(${filterGroupToSQL(col.filterGroup, col.table)})`)
    }

    // Having (post-aggregation filters)
    if (col.having && col.aggregate) {
      const { operator, value, value2 } = col.having
      const aggExpr =
        col.aggregate === 'COUNT DISTINCT'
          ? `COUNT(DISTINCT ${col.table}.${col.column})`
          : `${col.aggregate}(${col.table}.${col.column})`

      if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
        havingParts.push(`${aggExpr} ${operator}`)
      } else {
        havingParts.push(
          `${aggExpr} ${operator} ${formatFilterValue(value, operator, value2)}`,
        )
      }
    }
  })

  // Custom WHERE clause
  if (options.customWhere) {
    whereParts.push(options.customWhere)
  }

  // Order By
  sortedCols.forEach((col) => {
    if (col.sort) {
      if (col.window) {
        // Can't order by window function directly, use alias or expression
        if (col.alias) {
          orderByParts.push(`"${col.alias}" ${col.sort}`)
        }
      } else if (col.aggregate) {
        const aggExpr =
          col.aggregate === 'COUNT DISTINCT'
            ? `COUNT(DISTINCT ${col.table}.${col.column})`
            : `${col.aggregate}(${col.table}.${col.column})`
        orderByParts.push(`${aggExpr} ${col.sort}`)
      } else if (!col.isExpression) {
        orderByParts.push(`${col.table}.${col.column} ${col.sort}`)
      } else if (col.alias) {
        orderByParts.push(`"${col.alias}" ${col.sort}`)
      }
    }
  })

  // Assemble SQL
  let sql = ''

  // CTEs first
  sql += cteSection

  if (joinWarnings.length) {
    sql += joinWarnings.join('\n') + '\n\n'
  }

  sql += `SELECT${options.distinct ? ' DISTINCT' : ''}\n  ${selectParts.join(',\n  ')}\nFROM ${primaryTable}`

  if (joinClauses.length) {
    sql += `\n${joinClauses.join('\n')}`
  }

  if (whereParts.length) {
    sql += `\nWHERE ${whereParts.join('\n  AND ')}`
  }

  if (groupByParts.length) {
    sql += `\nGROUP BY ${options.groupByAll ? 'ALL' : groupByParts.join(', ')}`
  }

  if (havingParts.length) {
    sql += `\nHAVING ${havingParts.join('\n  AND ')}`
  }

  if (orderByParts.length) {
    sql += `\nORDER BY ${orderByParts.join(', ')}`
  }

  if (options.limit > 0) {
    sql += `\nLIMIT ${options.limit}`
  }

  if (options.offset > 0) {
    sql += ` OFFSET ${options.offset}`
  }

  sql += ';'

  // Handle SET operations (UNION, INTERSECT, EXCEPT)
  if (options.setOperations && options.setOperations.length > 0) {
    let mainQuery = sql.replace(/;$/, '')
    options.setOperations.forEach((op) => {
      mainQuery += `\n\n${op.type}\n\n-- Add second query here for ${op.type}`
    })
    sql = mainQuery + ';'
  }

  return sql
}

// --- SQL Syntax Highlighting ---
export const highlightSQL = (sql: string): string => {
  const keywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'JOIN',
    'INNER',
    'LEFT',
    'RIGHT',
    'FULL',
    'OUTER',
    'CROSS',
    'ON',
    'AND',
    'OR',
    'NOT',
    'IN',
    'BETWEEN',
    'LIKE',
    'IS',
    'NULL',
    'AS',
    'GROUP',
    'BY',
    'HAVING',
    'ORDER',
    'ASC',
    'DESC',
    'LIMIT',
    'OFFSET',
    'DISTINCT',
    'COUNT',
    'SUM',
    'AVG',
    'MIN',
    'MAX',
    'CASE',
    'WHEN',
    'THEN',
    'ELSE',
    'END',
    'WITH',
    'RECURSIVE',
    'UNION',
    'ALL',
    'INTERSECT',
    'EXCEPT',
    'EXISTS',
    'OVER',
    'PARTITION',
    'ROWS',
    'RANGE',
    'UNBOUNDED',
    'PRECEDING',
    'FOLLOWING',
    'CURRENT',
    'ROW',
    'ROW_NUMBER',
    'RANK',
    'DENSE_RANK',
    'NTILE',
    'LAG',
    'LEAD',
    'FIRST_VALUE',
    'LAST_VALUE',
    'COALESCE',
    'NULLIF',
    'CAST',
    'CONVERT',
    'SUBSTRING',
    'TRIM',
    'UPPER',
    'LOWER',
    'DATE',
    'TIME',
    'TIMESTAMP',
    'INTERVAL',
    'EXTRACT',
    'TRUE',
    'FALSE',
  ]

  let highlighted = sql

  // Highlight comments
  highlighted = highlighted.replace(
    /(--.*)/g,
    '<span class="sql-comment">$1</span>',
  )

  // Highlight strings
  highlighted = highlighted.replace(
    /'([^']*)'/g,
    '<span class="sql-string">\'$1\'</span>',
  )

  // Highlight numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="sql-number">$1</span>',
  )

  // Highlight keywords (case insensitive)
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
    highlighted = highlighted.replace(
      regex,
      '<span class="sql-keyword">$1</span>',
    )
  })

  return highlighted
}

// --- Export Helpers ---
export const FILTER_OPERATORS: Array<{
  value: FilterOperator
  label: string
  needsValue: boolean
  needsSecondValue: boolean
  description?: string
}> = [
  {
    value: '=',
    label: 'Equals (=)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: '!=',
    label: 'Not Equals (!=)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: '>',
    label: 'Greater Than (>)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: '<',
    label: 'Less Than (<)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: '>=',
    label: 'Greater or Equal (>=)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: '<=',
    label: 'Less or Equal (<=)',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: 'LIKE',
    label: 'Like (LIKE)',
    needsValue: true,
    needsSecondValue: false,
    description: 'Use % as wildcard',
  },
  {
    value: 'NOT LIKE',
    label: 'Not Like',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: 'IN',
    label: 'In List (IN)',
    needsValue: true,
    needsSecondValue: false,
    description: 'Comma-separated or subquery',
  },
  {
    value: 'NOT IN',
    label: 'Not In List',
    needsValue: true,
    needsSecondValue: false,
  },
  {
    value: 'BETWEEN',
    label: 'Between',
    needsValue: true,
    needsSecondValue: true,
  },
  {
    value: 'IS NULL',
    label: 'Is Null',
    needsValue: false,
    needsSecondValue: false,
  },
  {
    value: 'IS NOT NULL',
    label: 'Is Not Null',
    needsValue: false,
    needsSecondValue: false,
  },
  {
    value: 'EXISTS',
    label: 'Exists (subquery)',
    needsValue: true,
    needsSecondValue: false,
    description: 'Check subquery returns rows',
  },
  {
    value: 'NOT EXISTS',
    label: 'Not Exists',
    needsValue: true,
    needsSecondValue: false,
  },
]

export const AGGREGATE_FUNCTIONS: Array<{
  value: AggregateFunction
  label: string
  description?: string
}> = [
  { value: 'COUNT', label: 'COUNT', description: 'Count rows' },
  {
    value: 'COUNT DISTINCT',
    label: 'COUNT DISTINCT',
    description: 'Count unique values',
  },
  { value: 'SUM', label: 'SUM', description: 'Sum of values' },
  { value: 'AVG', label: 'AVG', description: 'Average value' },
  { value: 'MIN', label: 'MIN', description: 'Minimum value' },
  { value: 'MAX', label: 'MAX', description: 'Maximum value' },
]

export const WINDOW_FUNCTIONS: Array<{
  value: WindowFunction
  label: string
  description: string
}> = [
  {
    value: 'ROW_NUMBER',
    label: 'ROW_NUMBER',
    description: 'Unique row number',
  },
  { value: 'RANK', label: 'RANK', description: 'Rank with gaps' },
  {
    value: 'DENSE_RANK',
    label: 'DENSE_RANK',
    description: 'Rank without gaps',
  },
  { value: 'NTILE', label: 'NTILE', description: 'Divide into N buckets' },
  { value: 'LAG', label: 'LAG', description: 'Previous row value' },
  { value: 'LEAD', label: 'LEAD', description: 'Next row value' },
  {
    value: 'FIRST_VALUE',
    label: 'FIRST_VALUE',
    description: 'First value in window',
  },
  {
    value: 'LAST_VALUE',
    label: 'LAST_VALUE',
    description: 'Last value in window',
  },
]

export const SET_OPERATIONS: Array<{
  value: SetOperation
  label: string
  description: string
}> = [
  {
    value: 'UNION',
    label: 'UNION',
    description: 'Combine results, remove duplicates',
  },
  {
    value: 'UNION ALL',
    label: 'UNION ALL',
    description: 'Combine results, keep duplicates',
  },
  {
    value: 'INTERSECT',
    label: 'INTERSECT',
    description: 'Only rows in both queries',
  },
  {
    value: 'EXCEPT',
    label: 'EXCEPT',
    description: 'Rows in first but not second',
  },
]

export const JOIN_TYPES: Array<{
  value: JoinType
  label: string
  description: string
}> = [
  { value: 'INNER', label: 'INNER', description: 'Only matching rows' },
  { value: 'LEFT', label: 'LEFT', description: 'All from left + matches' },
  { value: 'RIGHT', label: 'RIGHT', description: 'All from right + matches' },
  { value: 'FULL', label: 'FULL', description: 'All rows from both' },
  { value: 'CROSS', label: 'CROSS', description: 'Cartesian product' },
]

// UUID generator for unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}
