import type { CountryProfile } from "@/data/countries";

export type Issue = {
  severity: "error" | "warning" | "info";
  line: number;
  title: string;
  detail: string;
  suggestion: string;
};

const PREAMB = [
  "affirming","alarmed by","approving","aware of","believing","bearing in mind","confident",
  "contemplating","convinced","declaring","deeply concerned","deeply conscious","deeply convinced",
  "deeply disturbed","deeply regretting","desiring","emphasizing","expecting","expressing its appreciation",
  "expressing its satisfaction","fulfilling","fully alarmed","fully aware","fully believing","further deploring",
  "further recalling","guided by","having adopted","having considered","having examined","having received",
  "keeping in mind","noting with regret","noting with satisfaction","noting with deep concern","noting further",
  "noting with approval","observing","reaffirming","realizing","recalling","recognizing","referring",
  "seeking","taking into account","taking into consideration","taking note","viewing with appreciation","welcoming",
];

const OPERATIVE = [
  "accepts","affirms","approves","authorizes","calls upon","calls for","condemns","confirms","congratulates",
  "considers","declares","deplores","designates","draws the attention","emphasizes","encourages","endorses",
  "expresses its appreciation","expresses its hope","further invites","further proclaims","further reminds",
  "further recommends","further requests","further resolves","has resolved","notes","proclaims","reaffirms",
  "recommends","regrets","reminds","requests","solemnly affirms","strongly condemns","supports","takes note of",
  "transmits","trusts","urges","decides","invites","urges",
];

const WEAK = ["very","really","a lot","things","stuff","maybe","kind of","sort of","obviously","clearly","huge","bad","good"];

const startsWithAny = (line: string, list: string[]) => {
  const l = line.toLowerCase().trimStart();
  return list.find((p) => l.startsWith(p));
};

export function checkResolution(text: string): Issue[] {
  const issues: Issue[] = [];
  const lines = text.split("\n");
  const seen = new Map<string, number>();
  let operativeIndex = 0;
  let inOperative = false;

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) return;
    const n = i + 1;
    const numbered = /^(\d+)\.\s+/.exec(line);
    const isHeader = /^[A-Z\s:]+:/.test(line) && line.length < 80;
    if (isHeader) return;

    if (numbered) {
      inOperative = true;
      operativeIndex += 1;
      const expected = operativeIndex;
      if (Number(numbered[1]) !== expected) {
        issues.push({
          severity: "error",
          line: n,
          title: `Operative clause numbered ${numbered[1]}, expected ${expected}`,
          detail: "Operative clauses must be numbered sequentially from 1.",
          suggestion: `Renumber this clause as ${expected}.`,
        });
      }
      const body = line.replace(/^\d+\.\s+/, "");
      const verb = startsWithAny(body, OPERATIVE);
      if (!verb) {
        issues.push({
          severity: "error",
          line: n,
          title: "Clause does not begin with a recognised operative verb",
          detail: `"${body.split(" ").slice(0, 3).join(" ")}…" is not in the standard operative verb list.`,
          suggestion: "Open with a verb such as Calls upon, Requests, Urges, Encourages or Decides.",
        });
      } else if (body[0] !== body[0]?.toUpperCase()) {
        issues.push({
          severity: "warning",
          line: n,
          title: "Operative verb is not capitalised",
          detail: "The opening operative verb is conventionally italicised or capitalised.",
          suggestion: `Write "${verb.replace(/^./, (c) => c.toUpperCase())}".`,
        });
      }
      if (!/[;.]$/.test(line)) {
        issues.push({
          severity: "warning",
          line: n,
          title: "Missing clause punctuation",
          detail: "Operative clauses end with a semicolon; the final clause ends with a full stop.",
          suggestion: "Add a semicolon at the end of this clause.",
        });
      }
    } else if (!inOperative) {
      const verb = startsWithAny(line, PREAMB);
      if (!verb) {
        issues.push({
          severity: "warning",
          line: n,
          title: "Preambulatory clause does not use a standard opening phrase",
          detail: `"${line.split(" ").slice(0, 3).join(" ")}…" is not a recognised preambulatory phrase.`,
          suggestion: "Try Recalling, Noting with concern, Reaffirming, Emphasizing or Bearing in mind.",
        });
      }
      if (!line.endsWith(",")) {
        issues.push({
          severity: "warning",
          line: n,
          title: "Preambulatory clause should end with a comma",
          detail: "Preambulatory clauses are separated by commas, not full stops.",
          suggestion: "Replace the final punctuation with a comma.",
        });
      }
    }

    const key = line.toLowerCase().replace(/^\d+\.\s+/, "").slice(0, 60);
    if (key.length > 20) {
      const first = seen.get(key);
      if (first) {
        issues.push({
          severity: "info",
          line: n,
          title: "Possible duplicate clause",
          detail: `This closely mirrors the clause on line ${first}.`,
          suggestion: "Merge the two clauses or differentiate their mandates.",
        });
      } else seen.set(key, n);
    }

    const weak = WEAK.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(line));
    if (weak.length) {
      issues.push({
        severity: "info",
        line: n,
        title: `Informal wording: ${weak.join(", ")}`,
        detail: "Resolutions read as legal instruments; colloquial intensifiers weaken them.",
        suggestion: "Replace with precise, measurable language.",
      });
    }
  });

  return issues;
}

