"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { useState } from "react";

export interface App {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  developer: string;
  iconUrl: string;
  downloadUrl: string;
  platform: string;
  category: string;
  rating: number;
  reviewsCount: number;
  screenshots?: string[];
}

interface AppCardProps {
  app: App;
  index: number;
}

// Fallback placeholder for missing images
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop";

export function AppCard({ app, index }: AppCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use first screenshot as hero image, fallback to iconUrl, then placeholder
  const heroImage = imageError 
    ? PLACEHOLDER_IMAGE 
    : (app.screenshots?.[0] || app.iconUrl || PLACEHOLDER_IMAGE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/apps/${app.slug}`} className="block">
        <div className="relative">
          {/* Hero Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 z-10 pointer-events-none" />
            
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse" />
            )}
            
            <Image
              src={heroImage}
              alt={app.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            
            {/* Hover Overlay with Product Information */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center z-20">
              {/* Category Badge */}
              <div className="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-medium text-white/90 border border-white/10">
                  {app.category}
                </span>
              </div>
              
              {/* App Description */}
              <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[95%] line-clamp-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {app.shortDescription}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative pt-2.5 pb-1">
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {app.name}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-600 flex-shrink-0">·</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {app.category}
                  </span>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div onClick={(e) => e.preventDefault()}>
                  <BookmarkButton appId={app.id} />
                </div>
                <div className="p-0 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden>
                  <ExternalLink className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}