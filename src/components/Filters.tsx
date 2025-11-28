"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Monitor, Tag, Filter } from "lucide-react";

const categories = [
  "All",
  "Productivity",
  "Design",
  "Development",
  "Media",
  "Utilities",
  "Browser",
];

const platforms = [
  { label: "All Platforms", value: "all" },
  { label: "macOS", value: "macOS" },
  { label: "iOS", value: "iOS" },
];

const pricingOptions = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const tagOptions = [
  { label: "All Tags", value: "all" },
  { label: "New", value: "New" },
  { label: "Innovative", value: "Innovative" },
  { label: "Editor Pick", value: "Editor Pick" },
];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "All";
  const currentPlatform = searchParams.get("platform") || "all";
  const currentPricing = searchParams.get("pricing") || "all";
  const currentTag = searchParams.get("tag") || "all";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/?${params.toString()}`);
  };

  const handlePlatformChange = (platform: string) => {
    const params = new URLSearchParams(searchParams);
    if (platform === "all") {
      params.delete("platform");
    } else {
      params.set("platform", platform);
    }
    router.push(`/?${params.toString()}`);
  };

  const handlePricingChange = (pricing: string) => {
    const params = new URLSearchParams(searchParams);
    if (pricing === "all") {
      params.delete("pricing");
    } else {
      params.set("pricing", pricing);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-6 mb-12">
      {/* Top Row: Pricing Tabs with vibrant styling */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-[var(--atomize-surface-secondary)] border border-[var(--atomize-border-primary)] shadow-sm">
          {pricingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePricingChange(option.value)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                currentPricing === option.value
                  ? "bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] text-white shadow-md"
                  : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Second Row: Platform and Tag Dropdowns */}
      <div className="flex flex-wrap justify-center gap-3">
        <Select value={currentPlatform} onValueChange={handlePlatformChange}>
          <SelectTrigger className="w-[180px] rounded-xl border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-elevated)] hover:border-[var(--atomize-primary-300)] transition-colors">
            <Monitor className="h-4 w-4 mr-2 text-[var(--atomize-primary-500)]" />
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-[var(--atomize-border-primary)]">
            {platforms.map((platform) => (
              <SelectItem key={platform.value} value={platform.value} className="rounded-lg">
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentTag} onValueChange={handleTagChange}>
          <SelectTrigger className="w-[180px] rounded-xl border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-elevated)] hover:border-[var(--atomize-secondary-300)] transition-colors">
            <Tag className="h-4 w-4 mr-2 text-[var(--atomize-secondary-500)]" />
            <SelectValue placeholder="Tags" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-[var(--atomize-border-primary)]">
            {tagOptions.map((tag) => (
              <SelectItem key={tag.value} value={tag.value} className="rounded-lg">
                {tag.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories with colorful selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => {
          const isSelected = currentCategory === category;
          // Rotate through accent colors for visual interest
          const colorVariants = [
            { bg: "from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)]", hover: "hover:border-[var(--atomize-primary-300)]" },
            { bg: "from-[var(--atomize-secondary-500)] to-[var(--atomize-secondary-600)]", hover: "hover:border-[var(--atomize-secondary-300)]" },
            { bg: "from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)]", hover: "hover:border-[var(--atomize-accent-300)]" },
            { bg: "from-[var(--atomize-success-500)] to-[var(--atomize-success-600)]", hover: "hover:border-[var(--atomize-success-300)]" },
            { bg: "from-[var(--atomize-warning-500)] to-[var(--atomize-warning-600)]", hover: "hover:border-[var(--atomize-warning-300)]" },
            { bg: "from-[var(--atomize-primary-600)] to-[var(--atomize-secondary-600)]", hover: "hover:border-[var(--atomize-primary-300)]" },
            { bg: "from-[var(--atomize-secondary-600)] to-[var(--atomize-accent-600)]", hover: "hover:border-[var(--atomize-secondary-300)]" },
          ];
          const colorVariant = colorVariants[index % colorVariants.length];
          
          return (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2",
                isSelected
                  ? `bg-gradient-to-r ${colorVariant.bg} text-white border-transparent shadow-md`
                  : `bg-[var(--atomize-surface-elevated)] text-[var(--atomize-text-secondary)] border-[var(--atomize-border-primary)] ${colorVariant.hover} hover:text-[var(--atomize-text-primary)]`
              )}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}