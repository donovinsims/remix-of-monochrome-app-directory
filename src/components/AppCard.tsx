"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
      return <Badge variant="secondary" className="text-xs">Free</Badge>;
    }
    
    if (app.pricingModel === 'Subscription' && app.price) {
      return <Badge variant="default" className="text-xs bg-zinc-800 dark:bg-zinc-200">{formatPrice(app.price)}/mo</Badge>;
    }
    
    if (app.price) {
      return <Badge variant="default" className="text-xs bg-zinc-800 dark:bg-zinc-200">{formatPrice(app.price)}</Badge>;
    }
    
    return null;
  };

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
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 z-10 pointer-events-none" />
            
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
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center z-20">
              <div className="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-medium text-white/90 border border-white/10">
                  {app.category}
                </span>
              </div>
              
              <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[95%] line-clamp-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {app.shortDescription}
              </p>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3 z-20">
              {getPriceBadge()}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative pt-2.5 pb-1">
            <div className="flex items-start gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0 mb-1">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {app.name}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-600 flex-shrink-0">·</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {app.category}
                  </span>
                </div>
                
                {/* Tags */}
                {app.tags && app.tags.length > 0 && (
                  <AppTags tags={app.tags} limit={2} />
                )}
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