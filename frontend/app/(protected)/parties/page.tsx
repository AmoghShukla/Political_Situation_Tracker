"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PermissionGate } from "@/components/rbac/permission-gate";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { listParties } from "@/features/political/queries";
import { permissions } from "@/lib/permissions";
import type { Party } from "@/types/api";

export default function PartiesPage() {
  const [q, setQ] = useState("");
  const query = useQuery({ queryKey: ["parties", q], queryFn: () => listParties(q) });
  return (
    <>
      <PageHeader title="Political Parties" description="Search by name, ideology, and leader." actions={<PermissionGate code={permissions.managePoliticalData}><Button><Plus className="h-4 w-4" />Add Party</Button></PermissionGate>} />
      <div className="mb-4 max-w-sm"><Input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search parties" /></div>
      <DataTable<Party> isLoading={query.isLoading} rows={query.data?.items ?? []} columns={[
        { key: "name", header: "Party", cell: (row) => <span className="font-medium">{row.name}</span> },
        { key: "abbr", header: "Abbr.", cell: (row) => row.abbreviation, className: "w-24" },
        { key: "ideology", header: "Ideology", cell: (row) => row.ideology ?? "N/A" },
        { key: "leader", header: "Leader", cell: (row) => row.president ?? "N/A" },
        { key: "members", header: "Members", cell: (row) => row.total_members?.toLocaleString() ?? "N/A" }
      ]} />
    </>
  );
}
