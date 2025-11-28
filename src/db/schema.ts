import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const apps = sqliteTable('apps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  developer: text('developer').notNull(),
  iconUrl: text('icon_url').notNull(),
  downloadUrl: text('download_url').notNull(),
  platform: text('platform').notNull(),
  category: text('category').notNull(),
  price: text('price').notNull().default('Free'),
  isPaid: integer('is_paid', { mode: 'boolean' }).notNull().default(false),
  pricingModel: text('pricing_model').notNull().default('Free'),
  screenshots: text('screenshots', { mode: 'json' }),
  tags: text('tags', { mode: 'json' }),
  rating: real('rating').notNull(),
  reviewsCount: integer('reviews_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

export const bookmarks = sqliteTable('bookmarks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  appId: integer('app_id').notNull().references(() => apps.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull(),
});

export const workflows = sqliteTable('workflows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  author: text('author').notNull(),
  thumbnailUrl: text('thumbnail_url').notNull(),
  workflowUrl: text('workflow_url').notNull(),
  category: text('category').notNull(),
  tags: text('tags', { mode: 'json' }),
  difficulty: text('difficulty').notNull(),
  useCases: text('use_cases', { mode: 'json' }),
  rating: real('rating').notNull(),
  downloadsCount: integer('downloads_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

export const repos = sqliteTable('repos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  author: text('author').notNull(),
  githubUrl: text('github_url').notNull(),
  stars: integer('stars').notNull().default(0),
  forks: integer('forks').notNull().default(0),
  language: text('language').notNull(),
  topics: text('topics', { mode: 'json' }),
  isArchived: integer('is_archived', { mode: 'boolean' }).notNull().default(false),
  lastUpdated: text('last_updated').notNull(),
  createdAt: text('created_at').notNull(),
});

export const mcps = sqliteTable('mcps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  provider: text('provider').notNull(),
  mcpUrl: text('mcp_url').notNull(),
  iconUrl: text('icon_url').notNull(),
  platform: text('platform').notNull(),
  category: text('category').notNull(),
  integrations: text('integrations', { mode: 'json' }),
  rating: real('rating').notNull(),
  installsCount: integer('installs_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});