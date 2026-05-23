import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Home } from "lucide-react";
import { PieeruLogo } from "./PieeruLogo";

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <PieeruLogo size={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-foreground">PIEERU</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Ethics · Research · BAUST
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {isHome ? (
            <>
              <a href="#about" className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-muted-foreground hover:text-primary">About</a>
              <a href="#capabilities" className="hidden md:inline-flex rounded-md px-3 py-1.5 text-muted-foreground hover:text-primary">Capabilities</a>
              <a href="#research" className="hidden md:inline-flex rounded-md px-3 py-1.5 text-muted-foreground hover:text-primary">Research</a>
              <a href="#faq" className="hidden md:inline-flex rounded-md px-3 py-1.5 text-muted-foreground hover:text-primary">FAQ</a>
              <a href="#contact" className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-muted-foreground hover:text-primary">Contact</a>
              <Link
                to="/projects"
                className="ml-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[color:var(--brand-blue)] to-[color:var(--brand-green)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
              >
                Projects <ArrowRight className="h-3 w-3" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary"
              >
                <Home className="h-3.5 w-3.5" /> Back to Home
              </Link>
              <Link
                to="/projects"
                className="ml-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[color:var(--brand-blue)] to-[color:var(--brand-green)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
              >
                All Projects
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}