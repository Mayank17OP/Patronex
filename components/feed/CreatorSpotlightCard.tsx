"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Code2, Palette, ArrowRight, Sparkles, Play, Image, FileCode, Zap, Film, Layers } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type CreatorRole = "creator" | "developer";
export type ContentType = "artwork" | "project" | "demo" | "update" | "video" | "design";

export interface CreatorData {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  initials: string;
  role: CreatorRole;
  bio: string;
  tags: string[];
  supportAmount: number;
  supportLabel: string;
  featuredWork: {
    title: string;
    description: string;
    image?: string;
    type: ContentType;
  };
  color: string;
  cardStyle?: "default" | "horizontal" | "compact" | "featured";
}

interface CreatorSpotlightCardProps {
  creator: CreatorData;
  index?: number;
}

export const ROLE_CONFIG: Record<CreatorRole, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; color: string; bgColor: string }> = {
  creator: {
    icon: Palette,
    label: "Creator",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  developer: {
    icon: Code2,
    label: "Developer",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
  },
};

const TYPE_CONFIG: Record<ContentType, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }> = {
  artwork: { icon: Image, label: "Latest Artwork" },
  project: { icon: FileCode, label: "Featured Project" },
  demo: { icon: Play, label: "Live Demo" },
  update: { icon: Zap, label: "Latest Update" },
  video: { icon: Film, label: "Video" },
  design: { icon: Layers, label: "Design Work" },
};

const TYPE_LABELS: Record<ContentType, string> = {
  artwork: "Latest Artwork",
  project: "Featured Project",
  demo: "Live Demo",
  update: "Latest Update",
  video: "Video",
  design: "Design Work",
};

// Generate varied card backgrounds based on index and role
function getCardVariant(index: number, role: CreatorRole, color: string): {
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  accentColor: string;
  layout: "default" | "horizontal" | "featured";
} {
  const variants = [
    // Warm peach - soft and creative
    {
      bgGradient: "from-orange-50/80 via-rose-50/50 to-transparent dark:from-orange-950/30 dark:via-rose-950/20",
      borderColor: "border-orange-200/50 dark:border-orange-800/30",
      glowColor: "rgba(251,146,60,0.15)",
      accentColor: "#FB923C",
      layout: "default" as const,
    },
    // Cool blue - technical and clean
    {
      bgGradient: "from-sky-50/80 via-blue-50/50 to-transparent dark:from-sky-950/30 dark:via-blue-950/20",
      borderColor: "border-sky-200/50 dark:border-sky-800/30",
      glowColor: "rgba(56,189,248,0.15)",
      accentColor: "#38BDF8",
      layout: "horizontal" as const,
    },
    // Soft lavender - artistic and dreamy
    {
      bgGradient: "from-violet-50/80 via-purple-50/50 to-transparent dark:from-violet-950/30 dark:via-purple-950/20",
      borderColor: "border-violet-200/50 dark:border-violet-800/30",
      glowColor: "rgba(167,139,250,0.15)",
      accentColor: "#A78BFA",
      layout: "featured" as const,
    },
    // Mint green - fresh and natural
    {
      bgGradient: "from-emerald-50/80 via-teal-50/50 to-transparent dark:from-emerald-950/30 dark:via-teal-950/20",
      borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
      glowColor: "rgba(52,211,153,0.15)",
      accentColor: "#34D399",
      layout: "default" as const,
    },
    // Warm coral - energetic
    {
      bgGradient: "from-rose-50/80 via-pink-50/50 to-transparent dark:from-rose-950/30 dark:via-pink-950/20",
      borderColor: "border-rose-200/50 dark:border-rose-800/30",
      glowColor: "rgba(251,113,133,0.15)",
      accentColor: "#FB7185",
      layout: "default" as const,
    },
    // Amber gold - premium
    {
      bgGradient: "from-amber-50/80 via-yellow-50/50 to-transparent dark:from-amber-950/30 dark:via-yellow-950/20",
      borderColor: "border-amber-200/50 dark:border-amber-800/30",
      glowColor: "rgba(251,191,36,0.15)",
      accentColor: "#FBBF24",
      layout: "horizontal" as const,
    },
  ];

  const variantIndex = (index + (role === "developer" ? 1 : 0)) % variants.length;
  return variants[variantIndex];
}

