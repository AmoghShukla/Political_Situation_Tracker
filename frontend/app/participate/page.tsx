import type { Metadata } from "next";
import { CitizenParticipation } from "@/components/tracker/citizen-participation";

export const metadata: Metadata = {
  title: "Citizen Participation",
  description: "Submit updates, corrections, evidence, misinformation reports, and new tracking suggestions."
};

export default function ParticipatePage() {
  return (
    <main>
      <CitizenParticipation />
    </main>
  );
}
