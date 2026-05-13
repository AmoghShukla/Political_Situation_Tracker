import type { Metadata } from "next";
import { PromiseExplorer } from "@/components/tracker/promise-explorer";

export const metadata: Metadata = {
  title: "Promise Tracker",
  description: "Searchable Maharashtra NDA manifesto promise tracker with status, budgets, departments, timelines, and evidence."
};

export default function PromisesPage() {
  return (
    <main>
      <PromiseExplorer />
    </main>
  );
}
