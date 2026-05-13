"use client";

import { useMemo, useState } from "react";
import { Building2, Droplets, GraduationCap, MapPinned, Route, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MaharashtraMap } from "@/components/tracker/maharashtra-map";
import { SectionHeading } from "@/components/tracker/section-heading";
import { districts, formatCrore } from "@/lib/tracker-data";

export function DistrictDashboard() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => districts.filter((district) => [district.name, district.region, district.risk].join(" ").toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <section id="districts" className="bg-card px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="District dashboard" title="Local development signals and budget utilization">
          Track projects, roads, hospitals, schools, water work, investment, unemployment, and utilization.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <MaharashtraMap />
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter districts or regions" className="pl-9" />
            </div>
          </div>
          <div className="grid max-h-[760px] gap-3 overflow-auto pr-1 md:grid-cols-2">
            {filtered.map((district) => (
              <Card key={district.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>{district.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{district.region}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <Mini icon={<MapPinned />} label="Projects" value={district.projects} />
                    <Mini icon={<Route />} label="Roads km" value={district.roadsKm} />
                    <Mini icon={<Building2 />} label="Hospitals" value={district.hospitals} />
                    <Mini icon={<GraduationCap />} label="Schools" value={district.schools} />
                    <Mini icon={<Droplets />} label="Water" value={district.waterProjects} />
                    <Mini icon={<Building2 />} label="Investment" value={`INR ${formatCrore(district.investmentsCrore)} cr`} />
                  </div>
                  <div className="rounded-lg border bg-muted/40 p-3">
                    <div className="flex justify-between">
                      <span>Budget utilization</span>
                      <strong>{district.budgetUtilization}%</strong>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${district.budgetUtilization}%` }} />
                    </div>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">Risk: {district.risk}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-background p-2">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        {label}
      </div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
