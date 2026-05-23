import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import projectsData from "@/data/projects.json";
import { SiteNav } from "@/components/SiteNav";
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
  Newspaper,
  HelpCircle,
  Quote,
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

const highlights = [
  {
    tag: "Research",
    date: "2026",
    title: "Ethical guardrails for student-built AI tools",
    desc: "A working paper synthesizing classroom experiments on bias, consent, and transparency in prompt-driven applications.",
  },
  {
    tag: "Workshop",
    date: "Spring",
    title: "Responsible Prompting Bootcamp",
    desc: "A two-day hands-on workshop helping students reason about data sources, attribution, and misuse before they ship.",
  },
  {
    tag: "Policy",
    date: "Brief",
    title: "Data privacy in north-Bangladesh institutions",
    desc: "A field-driven policy brief mapping current practice, gaps, and pragmatic next steps for local universities.",
  },
];

const faqs = [
  {
    q: "Who can join PIEERU?",
    a: "Any BAUST student, faculty member, or visiting researcher with a serious interest in the ethical dimensions of technology, business, or public life. We welcome contributors from engineering, computing, business, and the humanities.",
  },
  {
    q: "What kinds of projects do you support?",
    a: "Empirical studies, controlled experiments, surveys, policy briefs, classroom interventions, and applied design work. If the question is at the intersection of professional practice and ethics, it likely fits.",
  },
  {
    q: "Do students own their work?",
    a: "Yes. Every project showcased here is the original intellectual property of the individual student credited. PIEERU provides mentorship, infrastructure, and a platform — not authorship.",
  },
  {
    q: "How can external organizations collaborate?",
    a: "We partner with industry, government, NGOs, and other universities on funded research, advisory engagements, and training. Reach out via the contact section below.",
  },
];

const voices = [
  {
    quote:
      "PIEERU pushed me to ask why before how. My project became more thoughtful, and honestly, more useful.",
    name: "Student Researcher",
    role: "CSE, BAUST",
  },
  {
    quote:
      "Pairing engineering rigor with ethical reasoning is exactly what the next decade of professionals needs.",
    name: "Faculty Advisor",
    role: "BAUST",
  },
  {
    quote:
      "A young unit with a clear voice — work that takes both technology and people seriously.",
    name: "Collaborator",
    role: "Industry partner",
  },
];

function Home() {
  const allProjects = projectsData as Project[];
  const featured = allProjects.slice(0, 6);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;
    supabase
      .from("project_likes")
      .select("project_id, count")
      .then(({ data, error }) => {
        if (!mounted || error || !data) return;
        const map: Record<string, number> = {};
        for (const r of data) map[r.project_id] = r.count;
        setCounts(map);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-soft)] opacity-70" />
        <div className="absolute -top-32 left-1/4 -z-10 h-[420px] w-[680px] rounded-full bg-[color:var(--brand-blue)]/20 blur-3xl" />
        <div className="absolute -top-10 right-0 -z-10 h-[360px] w-[520px] rounded-full bg-[color:var(--brand-green)]/25 blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <MapPin className="h-3 w-3" /> BAUST · Saidpur, Nilphamari · Bangladesh
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Shaping the future of{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
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
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Explore Student Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
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

      {/* Research Highlights */}
      <section id="research" className="border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">
                <Newspaper className="h-3 w-3" /> Research Highlights
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Recent work &amp; ongoing inquiries.
              </h2>
              <p className="mt-3 text-muted-foreground">
                A rolling glimpse at the questions, papers, and field activities currently moving through the unit.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map((h) => (
              <article
                key={h.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-brand)] opacity-70" />
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                    {h.tag}
                  </span>
                  <span className="text-muted-foreground">{h.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {voices.map((v) => (
              <figure
                key={v.name + v.role}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="h-5 w-5 text-[color:var(--brand-green)]" />
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{v.name}</span> · {v.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">
              <HelpCircle className="h-3 w-3" /> Frequently Asked
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Questions, answered.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A few things people ask before getting involved with the unit.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition open:border-primary/40 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
                  <span>{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-[image:var(--gradient-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" /> Student Showcase
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Individual students&rsquo; intellectual property.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Each project below is the original work and intellectual property of the individual
                student credited. Explore a sample of their prompt-driven web design work.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              View all {allProjects.length} projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} initialCount={counts[p.id] ?? 0} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PIEERU · Professional Issues &amp; Ethics Evolution Research Unit · BAUST
      </footer>
    </div>
  );
}