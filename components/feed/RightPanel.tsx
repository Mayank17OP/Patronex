"use client";

import { useState } from "react";
import { UserPlus, Activity, TrendingUp, Star, Calendar, CheckCircle2, ArrowRight, Heart, Zap, Code2, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Indian names for suggested users
const ACTIVITY_ITEMS = [
  { id: "a1", user: "Ananya Sharma", handle: "ananya.designs", action: "started following you", time: "2m", initials: "AS", color: "from-rose-400/40 to-pink-400/30" },
  { id: "a2", user: "Rohan Verma", handle: "rohan.codes", action: "liked your post", time: "9m", initials: "RV", color: "from-emerald-400/40 to-teal-400/30" },
  { id: "a3", user: "Priya Patel", handle: "priya.builds", action: "commented on your project", time: "23m", initials: "PP", color: "from-violet-400/40 to-purple-400/30" },
  { id: "a4", user: "Arjun Reddy", handle: "arjun.art", action: "is now supporting you", time: "1h", initials: "AR", color: "from-sky-400/40 to-blue-400/30" },
];

const SUGGESTIONS = [
  { id: "s1", name: "Ishaan Gupta", handle: "ishaan.creates", role: "Creator", initials: "IG", color: "from-amber-400/40 to-orange-400/30" },
  { id: "s2", name: "Kavya Nair", handle: "kavya.dev", role: "Developer", initials: "KN", color: "from-cyan-400/40 to-indigo-400/30" },
  { id: "s3", name: "Dhruv Menon", handle: "dhruv.codes", role: "Developer", initials: "DM", color: "from-sky-400/40 to-blue-400/30" },
  { id: "s4", name: "Zara Khan", handle: "zara.visuals", role: "Creator", initials: "ZK", color: "from-rose-400/40 to-fuchsia-400/30" },
];

const TRENDING = [
  { id: "t1", name: "Nikhil Rao", handle: "nikhil.builds", tag: "Open Source", initials: "NR", color: "from-emerald-400/40 to-teal-400/30" },
  { id: "t2", name: "Leela Sharma", handle: "leela.art", tag: "Illustration", initials: "LS", color: "from-violet-400/40 to-purple-400/30" },
  { id: "t3", name: "Ravi Kumar", handle: "ravi.dev", tag: "React / Next.js", initials: "RK", color: "from-sky-400/40 to-indigo-400/30" },
];

const EVENTS = [
  { title: "Creator Spotlight: Kavya Nair", date: "Mar 26" },
  { title: "Dev Meetup — Open Source Hour", date: "Mar 28" },
  { title: "Patronex Community AMA", date: "Apr 2" },
];

export function RightPanel() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <aside className="sticky top-[80px] space-y-4 h-fit">
      {/* Profile completion card */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10 p-4 card-depth hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 animate-pulse-soft">
            <CheckCircle2 size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Complete your profile</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add a bio and link to boost visibility</p>
            <div className="mt-3 h-1.5 rounded-full bg-border/40 overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 animate-shimmer" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">65% complete</p>
          </div>
        </div>
      </div>

      {/* Activity */}
      <PanelSection title="Activity" icon={Activity}>
        <div className="space-y-3">
          {ACTIVITY_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-center gap-2.5 group cursor-pointer animate-slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Avatar className="h-7 w-7 shrink-0 border border-border/30 group-hover:scale-110 transition-transform duration-200">
                <AvatarFallback className={cn("text-[10px] font-bold bg-gradient-to-br", item.color)}>
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/90 leading-snug">
                  <span className="font-semibold hover:text-primary transition-colors">@{item.handle}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground/60 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Suggested */}
      <PanelSection title="Suggested for you" icon={Star}>
        <div className="space-y-3">
          {SUGGESTIONS.map((s, index) => (
            <div 
              key={s.id} 
              className="flex items-center gap-2.5 group animate-slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Avatar className="h-8 w-8 shrink-0 border border-border/30 group-hover:scale-110 transition-transform duration-200">
                <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br", s.color)}>
                  {s.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">{s.name}</p>
                <p className="text-[10px] text-muted-foreground">@{s.handle} · {s.role}</p>
              </div>
              <button
                onClick={() => setFollowing((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                className={cn(
                  "shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300",
                  "hover:scale-105 active:scale-95",
                  following[s.id]
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-md shadow-sm"
                )}
              >
                {following[s.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Trending */}
      <PanelSection title="Trending" icon={TrendingUp}>
        <div className="space-y-2.5">
          {TRENDING.map((t, i) => (
            <div 
              key={t.id} 
              className="flex items-center gap-2.5 group cursor-pointer animate-slide-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-[11px] font-bold text-muted-foreground/40 w-4 text-center">{i + 1}</span>
              <Avatar className="h-7 w-7 shrink-0 border border-border/30 group-hover:scale-110 transition-transform duration-200">
                <AvatarFallback className={cn("text-[10px] font-bold bg-gradient-to-br", t.color)}>
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Events */}
      <PanelSection title="Upcoming" icon={Calendar}>
        <div className="space-y-2.5">
          {EVENTS.map((e, i) => (
            <div 
              key={i} 
              className="flex items-start gap-3 group cursor-pointer animate-slide-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground/90 leading-snug group-hover:text-primary transition-colors">{e.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{e.date}</p>
              </div>
              <ArrowRight size={12} className="text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Footer */}
      <div className="px-4 py-3 text-center">
        <p className="text-[10px] text-muted-foreground/60">
          Made with <Heart size={10} className="inline text-rose-400 mx-0.5" /> in India
        </p>
      </div>
    </aside>
  );
}

function PanelSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-sm p-4 card-depth hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={13} className="text-muted-foreground/70" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{title}</h3>
        </div>
        <button className="text-[11px] font-medium text-primary/80 hover:text-primary transition-colors">
          See all
        </button>
      </div>
      {children}
    </div>
  );
}
