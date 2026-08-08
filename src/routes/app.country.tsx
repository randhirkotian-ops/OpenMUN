import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Badge } from "@/components/ui/badge";
import { COUNTRIES, findCountry } from "@/data/countries";
import { useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/app/country")({
  head: () => ({
    meta: [
      { title: "Country Intelligence — OpenMUN" },
      {
        name: "description",
        content:
          "Leadership, political system, treaties and foreign policy priorities, every field cited to an official source.",
      },
      { property: "og:title", content: "Country Intelligence — OpenMUN" },
      {
        property: "og:description",
        content: "Cited country briefs for Model UN delegates, built from official sources.",
      },
    ],
  }),
  component: CountryPage,
});

function Cite({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
    >
      {label} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function CountryPage() {
  const { workspace } = useWorkspace();
  if (!workspace) return null;
  const profile = findCountry(workspace.country);

  if (!profile) {
    return (
      <PageShell
        eyebrow="Country intelligence"
        title={workspace.country}
        description="We don't have a verified brief for this delegation yet."
      >
        <Panel>
          <p className="text-sm text-muted-foreground">
            OpenMUN only publishes facts transcribed from official sources, so we won't generate a
            profile. Start from these primary sources instead:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["UN Member States directory", "https://www.un.org/en/about-us/member-states"],
              ["Permanent Missions to the UN", "https://www.un.int/"],
              ["CIA World Factbook", "https://www.cia.gov/the-world-factbook/"],
              ["World Bank country data", "https://data.worldbank.org/country"],
            ].map(([l, u]) => (
              <li key={u}>
                <a
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Verified briefs currently available: {COUNTRIES.map((c) => c.name).join(", ")}.
          </p>
        </Panel>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Country intelligence"
      title={`${profile.flag} ${profile.name}`}
      description={`${profile.region} · every field below is transcribed from an official or primary source.`}
    >
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm text-accent-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        No AI-generated facts. Figures carry the year of the underlying dataset — verify before
        quoting in committee.
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Leadership">
          <ul className="space-y-4">
            {profile.leadership.map((l) => (
              <li key={l.value}>
                <p className="text-sm">{l.value}</p>
                <Cite label={l.source} url={l.url} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Country facts">
          <dl className="space-y-4">
            {[
              ["Political system", profile.politicalSystem],
              ["Population", profile.population],
              ["GDP", profile.gdp],
            ].map(([k, v]) => {
              const c = v as typeof profile.politicalSystem;
              return (
                <div key={k as string}>
                  <dt className="text-xs text-muted-foreground">{k as string}</dt>
                  <dd className="text-sm">{c.value}</dd>
                  <Cite label={c.source} url={c.url} />
                </div>
              );
            })}
          </dl>
        </Panel>

        <Panel title="Foreign policy priorities">
          <ul className="space-y-2.5">
            {profile.priorities.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
          <Cite label={profile.prioritiesSource.label} url={profile.prioritiesSource.url} />
        </Panel>

        <Panel title="Recent diplomatic events">
          <ul className="space-y-4">
            {profile.events.map((e) => (
              <li key={e.text}>
                <p className="font-mono text-xs text-muted-foreground">{e.date}</p>
                <p className="mt-1 text-sm">{e.text}</p>
                <Cite label="Official source" url={e.url} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Treaties">
          <ul className="space-y-3">
            {profile.treaties.map((t) => (
              <li key={t.name} className="flex items-start justify-between gap-3">
                <span className="text-sm">{t.name}</span>
                <Badge variant="secondary" className="shrink-0">
                  {t.status}
                </Badge>
              </li>
            ))}
          </ul>
          <Cite label="UN Treaty Collection" url="https://treaties.un.org/" />
        </Panel>

        <Panel title="Memberships">
          <div className="flex flex-wrap gap-2">
            {profile.memberships.map((m) => (
              <Badge key={m} variant="outline">
                {m}
              </Badge>
            ))}
          </div>
        </Panel>

        <Panel title="Voting history">
          <ul className="space-y-3">
            {profile.votingNotes.map((v) => (
              <li key={v.text}>
                <p className="text-sm text-muted-foreground">{v.text}</p>
                <Cite label="UN voting records" url={v.url} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Official links">
          <ul className="space-y-2">
            {profile.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {l.label} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}
