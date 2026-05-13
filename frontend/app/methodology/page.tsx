import type { Metadata } from "next";
import { MethodologyPanel } from "@/components/tracker/methodology-panel";

export const metadata: Metadata = {
  title: "Transparency and Methodology",
  description: "Evidence hierarchy, fact-checking process, update frequency, bias prevention, and verification standards."
};

export default function MethodologyPage() {
  return (
    <main>
      <MethodologyPanel />
      <section className="px-4 pb-14">
        <div className="prose prose-slate mx-auto max-w-4xl dark:prose-invert">
          <h2>Verification standards</h2>
          <p>
            Claims are not marked completed without documentary evidence. Completion scores combine official orders,
            budget expenditure, project milestones, audit flags, and citizen verification where appropriate.
          </p>
          <h2>Update frequency</h2>
          <p>
            Static JSON can be updated weekly. Budget rows should be reconciled after finance department releases,
            supplementary demands, CAG audits, and department dashboards.
          </p>
          <h2>Bias prevention</h2>
          <p>
            The same rubric is applied to all coalition parties and ministries. Campaign claims are preserved as claims
            until supported by an implementation record.
          </p>
        </div>
      </section>
    </main>
  );
}
