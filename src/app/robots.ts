import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration
 * Allows all user agents to index public pages
 * Blocks admin and API routes
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://remix-of-monochrome-app-directory.vercel.app/sitemap.xml',
  };
}
