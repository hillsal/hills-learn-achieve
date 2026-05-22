import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { RoleGate, StatCard, DashHeader } from "@/components/dashboard";
import { COURSES, LIVE_CLASSES } from "@/lib/data";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — HELC" }] }),
  component: () => <RoleGate role="student">{(u) => <Student name={u.name} />}</RoleGate>,
});

function Student({ name }: { name: string }) {
  const myCourses = COURSES.slice(0, 4);
  return (
    <PageShell>
      <DashHeader title={`Welcome, ${name} 👋`} subtitle="Keep up the great work!" />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Enrolled Courses" value="4" icon="📚" />
          <StatCard label="Avg. Progress" value="62%" icon="📈" />
          <StatCard label="Quiz Avg." value="85%" icon="📝" />
          <StatCard label="WASSCE Readiness" value="A2" icon="🎯" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">My Courses</h2>
              <Link to="/courses" className="text-sm text-primary">Browse more →</Link>
            </div>
            <div className="mt-4 space-y-3">
              {myCourses.map((c, i) => (
                <div key={c.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.teacher}</div>
                    </div>
                    <Link to="/courses/$courseId" params={{ courseId: c.id }} className="text-sm font-semibold text-primary">Continue →</Link>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full" style={{ width: `${30 + i * 15}%`, background: "var(--gradient-hero)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold">📅 Upcoming Live</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {LIVE_CLASSES.slice(0, 3).map((l) => (
                  <li key={l.id} className="rounded-lg bg-secondary/50 px-3 py-2">
                    <div className="font-semibold">{l.subject}</div>
                    <div className="text-xs text-muted-foreground">{l.date} · {l.time}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold">🔔 Notifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>New quiz available in Mathematics</li>
                <li>Live class starts in 30 mins</li>
                <li>Term report is ready</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
