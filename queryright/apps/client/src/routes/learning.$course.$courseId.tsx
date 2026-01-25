import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useApiGet, useApiPost } from '@/hooks/api-hooks'

import sqlMod1_1 from '../course_content/sql/module_1/mod_1_1.mdx'
import sqlMod1_2 from '../course_content/sql/module_1/mod_1_2.mdx'
import sqlMod1_3 from '../course_content/sql/module_1/mod_1_3.mdx'
import sqlMod1_4 from '../course_content/sql/module_1/mod_1_4.mdx'
import sqlMod1_5 from '../course_content/sql/module_1/mod_1_5.mdx'
import sqlMod1_6 from '../course_content/sql/module_1/mod_1_6.mdx'
import sqlMod2_1 from '../course_content/sql/module_2/mod_2_1.mdx'
import sqlMod2_2 from '../course_content/sql/module_2/mod_2_2.mdx'
import sqlMod2_3 from '../course_content/sql/module_2/mod_2_3.mdx'
import sqlMod2_4 from '../course_content/sql/module_2/mod_2_4.mdx'
import sqlMod2_5 from '../course_content/sql/module_2/mod_2_5.mdx'
import sqlMod3_1 from '../course_content/sql/module_3/mod_3_1.mdx'
import sqlMod3_2 from '../course_content/sql/module_3/mod_3_2.mdx'
import sqlMod3_3 from '../course_content/sql/module_3/mod_3_3.mdx'
import sqlMod3_4 from '../course_content/sql/module_3/mod_3_4.mdx'
import sqlMod3_5 from '../course_content/sql/module_3/mod_3_5.mdx'
import sqlMod3_6 from '../course_content/sql/module_3/mod_3_6.mdx'
import sqlMod4_1 from '../course_content/sql/module_4/mod_4_1.mdx'
import sqlMod4_2 from '../course_content/sql/module_4/mod_4_2.mdx'
import sqlMod4_3 from '../course_content/sql/module_4/mod_4_3.mdx'
import sqlMod4_4 from '../course_content/sql/module_4/mod_4_4.mdx'
import sqlMod4_5 from '../course_content/sql/module_4/mod_4_5.mdx'
import sqlMod4_6 from '../course_content/sql/module_4/mod_4_6.mdx'
import sqlMod5_1 from '../course_content/sql/module_5/mod_5_1.mdx'
import sqlMod5_2 from '../course_content/sql/module_5/mod_5_2.mdx'
import sqlMod5_3 from '../course_content/sql/module_5/mod_5_3.mdx'
import sqlMod5_4 from '../course_content/sql/module_5/mod_5_4.mdx'
import sqlMod5_5 from '../course_content/sql/module_5/mod_5_5.mdx'
import sqlMod5_6 from '../course_content/sql/module_5/mod_5_6.mdx'
import sqlMod6_1 from '../course_content/sql/module_6/mod_6_1.mdx'
import sqlMod6_2 from '../course_content/sql/module_6/mod_6_2.mdx'
import sqlMod6_3 from '../course_content/sql/module_6/mod_6_3.mdx'
import sqlMod6_4 from '../course_content/sql/module_6/mod_6_4.mdx'
import sqlMod6_5 from '../course_content/sql/module_6/mod_6_5.mdx'
import sqlMod6_6 from '../course_content/sql/module_6/mod_6_6.mdx'
import sqlMod7_1 from '../course_content/sql/module_7/mod_7_1.mdx'
import sqlMod7_2 from '../course_content/sql/module_7/mod_7_2.mdx'
import sqlMod7_3 from '../course_content/sql/module_7/mod_7_3.mdx'
import sqlMod7_4 from '../course_content/sql/module_7/mod_7_4.mdx'
import sqlMod7_5 from '../course_content/sql/module_7/mod_7_5.mdx'
import sqlMod7_6 from '../course_content/sql/module_7/mod_7_6.mdx'

// Direct imports for all MongoDB MDX files for SSR
import mongoMod1_1 from '../course_content/mongodb/module_1/mod_1_1.mdx'
import mongoMod1_2 from '../course_content/mongodb/module_1/mod_1_2.mdx'
import mongoMod1_3 from '../course_content/mongodb/module_1/mod_1_3.mdx'
import mongoMod1_4 from '../course_content/mongodb/module_1/mod_1_4.mdx'
import mongoMod1_5 from '../course_content/mongodb/module_1/mod_1_5.mdx'
import mongoMod2_1 from '../course_content/mongodb/module_2/mod_2_1.mdx'
import mongoMod2_2 from '../course_content/mongodb/module_2/mod_2_2.mdx'
import mongoMod2_3 from '../course_content/mongodb/module_2/mod_2_3.mdx'
import mongoMod2_4 from '../course_content/mongodb/module_2/mod_2_4.mdx'
import mongoMod2_5 from '../course_content/mongodb/module_2/mod_2_5.mdx'
import mongoMod3_1 from '../course_content/mongodb/module_3/mod_3_1.mdx'
import mongoMod3_2 from '../course_content/mongodb/module_3/mod_3_2.mdx'
import mongoMod3_3 from '../course_content/mongodb/module_3/mod_3_3.mdx'
import mongoMod3_4 from '../course_content/mongodb/module_3/mod_3_4.mdx'
import mongoMod3_5 from '../course_content/mongodb/module_3/mod_3_5.mdx'
import mongoMod4_1 from '../course_content/mongodb/module_4/mod_4_1.mdx'
import mongoMod4_2 from '../course_content/mongodb/module_4/mod_4_2.mdx'
import mongoMod4_3 from '../course_content/mongodb/module_4/mod_4_3.mdx'
import mongoMod4_4 from '../course_content/mongodb/module_4/mod_4_4.mdx'
import mongoMod4_5 from '../course_content/mongodb/module_4/mod_4_5.mdx'
import mongoMod5_1 from '../course_content/mongodb/module_5/mod_5_1.mdx'
import mongoMod5_2 from '../course_content/mongodb/module_5/mod_5_2.mdx'
import mongoMod5_3 from '../course_content/mongodb/module_5/mod_5_3.mdx'
import mongoMod5_4 from '../course_content/mongodb/module_5/mod_5_4.mdx'
import mongoMod5_5 from '../course_content/mongodb/module_5/mod_5_5.mdx'
import mongoMod5_6 from '../course_content/mongodb/module_5/mod_5_6.mdx'
import mongoMod6_1 from '../course_content/mongodb/module_6/mod_6_1.mdx'
import mongoMod6_2 from '../course_content/mongodb/module_6/mod_6_2.mdx'
import mongoMod6_3 from '../course_content/mongodb/module_6/mod_6_3.mdx'
import mongoMod6_4 from '../course_content/mongodb/module_6/mod_6_4.mdx'
import mongoMod6_5 from '../course_content/mongodb/module_6/mod_6_5.mdx'
import mongoMod7_1 from '../course_content/mongodb/module_7/mod_7_1.mdx'
import mongoMod7_2 from '../course_content/mongodb/module_7/mod_7_2.mdx'
import mongoMod7_3 from '../course_content/mongodb/module_7/mod_7_3.mdx'
import mongoMod7_4 from '../course_content/mongodb/module_7/mod_7_4.mdx'
import mongoMod7_5 from '../course_content/mongodb/module_7/mod_7_5.mdx'

