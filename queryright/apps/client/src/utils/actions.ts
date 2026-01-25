import { createServerFn } from '@tanstack/react-start'

type OptimizeRequest = {
  query: string
  language: 'sql' | 'mongodb'
}

export const optimizeQueryFn = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    // Simulate LLM latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (data?.language === 'sql') {
      return `-- [TanStack Start Server] Optimized SQL
SELECT u.id, u.username, o.total 
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at > NOW() - INTERVAL '30 days'
  AND o.status = 'active' -- Added index hint
LIMIT 100;`
    }

    return `// [TanStack Start Server] Optimized MongoDB
db.orders.aggregate([
  { $match: { status: "active" } }, -- Moved match to start
  { $lookup: { from: "users", ... } },
  { $project: { "user.name": 1, total: 1 } }
]);`
  },
)
