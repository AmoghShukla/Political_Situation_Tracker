"use client";

import { Upload, AlertTriangle, CheckCircle2, Send, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/tracker/section-heading";

export function CitizenParticipation() {
  return (
    <section id="participate" className="bg-card px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Citizen participation" title="Submit updates, corrections, evidence, and misinformation reports">
          The UI includes a moderation workflow that can later be connected to a database, queue, and reviewer roles.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Submit evidence or correction</CardTitle>
              <CardDescription>All submissions enter a moderation queue before public display.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Name or organization" />
                <Input placeholder="Email for verification" type="email" />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Select defaultValue="Submit update">
                  <option>Submit update</option>
                  <option>Submit correction</option>
                  <option>Upload evidence</option>
                  <option>Report misinformation</option>
                  <option>Suggest tracking item</option>
                </Select>
                <Input placeholder="Promise or project ID" />
                <Input placeholder="District" />
              </div>
              <Textarea placeholder="Describe the claim, update, correction, or field observation. Include dates and document references where possible." />
              <Input placeholder="Evidence URL, GR link, tender link, RTI file reference, or archive URL" />
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => toast.success("Demo submission captured in UI. Connect a backend route to persist it.")}>
                  <Send className="h-4 w-4" />
                  Submit for review
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4" />
                  Attach file
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              { icon: <ShieldAlert />, title: "Triage", text: "Duplicate checks, source quality scoring, and legal risk screening." },
              { icon: <AlertTriangle />, title: "Reviewer queue", text: "Flagged items are assigned to a moderator with category and district context." },
              { icon: <CheckCircle2 />, title: "Publication", text: "Approved evidence links to the affected promise, project, and district dashboard." }
            ].map((step, index) => (
              <Card key={step.title}>
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">Step {index + 1}</div>
                    <div className="font-semibold">{step.title}</div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