// OramaDB imports
import oramaMod1_1 from '../course_content/oramadb/module_1/mod_1_1.mdx'
import oramaMod1_2 from '../course_content/oramadb/module_1/mod_1_2.mdx'
import oramaMod1_3 from '../course_content/oramadb/module_1/mod_1_3.mdx'
import oramaMod1_4 from '../course_content/oramadb/module_1/mod_1_4.mdx'
import oramaMod1_5 from '../course_content/oramadb/module_1/mod_1_5.mdx'
import oramaMod2_1 from '../course_content/oramadb/module_2/mod_2_1.mdx'
import oramaMod2_2 from '../course_content/oramadb/module_2/mod_2_2.mdx'
import oramaMod2_3 from '../course_content/oramadb/module_2/mod_2_3.mdx'
import oramaMod2_4 from '../course_content/oramadb/module_2/mod_2_4.mdx'
import oramaMod2_5 from '../course_content/oramadb/module_2/mod_2_5.mdx'
import oramaMod3_1 from '../course_content/oramadb/module_3/mod_3_1.mdx'
import oramaMod3_2 from '../course_content/oramadb/module_3/mod_3_2.mdx'
import oramaMod3_3 from '../course_content/oramadb/module_3/mod_3_3.mdx'
import oramaMod3_4 from '../course_content/oramadb/module_3/mod_3_4.mdx'
import oramaMod3_5 from '../course_content/oramadb/module_3/mod_3_5.mdx'
import oramaMod4_1 from '../course_content/oramadb/module_4/mod_4_1.mdx'
import oramaMod4_2 from '../course_content/oramadb/module_4/mod_4_2.mdx'
import oramaMod4_3 from '../course_content/oramadb/module_4/mod_4_3.mdx'
import oramaMod4_4 from '../course_content/oramadb/module_4/mod_4_4.mdx'
import oramaMod4_5 from '../course_content/oramadb/module_4/mod_4_5.mdx'
import oramaMod5_1 from '../course_content/oramadb/module_5/mod_5_1.mdx'
import oramaMod5_2 from '../course_content/oramadb/module_5/mod_5_2.mdx'
import oramaMod5_3 from '../course_content/oramadb/module_5/mod_5_3.mdx'
import oramaMod5_4 from '../course_content/oramadb/module_5/mod_5_4.mdx'
import oramaMod5_5 from '../course_content/oramadb/module_5/mod_5_5.mdx'
import oramaMod6_1 from '../course_content/oramadb/module_6/mod_6_1.mdx'
import oramaMod6_2 from '../course_content/oramadb/module_6/mod_6_2.mdx'
import oramaMod6_3 from '../course_content/oramadb/module_6/mod_6_3.mdx'
import oramaMod6_4 from '../course_content/oramadb/module_6/mod_6_4.mdx'
import oramaMod6_5 from '../course_content/oramadb/module_6/mod_6_5.mdx'
import oramaMod7_1 from '../course_content/oramadb/module_7/mod_7_1.mdx'
import oramaMod7_2 from '../course_content/oramadb/module_7/mod_7_2.mdx'
import oramaMod7_3 from '../course_content/oramadb/module_7/mod_7_3.mdx'
import oramaMod7_4 from '../course_content/oramadb/module_7/mod_7_4.mdx'
import oramaMod7_5 from '../course_content/oramadb/module_7/mod_7_5.mdx'

// Neo4j imports
import neo4jMod1_1 from '../course_content/neo4j/module_1/mod_1_1.mdx'
import neo4jMod1_2 from '../course_content/neo4j/module_1/mod_1_2.mdx'
import neo4jMod1_3 from '../course_content/neo4j/module_1/mod_1_3.mdx'
import neo4jMod1_4 from '../course_content/neo4j/module_1/mod_1_4.mdx'
import neo4jMod1_5 from '../course_content/neo4j/module_1/mod_1_5.mdx'
import neo4jMod2_1 from '../course_content/neo4j/module_2/mod_2_1.mdx'
import neo4jMod2_2 from '../course_content/neo4j/module_2/mod_2_2.mdx'
import neo4jMod2_3 from '../course_content/neo4j/module_2/mod_2_3.mdx'
import neo4jMod2_4 from '../course_content/neo4j/module_2/mod_2_4.mdx'
import neo4jMod2_5 from '../course_content/neo4j/module_2/mod_2_5.mdx'
import neo4jMod3_1 from '../course_content/neo4j/module_3/mod_3_1.mdx'
import neo4jMod3_2 from '../course_content/neo4j/module_3/mod_3_2.mdx'
import neo4jMod3_3 from '../course_content/neo4j/module_3/mod_3_3.mdx'
import neo4jMod3_4 from '../course_content/neo4j/module_3/mod_3_4.mdx'
import neo4jMod4_1 from '../course_content/neo4j/module_4/mod_4_1.mdx'
import neo4jMod4_2 from '../course_content/neo4j/module_4/mod_4_2.mdx'
import neo4jMod4_3 from '../course_content/neo4j/module_4/mod_4_3.mdx'
import neo4jMod4_4 from '../course_content/neo4j/module_4/mod_4_4.mdx'
import neo4jMod5_1 from '../course_content/neo4j/module_5/mod_5_1.mdx'
import neo4jMod5_2 from '../course_content/neo4j/module_5/mod_5_2.mdx'
import neo4jMod5_3 from '../course_content/neo4j/module_5/mod_5_3.mdx'
import neo4jMod5_4 from '../course_content/neo4j/module_5/mod_5_4.mdx'
import neo4jMod5_5 from '../course_content/neo4j/module_5/mod_5_5.mdx'
import neo4jMod6_1 from '../course_content/neo4j/module_6/mod_6_1.mdx'
import neo4jMod6_2 from '../course_content/neo4j/module_6/mod_6_2.mdx'
import neo4jMod6_3 from '../course_content/neo4j/module_6/mod_6_3.mdx'
import neo4jMod6_4 from '../course_content/neo4j/module_6/mod_6_4.mdx'
import neo4jMod6_5 from '../course_content/neo4j/module_6/mod_6_5.mdx'
import neo4jMod7_1 from '../course_content/neo4j/module_7/mod_7_1.mdx'
import neo4jMod7_2 from '../course_content/neo4j/module_7/mod_7_2.mdx'
import neo4jMod7_3 from '../course_content/neo4j/module_7/mod_7_3.mdx'
import neo4jMod7_4 from '../course_content/neo4j/module_7/mod_7_4.mdx'
import neo4jMod7_5 from '../course_content/neo4j/module_7/mod_7_5.mdx'

