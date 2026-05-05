"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/page-header";
import { PermissionGate } from "@/components/rbac/permission-gate";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { listPoliticians } from "@/features/political/queries";
import { permissions } from "@/lib/permissions";
import type { Politician } from "@/types/api";

export default function PoliticiansPage() {
  const [q, setQ] = useState("");
  const query = useQuery({ queryKey: ["politicians", q], queryFn: () => listPoliticians(q) });
  return (
    <>
      <PageHeader title="Politicians" description="Compare candidates by party, constituency, position, assets, and cases." actions={<PermissionGate code={permissions.managePoliticalData}><Button><Plus className="h-4 w-4" />Add Politician</Button></PermissionGate>} />
      <div className="mb-4 max-w-sm"><Input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search politicians" /></div>
      <DataTable<Politician> isLoading={query.isLoading} rows={query.data?.items ?? []} columns={[
        { key: "name", header: "Name", cell: (row) => <span className="font-medium">{row.full_name}</span> },
        { key: "party", header: "Party", cell: (row) => row.party?.abbreviation ?? "Independent" },
        { key: "constituency", header: "Constituency", cell: (row) => row.constituency ? `${row.constituency.name}, ${row.constituency.state}` : "N/A" },
        { key: "position", header: "Position", cell: (row) => row.current_position ?? "N/A" },
        { key: "cases", header: "Cases", cell: (row) => row.criminal_cases ?? 0, className: "w-24" }
      ]} />
    </>
  );
}
