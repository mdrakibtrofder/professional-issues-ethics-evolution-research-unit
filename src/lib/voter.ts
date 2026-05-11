const KEY = "pieeru_voter_id";

export function getVoterId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

const LIKED_KEY = "pieeru_liked_projects";

export function getLikedProjects(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function setLikedProject(id: string, liked: boolean) {
  const s = getLikedProjects();
  if (liked) s.add(id); else s.delete(id);
  localStorage.setItem(LIKED_KEY, JSON.stringify([...s]));
}