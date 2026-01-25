import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronRight, Database } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { courseStructure } from '@/lib/course-structure'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
  currentLessonSlug: string
  courseType?: string
}

export function CourseSidebar({
  currentLessonSlug,
  courseType = 'sql',
}: CourseSidebarProps) {
  const currentCourseStructure =
    courseStructure[courseType] || courseStructure.sql
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(currentCourseStructure.map((m) => m.id)),
  )

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-sidebar border-r">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          {courseType === 'mongodb' ? (
            <Database className="h-5 w-5" />
          ) : (
            <BookOpen className="h-5 w-5" />
          )}
          <h2 className="font-semibold text-lg">
            {courseType === 'mongodb' ? 'MongoDB Course' : 'SQL Course'}
          </h2>
        </div>
      </div>

      <div className="p-2">
        {currentCourseStructure.map((module) => (
          <div key={module.id} className="mb-2">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-2 h-auto font-medium"
              onClick={() => toggleModule(module.id)}
            >
              {expandedModules.has(module.id) ? (
                <ChevronDown className="h-4 w-4 mr-2 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2 shrink-0" />
              )}
              <span className="text-left text-sm">{module.title}</span>
            </Button>

            {expandedModules.has(module.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to="/learning/$course/$courseId"
                    params={{
                      course: courseType,
                      courseId: lesson.slug,
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start px-3 py-2 h-auto text-sm font-normal',
                        currentLessonSlug === lesson.slug && 'bg-accent',
                      )}
                    >
                      {lesson.title}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
