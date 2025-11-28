"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { AppTags } from "@/components/AppTags";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils/formatting";
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
  isPaid?: boolean;
  pricingModel?: string;
  price?: string;
  tags?: string[];
}

interface AppCardProps {
  app: App;
  index: number;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop";

export function AppCard({ app, index }: AppCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const heroImage = imageError 
    ? PLACEHOLDER_IMAGE 
    : (app.screenshots?.[0] || app.iconUrl || PLACEHOLDER_IMAGE);

  const getPriceBadge = () => {
    if (!app.isPaid || app.price === 'Free') {
      return (
        <Badge className="text-xs bg-[var(--atomize-success-100)] text-[var(--atomize-success-700)] dark:bg-[var(--atomize-success-900)]/50 dark:text-[var(--atomize-success-300)] border border-[var(--atomize-success-300)] dark:border-[var(--atomize-success-700)]">
          Free
        </Badge>
      );
    }
    
    if (app.pricingModel === 'Subscription' && app.price) {
      return (
        <Badge className="text-xs bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] text-white border-0">
          {formatPrice(app.price)}/mo
        </Badge>
      );
    }
    
    if (app.price) {
      return (
        <Badge className="text-xs bg-gradient-to-r from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)] text-white border-0">
          {formatPrice(app.price)}
        </Badge>
      );
    }
    
    return null;
  };

  // Get category color based on category name
  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      'Productivity': 'from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)]',
      'Design': 'from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)]',
      'Development': 'from-[var(--atomize-secondary-500)] to-[var(--atomize-secondary-600)]',
      'Media': 'from-[var(--atomize-warning-500)] to-[var(--atomize-warning-600)]',
      'Utilities': 'from-[var(--atomize-success-500)] to-[var(--atomize-success-600)]',
      'Browser': 'from-[var(--atomize-primary-600)] to-[var(--atomize-secondary-600)]',
    };
    return colors[app.category] || 'from-[var(--atomize-primary-500)] to-[var(--atomize-secondary-500)]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/apps/${app.slug}`} className="block">
        <div className="relative atomize-card overflow-hidden">
          {/* Hero Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--atomize-radius-2xl)]">
            {/* Gradient overlay on top edge */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none" />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--atomize-primary-100)] via-[var(--atomize-secondary-100)] to-[var(--atomize-accent-100)] dark:from-[var(--atomize-primary-900)] dark:via-[var(--atomize-secondary-900)] dark:to-[var(--atomize-accent-900)] animate-pulse" />
            )}
            
            <Image
              src={heroImage}
              alt={app.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            
            {/* Hover Overlay with vibrant gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--atomize-primary-900)]/90 via-[var(--atomize-primary-800)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-5 text-center z-20">
              <div className="mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${getCategoryColor()} rounded-full text-xs font-medium text-white shadow-lg`}>
                  {app.category}
                </span>
              </div>
              
              <p className="text-white/95 text-sm font-medium leading-relaxed max-w-[95%] line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {app.shortDescription}
              </p>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3 z-20">
              {getPriceBadge()}
            </div>
            
            {/* Platform indicator */}
            <div className="absolute top-3 left-3 z-20">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-black/70 text-[var(--atomize-text-primary)] backdrop-blur-sm">
                {app.platform}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-4 bg-[var(--atomize-surface-elevated)]">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0 mb-1.5">
                  <span className="text-base font-semibold text-[var(--atomize-text-primary)] truncate group-hover:text-[var(--atomize-primary-600)] dark:group-hover:text-[var(--atomize-primary-400)] transition-colors">
                    {app.name}
                  </span>
                  {app.tags?.includes('New') && (
                    <Sparkles className="h-4 w-4 text-[var(--atomize-accent-500)] flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-sm text-[var(--atomize-text-secondary)] mb-2 truncate">
                  by {app.developer}
                </p>
                
                {/* Tags */}
                {app.tags && app.tags.length > 0 && (
                  <AppTags tags={app.tags} limit={2} />
                )}
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div onClick={(e) => e.preventDefault()}>
                  <BookmarkButton appId={app.id} />
                </div>
                <div className="p-1.5 rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-[var(--atomize-primary-100)] dark:group-hover:bg-[var(--atomize-primary-900)]/30 transition-all" aria-hidden>
                  <ExternalLink className="h-4 w-4 text-[var(--atomize-primary-500)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}