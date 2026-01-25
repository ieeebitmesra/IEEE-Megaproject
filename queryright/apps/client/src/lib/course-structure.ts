export interface LessonItem {
  id: string
  title: string
  file: string
  slug: string
  content_url: string
}

export interface ModuleItem {
  id: string
  title: string
  lessons: Array<LessonItem>
}

export interface CourseStructure {
  [key: string]: Array<ModuleItem>
}

// Helper function to find lesson by slug
export function findLessonBySlug(
  courseType: string,
  slug: string,
): { lesson: LessonItem; module: ModuleItem } | null {
  const structure = courseStructure[courseType]
  if (!structure) return null

  for (const module of structure) {
    const lesson = module.lessons.find((l) => l.slug === slug)
    if (lesson) {
      return { lesson, module }
    }
  }
  return null
}

// Helper function to get the next/previous lesson
export function getAdjacentLesson(
  courseType: string,
  currentSlug: string,
  direction: 'next' | 'prev',
): LessonItem | null {
  const structure = courseStructure[courseType]
  if (!structure) return null

  const allLessons: Array<LessonItem> = []
  structure.forEach((module) => {
    allLessons.push(...module.lessons)
  })

  const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug)
  if (currentIndex === -1) return null

  const adjacentIndex =
    direction === 'next' ? currentIndex + 1 : currentIndex - 1
  return allLessons[adjacentIndex] || null
}

