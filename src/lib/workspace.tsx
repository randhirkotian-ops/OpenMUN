import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Note = {
  id: string;
  folder: string;
  title: string;
  body: string;
  updatedAt: number;
};

export type Source = {
  id: string;
  title: string;
  url: string;
  org: string;
  category: string;
  note: string;
};

export type Task = { id: string; label: string; done: boolean };

export type Poi = { id: string; text: string; from: string };

export type Evidence = {
  id: string;
  claim: string;
  excerpt: string;
  page: string;
  sourceId: string | null;
};

export type Workspace = {
  id: string;
  createdAt: number;
  conference: string;
  committee: string;
  country: string;
  agenda: string;
  startDate: string;
  delegate: string;
  notes: Note[];
  sources: Source[];
  tasks: Task[];
  evidence: Evidence[];
  positionPaper: string;
  resolution: string;
  speechDraft: string;
  practiceSeconds: number;
  pois: Poi[];
};

export const DEFAULT_TASKS = [
  "Read the committee background guide",
  "Complete country intelligence brief",
  "Collect 8+ credible sources",
  "Draft position paper",
  "Write opening speech",
  "Prepare 3 draft clauses",
  "Identify likely bloc partners",
  "Rehearse speech under time limit",
];

export const POSITION_PAPER_TEMPLATE = `TOPIC: <agenda>
COMMITTEE: <committee>
COUNTRY: <country>

I. BACKGROUND OF THE TOPIC
Summarise the issue with verifiable data. Cite each statistic.

II. PAST INTERNATIONAL ACTION
Reference the specific UN resolutions, treaties and agency programmes that
already address this topic.

III. COUNTRY POSITION
State your delegation's position and the national interests behind it. Ground
every claim in an official statement, vote or policy document.

IV. PROPOSED SOLUTIONS
Three concrete, fundable, mandate-appropriate proposals.

V. SOURCES
1.
2.
`;

export const RESOLUTION_TEMPLATE = `COMMITTEE: <committee>
TOPIC: <agenda>
SUBMITTED BY: <country>

Recalling the purposes and principles enshrined in the Charter of the United Nations,

Noting with concern the persistent gaps in implementation reported by Member States,

1. Calls upon all Member States to strengthen national reporting frameworks;

2. Requests the Secretary-General to submit a progress report within eighteen months;
`;

function fill(t: string, w: { agenda: string; committee: string; country: string }) {
  return t
    .replaceAll("<agenda>", w.agenda || "—")
    .replaceAll("<committee>", w.committee || "—")
    .replaceAll("<country>", w.country || "—");
}

export type WorkspaceInput = {
  conference: string;
  committee: string;
  country: string;
  agenda: string;
  startDate: string;
  delegate: string;
};

/** Creates the workspace and its starter checklist in the database. */
export async function createWorkspaceRecord(userId: string, input: WorkspaceInput) {
  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      user_id: userId,
      conference: input.conference,
      committee: input.committee,
      country: input.country,
      agenda: input.agenda,
      start_date: input.startDate || null,
      delegate: input.delegate,
      position_paper: fill(POSITION_PAPER_TEMPLATE, input),
      resolution: fill(RESOLUTION_TEMPLATE, input),
    })
    .select("id")
    .single();
  if (error) throw error;

  const { error: taskError } = await supabase.from("tasks").insert(
    DEFAULT_TASKS.map((label, position) => ({
      workspace_id: data.id,
      user_id: userId,
      label,
      position,
    })),
  );
  if (taskError) throw taskError;
  return data.id as string;
}

type Ctx = {
  session: Session | null;
  workspace: Workspace | null;
  ready: boolean;
  error: string | null;
  save: (patch: Partial<Workspace>) => void;
  reload: () => Promise<void>;
  savedAt: number | null;
  saving: boolean;
};

const WorkspaceContext = createContext<Ctx | null>(null);

type Row = Record<string, unknown>;

