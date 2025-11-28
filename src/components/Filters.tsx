"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  { label: "All", value: "all" },
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
      {/* Top Row: Pricing Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {pricingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePricingChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                currentPricing === option.value
                  ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
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
          <SelectTrigger className="w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform.value} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentTag} onValueChange={handleTagChange}>
          <SelectTrigger className="w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800">
            <SelectValue placeholder="Tags" />
          </SelectTrigger>
          <SelectContent>
            {tagOptions.map((tag) => (
              <SelectItem key={tag.value} value={tag.value}>
                {tag.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
              currentCategory === category
                ? "bg-black dark:bg-white text-white dark:text-black border-transparent"
                : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}