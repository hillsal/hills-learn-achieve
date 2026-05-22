import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { CLASS_LEVELS, COURSES, TESTIMONIALS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HELC — Learning Anytime, Achieving Everywhere" },
      { name: "description", content: "HILLS E-Learning Centre: paid and free online learning for Ghanaian students from Nursery to SHS. Live classes, BECE & WASSCE prep, quizzes, notes." },
      { property: "og:title", content: "HELC — Learning Anytime, Achieving Everywhere" },
      { property: "og:description", content: "From Nursery to SHS — online classes, BECE & WASSCE prep, quizzes, notes, and live tutors." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = COURSES.slice(0, 6);
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gold)" }} />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gold)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--gold)" }} /> Powered by Hills Educational Consult
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Learning <span style={{ color: "var(--gold)" }}>Anytime</span>,<br /> Achieving Everywhere
              </h1>
              <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">From Nursery to SHS — live classes, BECE & WASSCE prep, quizzes, notes and tutors who care.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/courses" className="rounded-lg px-5 py-3 text-sm font-semibold shadow-lg" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>Browse Courses</Link>
                <Link to="/signup" className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20">Create Free Account</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm opacity-90">
                <div><span className="block text-2xl font-bold" style={{ color: "var(--gold)" }}>5,000+</span> Students</div>
                <div><span className="block text-2xl font-bold" style={{ color: "var(--gold)" }}>120+</span> Courses</div>
                <div><span className="block text-2xl font-bold" style={{ color: "var(--gold)" }}>50+</span> Tutors</div>
              </div>
            </div>
            <div className="relative">
              <div className="grid gap-3 sm:grid-cols-2">
                {["BECE Ready", "WASSCE Ready", "Live Tutors", "Mock Exams"].map((t, i) => (
                  <div key={t} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur" style={{ transform: `translateY(${i % 2 ? 20 : 0}px)` }}>
                    <div className="text-3xl" style={{ color: "var(--gold)" }}>{["📚", "🎓", "🎥", "📝"][i]}</div>
                    <div className="mt-2 font-semibold">{t}</div>
                    <div className="text-xs opacity-80">Built for Ghanaian students</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Class Categories</h2>
            <p className="text-muted-foreground">From Nursery all the way to SHS 3</p>
          </div>
          <Link to="/courses" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CLASS_LEVELS.map((c) => (
            <Link key={c} to="/courses" className="group rounded-xl border border-border bg-card p-4 text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="text-2xl">{c.startsWith("SHS") ? "🎓" : c.startsWith("Basic") ? "📘" : "🧒"}</div>
              <div className="mt-2 text-sm font-semibold text-primary">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Courses</h2>
            <p className="text-muted-foreground">Hand-picked by our academic team</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl text-5xl" style={{ background: "var(--gradient-hero)" }}>📘</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-accent px-2 py-1 font-medium text-accent-foreground">{c.level}</span>
                  <span className="font-semibold text-primary">{c.price === 0 ? "Free" : `GH₵${c.price}/mo`}</span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary">{c.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{c.teacher} · {c.duration}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why HELC */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Why Choose HELC</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "🎓", t: "Ghanaian Curriculum", d: "Aligned with GES, BECE & WASSCE syllabi." },
            { i: "👩🏾‍🏫", t: "Expert Tutors", d: "Experienced Ghanaian teachers, hand-picked." },
            { i: "💸", t: "Affordable", d: "From GH₵20/month. MoMo, Visa, Mastercard." },
            { i: "📱", t: "Anywhere, Anytime", d: "Works on phone, tablet and laptop." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-3xl">{f.i}</div>
              <div className="mt-3 font-semibold">{f.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">What our families say</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <div className="text-2xl" style={{ color: "var(--gold)" }}>“</div>
                <p className="text-sm opacity-90">{t.text}</p>
                <div className="mt-4 text-sm font-semibold" style={{ color: "var(--gold)" }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to start learning?</h2>
        <p className="mt-2 text-muted-foreground">Join thousands of Ghanaian learners on HELC today.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/signup" className="rounded-lg px-5 py-3 text-sm font-semibold text-primary-foreground shadow" style={{ background: "var(--gradient-hero)" }}>Get Started Free</Link>
          <Link to="/courses" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-accent">Explore Courses</Link>
        </div>
      </section>
    </PageShell>
  );
}
