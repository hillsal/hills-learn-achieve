import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { login, dashboardPath } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — HELC" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function quickFill(role: string) {
    setEmail(`${role}@helc.com`);
    setPassword(`${role[0].toUpperCase()}${role.slice(1)}@123`);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const u = login(email, password);
    if (!u) { setErr("Invalid email or password."); return; }
    navigate({ to: dashboardPath(u.role) });
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div className="hidden rounded-3xl p-10 text-white lg:block" style={{ background: "var(--gradient-hero)" }}>
          <h2 className="text-3xl font-bold">Welcome back to HELC</h2>
          <p className="mt-3 opacity-90">Log in as Admin, Teacher, Student or Parent to access your dashboard.</p>
          <div className="mt-8 space-y-2 text-sm opacity-90">
            <div>🎓 Nursery to SHS 3</div>
            <div>📚 BECE & WASSCE preparation</div>
            <div>👨‍👩‍👧 Parent tracking & reports</div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use one of the default accounts below to explore.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["admin", "teacher", "student", "parent"].map((r) => (
              <button key={r} type="button" onClick={() => quickFill(r)} className="rounded-full border border-border px-3 py-1 capitalize hover:bg-accent">{r}</button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>}
            <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Log in</button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            New here? <a href="/signup" className="font-semibold text-primary hover:underline">Create an account</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
