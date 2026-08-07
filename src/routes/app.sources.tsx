import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SOURCE_LIBRARY } from "@/data/source-library";

export const Route = createFileRoute("/app/sources")({
  head: () => ({
    meta: [
      { title: "Source Library — Clause" },
      { name: "description", content: "Curated official UN and international organisation research sources." },
      { property: "og:title", content: "Source Library — Clause" },
      { property: "og:description", content: "Curated official UN and international organisation research sources." },
    ],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  const [q, setQ] = useState("");
  const results = useMemo(
    () =>
      SOURCE_LIBRARY.filter((s) =>
        (s.title + s.org + s.category + s.description).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <PageShell
      eyebrow="Sources"
      title="Primary sources only."
      description="Every link here is an official body, statistical agency or peer-reviewed archive."
    >
      <div className="relative mb-5">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search sources…"
          className="pl-9"
          aria-label="Search sources"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((s) => (
          <Panel key={s.url}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium hover:underline"
                >
                  {s.title} <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{s.org}</p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {s.category}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
          </Panel>
        ))}
      </div>
    </PageShell>
  );
}
