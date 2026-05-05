import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";

const rows = [
  { title: "Election commission briefing", source: "Press desk", published: "2026-05-02" },
  { title: "Alliance negotiations update", source: "Political bureau", published: "2026-05-01" }
];

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News" description="Political news stream and source-tracking readiness." />
      <DataTable rows={rows} columns={[
        { key: "title", header: "Title", cell: (row) => row.title },
        { key: "source", header: "Source", cell: (row) => row.source },
        { key: "published", header: "Published", cell: (row) => row.published }
      ]} />
    </>
  );
}
