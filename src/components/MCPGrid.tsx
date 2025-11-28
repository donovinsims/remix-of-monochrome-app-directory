import { MCPCard } from "./MCPCard";
import { EmptyState } from "./EmptyState";
import { Blocks } from "lucide-react";

interface MCPGridProps {
  mcps: Array<{
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
  }>;
}

export function MCPGrid({ mcps }: MCPGridProps) {
  if (mcps.length === 0) {
    return (
      <EmptyState
        title="No MCPs found"
        description="Try adjusting your filters or search terms to find what you're looking for."
        icon={<Blocks className="w-10 h-10 text-zinc-400" />}
        action={{
          label: "Clear all filters",
          href: "/mcps"
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mcps.map((mcp) => (
        <MCPCard key={mcp.id} mcp={mcp} />
      ))}
    </div>
  );
}
