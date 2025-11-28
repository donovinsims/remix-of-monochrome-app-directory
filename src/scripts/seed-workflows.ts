import { db } from "../db";
import { workflows } from "../db/schema";

/**
 * Seed workflows table with 15 realistic n8n workflows
 * Mix of beginner, intermediate, and advanced difficulty levels
 */

const workflowsData = [
  // Beginner workflows
  {
    name: "Slack Notification to Google Sheets",
    slug: "slack-notification-to-google-sheets",
    description: "Automatically log Slack notifications to a Google Sheets spreadsheet for easy tracking and analysis. Perfect for monitoring important team updates and creating audit logs.",
    shortDescription: "Log Slack messages to Google Sheets automatically",
    author: "n8n Team",
    thumbnailUrl: "https://placehold.co/600x400/6366f1/white?text=Slack+to+Sheets",
    workflowUrl: "https://n8n.io/workflows/slack-to-sheets",
    category: "Integration",
    tags: ["slack", "google-sheets", "logging"],
    difficulty: "Beginner",
    useCases: ["team notifications", "data logging", "audit trails"],
    rating: 4.5,
    downloadsCount: 2850,
    createdAt: new Date("2024-08-15").toISOString(),
  },
  {
    name: "Email to Trello Card",
    slug: "email-to-trello-card",
    description: "Convert incoming emails into Trello cards automatically. Great for managing customer inquiries, support tickets, or any email-based workflow that needs task tracking.",
    shortDescription: "Create Trello cards from incoming emails",
    author: "Community",
    thumbnailUrl: "https://placehold.co/600x400/0ea5e9/white?text=Email+to+Trello",
    workflowUrl: "https://n8n.io/workflows/email-to-trello",
    category: "Productivity",
    tags: ["email", "trello", "task-management"],
    difficulty: "Beginner",
    useCases: ["support tickets", "task creation", "email management"],
    rating: 4.3,
    downloadsCount: 1950,
    createdAt: new Date("2024-09-02").toISOString(),
  },
  {
    name: "RSS Feed Aggregator",
    slug: "rss-feed-aggregator",
    description: "Aggregate multiple RSS feeds into a single digest and send daily summaries via email or Slack. Stay updated with your favorite blogs, news sources, and podcasts.",
    shortDescription: "Aggregate RSS feeds and send daily digests",
    author: "n8n Team",
    thumbnailUrl: "https://placehold.co/600x400/10b981/white?text=RSS+Aggregator",
    workflowUrl: "https://n8n.io/workflows/rss-aggregator",
    category: "Automation",
    tags: ["rss", "email", "content-curation"],
    difficulty: "Beginner",
    useCases: ["content curation", "daily digests", "news monitoring"],
    rating: 4.7,
    downloadsCount: 3200,
    createdAt: new Date("2024-07-20").toISOString(),
  },
  {
    name: "Form Submission Notifier",
    slug: "form-submission-notifier",
    description: "Get instant notifications when forms are submitted on your website. Supports multiple notification channels including email, Slack, and SMS.",
    shortDescription: "Instant notifications for form submissions",
    author: "Community",
    thumbnailUrl: "https://placehold.co/600x400/f59e0b/white?text=Form+Notifier",
    workflowUrl: "https://n8n.io/workflows/form-notifier",
    category: "Monitoring",
    tags: ["forms", "notifications", "webhooks"],
    difficulty: "Beginner",
    useCases: ["lead capture", "contact forms", "survey responses"],
    rating: 4.4,
    downloadsCount: 2100,
    createdAt: new Date("2024-10-05").toISOString(),
  },
  {
    name: "Twitter to Discord Bot",
    slug: "twitter-to-discord-bot",
    description: "Post new tweets from specific accounts directly to Discord channels. Perfect for keeping your community updated with the latest announcements.",
    shortDescription: "Post tweets to Discord automatically",
    author: "Discord Community",
    thumbnailUrl: "https://placehold.co/600x400/8b5cf6/white?text=Twitter+to+Discord",
    workflowUrl: "https://n8n.io/workflows/twitter-discord",
    category: "Integration",
    tags: ["twitter", "discord", "social-media"],
    difficulty: "Beginner",
    useCases: ["social media monitoring", "community updates", "announcement sharing"],
    rating: 4.2,
    downloadsCount: 1680,
    createdAt: new Date("2024-09-18").toISOString(),
  },

  // Intermediate workflows
  {
    name: "Automated Invoice Processing",
    slug: "automated-invoice-processing",
    description: "Extract data from invoice PDFs, validate information, and automatically update your accounting system. Includes OCR, data validation, and error handling.",
    shortDescription: "Process invoices automatically with OCR",
    author: "Finance Automation",
    thumbnailUrl: "https://placehold.co/600x400/ef4444/white?text=Invoice+Processing",
    workflowUrl: "https://n8n.io/workflows/invoice-processing",
    category: "Data Processing",
    tags: ["invoices", "ocr", "accounting"],
    difficulty: "Intermediate",
    useCases: ["invoice automation", "expense tracking", "financial reporting"],
    rating: 4.8,
    downloadsCount: 4500,
    createdAt: new Date("2024-06-10").toISOString(),
  },
  {
    name: "GitHub Issue Tracker",
    slug: "github-issue-tracker",
    description: "Monitor GitHub repositories for new issues, pull requests, and comments. Send customized notifications and create weekly summary reports with analytics.",
    shortDescription: "Track GitHub activity with smart notifications",
    author: "DevOps Team",
    thumbnailUrl: "https://placehold.co/600x400/6366f1/white?text=GitHub+Tracker",
    workflowUrl: "https://n8n.io/workflows/github-tracker",
    category: "Monitoring",
    tags: ["github", "development", "notifications"],
    difficulty: "Intermediate",
    useCases: ["project management", "team collaboration", "issue tracking"],
    rating: 4.6,
    downloadsCount: 3800,
    createdAt: new Date("2024-08-01").toISOString(),
  },
  {
    name: "Customer Feedback Pipeline",
    slug: "customer-feedback-pipeline",
    description: "Collect customer feedback from multiple sources (email, surveys, chat), analyze sentiment, categorize by topic, and route to appropriate teams.",
    shortDescription: "Centralize and analyze customer feedback",
    author: "CX Automation",
    thumbnailUrl: "https://placehold.co/600x400/10b981/white?text=Feedback+Pipeline",
    workflowUrl: "https://n8n.io/workflows/feedback-pipeline",
    category: "Data Processing",
    tags: ["customer-feedback", "sentiment-analysis", "routing"],
    difficulty: "Intermediate",
    useCases: ["customer support", "product feedback", "sentiment analysis"],
    rating: 4.7,
    downloadsCount: 2900,
    createdAt: new Date("2024-07-15").toISOString(),
  },
  {
    name: "Social Media Scheduler",
    slug: "social-media-scheduler",
    description: "Schedule and publish posts across multiple social media platforms. Supports image uploads, hashtag optimization, and posting time recommendations.",
    shortDescription: "Schedule posts across social platforms",
    author: "Marketing Pro",
    thumbnailUrl: "https://placehold.co/600x400/ec4899/white?text=Social+Scheduler",
    workflowUrl: "https://n8n.io/workflows/social-scheduler",
    category: "Productivity",
    tags: ["social-media", "scheduling", "marketing"],
    difficulty: "Intermediate",
    useCases: ["content marketing", "social media management", "brand awareness"],
    rating: 4.5,
    downloadsCount: 3400,
    createdAt: new Date("2024-09-10").toISOString(),
  },
  {
    name: "E-commerce Order Fulfillment",
    slug: "ecommerce-order-fulfillment",
    description: "Automate order processing from multiple e-commerce platforms. Includes inventory sync, shipping label generation, and customer notifications.",
    shortDescription: "Automate e-commerce order fulfillment",
    author: "E-commerce Hub",
    thumbnailUrl: "https://placehold.co/600x400/f59e0b/white?text=Order+Fulfillment",
    workflowUrl: "https://n8n.io/workflows/order-fulfillment",
    category: "Automation",
    tags: ["ecommerce", "fulfillment", "shipping"],
    difficulty: "Intermediate",
    useCases: ["order processing", "inventory management", "shipping automation"],
    rating: 4.9,
    downloadsCount: 5000,
    createdAt: new Date("2024-05-25").toISOString(),
  },

  // Advanced workflows
  {
    name: "Multi-Channel Lead Enrichment",
    slug: "multi-channel-lead-enrichment",
    description: "Advanced lead enrichment workflow that collects data from multiple sources (Clearbit, Hunter.io, LinkedIn), scores leads, and syncs with CRM. Includes deduplication and data quality checks.",
    shortDescription: "Enrich leads from multiple data sources",
    author: "Sales Automation Pro",
    thumbnailUrl: "https://placehold.co/600x400/6366f1/white?text=Lead+Enrichment",
    workflowUrl: "https://n8n.io/workflows/lead-enrichment",
    category: "Data Processing",
    tags: ["crm", "lead-scoring", "data-enrichment"],
    difficulty: "Advanced",
    useCases: ["sales automation", "lead qualification", "data enrichment"],
    rating: 4.8,
    downloadsCount: 2400,
    createdAt: new Date("2024-06-30").toISOString(),
  },
  {
    name: "AI-Powered Content Moderator",
    slug: "ai-powered-content-moderator",
    description: "Use machine learning to automatically moderate user-generated content. Detects inappropriate text, images, and spam with customizable rules and human-in-the-loop review.",
    shortDescription: "Moderate content with AI and custom rules",
    author: "AI Workflows",
    thumbnailUrl: "https://placehold.co/600x400/8b5cf6/white?text=Content+Moderator",
    workflowUrl: "https://n8n.io/workflows/content-moderator",
    category: "Automation",
    tags: ["ai", "moderation", "machine-learning"],
    difficulty: "Advanced",
    useCases: ["content moderation", "spam detection", "community management"],
    rating: 4.6,
    downloadsCount: 1800,
    createdAt: new Date("2024-08-22").toISOString(),
  },
  {
    name: "Real-time Data Sync Pipeline",
    slug: "realtime-data-sync-pipeline",
    description: "Bi-directional real-time data synchronization between multiple databases and APIs. Handles conflict resolution, rate limiting, and data transformation.",
    shortDescription: "Sync data in real-time across systems",
    author: "Data Engineering",
    thumbnailUrl: "https://placehold.co/600x400/10b981/white?text=Data+Sync",
    workflowUrl: "https://n8n.io/workflows/data-sync",
    category: "Integration",
    tags: ["data-sync", "apis", "databases"],
    difficulty: "Advanced",
    useCases: ["data integration", "system synchronization", "real-time updates"],
    rating: 4.9,
    downloadsCount: 3100,
    createdAt: new Date("2024-07-08").toISOString(),
  },
  {
    name: "Intelligent Document Classifier",
    slug: "intelligent-document-classifier",
    description: "Machine learning-powered document classification and routing system. Automatically categorizes documents, extracts key information, and routes to appropriate workflows.",
    shortDescription: "Classify and route documents with ML",
    author: "Enterprise Automation",
    thumbnailUrl: "https://placehold.co/600x400/ef4444/white?text=Doc+Classifier",
    workflowUrl: "https://n8n.io/workflows/doc-classifier",
    category: "Data Processing",
    tags: ["machine-learning", "documents", "classification"],
    difficulty: "Advanced",
    useCases: ["document management", "workflow automation", "data extraction"],
    rating: 4.7,
    downloadsCount: 2200,
    createdAt: new Date("2024-09-28").toISOString(),
  },
  {
    name: "DevOps Incident Response",
    slug: "devops-incident-response",
    description: "Comprehensive incident response workflow with automated diagnostics, alerting, escalation, and resolution tracking. Integrates with monitoring tools, ticketing systems, and communication platforms.",
    shortDescription: "Automate incident response and resolution",
    author: "DevOps Elite",
    thumbnailUrl: "https://placehold.co/600x400/0ea5e9/white?text=Incident+Response",
    workflowUrl: "https://n8n.io/workflows/incident-response",
    category: "Monitoring",
    tags: ["devops", "monitoring", "incident-management"],
    difficulty: "Advanced",
    useCases: ["incident management", "system monitoring", "automated diagnostics"],
    rating: 5.0,
    downloadsCount: 4200,
    createdAt: new Date("2024-06-18").toISOString(),
  },
];

async function seedWorkflows() {
  try {
    console.log("🌱 Seeding workflows...");
    
    // Convert useCases array to JSON string for each workflow
    const workflowsWithJsonFields = workflowsData.map(workflow => ({
      ...workflow,
      useCases: JSON.stringify(workflow.useCases),
      tags: JSON.stringify(workflow.tags),
    }));

    await db.insert(workflows).values(workflowsWithJsonFields);
    
    console.log(`✓ Successfully created ${workflowsData.length} workflows`);
  } catch (error) {
    console.error("Error seeding workflows:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedWorkflows()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedWorkflows };
