/**
 * Lesson Metadata API Endpoint
 * Provides detailed metadata for specific lessons - machine-readable for AI systems
 */

import { createFileRoute } from '@tanstack/react-router'
import { getLessonMetadata } from '@/lib/lesson-metadata.registry'
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
  generateLearningResourceStructuredData,
} from '@/lib/seo-utils'

export const Route = createFileRoute('/api/lesson-metadata/$course/$slug')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { course, slug } = params
        const metadata = getLessonMetadata(course, slug)

        if (!metadata) {
          return Response.json(
            {
              error: 'Lesson not found',
              message: `No lesson found for course: ${course}, slug: ${slug}`,
            },
            { status: 404 },
          )
        }

        // Generate comprehensive metadata response
        const response = {
          lesson: {
            id: metadata.id,
            slug: metadata.slug,
            title: metadata.title,
            description: metadata.description,
            url: metadata.canonicalUrl,
            category: metadata.category,
            difficulty: metadata.difficulty,
            estimatedReadingTime: metadata.estimatedReadingTime,
            keywords: metadata.keywords,
            tags: metadata.tags,
          },
          educational: {
            learningOutcomes: metadata.learningOutcomes,
            prerequisites: metadata.prerequisites,
            educationalLevel: metadata.educationalLevel,
            learningResourceType: metadata.learningResourceType,
          },
          structure: {
            course: metadata.courseType,
            moduleId: metadata.moduleId,
            moduleTitle: metadata.moduleTitle,
            breadcrumbs: metadata.breadcrumbs,
          },
          author: metadata.author,
          publisher: metadata.publisher,
          dates: {
            published: metadata.datePublished,
            modified: metadata.dateModified,
          },
          // Include structured data for easy consumption
          structuredData: {
            article: generateArticleStructuredData(metadata),
            breadcrumbs: generateBreadcrumbStructuredData(metadata),
            learningResource: generateLearningResourceStructuredData(metadata),
          },
        }

        return Response.json(response, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          },
        })
      },
    },
  },
})
