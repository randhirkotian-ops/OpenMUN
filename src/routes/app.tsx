import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Gavel,
  Globe2,
  LayoutDashboard,
  Mic,
  ScrollText,
  Search,
  Settings,
  FileText,
  Library,
} from "lucide-react";
import { Mark } from "@/components/brand";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { WorkspaceProvider, createWorkspace, useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: () => (
    <WorkspaceProvider>
      <WorkspaceShell />
    </WorkspaceProvider>
  ),
});

export type NavTo =
  | "/app"
  | "/app/country"
  | "/app/research"
  | "/app/paper"
  | "/app/resolution"
  | "/app/speeches"
  | "/app/sources"
  | "/app/toolkit"
  | "/app/analytics"
  | "/app/settings";

export const NAV: { to: NavTo; label: string; icon: typeof Globe2; exact?: boolean }[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/country", label: "Country Intelligence", icon: Globe2 },
  { to: "/app/research", label: "Research", icon: BookOpen },
  { to: "/app/paper", label: "Position Paper", icon: FileText },
  { to: "/app/resolution", label: "Resolution", icon: ScrollText },
  { to: "/app/speeches", label: "Speeches", icon: Mic },
  { to: "/app/sources", label: "Sources", icon: Library },
  { to: "/app/toolkit", label: "Debate Toolkit", icon: Gavel },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function WorkspaceShell() {
  const { workspace, ready, session, savedAt, saving, error } = useWorkspace();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!session) void navigate({ to: "/auth" });
    else if (!workspace) void navigate({ to: "/onboarding" });
  }, [ready, session, workspace, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!ready || !workspace) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
        Opening your workspace…
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <Link to="/" className="flex items-center gap-2.5 px-5 py-5">
          <Mark className="h-6 w-6" />
          <span className="display text-xl">Clause</span>
        </Link>
        <div className="px-3 pb-3">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/40"
          >
            <Search className="h-4 w-4" />
            Search…
            <kbd className="ml-auto font-mono text-[10px] text-muted-foreground">⌘K</kbd>
          </button>
        </div>
        <nav aria-label="Workspace" className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <p className="truncate text-sm font-medium">{workspace.country}</p>
          <p className="truncate text-xs text-muted-foreground">
            {workspace.committee} · {workspace.conference}
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {savedAt ? "All changes saved" : "Autosave on"}
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="glass sticky top-0 z-40 flex items-center gap-3 border-b border-border px-4 py-3 md:hidden">
          <Mark className="h-6 w-6" />
          <span className="display text-lg">Clause</span>
          <button
            onClick={() => setOpen(true)}
            aria-label="Search workspace"
            className="ml-auto rounded-lg border border-border p-2"
          >
            <Search className="h-4 w-4" />
          </button>
        </header>
        <nav
          aria-label="Workspace mobile"
          className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full border border-border px-3 py-1.5 text-xs whitespace-nowrap text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, notes and sources…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {NAV.map((item) => (
              <CommandItem
                key={item.to}
                value={item.label}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: item.to });
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Notes">
            {workspace.notes.map((n) => (
              <CommandItem
                key={n.id}
                value={n.title + n.body.slice(0, 80)}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: "/app/research" });
                }}
              >
                {n.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Sources">
            {workspace.sources.map((s) => (
              <CommandItem
                key={s.id}
                value={s.title + s.org}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: "/app/sources" });
                }}
              >
                {s.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
