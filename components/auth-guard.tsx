"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    console.log("[AuthGuard] Initializing...");

    auth.authStateReady().then(() => {
      if (cancelled) return;
      console.log("[AuthGuard] Auth state ready, currentUser:", auth.currentUser?.email || "null");

      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (cancelled) return;
        if (user) {
          console.log("[AuthGuard] User authenticated:", user.email);
          setAllowed(true);
        } else {
          console.log("[AuthGuard] No user, redirecting to signin");
          setAllowed(false);
          router.replace("/signin");
        }
      });
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground tracking-wide">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
