/**
 * Dynamic Sitemap Generation
 * Generates XML sitemap for all course lessons
 */

import { createFileRoute } from '@tanstack/react-router'
import { getAllLessonMetadata, SITE_URL } from '@/lib/lesson-metadata.registry'

function SitemapComponent() {
  return null
}

export const Route = createFileRoute('/sitemap.xml')({
  component: SitemapComponent,
  server: {
    handlers: {
      GET: async () => {
        // Get all lessons
        const sqlLessons = getAllLessonMetadata('sql')
        const mongodbLessons = getAllLessonMetadata('mongodb')

        // Generate XML sitemap
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Home Page -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  
  <!-- Main Course Pages -->
  <url>
    <loc>${SITE_URL}/learning/sql</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  
  <url>
    <loc>${SITE_URL}/learning/mongodb</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  
  <!-- SQL Lessons -->
${sqlLessons
  .map(
    (lesson) => `  <url>
    <loc>${lesson.canonicalUrl}</loc>
    <lastmod>${lesson.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join('\n')}
  
  <!-- MongoDB Lessons -->
${mongodbLessons
  .map(
    (lesson) => `  <url>
    <loc>${lesson.canonicalUrl}</loc>
    <lastmod>${lesson.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join('\n')}
  
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          },
        })
      },
    },
  },
})
