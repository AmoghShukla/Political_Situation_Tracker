import type { Metadata } from "next";
import { EvidenceEngine } from "@/components/tracker/evidence-engine";

export const metadata: Metadata = {
  title: "News and Evidence Engine",
  description: "Citation cards for official documents, PIB releases, CAG reports, PRS research, RTI references, and trusted news."
};

export default function EvidencePage() {
  return (
    <main>
      <EvidenceEngine />
    </main>
  );
}
