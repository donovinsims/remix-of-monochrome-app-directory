/**
 * Centralized database queries for the app directory
 * Provides type-safe query functions with error handling
 */

import { db } from "@/db";
import { apps, workflows, repos, mcps } from "@/db/schema";
import { like, and, eq, or, desc, ne, sql, asc, inArray } from "drizzle-orm";

// ============================================================================
// Type Definitions
// ============================================================================

export interface WorkflowFilters {
  search?: string;
  category?: string;
  difficulty?: string;
  sort?: 'newest' | 'popular' | 'highest-rated';
}

export interface RepoFilters {
  search?: string;
  language?: string;
  topics?: string[];
  hideArchived?: boolean;
  sort?: 'stars' | 'updated' | 'newest' | 'forks';
}

export interface MCPFilters {
  search?: string;
  category?: string;
  platform?: string;
  provider?: string;
  sort?: 'installs' | 'newest' | 'highest-rated';
}

export interface AppFilters {
  search?: string;
  category?: string;
  platform?: string;
  isPaid?: boolean;
  tags?: string[];
  sort?: 'newest' | 'popular' | 'highest-rated';
}

// ============================================================================
// Workflow Queries
// ============================================================================

/**
 * Get workflows with optional filters
 * @param filters - Optional search, category, difficulty, and sort parameters
 * @returns Array of workflows or empty array on error
 */
export async function getWorkflows(filters?: WorkflowFilters) {
  try {
    const conditions = [];

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          like(workflows.name, searchTerm),
          like(workflows.description, searchTerm),
          like(workflows.author, searchTerm)
        )
      );
    }

    if (filters?.category && filters.category !== 'All') {
      conditions.push(eq(workflows.category, filters.category));
    }

    if (filters?.difficulty && filters.difficulty !== 'All') {
      conditions.push(eq(workflows.difficulty, filters.difficulty));
    }

    let query = db.select().from(workflows);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'popular':
        query = query.orderBy(desc(workflows.downloadsCount));
        break;
      case 'highest-rated':
        query = query.orderBy(desc(workflows.rating));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(workflows.createdAt));
        break;
    }

    return await query;
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
}

/**
 * Get a single workflow by slug
 * @param slug - Workflow slug
 * @returns Workflow object or null on error
 */
export async function getWorkflowBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(workflows)
      .where(eq(workflows.slug, slug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error(`Error fetching workflow with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured workflows
 * @param limit - Maximum number of workflows to return
 * @returns Array of featured workflows or empty array on error
 */
export async function getFeaturedWorkflows(limit: number = 6) {
  try {
    return await db
      .select()
      .from(workflows)
      .orderBy(desc(workflows.rating), desc(workflows.downloadsCount))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching featured workflows:', error);
    return [];
  }
}

// ============================================================================
// Repository Queries
// ============================================================================

/**
 * Get repositories with optional filters
 * @param filters - Optional search, language, topics, and sort parameters
 * @returns Array of repositories or empty array on error
 */
export async function getRepos(filters?: RepoFilters) {
  try {
    const conditions = [];

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          like(repos.name, searchTerm),
          like(repos.description, searchTerm),
          like(repos.author, searchTerm)
        )
      );
    }

    if (filters?.language && filters.language !== 'All') {
      conditions.push(eq(repos.language, filters.language));
    }

    if (filters?.hideArchived) {
      conditions.push(eq(repos.isArchived, false));
    }

    let query = db.select().from(repos);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'stars':
        query = query.orderBy(desc(repos.stars));
        break;
      case 'updated':
        query = query.orderBy(desc(repos.lastUpdated));
        break;
      case 'forks':
        query = query.orderBy(desc(repos.forks));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(repos.createdAt));
        break;
    }

    return await query;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}

/**
 * Get a single repository by slug
 * @param slug - Repository slug
 * @returns Repository object or null on error
 */
export async function getRepoBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(repos)
      .where(eq(repos.slug, slug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error(`Error fetching repo with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get trending repositories
 * @param limit - Maximum number of repositories to return
 * @returns Array of trending repositories or empty array on error
 */
export async function getTrendingRepos(limit: number = 6) {
  try {
    return await db
      .select()
      .from(repos)
      .where(eq(repos.isArchived, false))
      .orderBy(desc(repos.stars), desc(repos.forks))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching trending repos:', error);
    return [];
  }
}

// ============================================================================
// MCP Queries
// ============================================================================

/**
 * Get MCPs with optional filters
 * @param filters - Optional search, category, platform, provider, and sort parameters
 * @returns Array of MCPs or empty array on error
 */
export async function getMCPs(filters?: MCPFilters) {
  try {
    const conditions = [];

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          like(mcps.name, searchTerm),
          like(mcps.description, searchTerm),
          like(mcps.provider, searchTerm)
        )
      );
    }

    if (filters?.category && filters.category !== 'All') {
      conditions.push(eq(mcps.category, filters.category));
    }

    if (filters?.platform && filters.platform !== 'All') {
      conditions.push(eq(mcps.platform, filters.platform));
    }

    if (filters?.provider && filters.provider !== 'All') {
      conditions.push(eq(mcps.provider, filters.provider));
    }

    let query = db.select().from(mcps);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'installs':
        query = query.orderBy(desc(mcps.installsCount));
        break;
      case 'highest-rated':
        query = query.orderBy(desc(mcps.rating));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(mcps.createdAt));
        break;
    }

    return await query;
  } catch (error) {
    console.error('Error fetching MCPs:', error);
    return [];
  }
}

