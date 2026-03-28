"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function AuthRedirectHandler() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const isAuthPage = pathname.includes("/signin") || pathname.includes("/signup");
  
  // Only show the checking spinner if we land on an auth page
  const [checking, setChecking] = useState(isAuthPage);

  useEffect(() => {
    // If not on an auth page, immediately hide spinner and do not run auth redirect checks
    if (!isAuthPage) {
      setChecking(false);
      return;
    }

    setChecking(true);
    let unsub: (() => void) | null = null;
    let cancelled = false;

    const init = async () => {
      // Wait for Firebase auth to be ready
      await auth.authStateReady();
      if (cancelled) return;

      // Check for OAuth redirect result (Google/GitHub)
      try {
        const result = await getRedirectResult(auth);
        if (cancelled) return;
        
        if (result?.user) {
          console.log("[Auth] OAuth success, redirecting to dashboard");
          setChecking(false);
          router.replace("/dashboard");
          return;
        }
      } catch (e) {
        console.error("[Auth] OAuth redirect error:", e);
      }

      // Check if already logged in
      if (auth.currentUser) {
        console.log("[Auth] Already logged in, redirecting");
        setChecking(false);
        router.replace("/dashboard");
        return;
      }

      // Listen for auth changes on login pages
      unsub = onAuthStateChanged(auth, (user) => {
        if (cancelled) return;
        
        if (user) {
          console.log("[Auth] User signed in, redirecting to dashboard");
          setChecking(false);
          router.replace("/dashboard");
        }
      });

      setChecking(false);
    };

    init();

    return () => {
      cancelled = true;
      unsub?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthPage]);

  // Show spinner while checking auth status (only on /signin or /signup)
  if (checking) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060916]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-3 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
