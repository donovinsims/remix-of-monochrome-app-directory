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
        <Badge variant="secondary" className="text-xs">
          Free
        </Badge>
      );
    }
    
    if (app.pricingModel === 'Subscription' && app.price) {
      return (
        <Badge variant="default" className="text-xs">
          {formatPrice(app.price)}/mo
        </Badge>
      );
    }
    
    if (app.price) {
      return (
        <Badge variant="default" className="text-xs">
          {formatPrice(app.price)}
        </Badge>
      );
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
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
          {/* Hero Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
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
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6 text-center">
              <div className="mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                  {app.category}
                </span>
              </div>
              
              <p className="text-white/95 text-sm leading-relaxed max-w-[90%] line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {app.shortDescription}
              </p>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3 z-10">
              {getPriceBadge()}
            </div>
            
            {/* Platform indicator */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-black/70 text-foreground backdrop-blur-sm">
                {app.platform}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 bg-card">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0 mb-1">
                  <h3 className="text-base font-semibold text-foreground truncate group-hover:text-foreground/80 transition-colors">
                    {app.name}
                  </h3>
                  {app.tags?.includes('New') && (
                    <Sparkles className="h-4 w-4 text-foreground/60 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 truncate">
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
                <div className="p-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}