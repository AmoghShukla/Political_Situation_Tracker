import { Archive, FileCheck2, Newspaper, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/tracker/section-heading";
import { sources } from "@/lib/tracker-data";

const iconByType: Record<string, React.ReactNode> = {
  official: <FileCheck2 className="h-4 w-4" />,
  research: <ShieldCheck className="h-4 w-4" />,
  manifesto: <Archive className="h-4 w-4" />,
  news: <Newspaper className="h-4 w-4" />,
  audit: <ShieldCheck className="h-4 w-4" />
};

export function EvidenceEngine() {
  return (
    <section id="evidence" className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Evidence engine" title="Citation cards for every promise and project">
          Official records rank highest, campaign claims are stored separately, and media reports are treated as corroborating evidence.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className="border-primary/20 bg-primary/10 text-primary">
                      <span className="mr-1">{iconByType[source.type] ?? <FileCheck2 className="h-4 w-4" />}</span>
                      {source.type}
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground">{source.credibility}</Badge>
                  </div>
                  <CardTitle className="leading-snug">{source.title}</CardTitle>
                  <CardDescription>{source.publisher} - {source.publishedAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{source.summary}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
