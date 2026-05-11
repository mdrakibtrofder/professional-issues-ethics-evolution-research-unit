import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import projectsData from "@/data/projects.json";

export const Route = createFileRoute("/projects")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Prompt-Driven Web Design — Project Showcase" },
      {
        name: "description",
        content:
          "Explore student projects built with prompt-driven web design. Browse, preview, and like your favorites.",
      },
    ],
  }),
});

function Index() {
  const projects = projectsData as Project[];
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.projectName.toLowerCase().includes(q) ||
        p.developerName.toLowerCase().includes(q),
    );
  }, [projects, query]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      <header className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3" /> Prompt-Driven Web Design Showcase
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Student Project Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Browse {projects.length} projects built by students. Open a preview, explore the live
            site, and tap the heart to support your favorites.
          </p>

          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project or developer…"
              className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <h2 className="text-xl font-semibold text-foreground">Project not found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No projects match “{query}”. Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} initialCount={counts[p.id] ?? 0} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Built with Lovable · {projects.length} projects
      </footer>
    </div>
  );
}
