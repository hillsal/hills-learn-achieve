import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { signup, dashboardPath, type Role } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — HELC" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Exclude<Role, "admin">>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const u = signup(email, password, name, role);
    if (!u) { setErr("An account with this email already exists."); return; }
    navigate({ to: dashboardPath(u.role) });
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Teachers, Students and Parents can sign up. Admin accounts are created internally.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {(["student", "teacher", "parent"] as const).map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)} className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${role === r ? "border-primary bg-accent text-primary" : "border-border"}`}>{r}</button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>}
            <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Create account</button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="font-semibold text-primary hover:underline">Log in</a>
          </div>
        </div>

        <div className="hidden rounded-3xl p-10 text-white lg:block" style={{ background: "var(--gradient-hero)" }}>
          <h2 className="text-3xl font-bold">Join HELC today</h2>
          <p className="mt-3 opacity-90">From Nursery to SHS — start learning with Ghana's modern online school.</p>
        </div>
      </section>
    </PageShell>
  );
}
