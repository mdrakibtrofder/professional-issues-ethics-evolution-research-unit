export function PieeruLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PIEERU logo"
    >
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.55 0.17 235)" />
          <stop offset="55%" stopColor="oklch(0.68 0.14 195)" />
          <stop offset="100%" stopColor="oklch(0.70 0.16 160)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#pg)" />
      <path
        d="M14 34 V14 h9 a6 6 0 0 1 0 12 h-9"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="34" cy="18" r="3.2" fill="white" />
      <path d="M30 30 q4 6 8 0" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}