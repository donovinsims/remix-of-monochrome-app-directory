import { WorkflowCard } from "@/components/WorkflowCard";
import { EmptyState } from "@/components/EmptyState";
import { Workflow } from "lucide-react";

interface WorkflowGridProps {
  workflows: any[];
}

export function WorkflowGrid({ workflows }: WorkflowGridProps) {
  if (workflows.length === 0) {
    return (
      <EmptyState
        icon={Workflow}
        title="No workflows found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={{ label: "Clear Filters", href: "/workflows" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workflows.map((workflow, index) => (
        <WorkflowCard key={workflow.id} workflow={workflow} index={index} />
      ))}
    </div>
  );
}
