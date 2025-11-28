import { MCPHero } from "@/components/MCPHero";
import { MCPFilters } from "@/components/MCPFilters";
import { MCPGrid } from "@/components/MCPGrid";
import { getMCPs } from "@/lib/db/queries";

export const dynamic = 'force-dynamic';

interface MCPsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    platform?: string;
    provider?: string;
    sort?: 'installs' | 'newest' | 'highest-rated';
  }>;
}

export default async function MCPsPage({ searchParams }: MCPsPageProps) {
  const params = await searchParams;
  const mcps = await getMCPs(params);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">
      <MCPHero />
      
      <div className="container mx-auto px-4 py-12" id="browse">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Browse MCPs
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 md:mt-0">
              Showing {mcps.length} results
            </p>
          </div>
          
          <MCPFilters />
          <MCPGrid mcps={mcps} />
        </div>
      </div>
    </div>
  );
}
