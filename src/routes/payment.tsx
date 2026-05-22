import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { COUPONS, COURSES } from "@/lib/data";

export const Route = createFileRoute("/payment")({
  validateSearch: (s: Record<string, unknown>) => ({ courseId: (s.courseId as string) || "" }),
  head: () => ({ meta: [{ title: "Payment — HELC" }] }),
  component: Payment,
});

function Payment() {
  const { courseId } = Route.useSearch();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const [method, setMethod] = useState("mtn");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [phone, setPhone] = useState("");

  const subtotal = course.price || 80;
  const total = Math.max(0, subtotal - (subtotal * discount) / 100);

  function applyCoupon() {
    const d = COUPONS[coupon.toUpperCase()];
    if (d) { setDiscount(d); alert(`Coupon applied: ${d}% off`); }
    else alert("Invalid coupon");
  }

  function pay(e: React.FormEvent) {
    e.preventDefault();
    alert(`Payment of GH₵${total.toFixed(2)} via ${method.toUpperCase()} processed (simulated).`);
    navigate({ to: "/student" });
  }

  return (
    <PageShell>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
          <p className="mt-2 opacity-90">Pay securely with Mobile Money or card</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
        <form onSubmit={pay} className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div>
            <h2 className="font-bold">Payment Method</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                { id: "mtn", label: "MTN Mobile Money", icon: "📱" },
                { id: "telecel", label: "Telecel Cash", icon: "📲" },
                { id: "airteltigo", label: "AirtelTigo Money", icon: "📞" },
                { id: "card", label: "Visa / Mastercard", icon: "💳" },
              ].map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${method === m.id ? "border-primary bg-accent" : "border-border"}`}>
                  <input type="radio" name="m" checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-primary" />
                  <span className="text-xl">{m.icon}</span> {m.label}
                </label>
              ))}
            </div>
          </div>

          {method !== "card" ? (
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="024 000 0000" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Card number" className="rounded-lg border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
              <input required placeholder="MM / YY" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <input required placeholder="CVV" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
          )}

          <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>Pay GH₵{total.toFixed(2)}</button>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h3 className="font-bold">Order Summary</h3>
          <div className="mt-4 flex justify-between text-sm"><span>{course.title}</span><span>GH₵{subtotal.toFixed(2)}</span></div>
          {discount > 0 && <div className="mt-1 flex justify-between text-sm text-emerald-600"><span>Coupon ({discount}%)</span><span>-GH₵{((subtotal * discount) / 100).toFixed(2)}</span></div>}
          <div className="mt-3 border-t border-border pt-3">
            <label className="text-xs font-medium text-muted-foreground">Coupon code</label>
            <div className="mt-1 flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="HELC50" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <button type="button" onClick={applyCoupon} className="rounded-lg border border-border px-3 text-sm font-semibold">Apply</button>
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">Try: HELC50, FREECLASS, BECE2026</div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-3 font-bold"><span>Total</span><span className="text-primary">GH₵{total.toFixed(2)}</span></div>
        </aside>
      </section>
    </PageShell>
  );
}
