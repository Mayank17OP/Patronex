"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Twitter, 
  Instagram, 
  Globe, 
  Edit3, 
  Share2,
  Users,
  Image as ImageIcon,
  Film,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Crown,
  Star,
  Plus,
  Settings,
  BarChart3,
  Wallet,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  Trash2,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ============================================
// DATA INTERFACES
// ============================================
interface ContentItem {
  id: string;
  type: "artwork" | "update" | "video" | "design";
  title: string;
  description: string;
  date: string;
  likes: number;
  views?: number;
  image?: string;
  status?: "published" | "draft";
}

interface Supporter {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  amount: number;
  since: string;
  totalGiven?: number;
}

interface EarningsData {
  month: string;
  amount: number;
  supporters: number;
}

interface CreatorData {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatar?: string;
  role: "creator";
  bio: string;
  location: string;
  tags: string[];
  color: string;
  joinDate: string;
  stats: {
    supporters: number;
    monthlySupport: number;
    posts: number;
    followers: number;
  };
  supportTiers: {
    amount: number;
    label: string;
    benefits: string[];
  }[];
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  goal: {
    current: number;
    target: number;
    label: string;
    description: string;
  };
  featuredContent: ContentItem;
  content: ContentItem[];
  supporters: Supporter[];
  earningsHistory: EarningsData[];
}

