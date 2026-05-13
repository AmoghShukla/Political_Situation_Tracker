import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-muted-foreground md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="coalition-strip mb-3 h-1.5 w-44 rounded-full" />
          <div className="font-semibold text-foreground">Maharashtra NDA Promise & Performance Tracker</div>
          <p className="mt-2 max-w-xl leading-6">
            A neutral civic data ledger for manifesto promises, public spending, project implementation, and documentary evidence.
          </p>
        </div>
        <div className="grid gap-2">
          <Link href="/methodology" className="hover:text-foreground">Methodology</Link>
          <Link href="/evidence" className="hover:text-foreground">Evidence engine</Link>
          <Link href="/participate" className="hover:text-foreground">Submit update</Link>
        </div>
        <div className="leading-6">
          Claims are not marked completed without documentary evidence. Static JSON data is designed for easy audit and export.
        </div>
      </div>
    </footer>
  );
}
