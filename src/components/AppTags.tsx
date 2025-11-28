"use client";

import { TagBadge } from "./TagBadge";

interface AppTagsProps {
  tags: string[] | string | unknown;
  limit?: number;
}

/**
 * Display color-coded tag badges for apps
 * - 'New' → blue
 * - 'Innovative' → purple
 * - 'Editor Pick' → gold
 */
export function AppTags({ tags, limit = 3 }: AppTagsProps) {
  // Handle all possible cases for tags
  let parsedTags: string[] = [];
  
  if (!tags) {
    return null;
  }
  
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      parsedTags = Array.isArray(parsed) ? parsed : [];
    } catch {
      // If parsing fails, treat as empty array
      parsedTags = [];
    }
  } else if (Array.isArray(tags)) {
    parsedTags = tags;
  } else {
    // Unknown type, treat as empty
    return null;
  }
  
  // Filter out any non-string items and ensure we have valid tags
  const validTags = parsedTags.filter(tag => typeof tag === 'string' && tag.trim().length > 0);
  
  if (validTags.length === 0) {
    return null;
  }
  
  const displayTags = validTags.slice(0, limit);

  const getTagVariant = (tag: string) => {
    switch (tag) {
      case "New":
        return "primary" as const;
      case "Innovative":
        return "secondary" as const;
      case "Editor Pick":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayTags.map((tag, index) => (
        <TagBadge
          key={`${tag}-${index}`}
          label={tag}
          variant={getTagVariant(tag)}
          size="sm"
        />
      ))}
    </div>
  );
}