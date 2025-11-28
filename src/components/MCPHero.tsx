import Link from "next/link";
import { ArrowRight, Blocks, Zap, Puzzle } from "lucide-react";

export function MCPHero() {
  return (
    <div className="relative border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Model Context Protocol Directory</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Discover Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">MCPs</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-2xl">
            Model Context Protocol tools that enhance AI productivity and integrate deeply with your existing workflows and data sources.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <Blocks className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">150+</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">Curated MCPs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">40+</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">Providers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                <Puzzle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">500+</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">Integrations</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="#browse" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
            >
              Browse MCPs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
