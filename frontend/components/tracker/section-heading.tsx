import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  kicker,
  title,
  children
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <Badge className="mb-3 border-primary/20 bg-primary/10 text-primary">{kicker}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-normal md:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{children}</p> : null}
    </div>
  );
}
