import { Q as reactExports, I as jsxRuntimeExports } from "./server-DrX_g5wL.js";
import { c as createLucideIcon, s as supabase, p as projectsData, T as Toaster, S as SiteNav, a as Sparkles, P as ProjectCard } from "./SiteNav-C4yadKZR.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-DskbpyGO.js";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Index() {
  const projects = projectsData;
  const [counts, setCounts] = reactExports.useState({});
  const [query, setQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    let mounted = true;
    supabase.from("project_likes").select("project_id, count").then(({
      data,
      error
    }) => {
      if (!mounted || error || !data) return;
      const map = {};
      for (const r of data) map[r.project_id] = r.count;
      setCounts(map);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.projectName.toLowerCase().includes(q) || p.developerName.toLowerCase().includes(q));
  }, [projects, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-[image:var(--gradient-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Prompt-Driven Web Design Showcase"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl", children: [
        "Student",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[image:var(--gradient-brand)] bg-clip-text text-transparent", children: "Project Gallery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg", children: [
        "Browse ",
        projects.length,
        " projects built by students. Open a preview, explore the live site, and tap the heart to support your favorites."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by project or developer…", className: "h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 py-10", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card p-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Project not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        "No projects match “",
        query,
        "”. Try a different search."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, initialCount: counts[p.id] ?? 0 }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border py-8 text-center text-sm text-muted-foreground", children: [
      "Built with Lovable · ",
      projects.length,
      " projects"
    ] })
  ] });
}
export {
  Index as component
};