// Qdrant imports
import qdrantMod1_1 from '../course_content/qdrant/module_1/mod_1_1.mdx'
import qdrantMod1_2 from '../course_content/qdrant/module_1/mod_1_2.mdx'
import qdrantMod1_3 from '../course_content/qdrant/module_1/mod_1_3.mdx'
import qdrantMod1_4 from '../course_content/qdrant/module_1/mod_1_4.mdx'
import qdrantMod1_5 from '../course_content/qdrant/module_1/mod_1_5.mdx'
import qdrantMod2_1 from '../course_content/qdrant/module_2/mod_2_1.mdx'
import qdrantMod2_2 from '../course_content/qdrant/module_2/mod_2_2.mdx'
import qdrantMod2_3 from '../course_content/qdrant/module_2/mod_2_3.mdx'
import qdrantMod2_4 from '../course_content/qdrant/module_2/mod_2_4.mdx'
import qdrantMod2_5 from '../course_content/qdrant/module_2/mod_2_5.mdx'
import qdrantMod3_1 from '../course_content/qdrant/module_3/mod_3_1.mdx'
import qdrantMod3_2 from '../course_content/qdrant/module_3/mod_3_2.mdx'
import qdrantMod3_3 from '../course_content/qdrant/module_3/mod_3_3.mdx'
import qdrantMod3_4 from '../course_content/qdrant/module_3/mod_3_4.mdx'
import qdrantMod3_5 from '../course_content/qdrant/module_3/mod_3_5.mdx'
import qdrantMod4_1 from '../course_content/qdrant/module_4/mod_4_1.mdx'
import qdrantMod4_2 from '../course_content/qdrant/module_4/mod_4_2.mdx'
import qdrantMod4_3 from '../course_content/qdrant/module_4/mod_4_3.mdx'
import qdrantMod4_4 from '../course_content/qdrant/module_4/mod_4_4.mdx'
import qdrantMod4_5 from '../course_content/qdrant/module_4/mod_4_5.mdx'
import qdrantMod5_1 from '../course_content/qdrant/module_5/mod_5_1.mdx'
import qdrantMod5_2 from '../course_content/qdrant/module_5/mod_5_2.mdx'
import qdrantMod5_3 from '../course_content/qdrant/module_5/mod_5_3.mdx'
import qdrantMod5_4 from '../course_content/qdrant/module_5/mod_5_4.mdx'
import qdrantMod5_5 from '../course_content/qdrant/module_5/mod_5_5.mdx'
import qdrantMod6_1 from '../course_content/qdrant/module_6/mod_6_1.mdx'
import qdrantMod6_2 from '../course_content/qdrant/module_6/mod_6_2.mdx'
import qdrantMod6_3 from '../course_content/qdrant/module_6/mod_6_3.mdx'
import qdrantMod6_4 from '../course_content/qdrant/module_6/mod_6_4.mdx'
import qdrantMod6_5 from '../course_content/qdrant/module_6/mod_6_5.mdx'
import qdrantMod7_1 from '../course_content/qdrant/module_7/mod_7_1.mdx'
import qdrantMod7_2 from '../course_content/qdrant/module_7/mod_7_2.mdx'
import qdrantMod7_3 from '../course_content/qdrant/module_7/mod_7_3.mdx'
import qdrantMod7_4 from '../course_content/qdrant/module_7/mod_7_4.mdx'
import qdrantMod7_5 from '../course_content/qdrant/module_7/mod_7_5.mdx'

// DuckDB imports
import duckdbMod1_1 from '../course_content/duckdb/module_1/mod_1_1.mdx'
import duckdbMod1_2 from '../course_content/duckdb/module_1/mod_1_2.mdx'
import duckdbMod1_3 from '../course_content/duckdb/module_1/mod_1_3.mdx'
import duckdbMod1_4 from '../course_content/duckdb/module_1/mod_1_4.mdx'
import duckdbMod1_5 from '../course_content/duckdb/module_1/mod_1_5.mdx'
import duckdbMod2_1 from '../course_content/duckdb/module_2/mod_2_1.mdx'
import duckdbMod2_2 from '../course_content/duckdb/module_2/mod_2_2.mdx'
import duckdbMod2_3 from '../course_content/duckdb/module_2/mod_2_3.mdx'
import duckdbMod2_4 from '../course_content/duckdb/module_2/mod_2_4.mdx'
import duckdbMod2_5 from '../course_content/duckdb/module_2/mod_2_5.mdx'
import duckdbMod3_1 from '../course_content/duckdb/module_3/mod_3_1.mdx'
import duckdbMod3_2 from '../course_content/duckdb/module_3/mod_3_2.mdx'
import duckdbMod3_3 from '../course_content/duckdb/module_3/mod_3_3.mdx'
import duckdbMod3_4 from '../course_content/duckdb/module_3/mod_3_4.mdx'
import duckdbMod3_5 from '../course_content/duckdb/module_3/mod_3_5.mdx'
import duckdbMod4_1 from '../course_content/duckdb/module_4/mod_4_1.mdx'
import duckdbMod4_2 from '../course_content/duckdb/module_4/mod_4_2.mdx'
import duckdbMod4_3 from '../course_content/duckdb/module_4/mod_4_3.mdx'
import duckdbMod4_4 from '../course_content/duckdb/module_4/mod_4_4.mdx'
import duckdbMod4_5 from '../course_content/duckdb/module_4/mod_4_5.mdx'
import duckdbMod5_1 from '../course_content/duckdb/module_5/mod_5_1.mdx'
import duckdbMod5_2 from '../course_content/duckdb/module_5/mod_5_2.mdx'
import duckdbMod5_3 from '../course_content/duckdb/module_5/mod_5_3.mdx'
import duckdbMod5_4 from '../course_content/duckdb/module_5/mod_5_4.mdx'
import duckdbMod5_5 from '../course_content/duckdb/module_5/mod_5_5.mdx'
import duckdbMod6_1 from '../course_content/duckdb/module_6/mod_6_1.mdx'
import duckdbMod6_2 from '../course_content/duckdb/module_6/mod_6_2.mdx'
import duckdbMod6_3 from '../course_content/duckdb/module_6/mod_6_3.mdx'
import duckdbMod6_4 from '../course_content/duckdb/module_6/mod_6_4.mdx'
import duckdbMod6_5 from '../course_content/duckdb/module_6/mod_6_5.mdx'
import duckdbMod7_1 from '../course_content/duckdb/module_7/mod_7_1.mdx'
import duckdbMod7_2 from '../course_content/duckdb/module_7/mod_7_2.mdx'
import duckdbMod7_3 from '../course_content/duckdb/module_7/mod_7_3.mdx'
import duckdbMod7_4 from '../course_content/duckdb/module_7/mod_7_4.mdx'

