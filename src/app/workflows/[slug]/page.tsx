import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Star, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/TagBadge";
import { StatBadge } from "@/components/StatBadge";
import { getWorkflowBySlug, getWorkflows } from "@/lib/db/queries";
import { WorkflowCard } from "@/components/WorkflowCard";

interface WorkflowDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const { slug } = await params;
  const workflow = await getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  // Get related workflows
  const allWorkflows = await getWorkflows({ category: workflow.category });
  const relatedWorkflows = allWorkflows
    .filter(w => w.id !== workflow.id)
    .slice(0, 4);

  const useCases = workflow.useCases ? JSON.parse(workflow.useCases as unknown as string) : [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/workflows"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workflows
          </Link>

          {/* Main Content */}
          <div className="bg-white dark:bg-zinc-950 rounded-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Thumbnail */}
              <div className="md:w-1/3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={workflow.thumbnailUrl}
                    alt={workflow.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="md:w-2/3 space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                        {workflow.name}
                      </h1>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        by {workflow.author}
                      </p>
                    </div>
                    <TagBadge 
                      label={workflow.difficulty} 
                      variant={getDifficultyColor(workflow.difficulty)}
                      size="md"
                    />
                  </div>

                  <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {workflow.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3">
                  <StatBadge 
                    icon={<Star className="h-4 w-4" />} 
                    value={workflow.rating.toFixed(1)} 
                    label="rating"
                  />
                  <StatBadge 
                    icon={<Download className="h-4 w-4" />} 
                    value={workflow.downloadsCount} 
                    label="downloads"
                  />
                </div>

                {/* Use Cases */}
                {useCases.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                      Use Cases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCases.map((useCase: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <Button asChild size="lg" className="w-full md:w-auto">
                  <a href={workflow.workflowUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download Workflow
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Workflows */}
          {relatedWorkflows.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Related Workflows
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedWorkflows.map((related, index) => (
                  <WorkflowCard key={related.id} workflow={related} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
