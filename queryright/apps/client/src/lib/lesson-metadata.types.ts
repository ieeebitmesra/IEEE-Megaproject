/**
 * Lesson Metadata Type Definitions
 * Comprehensive types for SEO, LLMO, and structured data
 */

export interface Author {
  name: string
  url?: string
  email?: string
}

export interface Publisher {
  name: string
  url: string
  logo: string
}

export interface LessonMetadata {
  // Basic Information
  id: string
  slug: string
  title: string
  description: string
  excerpt?: string

  // Content Details
  keywords: string[]
  category: 'SQL' | 'MongoDB' | 'Database'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedReadingTime: number // in minutes

  // Educational Information
  learningOutcomes: string[]
  prerequisites: string[]
  courseType: 'sql' | 'mongodb'
  moduleId: string
  moduleTitle: string

  // SEO & Social
  canonicalUrl: string
  ogImage: string
  ogType: 'article' | 'website'
  twitterCard: 'summary' | 'summary_large_image'

  // Dates
  datePublished: string // ISO 8601
  dateModified: string // ISO 8601

  // Author & Publisher
  author: Author
  publisher: Publisher

  // Structured Data
  inLanguage: string
  educationalLevel: string
  learningResourceType: 'LearningComponent' | 'Course' | 'Tutorial'

  // Navigation
  breadcrumbs: Breadcrumb[]

  // Additional
  tags: string[]
  isAccessibleForFree: boolean
}

export interface Breadcrumb {
  position: number
  name: string
  item: string
}

export interface CourseMetadata {
  name: string
  description: string
  url: string
  provider: Publisher
  coursePrerequisites: string[]
  totalLessons: number
  estimatedDuration: string
  inLanguage: string
  teaches: string[]
}

export interface StructuredDataArticle {
  '@context': string
  '@type': string
  headline: string
  description: string
  image: string | string[]
  author: {
    '@type': string
    name: string
    url?: string
  }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
  keywords: string
  articleSection: string
  inLanguage: string
  educationalLevel?: string
  learningResourceType?: string
  teaches?: string[]
  isAccessibleForFree: boolean
}

export interface StructuredDataBreadcrumb {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item: string
  }>
}

export interface StructuredDataCourse {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
    sameAs: string
  }
  hasCourseInstance?: {
    '@type': string
    courseMode: string
    courseWorkload: string
  }
}

export interface MetaTags {
  title: string
  description: string
  keywords: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  ogType: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  author: string
  publisher: string
  datePublished: string
  dateModified: string
  articleSection: string
  articleTag: string
}
