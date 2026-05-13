import { CheckCircle2, FileText, Scale, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/tracker/section-heading";

const principles = [
  {
    icon: <FileText />,
    title: "Promise sourcing",
    text: "Promises are sourced from manifestos, budget speeches, cabinet announcements, and official programme documents."
  },
  {
    icon: <ShieldCheck />,
    title: "Evidence hierarchy",
    text: "Government records, audits, court orders, tenders, and official dashboards outrank campaign claims and media summaries."
  },
  {
    icon: <CheckCircle2 />,
    title: "Completion standard",
    text: "Claims are not marked completed without documentary evidence and, where applicable, expenditure or field verification."
  },
  {
    icon: <Scale />,
    title: "Bias prevention",
    text: "The same scoring rubric is applied across parties, ministries, districts, and policy categories."
  }
];

export function MethodologyPanel() {
  return (
    <section id="methodology" className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Transparency" title="Methodology designed for scrutiny">
          Every status label should be reproducible from the underlying source documents.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