// Elasticsearch imports
import elasticsearchMod1_1 from '../course_content/elasticsearch/module_1/mod_1_1.mdx'
import elasticsearchMod1_2 from '../course_content/elasticsearch/module_1/mod_1_2.mdx'
import elasticsearchMod1_3 from '../course_content/elasticsearch/module_1/mod_1_3.mdx'
import elasticsearchMod1_4 from '../course_content/elasticsearch/module_1/mod_1_4.mdx'
import elasticsearchMod1_5 from '../course_content/elasticsearch/module_1/mod_1_5.mdx'
import elasticsearchMod2_1 from '../course_content/elasticsearch/module_2/mod_2_1.mdx'
import elasticsearchMod2_2 from '../course_content/elasticsearch/module_2/mod_2_2.mdx'
import elasticsearchMod2_3 from '../course_content/elasticsearch/module_2/mod_2_3.mdx'
import elasticsearchMod2_4 from '../course_content/elasticsearch/module_2/mod_2_4.mdx'
import elasticsearchMod2_5 from '../course_content/elasticsearch/module_2/mod_2_5.mdx'
import elasticsearchMod3_1 from '../course_content/elasticsearch/module_3/mod_3_1.mdx'
import elasticsearchMod3_2 from '../course_content/elasticsearch/module_3/mod_3_2.mdx'
import elasticsearchMod3_3 from '../course_content/elasticsearch/module_3/mod_3_3.mdx'
import elasticsearchMod3_4 from '../course_content/elasticsearch/module_3/mod_3_4.mdx'
import elasticsearchMod3_5 from '../course_content/elasticsearch/module_3/mod_3_5.mdx'
import elasticsearchMod4_1 from '../course_content/elasticsearch/module_4/mod_4_1.mdx'
import elasticsearchMod4_2 from '../course_content/elasticsearch/module_4/mod_4_2.mdx'
import elasticsearchMod4_3 from '../course_content/elasticsearch/module_4/mod_4_3.mdx'
import elasticsearchMod4_4 from '../course_content/elasticsearch/module_4/mod_4_4.mdx'
import elasticsearchMod4_5 from '../course_content/elasticsearch/module_4/mod_4_5.mdx'
import elasticsearchMod5_1 from '../course_content/elasticsearch/module_5/mod_5_1.mdx'
import elasticsearchMod5_2 from '../course_content/elasticsearch/module_5/mod_5_2.mdx'
import elasticsearchMod5_3 from '../course_content/elasticsearch/module_5/mod_5_3.mdx'
import elasticsearchMod5_4 from '../course_content/elasticsearch/module_5/mod_5_4.mdx'
import elasticsearchMod5_5 from '../course_content/elasticsearch/module_5/mod_5_5.mdx'
import elasticsearchMod6_1 from '../course_content/elasticsearch/module_6/mod_6_1.mdx'
import elasticsearchMod6_2 from '../course_content/elasticsearch/module_6/mod_6_2.mdx'
import elasticsearchMod6_3 from '../course_content/elasticsearch/module_6/mod_6_3.mdx'
import elasticsearchMod6_4 from '../course_content/elasticsearch/module_6/mod_6_4.mdx'
import elasticsearchMod6_5 from '../course_content/elasticsearch/module_6/mod_6_5.mdx'
import elasticsearchMod7_1 from '../course_content/elasticsearch/module_7/mod_7_1.mdx'
import elasticsearchMod7_2 from '../course_content/elasticsearch/module_7/mod_7_2.mdx'
import elasticsearchMod7_3 from '../course_content/elasticsearch/module_7/mod_7_3.mdx'
import elasticsearchMod7_4 from '../course_content/elasticsearch/module_7/mod_7_4.mdx'
import elasticsearchMod7_5 from '../course_content/elasticsearch/module_7/mod_7_5.mdx'

// Redis imports
import redisMod1_1 from '../course_content/redis/module_1/mod_1_1.mdx'
import redisMod1_2 from '../course_content/redis/module_1/mod_1_2.mdx'
import redisMod1_3 from '../course_content/redis/module_1/mod_1_3.mdx'
import redisMod1_4 from '../course_content/redis/module_1/mod_1_4.mdx'
import redisMod1_5 from '../course_content/redis/module_1/mod_1_5.mdx'
import redisMod2_1 from '../course_content/redis/module_2/mod_2_1.mdx'
import redisMod2_2 from '../course_content/redis/module_2/mod_2_2.mdx'
import redisMod2_3 from '../course_content/redis/module_2/mod_2_3.mdx'
import redisMod2_4 from '../course_content/redis/module_2/mod_2_4.mdx'

import redisMod3_1 from '../course_content/redis/module_3/mod_3_1.mdx'
import redisMod3_2 from '../course_content/redis/module_3/mod_3_2.mdx'
import redisMod3_3 from '../course_content/redis/module_3/mod_3_3.mdx'
import redisMod4_1 from '../course_content/redis/module_4/mod_4_1.mdx'
import redisMod4_2 from '../course_content/redis/module_4/mod_4_2.mdx'
import redisMod4_3 from '../course_content/redis/module_4/mod_4_3.mdx'
import redisMod5_1 from '../course_content/redis/module_5/mod_5_1.mdx'
import redisMod5_2 from '../course_content/redis/module_5/mod_5_2.mdx'
import redisMod5_3 from '../course_content/redis/module_5/mod_5_3.mdx'
import redisMod6_1 from '../course_content/redis/module_6/mod_6_1.mdx'
import redisMod6_2 from '../course_content/redis/module_6/mod_6_2.mdx'
import redisMod6_3 from '../course_content/redis/module_6/mod_6_3.mdx'

import redisMod7_1 from '../course_content/redis/module_7/mod_7_1.mdx'
import redisMod7_2 from '../course_content/redis/module_7/mod_7_2.mdx'
import redisMod7_3 from '../course_content/redis/module_7/mod_7_3.mdx'
import redisMod8_1 from '../course_content/redis/module_8/mod_8_1.mdx'
import redisMod8_2 from '../course_content/redis/module_8/mod_8_2.mdx'
import redisMod8_3 from '../course_content/redis/module_8/mod_8_3.mdx'
import redisMod8_4 from '../course_content/redis/module_8/mod_8_4.mdx'

import { mdxComponents } from '@/components/mdx-components'
import { CourseSidebar } from '@/components/course-sidebar'
import {
  courseStructure,
  findLessonBySlug,
  getAdjacentLesson,
} from '@/lib/course-structure'
import BottomDock from '@/components/bottom-dock'
import { PageHeader } from '@/components/article-header'
import { Button } from '@/components/ui/button'
import { TextHighlighter } from '@/components/text-highlighter'
import type { SavedHighlight } from '@repo/schema'
import {
  getLocalHighlights,
  addLocalHighlight,
  deleteLocalHighlight,
  addPendingSyncOperation,
  generateTempId,
} from '@/utils/highlights-storage'
import { isBookmarked as checkIsBookmarked } from '@/utils/bookmark-storage'
import { useHighlightSync } from '@/hooks/use-highlight-sync'
import { useBookmarkSync } from '@/hooks/use-bookmark-sync'
import { getLessonMetadata } from '@/lib/lesson-metadata.registry'
import { generateSEOHead } from '@/lib/seo-utils'

