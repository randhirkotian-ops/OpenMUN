import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileText,
  Gavel,
  Globe2,
  Layers,
  Mic,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Mark, Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clause — Everything you need for Model United Nations" },
      {
        name: "description",
        content:
          "One workspace for MUN research, country intelligence, position papers, resolutions and speeches. Built for delegates, not chairs.",
      },
      { property: "og:title", content: "Clause — Everything you need for Model United Nations" },
      {
        property: "og:description",
        content:
          "One workspace for research, preparation, formatting, speeches, resolutions and conference success.",
      },
    ],
  }),
  component: Landing,
});

const TABS = [
  "Google Docs",
  "ChatGPT",
  "un.org",
  "World Factbook",
  "Ministry site",
  "resolution.pdf",
  "Timer",
  "Notes",
  "YouTube",
  "JSTOR",
  "Drive",
  "WhatsApp",
];

const FEATURES = [
  {
    icon: Globe2,
    title: "Country Intelligence",
    body: "Leadership, political system, treaties, memberships and foreign policy priorities — every field cited to an official source. No generated facts.",
  },
  {
    icon: Mic,
    title: "Speech Library & Coach",
    body: "Study how your country actually speaks, then paste your own draft for timing, structure, evidence and tone feedback. It never writes for you.",
  },
  {
    icon: ScrollText,
    title: "Resolution Editor",
    body: "Preambulatory and operative clauses format themselves — numbering, indentation, punctuation. You write substance, not spacing.",
  },
  {
    icon: ShieldCheck,
    title: "Clause Checker",
    body: "Flags wrong operative verbs, broken numbering, missing punctuation, duplicates and weak wording — with suggestions, never rewrites.",
  },
  {
    icon: FileText,
    title: "Position Paper",
    body: "Professional templates, live word count, citation slots, version-safe autosave, and export to PDF, DOCX or Markdown.",
  },
  {
    icon: BookOpen,
    title: "Research & Sources",
    body: "Folders, notes and a curated library of UN, WHO, World Bank, NGO and academic sources. All searchable in one place.",
  },
  {
    icon: Gavel,
    title: "Debate Toolkit",
    body: "Speech timer, motion templates, POI tracker, packing list and conference checklist. Simple things, finally in one tab.",
  },
  {
    icon: Layers,
    title: "Alignment Checker",
    body: "Politely flags arguments that may not match your country's known positions, and links you to the primary source to verify.",
  },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="glass sticky top-0 z-50 border-b border-border/70">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        >
          <Wordmark />
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-foreground" href="#workspace">
              Workspace
            </a>
            <a className="transition-colors hover:text-foreground" href="#pricing">
              Pricing
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link to="/onboarding">Start preparing</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-20 text-center md:pt-32">
            <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for delegates — research assistance, never ghostwriting
            </span>
            <h1 className="display animate-rise mt-8 text-[clamp(2.75rem,7vw,5rem)]">
              Everything you need for
              <br />
              <span className="italic">Model United Nations.</span>
            </h1>
            <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              One workspace for research, preparation, formatting, speeches, resolutions and
              conference success.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/onboarding">
                  Start preparing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/app">Explore demo</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No credit card. Your workspace is created in about twenty seconds.
            </p>
          </div>

          {/* Product frame */}
          <div id="workspace" className="mx-auto max-w-6xl px-5 pb-24">
            <div className="surface-panel shadow-lift overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  clause.app / india · UNSC · Peacekeeping reform
                </span>
              </div>
              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                <aside className="hidden space-y-1 border-r border-border bg-sidebar p-4 md:block">
                  {[
                    "Dashboard",
                    "Country Intelligence",
                    "Research",
                    "Position Paper",
                    "Resolution",
                    "Speeches",
                    "Sources",
                    "Debate Toolkit",
                    "Analytics",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        i === 1
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </aside>
                <div className="space-y-4 p-6 md:p-8">
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    Country intelligence
                  </p>
                  <h2 className="display text-3xl">India 🇮🇳</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Head of Government", "Prime Minister Narendra Modi"],
                      ["Political system", "Federal parliamentary republic"],
                      ["Population", "~1.43 billion (UN DESA)"],
                      ["GDP", "~US$3.55 trillion (World Bank)"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-border bg-surface p-4">
                        <p className="text-xs text-muted-foreground">{k}</p>
                        <p className="mt-1 text-sm font-medium">{v}</p>
                        <p className="mt-2 text-[11px] text-primary">Source cited</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-border bg-accent/60 p-4 text-sm text-accent-foreground">
                    Clause checker: 3 formatting notes on your draft resolution — operative clause 4
                    is missing a semicolon.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-24">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">The problem</p>
            <h2 className="display mt-4 max-w-2xl text-4xl">
              Preparation shouldn't mean twenty-eight open tabs.
            </h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                ["Research is scattered", "Notes in Docs, statistics in screenshots, sources lost in history."],
                ["Formatting eats hours", "Clause numbering, indentation and operative verbs done by hand, every time."],
                ["Feedback arrives too late", "You find out your speech was off-policy while standing at the podium."],
              ].map(([t, b]) => (
                <div key={t}>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="mx-auto max-w-5xl px-5 py-24">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">The solution</p>
          <h2 className="display mt-4 max-w-3xl text-4xl">
            One calm workspace that does the repetitive work — and leaves the thinking to you.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [Search, "Organise", "Every note, statistic and source in one searchable place."],
              [Layers, "Automate", "Formatting, numbering, timing and exports handled for you."],
              [ShieldCheck, "Verify", "Checks and citations so you can defend every line you wrote."],
            ].map(([Icon, t, b]) => {
              const I = Icon as typeof Search;
              return (
                <div key={t as string} className="surface-panel p-6">
                  <I className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-medium">{t as string}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Features</p>
            <h2 className="display mt-4 text-4xl">Built for one delegate, one conference.</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-card p-7 transition-colors hover:bg-accent/30">
                  <f.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 font-medium">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Delegates</p>
          <h2 className="display mt-4 text-4xl">Early feedback</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["The clause checker caught four formatting errors ten minutes before submission.", "Head Delegate, placeholder"],
              ["I stopped losing sources. That alone changed how I prepare.", "Delegate, placeholder"],
              ["It gives feedback on my speech without ever writing it for me.", "Delegate, placeholder"],
            ].map(([q, a]) => (
              <figure key={q} className="surface-panel p-7">
                <blockquote className="display text-xl leading-snug">"{q}"</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">{a}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-24">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Pricing</p>
            <h2 className="display mt-4 text-4xl">Simple while we're early.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { name: "Delegate", price: "Free", note: "One conference workspace", items: ["Country intelligence", "Research & sources", "Position paper", "Resolution editor"] },
                { name: "Circuit", price: "Placeholder", note: "For the full season", items: ["Unlimited workspaces", "Speech coach history", "Version history", "DOCX & PDF export"], featured: true },
                { name: "Delegation", price: "Placeholder", note: "For school teams", items: ["Shared source library", "Team readiness view", "Priority support", "Onboarding session"] },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`surface-panel p-7 ${p.featured ? "ring-2 ring-primary/40" : ""}`}
                >
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="display mt-3 text-3xl">{p.price}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{i}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-7 w-full rounded-full"
                    variant={p.featured ? "default" : "outline"}
                  >
                    <Link to="/onboarding">Start preparing</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-24">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">FAQ</p>
          <h2 className="display mt-4 text-4xl">Questions</h2>
          <Accordion type="single" collapsible className="mt-8">
            {[
              ["Does Clause write my position paper or speech?", "No. Clause never generates your arguments. It organises research, formats documents, checks structure and gives feedback on work you wrote yourself."],
              ["Where does country data come from?", "Official and primary sources only — government ministries, permanent missions, UN databases, the World Bank and the World Factbook. Every field carries a citation and a link."],
              ["Is it for chairs or organisers?", "Not in version one. Clause is built exclusively around one delegate preparing for one conference."],
              ["Can I export my documents?", "Yes — PDF, DOCX and Markdown, with formatting preserved."],
              ["Does my work autosave?", "Every keystroke is saved locally as you type, so nothing is lost between sessions."],
            ].map(([q, a], i) => (
              <AccordionItem key={q} value={`i${i}`}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="surface-panel shadow-lift grain relative overflow-hidden px-8 py-20 text-center">
            <Clock className="mx-auto h-6 w-6 text-primary" />
            <h2 className="display mx-auto mt-6 max-w-2xl text-4xl">
              Your next conference starts with one calm tab.
            </h2>
            <Button asChild size="lg" className="mt-8 rounded-full px-8">
              <Link to="/onboarding">
                Start preparing <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Mark />
            <div>
              <p className="text-sm font-medium">Clause</p>
              <p className="text-xs text-muted-foreground">
                The operating system for Model United Nations.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Founded by Randhir Kotian · © {new Date().getFullYear()} Clause
          </p>
        </div>
      </footer>
    </div>
  );
}
