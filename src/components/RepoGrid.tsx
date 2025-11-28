import { RepoCard } from "@/components/RepoCard";
import { EmptyState } from "@/components/EmptyState";
import { FolderGit2 } from "lucide-react";

interface RepoGridProps {
  repos: any[];
}

export function RepoGrid({ repos }: RepoGridProps) {
  if (repos.length === 0) {
    return (
      <EmptyState
        icon={FolderGit2}
        title="No repositories found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={{ label: "Clear Filters", href: "/repos" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => (
        <RepoCard key={repo.id} repo={repo} index={index} />
      ))}
    </div>
  );
}
