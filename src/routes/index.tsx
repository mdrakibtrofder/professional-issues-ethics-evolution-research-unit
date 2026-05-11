import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  MapPin,
  Mail,
  ArrowRight,
  Microscope,
  ClipboardList,
  Scale,
  BookOpen,
  Users,
  ShieldCheck,
  Lightbulb,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "PIEERU — Professional Issues & Ethics Evolution Research Unit" },
      {
        name: "description",
        content:
          "PIEERU is a research unit at Bangladesh Army University of Science and Technology (BAUST), Saidpur, Nilphamari, advancing professional ethics for the technological era.",
      },
      { property: "og:title", content: "PIEERU — Research Unit at BAUST" },
      {
        property: "og:description",
        content:
          "Advancing professional ethics in the age of AI, automation, and data — from BAUST, Saidpur, Nilphamari, Bangladesh.",
      },
    ],
  }),
});

const capabilities = [
  {
    icon: Microscope,
    title: "Qualitative & Quantitative Research",
    desc: "Rigorous mixed-method studies on professional conduct, integrity, and emerging ethical dilemmas.",
  },
  {
    icon: ClipboardList,
    title: "Experiments & Surveys",
    desc: "Controlled experiments, longitudinal studies, and large-scale surveys on workplace ethics and tech adoption.",
  },
  {
    icon: Scale,
    title: "Policy Analysis",
    desc: "Evidence-based analysis and development of practical ethical frameworks for institutions and regulators.",
  },
  {
    icon: BookOpen,
    title: "Publications & Workshops",
    desc: "Academic publications, training workshops, and consultancy embedding ethics into professional practice.",
  },
  {
    icon: ShieldCheck,
    title: "AI, Data Privacy & Automation",
    desc: "Focused inquiry into the responsibilities surfaced by AI systems, data governance, and automation.",
  },
  {
    icon: Users,
    title: "Community & Collaboration",
    desc: "Partnerships with academia, industry, and civil society to translate research into real-world impact.",
  },
];

const focusAreas = [
  "Professional Ethics",
  "AI & Society",
  "Data Privacy",
  "Engineering Ethics",
  "Research Integrity",
  "Tech Policy",
  "Workplace Culture",
  "Sustainability",
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">PIEERU</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <a href="#about" className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground">About</a>
            <a href="#capabilities" className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground">Capabilities</a>
            <a href="#focus" className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground">Focus</a>
            <a href="#contact" className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground">Contact</a>
            <Link
              to="/projects"
              className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Projects <ArrowRight className="h-3 w-3" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-background" />
        <div className="absolute -top-32 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <MapPin className="h-3 w-3" /> BAUST · Saidpur, Nilphamari · Bangladesh
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Shaping the future of{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              professional ethics
            </span>{" "}
            in a technological era.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            <strong className="text-foreground">PIEERU</strong> — the Professional Issues &amp; Ethics
            Evolution Research Unit — is a research collective studying how emerging technologies,
            evolving workplace cultures, and shifting societal values reshape what it means to be a
            responsible professional today.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Explore Student Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Learn About PIEERU
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
            {[
              { label: "Research focus areas", value: "8+" },
              { label: "Active projects", value: "40+" },
              { label: "Founded at", value: "BAUST" },
              { label: "Country", value: "Bangladesh" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About / Motivation */}
      <section id="about" className="border-t border-border bg-secondary/20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Lightbulb className="h-3 w-3" /> Our Motivation
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why ethics, why now.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-2">
            <p>
              We live in a moment where a single line of code can affect millions of lives, where
              algorithms decide what we see, who gets a loan, and how organizations make decisions.
              The pace of technological change has outrun our shared frameworks for what is right,
              fair, and responsible.
            </p>
            <p>
              <strong className="text-foreground">PIEERU exists to close that gap.</strong> We bring
              together students, faculty, and practitioners to investigate the human side of
              technology — the dilemmas, the trade-offs, and the quiet assumptions baked into the
              systems we build. We believe ethical literacy is not a soft skill; it is a core
              competency for every modern professional.
            </p>
            <p>
              From our home at <strong className="text-foreground">Bangladesh Army University of
              Science and Technology (BAUST)</strong> in Saidpur, Nilphamari, we work to make ethical
              reasoning a habit — not an afterthought — across engineering, computing, business, and
              public life.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Microscope className="h-3 w-3" /> Capabilities
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What the unit does.
            </h2>
            <p className="mt-3 text-muted-foreground">
              A multidisciplinary toolkit — from controlled experiments to policy analysis — applied
              to the ethical questions defining our generation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section id="focus" className="border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3 w-3" /> Focus Areas
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Where we direct our attention.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {focusAreas.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Contact */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Building2 className="h-3 w-3" /> Where we are
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Based at BAUST, Saidpur.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The unit is hosted at Bangladesh Army University of Science and Technology — a young,
              forward-looking institution in the north of Bangladesh, where engineering and
              technology students engage with the ethical challenges of their fields from day one.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Bangladesh Army University of Science and Technology (BAUST)
                  <br />
                  Saidpur Cantonment, Saidpur, Nilphamari, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:pieeru@baust.edu.bd" className="hover:text-primary hover:underline">
                  pieeru@baust.edu.bd
                </a>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="BAUST, Saidpur location map"
              src="https://www.google.com/maps?q=Bangladesh+Army+University+of+Science+and+Technology+Saidpur&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See ethics in action — through student projects.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Browse projects from students across BAUST exploring real-world problems with
            prompt-driven web design.
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Visit the Project Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PIEERU · Professional Issues &amp; Ethics Evolution Research Unit · BAUST
      </footer>
    </div>
  );
}