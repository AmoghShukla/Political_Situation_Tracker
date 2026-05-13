import { cn } from "@/lib/utils";

const points = [
  { name: "Mumbai", x: 21, y: 61, value: 64 },
  { name: "Pune", x: 31, y: 66, value: 59 },
  { name: "Nashik", x: 34, y: 47, value: 53 },
  { name: "Nagpur", x: 78, y: 42, value: 61 },
  { name: "Raigad", x: 25, y: 72, value: 62 },
  { name: "Marathwada", x: 55, y: 61, value: 48 }
];

export function MaharashtraMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-lg border bg-card p-4", className)}>
      <svg viewBox="0 0 420 320" className="h-full w-full" role="img" aria-label="Stylized Maharashtra project map">
        <path
          d="M76 76 145 48 228 61 318 49 375 91 356 151 377 217 307 262 221 249 164 287 88 252 56 189 43 126Z"
          fill="hsl(var(--primary) / 0.10)"
          stroke="hsl(var(--primary) / 0.65)"
          strokeWidth="3"
        />
        <path
          d="M77 188 C130 162 155 125 214 142 C263 156 295 126 357 151"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="3"
          strokeDasharray="7 8"
        />
        {points.map((point) => (
          <g key={point.name}>
            <circle cx={(point.x / 100) * 420} cy={(point.y / 100) * 320} r="10" fill="hsl(var(--primary))" opacity="0.18" />
            <circle cx={(point.x / 100) * 420} cy={(point.y / 100) * 320} r="5" fill="hsl(var(--primary))" />
            <text x={(point.x / 100) * 420 + 10} y={(point.y / 100) * 320 - 7} className="fill-foreground text-[11px] font-medium">
              {point.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 text-xs md:grid-cols-3">
        {points.map((point) => (
          <div key={point.name} className="rounded-md border bg-background/85 p-2 backdrop-blur">
            <div className="font-medium">{point.name}</div>
            <div className="text-muted-foreground">{point.value}% budget use</div>
          </div>
        ))}
      </div>
    </div>
  );
}