interface CreatorProfileProps {
  data: CreatorData;
  isOwnProfile?: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================
export function CreatorProfile({ data, isOwnProfile = false }: CreatorProfileProps) {
  const [activeTab, setActiveTab] = useState("content");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Gradient */}
      <div 
        className="relative h-56 sm:h-72 w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${data.color}40 0%, ${data.color}20 50%, transparent 100%)`,
        }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${data.color}60 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>
        
        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Owner Actions - Only show in owner mode */}
        {isOwnProfile && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-sm text-foreground text-sm font-medium hover:bg-background transition-colors border border-border/50">
              <Share2 size={14} />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-sm text-foreground text-sm font-medium hover:bg-background transition-colors border border-border/50">
              <Edit3 size={14} />
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
        {/* Profile Header Card */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div 
                className="absolute -inset-3 rounded-full blur-xl opacity-40"
                style={{ background: data.color }}
              />
              <Avatar className="relative h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-xl">
                <AvatarImage src={data.avatar} alt={data.name} />
                <AvatarFallback 
                  className="text-3xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}90)` }}
                >
                  {data.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center border-2 border-background shadow-md">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{data.name}</h1>
              <p className="text-muted-foreground">@{data.handle}</p>
              
              <p className="mt-3 text-sm text-foreground/80 max-w-xl">
                {data.bio}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Joined {data.joinDate}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                {data.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 shrink-0">
              {!isOwnProfile ? (
                <>
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl font-medium transition-all",
                      isFollowing 
                        ? "bg-muted text-foreground" 
                        : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                    )}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors">
                    <Share2 size={14} />
                    Share
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all"
                  >
                    <Plus size={14} />
                    New Post
                  </Link>
                  <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors">
                    <Settings size={14} />
                    Settings
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{data.stats.supporters}</p>
              <p className="text-xs text-muted-foreground">Supporters</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{data.stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{(data.stats.followers / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Content - Show in both modes */}
            <FeaturedContentCard content={data.featuredContent} color={data.color} />

            {/* Support Section - Primary CTA */}
            <div className="bg-gradient-to-br from-rose-50/90 to-pink-50/70 dark:from-rose-950/40 dark:to-pink-950/30 rounded-2xl border border-rose-200/50 dark:border-rose-800/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <Heart size={20} className="text-rose-500 fill-rose-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Support {data.name.split(" ")[0]}</h2>
                    <p className="text-sm text-muted-foreground">Join {data.stats.supporters} supporters</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">₹{data.stats.monthlySupport.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">monthly</p>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{data.goal.description}</span>
                  <span className="font-medium text-foreground">{Math.round((data.goal.current / data.goal.target) * 100)}%</span>
                </div>
                <div className="h-2 bg-rose-200/50 dark:bg-rose-900/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(data.goal.current / data.goal.target) * 100}%`,
                      background: `linear-gradient(90deg, #f43f5e, #e11d48)`
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">₹{data.goal.current.toLocaleString()} raised</span>
                  <span className="text-muted-foreground">Goal: ₹{data.goal.target.toLocaleString()}</span>
                </div>
              </div>

              {/* Support Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.supportTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    className="group p-4 rounded-xl bg-background/90 border border-border/50 hover:border-rose-300 dark:hover:border-rose-700 transition-all hover:shadow-md text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Crown size={14} className="text-amber-500" />
                      <span className="font-semibold text-sm text-foreground">{tier.label}</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">₹{tier.amount}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
              {[
                { id: "content", label: "Content", icon: FileText, count: data.stats.posts },
                { id: "supporters", label: "Supporters", icon: Users, count: data.stats.supporters },
                ...(isOwnProfile ? [{ id: "earnings", label: "Earnings", icon: BarChart3 }] : []),
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon size={14} />
                  {tab.label}
                  {tab.count && (
                    <span className="px-1.5 py-0.5 rounded-md bg-muted-foreground/10 text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "content" && (
                <>
                  {/* Owner Quick Actions */}
                  {isOwnProfile && (
                    <div className="flex gap-2 mb-4">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-md transition-all">
                        <Plus size={14} />
                        Add Post
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                        <Filter size={14} />
                        Filter
                      </button>
                    </div>
                  )}
                  
                  {data.content.map((item) => (
                    <ContentCard key={item.id} item={item} color={data.color} isOwner={isOwnProfile} />
                  ))}
                </>
              )}

              {activeTab === "supporters" && (
                <SupportersSection supporters={data.supporters} isOwner={isOwnProfile} />
              )}

              {activeTab === "earnings" && isOwnProfile && (
                <EarningsSection earnings={data.earningsHistory} totalSupporters={data.stats.supporters} />
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* About / Links */}
            <div className="bg-card rounded-2xl border border-border/50 p-5">
              <h3 className="font-semibold text-foreground mb-4">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {data.bio}
              </p>
              <div className="space-y-2">
                {data.socialLinks.twitter && (
                  <a href={data.socialLinks.twitter} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
                    <Twitter size={16} className="text-sky-500" />
                    <span>Twitter</span>
                  </a>
                )}
                {data.socialLinks.instagram && (
                  <a href={data.socialLinks.instagram} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
                    <Instagram size={16} className="text-rose-500" />
                    <span>Instagram</span>
                  </a>
                )}
                {data.socialLinks.website && (
                  <a href={data.socialLinks.website} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
                    <Globe size={16} className="text-emerald-500" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Owner Only - Quick Stats */}
            {isOwnProfile && (
              <>
                <div className="bg-card rounded-2xl border border-border/50 p-5">
                  <h3 className="font-semibold text-foreground mb-4">This Month</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Earnings</span>
                      <span className="font-semibold text-foreground">₹{data.stats.monthlySupport.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Supporters</span>
                      <span className="font-semibold text-emerald-500">+12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-semibold text-emerald-500 flex items-center gap-1">
                        <ArrowUpRight size={14} />
                        23%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-2xl border border-border/50 p-5">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left">
                      <Plus size={16} className="text-primary" />
                      <span className="text-sm font-medium">Create Post</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left">
                      <DollarSign size={16} className="text-primary" />
                      <span className="text-sm font-medium">Edit Support Tiers</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left">
                      <BarChart3 size={16} className="text-primary" />
                      <span className="text-sm font-medium">View Analytics</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Social Links - Viewer Mode */}
            {!isOwnProfile && (
              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <h3 className="font-semibold text-foreground mb-4">Connect</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
                    <Twitter size={16} />
                    <span>Follow on Twitter</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
                    <Share2 size={16} />
                    <span>Share Profile</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedContentCard({ content, color }: { content: ContentItem; color: string }) {
  const icons = {
    artwork: ImageIcon,
    update: FileText,
    video: Film,
    design: Sparkles,
  };
  const Icon = icons[content.type];

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <div className="relative h-48 sm:h-56" style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)` }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${color}50 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            Featured
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={48} style={{ color, opacity: 0.5 }} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase">{content.type}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{content.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{content.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart size={14} />
            {content.likes} likes
          </span>
          <button className="flex items-center gap-1 text-primary hover:underline">
            View <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContentCard({ item, color, isOwner }: { item: ContentItem; color: string; isOwner: boolean }) {
  const icons = {
    artwork: ImageIcon,
    update: FileText,
    video: Film,
    design: Sparkles,
  };
  const Icon = icons[item.type];

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5 hover:border-border/80 transition-all group">
      <div className="flex items-start gap-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase">{item.type}</span>
            {isOwner && item.status && (
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-medium",
                item.status === "published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
              )}>
                {item.status}
              </span>
            )}
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
          <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart size={12} />
              {item.likes}
            </span>
            {item.views && (
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {item.views}
              </span>
            )}
          </div>
        </div>
        
        {isOwner && (
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Edit3 size={14} className="text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Trash2 size={14} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SupportersSection({ supporters, isOwner }: { supporters: Supporter[]; isOwner: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSupporters = supporters.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">
          {isOwner ? "Your Supporters" : "Top Supporters"}
        </h3>
        <span className="text-sm text-muted-foreground">{supporters.length} total</span>
      </div>
      
      {isOwner && (
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search supporters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted text-sm border-0 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}
      
      <div className="space-y-3">
        {filteredSupporters.map((supporter) => (
          <div 
            key={supporter.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs font-medium bg-muted-foreground/20">
                {supporter.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{supporter.name}</p>
              <p className="text-xs text-muted-foreground">Supporting since {supporter.since}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground text-sm">₹{supporter.amount}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
            {isOwner && supporter.totalGiven && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-medium text-sm text-foreground">₹{supporter.totalGiven.toLocaleString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredSupporters.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Users size={32} className="mx-auto mb-2 opacity-50" />
          <p>No supporters found</p>
        </div>
      )}
    </div>
  );
}

function EarningsSection({ earnings, totalSupporters }: { earnings: EarningsData[]; totalSupporters: number }) {
  const maxAmount = Math.max(...earnings.map(e => e.amount));
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-emerald-500" />
            <span className="text-sm text-muted-foreground">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +12% from last month
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-sky-500" />
            <span className="text-sm text-muted-foreground">Supporters</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalSupporters}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +8 new this month
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-rose-500" />
            <span className="text-sm text-muted-foreground">Avg. Support</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{Math.round(totalEarnings / totalSupporters)}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +5% from last month
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <h3 className="font-semibold text-foreground mb-6">Earnings History</h3>
        <div className="flex items-end gap-2 h-48">
          {earnings.map((month, index) => (
            <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative">
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
                  style={{ 
                    height: `${(month.amount / maxAmount) * 160}px`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{month.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Card */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold text-foreground">₹12,450</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all">
            Request Payout
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last Payout</p>
            <p className="text-sm font-medium text-foreground">Mar 15, 2024</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
            <p className="text-sm font-medium text-foreground">₹89,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
