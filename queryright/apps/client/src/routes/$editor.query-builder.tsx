import { createFileRoute } from '@tanstack/react-router'
import QueryBuilder from '@/pages/sql-query-builder/QueryBuilder'
import MongoQueryBuilder from '@/pages/mongo-query-builder/MongoQueryBuilder'

export const Route = createFileRoute('/$editor/query-builder')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return params.editor === 'mongo' ? <MongoQueryBuilder /> : <QueryBuilder />
}
