"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Apple, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const debouncedQuery = useDebounce(query, 500);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (debouncedQuery !== (searchParams.get("search") || "")) {
      const params = new URLSearchParams(searchParams);
      if (debouncedQuery) {
        params.set("search", debouncedQuery);
      } else {
        params.delete("search");
      }
      router.push(`/?${params.toString()}`);
    }
  }, [debouncedQuery, router, searchParams]);

  const handleQuickFilter = (filter: string) => {
    const params = new URLSearchParams();
    if (filter === 'free') {
      params.set('pricing', 'free');
    } else if (filter === 'paid') {
      params.set('pricing', 'paid');
    } else if (filter === 'new') {
      params.set('tag', 'New');
    }
    router.push(`/?${params.toString()}`);
  };

  const MotionH1 = mounted ? motion.h1 : "h1";
  const MotionP = mounted ? motion.p : "p";
  const MotionDiv = mounted ? motion.div : "div";

  return (
    <section className="relative pt-24 pb-20 px-4 overflow-hidden">
      {/* Vibrant Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--atomize-primary-200)] rounded-full blur-[120px] opacity-40 dark:opacity-20" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[var(--atomize-secondary-200)] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[var(--atomize-accent-200)] rounded-full blur-[120px] opacity-30 dark:opacity-15" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--atomize-neutral-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--atomize-neutral-200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,var(--atomize-neutral-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--atomize-neutral-800)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      </div>

      <div className="container mx-auto max-w-5xl text-center space-y-10">
        {/* Badge */}
        <MotionDiv
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 }
          })}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--atomize-primary-100)] dark:bg-[var(--atomize-primary-900)]/40 border border-[var(--atomize-primary-200)] dark:border-[var(--atomize-primary-700)] text-[var(--atomize-primary-700)] dark:text-[var(--atomize-primary-300)] text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Hand-curated for quality</span>
          </div>
        </MotionDiv>

        {/* Main Heading with Gradient */}
        <MotionH1
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 }
          })}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="text-[var(--atomize-text-primary)]">Discover </span>
          <span className="bg-gradient-to-r from-[var(--atomize-primary-500)] via-[var(--atomize-secondary-500)] to-[var(--atomize-accent-500)] bg-clip-text text-transparent">
            Amazing Apps
          </span>
          <br />
          <span className="text-[var(--atomize-text-primary)]">for </span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-2xl bg-[var(--atomize-neutral-100)] dark:bg-[var(--atomize-neutral-800)]">
              <Apple className="h-8 w-8 sm:h-10 sm:w-10" />
              <span>iOS</span>
            </span>
            <span className="text-[var(--atomize-text-tertiary)]">&</span>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-2xl bg-[var(--atomize-neutral-100)] dark:bg-[var(--atomize-neutral-800)]">
              <Monitor className="h-8 w-8 sm:h-10 sm:w-10" />
              <span>macOS</span>
            </span>
          </span>
        </MotionH1>

        {/* Subtitle */}
        <MotionP
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.2 }
          })}
          className="text-lg sm:text-xl text-[var(--atomize-text-secondary)] max-w-2xl mx-auto leading-relaxed"
        >
          Explore our collection of free and premium apps, verified for quality. 
          <span className="text-[var(--atomize-primary-600)] dark:text-[var(--atomize-primary-400)] font-medium"> Perfect for students</span> and budget-conscious users.
        </MotionP>

        {/* Search Bar */}
        <MotionDiv
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.3 }
          })}
          className="max-w-xl mx-auto relative"
        >
          <div className="relative group">
            {/* Glow effect on focus */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--atomize-primary-400)] via-[var(--atomize-secondary-400)] to-[var(--atomize-accent-400)] rounded-2xl blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity duration-500" />
            
            <div className="relative flex items-center">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--atomize-text-tertiary)]" />
              <Input
                type="search"
                placeholder="Search apps like 'Arc', 'Notion', 'Raycast'..."
                className="w-full pl-14 pr-6 h-14 rounded-2xl bg-[var(--atomize-surface-elevated)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] text-base shadow-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </MotionDiv>

        {/* Quick Filter Buttons */}
        <MotionDiv
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.4 }
          })}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleQuickFilter('free')}
            className={cn(
              "rounded-full px-6 border-2 transition-all duration-200",
              searchParams.get('pricing') === 'free' 
                ? "bg-[var(--atomize-success-100)] border-[var(--atomize-success-400)] text-[var(--atomize-success-700)] dark:bg-[var(--atomize-success-900)]/30 dark:border-[var(--atomize-success-500)] dark:text-[var(--atomize-success-300)]"
                : "hover:border-[var(--atomize-success-300)] hover:bg-[var(--atomize-success-50)]"
            )}
          >
            <span className="text-lg mr-1">🆓</span> Free Apps
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleQuickFilter('new')}
            className={cn(
              "rounded-full px-6 border-2 transition-all duration-200",
              searchParams.get('tag') === 'New'
                ? "bg-[var(--atomize-secondary-100)] border-[var(--atomize-secondary-400)] text-[var(--atomize-secondary-700)] dark:bg-[var(--atomize-secondary-900)]/30 dark:border-[var(--atomize-secondary-500)] dark:text-[var(--atomize-secondary-300)]"
                : "hover:border-[var(--atomize-secondary-300)] hover:bg-[var(--atomize-secondary-50)]"
            )}
          >
            <Sparkles className="h-4 w-4 mr-1" /> New & Innovative
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleQuickFilter('paid')}
            className={cn(
              "rounded-full px-6 border-2 transition-all duration-200",
              searchParams.get('pricing') === 'paid'
                ? "bg-[var(--atomize-accent-100)] border-[var(--atomize-accent-400)] text-[var(--atomize-accent-700)] dark:bg-[var(--atomize-accent-900)]/30 dark:border-[var(--atomize-accent-500)] dark:text-[var(--atomize-accent-300)]"
                : "hover:border-[var(--atomize-accent-300)] hover:bg-[var(--atomize-accent-50)]"
            )}
          >
            <span className="text-lg mr-1">✨</span> Premium Picks
          </Button>
        </MotionDiv>

        {/* Stats Row */}
        <MotionDiv
          {...(mounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.5 }
          })}
          className="flex flex-wrap justify-center gap-8 pt-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] bg-clip-text text-transparent">500+</div>
            <div className="text-sm text-[var(--atomize-text-secondary)]">Curated Apps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-[var(--atomize-secondary-500)] to-[var(--atomize-secondary-600)] bg-clip-text text-transparent">100%</div>
            <div className="text-sm text-[var(--atomize-text-secondary)]">Hand-Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)] bg-clip-text text-transparent">Free</div>
            <div className="text-sm text-[var(--atomize-text-secondary)]">Forever Access</div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}