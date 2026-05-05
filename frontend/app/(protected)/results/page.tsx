import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResultsPage() {
  return (
    <>
      <PageHeader title="Election Results" description="Live-result-ready entry surface for constituency-level vote counts." />
      <form className="grid max-w-3xl gap-3 rounded-lg border p-4 sm:grid-cols-2">
        <Input placeholder="Election ID" />
        <Input placeholder="Constituency ID" />
        <Input placeholder="Politician ID" />
        <Input placeholder="Party ID" />
        <Input placeholder="Votes received" type="number" />
        <Input placeholder="Vote percentage" type="number" />
        <Button className="sm:col-span-2">Record Result</Button>
      </form>
    </>
  );
}
