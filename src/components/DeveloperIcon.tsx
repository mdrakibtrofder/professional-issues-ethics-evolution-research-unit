import { useMemo } from "react";

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("") || "?";
}

const PALETTES: [string, string][] = [
  ["#fb7185", "#f97316"],
  ["#06b6d4", "#3b82f6"],
  ["#10b981", "#84cc16"],
  ["#a855f7", "#ec4899"],
  ["#f59e0b", "#ef4444"],
  ["#0ea5e9", "#8b5cf6"],
  ["#14b8a6", "#22c55e"],
  ["#f43f5e", "#a855f7"],
];

const SHAPES = ["circle", "rounded", "hex"] as const;

export function DeveloperIcon({ name, size = 36 }: { name: string; size?: number }) {
  const data = useMemo(() => {
    const h = hash(name);
    const [a, b] = PALETTES[h % PALETTES.length];
    const shape = SHAPES[(h >> 3) % SHAPES.length];
    const angle = h % 360;
    return { a, b, shape, angle, initials: initials(name) };
  }, [name]);

  const radius = data.shape === "circle" ? "50%" : data.shape === "rounded" ? "28%" : "14%";
  const clip = data.shape === "hex" ? "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" : undefined;

  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        clipPath: clip,
        background: `linear-gradient(${data.angle}deg, ${data.a}, ${data.b})`,
        color: "white",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {data.initials}
    </div>
  );
}