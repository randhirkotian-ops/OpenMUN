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

export type Workspace = {
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
  positionPaper: string;
  resolution: string;
  speechDraft: string;
  practiceSeconds: number;
  pois: { id: string; text: string; from: string }[];
};

const KEY = "clause.workspace.v1";

export const DEFAULT_TASKS: Task[] = [
  { id: "t1", label: "Read the committee background guide", done: false },
  { id: "t2", label: "Complete country intelligence brief", done: false },
  { id: "t3", label: "Collect 8+ credible sources", done: false },
  { id: "t4", label: "Draft position paper", done: false },
  { id: "t5", label: "Write opening speech", done: false },
  { id: "t6", label: "Prepare 3 draft clauses", done: false },
  { id: "t7", label: "Identify likely bloc partners", done: false },
  { id: "t8", label: "Rehearse speech under time limit", done: false },
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

function fill(t: string, w: Pick<Workspace, "agenda" | "committee" | "country">) {
  return t
    .replaceAll("<agenda>", w.agenda || "—")
    .replaceAll("<committee>", w.committee || "—")
    .replaceAll("<country>", w.country || "—");
}

export function createWorkspace(input: {
  conference: string;
  committee: string;
  country: string;
  agenda: string;
  startDate: string;
  delegate: string;
}): Workspace {
  return {
    createdAt: Date.now(),
    ...input,
    notes: [
      {
        id: crypto.randomUUID(),
        folder: "Research",
        title: "Committee background guide — key takeaways",
        body: "",
        updatedAt: Date.now(),
      },
    ],
    sources: [],
    tasks: DEFAULT_TASKS.map((t) => ({ ...t })),
    positionPaper: fill(POSITION_PAPER_TEMPLATE, input),
    resolution: fill(RESOLUTION_TEMPLATE, input),
    speechDraft: "",
    practiceSeconds: 0,
    pois: [],
  };
}

type Ctx = {
  workspace: Workspace | null;
  ready: boolean;
  save: (patch: Partial<Workspace>) => void;
  setWorkspace: (w: Workspace | null) => void;
  savedAt: number | null;
};

const WorkspaceContext = createContext<Ctx | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspaceState] = useState<Workspace | null>(null);
  const [ready, setReady] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWorkspaceState(JSON.parse(raw) as Workspace);
    } catch {
      /* ignore corrupt state */
    }
    setReady(true);
  }, []);

  const persist = useCallback((w: Workspace | null) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (w) localStorage.setItem(KEY, JSON.stringify(w));
      else localStorage.removeItem(KEY);
      setSavedAt(Date.now());
    }, 400);
  }, []);

  const setWorkspace = useCallback(
    (w: Workspace | null) => {
      setWorkspaceState(w);
      if (w) localStorage.setItem(KEY, JSON.stringify(w));
      else localStorage.removeItem(KEY);
      setSavedAt(Date.now());
    },
    [],
  );

  const save = useCallback(
    (patch: Partial<Workspace>) => {
      setWorkspaceState((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ workspace, ready, save, setWorkspace, savedAt }),
    [workspace, ready, save, setWorkspace, savedAt],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}

export function useReadiness(w: Workspace | null) {
  if (!w) return { score: 0, parts: [] as { label: string; value: number }[] };
  const parts = [
    { label: "Checklist", value: Math.round((w.tasks.filter((t) => t.done).length / w.tasks.length) * 100) },
    { label: "Sources", value: Math.min(100, Math.round((w.sources.length / 8) * 100)) },
    { label: "Research notes", value: Math.min(100, Math.round((w.notes.filter((n) => n.body.trim()).length / 4) * 100)) },
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
