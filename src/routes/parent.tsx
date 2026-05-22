import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { RoleGate, StatCard, DashHeader } from "@/components/dashboard";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Portal — HELC" }] }),
  component: () => <RoleGate role="parent">{(u) => <Parent name={u.name} />}</RoleGate>,
});

function Parent({ name }: { name: string }) {
  const children = [
    { name: "Ama Asante", class: "Basic 8", progress: 78, attendance: "94%" },
    { name: "Kwame Asante", class: "SHS 1", progress: 65, attendance: "88%" },
  ];
  return (
    <PageShell>
      <DashHeader title={`Welcome, ${name}`} subtitle="Track your children's learning journey" />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Children" value="2" icon="👨‍👩‍👧" />
          <StatCard label="Avg. Performance" value="71%" icon="📈" />
          <StatCard label="Fees Paid" value="GH₵320" icon="💳" />
          <StatCard label="Pending Fees" value="GH₵80" icon="🔔" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {children.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <div className="text-sm text-muted-foreground">{c.class}</div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">Active</span>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <div className="flex justify-between"><span>Term Progress</span><span className="font-semibold">{c.progress}%</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full" style={{ width: `${c.progress}%`, background: "var(--gradient-hero)" }} /></div>
                </div>
                <div className="flex justify-between"><span>Attendance</span><span className="font-semibold">{c.attendance}</span></div>
                <div className="flex justify-between"><span>Last Quiz</span><span className="font-semibold">82%</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/payment" className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Pay Fees</Link>
                <button className="rounded-lg border border-border px-3 py-2 text-sm font-semibold">View Report</button>
                <button className="rounded-lg border border-border px-3 py-2 text-sm font-semibold">Contact Teacher</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
