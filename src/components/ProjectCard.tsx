import { useEffect, useState } from "react";
import { Heart, ExternalLink, ImageOff } from "lucide-react";
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

function thumbnailUrl(url: string) {
  // Use a free screenshot service
  return `https://image.thum.io/get/width/800/crop/600/noanimate/${encodeURI(url)}`;
}

export function ProjectCard({ project, initialCount }: { project: Project; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imgState, setImgState] = useState<"loading" | "loaded" | "error">("loading");
  const [showDesc, setShowDesc] = useState(false);

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
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        {imgState === "loading" && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-secondary" />
        )}
        {imgState === "error" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="h-10 w-10" />
            <span className="text-xs">Preview unavailable</span>
          </div>
        ) : (
          <img
            src={thumbnailUrl(project.url)}
            alt={`${project.projectName} preview`}
            loading="lazy"
            onLoad={() => setImgState("loaded")}
            onError={() => setImgState("error")}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imgState === "loaded" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
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