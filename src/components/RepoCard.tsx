"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, GitFork, Github, ExternalLink } from "lucide-react";
import { StatBadge } from "@/components/StatBadge";
import { getLanguageColor } from "@/lib/github-languages";
import { formatRelativeTime } from "@/lib/utils/formatting";

interface RepoCardProps {
  repo: {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    author: string;
    githubUrl: string;
    stars: number;
    forks: number;
    language: string;
    topics?: string[];
    lastUpdated: string;
    isArchived: boolean;
  };
  index: number;
}

export function RepoCard({ repo, index }: RepoCardProps) {
  const topics = repo.topics ? JSON.parse(repo.topics as unknown as string) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/repos/${repo.slug}`} className="block">
        <div className="relative p-5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                <Github className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white truncate mb-1">
                  {repo.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {repo.author}
                </p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {repo.shortDescription}
          </p>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topics.slice(0, 4).map((topic: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {repo.language}
                </span>
              </div>
              <StatBadge icon={<Star className="h-3 w-3" />} value={repo.stars} variant="secondary" />
              <StatBadge icon={<GitFork className="h-3 w-3" />} value={repo.forks} variant="secondary" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatRelativeTime(repo.lastUpdated)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
