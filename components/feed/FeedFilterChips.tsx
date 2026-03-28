"use client";

import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "creators", label: "Creators" },
  { id: "developers", label: "Developers" },
  { id: "following", label: "Following" },
  { id: "trending", label: "Trending" },
];

interface FeedFilterChipsProps {
  active: string;
  setActive: (id: string) => void;
}

export function FeedFilterChips({ active, setActive }: FeedFilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActive(filter.id)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-sm font-medium",
            "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap",
            "border",
            active === filter.id
              ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_16px_rgba(54,84,134,0.25)] scale-[1.02]"
              : "bg-card/50 text-muted-foreground border-border/30 hover:bg-muted hover:text-foreground hover:border-border/50 hover:scale-[1.02]"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