export const courseStructure: CourseStructure = {
  sql: [
    {
      id: 'module_1',
      title: 'Module 1: SQL Foundations',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'Introduction to Databases',
          file: 'module_1/mod_1_1.mdx',
          slug: 'introduction-to-databases',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724358/1_ohdrt8.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Basic SELECT Queries',
          file: 'module_1/mod_1_2.mdx',
          slug: 'basic-select-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/2_eu9pwl.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Filtering with WHERE',
          file: 'module_1/mod_1_3.mdx',
          slug: 'filtering-with-where',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/3_h9h3lq.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Sorting and Limiting',
          file: 'module_1/mod_1_4.mdx',
          slug: 'sorting-and-limiting',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/4_hhqhop.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Aggregate Functions',
          file: 'module_1/mod_1_5.mdx',
          slug: 'aggregate-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724379/5_zz1ddw.webp',
        },
        {
          id: 'mod_1_6',
          title: 'GROUP BY and HAVING',
          file: 'module_1/mod_1_6.mdx',
          slug: 'group-by-and-having',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/6_zx7vbb.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Data Manipulation',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'INSERT Statements',
          file: 'module_2/mod_2_1.mdx',
          slug: 'insert-statements',
          // Image 7 ignored as requested; using Image 8
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724363/8_uxmfvu.webp',
        },
        {
          id: 'mod_2_2',
          title: 'UPDATE Statements',
          file: 'module_2/mod_2_2.mdx',
          slug: 'update-statements',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/9_epzgcc.webp',
        },
        {
          id: 'mod_2_3',
          title: 'DELETE Statements',
          file: 'module_2/mod_2_3.mdx',
          slug: 'delete-statements',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/10_t71xd9.webp',
        },
        {
          id: 'mod_2_4',
          title: 'CASE Expressions',
          file: 'module_2/mod_2_4.mdx',
          slug: 'case-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/11_doucbr.webp',
        },
        {
          id: 'mod_2_5',
          title: 'NULL Handling',
          file: 'module_2/mod_2_5.mdx',
          slug: 'null-handling',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724437/12_lsqx5j.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Data Aggregation',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'COUNT and SUM',
          file: 'module_3/mod_3_1.mdx',
          slug: 'count-and-sum',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724375/13_f7xugr.webp',
        },
        {
          id: 'mod_3_2',
          title: 'AVG, MIN, MAX',
          file: 'module_3/mod_3_2.mdx',
          slug: 'avg-min-max',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724668/14_lxhrcu.webp',
        },
        {
          id: 'mod_3_3',
          title: 'GROUP BY Basics',
          file: 'module_3/mod_3_3.mdx',
          slug: 'group-by-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724371/15_bohhxd.webp',
        },
        {
          id: 'mod_3_4',
          title: 'HAVING Clause',
          file: 'module_3/mod_3_4.mdx',
          slug: 'having-clause',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724378/16_jjxodt.webp',
        },
        {
          id: 'mod_3_5',
          title: 'String Functions',
          file: 'module_3/mod_3_5.mdx',
          slug: 'string-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724375/17_vjw4v5.webp',
        },
        {
          id: 'mod_3_6',
          title: 'Date Functions',
          file: 'module_3/mod_3_6.mdx',
          slug: 'date-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724379/18_jvy16f.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Joins and Subqueries',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'INNER JOIN',
          file: 'module_4/mod_4_1.mdx',
          slug: 'inner-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724705/19_d1yetd.webp',
        },
        {
          id: 'mod_4_2',
          title: 'LEFT and RIGHT JOIN',
          file: 'module_4/mod_4_2.mdx',
          slug: 'left-and-right-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/20_vmsd1j.webp',
        },
        {
          id: 'mod_4_3',
          title: 'FULL OUTER JOIN',
          file: 'module_4/mod_4_3.mdx',
          slug: 'full-outer-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724414/21_y3an2d.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Self Joins',
          file: 'module_4/mod_4_4.mdx',
          slug: 'self-joins',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/22_oku6ee.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Subqueries',
          file: 'module_4/mod_4_5.mdx',
          slug: 'subqueries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724702/23_solojy.webp',
        },
        {
          id: 'mod_4_6',
          title: 'Correlated Subqueries',
          file: 'module_4/mod_4_6.mdx',
          slug: 'correlated-subqueries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724685/24_foofim.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Advanced Techniques',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Common Table Expressions',
          file: 'module_5/mod_5_1.mdx',
          slug: 'common-table-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724698/25_hqoxfp.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Window Functions',
          file: 'module_5/mod_5_2.mdx',
          slug: 'window-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724711/26_ohxyyg.webp',
        },
        {
          id: 'mod_5_3',
          title: 'RANK and DENSE_RANK',
          file: 'module_5/mod_5_3.mdx',
          slug: 'rank-and-dense-rank',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724716/27_tijnt2.webp',
        },
        {
          id: 'mod_5_4',
          title: 'ROW_NUMBER',
          file: 'module_5/mod_5_4.mdx',
          slug: 'row-number',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724709/28_gzexkd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'PARTITION BY',
          file: 'module_5/mod_5_5.mdx',
          slug: 'partition-by',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724662/29_ht3hdk.webp',
        },
        {
          id: 'mod_5_6',
          title: 'Recursive CTEs',
          file: 'module_5/mod_5_6.mdx',
          slug: 'recursive-ctes',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724661/30_n13umw.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Database Design',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Normalization',
          file: 'module_6/mod_6_1.mdx',
          slug: 'normalization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724663/31_eddimi.webp',
        },
        {
          id: 'mod_6_2',
          title: 'DDL Operations',
          file: 'module_6/mod_6_2.mdx',
          slug: 'ddl-operations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724666/32_bvnout.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Indexes',
          file: 'module_6/mod_6_3.mdx',
          slug: 'indexes',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724666/33_rl2utm.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Query Analysis',
          file: 'module_6/mod_6_4.mdx',
          slug: 'query-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724673/34_xrrqvf.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Best Practices',
          file: 'module_6/mod_6_5.mdx',
          slug: 'best-practices',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724668/35_qrdijj.webp',
        },
        {
          id: 'mod_6_6',
          title: 'Transactions',
          file: 'module_6/mod_6_6.mdx',
          slug: 'transactions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724672/36_tre7iu.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Analytics',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'LAG and LEAD',
          file: 'module_7/mod_7_1.mdx',
          slug: 'lag-and-lead',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724671/37_zk4mus.webp',
        },
        {
          id: 'mod_7_2',
          title: 'OLAP and Data Warehousing',
          file: 'module_7/mod_7_2.mdx',
          slug: 'olap-and-data-warehousing',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724672/38_blyzkj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Materialized Views',
          file: 'module_7/mod_7_3.mdx',
          slug: 'materialized-views',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724677/39_dnhy4v.webp',
        },
        {
          id: 'mod_7_4',
          title: 'JSONB Data Types',
          file: 'module_7/mod_7_4.mdx',
          slug: 'jsonb-data-types',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724682/40_wygong.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Regular Expressions',
          file: 'module_7/mod_7_5.mdx',
          slug: 'regular-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/41_jcxbch.webp',
        },
        {
          id: 'mod_7_6',
          title: 'Dashboard Case Study',
          file: 'module_7/mod_7_6.mdx',
          slug: 'dashboard-case-study',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724676/42_qeihz8.webp',
        },
      ],
    },
  ],
  oramadb: [
    {
      id: 'module_1',
      title: 'Module 1: Vector Search Fundamentals',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What is Orama: Edge-Native Search',
          file: 'module_1/mod_1_1.mdx',
          slug: 'orama-edge-native-search-engine',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'In-Memory Search Architecture',
          file: 'module_1/mod_1_2.mdx',
          slug: 'orama-in-memory-search-architecture',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Full-Text Search Basics',
          file: 'module_1/mod_1_3.mdx',
          slug: 'orama-full-text-search-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Search Index Creation',
          file: 'module_1/mod_1_4.mdx',
          slug: 'orama-search-index-creation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'orama-module-1-vector-search-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Hybrid Search Techniques',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'BM25 Keyword Matching Algorithm',
          file: 'module_2/mod_2_1.mdx',
          slug: 'orama-bm25-keyword-matching',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Combining Semantic and Keyword Search',
          file: 'module_2/mod_2_2.mdx',
          slug: 'orama-hybrid-semantic-keyword-search',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'Boosting and Scoring Results',
          file: 'module_2/mod_2_3.mdx',
          slug: 'orama-boosting-scoring-results',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'Faceted Navigation',
          file: 'module_2/mod_2_4.mdx',
          slug: 'orama-faceted-navigation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'orama-module-2-hybrid-search-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Vector Embeddings and Similarity',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'Understanding Vector Embeddings',
          file: 'module_3/mod_3_1.mdx',
          slug: 'orama-understanding-vector-embeddings',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Similarity Metrics: Cosine and Euclidean',
          file: 'module_3/mod_3_2.mdx',
          slug: 'orama-similarity-metrics-cosine-euclidean',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Vector Search Queries',
          file: 'module_3/mod_3_3.mdx',
          slug: 'orama-vector-search-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Multi-Field Vector Indexing',
          file: 'module_3/mod_3_4.mdx',
          slug: 'orama-multi-field-vector-indexing',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'orama-module-3-embeddings-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Semantic Search and RAG',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'From Keywords to Meaning',
          file: 'module_4/mod_4_1.mdx',
          slug: 'orama-keywords-to-semantic-meaning',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'Implementing RAG: Retrieval-Augmented Generation',
          file: 'module_4/mod_4_2.mdx',
          slug: 'orama-retrieval-augmented-generation-rag',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Context Window Management',
          file: 'module_4/mod_4_3.mdx',
          slug: 'orama-context-window-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Preventing Hallucinations',
          file: 'module_4/mod_4_4.mdx',
          slug: 'orama-preventing-ai-hallucinations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'orama-module-4-semantic-search-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Performance and Optimization',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Query Performance Tuning',
          file: 'module_5/mod_5_1.mdx',
          slug: 'orama-query-performance-tuning',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Caching Strategies for Search',
          file: 'module_5/mod_5_2.mdx',
          slug: 'orama-caching-strategies-search',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Index Optimization and Compression',
          file: 'module_5/mod_5_3.mdx',
          slug: 'orama-index-optimization-compression',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Scaling Orama for Large Datasets',
          file: 'module_5/mod_5_4.mdx',
          slug: 'orama-scaling-large-datasets',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'orama-module-5-performance-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Building Real-World Search Apps',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'E-commerce Product Search',
          file: 'module_6/mod_6_1.mdx',
          slug: 'orama-ecommerce-product-search',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Building Documentation Search',
          file: 'module_6/mod_6_2.mdx',
          slug: 'orama-documentation-search-system',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Content Discovery with Recommendations',
          file: 'module_6/mod_6_3.mdx',
          slug: 'orama-content-discovery-recommendations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Multi-Language Search Support',
          file: 'module_6/mod_6_4.mdx',
          slug: 'orama-multi-language-search',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'orama-module-6-realworld-apps-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Architectures and Final Project',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Edge Deployment and Serverless',
          file: 'module_7/mod_7_1.mdx',
          slug: 'orama-edge-deployment-serverless',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Real-Time Search with WebSockets',
          file: 'module_7/mod_7_2.mdx',
          slug: 'orama-realtime-search-websockets',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Orama Cloud Integration',
          file: 'module_7/mod_7_3.mdx',
          slug: 'orama-cloud-integration',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Building an AI Chatbot with Orama',
          file: 'module_7/mod_7_4.mdx',
          slug: 'orama-ai-chatbot-builder',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Module 7: Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'orama-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  neo4j: [
    {
      id: 'module_1',
      title: 'Module 1: Graph Database Fundamentals',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'Introduction to Graph Databases',
          file: 'module_1/mod_1_1.mdx',
          slug: 'neo4j-graph-database-fundamentals',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Property Graph Model',
          file: 'module_1/mod_1_2.mdx',
          slug: 'neo4j-property-graph-model',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Nodes, Edges, and Properties',
          file: 'module_1/mod_1_3.mdx',
          slug: 'neo4j-nodes-edges-properties',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Real-World Graph Examples',
          file: 'module_1/mod_1_4.mdx',
          slug: 'neo4j-realworld-graph-examples',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'neo4j-module-1-fundamentals-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Cypher Query Language Basics',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'Cypher Syntax Fundamentals',
          file: 'module_2/mod_2_1.mdx',
          slug: 'neo4j-cypher-syntax-fundamentals',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'MERGE Operations and Data Integrity',
          file: 'module_2/mod_2_2.mdx',
          slug: 'neo4j-merge-operations-data-integrity',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'Creating and Querying Relationships',
          file: 'module_2/mod_2_3.mdx',
          slug: 'neo4j-creating-querying-relationships',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'Labels and Filtering',
          file: 'module_2/mod_2_4.mdx',
          slug: 'neo4j-labels-filtering',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'neo4j-module-2-cypher-basics-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Advanced Traversal and Pathfinding',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'Variable Path Expressions',
          file: 'module_3/mod_3_1.mdx',
          slug: 'neo4j-variable-path-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Finding Shortest Paths',
          file: 'module_3/mod_3_2.mdx',
          slug: 'neo4j-shortest-path-algorithms',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Graph Traversal Patterns',
          file: 'module_3/mod_3_3.mdx',
          slug: 'neo4j-graph-traversal-patterns',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Recursive Queries',
          file: 'module_3/mod_3_4.mdx',
          slug: 'neo4j-recursive-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'neo4j-module-3-traversal-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Performance and Indexing',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Index Strategies and Planning',
          file: 'module_4/mod_4_1.mdx',
          slug: 'neo4j-index-strategies-planning',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'Query Profiling and Optimization',
          file: 'module_4/mod_4_2.mdx',
          slug: 'neo4j-query-profiling-optimization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Constraints and Data Quality',
          file: 'module_4/mod_4_3.mdx',
          slug: 'neo4j-constraints-data-quality',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Memory Management',
          file: 'module_4/mod_4_4.mdx',
          slug: 'neo4j-memory-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'neo4j-module-4-performance-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Graph Data Science and Algorithms',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'GDS Projections and Graphs',
          file: 'module_5/mod_5_1.mdx',
          slug: 'neo4j-gds-projections',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Centrality Algorithms: PageRank',
          file: 'module_5/mod_5_2.mdx',
          slug: 'neo4j-centrality-pagerank',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Community Detection: Louvain',
          file: 'module_5/mod_5_3.mdx',
          slug: 'neo4j-community-detection-louvain',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Node Similarity Algorithms',
          file: 'module_5/mod_5_4.mdx',
          slug: 'neo4j-node-similarity-algorithms',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'neo4j-module-5-gds-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Drivers and Production Deployment',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Neo4j Drivers and SDKs',
          file: 'module_6/mod_6_1.mdx',
          slug: 'neo4j-drivers-sdks',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'APOC Library: Extended Procedures',
          file: 'module_6/mod_6_2.mdx',
          slug: 'neo4j-apoc-procedures-library',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Constraints and Data Integrity',
          file: 'module_6/mod_6_3.mdx',
          slug: 'neo4j-data-constraints-integrity',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Cloud Deployment with AuraDB',
          file: 'module_6/mod_6_4.mdx',
          slug: 'neo4j-auradb-cloud-deployment',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'neo4j-module-6-production-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Modeling and Final Project',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Advanced Modeling Patterns',
          file: 'module_7/mod_7_1.mdx',
          slug: 'neo4j-advanced-modeling-patterns',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Avoiding Super Nodes and Pitfalls',
          file: 'module_7/mod_7_2.mdx',
          slug: 'neo4j-super-nodes-pitfalls',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Fraud Detection System Design',
          file: 'module_7/mod_7_3.mdx',
          slug: 'neo4j-fraud-detection-system',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Building Fraud Detection Queries',
          file: 'module_7/mod_7_4.mdx',
          slug: 'neo4j-fraud-detection-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Module 7 & Course Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'neo4j-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  qdrant: [
    {
      id: 'module_1',
      title: 'Module 1: Vector Database Fundamentals',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What is a Vector Database',
          file: 'module_1/mod_1_1.mdx',
          slug: 'qdrant-vector-database-introduction',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Dimensions and Vector Space',
          file: 'module_1/mod_1_2.mdx',
          slug: 'qdrant-vector-dimensions-space',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Embeddings and Embedding Models',
          file: 'module_1/mod_1_3.mdx',
          slug: 'qdrant-embeddings-models',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Normalization and Scaling',
          file: 'module_1/mod_1_4.mdx',
          slug: 'qdrant-normalization-scaling',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'qdrant-module-1-fundamentals-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Qdrant Storage Architecture',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'Points, IDs, and Vectors',
          file: 'module_2/mod_2_1.mdx',
          slug: 'qdrant-points-ids-vectors',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Collections and Organization',
          file: 'module_2/mod_2_2.mdx',
          slug: 'qdrant-collections-organization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'Payloads and Metadata Storage',
          file: 'module_2/mod_2_3.mdx',
          slug: 'qdrant-payloads-metadata',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'Named Vectors for Multimodal Data',
          file: 'module_2/mod_2_4.mdx',
          slug: 'qdrant-named-vectors-multimodal',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'qdrant-module-2-storage-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Distance Metrics and Similarity',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'Distance in Vector Space',
          file: 'module_3/mod_3_1.mdx',
          slug: 'qdrant-distance-vector-space',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Cosine Similarity for Text',
          file: 'module_3/mod_3_2.mdx',
          slug: 'qdrant-cosine-similarity-text',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Euclidean Distance L2',
          file: 'module_3/mod_3_3.mdx',
          slug: 'qdrant-euclidean-distance-l2',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Dot Product and Intensity',
          file: 'module_3/mod_3_4.mdx',
          slug: 'qdrant-dot-product-intensity',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'qdrant-module-3-distance-metrics-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Searching and Indexing',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Search API and Top K Queries',
          file: 'module_4/mod_4_1.mdx',
          slug: 'qdrant-search-api-top-k',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'HNSW Indexing Speed Secret',
          file: 'module_4/mod_4_2.mdx',
          slug: 'qdrant-hnsw-indexing',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Hybrid Search with Filters',
          file: 'module_4/mod_4_3.mdx',
          slug: 'qdrant-hybrid-search-filters',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Recommendations and Discovery',
          file: 'module_4/mod_4_4.mdx',
          slug: 'qdrant-recommendations-discovery',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'qdrant-module-4-searching-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Data Management and Operations',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Batch Upserting Data',
          file: 'module_5/mod_5_1.mdx',
          slug: 'qdrant-batch-upserting',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'RAM vs Disk Storage',
          file: 'module_5/mod_5_2.mdx',
          slug: 'qdrant-ram-disk-storage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Snapshots and Backups',
          file: 'module_5/mod_5_3.mdx',
          slug: 'qdrant-snapshots-backups',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Hosting: Docker vs Cloud',
          file: 'module_5/mod_5_4.mdx',
          slug: 'qdrant-hosting-docker-cloud',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'qdrant-module-5-operations-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: RAG and Advanced Applications',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'RAG: Retrieval Augmented Generation',
          file: 'module_6/mod_6_1.mdx',
          slug: 'qdrant-rag-retrieval-augmented-generation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Chunking Strategies',
          file: 'module_6/mod_6_2.mdx',
          slug: 'qdrant-chunking-strategies',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Context Window Management',
          file: 'module_6/mod_6_3.mdx',
          slug: 'qdrant-context-window-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Preventing AI Hallucinations',
          file: 'module_6/mod_6_4.mdx',
          slug: 'qdrant-preventing-hallucinations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'qdrant-module-6-rag-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Building Production Search Systems',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Digital Library Project Planning',
          file: 'module_7/mod_7_1.mdx',
          slug: 'qdrant-digital-library-project',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Initializing Qdrant Collections',
          file: 'module_7/mod_7_2.mdx',
          slug: 'qdrant-initializing-collections',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Implementing Search Functions',
          file: 'module_7/mod_7_3.mdx',
          slug: 'qdrant-search-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Building AI Librarian Chatbot',
          file: 'module_7/mod_7_4.mdx',
          slug: 'qdrant-ai-librarian-chatbot',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Course Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'qdrant-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  mongodb: [
    {
      id: 'module_1',
      title: 'Module 1: Aggregation Pipeline Basics',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What are Aggregation Pipelines',
          file: 'module_1/mod_1_1.mdx',
          slug: 'what-are-aggregation-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Aggregation Framework Architecture',
          file: 'module_1/mod_1_2.mdx',
          slug: 'aggregation-framework-architecture',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'The $match Stage',
          file: 'module_1/mod_1_3.mdx',
          slug: 'match-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'The $project Stage',
          file: 'module_1/mod_1_4.mdx',
          slug: 'project-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Hands-on Lab: Filtering and Projection',
          file: 'module_1/mod_1_5.mdx',
          slug: 'filtering-and-projection-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Grouping and Accumulation',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'The $group Stage',
          file: 'module_2/mod_2_1.mdx',
          slug: 'group-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Accumulator Operators',
          file: 'module_2/mod_2_2.mdx',
          slug: 'accumulator-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'The $unwind Stage',
          file: 'module_2/mod_2_3.mdx',
          slug: 'unwind-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'The $sort and $limit Stages',
          file: 'module_2/mod_2_4.mdx',
          slug: 'sort-and-limit-stages',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Hands-on Lab: Aggregation Analysis',
          file: 'module_2/mod_2_5.mdx',
          slug: 'aggregation-analysis-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Advanced Aggregation',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'The $lookup Stage',
          file: 'module_3/mod_3_1.mdx',
          slug: 'lookup-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Array Operations',
          file: 'module_3/mod_3_2.mdx',
          slug: 'array-operations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Conditional Expressions',
          file: 'module_3/mod_3_3.mdx',
          slug: 'conditional-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'String Manipulation',
          file: 'module_3/mod_3_4.mdx',
          slug: 'string-manipulation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Hands-on Lab: Complex Pipelines',
          file: 'module_3/mod_3_5.mdx',
          slug: 'complex-pipelines-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Date and Math Operations',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Date Operators',
          file: 'module_4/mod_4_1.mdx',
          slug: 'date-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'Arithmetic Operators',
          file: 'module_4/mod_4_2.mdx',
          slug: 'arithmetic-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Comparison and Boolean Logic',
          file: 'module_4/mod_4_3.mdx',
          slug: 'comparison-and-boolean-logic',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Type Conversion',
          file: 'module_4/mod_4_4.mdx',
          slug: 'type-conversion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Hands-on Lab: Data Transformation',
          file: 'module_4/mod_4_5.mdx',
          slug: 'data-transformation-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Pipeline Optimization',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Index Utilization',
          file: 'module_5/mod_5_1.mdx',
          slug: 'index-utilization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Pipeline Performance',
          file: 'module_5/mod_5_2.mdx',
          slug: 'pipeline-performance',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'explain() Method',
          file: 'module_5/mod_5_3.mdx',
          slug: 'explain-method',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Memory Management',
          file: 'module_5/mod_5_4.mdx',
          slug: 'memory-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Best Practices',
          file: 'module_5/mod_5_5.mdx',
          slug: 'best-practices',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
        {
          id: 'mod_5_6',
          title: 'Hands-on Lab: Optimization',
          file: 'module_5/mod_5_6.mdx',
          slug: 'optimization-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/28_zhzllv.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Real-World Applications',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'E-commerce Analytics',
          file: 'module_6/mod_6_1.mdx',
          slug: 'ecommerce-analytics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Time-Series Analysis',
          file: 'module_6/mod_6_2.mdx',
          slug: 'time-series-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Geospatial Queries',
          file: 'module_6/mod_6_3.mdx',
          slug: 'geospatial-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Text Search Pipelines',
          file: 'module_6/mod_6_4.mdx',
          slug: 'text-search-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Hands-on Lab: Case Studies',
          file: 'module_6/mod_6_5.mdx',
          slug: 'case-studies-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Techniques',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'The $facet Stage',
          file: 'module_7/mod_7_1.mdx',
          slug: 'facet-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'The $bucket Stage',
          file: 'module_7/mod_7_2.mdx',
          slug: 'bucket-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'The $graphLookup Stage',
          file: 'module_7/mod_7_3.mdx',
          slug: 'graph-lookup-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Views and On-Demand Pipelines',
          file: 'module_7/mod_7_4.mdx',
          slug: 'views-and-on-demand-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Final Project: Dashboard',
          file: 'module_7/mod_7_5.mdx',
          slug: 'final-project-dashboard',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  duckdb: [
    {
      id: 'module_1',
      title: 'Module 1: OLAP and Columnar Databases',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What is DuckDB and OLAP',
          file: 'module_1/mod_1_1.mdx',
          slug: 'duckdb-olap-columnar-database',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Columnar Storage Architecture',
          file: 'module_1/mod_1_2.mdx',
          slug: 'duckdb-columnar-storage-architecture',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'In-Process Database Advantages',
          file: 'module_1/mod_1_3.mdx',
          slug: 'duckdb-in-process-advantages',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Installation and Setup',
          file: 'module_1/mod_1_4.mdx',
          slug: 'duckdb-installation-setup',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'duckdb-module-1-olap-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Parquet and Data Formats',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'Parquet Format Essentials',
          file: 'module_2/mod_2_1.mdx',
          slug: 'duckdb-parquet-format-essentials',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Reading and Writing Parquet',
          file: 'module_2/mod_2_2.mdx',
          slug: 'duckdb-reading-writing-parquet',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'CSV Integration',
          file: 'module_2/mod_2_3.mdx',
          slug: 'duckdb-csv-integration',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'Data Type Compression',
          file: 'module_2/mod_2_4.mdx',
          slug: 'duckdb-data-type-compression',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'duckdb-module-2-parquet-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Advanced SQL and Time-Series',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'ASOF Joins for Time-Series',
          file: 'module_3/mod_3_1.mdx',
          slug: 'duckdb-asof-joins-timeseries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Window Functions and Analytics',
          file: 'module_3/mod_3_2.mdx',
          slug: 'duckdb-window-functions-analytics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Recursive Queries',
          file: 'module_3/mod_3_3.mdx',
          slug: 'duckdb-recursive-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Array and Struct Data Types',
          file: 'module_3/mod_3_4.mdx',
          slug: 'duckdb-array-struct-types',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'duckdb-module-3-advanced-sql-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Performance and Optimization',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Query Optimization Techniques',
          file: 'module_4/mod_4_1.mdx',
          slug: 'duckdb-query-optimization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'EXPLAIN Statements',
          file: 'module_4/mod_4_2.mdx',
          slug: 'duckdb-explain-statements',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Memory and Cache Management',
          file: 'module_4/mod_4_3.mdx',
          slug: 'duckdb-memory-cache-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Partitioning Large Datasets',
          file: 'module_4/mod_4_4.mdx',
          slug: 'duckdb-partitioning-datasets',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'duckdb-module-4-performance-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Real-World Analytics',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Data Analysis Workflows',
          file: 'module_5/mod_5_1.mdx',
          slug: 'duckdb-data-analysis-workflows',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Machine Learning Preparation',
          file: 'module_5/mod_5_2.mdx',
          slug: 'duckdb-ml-preparation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Data Profiling and Validation',
          file: 'module_5/mod_5_3.mdx',
          slug: 'duckdb-data-profiling-validation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Handling Missing Data',
          file: 'module_5/mod_5_4.mdx',
          slug: 'duckdb-handling-missing-data',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'duckdb-module-5-analytics-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: BI and Visualization Integration',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Connecting BI Tools',
          file: 'module_6/mod_6_1.mdx',
          slug: 'duckdb-connecting-bi-tools',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'DuckDB and Apache Superset',
          file: 'module_6/mod_6_2.mdx',
          slug: 'duckdb-apache-superset',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Creating Dashboards',
          file: 'module_6/mod_6_3.mdx',
          slug: 'duckdb-creating-dashboards',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Real-Time Data Refresh',
          file: 'module_6/mod_6_4.mdx',
          slug: 'duckdb-realtime-data-refresh',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'duckdb-module-6-bi-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Building Analytics Platforms',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Building an Analytics Platform',
          file: 'module_7/mod_7_1.mdx',
          slug: 'duckdb-analytics-platform',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Distributed Analytics with DuckDB',
          file: 'module_7/mod_7_2.mdx',
          slug: 'duckdb-distributed-analytics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Project: Sales Analytics',
          file: 'module_7/mod_7_3.mdx',
          slug: 'duckdb-sales-analytics-project',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Advanced Queries and Insights',
          file: 'module_7/mod_7_4.mdx',
          slug: 'duckdb-advanced-queries-insights',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Course Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'duckdb-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  elasticsearch: [
    {
      id: 'module_1',
      title: 'Module 1: Distributed Search Fundamentals',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What is Elasticsearch',
          file: 'module_1/mod_1_1.mdx',
          slug: 'elasticsearch-distributed-search-engine',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Architecture and Clusters',
          file: 'module_1/mod_1_2.mdx',
          slug: 'elasticsearch-architecture-clusters',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Indexes and Shards',
          file: 'module_1/mod_1_3.mdx',
          slug: 'elasticsearch-indexes-shards',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Document Storage Model',
          file: 'module_1/mod_1_4.mdx',
          slug: 'elasticsearch-document-storage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'elasticsearch-module-1-fundamentals-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Inverted Indexes and Text Analysis',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'Inverted Index Concept',
          file: 'module_2/mod_2_1.mdx',
          slug: 'elasticsearch-inverted-index',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Lucene Query Language',
          file: 'module_2/mod_2_2.mdx',
          slug: 'elasticsearch-lucene-query-language',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'Analyzers and Tokenization',
          file: 'module_2/mod_2_3.mdx',
          slug: 'elasticsearch-analyzers-tokenization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'BM25 Scoring Algorithm',
          file: 'module_2/mod_2_4.mdx',
          slug: 'elasticsearch-bm25-scoring',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'elasticsearch-module-2-indexes-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Query DSL and Searches',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'Query DSL Basics',
          file: 'module_3/mod_3_1.mdx',
          slug: 'elasticsearch-query-dsl-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Term and Match Queries',
          file: 'module_3/mod_3_2.mdx',
          slug: 'elasticsearch-term-match-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Bool Query and Combinations',
          file: 'module_3/mod_3_3.mdx',
          slug: 'elasticsearch-bool-query-combinations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Range and Aggregation Queries',
          file: 'module_3/mod_3_4.mdx',
          slug: 'elasticsearch-range-aggregation-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'elasticsearch-module-3-queries-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: The ELK Stack',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'ELK Stack Overview',
          file: 'module_4/mod_4_1.mdx',
          slug: 'elasticsearch-elk-stack-overview',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'Logstash for Data Pipeline',
          file: 'module_4/mod_4_2.mdx',
          slug: 'elasticsearch-logstash-pipeline',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Kibana Visualization',
          file: 'module_4/mod_4_3.mdx',
          slug: 'elasticsearch-kibana-visualization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Real-Time Log Analysis',
          file: 'module_4/mod_4_4.mdx',
          slug: 'elasticsearch-realtime-log-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'elasticsearch-module-4-elk-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Performance and Scaling',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Index Optimization',
          file: 'module_5/mod_5_1.mdx',
          slug: 'elasticsearch-index-optimization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Cluster Tuning and Scaling',
          file: 'module_5/mod_5_2.mdx',
          slug: 'elasticsearch-cluster-tuning-scaling',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Monitoring and Health',
          file: 'module_5/mod_5_3.mdx',
          slug: 'elasticsearch-monitoring-health',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Backup and Recovery',
          file: 'module_5/mod_5_4.mdx',
          slug: 'elasticsearch-backup-recovery',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'elasticsearch-module-5-performance-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Real-World Applications',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Full-Text Search Implementation',
          file: 'module_6/mod_6_1.mdx',
          slug: 'elasticsearch-fulltext-search',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Log and Event Analytics',
          file: 'module_6/mod_6_2.mdx',
          slug: 'elasticsearch-log-event-analytics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Security Monitoring',
          file: 'module_6/mod_6_3.mdx',
          slug: 'elasticsearch-security-monitoring',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'APM and Performance Monitoring',
          file: 'module_6/mod_6_4.mdx',
          slug: 'elasticsearch-apm-performance-monitoring',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'elasticsearch-module-6-realworld-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Search and Projects',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Fuzzy Search and Autocomplete',
          file: 'module_7/mod_7_1.mdx',
          slug: 'elasticsearch-fuzzy-search-autocomplete',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Phonetic and Language Analysis',
          file: 'module_7/mod_7_2.mdx',
          slug: 'elasticsearch-phonetic-language-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Building Search Applications',
          file: 'module_7/mod_7_3.mdx',
          slug: 'elasticsearch-search-applications',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Project: E-Commerce Search',
          file: 'module_7/mod_7_4.mdx',
          slug: 'elasticsearch-ecommerce-search-project',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Course Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'elasticsearch-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
  redis: [
    {
      id: 'module_1',
      title: 'Module 1: In-Memory Database Fundamentals',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What is Redis',
          file: 'module_1/mod_1_1.mdx',
          slug: 'redis-in-memory-database',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Data Structures Overview',
          file: 'module_1/mod_1_2.mdx',
          slug: 'redis-data-structures',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Key-Value Store Basics',
          file: 'module_1/mod_1_3.mdx',
          slug: 'redis-keyvalue-store-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Installation and Setup',
          file: 'module_1/mod_1_4.mdx',
          slug: 'redis-installation-setup',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Module 1: Summary',
          file: 'module_1/mod_1_5.mdx',
          slug: 'redis-module-1-fundamentals-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Advanced Data Structures',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'Strings and Binary Safety',
          file: 'module_2/mod_2_1.mdx',
          slug: 'redis-strings-binary-safety',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Lists and Deques',
          file: 'module_2/mod_2_2.mdx',
          slug: 'redis-lists-deques',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'Sets and Sorted Sets',
          file: 'module_2/mod_2_3.mdx',
          slug: 'redis-sets-sorted-sets',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'Hashes and Complex Objects',
          file: 'module_2/mod_2_4.mdx',
          slug: 'redis-hashes-complex-objects',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Module 2: Summary',
          file: 'module_2/mod_2_5.mdx',
          slug: 'redis-module-2-structures-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Streams and Pub/Sub',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'Redis Streams Basics',
          file: 'module_3/mod_3_1.mdx',
          slug: 'redis-streams-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Consumer Groups',
          file: 'module_3/mod_3_2.mdx',
          slug: 'redis-consumer-groups',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Pub/Sub Messaging',
          file: 'module_3/mod_3_3.mdx',
          slug: 'redis-pubsub-messaging',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'Event-Driven Architectures',
          file: 'module_3/mod_3_4.mdx',
          slug: 'redis-event-driven-architectures',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Module 3: Summary',
          file: 'module_3/mod_3_5.mdx',
          slug: 'redis-module-3-streams-pubsub-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Caching and Performance',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Cache Design Patterns',
          file: 'module_4/mod_4_1.mdx',
          slug: 'redis-cache-design-patterns',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'TTL and Expiration',
          file: 'module_4/mod_4_2.mdx',
          slug: 'redis-ttl-expiration',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Session Management',
          file: 'module_4/mod_4_3.mdx',
          slug: 'redis-session-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Rate Limiting and Throttling',
          file: 'module_4/mod_4_4.mdx',
          slug: 'redis-rate-limiting-throttling',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Module 4: Summary',
          file: 'module_4/mod_4_5.mdx',
          slug: 'redis-module-4-caching-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Persistence and Replication',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'RDB Snapshots',
          file: 'module_5/mod_5_1.mdx',
          slug: 'redis-rdb-snapshots',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'AOF Logging',
          file: 'module_5/mod_5_2.mdx',
          slug: 'redis-aof-logging',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'Master-Slave Replication',
          file: 'module_5/mod_5_3.mdx',
          slug: 'redis-master-slave-replication',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Cluster Persistence',
          file: 'module_5/mod_5_4.mdx',
          slug: 'redis-cluster-persistence',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Module 5: Summary',
          file: 'module_5/mod_5_5.mdx',
          slug: 'redis-module-5-persistence-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Clustering and Scaling',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Redis Cluster Setup',
          file: 'module_6/mod_6_1.mdx',
          slug: 'redis-cluster-setup',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Sharding and Slot Distribution',
          file: 'module_6/mod_6_2.mdx',
          slug: 'redis-sharding-slot-distribution',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Sentinel for High Availability',
          file: 'module_6/mod_6_3.mdx',
          slug: 'redis-sentinel-high-availability',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Monitoring and Administration',
          file: 'module_6/mod_6_4.mdx',
          slug: 'redis-monitoring-administration',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Module 6: Summary',
          file: 'module_6/mod_6_5.mdx',
          slug: 'redis-module-6-clustering-summary',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Real-World Applications',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'Real-Time Analytics with Bitmaps',
          file: 'module_7/mod_7_1.mdx',
          slug: 'redis-realtime-analytics-bitmaps',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'Leaderboards and Rankings',
          file: 'module_7/mod_7_2.mdx',
          slug: 'redis-leaderboards-rankings',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Message Queues and Job Processing',
          file: 'module_7/mod_7_3.mdx',
          slug: 'redis-message-queues-job-processing',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Building a Complete Application',
          file: 'module_7/mod_7_4.mdx',
          slug: 'redis-complete-application',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Course Conclusion',
          file: 'module_7/mod_7_5.mdx',
          slug: 'redis-course-conclusion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
}
