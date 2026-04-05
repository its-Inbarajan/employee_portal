"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Openings {
  id: number;
  title: string;
  isVerified: boolean;
  profile: string;
  companyName: string;
  location: string;
  package: string;
  days: string;
}

const OPENINGS: Openings[] = [
  {
    id: 1,
    companyName: "Liner system",
    days: "2 days ago",
    isVerified: true,
    location: "remote",
    package: "$180k - $240k",
    profile: "/next.svg",
    title: "Senior Design Lead",
  },
  {
    id: 2,
    companyName: "Quantum flow",
    days: "1 week ago",
    isVerified: true,
    location: "Berlin/Hybird",
    package: "$190k - $260k",
    profile: "/next.svg",
    title: "Staff Engineer",
  },
  {
    id: 3,
    companyName: "Editorial AI",
    days: "3 hours ago",
    isVerified: true,
    location: "New york",
    package: "$220k - $340k",
    profile: "/next.svg",
    title: "Director of Product",
  },
];

export default function Openings() {
  return (
    <section className="relative overflow-hidden flex flex-col min-h-screen items-center justify-center gap-5 md:gap-8 md:py-24 md:px-12 py-12 px-6">
      <div className="flex gap-3 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl leading-5 tracking-wide">
            Curated Roles
          </h1>
          <p className="text-muted-foreground font-normal leading-6 tracking-wide text-xs">
            Exclusive opportunities for elite professionals.
          </p>
        </div>
        <Button
          variant={"link"}
          size={"lg"}
          asChild
          aria-label="View all Openings"
          className="text-sm text-purple-400 aspect-square md:aspect-auto ring md:ring-0 tracking-wide  underline"
        >
          <Link href={"/auth/sign-up"} prefetch>
            <span className="hidden md:inline">View All Openings</span>
            <ArrowUpRight size={5} />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 w-full md:gap-2 gap-4 lg:gap-7 items-center md:grid-cols-3">
        {OPENINGS.map((item) => (
          <Card
            key={`opening-${item.id}`}
            className="@container/card hover:shadow hover:shadow-accent"
          >
            <Link href={"/auth/sign-up"} prefetch>
              <CardContent>
                <div className="flex flex-col  gap-y-6 w-full items-stretch">
                  <div className="flex flex-row flex-1 w-full justify-between items-center gap-2">
                    <Avatar className="rounded-md ring">
                      <AvatarImage
                        className="rounded-md dark:brightness-75 dark:contrast-125 dark:invert border-black select-none"
                        src={item.profile}
                        alt={`company-profile-${item.companyName}`}
                      />
                      <AvatarFallback className="text-white">
                        {item.companyName?.split("")?.[0]?.[1]}
                      </AvatarFallback>
                    </Avatar>
                    {item.isVerified && (
                      <Badge
                        variant={"secondary"}
                        className="text-muted-foreground text-xs"
                      >
                        <BadgeCheck size={3} /> {item.isVerified && "VERIFIED"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold md:text-md text-sm lg:text-xl leading-6 tracking-wide text-accent-foreground">
                      {item.title}
                    </p>
                    <span className="flex text-nowrap items-center text-xs lg:text-sm font-normal text-muted-foreground">
                      {item.companyName} - {item.location}
                    </span>
                  </div>
                  <div className="flex flex-row md:flex-col lg:flex-row flex-1 lg:justify-between md:justify-start items-center justify-between md:items-start lg:items-center">
                    <span className="font-medium leading-6 tracking-wide text-sm text-accent-foreground">
                      {item.package}
                    </span>
                    <span className="font-medium leading-6 tracking-wide text-xs text-muted-foreground">
                      {item.days}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
