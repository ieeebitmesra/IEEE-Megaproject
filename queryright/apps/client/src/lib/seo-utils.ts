/**
 * SEO Utility Functions
 * Generate meta tags, structured data, and SEO-optimized content
 */

import type {
  LessonMetadata,
  StructuredDataArticle,
  StructuredDataBreadcrumb,
  StructuredDataCourse,
} from './lesson-metadata.types'

/**
 * Generate meta tags for TanStack Start head property
 */
export function generateMetaTags(metadata: LessonMetadata) {
  return [
    // Basic Meta Tags
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords.join(', ') },
    { name: 'author', content: metadata.author.name },
    { name: 'publisher', content: metadata.publisher.name },

    // Open Graph Tags
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.description },
    { property: 'og:image', content: metadata.ogImage },
    { property: 'og:url', content: metadata.canonicalUrl },
    { property: 'og:type', content: metadata.ogType },
    { property: 'og:site_name', content: metadata.publisher.name },
    { property: 'og:locale', content: metadata.inLanguage },

    // Article-specific Open Graph Tags
    { property: 'article:published_time', content: metadata.datePublished },
    { property: 'article:modified_time', content: metadata.dateModified },
    { property: 'article:author', content: metadata.author.name },
    { property: 'article:section', content: metadata.moduleTitle },
    { property: 'article:tag', content: metadata.tags.join(', ') },

    // Twitter Card Tags
    { name: 'twitter:card', content: metadata.twitterCard },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.description },
    { name: 'twitter:image', content: metadata.ogImage },

    // Educational Meta Tags
    { name: 'educational-level', content: metadata.educationalLevel },
    { name: 'learning-resource-type', content: metadata.learningResourceType },

    // Additional SEO Tags
    {
      name: 'robots',
      content:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    { name: 'googlebot', content: 'index, follow' },
  ]
}

/**
 * Generate page title
 */
export function generateTitle(metadata: LessonMetadata): string {
  return metadata.title
}

/**
 * Generate canonical link tag
 */
export function generateCanonicalLink(
  url: string,
): Array<Record<string, string>> {
  return [
    {
      rel: 'canonical',
      href: url,
    },
  ]
}

/**
 * Generate Article structured data (JSON-LD)
 */
export function generateArticleStructuredData(
  metadata: LessonMetadata,
): StructuredDataArticle {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    image: metadata.ogImage,
    author: {
      '@type': 'Person',
      name: metadata.author.name,
      url: metadata.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: metadata.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: metadata.publisher.logo,
      },
    },
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': metadata.canonicalUrl,
    },
    keywords: metadata.keywords.join(', '),
    articleSection: metadata.moduleTitle,
    inLanguage: metadata.inLanguage,
    educationalLevel: metadata.educationalLevel,
    learningResourceType: metadata.learningResourceType,
    teaches: metadata.learningOutcomes,
    isAccessibleForFree: metadata.isAccessibleForFree,
  }
}

/**
 * Generate Educational Course structured data (JSON-LD)
 */
export function generateCourseStructuredData(
  courseName: string,
  courseDescription: string,
  metadata: LessonMetadata,
): StructuredDataCourse {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    provider: {
      '@type': 'Organization',
      name: metadata.publisher.name,
      sameAs: metadata.publisher.url,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${metadata.estimatedReadingTime}M`,
    },
  }
}

/**
 * Generate Breadcrumb structured data (JSON-LD)
 */
export function generateBreadcrumbStructuredData(
  metadata: LessonMetadata,
): StructuredDataBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: metadata.breadcrumbs.map((breadcrumb) => ({
      '@type': 'ListItem',
      position: breadcrumb.position,
      name: breadcrumb.name,
      item: breadcrumb.item,
    })),
  }
}

/**
 * Generate LearningResource structured data (JSON-LD)
 * For LLMO optimization
 */
export function generateLearningResourceStructuredData(
  metadata: LessonMetadata,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: metadata.title,
    description: metadata.description,
    educationalLevel: metadata.educationalLevel,
    learningResourceType: metadata.learningResourceType,
    teaches: metadata.learningOutcomes,
    inLanguage: metadata.inLanguage,
    isAccessibleForFree: metadata.isAccessibleForFree,
    author: {
      '@type': 'Person',
      name: metadata.author.name,
      url: metadata.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: metadata.publisher.name,
      url: metadata.publisher.url,
      logo: {
        '@type': 'ImageObject',
        url: metadata.publisher.logo,
      },
    },
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified,
    url: metadata.canonicalUrl,
    keywords: metadata.keywords.join(', '),
    about: {
      '@type': 'Thing',
      name: metadata.category,
    },
    educationalUse: 'instruction',
    interactivityType: 'mixed',
    typicalAgeRange: '18-',
  }
}

/**
 * Generate all structured data scripts for a lesson
 */
export function generateAllStructuredData(metadata: LessonMetadata) {
  return [
    {
      type: 'application/ld+json',
      children: JSON.stringify(generateArticleStructuredData(metadata)),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(generateBreadcrumbStructuredData(metadata)),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        generateLearningResourceStructuredData(metadata),
      ),
    },
  ]
}

/**
 * Generate complete head configuration for TanStack Start
 */
export function generateSEOHead(metadata: LessonMetadata) {
  return {
    title: generateTitle(metadata),
    meta: generateMetaTags(metadata),
    links: generateCanonicalLink(metadata.canonicalUrl),
    scripts: generateAllStructuredData(metadata),
  }
}

/**
 * Generate reading time from text content
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200,
): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160,
): string {
  const cleaned = content
    .replace(/[#*`\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength).trim() + '...'
}

/**
 * Validate URL structure for SEO
 */
export function validateSEOUrl(url: string): boolean {
  // Check for lowercase
  if (url !== url.toLowerCase()) return false

  // Check for hyphens instead of underscores
  if (url.includes('_')) return false

  // Check for special characters
  const validPattern = /^[a-z0-9-/]+$/
  return validPattern.test(url)
}

/**
 * Generate social share metadata
 */
export function generateSocialShareData(metadata: LessonMetadata) {
  return {
    title: metadata.title,
    description: metadata.description,
    image: metadata.ogImage,
    url: metadata.canonicalUrl,
    hashtags: metadata.tags.slice(0, 3), // First 3 tags as hashtags
  }
}
