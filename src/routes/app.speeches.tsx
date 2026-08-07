import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { analyzeSpeech, checkAlignment } from "@/lib/analysis";
import { findCountry } from "@/data/countries";
import { useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/speeches")({
  head: () => ({
    meta: [
      { title: "Speech Coach — Clause" },
      { name: "description", content: "Structure, pacing, tone and policy alignment feedback on your speech." },
      { property: "og:title", content: "Speech Coach — Clause" },
      { property: "og:description", content: "Structure, pacing, tone and policy alignment feedback on your speech." },
    ],
  }),
  component: SpeechesPage,
});

function SpeechesPage() {
  const { workspace, save } = useWorkspace();
  const text = workspace?.speechDraft ?? "";
  const report = useMemo(() => analyzeSpeech(text), [text]);
  const flags = useMemo(
    () => checkAlignment(text, workspace ? (findCountry(workspace.country) ?? null) : null),
    [text, workspace],
  );
  if (!workspace) return null;

  return (
    <PageShell
      eyebrow="Speech coach"
      title="Say it like a diplomat."
      description="Paste or draft your speech. Clause reads it for structure, pacing, hedging and policy alignment."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Panel>
          <Textarea
            value={text}
            onChange={(e) => save({ speechDraft: e.target.value })}
            rows={26}
            aria-label="Speech draft"
            className="resize-none font-serif text-[15px] leading-[1.9]"
          />
        </Panel>

        <div className="space-y-5">
          <Panel title="Delivery">
            <p className="display text-4xl">
              {report.minutes}:{String(report.seconds).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {report.words} words at {report.wpm} wpm · {report.avgSentence} words per sentence
            </p>
          </Panel>

          <Panel title="Structure">
            <ul className="space-y-2 text-sm">
              {report.structure.map((s) => (
                <li key={s.label} className="flex items-start justify-between gap-3">
                  <span className={s.present ? "" : "text-muted-foreground"}>{s.label}</span>
                  <span className={s.present ? "text-primary" : "text-muted-foreground"}>
                    {s.present ? "✓" : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Tone & confidence">
            <p className="text-xs text-muted-foreground">Diplomatic register</p>
            <Progress value={report.tone} className="mt-2" />
            <p className="mt-4 text-xs text-muted-foreground">Confidence</p>
            <Progress value={report.confidence} className="mt-2" />
            {report.hedges.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {report.hedges.map((h) => (
                  <Badge key={h} variant="secondary">
                    “{h}”
                  </Badge>
                ))}
              </div>
            )}
          </Panel>

          {report.repeated.length > 0 && (
            <Panel title="Repeated words">
              <div className="flex flex-wrap gap-1.5">
                {report.repeated.map((r) => (
                  <Badge key={r.word} variant="outline">
                    {r.word} ×{r.count}
                  </Badge>
                ))}
              </div>
            </Panel>
          )}

          <Panel title={`Alignment checker — ${flags.length}`}>
            {flags.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No sensitive policy language detected.
              </p>
            ) : (
              <ul className="space-y-3">
                {flags.map((f) => (
                  <li key={f.phrase} className="rounded-xl border border-border p-3">
                    <p className="text-sm font-medium">{f.phrase}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {f.sources.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-primary hover:underline"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
