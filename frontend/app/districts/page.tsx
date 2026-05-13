import type { Metadata } from "next";
import { DistrictDashboard } from "@/components/tracker/district-dashboard";

export const metadata: Metadata = {
  title: "District Development Dashboard",
  description: "District-level Maharashtra dashboard for projects, roads, hospitals, schools, water projects, investments, unemployment, and budget utilization."
};

export default function DistrictsPage() {
  return (
    <main>
      <DistrictDashboard />
    </main>
  );
}
