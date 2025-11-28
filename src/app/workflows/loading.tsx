import { LoadingState } from "@/components/LoadingState";

export default function WorkflowsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center space-y-4">
            <div className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
            <div className="h-6 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
          </div>
          
          <LoadingState type="grid" count={6} />
        </div>
      </div>
    </div>
  );
}
