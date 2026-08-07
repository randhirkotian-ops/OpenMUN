import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/toolkit")({
  head: () => ({
    meta: [
      { title: "Debate Toolkit — Clause" },
      { name: "description", content: "Speech timer, motion templates and points of order reference." },
      { property: "og:title", content: "Debate Toolkit — Clause" },
      { property: "og:description", content: "Speech timer, motion templates and points of order reference." },
    ],
  }),
  component: ToolkitPage,
});

const MOTIONS = [
  ["Moderated caucus", "Motion to open a moderated caucus on <topic> for <total time>, with a speaking time of <per delegate>."],
  ["Unmoderated caucus", "Motion to suspend debate for an unmoderated caucus of <total time>."],
  ["Set the agenda", "Motion to set the agenda to <topic A> before <topic B>."],
  ["Extend debate", "Motion to extend the current caucus by <time>."],
  ["Introduce a draft resolution", "Motion to introduce draft resolution <number> to the floor."],
  ["Close debate", "Motion to close debate and move into voting procedure."],
];

const POINTS = [
  ["Point of personal privilege", "Raised for personal discomfort — may interrupt a speaker."],
  ["Point of order", "Raised when the rules of procedure are misapplied."],
  ["Point of parliamentary inquiry", "A question to the chair about procedure."],
  ["Right of reply", "Requested after a remark impugning national dignity."],
];

function ToolkitPage() {
  const { workspace, save } = useWorkspace();
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    ref.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [running]);

  if (!workspace) return null;

  return (
    <PageShell
      eyebrow="Debate toolkit"
      title="Everything you need on the floor."
      description="A timer for practice, motion phrasing that chairs accept, and the points you can raise."
    >
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Panel title="Speech timer">
          <p className="display text-6xl tabular-nums">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[45, 60, 90, 120].map((s) => (
              <Button
                key={s}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setRunning(false);
                  setSeconds(s);
                }}
              >
                {s}s
              </Button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              className="rounded-full"
              onClick={() => {
                if (running) save({ practiceSeconds: workspace.practiceSeconds + 1 });
                setRunning((r) => !r);
              }}
            >
              {running ? <Pause className="mr-1.5 h-4 w-4" /> : <Play className="mr-1.5 h-4 w-4" />}
              {running ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setRunning(false);
                setSeconds(60);
              }}
            >
              <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
            </Button>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Motion templates">
            <ul className="space-y-3">
              {MOTIONS.map(([name, text]) => (
                <li key={name} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Points and privileges">
            <ul className="space-y-3">
              {POINTS.map(([name, text]) => (
                <li key={name}>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
