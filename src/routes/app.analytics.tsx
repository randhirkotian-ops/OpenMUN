import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Progress } from "@/components/ui/progress";
import { countWords, useReadiness, useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Clause" },
      { name: "description", content: "Preparation score, document progress and practice time." },
      { property: "og:title", content: "Analytics — Clause" },
      { property: "og:description", content: "Preparation score, document progress and practice time." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { workspace } = useWorkspace();
  const readiness = useReadiness(workspace);
  if (!workspace) return null;

  const bars = [
    { label: "Position paper", value: Math.min(100, (countWords(workspace.positionPaper) / 700) * 100) },
    { label: "Draft resolution", value: Math.min(100, (countWords(workspace.resolution) / 500) * 100) },
    { label: "Opening speech", value: Math.min(100, (countWords(workspace.speechDraft) / 300) * 100) },
    { label: "Research notes", value: Math.min(100, (workspace.notes.length / 8) * 100) },
    {
      label: "Checklist",
      value: workspace.tasks.length
        ? (workspace.tasks.filter((t) => t.done).length / workspace.tasks.length) * 100
        : 0,
    },
  ];

  return (
    <PageShell
      eyebrow="Analytics"
      title="How ready are you?"
      description="A single score across documents, research and rehearsal."
    >
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Panel title="Preparation score">
          <p className="display text-6xl">{readiness.score}%</p>
          <Progress value={readiness.score} className="mt-4" />
          <p className="mt-3 text-xs text-muted-foreground">
            {Math.floor(workspace.practiceSeconds / 60)} minutes of timed practice logged.
          </p>
        </Panel>
        <Panel title="Progress by area">
          <ul className="space-y-4">
            {bars.map((b) => (
              <li key={b.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{b.label}</span>
                  <span className="text-muted-foreground">{Math.round(b.value)}%</span>
                </div>
                <Progress value={b.value} className="mt-2" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}
