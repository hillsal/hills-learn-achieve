import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession, logout, dashboardPath, type User } from "@/lib/auth";

export function SiteHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(getSession());
    const onAuth = () => setUser(getSession());
    window.addEventListener("helc-auth", onAuth);
    return () => window.removeEventListener("helc-auth", onAuth);
  }, []);

  const nav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/live", label: "Live Classes" },
    { to: "/resources", label: "Resources" },
    { to: "/quiz", label: "Quizzes" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
            <span className="font-bold text-white">H</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-primary">HELC</div>
            <div className="hidden text-[10px] text-muted-foreground sm:block">Learning Anytime, Achieving Everywhere</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground" activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-accent" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link to={dashboardPath(user.role)} className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent">Dashboard</Link>
              <button onClick={() => { logout(); router.navigate({ to: "/" }); }} className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent">Log in</Link>
              <Link to="/signup" className="rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm" style={{ background: "var(--gradient-hero)" }}>Sign up</Link>
            </>
          )}
        </div>
        <button className="lg:hidden rounded-md border border-border p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl flex flex-col p-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">{n.label}</Link>
            ))}
            {user ? (
              <>
                <Link to={dashboardPath(user.role)} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-primary">Dashboard</Link>
                <button onClick={() => { logout(); setOpen(false); router.navigate({ to: "/" }); }} className="rounded-md px-3 py-2 text-left text-sm">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-primary">Log in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold" style={{ color: "var(--gold-foreground)", background: "var(--gradient-gold)" }}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-bold" style={{ color: "var(--gold-foreground)" }}>H</span>
            </div>
            <div className="font-bold">HELC</div>
          </div>
          <p className="mt-3 text-sm opacity-80">HILLS E-Learning Centre — Learning Anytime, Achieving Everywhere.</p>
          <p className="mt-3 text-xs opacity-70">Powered by Hills Educational Consult</p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold" style={{ color: "var(--gold)" }}>Explore</div>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/live">Live Classes</Link></li>
            <li><Link to="/resources">Resource Library</Link></li>
            <li><Link to="/quiz">Quizzes & Exams</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold" style={{ color: "var(--gold)" }}>Company</div>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold" style={{ color: "var(--gold)" }}>Contact</div>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Accra, Ghana</li>
            <li>+233 (0) 55 000 0000</li>
            <li>hello@helc.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} HILLS E-Learning Centre. All rights reserved.</div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
