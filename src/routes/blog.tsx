import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { BLOG_POSTS } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog & News — HELC" }] }),
  component: Blog,
});

function Blog() {
  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Blog & News</h1>
          <p className="mt-2 opacity-90">Study tips · Exam updates · WAEC news · HELC announcements</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p) => (
          <article key={p.id} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <div className="flex h-32 items-center justify-center rounded-xl text-5xl" style={{ background: "var(--gradient-hero)" }}>📰</div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gold-foreground)" }}>
              <span className="rounded-full px-2 py-1" style={{ background: "var(--gradient-gold)" }}>{p.category}</span>
            </div>
            <h3 className="mt-3 font-bold">{p.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{p.date}</div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
