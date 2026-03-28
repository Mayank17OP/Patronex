"use client";

import { cn } from "@/lib/utils";

// Feed Skeleton - Shimmer loading state for creator spotlight cards
export function FeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl border border-border/30 bg-card/50 overflow-hidden",
            "animate-pulse"
          )}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Header */}
          <div className="p-5 pb-4">
            <div className="flex items-start gap-4">
              {/* Avatar skeleton */}
              <div className="w-14 h-14 rounded-full bg-muted animate-shimmer shrink-0" />
              
              {/* Info skeleton */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-32 bg-muted rounded animate-shimmer" />
                  <div className="h-5 w-16 bg-muted rounded-full animate-shimmer" />
                </div>
                <div className="h-3 w-24 bg-muted rounded animate-shimmer" />
                <div className="h-3 w-full bg-muted rounded animate-shimmer mt-2" />
                <div className="h-3 w-4/5 bg-muted rounded animate-shimmer" />
                
                {/* Tags skeleton */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="h-5 w-14 bg-muted rounded animate-shimmer" />
                  <div className="h-5 w-12 bg-muted rounded animate-shimmer" />
                  <div className="h-5 w-16 bg-muted rounded animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured work skeleton */}
          <div className="mx-5 h-52 rounded-xl bg-muted animate-shimmer mb-4" />
          
          {/* Support section skeleton */}
          <div className="p-5 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 bg-muted rounded animate-shimmer" />
                <div className="h-6 w-20 bg-muted rounded animate-shimmer" />
                <div className="h-3 w-12 bg-muted rounded animate-shimmer" />
              </div>
              <div className="h-10 w-28 bg-muted rounded-xl animate-shimmer" />
            </div>
            <div className="h-8 w-full bg-muted rounded animate-shimmer mt-3" />
          </div>
        </div>
      ))}
    </>
  );
}

// Composer Skeleton
export function ComposerSkeleton() {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/50 p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-muted animate-shimmer" />
        <div className="flex-1 space-y-3">
          <div className="h-12 w-full bg-muted rounded-lg animate-shimmer" />
          <div className="flex items-center justify-between pt-3">
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-muted rounded-lg animate-shimmer" />
              <div className="h-8 w-8 bg-muted rounded-lg animate-shimmer" />
              <div className="h-8 w-8 bg-muted rounded-lg animate-shimmer" />
              <div className="h-8 w-8 bg-muted rounded-lg animate-shimmer" />
            </div>
            <div className="h-8 w-20 bg-muted rounded-lg animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Right Panel Skeleton
export function RightPanelSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Profile completion */}
      <div className="rounded-2xl border border-border/30 bg-card/50 p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-muted animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded animate-shimmer" />
            <div className="h-3 w-full bg-muted rounded animate-shimmer" />
            <div className="h-1.5 w-full bg-muted rounded-full mt-3 animate-shimmer" />
          </div>
        </div>
      </div>
      
      {/* Activity */}
      <div className="rounded-2xl border border-border/30 bg-card/50 p-4">
        <div className="h-4 w-16 bg-muted rounded mb-4 animate-shimmer" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-muted animate-shimmer" />
              <div className="flex-1 h-3 bg-muted rounded animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Suggested */}
      <div className="rounded-2xl border border-border/30 bg-card/50 p-4">
        <div className="h-4 w-24 bg-muted rounded mb-4 animate-shimmer" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-muted animate-shimmer" />
              <div className="flex-1 h-3 bg-muted rounded animate-shimmer" />
              <div className="w-16 h-6 bg-muted rounded-full animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Card Skeleton for various uses
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/30 bg-card/50 p-5 animate-pulse", className)}>
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded animate-shimmer" />
        <div className="h-3 w-1/2 bg-muted rounded animate-shimmer" />
        <div className="h-20 w-full bg-muted rounded-lg animate-shimmer mt-4" />
      </div>
    </div>
  );
}
