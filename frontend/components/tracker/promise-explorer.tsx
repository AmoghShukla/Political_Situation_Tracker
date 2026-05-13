"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink, Filter, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { SectionHeading } from "@/components/tracker/section-heading";
import { StatusBadge } from "@/components/tracker/status-badge";
import { formatCrore, promises, sourceById, statusOrder } from "@/lib/tracker-data";

const categories = Array.from(new Set(promises.map((promise) => promise.category))).sort();
const ministries = Array.from(new Set(promises.map((promise) => promise.ministry))).sort();

export function PromiseExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [ministry, setMinistry] = useState("All");
  const [open, setOpen] = useState(promises[0]?.id ?? "");

  const filtered = useMemo(() => {
    return promises.filter((promise) => {
      const matchesQuery = [promise.title, promise.originalWording, promise.department, promise.category, promise.risk]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      return (
        matchesQuery &&
        (status === "All" || promise.status === status) &&
        (category === "All" || promise.category === category) &&
        (ministry === "All" || promise.ministry === ministry)
      );
    });
  }, [category, ministry, query, status]);

  const visible = compact ? filtered.slice(0, 5) : filtered;

  return (
    <section id="promises" className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Promise tracker" title="Expandable manifesto ledger with evidence, budgets, and timelines">
          Filter by status, category, ministry, year, district intent, and implementation risk.
        </SectionHeading>
        <Card className="mb-4">
          <CardContent className="grid gap-3 p-4 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <Input placeholder="Search wording, department, source, risk" value={query} onChange={(event) => setQuery(event.target.value)} />
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>All</option>
              {statusOrder.map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>All</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Select value={ministry} onChange={(event) => setMinistry(event.target.value)}>
              <option>All</option>
              {ministries.map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Button variant="outline" className="whitespace-nowrap">
              <SlidersHorizontal className="h-4 w-4" />
              {visible.length} shown
            </Button>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          {visible.map((promise) => {
            const isOpen = open === promise.id;
            const evidence = promise.sources.map((id) => sourceById.get(id)).filter(Boolean);
            return (
              <Card key={promise.id} id={promise.slug} className="scroll-mt-24 overflow-hidden">
                <button className="w-full text-left" onClick={() => setOpen(isOpen ? "" : promise.id)}>
                  <CardHeader className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={promise.status} />
                        <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">{promise.category}</span>
                        <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">{promise.evidenceLevel}</span>
                      </div>
                      <CardTitle className="text-lg">{promise.title}</CardTitle>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{promise.originalWording}</p>
                    </div>
                    <div className="min-w-44">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-semibold">{promise.completion}%</span>
                      </div>
                      <Progress value={promise.completion} className="mt-2" />
                      <ChevronDown className={`ml-auto mt-4 h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </CardHeader>
                </button>
                {isOpen ? (
                  <CardContent className="grid gap-5 border-t pt-5 lg:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Fact label="Department" value={promise.department} />
                        <Fact label="Allocated" value={`INR ${formatCrore(promise.budgetAllocatedCrore)} cr`} />
                        <Fact label="Spent" value={`INR ${formatCrore(promise.budgetSpentCrore)} cr`} />
                        <Fact label="Deadline" value={promise.deadline} />
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold">Timeline</h4>
                        <div className="space-y-3">
                          {promise.timeline.map((item) => (
                            <div key={`${promise.id}-${item.date}`} className="grid grid-cols-[92px_1fr] gap-3 text-sm">
                              <span className="text-muted-foreground">{item.date}</span>
                              <span className="border-l pl-3">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg border bg-muted/40 p-4 text-sm">
                        <div className="font-semibold">Citizen verification</div>
                        <p className="mt-1 text-muted-foreground">
                          {promise.citizenVerification.verifiedReports} verified of {promise.citizenVerification.openReports} public reports.
                          Last field check: {promise.citizenVerification.lastFieldCheck}.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Evidence sources</h4>
                      {evidence.map((source) => source ? (
                        <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="block rounded-lg border p-3 hover:bg-muted">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold">{source.title}</div>
                              <div className="mt-1 text-xs text-muted-foreground">{source.publisher} - {source.credibility}</div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </a>
                      ) : null)}
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-semibold">RTI references</div>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {promise.rtiReferences.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                ) : null}
              </Card>
            );
          })}
        </div>
        {compact ? (
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/promises">
                <Filter className="h-4 w-4" />
                Open full promise tracker
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
