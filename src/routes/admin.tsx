import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { RoleGate, StatCard, DashHeader } from "@/components/dashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — HELC" }] }),
  component: () => <RoleGate role="admin">{() => <Admin />}</RoleGate>,
});

const TABS = ["Overview", "Students", "Teachers", "Parents", "Courses", "Payments", "Coupons"] as const;
type Tab = typeof TABS[number];

function Admin() {
  const [tab, setTab] = useState<Tab>("Overview");
  return (
    <PageShell>
      <DashHeader title="Admin Dashboard" subtitle="Manage HELC platform" />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-semibold ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{t}</button>
          ))}
        </div>

        {tab === "Overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Students" value="5,284" icon="👨🏾‍🎓" />
              <StatCard label="Total Teachers" value="56" icon="👩🏾‍🏫" />
              <StatCard label="Total Revenue" value="GH₵142,500" icon="💰" />
              <StatCard label="Active Courses" value="124" icon="📚" />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-bold">📈 Popular Courses</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {["Core Mathematics — SHS 2", "English Language — Basic 9", "Integrated Science — SHS 1", "Physics — SHS 3"].map((c, i) => (
                    <li key={c} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                      <span>{c}</span><span className="font-semibold text-primary">{420 - i * 50}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-bold">🆕 Recent Signups</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {["Ama Asante (Student)", "Mr. Mensah (Teacher)", "Mrs. Owusu (Parent)", "Kwame B. (Student)"].map((s) => (
                    <li key={s} className="rounded-lg bg-secondary/50 px-3 py-2">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab !== "Overview" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Manage {tab}</h3>
              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>+ Add {tab.slice(0, -1)}</button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-2">Name</th><th>Email</th><th>Status</th><th></th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium">Sample {tab.slice(0, -1)} {i + 1}</td>
                      <td>user{i + 1}@helc.com</td>
                      <td><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">Active</span></td>
                      <td className="text-right"><button className="text-primary">Edit</button> · <button className="text-destructive">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
