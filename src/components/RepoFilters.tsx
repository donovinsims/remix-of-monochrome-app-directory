"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortDropdown } from "@/components/SortDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOP_LANGUAGES } from "@/lib/github-languages";
import { REPO_SORT_OPTIONS } from "@/lib/constants/categories";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function RepoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchQuery, 500);
  
  const currentLanguage = searchParams.get("language") || "All";
  const currentSort = searchParams.get("sort") || "stars";
  const hideArchived = searchParams.get("hideArchived") === "true";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`/repos?${params.toString()}`);
  }, [debouncedSearch]);

  const handleLanguageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All") {
      params.delete("language");
    } else {
      params.set("language", value);
    }
    router.push(`/repos?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`/repos?${params.toString()}`);
  };

  const handleHideArchivedChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("hideArchived", "true");
    } else {
      params.delete("hideArchived");
    }
    router.push(`/repos?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search repositories..."
            className="pl-9 rounded-xl border-zinc-200 dark:border-zinc-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {TOP_LANGUAGES.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <SortDropdown
            options={REPO_SORT_OPTIONS}
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* Hide Archived Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hideArchived"
          checked={hideArchived}
          onCheckedChange={handleHideArchivedChange}
        />
        <label
          htmlFor="hideArchived"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
        >
          Hide archived repositories
        </label>
      </div>
    </div>
  );
}
