import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, GitFork, Github, ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/CopyButton";
import { StatBadge } from "@/components/StatBadge";
import { getRepoBySlug, getRepos } from "@/lib/db/queries";
import { RepoCard } from "@/components/RepoCard";
import { getLanguageColor } from "@/lib/github-languages";
import { formatRelativeTime } from "@/lib/utils/formatting";

interface RepoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { slug } = await params;
  const repo = await getRepoBySlug(slug);

  if (!repo) {
    notFound();
  }

  // Get related repos
  const allRepos = await getRepos({ language: repo.language });
  const relatedRepos = allRepos
    .filter(r => r.id !== repo.id && !r.isArchived)
    .slice(0, 4);

  const topics = repo.topics ? JSON.parse(repo.topics as unknown as string) : [];
  const cloneCommand = `git clone ${repo.githubUrl}.git`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/repos"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Repositories
          </Link>

          {/* Main Content */}
          <div className="bg-white dark:bg-zinc-950 rounded-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 mb-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <Github className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                  {repo.name}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  by {repo.author}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              {repo.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              <StatBadge 
                icon={<Star className="h-4 w-4" />} 
                value={repo.stars} 
                label="stars"
              />
              <StatBadge 
                icon={<GitFork className="h-4 w-4" />} 
                value={repo.forks} 
                label="forks"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {repo.language}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900">
                <Clock className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Updated {formatRelativeTime(repo.lastUpdated)}
                </span>
              </div>
            </div>

            {/* Topics */}
            {topics.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm text-blue-700 dark:text-blue-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clone Command */}
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <code className="text-sm text-zinc-700 dark:text-zinc-300 break-all">
                  {cloneCommand}
                </code>
                <CopyButton text={cloneCommand} label="Copy" />
              </div>
            </div>

            {/* Actions */}
            <Button asChild size="lg" className="w-full md:w-auto">
              <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Open in GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Related Repos */}
          {relatedRepos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Related Repositories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedRepos.map((related, index) => (
                  <RepoCard key={related.id} repo={related} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
