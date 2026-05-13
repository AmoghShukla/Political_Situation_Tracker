import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { statusTone } from "@/lib/tracker-data";
import type { PromiseStatus } from "@/types/tracker";

export function StatusBadge({ status, className }: { status: PromiseStatus; className?: string }) {
  return <Badge className={cn(statusTone[status], className)}>{status}</Badge>;
}
