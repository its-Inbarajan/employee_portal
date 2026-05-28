import { DynamicIcon, type IconName } from "@/components/dynamic-icon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

interface StatsType {
  desc: string;
  count: string;
  content: string;
  icon: IconName | null;
}

interface SectionCardsProps {
  statsData: StatsType[];
}

export default function SectionCards({ statsData }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {statsData.map((item) => (
        <Card key={`${item.desc}`} className="@container/card">
          <CardHeader>
            <CardDescription>{item.desc}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.count}
            </CardTitle>
            <div
              className={`line-clamp-1 ${item.icon === null ? "text-amber-600" : "text-green-600"}  flex gap-2 text-sm items-center font-medium`}
            >
              {item.content}{" "}
              {item.icon && <DynamicIcon name={item.icon} className="size-4" />}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
