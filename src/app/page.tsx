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
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Hero />
      
      <div className="container mx-auto px-4 pb-20">
        <Filters />
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Connection Error</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <a 
                href="/" 
                className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity font-medium"
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