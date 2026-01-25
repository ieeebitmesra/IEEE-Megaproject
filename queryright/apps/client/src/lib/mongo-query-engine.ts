import dagre from 'dagre'
import { MarkerType } from 'reactflow'

// --- Types ---
export type FilterOperator =
  | '$eq'
  | '$ne'
  | '$gt'
  | '$lt'
  | '$gte'
  | '$lte'
  | '$regex'
  | '$in'
  | '$nin'
  | '$exists'
  | '$type'
  | '$elemMatch'
  | '$size'
  | '$all'
  | '$mod'

export type LogicalOperator = '$and' | '$or' | '$nor' | '$not'

export type LookupType = 'preserveNull' | 'unwind' // LEFT vs INNER behavior

export type SetOperation = '$union' | '$unionAll' | '$intersect' | '$subtract'

// MongoDB Accumulators
export type AggregateFunction =
  | '$count'
  | '$sum'
  | '$avg'
  | '$min'
  | '$max'
  | '$push'
  | '$addToSet'
  | '$first'
  | '$last'
  | '$stdDevPop'
  | '$stdDevSamp'

export type SortDirection = 1 | -1

export type FilterCondition = {
  id: string
  operator: FilterOperator
  value: string
  value2?: string
  logicalOperator?: LogicalOperator
}

export type FilterGroup = {
  id: string
  conditions: Array<FilterCondition>
  logicalOperator: LogicalOperator
  groups?: Array<FilterGroup>
}

export type Expression = {
  id: string
  name: string
  expression: string
  type: 'custom' | 'computed'
}

export type FieldRef = {
  collection: string
  field: string
  alias?: string
  accumulator?: AggregateFunction
  aggregate?: AggregateFunction // backward compat alias
  sort?: SortDirection
  sortOrder?: number
  filter?: FilterCondition // backward compat alias
  filterGroup?: FilterGroup // backward compat alias
  having?: FilterCondition // backward compat alias
  match?: FilterCondition
  matchGroup?: FilterGroup
  postMatch?: FilterCondition // For $match after $group (like HAVING)
  expression?: Expression
  isExpression?: boolean
}

// Keeping backward compat alias
export type ColumnRef = FieldRef & { table?: string; column?: string }

// Custom pipeline stages
export type UnwindStage = {
  id: string
  path: string
  preserveNullAndEmptyArrays: boolean
  includeArrayIndex?: string
}

export type AddFieldsStage = {
  id: string
  fields: Array<{ name: string; expression: string }>
}

export type SetStage = {
  id: string
  fields: Array<{ name: string; value: string }>
}

export type GroupStage = {
  id: string
  groupBy: Array<string> // Fields to group by (will be in _id)
  accumulators: Array<{
    name: string
    operator: AggregateFunction
    field: string
  }>
}

export type SortStage = {
  id: string
  sorts: Array<{ field: string; direction: SortDirection }>
}

export type ComputedField = {
  id: string
  name: string
  expression: string // MongoDB expression like { $add: ["$field1", "$field2"] }
  expressionType:
    | 'arithmetic'
    | 'string'
    | 'comparison'
    | 'logical'
    | 'date'
    | 'custom'
}

export type CustomStages = {
  unwind: Array<UnwindStage>
  addFields: Array<AddFieldsStage>
  set: Array<SetStage>
  group: Array<GroupStage>
  sort: Array<SortStage>
  computed: Array<ComputedField>
}

export type PipelineOptions = {
  distinct: boolean
  limit: number
  skip: number
  lookupType: LookupType
  customMatch?: string
  sampleSize?: number
  allowDiskUse?: boolean
  customStages?: CustomStages
  multiFieldSort?: boolean // Enable multi-field sorting
  useGroupStage?: boolean // Add explicit $group stages
}

export type QueryOptions = PipelineOptions & {
  joinType?: 'LEFT' | 'INNER' // backward compat
  offset?: number // backward compat
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
    accumulator?: AggregateFunction
    aggregate?: AggregateFunction
    sort?: SortDirection
    sortOrder?: number
    filter?: FilterCondition
    filterGroup?: FilterGroup
    having?: FilterCondition
    alias?: string
    window?: any
  }
}

