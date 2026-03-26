"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const creatorsDropdown = [
  { label: "Musicians", href: "#" },
  { label: "Podcasters", href: "#" },
  { label: "Artists", href: "#" },
  { label: "Writers", href: "#" },
  { label: "Content Creators", href: "#" },
  { label: "Educators", href: "#" },
];

const developersDropdown = [
  { label: "Frontend Developers", href: "#" },
  { label: "Backend Developers", href: "#" },
  { label: "UI/UX Designers", href: "#" },
  { label: "Database Engineers", href: "#" },
  { label: "Open Source Maintainers", href: "#" },
  { label: "AI / ML Developers", href: "#" },
];

const supportersDropdown = [
  { label: "Support Creators", href: "#" },
  { label: "Fund Open Source", href: "#" },
  { label: "Exclusive Content", href: "#" },
  { label: "Project Updates", href: "#" },
  { label: "Follow Projects", href: "#" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 z-50 h-16 w-full border-b border-black/[0.07] bg-[#EAF5F1]/80 backdrop-blur-[10px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F1A38]">
            <span className="text-base font-bold text-white">P</span>
          </div>
          <span className="text-base font-semibold text-[#0F1A38]">Patronex</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Creators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("creators")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="group flex items-center gap-1 text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]">
              Creators
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  openDropdown === "creators" && "rotate-180"
                )}
              />
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#4DD9C0] transition-all duration-200 group-hover:w-full" />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "creators"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="w-56 rounded-xl border border-black/5 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                {creatorsDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-[#1A2B4A]/80 hover:bg-[#EAF5F1]/60 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Developers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("developers")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="group flex items-center gap-1 text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]">
              Developers
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  openDropdown === "developers" && "rotate-180"
                )}
              />
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#4DD9C0] transition-all duration-200 group-hover:w-full" />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "developers"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="w-56 rounded-xl border border-black/5 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                {developersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-[#1A2B4A]/80 hover:bg-[#EAF5F1]/60 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Supporters Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("supporters")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="group flex items-center gap-1 text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]">
              Supporters
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  openDropdown === "supporters" && "rotate-180"
                )}
              />
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#4DD9C0] transition-all duration-200 group-hover:w-full" />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "supporters"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="w-56 rounded-xl border border-black/5 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                {supportersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-[#1A2B4A]/80 hover:bg-[#EAF5F1]/60 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="#features"
            className="group relative text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]"
          >
            Features
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#4DD9C0] transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link
            href="#about"
            className="group relative text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]"
          >
            About Us
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#4DD9C0] transition-all duration-200 group-hover:w-full" />
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/signin"
            className="text-sm font-medium text-[#1A2B4A] transition-colors hover:text-[#0B1229]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg px-[22px] py-[9px] text-sm font-bold text-[#0B1229] transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
            style={{
              background: "linear-gradient(90deg, #4DD9C0 0%, #7EC8E3 100%)",
              boxShadow: "0 0 16px rgba(77, 217, 192, 0.25)",
            }}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-[#1A2B4A] hover:bg-black/5 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-black/5 bg-[#EAF5F1]/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-creators" ? null : "m-creators")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
            >
              Creators
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-creators" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-creators" && (
              <div className="ml-4 space-y-1">
                {creatorsDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-[#1A2B4A]/70 transition-colors hover:bg-black/5 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-developers" ? null : "m-developers")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
            >
              Developers
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-developers" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-developers" && (
              <div className="ml-4 space-y-1">
                {developersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-[#1A2B4A]/70 transition-colors hover:bg-black/5 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-supporters" ? null : "m-supporters")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
            >
              Supporters
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-supporters" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-supporters" && (
              <div className="ml-4 space-y-1">
                {supportersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-[#1A2B4A]/70 transition-colors hover:bg-black/5 hover:text-[#0B1229]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="#features"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
          >
            About Us
          </Link>
          <div className="flex gap-3 pt-4">
            <Link
              href="/signin"
              className="flex-1 rounded-lg border border-[#1A2B4A]/20 px-4 py-2 text-center text-sm font-medium text-[#1A2B4A] transition-colors hover:bg-black/5"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-bold text-[#0B1229] transition-all hover:scale-[1.02] hover:brightness-110"
              style={{
                background: "linear-gradient(90deg, #4DD9C0 0%, #7EC8E3 100%)",
                boxShadow: "0 0 16px rgba(77, 217, 192, 0.25)",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
