"use client";

import { Sparkles, Terminal, Code2, Settings, Image, MessageSquare } from "lucide-react";
import * as React from "react";

// Generate 30 random stars with varying sizes and opacities
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: 1 + Math.random() * 1.5, // 1px to 2.5px
  opacity: [0.15, 0.25, 0.4, 0.6][Math.floor(Math.random() * 4)],
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

type FeatureCard = {
  id: string;
  type: "developer" | "creator";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "1",
    type: "developer",
    title: "Terminal-first workflows",
    subtitle: "Code, terminals, projects",
    icon: Terminal,
  },
  {
    id: "2",
    type: "developer",
    title: "Ship open-source faster",
    subtitle: "Code, terminals, projects",
    icon: Code2,
  },
  {
    id: "3",
    type: "developer",
    title: "Fund critical projects",
    subtitle: "Code, terminals, projects",
    icon: Settings,
  },
  {
    id: "4",
    type: "creator",
    title: "Design. Publish. Grow.",
    subtitle: "Art, design, content",
    icon: Image,
  },
  {
    id: "5",
    type: "creator",
    title: "Tell your story",
    subtitle: "Art, design, content",
    icon: MessageSquare,
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0B1229]">
      {/* Subtle radial gradient glow - centered slightly above middle */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(600px circle at 50% 40%, rgba(26, 47, 94, 0.6), transparent 70%)",
        }}
      />

      {/* Static star particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-[120px] text-center">
        {/* Badge / Pill tag */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#4DD9C0]" />
          <span className="text-[13px] font-normal text-white/65">
            Creator + Developer powered funding
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="flex flex-col items-center">
          <span className="block text-[76px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-white">
            FUND THE CODE,
          </span>
          <span
            className="block text-[76px] font-extrabold uppercase leading-[1.05] tracking-[-1px]"
            style={{
              background: "linear-gradient(90deg, #4DD9C0 0%, #7EC8E3 60%, #A8D8F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FUEL THE CREATOR
          </span>
        </h1>

        {/* Subheading / Description */}
        <p className="mt-6 max-w-[560px] text-center text-lg font-normal leading-[1.65] text-white/55">
          A premium platform where supporters fund open-source builders and creators—with
          beautiful discovery, clean UX, and cinematic momentum.
        </p>

        {/* Feature Cards Row - Horizontal Scrollable */}
        <div className="mt-14 w-full">
          <div
            className="flex gap-4 overflow-x-auto px-20 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              const isDeveloper = card.type === "developer";

              return (
                <div
                  key={card.id}
                  className="group flex h-[150px] w-[220px] shrink-0 flex-col justify-between rounded-2xl border border-white/[0.09] bg-[#0D1A2E] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[rgba(77,217,192,0.3)]"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between">
                    {/* Label Pill */}
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      style={{
                        background: isDeveloper ? "rgba(77,217,192,0.12)" : "rgba(167,139,250,0.12)",
                        color: isDeveloper ? "#4DD9C0" : "#A78BFA",
                      }}
                    >
                      <span
                        className="h-[5px] w-[5px] rounded-full"
                        style={{ background: isDeveloper ? "#4DD9C0" : "#A78BFA" }}
                      />
                      {isDeveloper ? "Developers" : "Creators"}
                    </div>

                    {/* Icon Container */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06]">
                      <Icon className="h-4 w-4 text-white/50" />
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-auto">
                    <h3 className="mb-1 text-[15px] font-semibold text-white">{card.title}</h3>
                    <p className="text-xs font-normal text-white/40">{card.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Fade Gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: "linear-gradient(to top, #0B1229, transparent)",
        }}
      />
    </section>
  );
}
