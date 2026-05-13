"use client";

import Link from "next/link";
import { Landmark, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/tracker/global-search";
import { ThemeToggle } from "@/components/tracker/theme-toggle";

const nav = [
  { href: "/promises", label: "Promises" },
  { href: "/projects", label: "Projects" },
  { href: "/budget", label: "Budget" },
  { href: "/evidence", label: "Evidence" },
  { href: "/districts", label: "Districts" },
  { href: "/methodology", label: "Methodology" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground">
            <span className="coalition-strip absolute inset-x-0 bottom-0 h-1" />
            <Landmark className="h-5 w-5" />
          </span>
          <span className="hidden leading-tight md:block">
            Maharashtra NDA
            <span className="block text-xs font-normal text-muted-foreground">Promise & Performance Tracker</span>
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden flex-1 justify-end md:flex">
          <GlobalSearch />
        </div>
        <ThemeToggle />
        <Button variant="outline" className="h-9 w-9 px-0 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      {open ? (
        <div className="border-t px-4 pb-4 lg:hidden">
          <div className="py-3">
            <GlobalSearch />
          </div>
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
