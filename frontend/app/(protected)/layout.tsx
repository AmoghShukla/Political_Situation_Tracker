"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useRequireAuth } from "@/hooks/use-require-auth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useRequireAuth();
  if (isLoading) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading secure workspace</div>;
  return <AppShell>{children}</AppShell>;
}