export const Route = createFileRoute('/learning/$course/$courseId')({
  beforeLoad: ({ params }) => {
    const { course: courseType, courseId } = params
    const lessonData = findLessonBySlug(courseType, courseId)

    if (!lessonData?.lesson) {
      const currentCourseStructure =
        courseStructure[
          courseType as
            | 'sql'
            | 'mongodb'
            | 'oramadb'
            | 'neo4j'
            | 'qdrant'
            | 'duckdb'
            | 'elasticsearch'
            | 'redis'
        ] || courseStructure.sql
      const firstModule = currentCourseStructure[0]
      const firstLesson = firstModule?.lessons[0]

      if (firstLesson) {
        throw redirect({
          to: '/learning/$course/$courseId',
          params: { course: courseType, courseId: firstLesson.slug },
          replace: true,
        })
      }
    }
  },
  head: ({ params }) => {
    // Get lesson metadata for SEO
    const metadata = getLessonMetadata(params.course, params.courseId)

    // If no metadata found, generate fallback with proper OG/Twitter tags
    if (!metadata) {
      const courseType = params.course.toUpperCase()
      const lessonSlug = params.courseId
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      const title = `${lessonSlug} - ${courseType} | QueryRight`
      const description = `Master ${courseType} with ${lessonSlug}. Interactive lessons and hands-on practice on QueryRight - Master Databases using QueryRight`
      const url = `https://queryright.dev/learning/${params.course}/${params.courseId}`
      const image =
        'https://res.cloudinary.com/testifywebdev/image/upload/v1736257200/logo_nqpvlf.png'

      return {
        title,
        meta: [
          { name: 'description', content: description },
          // Open Graph tags
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:image', content: image },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'article' },
          { property: 'og:site_name', content: 'QueryRight' },
          // Twitter Card tags
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: image },
          { name: 'twitter:url', content: url },
        ],
        links: [{ rel: 'canonical', href: url }],
      }
    }

    // Generate complete SEO head with meta tags, Open Graph, Twitter Cards, and structured data
    const seoHead = generateSEOHead(metadata)
    return seoHead
  },
  component: RouteComponent,
})

const sqlMdxModules = {
  'module_1/mod_1_1.mdx': sqlMod1_1,
  'module_1/mod_1_2.mdx': sqlMod1_2,
  'module_1/mod_1_3.mdx': sqlMod1_3,
  'module_1/mod_1_4.mdx': sqlMod1_4,
  'module_1/mod_1_5.mdx': sqlMod1_5,
  'module_1/mod_1_6.mdx': sqlMod1_6,
  'module_2/mod_2_1.mdx': sqlMod2_1,
  'module_2/mod_2_2.mdx': sqlMod2_2,
  'module_2/mod_2_3.mdx': sqlMod2_3,
  'module_2/mod_2_4.mdx': sqlMod2_4,
  'module_2/mod_2_5.mdx': sqlMod2_5,
  'module_3/mod_3_1.mdx': sqlMod3_1,
  'module_3/mod_3_2.mdx': sqlMod3_2,
  'module_3/mod_3_3.mdx': sqlMod3_3,
  'module_3/mod_3_4.mdx': sqlMod3_4,
  'module_3/mod_3_5.mdx': sqlMod3_5,
  'module_3/mod_3_6.mdx': sqlMod3_6,
  'module_4/mod_4_1.mdx': sqlMod4_1,
  'module_4/mod_4_2.mdx': sqlMod4_2,
  'module_4/mod_4_3.mdx': sqlMod4_3,
  'module_4/mod_4_4.mdx': sqlMod4_4,
  'module_4/mod_4_5.mdx': sqlMod4_5,
  'module_4/mod_4_6.mdx': sqlMod4_6,
  'module_5/mod_5_1.mdx': sqlMod5_1,
  'module_5/mod_5_2.mdx': sqlMod5_2,
  'module_5/mod_5_3.mdx': sqlMod5_3,
  'module_5/mod_5_4.mdx': sqlMod5_4,
  'module_5/mod_5_5.mdx': sqlMod5_5,
  'module_5/mod_5_6.mdx': sqlMod5_6,
  'module_6/mod_6_1.mdx': sqlMod6_1,
  'module_6/mod_6_2.mdx': sqlMod6_2,
  'module_6/mod_6_3.mdx': sqlMod6_3,
  'module_6/mod_6_4.mdx': sqlMod6_4,
  'module_6/mod_6_5.mdx': sqlMod6_5,
  'module_6/mod_6_6.mdx': sqlMod6_6,
  'module_7/mod_7_1.mdx': sqlMod7_1,
  'module_7/mod_7_2.mdx': sqlMod7_2,
  'module_7/mod_7_3.mdx': sqlMod7_3,
  'module_7/mod_7_4.mdx': sqlMod7_4,
  'module_7/mod_7_5.mdx': sqlMod7_5,
  'module_7/mod_7_6.mdx': sqlMod7_6,
} as const

const mongodbMdxModules = {
  'module_1/mod_1_1.mdx': mongoMod1_1,
  'module_1/mod_1_2.mdx': mongoMod1_2,
  'module_1/mod_1_3.mdx': mongoMod1_3,
  'module_1/mod_1_4.mdx': mongoMod1_4,
  'module_1/mod_1_5.mdx': mongoMod1_5,
  'module_2/mod_2_1.mdx': mongoMod2_1,
  'module_2/mod_2_2.mdx': mongoMod2_2,
  'module_2/mod_2_3.mdx': mongoMod2_3,
  'module_2/mod_2_4.mdx': mongoMod2_4,
  'module_2/mod_2_5.mdx': mongoMod2_5,
  'module_3/mod_3_1.mdx': mongoMod3_1,
  'module_3/mod_3_2.mdx': mongoMod3_2,
  'module_3/mod_3_3.mdx': mongoMod3_3,
  'module_3/mod_3_4.mdx': mongoMod3_4,
  'module_3/mod_3_5.mdx': mongoMod3_5,
  'module_4/mod_4_1.mdx': mongoMod4_1,
  'module_4/mod_4_2.mdx': mongoMod4_2,
  'module_4/mod_4_3.mdx': mongoMod4_3,
  'module_4/mod_4_4.mdx': mongoMod4_4,
  'module_4/mod_4_5.mdx': mongoMod4_5,
  'module_5/mod_5_1.mdx': mongoMod5_1,
  'module_5/mod_5_2.mdx': mongoMod5_2,
  'module_5/mod_5_3.mdx': mongoMod5_3,
  'module_5/mod_5_4.mdx': mongoMod5_4,
  'module_5/mod_5_5.mdx': mongoMod5_5,
  'module_5/mod_5_6.mdx': mongoMod5_6,
  'module_6/mod_6_1.mdx': mongoMod6_1,
  'module_6/mod_6_2.mdx': mongoMod6_2,
  'module_6/mod_6_3.mdx': mongoMod6_3,
  'module_6/mod_6_4.mdx': mongoMod6_4,
  'module_6/mod_6_5.mdx': mongoMod6_5,
  'module_7/mod_7_1.mdx': mongoMod7_1,
  'module_7/mod_7_2.mdx': mongoMod7_2,
  'module_7/mod_7_3.mdx': mongoMod7_3,
  'module_7/mod_7_4.mdx': mongoMod7_4,
  'module_7/mod_7_5.mdx': mongoMod7_5,
} as const

