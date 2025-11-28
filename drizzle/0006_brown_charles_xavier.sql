CREATE TABLE `mcps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`short_description` text NOT NULL,
	`provider` text NOT NULL,
	`mcp_url` text NOT NULL,
	`icon_url` text NOT NULL,
	`platform` text NOT NULL,
	`category` text NOT NULL,
	`integrations` text,
	`rating` real NOT NULL,
	`installs_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mcps_slug_unique` ON `mcps` (`slug`);--> statement-breakpoint
CREATE TABLE `repos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`short_description` text NOT NULL,
	`author` text NOT NULL,
	`github_url` text NOT NULL,
	`stars` integer DEFAULT 0 NOT NULL,
	`forks` integer DEFAULT 0 NOT NULL,
	`language` text NOT NULL,
	`topics` text,
	`is_archived` integer DEFAULT false NOT NULL,
	`last_updated` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `repos_slug_unique` ON `repos` (`slug`);--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`short_description` text NOT NULL,
	`author` text NOT NULL,
	`thumbnail_url` text NOT NULL,
	`workflow_url` text NOT NULL,
	`category` text NOT NULL,
	`tags` text,
	`difficulty` text NOT NULL,
	`use_cases` text,
	`rating` real NOT NULL,
	`downloads_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workflows_slug_unique` ON `workflows` (`slug`);--> statement-breakpoint
ALTER TABLE `apps` ADD `is_paid` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `apps` ADD `pricing_model` text DEFAULT 'Free' NOT NULL;--> statement-breakpoint
ALTER TABLE `apps` ADD `tags` text;