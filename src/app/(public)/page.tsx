"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import MarketingJobCard from "./_shared/marketing-job-card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import startup from "@/assets/pngs/startup.jpg";
import LandingHero from "./_shared/sections/landing/landing-hero";

const staticJobs: {
  title: string;
  image: string;
  location: string;
  companyName: string;
  id: number;
  salary: string;
}[] = [
  {
    id: 1,
    title: "senior software engg",
    companyName: "google",
    image: "/next.svg",
    salary: "$150K - $180K",
    location: "landon/remote",
  },
  {
    id: 2,
    title: "marketing agents",
    companyName: "amazon",
    image: "/next.svg",
    salary: "$150K - $180K",
    location: "england/remote",
  },
  {
    id: 3,
    title: "genAi developer",
    companyName: "meta",
    image: "/next.svg",
    salary: "$150K - $180K",
    location: "bangalore/remote",
  },
];

export default function LandingPage() {
  return (
    <>
      <LandingHero />

      <section className="md:pb-12 w-full relative overflow-hidden">
        <div className="relative z-20 pt-4 select-none h-dvh ms-auto flex flex-col max-w-6xl mx-auto w-full px-4 gap-8">
          <div className="flex flex-1 justify-between items-center gap-2">
            <div className="flex flex-col gap-2 items-start text-start">
              <span className="font-medium uppercase tracking-wide text-xs text-violet-500">
                for job seekers
              </span>
              <p className="lg:text-4xl md:text-xl text-lg font-bold leading-tight text-balance max-w-sm md:max-w-xl capitalize w-xl tracking-wide text-accent-foreground">
                curated oppertunities for high-impack careers.
              </p>
            </div>
            <div className="block">
              <Button
                variant={"link"}
                size={"lg"}
                className="aspect-square md:aspect-auto ring md:ring-0 tracking-wide "
              >
                <span className="md:block hidden">Browse All Roles</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-center w-full gap-4">
            {staticJobs.map((item) => (
              <MarketingJobCard
                key={`marketing-job-${item.title}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen relative pt-6 overflow-hidden">
        <div className="relative z-20 pt-4 select-none max-w-6xl mx-auto w-full px-4 gap-8">
          <div className="flex md:flex-row flex-col gap-6 md:gap-16 items-stretch">
            <figure className="relative w-full aspect-video md:aspect-auto md:flex-1 md:self-stretch max-w-xl overflow-hidden rounded-xl">
              <Image
                src={startup}
                className="object-cover select-none rounded-md"
                alt="company-image"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
            <div className="flex-1">
              <div className="flex flex-col shrink-0 max-w-xl w-full gap-y-6 md:gap-y-8 items-start">
                <span className="font-medium uppercase tracking-wide text-xs text-violet-500">
                  for hiring team
                </span>
                <h1 className="text-balance font-bold tracking-wide text-accent-foreground capitalize text-xl md:text-5xl w-xs md:w-2xl">
                  scale you organization with architechural precision.
                </h1>

                <p className="font-normal leading-normal w-full md:text-balance text-xs text-muted-foreground tracking-wide">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  hic perspiciatis consequuntur veniam, rem omnis eos sint quod,
                  tenetur dolorem repudiandae deserunt earum vero atque
                  laudantium quas voluptates possimus eligendi.
                </p>

                <ul className="flex flex-col items-center space-y-3 shrink-0">
                  <li className="flex items-start w-full gap-2">
                    <CheckCircle className="size-5 text-purple-500" />
                    <div className="inline-flex gap-1.5 flex-col items-start">
                      <p className="font-semibold text-sm text-accent-foreground leading-5 tracking-wide">
                        Curated talent pools
                      </p>
                      <span className="font-normal text-xs text-muted-foreground leading-tight tracking-wide">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nam libero est similique minus architecto maiores
                        culpa.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start w-full gap-2">
                    <CheckCircle className="size-5 text-purple-500" />
                    <div className="inline-flex gap-1.5 flex-col items-start">
                      <p className="font-semibold text-sm text-accent-foreground leading-5 tracking-wide">
                        Automated piple line integrity
                      </p>
                      <span className="font-normal text-xs text-muted-foreground leading-tight tracking-wide">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nam libero est similique minus architecto maiores
                        culpa.
                      </span>
                    </div>
                  </li>
                </ul>

                <Button
                  className="bg-purple-500 hover:bg-purple-500/80 transition-all duration-300 ease-linear"
                  variant={"default"}
                  size={"lg"}
                >
                  Start hiring
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl flex items-center justify-center w-full md:px-20 md:py-20 px-6 py-6">
          <div className="flex items-center gap-5 flex-col justify-center">
            <div className="flex flex-col gap-y-6 items-center shrink">
              <h1 className="font-bold leading-6 tracking-wide md:text-5xl text-2xl">
                Read to edit your
              </h1>
              <h1 className="font-bold leading-6 tracking-wide md:text-5xl text-2xl text-purple-500">
                professional Story?
              </h1>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed tracking-tight max-w-sm w-full text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
              ab necessitatibus consectetur perferendis vel quae architecto
              itaque amet officia maiores ratione corrupti nemo, eaque eveniet
              neque eius recusandae corporis cumque!
            </p>
            <div className="flex md:flex-row gap-4 flex-col flex-1 items-center">
              <Button
                variant={"secondary"}
                size={"sm"}
                className="bg-purple-500 hover:bg-purple-500/70"
              >
                Get Started
              </Button>
              <Button variant={"outline"} size={"sm"}>
                Post a position
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
