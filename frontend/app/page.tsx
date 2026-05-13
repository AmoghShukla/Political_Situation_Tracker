import { BudgetDashboard } from "@/components/tracker/budget-dashboard";
import { CitizenParticipation } from "@/components/tracker/citizen-participation";
import { DistrictDashboard } from "@/components/tracker/district-dashboard";
import { EvidenceEngine } from "@/components/tracker/evidence-engine";
import { HeroSection } from "@/components/tracker/hero-section";
import { LeaderSection } from "@/components/tracker/leader-section";
import { MethodologyPanel } from "@/components/tracker/methodology-panel";
import { ProjectTracker } from "@/components/tracker/project-tracker";
import { PromiseExplorer } from "@/components/tracker/promise-explorer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PromiseExplorer compact />
      <ProjectTracker compact />
      <BudgetDashboard />
      <EvidenceEngine />
      <DistrictDashboard />
      <LeaderSection />
      <CitizenParticipation />
      <MethodologyPanel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "Maharashtra NDA Promise and Performance Tracker",
            description: "Static evidence-backed dataset tracking promises, projects, budgets, sources, districts, and leaders.",
            temporalCoverage: "2024/2029",
            spatialCoverage: "Maharashtra, India"
          })
        }}
      />
    </main>
  );
}
