"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortDropdown } from "@/components/SortDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORKFLOW_CATEGORIES, DIFFICULTY_LEVELS, WORKFLOW_SORT_OPTIONS } from "@/lib/constants/categories";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function WorkflowFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchQuery, 500);
  
  const currentCategory = searchParams.get("category") || "All";
  const currentDifficulty = searchParams.get("difficulty") || "All";
  const currentSort = searchParams.get("sort") || "newest";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`/workflows?${params.toString()}`);
  }, [debouncedSearch]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/workflows?${params.toString()}`);
  };

  const handleDifficultyChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All") {
      params.delete("difficulty");
    } else {
      params.set("difficulty", value);
    }
    router.push(`/workflows?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`/workflows?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-9 rounded-xl border-zinc-200 dark:border-zinc-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={currentCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {WORKFLOW_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentDifficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <SortDropdown
            options={WORKFLOW_SORT_OPTIONS}
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
}
