"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/tracker/section-heading";
import { budget, formatCrore } from "@/lib/tracker-data";

const colors = ["#0f766e", "#2563eb", "#d97706", "#059669", "#7c3aed", "#dc2626", "#0891b2", "#4b5563"];

export function BudgetDashboard() {
  const pieData = budget.departments.map((department) => ({
    name: department.name,
    value: department.allocation
  }));

  return (
    <section id="budget" className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Budget analytics" title="Allocation, spending, deficits, and implementation gaps">
          Department-wise budget lines are tied back to promise categories wherever possible.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Department allocation vs expenditure</CardTitle>
              <CardDescription>INR crore, fiscal year {budget.fiscalYear}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budget.departments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={70} />
                  <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => `INR ${formatCrore(Number(value))} cr`} />
                  <Legend />
                  <Bar dataKey="allocation" name="Allocation" fill="#0f766e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" name="Spent" fill="#d97706" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Allocation share</CardTitle>
              <CardDescription>Major tracked departments</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={54} outerRadius={92} paddingAngle={2}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `INR ${formatCrore(Number(value))} cr`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Debt, fiscal deficit, and capital expenditure</CardTitle>
              <CardDescription>Trend lines for macro fiscal context</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={budget.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => `INR ${formatCrore(Number(value))} cr`} />
                  <Legend />
                  <Line type="monotone" dataKey="debt" stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="fiscalDeficit" stroke="#dc2626" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="capex" stroke="#059669" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>District heat map</CardTitle>
              <CardDescription>Utilization intensity</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {budget.districtDistribution.map((row) => (
                <div key={row.district} className="grid grid-cols-[88px_1fr_42px] items-center gap-2 text-sm">
                  <span>{row.district}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full bg-primary" style={{ width: `${row.utilization}%` }} />
                  </span>
                  <span className="text-right text-xs text-muted-foreground">{row.utilization}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
