import { RepoGrid } from "@/components/RepoGrid";
import { RepoFilters } from "@/components/RepoFilters";
import { getRepos } from "@/lib/db/queries";

export const dynamic = 'force-dynamic';

interface ReposPageProps {
  searchParams: Promise<{
    search?: string;
    language?: string;
    hideArchived?: string;
    sort?: 'stars' | 'updated' | 'newest' | 'forks';
  }>;
}

export default async function ReposPage({ searchParams }: ReposPageProps) {
  const params = await searchParams;
  
  const repos = await getRepos({
    search: params.search,
    language: params.language,
    hideArchived: params.hideArchived === 'true',
    sort: params.sort,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">
              Repositories
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Explore open-source iOS & macOS projects and libraries
            </p>
          </div>

          {/* Filters */}
          <RepoFilters />

          {/* Grid */}
          <RepoGrid repos={repos} />
        </div>
      </div>
    </div>
  );
}
