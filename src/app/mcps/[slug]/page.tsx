import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, Download, ExternalLink, Globe, Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/TagBadge";
import { StatBadge } from "@/components/StatBadge";
import { CopyButton } from "@/components/CopyButton";
import { MCPGrid } from "@/components/MCPGrid";
import { getMCPBySlug, getRelatedItems } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils/formatting";

interface MCPDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MCPDetailPage({ params }: MCPDetailPageProps) {
  const resolvedParams = await params;
  const mcp = await getMCPBySlug(resolvedParams.slug);

  if (!mcp) {
    notFound();
  }

  const relatedMCPs = await getRelatedItems('mcp', mcp.id);
  const integrations = Array.isArray(mcp.integrations) 
    ? mcp.integrations as string[] 
    : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link 
            href="/mcps" 
            className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to MCPs
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
                {mcp.iconUrl ? (
                  <img 
                    src={mcp.iconUrl} 
                    alt={mcp.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-zinc-400">{mcp.name.charAt(0)}</span>
                )}
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                    {mcp.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      By <span className="font-medium text-zinc-900 dark:text-zinc-300">{mcp.provider}</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span>Released {formatDate(mcp.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" aria-label="Share">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Bookmark">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button asChild className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100">
                    <a href={mcp.mcpUrl} target="_blank" rel="noopener noreferrer">
                      Install MCP
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <TagBadge label={mcp.platform} variant="secondary" />
                <TagBadge label={mcp.category} variant="primary" />
              </div>

              <div className="flex items-center gap-6 py-4 border-t border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1">Rating</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{mcp.rating}</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1">Installs</span>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-zinc-400" />
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{mcp.installsCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">About this MCP</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {mcp.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Integrations</h2>
              <div className="flex flex-wrap gap-3">
                {integrations.map((integration) => (
                  <div 
                    key={integration}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  >
                    <Globe className="w-4 h-4 text-zinc-400" />
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">{integration}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Installation</h2>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-zinc-400">Command Line</span>
                  <CopyButton text={`npm install -g ${mcp.slug}`} />
                </div>
                <code className="font-mono text-sm text-emerald-400">
                  npm install -g {mcp.slug}
                </code>
              </div>
              <p className="mt-4 text-sm text-zinc-500">
                Need help? Check out the <a href="#" className="text-emerald-600 hover:underline">installation guide</a>.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Provider</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{mcp.provider}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Platform</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{mcp.platform}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Category</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{mcp.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500">Updated</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{formatDate(mcp.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related MCPs */}
        {relatedMCPs.length > 0 && (
          <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Related MCPs</h2>
              <Link href="/mcps" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <MCPGrid mcps={relatedMCPs} />
          </div>
        )}
      </div>
    </div>
  );
}
