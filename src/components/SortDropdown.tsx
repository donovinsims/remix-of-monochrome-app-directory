"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: readonly SortOption[];
  currentSort: string;
  onSortChange: (value: string) => void;
  placeholder?: string;
}

/**
 * SortDropdown component for reusable sort controls
 */
export function SortDropdown({ 
  options, 
  currentSort, 
  onSortChange,
  placeholder = "Sort by"
}: SortDropdownProps) {
  return (
    <Select value={currentSort} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px] rounded-xl border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
