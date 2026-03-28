"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
interface Props {
  title: string;
  image: string;
  location: string;
  companyName: string;
  id: number;
  salary: string;
}

export default function MarketingJobCard({ item }: { item: Props }) {
  return (
    <Card className="flex pb-0 @container/card backdrop-blur-lg" key={item.id}>
      <CardHeader>
        <div className="flex justify-between w-full items-start shrink-0">
          <Avatar className="ring ring-accent-foreground rounded">
            <AvatarImage
              src={item.image}
              alt="@shadcn"
              className="grayscale object-contain"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Badge
            className="rounded bg-background text-white uppercase tracking-wider font-normal"
            variant={"secondary"}
          >
            {item.location}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start shrink-0">
          <h1 className="font-semibold leading-tight tracking-wide capitalize text-xl">
            {item.title}
          </h1>
          <span className="text-xs text-muted-foreground capitalize font-medium tracking-wide">
            {item.companyName}
          </span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pb-4">
        <div className="flex flex-1 flex-row items-center justify-between">
          <p className="font-normal tracking-wide text-xs ">$140k - $180k</p>

          <ChevronRight className="inline-block float-end size-5" />
        </div>
      </CardFooter>
    </Card>
  );
}
