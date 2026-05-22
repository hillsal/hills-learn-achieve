import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { RoleGate, StatCard, DashHeader } from "@/components/dashboard";
import { COURSES } from "@/lib/data";

export const Route = createFileRoute("/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — HELC" }] }),
  component: () => <RoleGate role="teacher">{(u) => <Teacher name={u.name} />}</RoleGate>,
});

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
