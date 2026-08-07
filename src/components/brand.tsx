import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="9" fill="var(--primary)" />
      <path
        d="M10 11.5h12M10 16h8M10 20.5h5"
        stroke="var(--primary-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="20.5" r="2.5" fill="var(--primary-foreground)" opacity="0.85" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark />
      <span className="display text-2xl tracking-tight">Clause</span>
    </span>
  );
}