const oramadbMdxModules = {
  'module_1/mod_1_1.mdx': oramaMod1_1,
  'module_1/mod_1_2.mdx': oramaMod1_2,
  'module_1/mod_1_3.mdx': oramaMod1_3,
  'module_1/mod_1_4.mdx': oramaMod1_4,
  'module_1/mod_1_5.mdx': oramaMod1_5,
  'module_2/mod_2_1.mdx': oramaMod2_1,
  'module_2/mod_2_2.mdx': oramaMod2_2,
  'module_2/mod_2_3.mdx': oramaMod2_3,
  'module_2/mod_2_4.mdx': oramaMod2_4,
  'module_2/mod_2_5.mdx': oramaMod2_5,
  'module_3/mod_3_1.mdx': oramaMod3_1,
  'module_3/mod_3_2.mdx': oramaMod3_2,
  'module_3/mod_3_3.mdx': oramaMod3_3,
  'module_3/mod_3_4.mdx': oramaMod3_4,
  'module_3/mod_3_5.mdx': oramaMod3_5,
  'module_4/mod_4_1.mdx': oramaMod4_1,
  'module_4/mod_4_2.mdx': oramaMod4_2,
  'module_4/mod_4_3.mdx': oramaMod4_3,
  'module_4/mod_4_4.mdx': oramaMod4_4,
  'module_4/mod_4_5.mdx': oramaMod4_5,
  'module_5/mod_5_1.mdx': oramaMod5_1,
  'module_5/mod_5_2.mdx': oramaMod5_2,
  'module_5/mod_5_3.mdx': oramaMod5_3,
  'module_5/mod_5_4.mdx': oramaMod5_4,
  'module_5/mod_5_5.mdx': oramaMod5_5,
  'module_6/mod_6_1.mdx': oramaMod6_1,
  'module_6/mod_6_2.mdx': oramaMod6_2,
  'module_6/mod_6_3.mdx': oramaMod6_3,
  'module_6/mod_6_4.mdx': oramaMod6_4,
  'module_6/mod_6_5.mdx': oramaMod6_5,
  'module_7/mod_7_1.mdx': oramaMod7_1,
  'module_7/mod_7_2.mdx': oramaMod7_2,
  'module_7/mod_7_3.mdx': oramaMod7_3,
  'module_7/mod_7_4.mdx': oramaMod7_4,
  'module_7/mod_7_5.mdx': oramaMod7_5,
} as const

const neo4jMdxModules = {
  'module_1/mod_1_1.mdx': neo4jMod1_1,
  'module_1/mod_1_2.mdx': neo4jMod1_2,
  'module_1/mod_1_3.mdx': neo4jMod1_3,
  'module_1/mod_1_4.mdx': neo4jMod1_4,
  'module_1/mod_1_5.mdx': neo4jMod1_5,
  'module_2/mod_2_1.mdx': neo4jMod2_1,
  'module_2/mod_2_2.mdx': neo4jMod2_2,
  'module_2/mod_2_3.mdx': neo4jMod2_3,
  'module_2/mod_2_4.mdx': neo4jMod2_4,
  'module_2/mod_2_5.mdx': neo4jMod2_5,
  'module_3/mod_3_1.mdx': neo4jMod3_1,
  'module_3/mod_3_2.mdx': neo4jMod3_2,
  'module_3/mod_3_3.mdx': neo4jMod3_3,
  'module_3/mod_3_4.mdx': neo4jMod3_4,

  'module_4/mod_4_1.mdx': neo4jMod4_1,
  'module_4/mod_4_2.mdx': neo4jMod4_2,
  'module_4/mod_4_3.mdx': neo4jMod4_3,
  'module_4/mod_4_4.mdx': neo4jMod4_4,
  'module_5/mod_5_1.mdx': neo4jMod5_1,
  'module_5/mod_5_2.mdx': neo4jMod5_2,
  'module_5/mod_5_3.mdx': neo4jMod5_3,
  'module_5/mod_5_4.mdx': neo4jMod5_4,
  'module_5/mod_5_5.mdx': neo4jMod5_5,
  'module_6/mod_6_1.mdx': neo4jMod6_1,
  'module_6/mod_6_2.mdx': neo4jMod6_2,
  'module_6/mod_6_3.mdx': neo4jMod6_3,
  'module_6/mod_6_4.mdx': neo4jMod6_4,
  'module_6/mod_6_5.mdx': neo4jMod6_5,
  'module_7/mod_7_1.mdx': neo4jMod7_1,
  'module_7/mod_7_2.mdx': neo4jMod7_2,
  'module_7/mod_7_3.mdx': neo4jMod7_3,
  'module_7/mod_7_4.mdx': neo4jMod7_4,
  'module_7/mod_7_5.mdx': neo4jMod7_5,
} as const

const qdrantMdxModules = {
  'module_1/mod_1_1.mdx': qdrantMod1_1,
  'module_1/mod_1_2.mdx': qdrantMod1_2,
  'module_1/mod_1_3.mdx': qdrantMod1_3,
  'module_1/mod_1_4.mdx': qdrantMod1_4,
  'module_1/mod_1_5.mdx': qdrantMod1_5,
  'module_2/mod_2_1.mdx': qdrantMod2_1,
  'module_2/mod_2_2.mdx': qdrantMod2_2,
  'module_2/mod_2_3.mdx': qdrantMod2_3,
  'module_2/mod_2_4.mdx': qdrantMod2_4,
  'module_2/mod_2_5.mdx': qdrantMod2_5,
  'module_3/mod_3_1.mdx': qdrantMod3_1,
  'module_3/mod_3_2.mdx': qdrantMod3_2,
  'module_3/mod_3_3.mdx': qdrantMod3_3,
  'module_3/mod_3_4.mdx': qdrantMod3_4,
  'module_3/mod_3_5.mdx': qdrantMod3_5,
  'module_4/mod_4_1.mdx': qdrantMod4_1,
  'module_4/mod_4_2.mdx': qdrantMod4_2,
  'module_4/mod_4_3.mdx': qdrantMod4_3,
  'module_4/mod_4_4.mdx': qdrantMod4_4,
  'module_4/mod_4_5.mdx': qdrantMod4_5,
  'module_5/mod_5_1.mdx': qdrantMod5_1,
  'module_5/mod_5_2.mdx': qdrantMod5_2,
  'module_5/mod_5_3.mdx': qdrantMod5_3,
  'module_5/mod_5_4.mdx': qdrantMod5_4,
  'module_5/mod_5_5.mdx': qdrantMod5_5,
  'module_6/mod_6_1.mdx': qdrantMod6_1,
  'module_6/mod_6_2.mdx': qdrantMod6_2,
  'module_6/mod_6_3.mdx': qdrantMod6_3,
  'module_6/mod_6_4.mdx': qdrantMod6_4,
  'module_6/mod_6_5.mdx': qdrantMod6_5,
  'module_7/mod_7_1.mdx': qdrantMod7_1,
  'module_7/mod_7_2.mdx': qdrantMod7_2,
  'module_7/mod_7_3.mdx': qdrantMod7_3,
  'module_7/mod_7_4.mdx': qdrantMod7_4,
  'module_7/mod_7_5.mdx': qdrantMod7_5,
} as const