export type SpeechReport = {
  words: number;
  sentences: number;
  minutes: number;
  seconds: number;
  wpm: number;
  avgSentence: number;
  evidence: number;
  repeated: { word: string; count: number }[];
  structure: { label: string; present: boolean }[];
  tone: number;
  confidence: number;
  hedges: string[];
};

const HEDGES = ["i think","i feel","maybe","probably","sort of","kind of","i guess","hopefully","just"];
const DIPLOMATIC = ["delegation","distinguished","committee","member states","framework","cooperation","multilateral","mandate","resolution","charter"];

export function analyzeSpeech(text: string, wpm = 130): SpeechReport {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceList = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const totalSeconds = Math.round((words / wpm) * 60);
  const evidence = (text.match(/\b(\d{1,3}(,\d{3})+|\d+(\.\d+)?%|\d{4})\b/g) ?? []).length;

  const counts = new Map<string, number>();
  text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 5)
    .forEach((w) => counts.set(w, (counts.get(w) ?? 0) + 1));
  const repeated = [...counts.entries()]
    .filter(([, c]) => c >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({ word, count }));

  const lower = text.toLowerCase();
  const structure = [
    { label: "Salutation / address to the chair", present: /honou?rable chair|distinguished delegates|mr\.? chair|madam chair/.test(lower) },
    { label: "Framing of the problem", present: /today|the issue|this crisis|the challenge|the question/.test(lower) },
    { label: "Evidence or data", present: evidence > 0 },
    { label: "National position stated", present: /my delegation|the delegation of|our country|we believe/.test(lower) },
    { label: "Concrete proposal", present: /propose|calls upon|we urge|recommend|framework|mechanism/.test(lower) },
    { label: "Closing / yield", present: /thank you|yields|in conclusion|we look forward/.test(lower) },
  ];

  const hedges = HEDGES.filter((h) => lower.includes(h));
  const diplomatic = DIPLOMATIC.filter((d) => lower.includes(d)).length;
  const tone = Math.min(100, Math.round((diplomatic / DIPLOMATIC.length) * 100));
  const confidence = Math.max(0, 100 - hedges.length * 12 - (words < 60 ? 20 : 0));

  return {
    words,
    sentences: sentenceList.length,
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    wpm,
    avgSentence: sentenceList.length ? Math.round(words / sentenceList.length) : 0,
    evidence,
    repeated,
    structure,
    tone,
    confidence,
    hedges,
  };
}

export type AlignmentFlag = { phrase: string; note: string; sources: { label: string; url: string }[] };

const SENSITIVE: { pattern: RegExp; label: string; note: string }[] = [
  { pattern: /abolish(ing)? the veto|remove the veto/i, label: "abolishing the veto", note: "Positions on the veto differ sharply between permanent and non-permanent members." },
  { pattern: /military intervention|use of force|armed intervention/i, label: "use of force", note: "Many states qualify support for force with Charter Chapter VII and consent requirements." },
  { pattern: /sanctions/i, label: "sanctions", note: "Support for unilateral versus UN-mandated sanctions varies significantly by state." },
  { pattern: /binding (emissions|emission) (cuts|targets)/i, label: "binding emissions targets", note: "Developing states often frame obligations around common but differentiated responsibilities." },
  { pattern: /recognis|recogniz/i, label: "recognition language", note: "Recognition of states or entities is a sensitive sovereign decision — check official statements." },
  { pattern: /nuclear disarmament|non-proliferation treaty|\bNPT\b/i, label: "nuclear order", note: "Treaty membership determines what a delegation can credibly call for." },
  { pattern: /humanitarian intervention|responsibility to protect|\bR2P\b/i, label: "R2P", note: "Non-intervention traditions make R2P framing contested for several delegations." },
];

export function checkAlignment(text: string, profile: CountryProfile | null): AlignmentFlag[] {
  if (!text.trim()) return [];
  const flags: AlignmentFlag[] = [];
  for (const s of SENSITIVE) {
    if (s.pattern.test(text)) {
      flags.push({
        phrase: s.label,
        note: profile
          ? `You raise ${s.label}. This argument may not align with ${profile.name}'s stated positions — verify against an official source before committee.`
          : `You raise ${s.label}. Verify this against your country's official positions before committee.`,
        sources: profile
          ? profile.links.slice(0, 3).map((l) => ({ label: l.label, url: l.url }))
          : [{ label: "UN Digital Library", url: "https://digitallibrary.un.org/" }],
      });
    }
  }
  return flags;
}
