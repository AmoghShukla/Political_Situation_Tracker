"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { fetchMe } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";

export function useRequireAuth() {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const query = useQuery({ queryKey: ["me"], queryFn: fetchMe, enabled: Boolean(token) });

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [router, token]);

  return query;
}
