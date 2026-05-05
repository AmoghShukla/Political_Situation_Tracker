"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/api";

function writeTokenCookie(name: string, value?: string) {
  if (typeof document === "undefined") return;
  if (!value) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }
  document.cookie = `${name}=${value}; path=/; max-age=1209600; SameSite=Lax`;
}

type AuthState = {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  setSession: (accessToken: string, refreshToken: string, user?: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
  hasPermission: (code: string) => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      setSession: (accessToken, refreshToken, user) => {
        writeTokenCookie("access_token", accessToken);
        set({ accessToken, refreshToken, user });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        writeTokenCookie("access_token");
        set({ accessToken: undefined, refreshToken: undefined, user: undefined });
      },
      hasPermission: (code) => {
        const role = get().user?.role;
        return role?.name === "SUPER_ADMIN" || Boolean(role?.permissions.some((permission) => permission.code === code));
      }
    }),
    { name: "political-tracker-auth" }
  )
);
