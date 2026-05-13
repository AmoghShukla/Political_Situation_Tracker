import budgetJson from "@/data/budgets/budget.json";
import districtsJson from "@/data/districts/districts.json";
import leadersJson from "@/data/leaders/leaders.json";
import projectsJson from "@/data/projects/projects.json";
import promisesJson from "@/data/promises/promises.json";
import sourcesJson from "@/data/sources/sources.json";
import type { BudgetData, District, EvidenceSource, Leader, MegaProject, PromiseStatus, TrackedPromise } from "@/types/tracker";

export const promises = promisesJson as TrackedPromise[];
export const projects = projectsJson as MegaProject[];
export const budget = budgetJson as BudgetData;
export const leaders = leadersJson as Leader[];
export const districts = districtsJson as District[];
export const sources = sourcesJson as EvidenceSource[];

export const sourceById = new Map(sources.map((source) => [source.id, source]));

export const statusOrder: PromiseStatus[] = [
  "Completed",
  "In Progress",
  "Partially Completed",
  "Delayed",
  "Not Started",
  "Abandoned"
];

export const statusTone: Record<PromiseStatus, string> = {
  Completed: "bg-success/12 text-success border-success/30",
  "In Progress": "bg-info/12 text-info border-info/30",
  "Partially Completed": "bg-primary/12 text-primary border-primary/30",
  Delayed: "bg-warning/14 text-warning border-warning/35",
  "Not Started": "bg-muted text-muted-foreground border-border",
  Abandoned: "bg-destructive/12 text-destructive border-destructive/30"
};

export function formatCrore(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(value);
}

export function getCompletionAverage(items = promises) {
  if (!items.length) return 0;
  return Math.round(items.reduce((sum, item) => sum + item.completion, 0) / items.length);
}

export function getStatusCounts(items = promises) {
  return statusOrder.map((status) => ({
    status,
    count: items.filter((item) => item.status === status).length
  }));
}

export function getBudgetGap(items = promises) {
  return items.reduce(
    (acc, item) => {
      acc.allocated += item.budgetAllocatedCrore;
      acc.spent += item.budgetSpentCrore;
      return acc;
    },
    { allocated: 0, spent: 0 }
  );
}

export function searchLedger(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const promiseMatches = promises
    .filter((item) =>
      [item.title, item.category, item.department, item.originalWording, item.status, item.risk]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
    .map((item) => ({
      type: "Promise",
      title: item.title,
      subtitle: `${item.category} - ${item.status}`,
      href: `/promises#${item.slug}`
    }));

  const projectMatches = projects
    .filter((item) =>
      [item.name, item.category, item.district, item.summary, item.status].join(" ").toLowerCase().includes(normalized)
    )
    .map((item) => ({
      type: "Project",
      title: item.name,
      subtitle: `${item.district} - ${item.status}`,
      href: `/projects#${item.id}`
    }));

  const sourceMatches = sources
    .filter((item) => [item.title, item.publisher, item.summary, item.type].join(" ").toLowerCase().includes(normalized))
    .map((item) => ({
      type: "Evidence",
      title: item.title,
      subtitle: `${item.publisher} - ${item.credibility}`,
      href: "/evidence"
    }));

  return [...promiseMatches, ...projectMatches, ...sourceMatches].slice(0, 12);
}
