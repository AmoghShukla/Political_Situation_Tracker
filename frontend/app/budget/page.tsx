import type { Metadata } from "next";
import { BudgetDashboard } from "@/components/tracker/budget-dashboard";

export const metadata: Metadata = {
  title: "Budget Analytics",
  description: "Maharashtra budget allocation, expenditure, deficit, capex, debt, and district distribution analytics."
};

export default function BudgetPage() {
  return (
    <main>
      <BudgetDashboard />
    </main>
  );
}
