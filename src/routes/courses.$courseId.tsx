import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { COURSES } from "@/lib/data";

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseDetail,
  notFoundComponent: () => <PageShell><div className="p-16 text-center"><h1 className="text-2xl font-bold">Course not found</h1><Link to="/courses" className="mt-4 inline-block text-primary">← Back to courses</Link></div></PageShell>,
  loader: ({ params }) => {
    const course = COURSES.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [openTopic, setOpenTopic] = useState<number | null>(0);

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link to="/courses" className="text-sm opacity-80 hover:opacity-100">← All courses</Link>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-white/15 px-2 py-1">{course.level}</span>
            <span className="rounded-full bg-white/15 px-2 py-1">{course.subject}</span>
            {course.badge && <span className="rounded-full px-2 py-1" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>{course.badge}</span>}
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.title}</h1>
          <div className="mt-2 opacity-90">By {course.teacher} · {course.duration} · ★ {course.rating.toFixed(1)} ({course.students} students)</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-card text-6xl">▶️</div>
          <div>
            <h2 className="text-xl font-bold">About this course</h2>
            <p className="mt-2 text-muted-foreground">{course.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">What you'll learn</h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {course.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm"><span className="text-primary">✓</span> {t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Curriculum</h2>
            <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
              {course.topics.map((t, i) => (
                <button key={t} onClick={() => setOpenTopic(openTopic === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3 text-left">
                  <span className="text-sm font-medium">Module {i + 1}: {t}</span>
                  <span className="text-muted-foreground">{openTopic === i ? "−" : "+"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <div className="text-3xl font-bold text-primary">{course.price === 0 ? "Free" : `GH₵${course.price}`}<span className="text-sm font-normal text-muted-foreground">{course.price === 0 ? "" : " /month"}</span></div>
          <Link to="/payment" search={{ courseId: course.id }} className="mt-4 block rounded-lg px-4 py-3 text-center text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Enroll Now</Link>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div>📅 Duration: {course.duration}</div>
            <div>👩🏾‍🏫 Tutor: {course.teacher}</div>
            <div>🎓 Class: {course.level}</div>
            <div>📜 Certificate included</div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
