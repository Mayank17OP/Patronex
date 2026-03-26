"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles, Code2, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CreatorData, CreatorRole } from "./CreatorSpotlightCard";

interface SearchSpotlightProps {
  creators: CreatorData[];
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const ROLE_CONFIG: Record<CreatorRole, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; color: string; bgColor: string }> = {
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

export function SearchSpotlight({ 
  creators, 
  isOpen, 
  onClose, 
  searchQuery, 
  onSearchQueryChange 
}: SearchSpotlightProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredCreators, setFilteredCreators] = useState<CreatorData[]>([]);

  // Filter creators based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCreators([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = creators.filter((creator) => {
      return (
        creator.name.toLowerCase().includes(query) ||
        creator.handle.toLowerCase().includes(query) ||
        creator.bio.toLowerCase().includes(query) ||
        creator.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        creator.featuredWork.title.toLowerCase().includes(query) ||
        creator.role.includes(query as CreatorRole)
      );
    });

    setFilteredCreators(filtered);
  }, [searchQuery, creators]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-fade-in-scale"
        onClick={onClose}
      />
      
      {/* Search container */}
      <div className="relative w-full max-w-2xl animate-slide-in-up">
        {/* Search input */}
        <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border/30">
            <Search size={20} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search creators, developers, projects, tags..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none text-base"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchQueryChange("")}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-muted text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results area */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!searchQuery.trim() ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Start typing to discover talented creators and developers
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  {["Design", "Developer", "Open Source", "AI", "Art"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onSearchQueryChange(tag)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredCreators.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Try searching for names, skills, tags, or project types
                </p>
              </div>
            ) : (
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {filteredCreators.length} result{filteredCreators.length !== 1 ? "s" : ""} found
                </p>
                <div className="space-y-1">
                  {filteredCreators.map((creator, index) => (
                    <SearchResultCard 
                      key={creator.id} 
                      creator={creator} 
                      index={index}
                      onClick={onClose}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick tip */}
        <p className="text-center mt-3 text-xs text-muted-foreground/70">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">Enter</kbd> to select
        </p>
      </div>
    </div>
  );
}

function SearchResultCard({ 
  creator, 
  index,
  onClick 
}: { 
  creator: CreatorData; 
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const roleConfig = ROLE_CONFIG[creator.role];
  const RoleIcon = roleConfig.icon;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
      className={cn(
        "w-full flex items-center gap-4 p-3 rounded-xl text-left",
        "transition-all duration-200",
        "hover:bg-muted/60 animate-slide-in-up"
      )}
    >
      {/* Avatar */}
      <Avatar className="h-12 w-12 border-2 border-background shadow-md shrink-0">
        <AvatarImage src={creator.avatar} alt={creator.name} />
        <AvatarFallback 
          className="text-xs font-semibold text-white"
          style={{ background: `linear-gradient(135deg, ${creator.color}, ${creator.color}80)` }}
        >
          {creator.initials}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-sm truncate">
            {creator.name}
          </span>
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0",
            roleConfig.bgColor,
            roleConfig.color
          )}>
            <RoleIcon size={9} />
            {roleConfig.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          @{creator.handle} · {creator.bio.slice(0, 60)}...
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          {creator.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-muted-foreground/80">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Support info */}
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-sm font-semibold text-foreground">
          ₹{creator.supportAmount.toLocaleString()}
        </p>
        <p className="text-[10px] text-muted-foreground">/month</p>
      </div>

      {/* Arrow */}
      <ArrowRight 
        size={16} 
        className={cn(
          "text-muted-foreground shrink-0 transition-transform duration-200",
          isHovered && "translate-x-1 text-foreground"
        )} 
      />
    </button>
  );
}
