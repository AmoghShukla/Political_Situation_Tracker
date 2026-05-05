import { cn } from "@/lib/utils";

export type Column<T> = { key: string; header: string; cell: (row: T) => React.ReactNode; className?: string };

export function DataTable<T>({ columns, rows, isLoading }: { columns: Column<T>[]; rows: T[]; isLoading?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-muted text-left text-muted-foreground">
          <tr>{columns.map((column) => <th key={column.key} className={cn("px-4 py-3 font-medium", column.className)}>{column.header}</th>)}</tr>
        </thead>
        <tbody>
          {isLoading && <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>Loading data</td></tr>}
          {!isLoading && rows.length === 0 && <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>No records found</td></tr>}
          {!isLoading && rows.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((column) => <td key={column.key} className={cn("truncate px-4 py-3", column.className)}>{column.cell(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
