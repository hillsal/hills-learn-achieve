import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — HELC" }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
          <p className="mt-2 opacity-90">We'd love to hear from students, parents and schools.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold">Send us a message</h2>
          <input required placeholder="Your name" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <input required type="email" placeholder="Email" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <textarea required placeholder="Your message…" rows={5} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Send Message</button>
          {sent && <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Thanks! We'll be in touch shortly.</div>}
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold">Customer Care</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>📞 +233 (0) 55 000 0000</li>
              <li>📞 +233 (0) 24 111 1111</li>
              <li>✉️ hello@helc.com</li>
            </ul>
            <a href="https://wa.me/233550000000" className="mt-4 inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">💬 Chat on WhatsApp</a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex aspect-video items-center justify-center bg-secondary text-5xl">📍</div>
            <div className="p-4 text-sm text-muted-foreground">HILLS E-Learning Centre, Accra, Ghana</div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
