"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/page-header";
import { PermissionGate } from "@/components/rbac/permission-gate";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { listElections } from "@/features/political/queries";
import { permissions } from "@/lib/permissions";
import type { Election } from "@/types/api";

export default function ElectionsPage() {
  const query = useQuery({ queryKey: ["elections"], queryFn: () => listElections() });
  return (
    <>
      <PageHeader title="Elections" description="Historical and current election tracker with status, turnout, and winning party." actions={<PermissionGate code={permissions.manageElectionData}><Button><Plus className="h-4 w-4" />Add Election</Button></PermissionGate>} />
      <DataTable<Election> isLoading={query.isLoading} rows={query.data?.items ?? []} columns={[
        { key: "name", header: "Election", cell: (row) => <span className="font-medium">{row.election_name}</span> },
        { key: "type", header: "Type", cell: (row) => row.election_type },
        { key: "year", header: "Year", cell: (row) => row.year, className: "w-24" },
        { key: "seats", header: "Seats", cell: (row) => row.total_seats, className: "w-24" },
        { key: "winner", header: "Winner", cell: (row) => row.winning_party?.abbreviation ?? "TBD" },
        { key: "status", header: "Status", cell: (row) => row.status }
      ]} />
    </>
  );
}
