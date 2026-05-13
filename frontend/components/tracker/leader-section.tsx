import { BriefcaseBusiness, Megaphone, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/tracker/section-heading";
import { leaders } from "@/lib/tracker-data";

export function LeaderSection() {
  return (
    <section id="leaders" className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Leader profiles" title="Cabinet responsibility mapped to measurable indicators">
          Profiles focus on portfolios, announcements, and implementation indicators rather than political messaging.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-3">
          {leaders.map((leader) => (
            <Card key={leader.id} className="overflow-hidden">
              <div className={`h-1.5 ${leader.partyColor === "bjp" ? "bg-bjp" : leader.partyColor === "ncp" ? "bg-ncp" : "bg-shivsena"}`} />
              {leader.image ? (
                <div className="relative h-72 border-b bg-muted">
                  <Image
                    src={leader.image.src}
                    alt={leader.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : null}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={`h-2.5 w-2.5 rounded-full ${leader.partyColor === "bjp" ? "bg-bjp" : leader.partyColor === "ncp" ? "bg-ncp" : "bg-shivsena"}`} />
                  {leader.party}
                </div>
                <CardTitle className="text-2xl">{leader.name}</CardTitle>
                <CardDescription>{leader.role} - sworn in {leader.swornIn}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">{leader.profile}</p>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <BriefcaseBusiness className="h-4 w-4 text-primary" />
                    Portfolios
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {leader.portfolio.map((item) => (
                      <span key={item} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  {leader.indicators.map((indicator) => (
                    <div key={indicator.label} className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">{indicator.label}</span>
                      <strong>{indicator.value}</strong>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Megaphone className="h-4 w-4 text-primary" />
                    Major announcements
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {leader.announcements.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Public approval trends can be connected later through audited survey datasets.
                </div>
                {leader.image ? (
                  <div className="rounded-lg border p-3 text-xs text-muted-foreground">
                    Image: {leader.image.credit}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
