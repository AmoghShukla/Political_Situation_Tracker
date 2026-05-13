"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchLedger } from "@/lib/tracker-data";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchLedger(query), [query]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search promises, projects, evidence"
        className="pl-9"
        aria-label="Global search"
      />
      {query ? (
        <div className="absolute right-0 top-11 z-50 w-full overflow-hidden rounded-lg border bg-card shadow-xl">
          {results.length ? (
            results.map((result) => (
              <Link
                key={`${result.type}-${result.title}`}
                href={result.href}
                className="block border-b px-4 py-3 last:border-b-0 hover:bg-muted"
                onClick={() => setQuery("")}
              >
                <div className="text-xs font-medium uppercase tracking-wide text-primary">{result.type}</div>
                <div className="mt-1 text-sm font-semibold">{result.title}</div>
                <div className="text-xs text-muted-foreground">{result.subtitle}</div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-5 text-sm text-muted-foreground">No indexed result found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
