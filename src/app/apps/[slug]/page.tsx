import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Download, Star, ExternalLink, Globe, Calendar, Users, Code } from "lucide-react";
import { db } from "@/db";
import { apps } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { BookmarkButton } from "@/components/BookmarkButton";

interface AppPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await db.select().from(apps).where(eq(apps.slug, slug)).limit(1);

  if (!app.length) {
    return {
      title: "App Not Found",
    };
  }

  return {
    title: `${app[0].name} - Free ${app[0].platform} App`,
    description: app[0].shortDescription,
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const result = await db.select().from(apps).where(eq(apps.slug, slug)).limit(1);

  if (!result.length) {
    notFound();
  }

  const app = result[0];

  // Get category gradient
  const getCategoryGradient = () => {
    const gradients: Record<string, string> = {
      'Productivity': 'from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)]',
      'Design': 'from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)]',
      'Development': 'from-[var(--atomize-secondary-500)] to-[var(--atomize-secondary-600)]',
      'Media': 'from-[var(--atomize-warning-500)] to-[var(--atomize-warning-600)]',
      'Utilities': 'from-[var(--atomize-success-500)] to-[var(--atomize-success-600)]',
      'Browser': 'from-[var(--atomize-primary-600)] to-[var(--atomize-secondary-600)]',
    };
    return gradients[app.category] || 'from-[var(--atomize-primary-500)] to-[var(--atomize-secondary-500)]';
  };

  return (
    <div className="min-h-screen bg-[var(--atomize-surface-primary)] pb-20">
      {/* Header / Breadcrumb */}
      <div className="bg-[var(--atomize-surface-elevated)] border-b border-[var(--atomize-border-primary)]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link 
            href="/" 
            className="text-sm font-medium text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Icon, Info, Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="atomize-card p-8 sticky top-24">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* App Icon with gradient ring */}
                <div className="relative">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${getCategoryGradient()} rounded-[2.75rem] blur-sm opacity-50`} />
                  <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-xl bg-[var(--atomize-surface-tertiary)]">
                    <Image
                      src={app.iconUrl}
                      alt={app.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-[var(--atomize-text-primary)]">
                    {app.name}
                  </h1>
                  <p className="text-lg font-medium text-[var(--atomize-text-secondary)]">
                    by {app.developer}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className={`px-3 py-1.5 text-sm bg-gradient-to-r ${getCategoryGradient()} text-white border-0`}>
                    {app.platform}
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm bg-[var(--atomize-surface-tertiary)] text-[var(--atomize-text-secondary)] border border-[var(--atomize-border-primary)]">
                    {app.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--atomize-warning-100)] dark:bg-[var(--atomize-warning-900)]/30 text-[var(--atomize-warning-700)] dark:text-[var(--atomize-warning-300)] text-sm font-medium border border-[var(--atomize-warning-200)] dark:border-[var(--atomize-warning-800)]">
                    <Star className="h-4 w-4 fill-current" />
                    {app.rating}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-3 pt-4">
                  <Button className={`w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r ${getCategoryGradient()} hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all`} asChild>
                    <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Get App
                    </a>
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl border-[var(--atomize-border-primary)] hover:border-[var(--atomize-primary-300)] hover:bg-[var(--atomize-primary-50)] dark:hover:bg-[var(--atomize-primary-900)]/20 transition-all" asChild>
                      <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4 text-[var(--atomize-primary-500)]" />
                        Website
                      </a>
                    </Button>
                    <BookmarkButton appId={app.id} variant="filled" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Description, Screenshots */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="atomize-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[var(--atomize-text-primary)] flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getCategoryGradient()} flex items-center justify-center`}>
                  <Code className="w-4 h-4 text-white" />
                </div>
                About
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-[var(--atomize-text-secondary)] leading-relaxed">
                  {app.description}
                </p>
              </div>
            </section>

            {/* Screenshots */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[var(--atomize-text-primary)]">
                Preview
              </h2>
              {app.screenshots && (
                <ScreenshotGallery 
                  screenshots={Array.isArray(app.screenshots) ? app.screenshots : JSON.parse(app.screenshots as unknown as string)} 
                  appName={app.name} 
                />
              )}
            </section>

            {/* Stats / Details */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="atomize-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[var(--atomize-primary-500)]" />
                  <span className="text-sm text-[var(--atomize-text-tertiary)]">Reviews</span>
                </div>
                <div className="text-2xl font-bold text-[var(--atomize-text-primary)]">
                  {app.reviewsCount.toLocaleString()}
                </div>
              </div>
              <div className="atomize-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-[var(--atomize-success-500)]" />
                  <span className="text-sm text-[var(--atomize-text-tertiary)]">License</span>
                </div>
                <div className="text-2xl font-bold text-[var(--atomize-success-600)] dark:text-[var(--atomize-success-400)]">
                  Free
                </div>
              </div>
              <div className="atomize-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-[var(--atomize-secondary-500)]" />
                  <span className="text-sm text-[var(--atomize-text-tertiary)]">Added</span>
                </div>
                <div className="text-xl font-bold text-[var(--atomize-text-primary)]">
                  {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="atomize-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-[var(--atomize-accent-500)]" />
                  <span className="text-sm text-[var(--atomize-text-tertiary)]">Developer</span>
                </div>
                <div className="text-lg font-bold text-[var(--atomize-text-primary)] truncate">
                  {app.developer}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}