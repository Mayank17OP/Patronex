"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

function isAuthPage(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return path.includes("/signin") || path.includes("/signup");
}

export function AuthRedirectHandler() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | null = null;

    const init = async () => {
      // Wait for Firebase auth to be ready
      await auth.authStateReady();

      // Check for OAuth redirect result (Google/GitHub)
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("[Auth] OAuth success, redirecting to dashboard");
          router.replace("/dashboard");
          return;
        }
      } catch (e) {
        console.error("[Auth] OAuth redirect error:", e);
      }

      // Check if already logged in
      if (auth.currentUser && isAuthPage()) {
        console.log("[Auth] Already logged in, redirecting");
        router.replace("/dashboard");
        return;
      }

      // Listen for auth changes
      unsub = onAuthStateChanged(auth, (user) => {
        if (user && isAuthPage()) {
          console.log("[Auth] User signed in, redirecting to dashboard");
          router.replace("/dashboard");
        }
      });

      setChecking(false);
    };

    init();

    return () => {
      unsub?.();
    };
  }, [router]);

  // Show spinner while checking auth
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
