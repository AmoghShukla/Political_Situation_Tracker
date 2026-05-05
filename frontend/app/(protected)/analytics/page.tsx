"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/page-header";
import { dashboardAnalytics } from "@/features/political/queries";

export default function AnalyticsPage() {
  const query = useQuery({ queryKey: ["analytics"], queryFn: dashboardAnalytics });
  return (
    <>
      <PageHeader title="Analytics" description="Party performance trends, vote share, seat movement, and comparison readiness." />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Vote Share Analysis</h2>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={query.data?.vote_share ?? []}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="party" /><YAxis /><Tooltip /><Bar dataKey="vote_share" fill="hsl(var(--accent))" /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Seat Trend</h2>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={query.data?.seats_by_party_year ?? []}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Line type="monotone" dataKey="seats" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>
    </>
  );
}
