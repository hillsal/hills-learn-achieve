import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getSession, type Role, type User } from "@/lib/auth";

export function RoleGate({ role, children }: { role: Role; children: (u: User) => React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const u = getSession();
    setUser(u);
    setChecked(true);
    if (!u) navigate({ to: "/login" });
    else if (u.role !== role) navigate({ to: "/" });
  }, [navigate, role]);

  if (!checked || !user || user.role !== role) {
    return <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">Loading dashboard…</div>;
  }
  return <>{children(user)}</>;
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-bold text-primary">{value}</div>
    </div>
  );
}

export function DashHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 opacity-90">{subtitle}</p>}
      </div>
    </section>
  );
}
