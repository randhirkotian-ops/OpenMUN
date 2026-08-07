import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FolderPlus, Plus, Search, Trash2 } from "lucide-react";
import { PageShell, Panel } from "@/components/workspace/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace, type Note } from "@/lib/workspace";

export const Route = createFileRoute("/app/research")({
  head: () => ({
    meta: [
      { title: "Research — Clause" },
      { name: "description", content: "Folders, notes and searchable research for your committee." },
      { property: "og:title", content: "Research — Clause" },
      { property: "og:description", content: "Folders, notes and searchable research for your committee." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { workspace, save } = useWorkspace();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const notes = workspace?.notes ?? [];
  const folders = useMemo(
    () => [...new Set(notes.map((n) => n.folder))].sort(),
    [notes],
  );
  const filtered = useMemo(
    () =>
      notes.filter(
        (n) =>
          !query ||
          (n.title + n.body + n.folder).toLowerCase().includes(query.toLowerCase()),
      ),
    [notes, query],
  );
  const active = notes.find((n) => n.id === activeId) ?? filtered[0] ?? null;

  if (!workspace) return null;

  const update = (id: string, patch: Partial<Note>) =>
    save({
      notes: notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)),
    });

  const addNote = (folder = "Research") => {
    const note: Note = {
      id: crypto.randomUUID(),
      folder,
      title: "Untitled note",
      body: "",
      updatedAt: Date.now(),
    };
    save({ notes: [note, ...notes] });
    setActiveId(note.id);
  };

  return (
    <PageShell
      eyebrow="Research"
      title="Everything in one place."
      description="Notes, statistics and document excerpts, organised in folders and searchable instantly."
      actions={
        <>
          <Button variant="outline" className="rounded-full" onClick={() => addNote("Statistics")}>
            <FolderPlus className="mr-1.5 h-4 w-4" /> New folder note
          </Button>
          <Button className="rounded-full" onClick={() => addNote()}>
            <Plus className="mr-1.5 h-4 w-4" /> New note
          </Button>
        </>
      }
    >
      <div className="relative mb-5">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes, folders and content…"
          className="pl-9"
          aria-label="Search research"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <Panel className="max-h-[70vh] overflow-y-auto">
          {folders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            folders.map((folder) => (
              <div key={folder} className="mb-5 last:mb-0">
                <p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
                  {folder}
                </p>
                <ul className="space-y-1">
                  {filtered
                    .filter((n) => n.folder === folder)
                    .map((n) => (
                      <li key={n.id}>
                        <button
                          onClick={() => setActiveId(n.id)}
                          className={`w-full truncate rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active?.id === n.id
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/40"
                          }`}
                        >
                          {n.title || "Untitled"}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </Panel>

        <Panel>
          {!active ? (
            <p className="text-sm text-muted-foreground">
              Select a note, or create one to start researching.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  value={active.title}
                  onChange={(e) => update(active.id, { title: e.target.value })}
                  className="text-base font-medium"
                  aria-label="Note title"
                />
                <Input
                  value={active.folder}
                  onChange={(e) => update(active.id, { folder: e.target.value })}
                  className="w-40"
                  aria-label="Folder"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Delete note"
                  onClick={() => {
                    save({ notes: notes.filter((n) => n.id !== active.id) });
                    setActiveId(null);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={active.body}
                onChange={(e) => update(active.id, { body: e.target.value })}
                rows={20}
                placeholder="Paste statistics, quotes and citations here…"
                className="resize-none leading-relaxed"
                aria-label="Note body"
              />
              <p className="text-xs text-muted-foreground">
                Saved automatically · {new Date(active.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </Panel>
      </div>
    </PageShell>
  );
}
