"use client";

import { BarChart3, Building2, Flag, Handshake, Landmark, LogOut, Map, Moon, Newspaper, Shield, Sun, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { permissions } from "@/lib/permissions";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3, permission: permissions.readPoliticalData },
  { href: "/parties", label: "Parties", icon: Flag, permission: permissions.readPoliticalData },
  { href: "/politicians", label: "Politicians", icon: Users, permission: permissions.readPoliticalData },
  { href: "/elections", label: "Elections", icon: Landmark, permission: permissions.readPoliticalData },
  { href: "/constituencies", label: "Constituencies", icon: Map, permission: permissions.readPoliticalData },
  { href: "/alliances", label: "Alliances", icon: Handshake, permission: permissions.readPoliticalData },
  { href: "/results", label: "Results", icon: Building2, permission: permissions.manageElectionData },
  { href: "/analytics", label: "Analytics", icon: BarChart3, permission: permissions.readAnalytics },
  { href: "/news", label: "News", icon: Newspaper, permission: permissions.readPoliticalData },
  { href: "/admin/users", label: "Users", icon: Shield, permission: permissions.manageUsers }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, hasPermission, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background p-4 md:block">
        <div className="mb-6">
          <div className="text-lg font-semibold">Political Tracker</div>
          <div className="text-xs text-muted-foreground">{user?.role.name ?? "Secure workspace"}</div>
        </div>
        <nav className="space-y-1">
          {nav.filter((item) => hasPermission(item.permission)).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm hover:bg-muted", pathname === item.href && "bg-muted font-medium")}>
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="md:pl-64">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
          <div className="font-medium">{user?.name ?? "Political intelligence"}</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="outline" onClick={() => { logout(); router.replace("/login"); }}><LogOut className="h-4 w-4" />Logout</Button>
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
