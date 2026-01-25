export type QueryType = 'sql' | 'mongodb'
export type Difficulty = 'basic' | 'intermediate' | 'advanced'

export interface Query {
  id: string
  text: string
  type: QueryType
  difficulty: Difficulty
  charCount: number
}

// --- 1. The Ingredients ---
const RESOURCES = {
  tables: [
    'users',
    'products',
    'orders',
    'employees',
    'departments',
    'transactions',
    'logs',
    'audit_trail',
    'inventory',
    'payments',
  ],
  columns: [
    'id',
    'name',
    'email',
    'status',
    'created_at',
    'updated_at',
    'amount',
    'quantity',
    'price',
    'category',
    'role',
    'active',
    'priority',
  ],
  values: [
    "'active'",
    "'pending'",
    '100',
    'true',
    'false',
    "'admin'",
    "'user'",
    'NULL',
    "'2024-01-01'",
    '5000',
    "'completed'",
  ],
  mongoCollections: [
    'users',
    'products',
    'orders',
    'logs',
    'events',
    'devices',
    'sessions',
    'carts',
    'invoices',
  ],
  mongoFields: [
    'status',
    'age',
    'role',
    'isActive',
    'createdAt',
    'score',
    'tags',
    'category',
    'price',
    'quantity',
  ],
  operators: ['=', '>', '<', '>=', '<=', '!=', 'LIKE', 'IN'],
  joins: ['JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN'],
  aggs: ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN'],
}

// --- 2. Helpers ---
const pick = <T>(arr: Array<T>): T =>
  arr[Math.floor(Math.random() * arr.length)]
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const uuid = () => Math.random().toString(36).substring(2, 9)

// --- 3. The Query Fabricator Engine (NOW WITH FORMATTING) ---

function generateSQL(difficulty: Difficulty): string {
  const t = pick(RESOURCES.tables)
  const t2 = pick(RESOURCES.tables.filter((x) => x !== t))
  const c = pick(RESOURCES.columns)
  const c2 = pick(RESOURCES.columns.filter((x) => x !== c))
  const v = pick(RESOURCES.values)
  const op = pick(RESOURCES.operators)
  const agg = pick(RESOURCES.aggs)
  const join = pick(RESOURCES.joins)

  if (difficulty === 'basic') {
    // Added \n for cleaner basic queries
    const templates = [
      `SELECT *\nFROM ${t};`,
      `SELECT ${c}, ${c2}\nFROM ${t}\nWHERE ${c} ${op} ${v};`,
      `UPDATE ${t}\nSET ${c} = ${v}\nWHERE id = ${randomInt(1, 999)};`,
      `DELETE FROM ${t}\nWHERE ${c} IS NULL;`,
      `SELECT COUNT(*)\nFROM ${t};`,
      `INSERT INTO ${t} (${c}, created_at)\nVALUES (${v}, NOW());`,
    ]
    return pick(templates)
  } else if (difficulty === 'intermediate') {
    // Added \n and indentation (2 spaces)
    const templates = [
      `SELECT *\nFROM ${t}\nWHERE ${c} IN (${v}, ${v}, ${v});`,
      `SELECT\n  ${t}.id,\n  ${t2}.${c}\nFROM ${t}\n${join} ${t2} ON ${t}.id = ${t2}.${t}_id;`,
      `SELECT\n  ${c},\n  ${agg}(${c2})\nFROM ${t}\nGROUP BY ${c}\nHAVING ${agg}(${c2}) > ${randomInt(10, 100)};`,
      `SELECT DISTINCT ${c}\nFROM ${t}\nWHERE created_at > NOW() - INTERVAL ${randomInt(1, 30)} DAY;`,
      `UPDATE ${t}\nSET\n  status = 'archived',\n  updated_at = NOW()\nWHERE ${c} = ${v};`,
    ]
    return pick(templates)
  } else {
    // Advanced
    // Complex formatting
    const templates = [
      `SELECT\n  ${c},\n  RANK() OVER (\n    PARTITION BY ${c2}\n    ORDER BY amount DESC\n  ) as rank_val\nFROM ${t};`,
      `WITH monthly_stats AS (\n  SELECT\n    DATE_TRUNC('month', created_at) as m,\n    SUM(amount) as total\n  FROM ${t}\n  GROUP BY 1\n)\nSELECT * FROM monthly_stats;`,
      `CREATE INDEX CONCURRENTLY idx_${t}_${c}\nON ${t}(${c}, ${c2})\nWHERE active = true;`,
      `SELECT *\nFROM ${t}\nWHERE EXISTS (\n  SELECT 1\n  FROM ${t2}\n  WHERE ${t}.id = ${t2}.${t}_id\n  AND ${c} > ${randomInt(500, 1000)}\n);`,
      `SELECT\n  ${c},\n  COALESCE(SUM(${c2}), 0) as total\nFROM ${t}\nLEFT JOIN ${t2} ON ${t}.id = ${t2}.${t}_id\nGROUP BY 1\nORDER BY 2 DESC;`,
    ]
    return pick(templates)
  }
}

