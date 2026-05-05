import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

const rows = [
  { role: "SUPER_ADMIN", permissions: "Full access" },
  { role: "ADMIN", permissions: "Manage political data, users, analytics" },
  { role: "MODERATOR", permissions: "Add and update election data" },
  { role: "ANALYST", permissions: "Read analytics and export" },
  { role: "USER", permissions: "Read-only access" }
];

export default function RolesPage() {
  return (
    <>
      <PageHeader title="Role Management" description="Assign permission bundles used by backend routes, services, and UI gates." actions={<Button>Assign Permissions</Button>} />
      <DataTable rows={rows} columns={[
        { key: "role", header: "Role", cell: (row) => row.role },
        { key: "permissions", header: "Permissions", cell: (row) => row.permissions }
      ]} />
    </>
  );
}