// --- Schema Parsing ---
export const parseSchema = (text: string) => {
  const nodes: Array<any> = []
  const edges: Array<any> = []

  const collectionMatches = [
    ...text.matchAll(/(\w+)\s*(?:\[(.*?)\])?\s*\{([\s\S]*?)\}/g),
  ]
  const relMatches = [...text.matchAll(/(\w+)\.(\w+)\s*([><])\s*(\w+)\.(\w+)/g)]

  collectionMatches.forEach((match) => {
    const [_, collectionName, props, body] = match
    const styles: any = { color: '#10b981', icon: 'database' }
    if (props) {
      props.split(',').forEach((p) => {
        const [k, v] = p.split(':').map((s) => s.trim())
        if (k && v) styles[k] = v
      })
    }

    const fields = body
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('//'))
      .map((line) => {
        const parts = line.split(/\s+/)
        return {
          name: parts[0],
          type: parts[1] || 'String',
          isPk: parts.includes('pk') || parts[0] === '_id',
        }
      })

    nodes.push({
      id: collectionName,
      type: 'eraserTable',
      data: { label: collectionName, columns: fields, styles },
      position: { x: 0, y: 0 },
    })
  })

  relMatches.forEach((match, i) => {
    const [_, source, sourceField, direction, target, targetField] = match
    edges.push({
      id: `e-${i}`,
      source: direction === '>' ? source : target,
      target: direction === '>' ? target : source,
      sourceHandle: direction === '>' ? sourceField : targetField,
      targetHandle: direction === '>' ? targetField : sourceField,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#10b981',
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
  const nodeWidth = 320
  const nodeHeight = 400
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 160, nodesep: 100 })

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

// --- MongoDB Value Formatting ---
const formatMongoValue = (value: string, type: string = 'String'): any => {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null') return null
  if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed)
  if (trimmed.match(/^\d{4}-\d{2}-\d{2}/)) {
    return { $dateFromString: { dateString: trimmed } }
  }
  if (trimmed.startsWith('ObjectId(')) {
    return { $toObjectId: trimmed.replace(/ObjectId\(['"]?|['"]?\)/g, '') }
  }
  return trimmed
}

// --- Operator Mapping ---
const getMongoOperator = (op: FilterOperator, value: any): any => {
  switch (op) {
    case '$eq':
      return value
    case '$ne':
      return { $ne: value }
    case '$gt':
      return { $gt: value }
    case '$gte':
      return { $gte: value }
    case '$lt':
      return { $lt: value }
    case '$lte':
      return { $lte: value }
    case '$regex':
      return { $regex: value, $options: 'i' }
    case '$in': {
      const arr = Array.isArray(value)
        ? value
        : String(value)
            .split(',')
            .map((v) => formatMongoValue(v.trim()))
      return { $in: arr }
    }
    case '$nin': {
      const arr = Array.isArray(value)
        ? value
        : String(value)
            .split(',')
            .map((v) => formatMongoValue(v.trim()))
      return { $nin: arr }
    }
    case '$exists':
      return { $exists: value !== 'false' }
    case '$type':
      return { $type: value }
    case '$elemMatch': {
      try {
        return { $elemMatch: JSON.parse(value) }
      } catch {
        return { $elemMatch: { $eq: value } }
      }
    }
    case '$size':
      return { $size: Number(value) }
    case '$all': {
      const arr = Array.isArray(value)
        ? value
        : String(value)
            .split(',')
            .map((v) => formatMongoValue(v.trim()))
      return { $all: arr }
    }
    case '$mod': {
      const parts = String(value)
        .split(',')
        .map((v) => Number(v.trim()))
      return {
        $mod: parts.length === 2 ? parts : [parts[0] || 1, parts[1] || 0],
      }
    }
    default:
      return value
  }
}

// --- Aggregation Pipeline Generator ---
export const generateComplexQuery = (
  selectedFields: Array<ColumnRef>,
  edges: Array<SchemaEdge>,
  options: QueryOptions = {
    distinct: false,
    limit: 100,
    skip: 0,
    lookupType: 'unwind',
  },
): string => {
  // Normalize field references
  const fields = selectedFields.map((f) => ({
    ...f,
    collection: f.collection || f.table || '',
    field: f.field || f.column || '',
    accumulator: f.accumulator || f.aggregate,
    match: f.match || f.filter,
    postMatch: f.postMatch || f.having,
  }))

  if (fields.length === 0) {
    return '// Select fields from collections to build your aggregation pipeline\n// Click on field names to add them to the projection'
  }

  const activeCollections = Array.from(new Set(fields.map((f) => f.collection)))
  const primaryCollection = activeCollections[0]
  const graph = buildGraph(edges)
  const pipeline: Array<any> = []

  // Normalize options
  const skip = options.skip ?? options.offset ?? 0
  const lookupType =
    options.lookupType ??
    (options.joinType === 'LEFT' ? 'preserveNull' : 'unwind')

  // 1. $sample (if specified)
  if (options.sampleSize && options.sampleSize > 0) {
    pipeline.push({ $sample: { size: options.sampleSize } })
  }

  // 2. $lookup stages (joins)
  const joinedCollections = new Set([primaryCollection])

  for (const targetCollection of activeCollections) {
    if (joinedCollections.has(targetCollection)) continue

    let bestPath: any = null
    for (const startNode of Array.from(joinedCollections)) {
      const result = findPath(graph, startNode, targetCollection)
      if (result && (!bestPath || result.path.length < bestPath.path.length)) {
        bestPath = result
      }
    }

    if (bestPath) {
      const path = bestPath.path
      for (let i = 0; i < path.length - 1; i++) {
        const curr = path[i]
        const next = path[i + 1]
        if (joinedCollections.has(next)) continue

        const edge =
          bestPath.pathMap[`${curr}->${next}`] ||
          bestPath.pathMap[`${next}->${curr}`]
        const isSourceCurr = edge.source === curr
        const localField = isSourceCurr ? edge.sourceHandle : edge.targetHandle
        const foreignField = isSourceCurr
          ? edge.targetHandle
          : edge.sourceHandle

        const lookupLocalField =
          curr === primaryCollection ? localField : `${curr}.${localField}`

        pipeline.push({
          $lookup: {
            from: next,
            localField: lookupLocalField,
            foreignField: foreignField,
            as: next,
          },
        })

        pipeline.push({
          $unwind: {
            path: `$${next}`,
            preserveNullAndEmptyArrays: lookupType === 'preserveNull',
          },
        })

        joinedCollections.add(next)
      }
    }
  }

  // 3. Custom $unwind stages
  if (options.customStages?.unwind) {
    for (const unwindStage of options.customStages.unwind) {
      const unwindObj: any = {
        path: unwindStage.path.startsWith('$')
          ? unwindStage.path
          : `$${unwindStage.path}`,
        preserveNullAndEmptyArrays: unwindStage.preserveNullAndEmptyArrays,
      }
      if (unwindStage.includeArrayIndex) {
        unwindObj.includeArrayIndex = unwindStage.includeArrayIndex
      }
      pipeline.push({ $unwind: unwindObj })
    }
  }

  // 4. Custom $addFields stages
  if (options.customStages?.addFields) {
    for (const addFieldsStage of options.customStages.addFields) {
      const addFieldsObj: any = {}
      for (const field of addFieldsStage.fields) {
        try {
          addFieldsObj[field.name] = JSON.parse(field.expression)
        } catch {
          // If not valid JSON, treat as field reference or literal
          addFieldsObj[field.name] = field.expression.startsWith('$')
            ? field.expression
            : { $literal: field.expression }
        }
      }
      if (Object.keys(addFieldsObj).length > 0) {
        pipeline.push({ $addFields: addFieldsObj })
      }
    }
  }

  // 5. Custom $set stages
  if (options.customStages?.set) {
    for (const setStage of options.customStages.set) {
      const setObj: any = {}
      for (const field of setStage.fields) {
        try {
          setObj[field.name] = JSON.parse(field.value)
        } catch {
          // If not valid JSON, treat as field reference or literal
          setObj[field.name] = field.value.startsWith('$')
            ? field.value
            : field.value
        }
      }
      if (Object.keys(setObj).length > 0) {
        pipeline.push({ $set: setObj })
      }
    }
  }

  // 6. Computed Fields (before match)
  if (options.customStages?.computed) {
    const computedFields: any = {}
    for (const computed of options.customStages.computed) {
      try {
        const parsed = JSON.parse(computed.expression)
        computedFields[computed.name] = parsed
      } catch {
        // If not valid JSON, treat as field reference
        computedFields[computed.name] = computed.expression.startsWith('$')
          ? computed.expression
          : { $literal: computed.expression }
      }
    }
    if (Object.keys(computedFields).length > 0) {
      pipeline.push({ $addFields: computedFields })
    }
  }

  // 7. $match stage (pre-aggregation filters)
  const matchConditions: Array<any> = []
  fields.forEach((field) => {
    if (field.match && !field.accumulator) {
      const fieldPath =
        field.collection === primaryCollection
          ? field.field
          : `${field.collection}.${field.field}`
      const val = formatMongoValue(field.match.value)
      const condition: any = {}
      condition[fieldPath] = getMongoOperator(field.match.operator, val)
      matchConditions.push(condition)
    }
  })

  if (options.customMatch) {
    try {
      const custom = JSON.parse(options.customMatch)
      matchConditions.push(custom)
    } catch {
      // Invalid JSON ignored
    }
  }

  if (matchConditions.length > 0) {
    if (matchConditions.length === 1) {
      pipeline.push({ $match: matchConditions[0] })
    } else {
      pipeline.push({ $match: { $and: matchConditions } })
    }
  }

  // 8. Custom $group stages
  if (options.customStages?.group && options.customStages.group.length > 0) {
    for (const groupStage of options.customStages.group) {
      const groupObj: any = { _id: {} }

      // Build _id from groupBy fields
      if (groupStage.groupBy && groupStage.groupBy.length > 0) {
        groupStage.groupBy.forEach((field) => {
          const fieldName = field.replace(/^\$/, '')
          groupObj._id[fieldName] = field.startsWith('$') ? field : `$${field}`
        })
      } else {
        groupObj._id = null // Group all documents together
      }

      // Add accumulators
      for (const acc of groupStage.accumulators) {
        const fieldPath = acc.field.startsWith('$')
          ? acc.field
          : `$${acc.field}`
        groupObj[acc.name] =
          acc.operator === '$count'
            ? { $sum: 1 }
            : { [acc.operator]: fieldPath }
      }

      pipeline.push({ $group: groupObj })
    }
  }

  // 9. $group stage (from field-level accumulators)
  const hasAccumulator = fields.some((f) => f.accumulator)
  const hasGroupFields = fields.some((f) => !f.accumulator && !f.isExpression)

  if (hasAccumulator || options.distinct) {
    const groupStage: any = { _id: {} }
    const projectAfterGroup: any = { _id: 0 }

    if (options.distinct && !hasAccumulator) {
      fields.forEach((field) => {
        const fieldPath =
          field.collection === primaryCollection
            ? `$${field.field}`
            : `$${field.collection}.${field.field}`
        const keyName = field.alias || field.field
        groupStage._id[keyName] = fieldPath
        projectAfterGroup[keyName] = `$_id.${keyName}`
      })
    } else {
      fields.forEach((field) => {
        if (!field.accumulator) {
          const fieldPath =
            field.collection === primaryCollection
              ? `$${field.field}`
              : `$${field.collection}.${field.field}`
          const keyName = field.alias || field.field
          groupStage._id[keyName] = fieldPath
          projectAfterGroup[keyName] = `$_id.${keyName}`
        }
      })
    }

    fields.forEach((field) => {
      if (field.accumulator) {
        const fieldPath =
          field.collection === primaryCollection
            ? `$${field.field}`
            : `$${field.collection}.${field.field}`
        const outName =
          field.alias || `${field.accumulator.replace('$', '')}_${field.field}`

        if (field.accumulator === '$count') {
          groupStage[outName] = { $sum: 1 }
        } else {
          groupStage[outName] = { [field.accumulator]: fieldPath }
        }
        projectAfterGroup[outName] = 1
      }
    })

    if (Object.keys(groupStage._id).length === 0) {
      groupStage._id = null
    }

    pipeline.push({ $group: groupStage })
    pipeline.push({ $project: projectAfterGroup })
  } else {
    // 5. $project stage (no grouping)
    const projectStage: any = { _id: 0 }
    fields.forEach((field) => {
      if (field.isExpression && field.expression) {
        try {
          projectStage[field.alias || field.expression.name] = JSON.parse(
            field.expression.expression,
          )
        } catch {
          projectStage[field.alias || field.expression.name] =
            field.expression.expression
        }
      } else {
        const fieldPath =
          field.collection === primaryCollection
            ? `$${field.field}`
            : `$${field.collection}.${field.field}`
        projectStage[field.alias || field.field] = fieldPath
      }
    })
    pipeline.push({ $project: projectStage })
  }

  // 6. $match after $group (HAVING equivalent)
  const postMatchConditions: Array<any> = []
  fields.forEach((field) => {
    if (field.postMatch && field.accumulator) {
      const fieldName =
        field.alias || `${field.accumulator.replace('$', '')}_${field.field}`
      const val = formatMongoValue(field.postMatch.value)
      const condition: any = {}
      condition[fieldName] = getMongoOperator(field.postMatch.operator, val)
      postMatchConditions.push(condition)
    }
  })

  if (postMatchConditions.length > 0) {
    if (postMatchConditions.length === 1) {
      pipeline.push({ $match: postMatchConditions[0] })
    } else {
      pipeline.push({ $match: { $and: postMatchConditions } })
    }
  }

  // 10. Custom $sort stages (takes priority)
  if (options.customStages?.sort && options.customStages.sort.length > 0) {
    for (const sortStageConfig of options.customStages.sort) {
      const sortObj: any = {}
      for (const sort of sortStageConfig.sorts) {
        const fieldName = sort.field.startsWith('$')
          ? sort.field.slice(1)
          : sort.field
        sortObj[fieldName] = sort.direction
      }
      if (Object.keys(sortObj).length > 0) {
        pipeline.push({ $sort: sortObj })
      }
    }
  } else {
    // 11. $sort stage from field-level sorts
    const sortStage: any = {}
    const sortedFields = [...fields].sort(
      (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999),
    )

    sortedFields.forEach((field) => {
      if (field.sort) {
        let fieldName = field.alias || field.field
        if (field.accumulator) {
          fieldName =
            field.alias ||
            `${field.accumulator.replace('$', '')}_${field.field}`
        }
        sortStage[fieldName] = field.sort
      }
    })

    if (Object.keys(sortStage).length > 0) {
      pipeline.push({ $sort: sortStage })
    }
  }

  // 8. $skip and $limit
  if (skip > 0) {
    pipeline.push({ $skip: skip })
  }
  if (options.limit > 0) {
    pipeline.push({ $limit: options.limit })
  }

  // Format output
  const pipelineJson = JSON.stringify(pipeline, null, 2)
  return `db.${primaryCollection}.aggregate(${pipelineJson})`
}

// --- Syntax Highlighting ---
export const highlightMQL = (code: string): string => {
  // Use placeholders to protect our syntax highlighting from HTML escaping
  const PLACEHOLDER_START = '___SPAN_START___'
  const PLACEHOLDER_END = '___SPAN_END___'
  const PLACEHOLDER_CLOSE = '___SPAN_CLOSE___'

  const html = code
    // Apply syntax highlighting with placeholders
    .replace(
      /"([^"\\]*(\\.[^"\\]*)*)"/g,
      `${PLACEHOLDER_START}text-emerald-400${PLACEHOLDER_END}"$1"${PLACEHOLDER_CLOSE}`,
    )
    .replace(
      /\b(-?\d+\.?\d*)\b/g,
      `${PLACEHOLDER_START}text-amber-400${PLACEHOLDER_END}$1${PLACEHOLDER_CLOSE}`,
    )
    .replace(
      /\b(true|false|null)\b/g,
      `${PLACEHOLDER_START}text-sky-400${PLACEHOLDER_END}$1${PLACEHOLDER_CLOSE}`,
    )
    .replace(
      /(\$\w+)/g,
      `${PLACEHOLDER_START}text-violet-400 font-semibold${PLACEHOLDER_END}$1${PLACEHOLDER_CLOSE}`,
    )
    .replace(
      /\b(db)\.(\w+)\.(aggregate)/g,
      `${PLACEHOLDER_START}text-yellow-400 font-bold${PLACEHOLDER_END}$1${PLACEHOLDER_CLOSE}.${PLACEHOLDER_START}text-teal-400${PLACEHOLDER_END}$2${PLACEHOLDER_CLOSE}.${PLACEHOLDER_START}text-yellow-400 font-bold${PLACEHOLDER_END}$3${PLACEHOLDER_CLOSE}`,
    )
    // Now safe to escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Replace placeholders with actual HTML tags
    .replace(new RegExp(PLACEHOLDER_START, 'g'), '<span class="')
    .replace(new RegExp(PLACEHOLDER_END, 'g'), '">')
    .replace(new RegExp(PLACEHOLDER_CLOSE, 'g'), '</span>')

  return html
}

// Legacy alias
export const highlightSQL = highlightMQL

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 11)

// --- Filter Operators ---
export const FILTER_OPERATORS: Array<{
  value: FilterOperator
  label: string
  mongoLabel: string
  needsValue: boolean
}> = [
  { value: '$eq', label: 'Equals', mongoLabel: '$eq', needsValue: true },
  { value: '$ne', label: 'Not Equals', mongoLabel: '$ne', needsValue: true },
  { value: '$gt', label: 'Greater Than', mongoLabel: '$gt', needsValue: true },
  { value: '$lt', label: 'Less Than', mongoLabel: '$lt', needsValue: true },
  {
    value: '$gte',
    label: 'Greater or Equal',
    mongoLabel: '$gte',
    needsValue: true,
  },
  {
    value: '$lte',
    label: 'Less or Equal',
    mongoLabel: '$lte',
    needsValue: true,
  },
  {
    value: '$regex',
    label: 'Regex Match',
    mongoLabel: '$regex',
    needsValue: true,
  },
  { value: '$in', label: 'In Array', mongoLabel: '$in', needsValue: true },
  {
    value: '$nin',
    label: 'Not In Array',
    mongoLabel: '$nin',
    needsValue: true,
  },
  {
    value: '$exists',
    label: 'Field Exists',
    mongoLabel: '$exists',
    needsValue: false,
  },
  { value: '$type', label: 'Type Is', mongoLabel: '$type', needsValue: true },
  {
    value: '$elemMatch',
    label: 'Element Match',
    mongoLabel: '$elemMatch',
    needsValue: true,
  },
  {
    value: '$size',
    label: 'Array Size',
    mongoLabel: '$size',
    needsValue: true,
  },
  {
    value: '$all',
    label: 'Contains All',
    mongoLabel: '$all',
    needsValue: true,
  },
]

// --- Accumulator Functions ---
export const AGGREGATE_FUNCTIONS: Array<{
  value: AggregateFunction
  label: string
  description: string
}> = [
  { value: '$count', label: '$count', description: 'Count documents' },
  { value: '$sum', label: '$sum', description: 'Sum of values' },
  { value: '$avg', label: '$avg', description: 'Average value' },
  { value: '$min', label: '$min', description: 'Minimum value' },
  { value: '$max', label: '$max', description: 'Maximum value' },
  { value: '$push', label: '$push', description: 'Push to array' },
  {
    value: '$addToSet',
    label: '$addToSet',
    description: 'Add unique to array',
  },
  { value: '$first', label: '$first', description: 'First document value' },
  { value: '$last', label: '$last', description: 'Last document value' },
  {
    value: '$stdDevPop',
    label: '$stdDevPop',
    description: 'Population std dev',
  },
  { value: '$stdDevSamp', label: '$stdDevSamp', description: 'Sample std dev' },
]

// --- Lookup Types ---
export const LOOKUP_TYPES: Array<{
  value: LookupType
  label: string
  description: string
}> = [
  {
    value: 'unwind',
    label: 'Unwind (Inner)',
    description: 'Only matching documents',
  },
  {
    value: 'preserveNull',
    label: 'Preserve Null (Left)',
    description: 'Keep documents without matches',
  },
]

// Legacy alias
export const JOIN_TYPES = LOOKUP_TYPES.map((lt) => ({
  value: lt.value === 'unwind' ? ('INNER' as const) : ('LEFT' as const),
  label: lt.label,
  description: lt.description,
}))

// --- Set Operations ---
export const SET_OPERATIONS: Array<{
  value: SetOperation
  label: string
  description: string
}> = [
  {
    value: '$union',
    label: '$union',
    description: 'Combine results, remove duplicates',
  },
  {
    value: '$unionAll',
    label: '$unionAll',
    description: 'Combine results, keep duplicates',
  },
  {
    value: '$intersect',
    label: '$intersect',
    description: 'Only rows in both queries',
  },
  {
    value: '$subtract',
    label: '$subtract',
    description: 'Rows in first but not second',
  },
]

// --- MongoDB Expression Operators ---
export const ARITHMETIC_OPERATORS = [
  {
    value: '$add',
    label: '$add',
    description: 'Add numbers',
    example: '{ $add: ["$field1", "$field2"] }',
  },
  {
    value: '$subtract',
    label: '$subtract',
    description: 'Subtract numbers',
    example: '{ $subtract: ["$field1", "$field2"] }',
  },
  {
    value: '$multiply',
    label: '$multiply',
    description: 'Multiply numbers',
    example: '{ $multiply: ["$field1", "$field2"] }',
  },
  {
    value: '$divide',
    label: '$divide',
    description: 'Divide numbers',
    example: '{ $divide: ["$field1", "$field2"] }',
  },
  {
    value: '$mod',
    label: '$mod',
    description: 'Modulo operation',
    example: '{ $mod: ["$field1", 10] }',
  },
  {
    value: '$pow',
    label: '$pow',
    description: 'Exponentiation',
    example: '{ $pow: ["$field", 2] }',
  },
  {
    value: '$sqrt',
    label: '$sqrt',
    description: 'Square root',
    example: '{ $sqrt: "$field" }',
  },
  {
    value: '$abs',
    label: '$abs',
    description: 'Absolute value',
    example: '{ $abs: "$field" }',
  },
]

export const STRING_OPERATORS = [
  {
    value: '$concat',
    label: '$concat',
    description: 'Concatenate strings',
    example: '{ $concat: ["$firstName", " ", "$lastName"] }',
  },
  {
    value: '$substr',
    label: '$substr',
    description: 'Substring',
    example: '{ $substr: ["$field", 0, 5] }',
  },
  {
    value: '$toLower',
    label: '$toLower',
    description: 'Convert to lowercase',
    example: '{ $toLower: "$field" }',
  },
  {
    value: '$toUpper',
    label: '$toUpper',
    description: 'Convert to uppercase',
    example: '{ $toUpper: "$field" }',
  },
  {
    value: '$trim',
    label: '$trim',
    description: 'Trim whitespace',
    example: '{ $trim: { input: "$field" } }',
  },
  {
    value: '$strLen',
    label: '$strLen',
    description: 'String length',
    example: '{ $strLen: "$field" }',
  },
  {
    value: '$split',
    label: '$split',
    description: 'Split string',
    example: '{ $split: ["$field", ","] }',
  },
]

export const DATE_OPERATORS = [
  {
    value: '$year',
    label: '$year',
    description: 'Extract year',
    example: '{ $year: "$dateField" }',
  },
  {
    value: '$month',
    label: '$month',
    description: 'Extract month',
    example: '{ $month: "$dateField" }',
  },
  {
    value: '$dayOfMonth',
    label: '$dayOfMonth',
    description: 'Extract day',
    example: '{ $dayOfMonth: "$dateField" }',
  },
  {
    value: '$dayOfWeek',
    label: '$dayOfWeek',
    description: 'Day of week (1-7)',
    example: '{ $dayOfWeek: "$dateField" }',
  },
  {
    value: '$hour',
    label: '$hour',
    description: 'Extract hour',
    example: '{ $hour: "$dateField" }',
  },
  {
    value: '$dateToString',
    label: '$dateToString',
    description: 'Format date',
    example: '{ $dateToString: { format: "%Y-%m-%d", date: "$dateField" } }',
  },
  {
    value: '$dateDiff',
    label: '$dateDiff',
    description: 'Date difference',
    example:
      '{ $dateDiff: { startDate: "$date1", endDate: "$date2", unit: "day" } }',
  },
]

export const COMPARISON_OPERATORS = [
  {
    value: '$cmp',
    label: '$cmp',
    description: 'Compare values',
    example: '{ $cmp: ["$field1", "$field2"] }',
  },
  {
    value: '$eq',
    label: '$eq',
    description: 'Equal comparison',
    example: '{ $eq: ["$field", "value"] }',
  },
  {
    value: '$ne',
    label: '$ne',
    description: 'Not equal',
    example: '{ $ne: ["$field", "value"] }',
  },
  {
    value: '$gt',
    label: '$gt',
    description: 'Greater than',
    example: '{ $gt: ["$field", 100] }',
  },
  {
    value: '$gte',
    label: '$gte',
    description: 'Greater or equal',
    example: '{ $gte: ["$field", 100] }',
  },
  {
    value: '$lt',
    label: '$lt',
    description: 'Less than',
    example: '{ $lt: ["$field", 100] }',
  },
  {
    value: '$lte',
    label: '$lte',
    description: 'Less or equal',
    example: '{ $lte: ["$field", 100] }',
  },
]

export const LOGICAL_OPERATORS = [
  {
    value: '$and',
    label: '$and',
    description: 'Logical AND',
    example: '{ $and: [{ $gt: ["$field", 0] }, { $lt: ["$field", 100] }] }',
  },
  {
    value: '$or',
    label: '$or',
    description: 'Logical OR',
    example:
      '{ $or: [{ $eq: ["$status", "active"] }, { $eq: ["$status", "pending"] }] }',
  },
  {
    value: '$not',
    label: '$not',
    description: 'Logical NOT',
    example: '{ $not: [{ $eq: ["$field", "value"] }] }',
  },
  {
    value: '$cond',
    label: '$cond',
    description: 'Conditional (if-then-else)',
    example:
      '{ $cond: { if: { $gt: ["$qty", 100] }, then: "large", else: "small" } }',
  },
  {
    value: '$ifNull',
    label: '$ifNull',
    description: 'Replace null',
    example: '{ $ifNull: ["$field", "default"] }',
  },
  {
    value: '$switch',
    label: '$switch',
    description: 'Multi-case switch',
    example:
      '{ $switch: { branches: [{ case: { $gt: ["$score", 90] }, then: "A" }], default: "F" } }',
  },
]

export const ARRAY_OPERATORS = [
  {
    value: '$size',
    label: '$size',
    description: 'Array length',
    example: '{ $size: "$arrayField" }',
  },
  {
    value: '$arrayElemAt',
    label: '$arrayElemAt',
    description: 'Get array element',
    example: '{ $arrayElemAt: ["$arrayField", 0] }',
  },
  {
    value: '$slice',
    label: '$slice',
    description: 'Slice array',
    example: '{ $slice: ["$arrayField", 5] }',
  },
  {
    value: '$filter',
    label: '$filter',
    description: 'Filter array',
    example:
      '{ $filter: { input: "$items", as: "item", cond: { $gte: ["$$item.price", 100] } } }',
  },
  {
    value: '$map',
    label: '$map',
    description: 'Transform array',
    example: '{ $map: { input: "$items", as: "item", in: "$$item.name" } }',
  },
  {
    value: '$reduce',
    label: '$reduce',
    description: 'Reduce array',
    example:
      '{ $reduce: { input: "$items", initialValue: 0, in: { $add: ["$$value", "$$this"] } } }',
  },
  {
    value: '$concatArrays',
    label: '$concatArrays',
    description: 'Concatenate arrays',
    example: '{ $concatArrays: ["$array1", "$array2"] }',
  },
]
