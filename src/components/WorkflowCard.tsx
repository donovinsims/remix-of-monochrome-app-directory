"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatBadge } from "@/components/StatBadge";
import { TagBadge } from "@/components/TagBadge";
import { formatNumber } from "@/lib/utils/formatting";
import { useState } from "react";

interface WorkflowCardProps {
  workflow: {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    author: string;
    thumbnailUrl: string;
    difficulty: string;
    useCases?: string[];
    rating: number;
    downloadsCount: number;
  };
  index: number;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop";

export function WorkflowCard({ workflow, index }: WorkflowCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const heroImage = imageError ? PLACEHOLDER_IMAGE : workflow.thumbnailUrl;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/workflows/${workflow.slug}`} className="block">
        <div className="relative">
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 z-10 pointer-events-none" />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse" />
            )}
            
            <Image
              src={heroImage}
              alt={workflow.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            
            {/* Difficulty Badge */}
            <div className="absolute top-3 right-3 z-20">
              <TagBadge label={workflow.difficulty} variant={getDifficultyColor(workflow.difficulty)} />
            </div>
          </div>

          {/* Content */}
          <div className="relative pt-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {workflow.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  by {workflow.author}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {workflow.shortDescription}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-2 pt-1">
              <StatBadge icon={<Star className="h-3.5 w-3.5" />} value={workflow.rating.toFixed(1)} variant="secondary" />
              <StatBadge icon={<Download className="h-3.5 w-3.5" />} value={workflow.downloadsCount} variant="secondary" />
            </div>

            {/* Use Cases */}
            {workflow.useCases && workflow.useCases.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {workflow.useCases.slice(0, 3).map((useCase, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                    {useCase}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
