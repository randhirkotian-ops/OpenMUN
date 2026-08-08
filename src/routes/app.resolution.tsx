import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AlertTriangle, FileDown, Info, XCircle } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { checkResolution } from "@/lib/analysis";
import { useWorkspace } from "@/lib/workspace";
import { exportDocx, exportMarkdown, exportPdf } from "@/lib/export";

export const Route = createFileRoute("/app/resolution")({
  head: () => ({
    meta: [
      { title: "Resolution Editor — OpenMUN" },
      { name: "description", content: "Draft resolutions with automatic formatting and a clause checker." },
      { property: "og:title", content: "Resolution Editor — OpenMUN" },
      { property: "og:description", content: "Automatic clause formatting plus a checker that suggests, never rewrites." },
    ],
  }),
  component: ResolutionPage,
});

const ICONS = { error: XCircle, warning: AlertTriangle, info: Info };

function ResolutionPage() {
  const { workspace, save } = useWorkspace();
  const text = workspace?.resolution ?? "";
  const issues = useMemo(() => checkResolution(text), [text]);
  if (!workspace) return null;

  const title = `Draft Resolution — ${workspace.committee}`;

  return (
    <PageShell
      eyebrow="Resolution"
      title="Write clauses, not formatting."
      description="Numbering, punctuation and structure are checked as you type. Suggestions only — your wording stays yours."
      actions={
        <>
          <Button variant="outline" className="rounded-full" onClick={() => exportPdf(title, text)}>
            <FileDown className="mr-1.5 h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => exportDocx(title, text)}>
            DOCX
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => exportMarkdown(title, text)}>
            Markdown
          </Button>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Panel>
          <Textarea
            value={text}
            onChange={(e) => save({ resolution: e.target.value })}
            rows={30}
            aria-label="Draft resolution"
            className="resize-none font-serif text-[15px] leading-[2]"
          />
        </Panel>
        <Panel title={`Clause checker — ${issues.length} notes`} className="max-h-[75vh] overflow-y-auto">
          {issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No formatting issues detected. Substance is still your job.
            </p>
          ) : (
            <ul className="space-y-3">
              {issues.map((issue, i) => {
                const Icon = ICONS[issue.severity];
                return (
                  <li key={i} className="rounded-xl border border-border p-3">
                    <div className="flex items-start gap-2">
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          issue.severity === "error"
                            ? "text-destructive"
                            : issue.severity === "warning"
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          Line {issue.line} · {issue.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{issue.detail}</p>
                        <p className="mt-1.5 text-xs text-primary">{issue.suggestion}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
    </PageShell>
  );
}
