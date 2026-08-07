import { createFileRoute } from "@tanstack/react-router";
import { FileDown } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { countWords, useWorkspace } from "@/lib/workspace";
import { exportDocx, exportMarkdown, exportPdf } from "@/lib/export";

export const Route = createFileRoute("/app/paper")({
  head: () => ({
    meta: [
      { title: "Position Paper — Clause" },
      { name: "description", content: "Write your position paper with structure, word count and export." },
      { property: "og:title", content: "Position Paper — Clause" },
      { property: "og:description", content: "Templates, word count, citations and export. No AI writing." },
    ],
  }),
  component: PaperPage,
});

const SECTIONS = ["I.", "II.", "III.", "IV.", "V."];

function PaperPage() {
  const { workspace, save } = useWorkspace();
  if (!workspace) return null;
  const text = workspace.positionPaper;
  const words = countWords(text);
  const title = `Position Paper — ${workspace.country}, ${workspace.committee}`;

  return (
    <PageShell
      eyebrow="Position paper"
      title="Your argument, your words."
      description="Clause never writes for you. It gives you structure, formatting, counts and clean exports."
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
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <Panel>
          <Textarea
            value={text}
            onChange={(e) => save({ positionPaper: e.target.value })}
            rows={28}
            aria-label="Position paper"
            className="resize-none font-serif text-[15px] leading-[1.9]"
          />
        </Panel>

        <div className="space-y-5">
          <Panel title="Word count">
            <p className="display text-4xl">{words}</p>
            <Progress value={Math.min(100, (words / 700) * 100)} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              Most conferences cap position papers around 700–1000 words.
            </p>
          </Panel>
          <Panel title="Structure">
            <ul className="space-y-2 text-sm">
              {SECTIONS.map((s) => {
                const present = text.includes(s);
                return (
                  <li key={s} className="flex items-center justify-between">
                    <span className={present ? "" : "text-muted-foreground"}>Section {s}</span>
                    <span className={present ? "text-primary" : "text-muted-foreground"}>
                      {present ? "present" : "missing"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title="Citations">
            <p className="text-sm text-muted-foreground">
              {(text.match(/https?:\/\//g) ?? []).length} links found in your draft. Every statistic
              should trace to a primary source.
            </p>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
