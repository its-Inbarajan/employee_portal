"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import NaukriStyleJobCard from "../../components/naukri-style-job-card";

export default function Saved() {
  return (
    <div className="flex flex-col max-w-3xl w-full justify-start space-y-3">
      <h1 className="font-semibold text-xl leading-6 tracking-tight text-accent-foreground">Jobs saved by you</h1>
      <Card>
        <CardContent className="flex flex-row items-baseline gap-2 flex-1">
          <span className="font-semibold text-5xl text-accent-foreground">01</span>
          <span className="font-medium text-xs text-gray-500">Saved Job(s)</span>
        </CardContent>
      </Card>

      <div>
        <NaukriStyleJobCard />
      </div>
    </div>
  )
}
