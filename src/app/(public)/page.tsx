"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import React from "react";
import dynamic from "next/dynamic";
import AvatarGroupComponent from "@/components/avatar-group";

import MarketingJobCard from "./_shared/marketing-job-card";
import { ArrowRight, CheckCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import startup from "@/assets/pngs/startup.jpg";
const HelixCube = dynamic(() => import("@/components/HelixCube"), {
  ssr: false,
});

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
    image: "/vercel.svg",
    salary: "$150K - $180K",
    location: "landon/remote",
  },
  {
    id: 2,
    title: "marketing agents",
    companyName: "amazon",
    image: "/vercel.svg",
    salary: "$150K - $180K",
    location: "england/remote",
  },
  {
    id: 3,
    title: "genAi developer",
    companyName: "meta",
    image: "/vercel.svg",
    salary: "$150K - $180K",
    location: "bangalore/remote",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_38%_38%,_#e8e4f8_0%,_#ddd8f0_45%,_#c8c0e4_100%)] dark:bg-[radial-gradient(ellipse_80%_90%_at_50%_-5%,#B48CDE,#000)]" />
        <div className="absolute bottom-0 z-20 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative mb-52 z-20 pt-4 select-none flex ms-auto max-w-6xl w-full flex-row justify-between h-screen items-center px-4 gap-4">
          <div className="flex flex-col max-w-full items-center w-full lg:gap-y-2 gap-2 xl:gap-y-2 xl:items-start lg:items-start md:items-start">
            <Badge
              className="rounded-full sm:text-xs leading-6 bg-white/5 backdrop-blur-md tracking-normal text-[10px] font-normal uppercase"
              variant={"outline"}
            >
              architecting the future of recruitment
            </Badge>
            <div className="lg:max-w-xl  xl:max-w-2xl flex flex-col items-center text-center md:text-start md:items-start lg:items-start gap-1.5 xl:items-start tracking-wider w-full capitalize text-wrap">
              <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
                find the right role.
              </span>
              <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
                hire the elite.
              </span>
              <p className="text-xs md:w-fit lg:w-xl dark:text-gray-400 leading-4 md:leading-6 tracking-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae illo quo fugit blanditiis laboriosam rerum culpa,
                iusto quasi tenetur voluptas suscipit voluptatem sit reiciendis
                eveniet, consequuntur numquam quod id eligendi.
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-md items-center gap-2">
              <InputGroup className="max-w-md  w-full h-10">
                <InputGroupInput
                  type="search"
                  placeholder="Search roles, skills and companies..."
                  className="placeholder:text-xs text-xs"
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>

              <Button
                className="bg-violet-500 h-10 text-white text-sm w-full md:w-fit"
                variant={"default"}
                size={"sm"}
              >
                Explore Roles
              </Button>
            </div>

            <AvatarGroupComponent />
          </div>

          <figure className="max-w-full w-full sm:block hidden h-full relative isolate">
            <HelixCube className="absolute inset-0 -z-10 md:z-10 right-0 w-md h-1/2" />
          </figure>
        </div>
      </section>

      <section className="min-h-full md:pb-12 w-full relative overflow-hidden">
        <div className="relative z-20 pt-4 select-none ms-auto flex h-full flex-col max-w-6xl mx-auto w-full px-4 gap-8">
          <div className="flex flex-1 justify-between items-center gap-2">
            <div className="flex flex-col gap-2 items-start text-start">
              <span className="font-medium uppercase tracking-wide text-xs text-violet-500">
                for job seekers
              </span>
              <p className="lg:text-4xl md:text-xl text-lg font-bold leading-tight text-balance max-w-sm md:max-w-xl capitalize w-xl tracking-wide text-white">
                curated oppertunities for high-impack careers.
              </p>
            </div>
            <div className="block">
              <Button variant={"link"} size={"lg"}>
                Browse All Roles
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
        <div className="relative z-20 pt-4 h-full select-none max-w-6xl mx-auto w-full px-4 gap-8">
          <div className="flex md:flex-row flex-col h-full gap-6 md:gap-16 items-stretch">
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
                <h1 className="text-balance font-bold tracking-wide text-white capitalize text-xl md:text-5xl w-xs md:w-2xl">
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
    </>
  );
}
