"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Zap, MoreHorizontal, Code2, Palette, Globe, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface PostData {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
    role: "developer" | "creator" | "supporter";
  };
  timestamp: string;
  tag: "Developer" | "Creator" | "Open Source" | "Design" | "Artwork" | "Project" | "Idea";
  content: string;
  image?: string;
  imageRatio?: "landscape" | "portrait" | "square";
  stats: { likes: number; comments: number; shares: number };
  hasSupport?: boolean;
}

// Indian names for content creators
const INDIAN_CREATORS = [
  { name: "Vikram Iyer", handle: "vikram.designs", initials: "VI", role: "creator" as const, color: "from-rose-400/40 to-pink-400/30" },
  { name: "Neha Krishnan", handle: "neha.codes", initials: "NK", role: "developer" as const, color: "from-sky-400/40 to-blue-400/30" },
  { name: "Aditya Nair", handle: "aditya.builds", initials: "AN", role: "developer" as const, color: "from-emerald-400/40 to-teal-400/30" },
  { name: "Divya Rao", handle: "divya.creates", initials: "DR", role: "creator" as const, color: "from-violet-400/40 to-purple-400/30" },
  { name: "Kabir Joshi", handle: "kabir.art", initials: "KJ", role: "creator" as const, color: "from-amber-400/40 to-orange-400/30" },
  { name: "Meera Shah", handle: "meera.dev", initials: "MS", role: "developer" as const, color: "from-cyan-400/40 to-indigo-400/30" },
];

