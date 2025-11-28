'use client';

import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}

export function ErrorBoundary({ 
  error, 
  reset,
  title = "Something went wrong",
  description = "We encountered an error while loading this content."
}: ErrorBoundaryProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-6">
        <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h2>
      
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
        {description}
        {process.env.NODE_ENV === 'development' && (
          <span className="block mt-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-red-600 dark:text-red-400">
            {error.message}
          </span>
        )}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={reset}
          className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        
        <Button 
          variant="outline" 
          asChild
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
