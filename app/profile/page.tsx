"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CreatorProfile } from "@/components/profile/CreatorProfile";
import { DeveloperProfile } from "@/components/profile/DeveloperProfile";

// Sample creator data
const SAMPLE_CREATOR = {
  id: "creator-1",
  name: "Aarav Mehta",
  handle: "aarav.designs",
  initials: "AM",
  avatar: undefined,
  role: "creator" as const,
  bio: "UI/UX designer crafting thoughtful digital experiences. Passionate about accessible design and Indian aesthetics.",
  location: "Mumbai, India",
  tags: ["Designer", "UI/UX", "Motion", "India", "Accessibility"],
  color: "#E87959",
  joinDate: "March 2022",
  stats: {
    supporters: 128,
    monthlySupport: 38472,
    posts: 47,
    followers: 2847,
  },
  supportTiers: [
    { amount: 99, label: "Supporter", benefits: ["Access to exclusive posts", "Monthly wallpaper pack"] },
    { amount: 299, label: "Patron", benefits: ["All Supporter benefits", "Monthly Q&A session", "Source files access"] },
    { amount: 599, label: "Champion", benefits: ["All Patron benefits", "1-on-1 monthly consultation", "Custom design requests"] },
  ],
  socialLinks: {
    twitter: "https://twitter.com/aaravdesigns",
    instagram: "https://instagram.com/aarav.designs",
    website: "https://aaravdesigns.in",
  },
  goal: {
    current: 38472,
    target: 50000,
    label: "Monthly goal",
    description: "Help me go full-time and create more resources for the community",
  },
  featuredContent: {
    id: "featured-1",
    type: "artwork" as const,
    title: "Sacred Geometry Icon Set",
    description: "200+ icons inspired by Indian mandala art, available in multiple formats for your next project.",
    date: "2 days ago",
    likes: 234,
  },
  content: [
    { id: "1", type: "artwork" as const, title: "Sacred Geometry Icon Set", description: "200+ icons inspired by Indian mandala art", date: "2 days ago", likes: 234, views: 1205 },
    { id: "2", type: "update" as const, title: "New Design System Released", description: "Complete UI kit for Indian startups", date: "1 week ago", likes: 567, views: 3400 },
    { id: "3", type: "video" as const, title: "Design Process Behind My Latest Project", description: "A deep dive into my workflow", date: "2 weeks ago", likes: 892, views: 5200 },
  ],
  supporters: [
    { id: "1", name: "Priya Sharma", initials: "PS", amount: 299, since: "3 months", totalGiven: 897 },
    { id: "2", name: "Rohan Verma", initials: "RV", amount: 599, since: "1 month", totalGiven: 599 },
    { id: "3", name: "Kavya Nair", initials: "KN", amount: 99, since: "2 weeks", totalGiven: 198 },
  ],
  earningsHistory: [
    { month: "Jan", amount: 32000, supporters: 110 },
    { month: "Feb", amount: 35000, supporters: 115 },
    { month: "Mar", amount: 38472, supporters: 128 },
  ],
};

// Sample developer data
const SAMPLE_DEVELOPER = {
  id: "dev-1",
  name: "Ananya Sharma",
  handle: "ananya.codes",
  initials: "AS",
  avatar: undefined,
  role: "developer" as const,
  bio: "Full-stack developer building open-source tools for the Indian developer community. Passionate about accessibility and performance.",
  location: "Bangalore, India",
  tags: ["Full Stack", "Open Source", "React", "Node.js", "Accessibility"],
  techStack: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "GraphQL"],
  color: "#0EA5E9",
  joinDate: "January 2021",
  stats: {
    supporters: 89,
    monthlySupport: 24500,
    repos: 34,
    stars: 1250,
  },
  supportTiers: [
    { amount: 199, label: "Backer", benefits: ["Name in README", "Discord access"] },
    { amount: 499, label: "Sponsor", benefits: ["All Backer benefits", "Priority support", "Early access to releases"] },
    { amount: 999, label: "Partner", benefits: ["All Sponsor benefits", "Logo on website", "Monthly consulting call"] },
  ],
  github: {
    username: "ananyasharma",
    connected: true,
    repos: 34,
    followers: 1205,
  },
  featuredProject: {
    id: "featured-1",
    name: "india-stack",
    description: "A collection of India-specific UI components and utilities for React applications.",
    language: "TypeScript",
    stars: 342,
    forks: 56,
    updated: "3 days ago",
    status: "active" as const,
  },
  projects: [
    { id: "1", name: "india-stack", description: "India-specific UI components", language: "TypeScript", stars: 342, forks: 56, updated: "3 days ago", status: "active" as const },
    { id: "2", name: "react-accessibility", description: "Accessibility utilities for React", language: "TypeScript", stars: 567, forks: 89, updated: "1 week ago", status: "active" as const },
    { id: "3", name: "node-auth-kit", description: "Authentication boilerplate for Node.js", language: "JavaScript", stars: 234, forks: 45, updated: "2 weeks ago", status: "maintained" as const },
  ],
  goal: {
    current: 24500,
    target: 35000,
    label: "Monthly goal",
    description: "Help fund full-time open source development",
  },
  activity: [
    { id: "1", type: "commit" as const, message: "Fix: accessibility issue in modal component", repo: "india-stack", date: "2 hours ago" },
    { id: "2", type: "release" as const, version: "v2.1.0", repo: "react-accessibility", date: "1 day ago" },
    { id: "3", type: "pr" as const, title: "Add Hindi language support", repo: "india-stack", date: "3 days ago" },
  ],
  supporters: [
    { id: "1", name: "Vikram Patel", initials: "VP", amount: 499, since: "4 months", totalGiven: 1996 },
    { id: "2", name: "Neha Gupta", initials: "NG", amount: 999, since: "2 months", totalGiven: 1998 },
    { id: "3", name: "Arjun Reddy", initials: "AR", amount: 199, since: "1 month", totalGiven: 199 },
  ],
  earningsHistory: [
    { month: "Jan", amount: 18000, supporters: 65 },
    { month: "Feb", amount: 21000, supporters: 72 },
    { month: "Mar", amount: 24500, supporters: 89 },
  ],
  insights: {
    monthlyGrowth: 23,
    supporterRetention: 94,
    avgSupportAmount: 275,
  },
  payouts: {
    balance: 8750,
    lastPayout: "Mar 20, 2024",
    totalEarned: 67000,
  },
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "creator";
  const isOwnProfile = searchParams.get("own") === "true";

  if (role === "developer") {
    return <DeveloperProfile data={SAMPLE_DEVELOPER} isOwnProfile={isOwnProfile} />;
  }

  return <CreatorProfile data={SAMPLE_CREATOR} isOwnProfile={isOwnProfile} />;
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="h-48 sm:h-64 w-full bg-muted" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
        <div className="h-32 w-32 rounded-full bg-muted mx-auto lg:mx-0" />
        <div className="mt-8 space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-20 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
