'use client';

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function MCPsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20">
      <ErrorBoundary 
        error={error} 
        reset={reset}
        title="Failed to load MCPs"
        description="We couldn't fetch the Model Context Protocol tools. This might be due to a network issue or a temporary database problem."
      />
    </div>
  );
}