/**
 * Get a single MCP by slug
 * @param slug - MCP slug
 * @returns MCP object or null on error
 */
export async function getMCPBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(mcps)
      .where(eq(mcps.slug, slug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error(`Error fetching MCP with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get popular MCPs
 * @param limit - Maximum number of MCPs to return
 * @returns Array of popular MCPs or empty array on error
 */
export async function getPopularMCPs(limit: number = 6) {
  try {
    return await db
      .select()
      .from(mcps)
      .orderBy(desc(mcps.installsCount), desc(mcps.rating))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching popular MCPs:', error);
    return [];
  }
}

// ============================================================================
// App Queries (Enhanced)
// ============================================================================

/**
 * Get apps with optional filters
 * @param filters - Optional search, category, platform, pricing, and sort parameters
 * @returns Array of apps or empty array on error
 */
export async function getApps(filters?: AppFilters) {
  try {
    const conditions = [];

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          like(apps.name, searchTerm),
          like(apps.description, searchTerm),
          like(apps.developer, searchTerm)
        )
      );
    }

    if (filters?.category && filters.category !== 'All') {
      conditions.push(eq(apps.category, filters.category));
    }

    if (filters?.platform && filters.platform !== 'All') {
      conditions.push(eq(apps.platform, filters.platform));
    }

    if (filters?.isPaid !== undefined) {
      conditions.push(eq(apps.isPaid, filters.isPaid));
    }

    let query = db.select().from(apps);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'popular':
        query = query.orderBy(desc(apps.reviewsCount));
        break;
      case 'highest-rated':
        query = query.orderBy(desc(apps.rating));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(apps.createdAt));
        break;
    }

    return await query;
  } catch (error) {
    console.error('Error fetching apps:', error);
    return [];
  }
}

// ============================================================================
// Shared Queries
// ============================================================================

/**
 * Get related items based on category or tags
 * @param type - Type of item (workflow, repo, mcp, app)
 * @param currentId - ID of current item to exclude
 * @param limit - Maximum number of items to return
 * @returns Array of related items or empty array on error
 */
export async function getRelatedItems(
  type: 'workflow' | 'repo' | 'mcp' | 'app',
  currentId: number,
  limit: number = 4
) {
  try {
    switch (type) {
      case 'workflow': {
        const current = await getWorkflowBySlug(''); // Get by ID instead
        if (!current) return [];
        
        return await db
          .select()
          .from(workflows)
          .where(
            and(
              ne(workflows.id, currentId),
              eq(workflows.category, current.category)
            )
          )
          .orderBy(desc(workflows.rating))
          .limit(limit);
      }
      
      case 'repo': {
        const current = await getRepoBySlug('');
        if (!current) return [];
        
        return await db
          .select()
          .from(repos)
          .where(
            and(
              ne(repos.id, currentId),
              eq(repos.language, current.language)
            )
          )
          .orderBy(desc(repos.stars))
          .limit(limit);
      }
      
      case 'mcp': {
        const current = await getMCPBySlug('');
        if (!current) return [];
        
        return await db
          .select()
          .from(mcps)
          .where(
            and(
              ne(mcps.id, currentId),
              eq(mcps.category, current.category)
            )
          )
          .orderBy(desc(mcps.rating))
          .limit(limit);
      }
      
      case 'app': {
        // Get current app category
        const currentApp = await db
          .select()
          .from(apps)
          .where(eq(apps.id, currentId))
          .limit(1);
        
        if (!currentApp[0]) return [];
        
        return await db
          .select()
          .from(apps)
          .where(
            and(
              ne(apps.id, currentId),
              eq(apps.category, currentApp[0].category)
            )
          )
          .orderBy(desc(apps.rating))
          .limit(limit);
      }
      
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching related ${type}s:`, error);
    return [];
  }
}
