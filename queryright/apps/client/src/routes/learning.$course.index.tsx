import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import {
  BookOpen,
  Clock,
  FileText,
  LayoutList,
  MessageCircle,
} from 'lucide-react'
import { Image } from '@unpic/react'
import type { LessonItem } from '@/lib/course-structure'
import { courseStructure } from '@/lib/course-structure'

type ValidCourse =
  | 'sql'
  | 'mongodb'
  | 'oramadb'
  | 'neo4j'
  | 'qdrant'
  | 'duckdb'
  | 'elasticsearch'
  | 'redis'

export const Route = createFileRoute('/learning/$course/')({
  component: CourseStructurePage,
  loader: ({ params }) => {
    const { course } = params
    const validCourses: ValidCourse[] = [
      'sql',
      'mongodb',
      'oramadb',
      'neo4j',
      'qdrant',
      'duckdb',
      'elasticsearch',
      'redis',
    ]
    if (!validCourses.includes(course as ValidCourse)) {
      throw notFound()
    }
  },
})

function CourseStructurePage() {
  const { course } = Route.useParams()
  const validCourse = course as ValidCourse

  const courseData = courseStructure[validCourse]

  const courseTitles: Record<ValidCourse, string> = {
    sql: 'SQL Foundations',
    mongodb: 'MongoDB Aggregations',
    oramadb: 'OramaDB: Edge-Native Search',
    neo4j: 'Neo4j: Graph Databases',
    qdrant: 'Qdrant: Vector Search',
    duckdb: 'DuckDB: OLAP Analytics',
    elasticsearch: 'Elasticsearch: Distributed Search',
    redis: 'Redis: In-Memory Database',
  }

  const courseTitle = courseTitles[validCourse]

  return (
    <div className="min-h-screen bg-background w-full flex flex-col items-center py-10 px-4 md:px-8">
      <div className="max-w-4xl w-full mb-10 space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground capitalize">
          {courseTitle}
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse comprehensive guides and documentation for this module.
        </p>
      </div>

      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={validCourse}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 pb-20"
          >
            {courseData.map((module) => (
              <div key={module.id} className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground pt-4 pb-2">
                  <LayoutList size={18} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {module.title}
                  </h3>
                  <div className="h-px bg-border flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {module.lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      moduleTitle={module.title}
                      type={validCourse}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function LessonCard({
  lesson,
  moduleTitle,
  type,
}: {
  lesson: LessonItem
  moduleTitle: string
  type: ValidCourse
}) {
  const moduleShortName = moduleTitle.split(':')[0]

  return (
    <div className="group w-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-0.5">
      <Link
        to="/learning/$course/$courseId"
        params={{
          course: type,
          courseId: lesson.slug,
        }}
        className="flex flex-col-reverse md:flex-row h-full"
      >
        {/* Left Side: Content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-h-40">
          <div>
            {/* Top Meta Row */}
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
              <FileText size={12} className="text-primary" />
              <span>Documentation</span>
              <span className="text-muted-foreground/50">•</span>
              <span>{moduleShortName}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {lesson.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              In-depth guide covering {lesson.title.toLowerCase()}. Master the
              core concepts and implementation details for efficient data
              handling.
            </p>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-medium text-primary group-hover:text-primary/80 transition-colors">
              <BookOpen size={14} />
              View Full Coverage
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-80 h-48 md:h-auto relative bg-muted shrink-0 overflow-hidden flex items-center justify-center">
          <Image
            src={lesson.content_url}
            alt={lesson.title}
            layout="fullWidth"
            className="w-full h-full object-fill! transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal"
            loading="lazy"
            cdn="cloudinary"
            crossOrigin="anonymous"
          />
          {/* Theme-aware overlay */}
          <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/10 dark:to-black/40 pointer-events-none" />
        </div>
      </Link>
    </div>
  )
}