function generateMongo(difficulty: Difficulty): string {
  const c = pick(RESOURCES.mongoCollections)
  const c2 = pick(RESOURCES.mongoCollections.filter((x) => x !== c))
  const f = pick(RESOURCES.mongoFields)
  const v = randomInt(1, 100)

  if (difficulty === 'basic') {
    // Basic formatting
    const templates = [
      `db.${c}.find({\n  ${f}: "${pick(['A', 'B', 'C'])}"\n})`,
      `db.${c}.findOne({\n  _id: ObjectId("${uuid()}")\n})`,
      `db.${c}.insertOne({\n  ${f}: ${v},\n  created: new Date()\n})`,
      `db.${c}.deleteMany({\n  ${f}: { $lt: ${v} }\n})`,
      `db.${c}.find({})\n  .sort({ ${f}: -1 })\n  .limit(10)`,
    ]
    return pick(templates)
  } else if (difficulty === 'intermediate') {
    // Aggregation pipelines formatted vertically
    const templates = [
      `db.${c}.aggregate([\n  { $match: { ${f}: ${v} } },\n  { $group: {\n    _id: "$${f}",\n    count: { $sum: 1 }\n  }}\n])`,
      `db.${c}.updateMany(\n  { ${f}: { $exists: false } },\n  { $set: { ${f}: "default" } }\n)`,
      `db.${c}.find({\n  ${f}: { $in: [1, 2, 3] }\n})\n.sort({ _id: -1 })\n.skip(10)`,
      `db.${c}.aggregate([\n  { $project: {\n    name: 1,\n    ${f}: 1,\n    _id: 0\n  }}\n])`,
    ]
    return pick(templates)
  } else {
    // Advanced
    // Complex pipelines
    const templates = [
      `db.${c}.aggregate([\n  { $lookup: {\n    from: "${c2}",\n    localField: "${f}",\n    foreignField: "_id",\n    as: "related_docs"\n  }},\n  { $unwind: "$related_docs" }\n])`,
      `db.${c}.aggregate([\n  { $facet: {\n    "active": [{ $match: { isActive: true }}],\n    "inactive": [{ $match: { isActive: false }}]\n  }}\n])`,
      `db.${c}.watch([\n  { $match: {\n    "operationType": "insert",\n    "fullDocument.${f}": { $gte: ${v} }\n  }}\n])`,
      `db.${c}.updateMany(\n  { ${f}: ${v} },\n  [ { $set: {\n    modified: "$$NOW",\n    total: { $sum: ["$price", "$tax"] }\n  }} ]\n)`,
    ]
    return pick(templates)
  }
}

// --- 4. Public API ---

export const generateSingleQuery = (
  type: QueryType,
  difficulty: Difficulty = 'basic',
): Query => {
  const text =
    type === 'sql' ? generateSQL(difficulty) : generateMongo(difficulty)
  return {
    id: `${type}-${uuid()}`,
    text: text,
    type: type,
    difficulty: difficulty,
    charCount: text.length,
  }
}

export const getQueriesForTimer = (
  type: QueryType,
  timerDuration: number,
  difficulty: Difficulty = 'intermediate',
): Array<Query> => {
  const targetChars = Math.floor(timerDuration * 3.5)
  const selected: Array<Query> = []
  let currentChars = 0

  while (currentChars < targetChars * 1.2) {
    const newQuery = generateSingleQuery(type, difficulty)
    if (
      selected.length > 0 &&
      selected[selected.length - 1].text === newQuery.text
    ) {
      continue
    }
    selected.push(newQuery)
    currentChars += newQuery.charCount
  }
  return selected
}
