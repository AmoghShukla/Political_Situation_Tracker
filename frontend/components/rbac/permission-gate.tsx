"use client";

import { useAuthStore } from "@/store/auth-store";

export function PermissionGate({ code, children }: { code: string; children: React.ReactNode }) {
  const allowed = useAuthStore((state) => state.hasPermission(code));
  if (!allowed) return null;
  return <>{children}</>;
}
