import Link from "next/link";
import { Bookmark, Download, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TagBadge } from "@/components/TagBadge";
import { StatBadge } from "@/components/StatBadge";

interface MCPCardProps {
  mcp: {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    provider: string;
    iconUrl: string;
    platform: string;
    category: string;
    integrations: unknown;
    rating: number;
    installsCount: number;
  };
}

export function MCPCard({ mcp }: MCPCardProps) {
  const integrations = Array.isArray(mcp.integrations) 
    ? mcp.integrations as string[] 
    : [];

  return (
    <Card className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg overflow-hidden rounded-xl">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
              {/* In a real app, we would use Next.js Image here */}
              {mcp.iconUrl ? (
                <img 
                  src={mcp.iconUrl} 
                  alt={mcp.name} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`flex items-center justify-center h-full w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 ${mcp.iconUrl ? 'hidden' : ''}`}>
                <span className="text-lg font-bold">{mcp.name.charAt(0)}</span>
              </div>
            </div>
            <div>
              <Link href={`/mcps/${mcp.slug}`} className="block">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {mcp.name}
                </h3>
              </Link>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                by {mcp.provider}
              </p>
            </div>
          </div>
          <button 
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <TagBadge label={mcp.platform} variant="secondary" size="sm" />
          <TagBadge label={mcp.category} variant="default" size="sm" />
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 flex-grow">
          {mcp.shortDescription}
        </p>

        {integrations.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {integrations.slice(0, 3).map((integration) => (
              <span 
                key={integration} 
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
              >
                {integration}
              </span>
            ))}
            {integrations.length > 3 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                +{integrations.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
          <div className="flex items-center gap-3">
            <StatBadge icon={<Star className="w-3 h-3" />} value={mcp.rating} />
            <StatBadge icon={<Download className="w-3 h-3" />} value={mcp.installsCount} />
          </div>
        </div>
      </div>
    </Card>
  );
}
