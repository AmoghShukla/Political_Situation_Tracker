import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, FileSearch, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/tracker/animated-number";
import { MaharashtraMap } from "@/components/tracker/maharashtra-map";
import { getBudgetGap, getCompletionAverage, leaders, promises } from "@/lib/tracker-data";
import { formatCrore } from "@/lib/tracker-data";

const budgetGap = getBudgetGap();
const cm = leaders.find((leader) => leader.id === "devendra-fadnavis");

export function HeroSection() {
  return (
    <section className="dashboard-grid border-b">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            Maharashtra Government Tenure: 2024-2029
          </div>
          <div className="mb-5 h-1.5 w-64 overflow-hidden rounded-full">
            <div className="coalition-strip h-full w-full" />
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-normal md:text-6xl">
            Maharashtra NDA Promise & Performance Tracker
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            A non-partisan public accountability ledger tracking manifesto promises, budget implementation, mega projects,
            documentary evidence, district outcomes, and citizen verification.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/promises">
                Explore promises <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/methodology">Read methodology</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric icon={<Users className="h-4 w-4" />} label="NDA seats won" value="230" note="BJP 132, Shiv Sena 57, NCP 41" />
            <Metric icon={<FileSearch className="h-4 w-4" />} label="Promises tracked" value={<AnimatedNumber value={promises.length} />} note="Static JSON ledger" />
            <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Avg completion" value={<AnimatedNumber value={getCompletionAverage()} suffix="%" />} note="Evidence weighted" />
            <Metric icon={<CalendarDays className="h-4 w-4" />} label="Tracked budget" value={`INR ${formatCrore(budgetGap.allocated)} cr`} note={`Spent INR ${formatCrore(budgetGap.spent)} cr`} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="grid gap-3 xl:grid-cols-[0.72fr_1.28fr]">
            <Card className="overflow-hidden">
              <div className="coalition-strip h-1.5" />
              <CardContent className="p-4">
                {cm?.image ? (
                  <div className="relative mx-auto aspect-[4/5] max-h-72 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={cm.image.src}
                      alt={cm.image.alt}
                      fill
                      sizes="(max-width: 1280px) 40vw, 220px"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}
                <div className="mt-3 text-xs text-muted-foreground">Chief Minister</div>
                <div className="text-lg font-semibold">Devendra Fadnavis</div>
                <div className="mt-1 text-xs text-muted-foreground">{cm?.image?.credit}</div>
              </CardContent>
            </Card>
            <MaharashtraMap />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Chief Minister</div>
                <div className="mt-1 font-semibold">Devendra Fadnavis</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Deputy CMs</div>
                <div className="mt-1 font-semibold">Eknath Shinde, Sunetra Pawar</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Swearing-in</div>
                <div className="mt-1 font-semibold">5 Dec 2024</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: React.ReactNode; note: string }) {
  return (
    <Card className="bg-card/86 backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="text-primary">{icon}</span>
          {label}
        </div>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{note}</div>
      </CardContent>
    </Card>
  );
}
