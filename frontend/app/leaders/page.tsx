import type { Metadata } from "next";
import { LeaderSection } from "@/components/tracker/leader-section";

export const metadata: Metadata = {
  title: "Leader Profiles",
  description: "Chief Minister, Deputy Chief Ministers, cabinet responsibility, portfolio mapping, and performance indicators."
};

export default function LeadersPage() {
  return (
    <main>
      <LeaderSection />
    </main>
  );
}
