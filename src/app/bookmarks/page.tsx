"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { AppCard } from "@/components/AppCard";
import { Bookmark, Loader2, Sparkles } from "lucide-react";

interface App {
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
  screenshots: string[] | null;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

interface BookmarkWithApp {
  id: number;
  userId: string;
  appId: number;
  createdAt: string;
  app: App;
}

export default function BookmarksPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkWithApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/bookmarks");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchBookmarks();
    }
  }, [session]);

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("bearer_token");
      const res = await fetch("/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkRemoved = (appId: number) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.app.id !== appId));
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[var(--atomize-surface-primary)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)] flex items-center justify-center animate-pulse">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
          <Loader2 className="h-6 w-6 animate-spin text-[var(--atomize-primary-500)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--atomize-surface-primary)] py-12">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[var(--atomize-accent-200)] rounded-full blur-[120px] opacity-20 dark:opacity-10" />
        <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] bg-[var(--atomize-primary-200)] rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)] flex items-center justify-center shadow-lg">
              <Bookmark className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[var(--atomize-text-primary)]">
                My Bookmarks
              </h1>
              <p className="text-lg text-[var(--atomize-text-secondary)] mt-1">
                Apps you've saved for later
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--atomize-primary-500)]" />
              <p className="text-[var(--atomize-text-secondary)]">Loading your bookmarks...</p>
            </div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-[var(--atomize-accent-100)] to-[var(--atomize-primary-100)] dark:from-[var(--atomize-accent-900)]/40 dark:to-[var(--atomize-primary-900)]/40 flex items-center justify-center mb-6 border border-[var(--atomize-border-primary)]">
              <Bookmark className="h-12 w-12 text-[var(--atomize-accent-500)]" />
            </div>
            <h2 className="text-2xl font-semibold text-[var(--atomize-text-primary)] mb-2">
              No bookmarks yet
            </h2>
            <p className="text-[var(--atomize-text-secondary)] mb-8 max-w-md">
              Start exploring and bookmark your favorite apps to keep them organized in one place.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] text-white rounded-xl font-semibold hover:from-[var(--atomize-primary-600)] hover:to-[var(--atomize-primary-700)] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Discover Apps
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-[var(--atomize-accent-100)] dark:bg-[var(--atomize-accent-900)]/30 text-[var(--atomize-accent-700)] dark:text-[var(--atomize-accent-300)] text-sm font-medium border border-[var(--atomize-accent-200)] dark:border-[var(--atomize-accent-800)]">
              {bookmarks.length} {bookmarks.length === 1 ? "app" : "apps"} saved
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarks.map((bookmark, index) => (
                <AppCard
                  key={bookmark.app.id}
                  app={bookmark.app}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}