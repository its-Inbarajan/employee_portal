"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChartNoAxesCombined, Images } from "lucide-react";
import React from "react";

export default function MarketInsight() {
  return (
    <section className="mx-auto max-w-7xl md:px-12  py-6 px-6 md:py-24 bg-muted-foreground/5 w-full ">
      <div className="flex md:flex-row justify-start md:justify-between h-full items-center flex-col gap-5">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h1 className="font-bold leading-6 tracking-wide text-accent-foreground md:text-2xl text-xl">
            Market Insight
          </h1>
          <p className="font-normal leading-6 tracking-wide text-muted-foreground text-xs">
            Hiring trends projected for 2026
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row items-center">
          <Card className="@container/card w-3xs">
            <CardContent>
              <div className="flex flex-row items-center gap-4">
                <Badge variant={"secondary"} className="rounded size-12">
                  <ChartNoAxesCombined />
                </Badge>

                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-xs md:text-sm text-muted-foreground tracking-wide">
                    AI DESIGN
                  </span>
                  <span className="text-lg md:font-bold text-accent-foreground font-medium">
                    +142%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="@container/card w-3xs">
            <CardContent>
              <div className="flex flex-row items-center gap-4">
                <Badge variant={"secondary"} className="rounded size-12">
                  <Images />
                </Badge>

                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-xs md:text-sm text-muted-foreground tracking-wide">
                    REMOTE INFRA
                  </span>
                  <span className="text-lg md:font-bold text-accent-foreground font-medium">
                    +88%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
