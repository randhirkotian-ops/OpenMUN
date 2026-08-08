import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="8" fill="var(--primary)" />
      <circle cx="16" cy="16" r="8.5" stroke="var(--primary-foreground)" strokeWidth="1.6" fill="none" />
      <path
        d="M16 7.5v17M7.5 16h17M16 7.5c3 3.2 3 13.8 0 17M16 7.5c-3 3.2-3 13.8 0 17"
        stroke="var(--primary-foreground)"
        strokeWidth="1.2"
        opacity="0.9"
        fill="none"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark />
      <span className="text-xl font-semibold tracking-tight">
        Open<span className="text-primary">MUN</span>
      </span>
    </span>
  );
}