function mapWorkspace(w: Row, notes: Row[], sources: Row[], tasks: Row[], pois: Row[], evidence: Row[]): Workspace {
  return {
    id: w['id'] as string,
    createdAt: new Date(w['created_at'] as string).getTime(),
    conference: (w['conference'] as string) ?? "",
    committee: (w['committee'] as string) ?? "",
    country: (w['country'] as string) ?? "",
    agenda: (w['agenda'] as string) ?? "",
    startDate: (w['start_date'] as string) ?? "",
    delegate: (w['delegate'] as string) ?? "",
    positionPaper: (w['position_paper'] as string) ?? "",
    resolution: (w['resolution'] as string) ?? "",
    speechDraft: (w['speech_draft'] as string) ?? "",
    practiceSeconds: (w['practice_seconds'] as number) ?? 0,
    notes: notes.map((n) => ({
      id: n['id'] as string,
      folder: n['folder'] as string,
      title: n['title'] as string,
      body: n['body'] as string,
      updatedAt: new Date(n['updated_at'] as string).getTime(),
    })),
    sources: sources.map((s) => ({
      id: s['id'] as string,
      title: s['title'] as string,
      url: s['url'] as string,
      org: s['publisher'] as string,
      category: s['source_type'] as string,
      note: s['note'] as string,
    })),
    tasks: tasks.map((t) => ({
      id: t['id'] as string,
      label: t['label'] as string,
      done: t['done'] as boolean,
    })),
    pois: pois.map((p) => ({
      id: p['id'] as string,
      text: p['text'] as string,
      from: p['asked_by'] as string,
    })),
    evidence: evidence.map((e) => ({
      id: e['id'] as string,
      claim: e['claim'] as string,
      excerpt: e['excerpt'] as string,
      page: e['page'] as string,
      sourceId: (e['source_id'] as string) ?? null,
    })),
  };
}

