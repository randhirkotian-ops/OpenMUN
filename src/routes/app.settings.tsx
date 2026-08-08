import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — OpenMUN" },
      { name: "description", content: "Conference details, committee, country and local data controls." },
      { property: "og:title", content: "Settings — OpenMUN" },
      { property: "og:description", content: "Conference details, committee, country and local data controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { workspace, save } = useWorkspace();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  async function deleteWorkspace() {
    if (!workspace) return;
    await supabase.from("workspaces").delete().eq("id", workspace.id);
    void navigate({ to: "/onboarding" });
  }

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
      description="Conference details sync to your OpenMUN account."
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
        <Panel title="Account & data">
          <p className="text-sm text-muted-foreground">
            Your notes, sources, evidence and documents are stored in your OpenMUN account and are
            visible only to you. Deleting the workspace permanently removes everything inside it.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => void signOut()}>
              Sign out
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={() => void deleteWorkspace()}
            >
              Delete workspace
            </Button>
          </div>
        </Panel>
      </div>
    </PageShell>
  );
}
