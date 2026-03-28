"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Github, 
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Code2,
  Activity,
  TrendingUp,
  Users,
  Terminal,
  Wallet,
  CheckCircle2,
  GitCommit,
  GitPullRequest,
  Tag,
  Settings,
  Share2,
  Plus,
  BarChart3,
  Calendar,
  Edit3,
  Trash2,
  Eye,
  DollarSign,
  ArrowUpRight,
  Search,
  Filter,
  Briefcase,
  Layers,
  Target
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ============================================
// DATA INTERFACES
// ============================================
interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  status: "active" | "maintained" | "archived";
  views?: number;
}

interface ActivityItem {
  id: string;
  type: "commit" | "release" | "pr";
  message?: string;
  version?: string;
  title?: string;
  repo: string;
  date: string;
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

interface DeveloperData {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatar?: string;
  role: "developer";
  bio: string;
  location: string;
  tags: string[];
  techStack: string[];
  color: string;
  joinDate: string;
  stats: {
    supporters: number;
    monthlySupport: number;
    repos: number;
    stars: number;
  };
  supportTiers: {
    amount: number;
    label: string;
    benefits: string[];
  }[];
  github: {
    username: string;
    connected: boolean;
    repos: number;
    followers: number;
  };
  featuredProject: Project;
  projects: Project[];
  goal: {
    current: number;
    target: number;
    label: string;
    description: string;
  };
  activity: ActivityItem[];
  supporters: Supporter[];
  earningsHistory: EarningsData[];
  insights: {
    monthlyGrowth: number;
    supporterRetention: number;
    avgSupportAmount: number;
  };
  payouts: {
    balance: number;
    lastPayout: string;
    totalEarned: number;
  };
}

interface DeveloperProfileProps {
  data: DeveloperData;
  isOwnProfile?: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================
export function DeveloperProfile({ data, isOwnProfile = false }: DeveloperProfileProps) {
  const [activeTab, setActiveTab] = useState("projects");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Code-like Background */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
        {/* Animated code pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, ${data.color}10 1px, transparent 1px),
              linear-gradient(${data.color}10 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${data.color}40 0%, transparent 60%), linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.9) 100%)`,
          }}
        />

        {/* Floating code elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Terminal size={120} className="text-white" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              {/* Avatar */}
              <div className="relative -mt-20 mb-4 flex justify-center lg:justify-start">
                <div className="relative">
                  <div 
                    className="absolute -inset-2 rounded-full blur-xl opacity-40"
                    style={{ background: data.color }}
                  />
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={data.avatar} alt={data.name} />
                    <AvatarFallback 
                      className="text-2xl font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}90)` }}
                    >
                      {data.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center border-2 border-background shadow-md">
                    <Code2 size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Name & Handle */}
              <div className="text-center lg:text-left">
                <h1 className="text-2xl font-bold text-foreground">{data.name}</h1>
                <p className="text-muted-foreground">@{data.handle}</p>
              </div>

              {/* Bio */}
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed text-center lg:text-left">
                {data.bio}
              </p>

              {/* Location */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{data.location}</span>
              </div>

              {/* Tech Stack */}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{data.stats.repos}</p>
                  <p className="text-xs text-muted-foreground">Repositories</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{data.stats.stars}</p>
                  <p className="text-xs text-muted-foreground">GitHub Stars</p>
                </div>
              </div>

              {/* Owner Only - Quick Stats */}
              {isOwnProfile && (
                <div className="bg-card rounded-2xl border border-border/50 p-5">
                  <h3 className="font-semibold text-foreground mb-4">This Month</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Sponsorships</span>
                      <span className="font-semibold text-foreground">₹{data.stats.monthlySupport.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Sponsors</span>
                      <span className="font-semibold text-emerald-500">+5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-semibold text-emerald-500 flex items-center gap-1">
                        <ArrowUpRight size={14} />
                        {data.insights.monthlyGrowth}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                {isOwnProfile ? (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors">
                    <Settings size={16} />
                    Settings
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={cn(
                        "flex-1 px-4 py-2.5 rounded-xl font-medium transition-all",
                        isFollowing 
                          ? "bg-muted text-foreground" 
                          : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                      )}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors">
                      <Share2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* GitHub Connection */}
            <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GitHub</h3>
                  <p className="text-xs text-muted-foreground">@{data.github.username}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-emerald-600 mb-4">
                <CheckCircle2 size={12} />
                <span>Connected and syncing</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">{data.github.repos}</p>
                  <p className="text-xs text-muted-foreground">Repos</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">{data.github.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </div>

            {/* Goal Card */}
            <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} style={{ color: data.color }} />
                <h3 className="font-semibold text-foreground">{data.goal.label}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{data.goal.description}</p>
              
              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(data.goal.current / data.goal.target) * 100}%`,
                    background: `linear-gradient(90deg, ${data.color}, ${data.color}80)`
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">₹{data.goal.current.toLocaleString()}</span>
                <span className="text-muted-foreground">of ₹{data.goal.target.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Support Section */}
            <div className="bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-900/50 dark:to-sky-950/20 rounded-2xl border border-slate-200/50 dark:border-slate-700/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Heart size={20} className="text-sky-500 fill-sky-500" />
                    Sponsor {data.name.split(" ")[0]}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Support open source development
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">₹{data.stats.monthlySupport.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">monthly sponsors</p>
                </div>
              </div>

              {/* Support Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.supportTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    className="group relative p-4 rounded-xl bg-background/80 border border-border/50 hover:border-sky-300 dark:hover:border-sky-700 transition-all hover:shadow-lg text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={16} className="text-amber-500" />
                      <span className="font-semibold text-foreground">{tier.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">₹{tier.amount}</p>
                    <p className="text-xs text-muted-foreground mb-3">per month</p>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <CheckCircle2 size={10} className="text-sky-500 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-sky-500/10 transition-all pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
              {[
                { id: "projects", label: "Projects", icon: Briefcase, count: data.stats.repos },
                { id: "activity", label: "Activity", icon: Activity },
                ...(isOwnProfile ? [
                  { id: "supporters", label: "Sponsors", icon: Users, count: data.stats.supporters },
                  { id: "earnings", label: "Earnings", icon: BarChart3 },
                ] : []),
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
              {activeTab === "projects" && (
                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} color={data.color} />
                  ))}
                </div>
              )}

              {activeTab === "activity" && (
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {data.activity.map((item, index) => (
                      <ActivityItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "insights" && isOwnProfile && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InsightCard 
                      title="Monthly Growth" 
                      value={`+${data.insights.monthlyGrowth}%`}
                      icon={TrendingUp}
                      color="text-emerald-500"
                    />
                    <InsightCard 
                      title="Retention" 
                      value={`${data.insights.supporterRetention}%`}
                      icon={Users}
                      color="text-sky-500"
                    />
                    <InsightCard 
                      title="Avg. Support" 
                      value={`₹${data.insights.avgSupportAmount}`}
                      icon={Heart}
                      color="text-rose-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === "payouts" && isOwnProfile && (
                <div className="space-y-4">
                  <div className="bg-card rounded-2xl border border-border/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-3xl font-bold text-foreground">₹{data.payouts.balance.toLocaleString()}</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all">
                        Request Payout
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Last Payout</p>
                        <p className="text-sm font-medium text-foreground">{data.payouts.lastPayout}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
                        <p className="text-sm font-medium text-foreground">₹{data.payouts.totalEarned.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, color }: { project: DeveloperData["projects"][0]; color: string }) {
  const statusColors = {
    active: "bg-emerald-500",
    maintained: "bg-sky-500",
    archived: "bg-muted-foreground",
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5 hover:border-border/80 transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </h4>
            <div className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", statusColors[project.status])} />
              <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ background: color }}
              />
              {project.language}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} />
              {project.forks}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {project.updated}
            </span>
          </div>
        </div>
        
        <button className="p-2 rounded-lg hover:bg-muted transition-colors ml-4">
          <ExternalLink size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

function ActivityItem({ item }: { item: DeveloperData["activity"][0] }) {
  const icons = {
    commit: GitCommit,
    release: Tag,
    pr: GitPullRequest,
  };
  const Icon = icons[item.type];
  const colors = {
    commit: "text-emerald-500 bg-emerald-500/10",
    release: "text-violet-500 bg-violet-500/10",
    pr: "text-sky-500 bg-sky-500/10",
  };

  return (
    <div className="flex items-start gap-3">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colors[item.type])}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium">
          {item.type === "commit" && item.message}
          {item.type === "release" && `Released ${item.version}`}
          {item.type === "pr" && item.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.repo} · {item.date}
        </p>
      </div>
    </div>
  );
}

function InsightCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className={color} />
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function SupportersSection({ supporters }: { supporters: Supporter[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSupporters = supporters.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Your Sponsors</h3>
        <span className="text-sm text-muted-foreground">{supporters.length} total</span>
      </div>
      
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text"
          placeholder="Search sponsors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted text-sm border-0 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      
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
            {supporter.totalGiven && (
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
          <p>No sponsors found</p>
        </div>
      )}
    </div>
  );
}

function EarningsSection({ earnings, totalSupporters, payouts }: { earnings: EarningsData[]; totalSupporters: number; payouts: { balance: number; lastPayout: string; totalEarned: number } }) {
  const maxAmount = Math.max(...earnings.map(e => e.amount));
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-emerald-500" />
            <span className="text-sm text-muted-foreground">Total Sponsorships</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +23% from last month
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-sky-500" />
            <span className="text-sm text-muted-foreground">Sponsors</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalSupporters}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +5 new this month
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-violet-500" />
            <span className="text-sm text-muted-foreground">Avg. Sponsorship</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{Math.round(totalEarnings / totalSupporters)}</p>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} />
            +8% from last month
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <h3 className="font-semibold text-foreground mb-6">Sponsorship History</h3>
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
            <p className="text-3xl font-bold text-foreground">₹{payouts.balance.toLocaleString()}</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all">
            Request Payout
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last Payout</p>
            <p className="text-sm font-medium text-foreground">{payouts.lastPayout}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Received</p>
            <p className="text-sm font-medium text-foreground">₹{payouts.totalEarned.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
