'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MCP_CATEGORIES, PLATFORMS, MCP_SORT_OPTIONS } from "@/lib/constants/categories";
import { SortDropdown } from "@/components/SortDropdown";
import { useDebouncedCallback } from "use-debounce";

export function MCPFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filter values
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const currentPlatform = searchParams.get('platform') || 'All';
  const currentSort = searchParams.get('sort') || 'installs';

  // Handle search update with debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`/mcps?${params.toString()}`, { scroll: false });
  }, 300);

  // Handle filter updates
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/mcps?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search MCPs, providers..."
            className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {/* Mobile Filters Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your MCP search
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={currentCategory}
                      onValueChange={(val) => handleFilterChange('category', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {MCP_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Select
                      value={currentPlatform}
                      onValueChange={(val) => handleFilterChange('platform', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORMS.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select
                      value={currentSort}
                      onValueChange={(val) => handleFilterChange('sort', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {MCP_SORT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-2">
            <Select
              value={currentCategory}
              onValueChange={(val) => handleFilterChange('category', val)}
            >
              <SelectTrigger className="w-[160px] bg-white dark:bg-zinc-900">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {MCP_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentPlatform}
              onValueChange={(val) => handleFilterChange('platform', val)}
            >
              <SelectTrigger className="w-[160px] bg-white dark:bg-zinc-900">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <SortDropdown 
              options={[...MCP_SORT_OPTIONS]}
              currentSort={currentSort}
              onSortChange={(val) => handleFilterChange('sort', val)}
            />
          </div>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(currentCategory !== 'All' || currentPlatform !== 'All' || currentSearch) && (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Active filters:</span>
          {currentSearch && (
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
              Search: {currentSearch}
              <button onClick={() => handleSearch('')} className="hover:text-zinc-900 dark:hover:text-zinc-300">×</button>
            </span>
          )}
          {currentCategory !== 'All' && (
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
              Category: {currentCategory}
              <button onClick={() => handleFilterChange('category', 'All')} className="hover:text-zinc-900 dark:hover:text-zinc-300">×</button>
            </span>
          )}
          {currentPlatform !== 'All' && (
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
              Platform: {currentPlatform}
              <button onClick={() => handleFilterChange('platform', 'All')} className="hover:text-zinc-900 dark:hover:text-zinc-300">×</button>
            </span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            onClick={() => router.push('/mcps')}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
