"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/page-header";
import { dashboardAnalytics, listElections, listParties, listPoliticians } from "@/features/political/queries";

export default function DashboardPage() {
  const parties = useQuery({ queryKey: ["parties", ""], queryFn: () => listParties("") });
  const politicians = useQuery({ queryKey: ["politicians", ""], queryFn: () => listPoliticians("") });
  const elections = useQuery({ queryKey: ["elections", "recent"], queryFn: () => listElections({ size: 5 }) });
  const analytics = useQuery({ queryKey: ["analytics"], queryFn: dashboardAnalytics });

  const stats = [
    ["Parties", parties.data?.total ?? 0],
    ["Politicians", politicians.data?.total ?? 0],
    ["Elections", elections.data?.total ?? 0],
    ["Tracked Seats", elections.data?.items.reduce((sum, item) => sum + item.total_seats, 0) ?? 0]
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Current political intelligence, election performance, and administrative activity." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => <div key={label} className="rounded-lg border p-4"><div className="text-sm text-muted-foreground">{label}</div><div className="mt-2 text-3xl font-semibold">{value}</div></div>)}
      </div>
      <section className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Seats Won by Year</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.data?.seats_by_party_year ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="seats" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Recent Elections</h2>
          <div className="space-y-3">
            {elections.data?.items.map((election) => <div key={election.id} className="border-b pb-3 last:border-0"><div className="font-medium">{election.election_name}</div><div className="text-sm text-muted-foreground">{election.year} · {election.status}</div></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
