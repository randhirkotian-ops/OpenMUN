import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRIES } from "@/data/countries";
import { createWorkspaceRecord } from "@/lib/workspace";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Create your workspace — OpenMUN" },
      {
        name: "description",
        content: "Four questions and your Model UN conference workspace is ready.",
      },
      { property: "og:title", content: "Create your workspace — OpenMUN" },
      {
        property: "og:description",
        content: "Four questions and your Model UN conference workspace is ready.",
      },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    conference: "",
    committee: "",
    country: "",
    agenda: "",
    startDate: "",
    delegate: "",
  });

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) void navigate({ to: "/auth" });
      else setUserId(data.session.user.id);
    });
  }, [navigate]);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.conference && form.committee && form.country && form.agenda;

  return (
    <div className="min-h-dvh bg-surface">
      <div className="mx-auto max-w-2xl px-5 py-14">
        <Wordmark />
        <h1 className="display mt-12 text-4xl">Let's set up your conference.</h1>
        <p className="mt-3 text-muted-foreground">
          Four questions. Everything else is generated for you.
        </p>

        <form
          className="surface-panel mt-9 space-y-6 p-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid || !userId || busy) return;
            setBusy(true);
            void createWorkspaceRecord(userId, form)
              .then(() => navigate({ to: "/app" }))
              .catch((err: unknown) => {
                setBusy(false);
                toast.error("Could not create your workspace", {
                  description: err instanceof Error ? err.message : "Please try again.",
                });
              });
          }}
        >
          <Field label="Conference name" hint="e.g. Harvard MUN India 2026">
            <Input
              required
              value={form.conference}
              onChange={(e) => set("conference")(e.target.value)}
              placeholder="Conference name"
            />
          </Field>

          <Field label="Committee" hint="e.g. UNSC, UNHRC, DISEC">
            <Input
              required
              value={form.committee}
              onChange={(e) => set("committee")(e.target.value)}
              placeholder="Committee"
            />
          </Field>

          <Field label="Country" hint="Countries with a full intelligence brief are marked">
            <Input
              required
              list="openmun-countries"
              value={form.country}
              onChange={(e) => set("country")(e.target.value)}
              placeholder="Country you represent"
            />
            <datalist id="openmun-countries">
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name} />
              ))}
            </datalist>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {COUNTRIES.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => set("country")(c.name)}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:bg-accent"
                >
                  {c.flag} {c.name}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Agenda" hint="The topic your committee is debating">
            <Textarea
              required
              rows={2}
              value={form.agenda}
              onChange={(e) => set("agenda")(e.target.value)}
              placeholder="Agenda item"
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Start date" hint="Optional — powers the countdown">
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate")(e.target.value)}
              />
            </Field>
            <Field label="Your name" hint="Optional — used on exports">
              <Input
                value={form.delegate}
                onChange={(e) => set("delegate")(e.target.value)}
                placeholder="Delegate name"
              />
            </Field>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full" disabled={!valid || busy}>
            {busy ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : null}
            Create workspace <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <ul className="grid gap-2 pt-1 text-xs text-muted-foreground sm:grid-cols-2">
            {[
              "Country intelligence brief",
              "Position paper template",
              "Draft resolution skeleton",
              "Preparation checklist",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" /> {i}
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
