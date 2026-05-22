import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site-shell";
import { COURSES, CLASS_LEVELS, ALL_SUBJECTS } from "@/lib/data";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — HELC" }, { name: "description", content: "Browse Nursery, KG, Basic, and SHS courses on HELC." }] }),
  component: Courses,
});

function Courses() {
  const [level, setLevel] = useState("All");
  const [subject, setSubject] = useState("All");
  const [priceFilter, setPriceFilter] = useState<"All" | "Free" | "Paid">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => COURSES.filter((c) =>
    (level === "All" || c.level === level) &&
    (subject === "All" || c.subject === subject) &&
    (priceFilter === "All" || (priceFilter === "Free" ? c.price === 0 : c.price > 0)) &&
    (q === "" || c.title.toLowerCase().includes(q.toLowerCase()))
  ), [level, subject, priceFilter, q]);

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">All Courses</h1>
          <p className="mt-2 opacity-90">Nursery · KG · Basic 1–9 · SHS 1–3</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 lg:grid-cols-4">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search course…" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All classes</option>
            {CLASS_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All subjects</option>
            {ALL_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value as "All" | "Free" | "Paid")} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All prices</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">{filtered.length} courses</div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="mb-4 flex h-28 items-center justify-center rounded-xl text-5xl" style={{ background: "var(--gradient-hero)" }}>📚</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-accent px-2 py-1 font-medium">{c.level}</span>
                {c.badge && <span className="rounded-full px-2 py-1 font-medium" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>{c.badge}</span>}
              </div>
              <h3 className="mt-3 font-semibold group-hover:text-primary">{c.title}</h3>
              <div className="text-sm text-muted-foreground">{c.teacher} · {c.duration}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-amber-600">★ {c.rating.toFixed(1)} <span className="text-muted-foreground">({c.students})</span></div>
                <div className="font-bold text-primary">{c.price === 0 ? "Free" : `GH₵${c.price}/mo`}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
