"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

interface BookmarkButtonProps {
  appId: number;
  initialIsBookmarked?: boolean;
  className?: string;
  variant?: "default" | "filled";
}

export function BookmarkButton({
  appId,
  initialIsBookmarked = false,
  className,
  variant = "default",
}: BookmarkButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    Boolean(initialIsBookmarked)
  );
  const [loading, setLoading] = useState(false);

  const token = useMemo(
    () => (typeof window !== "undefined" ? localStorage.getItem("bearer_token") : ""),
    []
  );

  // Best-effort sync on mount to reflect real server state
  useEffect(() => {
    let active = true;
    const sync = async () => {
      try {
        // Skip if no token/user – treat as not bookmarked until login
        if (!token) return;
        const res = await fetch("/api/bookmarks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        if (!res.ok) return;
        const items: Array<{ appId: number }> = await res.json();
        if (active) {
          setIsBookmarked(items?.some((b) => Number(b.appId) === Number(appId)) || false);
        }
      } catch (_) {
        // ignore – non-blocking sync
      }
    };
    sync();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId, token]);

  const handleToggle = async () => {
    // Not authenticated → route to login with redirect back
    if (!session?.user) {
      const redirect = encodeURIComponent(pathname || "/");
      router.push(`/login?redirect=${redirect}`);
      return;
    }

    if (loading) return;

    const next = !isBookmarked;
    setIsBookmarked(next); // optimistic
    setLoading(true);

    // Haptic feedback on mobile devices only
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(50);
    }

    try {
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

      if (next) {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeader,
          },
          body: JSON.stringify({ appId }),
        });
        if (!res.ok) throw new Error("Failed to add bookmark");
      } else {
        const res = await fetch(`/api/bookmarks?appId=${appId}`, {
          method: "DELETE",
          headers: {
            ...authHeader,
          },
        });
        if (!res.ok) throw new Error("Failed to remove bookmark");
      }
    } catch (_) {
      // revert on failure
      setIsBookmarked(!next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full transition-all duration-300 active:scale-95",
        variant === "filled" 
          ? "w-10 h-10 bg-[var(--atomize-surface-secondary)] hover:bg-[var(--atomize-surface-tertiary)] border border-[var(--atomize-border-primary)]"
          : "hover:bg-transparent hover:scale-110 dark:hover:bg-transparent",
        isBookmarked && "hover:bg-[var(--atomize-accent-100)] dark:hover:bg-[var(--atomize-accent-900)]/30",
        className
      )}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      onClick={handleToggle}
      disabled={loading}
   >
      <Bookmark
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isBookmarked 
            ? "text-[var(--atomize-accent-500)] fill-[var(--atomize-accent-500)]" 
            : "text-[var(--atomize-text-tertiary)] hover:text-[var(--atomize-accent-400)]"
        )}
        fill={isBookmarked ? "currentColor" : "none"}
      />
      <span className="sr-only">Bookmark</span>
    </Button>
  );
}