export function CreatorSpotlightCard({ creator, index = 0 }: CreatorSpotlightCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [isSupporting, setIsSupporting] = useState(false);

  const roleConfig = ROLE_CONFIG[creator.role];
  const RoleIcon = roleConfig.icon;

  const cardVariant = getCardVariant(index, creator.role, creator.color);

  // Staggered animation delay
  const animationDelay = index * 100;

  return (
    <article
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-gradient-to-b from-card to-card/80",
        "border border-border/30",
        "shadow-[0_4px_24px_-8px_rgba(15,16,53,0.08)]",
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "animate-slide-in-up",
        isHovered && "shadow-[0_16px_48px_-12px_rgba(15,16,53,0.15)] -translate-y-1"
      )}
    >
      {/* Warm gradient overlay on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent transition-opacity duration-500 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )} 
      />
      
      <div className="relative">
        {/* Top Section - Creator Info */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar with glow effect */}
            <div className="relative shrink-0">
              <div 
                className={cn(
                  "absolute -inset-1 rounded-full blur-md transition-opacity duration-300",
                  isHovered ? "opacity-60" : "opacity-0"
                )}
                style={{ background: `linear-gradient(135deg, ${creator.color}40, transparent)` }}
              />
              <Avatar className="relative h-14 w-14 border-2 border-background shadow-lg">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback 
                  className="text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${creator.color}, ${creator.color}80)` }}
                >
                  {creator.initials}
                </AvatarFallback>
              </Avatar>
              
              {/* Role badge */}
              <div className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-background shadow-sm",
                roleConfig.bgColor
              )}>
                <RoleIcon size={12} className={roleConfig.color} />
              </div>
            </div>

            {/* Name, role, bio */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-foreground leading-tight">
                  {creator.name}
                </h3>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                  roleConfig.bgColor,
                  roleConfig.color
                )}>
                  <RoleIcon size={9} />
                  {roleConfig.label}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mt-0.5">@{creator.handle}</p>
              
              <p className="text-sm text-foreground/80 mt-2 leading-relaxed line-clamp-2">
                {creator.bio}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {creator.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Featured Work */}
        <div 
          className="relative mx-5 rounded-xl overflow-hidden border border-border/20 cursor-pointer"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          {/* Featured content preview */}
          <div 
            className={cn(
              "relative h-52 transition-transform duration-700 ease-out",
              imageHovered ? "scale-105" : "scale-100"
            )}
            style={{
              background: `linear-gradient(135deg, ${creator.color}30 0%, ${creator.color}10 100%)`,
            }}
          >
            {/* Placeholder pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${creator.color}40 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }} />
            </div>
            
            {/* Content type label */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm",
                "bg-background/80 text-foreground/70"
              )}>
                <Sparkles size={10} />
                {TYPE_LABELS[creator.featuredWork.type]}
              </span>
            </div>

            {/* Center content placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-sm font-medium text-foreground/90 mb-1">
                  {creator.featuredWork.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {creator.featuredWork.description}
                </p>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300",
            imageHovered ? "opacity-100" : "opacity-0"
          )} />
        </div>

        {/* Bottom Section - Support Area */}
        <div className="p-5 pt-4">
          <div className="flex items-center justify-between gap-4">
            {/* Support amount display */}
            <div className="flex items-center gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground">from</span>
                <span className="text-lg font-bold text-foreground">
                  ₹{creator.supportAmount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">/month</span>
              </div>
            </div>

            {/* Support CTA */}
            <button
              onClick={() => setIsSupporting(!isSupporting)}
              className={cn(
                "group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                "transition-all duration-300 ease-out",
                "overflow-hidden",
                isSupporting
                  ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 border border-emerald-500/30"
                  : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border border-transparent hover:shadow-lg hover:shadow-primary/20"
              )}
            >
              {/* Pulse glow effect */}
              {!isSupporting && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              )}
              
              <Heart 
                size={15} 
                className={cn(
                  "transition-all duration-300",
                  isSupporting && "fill-emerald-500 text-emerald-500"
                )} 
              />
              <span>{isSupporting ? "Supporting" : creator.supportLabel}</span>
              
              {!isSupporting && (
                <ArrowRight 
                  size={14} 
                  className={cn(
                    "transition-transform duration-300",
                    isHovered && "translate-x-0.5"
                  )} 
                />
              )}
            </button>
          </div>

          {/* View profile link */}
          <Link 
            href={`/profile?role=${creator.role}`}
            className="w-full mt-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors text-center flex items-center justify-center gap-1 group/link"
          >
            View full profile
            <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
