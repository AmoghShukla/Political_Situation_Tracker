"use client";

import { Activity, MapPin, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/tracker/section-heading";
import { StatusBadge } from "@/components/tracker/status-badge";
import { formatCrore, projects, sourceById } from "@/lib/tracker-data";

export function ProjectTracker({ compact = false }: { compact?: boolean }) {
  const visible = compact ? projects.slice(0, 4) : projects;

  return (
    <section id="projects" className="bg-card px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Major project tracker" title="Mega projects: estimates, delays, milestones, and announcement gaps">
          Compare political announcements against verified work, revised deadlines, and cost escalation.
        </SectionHeading>
        <div className="mb-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Cost escalation by project</CardTitle>
              <CardDescription>Original estimate vs current estimate, INR crore</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={84} />
                  <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => `INR ${formatCrore(Number(value))} cr`} />
                  <Bar dataKey="originalEstimateCrore" name="Original" fill="#64748b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="currentEstimateCrore" name="Current" fill="#0f766e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Implementation signal</CardTitle>
              <CardDescription>Announcements compared with verified milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">{project.verifiedMilestones}/{project.politicalAnnouncements}</span>
                  </div>
                  <Progress value={(project.verifiedMilestones / project.politicalAnnouncements) * 100} className="mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <Card key={project.id} id={project.id} className="scroll-mt-24">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <StatusBadge status={project.status} />
                  <span className="text-xs text-muted-foreground">{project.category}</span>
                </div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-semibold">{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} />
                </div>
                <div className="grid gap-2 text-sm">
                  <Line icon={<TrendingUp className="h-4 w-4" />} label="Escalation" value={`${project.costEscalationPercent}%`} />
                  <Line icon={<Activity className="h-4 w-4" />} label="Delay" value={`${project.delayMonths} months`} />
                  <Line icon={<MapPin className="h-4 w-4" />} label="District" value={project.district} />
                </div>
                <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
                  Sources: {project.sources.map((id) => sourceById.get(id)?.publisher ?? id).join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Line({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2">
      <span className="flex items-center gap-2 text-muted-foreground">{icon}{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