const SCALARS: Record<string, string> = {
  conference: "conference",
  committee: "committee",
  country: "country",
  agenda: "agenda",
  delegate: "delegate",
  positionPaper: "position_paper",
  resolution: "resolution",
  speechDraft: "speech_draft",
  practiceSeconds: "practice_seconds",
  startDate: "start_date",
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const pending = useRef<Partial<Workspace>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = useRef<Workspace | null>(null);
  current.current = workspace;

  const load = useCallback(async (userId: string) => {
    setError(null);
    const { data: rows, error: wErr } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (wErr) {
      setError(wErr.message);
      setReady(true);
      return;
    }
    const row = rows?.[0];
    if (!row) {
      setWorkspace(null);
      setReady(true);
      return;
    }
    const id = row['id'] as string;
    const [notes, sources, tasks, pois, evidence] = await Promise.all([
      supabase.from("notes").select("*").eq("workspace_id", id).order("updated_at", { ascending: false }),
      supabase.from("sources").select("*").eq("workspace_id", id).order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").eq("workspace_id", id).order("position"),
      supabase.from("pois").select("*").eq("workspace_id", id).order("created_at", { ascending: false }),
      supabase.from("evidence").select("*").eq("workspace_id", id).order("created_at", { ascending: false }),
    ]);
    setWorkspace(
      mapWorkspace(row, notes.data ?? [], sources.data ?? [], tasks.data ?? [], pois.data ?? [], evidence.data ?? []),
    );
    setReady(true);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (!next) {
        setWorkspace(null);
        setReady(true);
      }
    });
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void load(data.session.user.id);
      else setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const userId = session?.user.id ?? null;

  const flush = useCallback(async () => {
    const w = current.current;
    const patch = pending.current;
    pending.current = {};
    if (!w || !userId || Object.keys(patch).length === 0) return;
    setSaving(true);
    try {
      const rowPatch: Record<string, unknown> = {};
      for (const [key, column] of Object.entries(SCALARS)) {
        if (key in patch) {
          const value = (patch as Record<string, unknown>)[key];
          rowPatch[column] = key === "startDate" ? (value as string) || null : value;
        }
      }
      if (Object.keys(rowPatch).length) {
        const { error: e } = await supabase
          .from("workspaces")
          .update(rowPatch as never)
          .eq("id", w.id);
        if (e) throw e;
      }

      if (patch.notes) {
        await syncList(
          "notes",
          w.id,
          userId,
          patch.notes,
          (n) => ({ id: n.id, folder: n.folder, title: n.title, body: n.body }),
        );
      }
      if (patch.sources) {
        await syncList("sources", w.id, userId, patch.sources, (s) => ({
          id: s.id,
          title: s.title,
          url: s.url,
          publisher: s.org,
          source_type: s.category,
          note: s.note,
        }));
      }
      if (patch.tasks) {
        await syncList("tasks", w.id, userId, patch.tasks, (t, i) => ({
          id: t.id,
          label: t.label,
          done: t.done,
          position: i,
        }));
      }
      if (patch.pois) {
        await syncList("pois", w.id, userId, patch.pois, (p) => ({
          id: p.id,
          text: p.text,
          asked_by: p.from,
        }));
      }
      if (patch.evidence) {
        await syncList("evidence", w.id, userId, patch.evidence, (e) => ({
          id: e.id,
          claim: e.claim,
          excerpt: e.excerpt,
          page: e.page,
          source_id: e.sourceId,
        }));
      }
      setSavedAt(Date.now());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your changes.");
    } finally {
      setSaving(false);
    }
  }, [userId]);

  const save = useCallback(
    (patch: Partial<Workspace>) => {
      setWorkspace((prev) => (prev ? { ...prev, ...patch } : prev));
      pending.current = { ...pending.current, ...patch };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), 600);
    },
    [flush],
  );

  const reload = useCallback(async () => {
    if (userId) await load(userId);
  }, [userId, load]);

  const value = useMemo(
    () => ({ session, workspace, ready, error, save, reload, savedAt, saving }),
    [session, workspace, ready, error, save, reload, savedAt, saving],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

/** Upserts every item in the list and deletes rows that are no longer present. */
async function syncList<T extends { id: string }>(
  table: "notes" | "sources" | "tasks" | "pois" | "evidence",
  workspaceId: string,
  userId: string,
  items: T[],
  toRow: (item: T, index: number) => Record<string, unknown>,
) {
  const ids = items.map((i) => i.id);
  if (items.length) {
    const { error } = await supabase
      .from(table)
      .upsert(
        items.map((item, i) => ({ ...toRow(item, i), workspace_id: workspaceId, user_id: userId })) as never,
      );
    if (error) throw error;
  }
  let del = supabase.from(table).delete().eq("workspace_id", workspaceId);
  if (ids.length) del = del.not("id", "in", `(${ids.join(",")})`);
  const { error: delError } = await del;
  if (delError) throw delError;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}

/** Transparent progress: every number below is computed from real saved work. */
export function useReadiness(w: Workspace | null) {
  if (!w) return { score: 0, parts: [] as { label: string; value: number }[] };
  const parts = [
    {
      label: "Checklist",
      value: w.tasks.length
        ? Math.round((w.tasks.filter((t) => t.done).length / w.tasks.length) * 100)
        : 0,
    },
    { label: "Sources", value: Math.min(100, Math.round((w.sources.length / 8) * 100)) },
    {
      label: "Research notes",
      value: Math.min(100, Math.round((w.notes.filter((n) => n.body.trim()).length / 4) * 100)),
    },
    {
      label: "Position paper",
      value: Math.min(100, Math.round((countWords(w.positionPaper) / 700) * 100)),
    },
    { label: "Resolution", value: Math.min(100, Math.round((countWords(w.resolution) / 400) * 100)) },
    { label: "Speech practice", value: Math.min(100, Math.round((w.practiceSeconds / 600) * 100)) },
  ];
  const score = Math.round(parts.reduce((a, p) => a + p.value, 0) / parts.length);
  return { score, parts };
}

export function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
