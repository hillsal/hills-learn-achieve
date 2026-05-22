import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — HELC" }, { name: "description", content: "Learn about HILLS E-Learning Centre, our mission, vision, values, and team." }] }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <h1 className="text-3xl font-bold sm:text-5xl">About HELC</h1>
          <p className="mt-4 max-w-2xl opacity-90">HILLS E-Learning Centre (HELC) is a modern Ghanaian online learning platform powered by Hills Educational Consult, designed to make quality education accessible from Nursery to SHS.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-3xl">🎯</div>
          <h2 className="mt-2 text-xl font-bold">Our Mission</h2>
          <p className="mt-2 text-muted-foreground">To empower every Ghanaian learner with affordable, high-quality digital education that prepares them for BECE, WASSCE, and beyond.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-3xl">🌍</div>
          <h2 className="mt-2 text-xl font-bold">Our Vision</h2>
          <p className="mt-2 text-muted-foreground">To become the most trusted online learning brand in West Africa, transforming how students learn — anytime, anywhere.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-8 text-2xl font-bold">Our Core Values</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "🏆", t: "Excellence" }, { i: "💡", t: "Innovation" },
            { i: "🤝", t: "Integrity" }, { i: "🌐", t: "Accessibility" },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl">{v.i}</div>
              <div className="mt-2 font-semibold">{v.t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold">Meet the Team</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "Mr. K. Hills", r: "CEO & Founder" },
              { n: "Mrs. Adjei", r: "Head Teacher" },
              { n: "Eng. Boateng", r: "Lead Developer" },
              { n: "Ms. Owusu", r: "Administrator" },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border bg-card p-5 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl text-white" style={{ background: "var(--gradient-hero)" }}>{p.n[0]}</div>
                <div className="mt-3 font-semibold">{p.n}</div>
                <div className="text-sm text-muted-foreground">{p.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
