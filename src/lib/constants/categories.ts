/**
 * Category and configuration constants for the app directory
 */

// ============================================================================
// Workflow Constants
// ============================================================================

export const WORKFLOW_CATEGORIES = [
  'All',
  'Automation',
  'Data Processing',
  'Integration',
  'Monitoring',
  'Productivity',
] as const;

export type WorkflowCategory = typeof WORKFLOW_CATEGORIES[number];

// ============================================================================
// Repository Constants
// ============================================================================

export const REPO_CATEGORIES = [
  'All',
  'iOS',
  'macOS',
  'CLI Tools',
  'Libraries',
  'Utilities',
  'SwiftUI',
  'UIKit',
] as const;

export type RepoCategory = typeof REPO_CATEGORIES[number];

// ============================================================================
// MCP Constants
// ============================================================================

export const MCP_CATEGORIES = [
  'All',
  'Productivity',
  'Development',
  'Content',
  'Data',
  'Integration',
] as const;

export type MCPCategory = typeof MCP_CATEGORIES[number];

// ============================================================================
// Platform Constants
// ============================================================================

export const PLATFORMS = [
  'All',
  'iOS',
  'macOS',
  'Cross-platform',
] as const;

export type Platform = typeof PLATFORMS[number];

// ============================================================================
// Difficulty Levels
// ============================================================================

export const DIFFICULTY_LEVELS = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

// ============================================================================
// Pricing Models
// ============================================================================

export const PRICING_MODELS = [
  'Free',
  'One-Time Purchase',
  'Subscription',
  'Freemium',
] as const;

export type PricingModel = typeof PRICING_MODELS[number];

// ============================================================================
// App Categories
// ============================================================================

export const APP_CATEGORIES = [
  'All',
  'Productivity',
  'Design',
  'Development',
  'Media',
  'Utilities',
  'Browser',
] as const;

export type AppCategory = typeof APP_CATEGORIES[number];

// ============================================================================
// App Tags
// ============================================================================

export const APP_TAGS = [
  'New',
  'Innovative',
  'Editor Pick',
  'Popular',
  'Trending',
] as const;

export type AppTag = typeof APP_TAGS[number];

// ============================================================================
// Sort Options
// ============================================================================

export const WORKFLOW_SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'highest-rated' },
] as const;

export const REPO_SORT_OPTIONS = [
  { label: 'Most Stars', value: 'stars' },
  { label: 'Recently Updated', value: 'updated' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Forks', value: 'forks' },
] as const;

export const MCP_SORT_OPTIONS = [
  { label: 'Most Installs', value: 'installs' },
  { label: 'Newest', value: 'newest' },
  { label: 'Highest Rated', value: 'highest-rated' },
] as const;

export const APP_SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'highest-rated' },
] as const;
