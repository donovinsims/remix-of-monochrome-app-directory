'use client';

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ReposError({
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
        title="Failed to load repositories"
        description="We couldn't fetch the repositories. This might be due to a network issue or a temporary database problem."
      />
    </div>
  );
}
