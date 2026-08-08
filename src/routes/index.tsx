import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Gavel,
  Globe2,
  Mic,
  Quote,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { Mark, Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpenMUN — Make MUN less annoying" },
      {
        name: "description",
        content:
          "Open-source Model UN preparation: country intelligence, sourced evidence, position papers, resolutions and speech feedback. One workspace instead of 17 tabs.",
      },
      { property: "og:title", content: "OpenMUN — Make MUN less annoying" },
      {
        property: "og:description",
        content:
          "Stop preparing across 17 tabs. OpenMUN keeps your research, evidence, documents and speeches in one place — and never writes them for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const MODULES = [
  {
    icon: Globe2,
    title: "Country Intelligence",
    body: "Government, foreign-ministry and UN mission positions, each claim carrying the document it came from and the date it was published.",
  },
  {
    icon: BookOpen,
    title: "Research & Evidence",
    body: "Notes in folders, and an evidence system that forces the chain that wins debates: claim, excerpt, source.",
  },
  {
    icon: FileText,
    title: "Position Paper",
    body: "A structured editor with the sections chairs actually mark, live word counts and clean PDF, DOCX and Markdown exports.",
  },
  {
    icon: ScrollText,
    title: "Resolution Editor",
    body: "Preambulatory and operative clauses checked against real formatting rules — verbs, punctuation, numbering, sub-clauses.",
  },
  {
    icon: Mic,
    title: "Speech Coach",
    body: "Reads the speech you wrote: length at speaking pace, structure, hedging language, repetition, confidence.",
  },
  {
    icon: Gavel,
    title: "Debate Toolkit",
    body: "Motions, points, a timer that records real practice time, and points of information you can rehearse against.",
  },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="glass sticky top-0 z-50 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
          <Wordmark />
          <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#problem" className="hover:text-foreground">
              The problem
            </a>
            <a href="#modules" className="hover:text-foreground">
              What's inside
            </a>
            <a href="#ethics" className="hover:text-foreground">
              AI policy
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link to="/auth">Start preparing</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="animate-rise">
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Open source · Model United Nations
              </p>
              <h1 className="display mt-6 text-5xl sm:text-6xl">
                MUN is complicated enough.
                <br />
                <span className="text-primary">Stop preparing across 17 tabs.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A background guide PDF, six government websites, a half-lost Google Doc, a
                resolution template someone emailed you in 2021. OpenMUN puts country research,
                evidence, documents and speech practice in one workspace — and keeps every claim
                attached to its source.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/auth">
                    Create your workspace <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href="#modules">See what's inside</a>
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Free while in development · Your work syncs to your account, visible only to you
              </p>
            </div>

            <div className="surface-panel animate-rise overflow-hidden p-0">
              <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
                <Mark className="h-4 w-4" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  UNSC · Peacekeeping mandates · Delegation of India
                </span>
              </div>
              <div className="space-y-4 p-5 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                    Evidence
                  </p>
                  <p className="mt-2 font-medium">
                    India is among the largest cumulative contributors of uniformed personnel to UN
                    peacekeeping.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Excerpt saved · Source attached · Publisher and date recorded
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                    Clause checker
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <li>Operative clause 4 ends with a comma — should be a semicolon.</li>
                    <li>Preambulatory clause 2 starts with an operative verb.</li>
                    <li>Sub-clause numbering skips from (b) to (d).</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                    Speech coach
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    1:52 at speaking pace · 4 hedging phrases · no closing appeal detected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="display max-w-2xl text-4xl">
              Delegates don't lose because they're lazy. They lose because preparation is a mess.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
              {[
                [
                  "Research evaporates",
                  "You read a government statement at midnight and cannot find it again the morning of committee.",
                ],
                [
                  "Claims arrive unarmed",
                  "You remember the statistic but not the report, the year or the page — so the point gets challenged and dropped.",
                ],
                [
                  "Formatting eats hours",
                  "Clause numbering, indentation and operative verbs done by hand, every single time.",
                ],
              ].map(([title, body]) => (
                <div key={title} className="bg-card p-7">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              What's inside
            </p>
            <h2 className="display mt-5 max-w-2xl text-4xl">
              Six tools that replace the seventeen tabs.
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => (
                <article key={m.title}>
                  <m.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-lg font-medium">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ethics */}
        <section id="ethics" className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
            <div>
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="display mt-5 text-4xl">
                OpenMUN will never write your speech for you.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Ghostwriting tools produce delegates who cannot defend their own paper the moment a
                chair asks a follow-up question. That is the opposite of what this activity is for.
              </p>
            </div>
            <div className="surface-panel p-7">
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Our AI policy
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "It may summarise a document you chose to read.",
                  "It may critique the structure of writing you produced.",
                  "It may flag language that contradicts your country's record.",
                  "It may suggest questions you have not answered yet.",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                It will not draft your arguments, your clauses or your speech. Those are yours.
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <Quote className="mx-auto h-6 w-6 text-primary" />
            <blockquote className="display mt-6 text-3xl leading-snug">
              Make MUN less annoying. Delegates should spend their time thinking about the issue,
              not hunting for a PDF they already read.
            </blockquote>
            <p className="mt-6 text-sm text-muted-foreground">
              Randhir Kotian, founder of OpenMUN
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="surface-panel grain flex flex-col items-start gap-6 p-10 md:flex-row md:items-center">
              <div>
                <h2 className="display text-3xl">Your next conference starts here.</h2>
                <p className="mt-3 text-muted-foreground">
                  Set up your committee, country and agenda in under a minute.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full md:ml-auto">
                <Link to="/auth">
                  Start preparing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <Wordmark />
          <p className="sm:ml-auto">
            Open source · Founded by Randhir Kotian · © {new Date().getFullYear()} OpenMUN
          </p>
        </div>
      </footer>
    </div>
  );
}
