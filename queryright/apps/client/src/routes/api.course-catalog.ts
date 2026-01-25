/**
 * Course Catalog API Endpoint
 * Provides machine-readable course catalog for AI systems and search engines
 */

import { createFileRoute } from '@tanstack/react-router'
import { getAllLessonMetadata } from '@/lib/lesson-metadata.registry'

export const Route = createFileRoute('/api/course-catalog')({
  server: {
    handlers: {
      GET: async () => {
        // Get all SQL lessons metadata
        const sqlLessons = getAllLessonMetadata('sql')

        // Structure as schema.org ItemList for better AI understanding
        const catalogData = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'QueryRight Course Catalog',
          description:
            'Complete catalog of interactive database learning courses including SQL, MongoDB, Redis, Elasticsearch tutorials and more',
          numberOfItems: sqlLessons.length,
          itemListElement: sqlLessons.map((lesson, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Course',
              name: lesson.title,
              description: lesson.description,
              url: lesson.canonicalUrl,
              courseCode: lesson.id,
              educationalLevel: lesson.educationalLevel,
              learningResourceType: lesson.learningResourceType,
              teaches: lesson.learningOutcomes,
              keywords: lesson.keywords.join(', '),
              inLanguage: lesson.inLanguage,
              isAccessibleForFree: lesson.isAccessibleForFree,
              timeRequired: `PT${lesson.estimatedReadingTime}M`,
              coursePrerequisites: lesson.prerequisites,
              hasPart: {
                '@type': 'LearningResource',
                educationalUse: 'instruction',
                interactivityType: 'mixed',
              },
              provider: {
                '@type': 'Organization',
                name: lesson.publisher.name,
                url: lesson.publisher.url,
              },
            },
          })),
        }

        return Response.json(catalogData, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          },
        })
      },
    },
  },
})
