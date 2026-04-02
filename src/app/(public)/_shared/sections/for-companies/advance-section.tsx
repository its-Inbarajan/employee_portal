import { Card, CardContent } from "@/components/ui/card";
import {
  ChartNoAxesCombinedIcon,
  ShieldCheck,
  Users,
  Waypoints,
} from "lucide-react";
import React from "react";

interface CardDetails {
  title: string;
  svg: React.ReactElement;
  desc: string;
  id: number;
}

const DATA: CardDetails[] = [
  {
    id: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laborum reiciendis nulla quis, neque est voluptatem incidunt cumque laboriosam fuga accusantium dolorum eveniet ut ducimus impedit quaerat. Suscipit, at possimus.",
    svg: <Users className="size-5" />,
    title: "Team Management",
  },
  {
    id: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laborum reiciendis nulla quis, neque est voluptatem incidunt cumque laboriosam fuga accusantium dolorum eveniet ut ducimus impedit quaerat. Suscipit, at possimus.",
    svg: <ChartNoAxesCombinedIcon className="size-5" />,
    title: "Analytics Dashboard",
  },
  {
    id: 3,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laborum reiciendis nulla quis, neque est voluptatem incidunt cumque laboriosam fuga accusantium dolorum eveniet ut ducimus impedit quaerat. Suscipit, at possimus.",
    svg: <Waypoints className="size-5" />,
    title: "Automated Pipeline",
  },
  {
    id: 4,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laborum reiciendis nulla quis, neque est voluptatem incidunt cumque laboriosam fuga accusantium dolorum eveniet ut ducimus impedit quaerat. Suscipit, at possimus.",
    svg: <ShieldCheck className="size-5" />,
    title: "Verified Pool",
  },
];

export default function AdvanceSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-stretch space-y-6 overflow-hidden px-6 py-6">
      <div className="max-w-full mx-auto lg:max-w-5xl md:max-w-4xl w-full">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="font-bold leading-relaxed tracking-wide lg:text-5xl md:text-3xl text-xl">
            Advanced Capabilities for scale
          </h1>
          <p className="font-normal leading-relaxed tracking-wide text-xs text-muted-foreground">
            Everything you need to manage distributed teams and complex
            technical infra
          </p>
        </div>
      </div>
      <div className="@container/main grid grid-cols-1 md:grid-cols-2 w-full gap-2">
        {DATA.map((item) => (
          <Card
            key={`advance-${item.id}-${item.title}`}
            className="@container/card"
          >
            <CardContent className="gap-6 flex flex-col">
              <div className="inline-block w-fit p-1 float-start rounded bg-purple-500/25 text-purple-500">
                <span className="size-5">{item.svg}</span>
              </div>
              <h1 className="font-bold leading-relaxed tracking-tight lg:text-2xl md:text-xl text-sm">
                {item.title}
              </h1>
              <p className="font-normal text-balance leading-relaxed tracking-wide md:text-sm text-xs text-muted-foreground">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
