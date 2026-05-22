import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site-shell";
import { RESOURCES, CLASS_LEVELS, ALL_SUBJECTS } from "@/lib/data";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Resource Library — HELC" }] }),
  component: Resources,
});

function Resources() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [subject, setSubject] = useState("All");

  const filtered = useMemo(() => RESOURCES.filter((r) =>
    (level === "All" || r.level === level) &&
    (subject === "All" || r.subject === subject || r.subject === "All") &&
    (q === "" || r.title.toLowerCase().includes(q.toLowerCase()))
  ), [q, level, subject]);

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Resource Library</h1>
          <p className="mt-2 opacity-90">PDFs, notes, worksheets, past questions, mocks & videos</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 lg:grid-cols-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or topic…" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All classes</option>
            {CLASS_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All subjects</option>
            {ALL_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium">{r.type}</span>
                <span className={`text-xs font-semibold ${r.free ? "text-emerald-600" : "text-primary"}`}>{r.free ? "FREE" : "PAID"}</span>
              </div>
              <h3 className="mt-3 flex-1 font-semibold">{r.title}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{r.subject} · {r.level}</div>
              <button onClick={() => alert(r.free ? "Downloading…" : "Please subscribe to download.")} className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                ⬇ Download
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
