import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { RoleGate, StatCard, DashHeader } from "@/components/dashboard";
import { COURSES } from "@/lib/data";

export const Route = createFileRoute("/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — HELC" }] }),
  component: () => <RoleGate role="teacher">{(u) => <Teacher name={u.name} />}</RoleGate>,
});

type Upload = { name: string; size: number; type: string; kind: "video" | "file"; at: string };

function UploadZone() {
  const videoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Upload[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const add = (files: FileList | null, kind: "video" | "file") => {
    if (!files) return;
    const next = Array.from(files).map((f) => ({
      name: f.name, size: f.size, type: f.type, kind, at: new Date().toLocaleString(),
    }));
    setItems((prev) => [...next, ...prev]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const fs = e.dataTransfer.files;
    if (!fs?.length) return;
    const kind: "video" | "file" = fs[0].type.startsWith("video/") ? "video" : "file";
    add(fs, kind);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">Upload Videos & Files</h2>
          <p className="text-sm text-muted-foreground">Share lesson videos, PDFs, notes and past questions with your students.</p>
        </div>
        <span className="rounded-full bg-[var(--gold,#f5b301)]/20 px-3 py-1 text-xs font-semibold text-primary">Placeholder</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Lesson title (e.g. Algebra — Quadratic Equations)"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
        <input
          value={subject} onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject / class (e.g. Basic 8 Mathematics)"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition ${dragOver ? "border-primary bg-primary/5" : "border-border bg-background"}`}
      >
        <div className="text-4xl">📤</div>
        <div className="mt-2 font-semibold">Drag & drop videos or files here</div>
        <div className="text-sm text-muted-foreground">MP4, MOV, PDF, DOCX, PPTX, JPG · up to 500 MB</div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button onClick={() => videoRef.current?.click()} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">🎥 Choose Video</button>
          <button onClick={() => fileRef.current?.click()} className="rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">📎 Choose File</button>
        </div>
        <input ref={videoRef} type="file" accept="video/*" multiple className="hidden" onChange={(e) => add(e.target.files, "video")} />
        <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => add(e.target.files, "file")} />
      </div>

      {items.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold">Pending uploads</h3>
          <ul className="mt-2 divide-y divide-border rounded-xl border border-border">
            {items.map((it, i) => (
              <li key={i} className="flex items-center justify-between gap-3 p-3 text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-xl">{it.kind === "video" ? "🎬" : "📄"}</span>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{(it.size / 1024 / 1024).toFixed(2)} MB · {it.at}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Ready</span>
                  <button onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))} className="text-xs text-destructive">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end">
            <button onClick={() => alert("Upload simulated — connect backend to persist files.")} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Publish to Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Teacher({ name }: { name: string }) {
  return (
    <PageShell>
      <DashHeader title={`Hello, ${name}`} subtitle="Manage your lessons, classes and students." />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="My Courses" value="6" icon="📚" />
          <StatCard label="Students" value="184" icon="👨🏾‍🎓" />
          <StatCard label="Live Classes" value="3" icon="🎥" />
          <StatCard label="Quizzes Created" value="12" icon="📝" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "⬆️", t: "Upload Lesson" }, { i: "📝", t: "Create Quiz" },
            { i: "📅", t: "Schedule Live" }, { i: "💬", t: "Reply Students" },
          ].map((a) => (
            <button key={a.t} className="rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="text-3xl">{a.i}</div>
              <div className="mt-2 font-semibold">{a.t}</div>
            </button>
          ))}
        </div>

        <UploadZone />

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">My Active Courses</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr><th className="py-2">Course</th><th>Level</th><th>Students</th><th>Avg. Score</th><th></th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COURSES.slice(0, 5).map((c, i) => (
                  <tr key={c.id}>
                    <td className="py-3 font-medium">{c.title}</td>
                    <td>{c.level}</td>
                    <td>{40 + i * 7}</td>
                    <td>{70 + i * 3}%</td>
                    <td className="text-right"><button className="text-primary">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
