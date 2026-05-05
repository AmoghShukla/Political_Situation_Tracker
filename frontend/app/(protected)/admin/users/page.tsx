import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

const rows = [{ name: "Platform Super Admin", email: "admin@example.com", role: "SUPER_ADMIN", status: "Active" }];

export default function UsersPage() {
  return (
    <>
      <PageHeader title="User Management" description="Manage operators, analysts, moderators, and administrators." actions={<Button>Create User</Button>} />
      <DataTable rows={rows} columns={[
        { key: "name", header: "Name", cell: (row) => row.name },
        { key: "email", header: "Email", cell: (row) => row.email },
        { key: "role", header: "Role", cell: (row) => row.role },
        { key: "status", header: "Status", cell: (row) => row.status }
      ]} />
    </>
  );
}
