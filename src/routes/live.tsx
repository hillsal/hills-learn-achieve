import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { LIVE_CLASSES } from "@/lib/data";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: [{ title: "Live Classes — HELC" }] }),
  component: Live,
});

function Live() {
  const [joined, setJoined] = useState<string | null>(null);
  const [chat, setChat] = useState<{ who: string; msg: string }[]>([{ who: "Tutor", msg: "Welcome to today's live class!" }]);
  const [msg, setMsg] = useState("");

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Live Classes</h1>
          <p className="mt-2 opacity-90">Evening · Weekend · Vacation bootcamps · WASSCE prep</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Upcoming Live Classes</h2>
          <div className="space-y-3">
            {LIVE_CLASSES.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium">{l.type}</span>
                    <span className="text-xs text-muted-foreground">{l.level}</span>
                  </div>
                  <div className="mt-1 font-semibold">{l.subject}</div>
                  <div className="text-sm text-muted-foreground">{l.teacher} · {l.date} at {l.time}</div>
                </div>
                <button onClick={() => setJoined(l.id)} className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Join</button>
              </div>
            ))}
          </div>

          {joined && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex aspect-video items-center justify-center bg-primary text-primary-foreground">
                <div className="text-center">
                  <div className="text-6xl">🎥</div>
                  <div className="mt-2 text-sm opacity-80">Live streaming placeholder</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border p-3">
                <button className="rounded-lg border border-border px-3 py-2 text-sm">✋ Raise hand</button>
                <button className="rounded-lg border border-border px-3 py-2 text-sm">🖊 Whiteboard</button>
                <button className="rounded-lg border border-border px-3 py-2 text-sm">🖥 Share screen</button>
                <button onClick={() => setJoined(null)} className="ml-auto rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground">Leave</button>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">Class Chat</h3>
          <div className="mt-3 h-64 space-y-2 overflow-y-auto rounded-lg bg-secondary/50 p-3 text-sm">
            {chat.map((c, i) => <div key={i}><span className="font-semibold text-primary">{c.who}:</span> {c.msg}</div>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!msg) return; setChat([...chat, { who: "You", msg }]); setMsg(""); }} className="mt-3 flex gap-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <button className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Send</button>
          </form>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-4 text-xl font-bold">Recorded Sessions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_CLASSES.slice(0, 3).map((l) => (
            <div key={l.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex aspect-video items-center justify-center rounded-lg bg-secondary text-4xl">▶️</div>
              <div className="mt-3 font-semibold">{l.subject} — {l.level}</div>
              <div className="text-sm text-muted-foreground">{l.teacher}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
