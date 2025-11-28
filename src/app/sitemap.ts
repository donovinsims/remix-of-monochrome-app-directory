import { MetadataRoute } from 'next';
import { db } from '@/db';
import { apps, workflows, repos, mcps } from '@/db/schema';

/**
 * Dynamic sitemap generation
 * Includes all static pages and dynamic content (apps, workflows, repos, MCPs)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://remix-of-monochrome-app-directory.vercel.app';
  
  try {
    // Fetch all content
    const [appsData, workflowsData, reposData, mcpsData] = await Promise.all([
      db.select({ slug: apps.slug, createdAt: apps.createdAt }).from(apps),
      db.select({ slug: workflows.slug, createdAt: workflows.createdAt }).from(workflows),
      db.select({ slug: repos.slug, createdAt: repos.createdAt, lastUpdated: repos.lastUpdated }).from(repos),
      db.select({ slug: mcps.slug, createdAt: mcps.createdAt }).from(mcps),
    ]);
    
    return [
      // Static pages
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/workflows`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/repos`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/mcps`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      
      // Dynamic app pages
      ...appsData.map((app) => ({
        url: `${baseUrl}/apps/${app.slug}`,
        lastModified: new Date(app.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      
      // Dynamic workflow pages
      ...workflowsData.map((workflow) => ({
        url: `${baseUrl}/workflows/${workflow.slug}`,
        lastModified: new Date(workflow.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      
      // Dynamic repo pages
      ...reposData.map((repo) => ({
        url: `${baseUrl}/repos/${repo.slug}`,
        lastModified: new Date(repo.lastUpdated),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      
      // Dynamic MCP pages
      ...mcpsData.map((mcp) => ({
        url: `${baseUrl}/mcps/${mcp.slug}`,
        lastModified: new Date(mcp.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