const TAG_CONFIG: Record<PostData["tag"], { color: string; bg: string; icon: React.ComponentType<{size?: number, className?: string}> }> = {
  Developer: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10", icon: Code2 },
  Creator: { color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", icon: Palette },
  "Open Source": { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", icon: Globe },
  Design: { color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10", icon: Sparkles },
  Artwork: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", icon: Palette },
  Project: { color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-500/10", icon: Code2 },
  Idea: { color: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-500/10", icon: Zap },
};

const ROLE_ICONS: Record<PostData["author"]["role"], React.ComponentType<{ size?: number; className?: string }>> = {
  developer: Code2,
  creator: Palette,
  supporter: Heart,
};

interface FeedPostCardProps {
  post: PostData;
  style?: React.CSSProperties;
  index?: number;
}

export function FeedPostCard({ post, style, index = 0 }: FeedPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [supported, setSupported] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const RoleIcon = ROLE_ICONS[post.author.role];
  const tagCfg = TAG_CONFIG[post.tag];
  const TagIcon = tagCfg.icon;

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  // Staggered animation delay
  const animationDelay = index * 100;

  return (
    <article
      style={{ ...style, animationDelay: `${animationDelay}ms` }}
      className={cn(
        "group relative rounded-2xl border border-border/30",
        "bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-sm",
        "shadow-[0_4px_20px_-8px_rgba(15,16,53,0.08)]",
        "hover:shadow-[0_12px_40px_-12px_rgba(15,16,53,0.15)]",
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "animate-slide-in-up overflow-hidden",
        "hover:-translate-y-1"
      )}
    >
      {/* Warm gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 group/avatar">
              {/* Glowing ring on hover */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 to-secondary/20 blur-md opacity-0 group-hover/avatar:opacity-60 transition-opacity duration-300" />
              <Avatar className="relative h-10 w-10 border-2 border-background shadow-md">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-muted to-muted/80 text-foreground">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              {/* Role badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-background flex items-center justify-center border border-border/40 shadow-sm">
                <RoleIcon size={10} className={cn(
                  post.author.role === "developer" && "text-sky-500",
                  post.author.role === "creator" && "text-rose-500",
                  post.author.role === "supporter" && "text-emerald-500"
                )} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">
                  {post.author.name}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                    "border border-transparent",
                    tagCfg.bg,
                    tagCfg.color
                  )}
                >
                  <TagIcon size={9} />
                  {post.tag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-muted-foreground">@{post.author.handle}</span>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <span className="text-xs text-muted-foreground/70">{post.timestamp}</span>
              </div>
            </div>
          </div>

          <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95">
            <MoreHorizontal size={15} />
          </button>
        </div>

        {/* Post content */}
        <p className="text-[15px] text-foreground/90 leading-relaxed mb-4">{post.content}</p>

        {/* Image preview - varied ratios */}
        {post.image && (
          <div 
            className="relative rounded-xl overflow-hidden mb-4 border border-border/20 group/image cursor-pointer"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <div
              className={cn(
                "w-full bg-gradient-to-br flex items-center justify-center transition-transform duration-700 ease-out",
                post.imageRatio === "portrait" ? "h-72" : post.imageRatio === "square" ? "h-48" : "h-56",
                imageHovered ? "scale-105" : "scale-100"
              )}
              style={{
                background: `linear-gradient(135deg, var(--primary-200) 0%, var(--primary-700) 100%)`,
              }}
            >
              <span className="text-white/70 text-xs font-medium uppercase tracking-widest">{post.image}</span>
            </div>
            {/* Image overlay on hover */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300",
              imageHovered ? "opacity-100" : "opacity-0"
            )} />
          </div>
        )}

        {/* Support CTA */}
        {post.hasSupport && (
          <button
            onClick={() => setSupported(!supported)}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold mb-4",
              "border transition-all duration-300 ease-out",
              "hover:shadow-md active:scale-[0.98]",
              supported
                ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600"
                : "bg-gradient-to-r from-muted/50 to-muted/30 border-border/40 text-muted-foreground hover:border-amber-500/30 hover:text-amber-600 hover:bg-amber-500/5"
            )}
          >
            <Zap size={14} className={cn("transition-all", supported && "fill-amber-500 text-amber-500")} />
            {supported ? "Supporting this creator ✓" : "Back this creator"}
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-0 pt-3 border-t border-border/20">
          <ActionBtn
            icon={Heart}
            count={likeCount}
            active={liked}
            activeColor="text-rose-500"
            activeBg="hover:bg-rose-500/10"
            onClick={handleLike}
            label="Like"
          />
          <ActionBtn
            icon={MessageCircle}
            count={post.stats.comments}
            activeColor="text-sky-500"
            activeBg="hover:bg-sky-500/10"
            label="Comment"
          />
          <ActionBtn
            icon={Share2}
            count={post.stats.shares}
            activeColor="text-emerald-500"
            activeBg="hover:bg-emerald-500/10"
            label="Share"
          />
          <div className="ml-auto">
            <ActionBtn
              icon={Bookmark}
              active={saved}
              activeColor="text-amber-500"
              activeBg="hover:bg-amber-500/10"
              onClick={() => setSaved(!saved)}
              label="Save"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionBtn({
  icon: Icon,
  count,
  active,
  activeColor,
  activeBg,
  onClick,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
  active?: boolean;
  activeColor: string;
  activeBg: string;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        active
          ? cn(activeColor, activeBg)
          : "text-muted-foreground/70 hover:text-foreground",
        activeBg
      )}
    >
      <Icon
        size={15}
        className={cn(
          "transition-all duration-300",
          active && cn(activeColor, "scale-110", "fill-current"),
          !active && "group-hover:scale-110"
        )}
      />
      {count !== undefined && (
        <span className={cn("tabular-nums", active && activeColor)}>{count}</span>
      )}
    </button>
  );
}

// Sample posts with Indian creators and varied content
export const SAMPLE_POSTS: PostData[] = [
  {
    id: "1",
    author: INDIAN_CREATORS[0],
    timestamp: "2 hours ago",
    tag: "Design",
    content: "Just finished a new design system for my upcoming project! Can't wait to share the full case study. The warm color palette really brings that human touch we were missing. 🎨",
    image: "Design Preview",
    imageRatio: "landscape",
    stats: { likes: 128, comments: 24, shares: 12 },
    hasSupport: true,
  },
  {
    id: "2",
    author: INDIAN_CREATORS[1],
    timestamp: "4 hours ago",
    tag: "Developer",
    content: "Shipped my first open-source React component library today! 500+ stars already. Thanks to everyone who contributed and gave feedback. Open source is truly magical ✨",
    stats: { likes: 342, comments: 56, shares: 89 },
    hasSupport: true,
  },
  {
    id: "3",
    author: INDIAN_CREATORS[3],
    timestamp: "5 hours ago",
    tag: "Artwork",
    content: "Working on a series inspired by Indian street art and modern minimalism. Here's a sneak peek of the third piece in the collection. What do you think?",
    image: "Artwork Preview",
    imageRatio: "portrait",
    stats: { likes: 256, comments: 38, shares: 45 },
    hasSupport: true,
  },
  {
    id: "4",
    author: INDIAN_CREATORS[2],
    timestamp: "8 hours ago",
    tag: "Open Source",
    content: "Released v2.0 of my CLI tool! Now with 3x faster builds and better error messages. Check it out and let me know what features you'd like to see next. 🚀",
    stats: { likes: 189, comments: 42, shares: 67 },
  },
  {
    id: "5",
    author: INDIAN_CREATORS[4],
    timestamp: "12 hours ago",
    tag: "Creator",
    content: "Behind the scenes of my latest illustration project. The process is messy but the results are worth it! Swipe to see the evolution from sketch to final. ✏️→🎨",
    image: "Illustration Process",
    imageRatio: "square",
    stats: { likes: 412, comments: 67, shares: 34 },
    hasSupport: true,
  },
  {
    id: "6",
    author: INDIAN_CREATORS[5],
    timestamp: "1 day ago",
    tag: "Project",
    content: "After 6 months of building, I'm finally launching my SaaS product! It's a productivity tool designed specifically for indie developers and small teams. Early access link in bio 🎯",
    stats: { likes: 523, comments: 89, shares: 156 },
    hasSupport: true,
  },
];
