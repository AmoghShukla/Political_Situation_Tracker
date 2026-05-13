import type { Metadata } from "next";
import { ProjectTracker } from "@/components/tracker/project-tracker";

export const metadata: Metadata = {
  title: "Major Project Tracker",
  description: "Mega project tracker for cost escalation, delay, contractor, milestone, and evidence review."
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectTracker />
    </main>
  );
}
