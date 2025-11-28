import { Hero } from "@/components/Hero";
import { Filters } from "@/components/Filters";
import { AppGrid } from "@/components/AppGrid";
import { db } from "@/db";
import { apps } from "@/db/schema";
import { like, and, eq, or, desc, sql } from "drizzle-orm";

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    platform?: string;
    pricing?: string;
    tag?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const search = params.search;
  const category = params.category;
  const platform = params.platform;
  const pricing = params.pricing;
  const tag = params.tag;

  let results = [];
  let error = null;

  try {
    const conditions = [];

    if (search) {
      const searchTerm = `%${search}%`;
      conditions.push(
        or(
          like(apps.name, searchTerm),
          like(apps.developer, searchTerm),
          like(apps.description, searchTerm)
        )
      );
    }

    if (category && category !== 'All') {
      conditions.push(eq(apps.category, category));
    }

    if (platform) {
      conditions.push(eq(apps.platform, platform));
    }

    // Pricing filter
    if (pricing === 'free') {
      conditions.push(eq(apps.isPaid, false));
    } else if (pricing === 'paid') {
      conditions.push(eq(apps.isPaid, true));
    }

    // Tag filter
    if (tag) {
      conditions.push(sql`json_array_length(${apps.tags}) > 0 AND json_extract(${apps.tags}, '$') LIKE ${'%' + tag + '%'}`);
    }

    let query = db.select().from(apps);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    results = await query.orderBy(desc(apps.id));
  } catch (err) {
    console.error('Database error:', err);
    error = 'Unable to connect to database. The connection timed out. Please refresh the page to try again.';
    results = [];
  }

  return (
    <div className="min-h-screen bg-[var(--atomize-surface-primary)]">
      <Hero />
      
      <div className="container mx-auto px-4 pb-20">
        <Filters />
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md mx-auto atomize-card p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--atomize-error-100)] to-[var(--atomize-error-200)] dark:from-[var(--atomize-error-900)]/40 dark:to-[var(--atomize-error-800)]/40 flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--atomize-error-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--atomize-text-primary)]">Connection Error</h2>
              <p className="text-[var(--atomize-text-secondary)] mb-6">{error}</p>
              <a 
                href="/" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] text-white rounded-xl hover:from-[var(--atomize-primary-600)] hover:to-[var(--atomize-primary-700)] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Refresh Page
              </a>
            </div>
          </div>
        ) : (
          <AppGrid apps={results} />
        )}
      </div>
    </div>
  );
}