import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Clause" },
      { name: "description", content: "Conference details, committee, country and local data controls." },
      { property: "og:title", content: "Settings — Clause" },
      { property: "og:description", content: "Conference details, committee, country and local data controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { workspace, save, reset } = useWorkspace();
  if (!workspace) return null;

  const fields = [
    ["Conference", "conference"],
    ["Committee", "committee"],
    ["Country", "country"],
    ["Agenda", "agenda"],
  ] as const;

  return (
    <PageShell
      eyebrow="Settings"
      title="Conference details"
      description="Your workspace is stored locally in this browser."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Delegation">
          <div className="space-y-4">
            {fields.map(([label, key]) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={workspace[key]}
                  onChange={(e) => save({ [key]: e.target.value })}
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                type="date"
                value={workspace.startDate}
                onChange={(e) => save({ startDate: e.target.value })}
              />
            </div>
          </div>
        </Panel>
        <Panel title="Data">
          <p className="text-sm text-muted-foreground">
            Clause V1 keeps everything in local storage — nothing leaves this device. Resetting
            clears your notes, documents and progress.
          </p>
          <Button variant="destructive" className="mt-4 rounded-full" onClick={reset}>
            Reset workspace
          </Button>
        </Panel>
      </div>
    </PageShell>
  );
}
