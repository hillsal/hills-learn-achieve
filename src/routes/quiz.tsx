import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site-shell";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Quizzes & Exams — HELC" }] }),
  component: Quiz,
});

interface Q { q: string; opts: string[]; ans: number; }
const QUESTIONS: Q[] = [
  { q: "What is 15 × 4?", opts: ["45", "55", "60", "65"], ans: 2 },
  { q: "The capital of Ghana is…", opts: ["Kumasi", "Accra", "Takoradi", "Tamale"], ans: 1 },
  { q: "Solve: 2x + 5 = 15", opts: ["x = 3", "x = 5", "x = 7", "x = 10"], ans: 1 },
  { q: "H₂O is the chemical formula for…", opts: ["Oxygen", "Hydrogen", "Water", "Salt"], ans: 2 },
  { q: "Which is a noun?", opts: ["Quickly", "Run", "Beautiful", "School"], ans: 3 },
];

function Quiz() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (!started || done) return;
    if (time <= 0) { setDone(true); return; }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, started, done]);

  function answer(o: number) {
    if (o === QUESTIONS[i].ans) setScore(score + 1);
    if (i + 1 >= QUESTIONS.length) setDone(true);
    else setI(i + 1);
  }

  function reset() { setStarted(false); setI(0); setScore(0); setDone(false); setTime(60); }

  const leaderboard = [
    { name: "Akosua M.", score: 95 }, { name: "Kwame O.", score: 92 },
    { name: "Ama A.", score: 88 }, { name: "Yaw B.", score: 85 }, { name: "Esi K.", score: 80 },
  ];

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Quizzes & Exams</h1>
          <p className="mt-2 opacity-90">Timed quizzes · Instant marking · BECE & WASSCE mock simulations</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          {!started && !done && (
            <div className="text-center">
              <div className="text-5xl">📝</div>
              <h2 className="mt-3 text-xl font-bold">Sample BECE-style Quiz</h2>
              <p className="mt-1 text-sm text-muted-foreground">{QUESTIONS.length} questions · 60 seconds</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                <span className="rounded-full bg-accent px-2 py-1">Multiple choice</span>
                <span className="rounded-full bg-accent px-2 py-1">True/False</span>
                <span className="rounded-full bg-accent px-2 py-1">Short answer</span>
                <span className="rounded-full px-2 py-1" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>BECE Mock</span>
                <span className="rounded-full px-2 py-1" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>WASSCE CBT</span>
              </div>
              <button onClick={() => setStarted(true)} className="mt-6 rounded-lg px-5 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Start Quiz</button>
            </div>
          )}
          {started && !done && (
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Question {i + 1} / {QUESTIONS.length}</span>
                <span className="font-mono font-bold text-primary">⏱ {time}s</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full transition-all" style={{ width: `${((i) / QUESTIONS.length) * 100}%`, background: "var(--gradient-hero)" }} />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{QUESTIONS[i].q}</h3>
              <div className="mt-4 grid gap-2">
                {QUESTIONS[i].opts.map((o, idx) => (
                  <button key={o} onClick={() => answer(idx)} className="rounded-lg border border-border px-4 py-3 text-left text-sm hover:border-primary hover:bg-accent">{o}</button>
                ))}
              </div>
            </div>
          )}
          {done && (
            <div className="text-center">
              <div className="text-5xl">🎉</div>
              <h2 className="mt-3 text-2xl font-bold">You scored {score}/{QUESTIONS.length}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{score === QUESTIONS.length ? "Perfect!" : "Keep practicing to improve."}</p>
              <button onClick={reset} className="mt-6 rounded-lg px-5 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Try Again</button>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-bold">🏆 Leaderboard</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {leaderboard.map((p, idx) => (
              <li key={p.name} className="flex justify-between rounded-lg bg-secondary/50 px-3 py-2">
                <span><b>{idx + 1}.</b> {p.name}</span>
                <span className="font-semibold text-primary">{p.score}%</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </PageShell>
  );
}
