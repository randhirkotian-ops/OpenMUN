import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, FileText, Globe2 } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { countWords, useReadiness, useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — OpenMUN workspace" },
      { name: "description", content: "Conference overview, countdown and preparation progress." },
      { property: "og:title", content: "Dashboard — OpenMUN workspace" },
      { property: "og:description", content: "Conference overview, countdown and preparation progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { workspace, save } = useWorkspace();
  const { score } = useReadiness(workspace);
  if (!workspace) return null;

  const days = workspace.startDate
    ? Math.ceil((new Date(workspace.startDate).getTime() - Date.now()) / 86400000)
    : null;

  const done = workspace.tasks.filter((t) => t.done).length;

  return (
    <PageShell
      eyebrow={workspace.conference}
      title={`${workspace.country}, ${workspace.committee}`}
      description={workspace.agenda}
      actions={
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/app/country">
            Country brief <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Panel>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">Countdown</span>
          </div>
          <p className="display mt-3 text-4xl">
            {days === null ? "—" : days > 0 ? `${days} days` : "In session"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {workspace.startDate ? `Opens ${workspace.startDate}` : "Add a start date in Settings"}
          </p>
        </Panel>
        <Panel>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">Readiness</span>
          </div>
          <p className="display mt-3 text-4xl">{score}%</p>
          <Progress value={score} className="mt-3" />
        </Panel>
        <Panel>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">Practice</span>
          </div>
          <p className="display mt-3 text-4xl">
            {Math.floor(workspace.practiceSeconds / 60)}m
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Timed speech rehearsal</p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel title={`Preparation checklist — ${done}/${workspace.tasks.length}`}>
          <ul className="space-y-1">
            {workspace.tasks.map((t) => (
              <li key={t.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent/40">
                  <Checkbox
                    checked={t.done}
                    onCheckedChange={(v) =>
                      save({
                        tasks: workspace.tasks.map((x) =>
                          x.id === t.id ? { ...x, done: Boolean(v) } : x,
                        ),
                      })
                    }
                  />
                  <span
                    className={
                      t.done ? "text-sm text-muted-foreground line-through" : "text-sm"
                    }
                  >
                    {t.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel title="Documents">
            <div className="space-y-3">
              {[
                { to: "/app/paper" as const, label: "Position paper", words: countWords(workspace.positionPaper), icon: FileText },
                { to: "/app/resolution" as const, label: "Draft resolution", words: countWords(workspace.resolution), icon: FileText },
                { to: "/app/speeches" as const, label: "Opening speech", words: countWords(workspace.speechDraft), icon: FileText },
              ].map((d) => (
                <Link
                  key={d.label}
                  to={d.to}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 transition-colors hover:bg-accent/40"
                >
                  <span className="flex items-center gap-2.5 text-sm">
                    <d.icon className="h-4 w-4 text-primary" />
                    {d.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{d.words} words</span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Recent notes">
            {workspace.notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notes yet.</p>
            ) : (
              <ul className="space-y-2">
                {[...workspace.notes]
                  .sort((a, b) => b.updatedAt - a.updatedAt)
                  .slice(0, 4)
                  .map((n) => (
                    <li key={n.id} className="truncate text-sm">
                      <Link to="/app/research" className="hover:underline">
                        {n.title}
                      </Link>
                      <span className="ml-2 text-xs text-muted-foreground">{n.folder}</span>
                    </li>
                  ))}
              </ul>
            )}
          </Panel>

          <Panel>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Everything autosaves as you type. Press{" "}
                <kbd className="rounded border border-border px-1 font-mono text-[11px]">⌘K</kbd> to
                search your whole workspace.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
