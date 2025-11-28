import { WorkflowGrid } from "@/components/WorkflowGrid";
import { WorkflowFilters } from "@/components/WorkflowFilters";
import { getWorkflows } from "@/lib/db/queries";

export const dynamic = 'force-dynamic';

interface WorkflowsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    difficulty?: string;
    sort?: 'newest' | 'popular' | 'highest-rated';
  }>;
}

export default async function WorkflowsPage({ searchParams }: WorkflowsPageProps) {
  const params = await searchParams;
  
  const workflows = await getWorkflows({
    search: params.search,
    category: params.category,
    difficulty: params.difficulty,
    sort: params.sort,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">
              Workflows
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Discover powerful automation workflows to streamline your tasks and boost productivity
            </p>
          </div>

          {/* Filters */}
          <WorkflowFilters />

          {/* Grid */}
          <WorkflowGrid workflows={workflows} />
        </div>
      </div>
    </div>
  );
}