const duckdbMdxModules = {
  'module_1/mod_1_1.mdx': duckdbMod1_1,
  'module_1/mod_1_2.mdx': duckdbMod1_2,
  'module_1/mod_1_3.mdx': duckdbMod1_3,
  'module_1/mod_1_4.mdx': duckdbMod1_4,
  'module_1/mod_1_5.mdx': duckdbMod1_5,
  'module_2/mod_2_1.mdx': duckdbMod2_1,
  'module_2/mod_2_2.mdx': duckdbMod2_2,
  'module_2/mod_2_3.mdx': duckdbMod2_3,
  'module_2/mod_2_4.mdx': duckdbMod2_4,
  'module_2/mod_2_5.mdx': duckdbMod2_5,
  'module_3/mod_3_1.mdx': duckdbMod3_1,
  'module_3/mod_3_2.mdx': duckdbMod3_2,
  'module_3/mod_3_3.mdx': duckdbMod3_3,
  'module_3/mod_3_4.mdx': duckdbMod3_4,
  'module_3/mod_3_5.mdx': duckdbMod3_5,
  'module_4/mod_4_1.mdx': duckdbMod4_1,
  'module_4/mod_4_2.mdx': duckdbMod4_2,
  'module_4/mod_4_3.mdx': duckdbMod4_3,
  'module_4/mod_4_4.mdx': duckdbMod4_4,
  'module_4/mod_4_5.mdx': duckdbMod4_5,
  'module_5/mod_5_1.mdx': duckdbMod5_1,
  'module_5/mod_5_2.mdx': duckdbMod5_2,
  'module_5/mod_5_3.mdx': duckdbMod5_3,
  'module_5/mod_5_4.mdx': duckdbMod5_4,
  'module_5/mod_5_5.mdx': duckdbMod5_5,
  'module_6/mod_6_1.mdx': duckdbMod6_1,
  'module_6/mod_6_2.mdx': duckdbMod6_2,
  'module_6/mod_6_3.mdx': duckdbMod6_3,
  'module_6/mod_6_4.mdx': duckdbMod6_4,
  'module_6/mod_6_5.mdx': duckdbMod6_5,
  'module_7/mod_7_1.mdx': duckdbMod7_1,
  'module_7/mod_7_2.mdx': duckdbMod7_2,
  'module_7/mod_7_3.mdx': duckdbMod7_3,
  'module_7/mod_7_4.mdx': duckdbMod7_4,
} as const

const elasticsearchMdxModules = {
  'module_1/mod_1_1.mdx': elasticsearchMod1_1,
  'module_1/mod_1_2.mdx': elasticsearchMod1_2,
  'module_1/mod_1_3.mdx': elasticsearchMod1_3,
  'module_1/mod_1_4.mdx': elasticsearchMod1_4,
  'module_1/mod_1_5.mdx': elasticsearchMod1_5,
  'module_2/mod_2_1.mdx': elasticsearchMod2_1,
  'module_2/mod_2_2.mdx': elasticsearchMod2_2,
  'module_2/mod_2_3.mdx': elasticsearchMod2_3,
  'module_2/mod_2_4.mdx': elasticsearchMod2_4,
  'module_2/mod_2_5.mdx': elasticsearchMod2_5,
  'module_3/mod_3_1.mdx': elasticsearchMod3_1,
  'module_3/mod_3_2.mdx': elasticsearchMod3_2,
  'module_3/mod_3_3.mdx': elasticsearchMod3_3,
  'module_3/mod_3_4.mdx': elasticsearchMod3_4,
  'module_3/mod_3_5.mdx': elasticsearchMod3_5,
  'module_4/mod_4_1.mdx': elasticsearchMod4_1,
  'module_4/mod_4_2.mdx': elasticsearchMod4_2,
  'module_4/mod_4_3.mdx': elasticsearchMod4_3,
  'module_4/mod_4_4.mdx': elasticsearchMod4_4,
  'module_4/mod_4_5.mdx': elasticsearchMod4_5,
  'module_5/mod_5_1.mdx': elasticsearchMod5_1,
  'module_5/mod_5_2.mdx': elasticsearchMod5_2,
  'module_5/mod_5_3.mdx': elasticsearchMod5_3,
  'module_5/mod_5_4.mdx': elasticsearchMod5_4,
  'module_5/mod_5_5.mdx': elasticsearchMod5_5,
  'module_6/mod_6_1.mdx': elasticsearchMod6_1,
  'module_6/mod_6_2.mdx': elasticsearchMod6_2,
  'module_6/mod_6_3.mdx': elasticsearchMod6_3,
  'module_6/mod_6_4.mdx': elasticsearchMod6_4,
  'module_6/mod_6_5.mdx': elasticsearchMod6_5,
  'module_7/mod_7_1.mdx': elasticsearchMod7_1,
  'module_7/mod_7_2.mdx': elasticsearchMod7_2,
  'module_7/mod_7_3.mdx': elasticsearchMod7_3,
  'module_7/mod_7_4.mdx': elasticsearchMod7_4,
  'module_7/mod_7_5.mdx': elasticsearchMod7_5,
} as const

const redisMdxModules = {
  'module_1/mod_1_1.mdx': redisMod1_1,
  'module_1/mod_1_2.mdx': redisMod1_2,
  'module_1/mod_1_3.mdx': redisMod1_3,
  'module_1/mod_1_4.mdx': redisMod1_4,
  'module_1/mod_1_5.mdx': redisMod1_5,
  'module_2/mod_2_1.mdx': redisMod2_1,
  'module_2/mod_2_2.mdx': redisMod2_2,
  'module_2/mod_2_3.mdx': redisMod2_3,
  'module_2/mod_2_4.mdx': redisMod2_4,
  'module_3/mod_3_1.mdx': redisMod3_1,
  'module_3/mod_3_2.mdx': redisMod3_2,
  'module_3/mod_3_3.mdx': redisMod3_3,
  'module_4/mod_4_1.mdx': redisMod4_1,
  'module_4/mod_4_2.mdx': redisMod4_2,
  'module_4/mod_4_3.mdx': redisMod4_3,
  'module_5/mod_5_1.mdx': redisMod5_1,
  'module_5/mod_5_2.mdx': redisMod5_2,
  'module_5/mod_5_3.mdx': redisMod5_3,

  'module_6/mod_6_1.mdx': redisMod6_1,
  'module_6/mod_6_2.mdx': redisMod6_2,
  'module_6/mod_6_3.mdx': redisMod6_3,

  'module_7/mod_7_1.mdx': redisMod7_1,
  'module_7/mod_7_2.mdx': redisMod7_2,
  'module_7/mod_7_3.mdx': redisMod7_3,
  'module_8/mod_8_1.mdx': redisMod8_1,
  'module_8/mod_8_2.mdx': redisMod8_2,
  'module_8/mod_8_3.mdx': redisMod8_3,
  'module_8/mod_8_4.mdx': redisMod8_4,
} as const

