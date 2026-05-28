import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import Link from "next/link";
import React from "react";

interface InterviewsType {
  candidateName: string;
  type: string;
  min: string;
  plotform: string;
  timing: {
    time: string;
    movement: "AM" | "PM" | string;
  };
}

interface TodaysInterviewListingProps {
  interviews: InterviewsType[];
}

export default function TodaysInterviewListing({
  interviews,
}: TodaysInterviewListingProps) {
  return (
    <Card>
      <CardHeader className="border-b h-10 [.border-b]:pb-0">
        <CardTitle>Today&apos;s Interviews</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        {interviews &&
          interviews.map((item) => (
            <Item key={item.candidateName} variant="default" asChild>
              <Link href={"#"}>
                <ItemMedia variant="default">
                  <div className="flex flex-col gap-0 items-center">
                    <span className="font-bold mb-0 text-xl text-blue-500">
                      {item.timing.time}
                    </span>
                    <span className="font-normal text-[9px] text-muted-foreground">
                      {item.timing.movement}
                    </span>
                  </div>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.candidateName}</ItemTitle>
                  <ItemDescription className="text-xs text-nowrap flex gap-1 flex-1">
                    <span>{item.type}</span>·{" "}
                    <span>{item.min.concat(" Min")}</span>·
                    <span>{item.plotform}</span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </ItemActions>
              </Link>
            </Item>
          ))}
      </CardContent>
    </Card>
  );
}
