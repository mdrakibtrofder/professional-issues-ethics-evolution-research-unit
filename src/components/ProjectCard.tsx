import { useEffect, useMemo, useState } from "react";
import { Heart, ExternalLink, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DeveloperIcon } from "./DeveloperIcon";
import { getVoterId, getLikedProjects, setLikedProject } from "@/lib/voter";

export type Project = {
  id: string;
  projectName: string;
  developerName: string;
  url: string;
  description?: string;
};

const SCREENSHOT_SOURCES = [
  (url: string) =>
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`,
  (url: string) =>
    `https://image.thum.io/get/width/800/crop/600/noanimate/${encodeURI(url)}`,
];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const PLACEHOLDER_PALETTES: Array<[string, string, string]> = [
  ["#2563eb", "#0ea5e9", "#10b981"],
  ["#0ea5e9", "#14b8a6", "#22c55e"],
  ["#1e40af", "#0891b2", "#059669"],
  ["#3b82f6", "#06b6d4", "#84cc16"],
  ["#1d4ed8", "#0284c7", "#16a34a"],
  ["#0369a1", "#0d9488", "#65a30d"],
];

function brandedPlaceholder(project: { projectName: string; url: string }) {
  const h = hashStr(project.projectName + project.url);
  const [c1, c2, c3] = PLACEHOLDER_PALETTES[h % PLACEHOLDER_PALETTES.length];
  let host = "site";
  try {
    host = new URL(project.url).hostname.replace(/^www\./, "");
  } catch {}
  const initial =
    (project.projectName.match(/[A-Za-z0-9]/)?.[0] ?? "P").toUpperCase();
  const id = `g${h}`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
    <defs>
      <linearGradient id='${id}' x1='0' y1='0' x2='800' y2='600' gradientUnits='userSpaceOnUse'>
        <stop offset='0%' stop-color='${c1}'/>
        <stop offset='55%' stop-color='${c2}'/>
        <stop offset='100%' stop-color='${c3}'/>
      </linearGradient>
      <radialGradient id='${id}b' cx='50%' cy='35%' r='65%'>
        <stop offset='0%' stop-color='white' stop-opacity='0.28'/>
        <stop offset='100%' stop-color='white' stop-opacity='0'/>
      </radialGradient>
      <pattern id='${id}p' width='40' height='40' patternUnits='userSpaceOnUse'>
        <circle cx='2' cy='2' r='1.4' fill='white' fill-opacity='0.18'/>
      </pattern>
    </defs>
    <rect width='800' height='600' fill='url(#${id})'/>
    <rect width='800' height='600' fill='url(#${id}p)'/>
    <rect width='800' height='600' fill='url(#${id}b)'/>
    <circle cx='130' cy='480' r='180' fill='white' fill-opacity='0.08'/>
    <circle cx='680' cy='120' r='120' fill='white' fill-opacity='0.10'/>
    <g transform='translate(60,60)'>
      <circle cx='14' cy='14' r='6' fill='white' fill-opacity='0.7'/>
      <circle cx='34' cy='14' r='6' fill='white' fill-opacity='0.5'/>
      <circle cx='54' cy='14' r='6' fill='white' fill-opacity='0.35'/>
    </g>
    <g font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' fill='white'>
      <text x='400' y='305' text-anchor='middle' font-size='220' font-weight='800' fill-opacity='0.95'>${initial}</text>
      <text x='400' y='405' text-anchor='middle' font-size='28' font-weight='600' letter-spacing='2' fill-opacity='0.95'>${escapeXml(
        project.projectName.slice(0, 32),
      )}</text>
      <text x='400' y='445' text-anchor='middle' font-size='18' letter-spacing='3' fill-opacity='0.75'>${escapeXml(
        host.toUpperCase(),
      )}</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string) {
  return s.replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]!),
  );
}

export function ProjectCard({ project, initialCount }: { project: Project; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [srcIdx, setSrcIdx] = useState(0);
  const [imgState, setImgState] = useState<"loading" | "loaded" | "fallback">("loading");
  const [showDesc, setShowDesc] = useState(false);
  const placeholder = useMemo(() => brandedPlaceholder(project), [project]);
  const currentSrc =
    imgState === "fallback" || srcIdx >= SCREENSHOT_SOURCES.length
      ? placeholder
      : SCREENSHOT_SOURCES[srcIdx](project.url);

  useEffect(() => {
    setLiked(getLikedProjects().has(project.id));
  }, [project.id]);

  useEffect(() => setCount(initialCount), [initialCount]);

  async function toggleLike() {
    if (busy) return;
    setBusy(true);
    const prevLiked = liked;
    const prevCount = count;
    // Optimistic
    setLiked(!prevLiked);
    setCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);
    try {
      const { data, error } = await supabase.rpc("toggle_project_like", {
        p_project_id: project.id,
        p_voter_id: getVoterId(),
      });
      if (error) throw error;
      const row = data?.[0];
      if (!row) throw new Error("Project not found");
      setCount(row.count);
      setLiked(row.liked);
      setLikedProject(project.id, row.liked);
    } catch (e) {
      setLiked(prevLiked);
      setCount(prevCount);
      toast.error("Like failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-[color:var(--brand-blue)]/10 to-[color:var(--brand-green)]/10"
      >
        {imgState === "loading" && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary to-accent/30" />
        )}
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${project.projectName} preview`}
          loading="lazy"
          onLoad={() => setImgState("loaded")}
          onError={() => {
            if (srcIdx + 1 < SCREENSHOT_SOURCES.length) {
              setSrcIdx(srcIdx + 1);
            } else {
              setImgState("fallback");
            }
          }}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imgState === "loading" ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur">
          <Globe className="h-3 w-3 text-primary" /> Live preview
        </div>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 truncate text-xs font-medium text-primary hover:underline"
          title={project.url}
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
        </a>

        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
          {project.projectName}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex min-w-0 items-center gap-2">
            <DeveloperIcon name={project.developerName} />
            <span className="truncate text-sm text-muted-foreground">{project.developerName}</span>
          </div>

          <button
            onClick={toggleLike}
            disabled={busy}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              liked
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-border bg-background text-foreground hover:border-rose-200 hover:text-rose-600"
            } ${busy ? "opacity-60" : ""}`}
          >
            <Heart
              className={`h-4 w-4 transition-transform ${liked ? "fill-rose-500 text-rose-500 scale-110" : ""}`}
            />
            <span className="tabular-nums">{count}</span>
          </button>
        </div>

        {project.description && (
          <div className="mt-2 border-t border-border pt-3">
            <button
              onClick={() => setShowDesc((v) => !v)}
              className="text-xs font-medium text-primary hover:underline"
            >
              {showDesc ? "Hide details" : "About this group"}
            </button>
            {showDesc && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}