export default function RouteComponent() {
  const { course: courseType, courseId } = Route.useParams()

  // Get prev/next lessons
  const prev = getAdjacentLesson(courseType, courseId, 'prev')
  const next = getAdjacentLesson(courseType, courseId, 'next')

  // Get initial data from localStorage
  const initialHighlights = getLocalHighlights(courseId)
  const initialIsBookmarked = checkIsBookmarked(courseId)

  const contentRef = useRef<HTMLDivElement>(null)

  // Setup sync hooks
  useHighlightSync(courseId)
  useBookmarkSync()

  const mdxModulesMap = {
    sql: sqlMdxModules,
    mongodb: mongodbMdxModules,
    oramadb: oramadbMdxModules,
    neo4j: neo4jMdxModules,
    qdrant: qdrantMdxModules,
    duckdb: duckdbMdxModules,
    elasticsearch: elasticsearchMdxModules,
    redis: redisMdxModules,
  } as const

  const mdxModules =
    mdxModulesMap[courseType as keyof typeof mdxModulesMap] || sqlMdxModules

  const lessonData = findLessonBySlug(courseType, courseId)
  const currentLesson = lessonData?.lesson

  const mdxModule = currentLesson
    ? mdxModules[currentLesson.file as keyof typeof mdxModules]
    : null
  const MdxContent = mdxModule

  const { data: highlightsData } = useApiGet({
    key: ['highlights', courseId] as const,
    path: `/api/content/highlights/${courseId}`,
    staleTime: 0,
    initialData: { highlights: initialHighlights },
  })

  // Merge server data with localStorage
  const savedHighlights = (highlightsData?.highlights ??
    getLocalHighlights(courseId)) as SavedHighlight[]

  const saveHighlightMutation = useApiPost({
    type: 'post',
    key: ['save-highlight'] as const,
    path: '/api/content/highlights',
  })
  const deleteHighlightMutation = useApiPost({
    type: 'delete',
    key: ['delete-highlight'] as const,
    path: '/api/content/highlights',
  })

  const handleSaveHighlight = async (highlightData: any) => {
    // Generate temp ID for immediate UI update
    const tempId = generateTempId()
    const newHighlight: SavedHighlight = {
      id: tempId,
      ...highlightData,
    }

    // Save to localStorage immediately (offline-first)
    addLocalHighlight(courseId, newHighlight)

    // If online, try to save to server
    if (navigator.onLine) {
      try {
        const result = await saveHighlightMutation.mutateAsync({
          ...highlightData,
          courseId,
        })

        // Update localStorage with real ID from server
        deleteLocalHighlight(courseId, tempId)
        addLocalHighlight(courseId, { ...newHighlight, id: result.id })

        return result.id
      } catch (error) {
        console.error('Error saving highlight to server:', error)
        // Add to pending sync queue
        addPendingSyncOperation(courseId, {
          id: tempId,
          type: 'create',
          data: { ...highlightData, courseId },
          timestamp: Date.now(),
        })
        return tempId
      }
    } else {
      // Offline: add to pending sync queue
      addPendingSyncOperation(courseId, {
        id: tempId,
        type: 'create',
        data: { ...highlightData, courseId },
        timestamp: Date.now(),
      })
      return tempId
    }
  }

  const handleDeleteHighlight = async (id: string) => {
    // Delete from localStorage immediately (offline-first)
    deleteLocalHighlight(courseId, id)

    // If online, try to delete from server
    if (navigator.onLine) {
      try {
        await deleteHighlightMutation.mutateAsync({ id })
      } catch (error) {
        console.error('Error deleting highlight from server:', error)
        // Add to pending sync queue
        addPendingSyncOperation(courseId, {
          id: `delete_${id}_${Date.now()}`,
          type: 'delete',
          data: { id },
          timestamp: Date.now(),
        })
      }
    } else {
      // Offline: add to pending sync queue
      addPendingSyncOperation(courseId, {
        id: `delete_${id}_${Date.now()}`,
        type: 'delete',
        data: { id },
        timestamp: Date.now(),
      })
    }
  }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden md:block">
        <CourseSidebar currentLessonSlug={courseId} courseType={courseType} />
      </div>

      {/* Main Content */}
      <div
        id="course-content-scroll-area"
        className="flex-1 overflow-y-auto bg-background relative scroll-smooth"
      >
        <div className="max-w-4xl mx-auto px-8 py-12">
          <PageHeader
            contentRef={contentRef as React.RefObject<HTMLDivElement>}
            className="mb-8"
            initialIsBookmarked={initialIsBookmarked}
          />

          {/* Article Content */}
          <article
            ref={contentRef}
            className="prose dark:prose-invert max-w-none"
          >
            <TextHighlighter
              savedHighlights={savedHighlights as any}
              onSaveHighlight={handleSaveHighlight}
              onDeleteHighlight={handleDeleteHighlight}
            >
              {MdxContent ? <MdxContent components={mdxComponents} /> : null}
            </TextHighlighter>
          </article>
          <div className=" w-full p-8  flex gap-8 items-center-safe justify-between">
            {prev?.slug && (
              <Link
                to="/learning/$course/$courseId"
                params={{
                  course: courseType,
                  courseId: prev?.slug,
                }}
                className="w-full"
              >
                <Button
                  className="w-full cursor-pointer  p-10 border-2 rounded-xl border-border"
                  variant="ghost"
                >
                  <ArrowLeft />
                  Previous Chapter
                  <img
                    src={`${prev?.content_url.replace('/upload/', '/upload/w_100,q_auto:low,f_auto/')}`}
                    alt={prev?.title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    className="object-cover h-15 rounded-md mx-2"
                  />
                </Button>
              </Link>
            )}
            {next?.slug && (
              <Link
                to="/learning/$course/$courseId"
                params={{
                  course: courseType,
                  courseId: next?.slug,
                }}
                className="w-full"
              >
                <Button
                  className="w-full  cursor-pointer p-10 border-2 rounded-xl border-border"
                  variant="ghost"
                >
                  <img
                    src={`${next?.content_url.replace('/upload/', '/upload/w_100,q_auto:low,f_auto/')}`}
                    alt={next?.title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    className="object-cover h-15 rounded-md mx-2"
                  />
                  Next Chapter
                  <ArrowRight />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <BottomDock
          containerId="course-content-scroll-area"
          initialIsBookmarked={initialIsBookmarked}
        />
      </div>
    </div>
  )
}
