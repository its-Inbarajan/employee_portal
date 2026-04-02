import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HighlightText } from "@/lib/getStaticData";
import { Component } from "lucide-react";
import Image from "next/image";
import React from "react";
import startup from "@/assets/pngs/startup.jpg";
import MarketInsight from "../_shared/sections/for-talent/market-insight";
import Openings from "../_shared/sections/for-talent/openings";
import ProfilePresentation from "../_shared/sections/for-talent/profile-presentation";
export default function ForJobSeekers() {
  return (
    <>
      <section className="relative overflow-hidden min-h-screen">
        <div className="flex flex-col md:flex-row w-full items-stretch gap-10 py-20  max-w-7xl mx-auto">
          <div className="flex-1 flex flex-col justify-center px-6 gap-6">
            <Badge
              variant={"outline"}
              className="bg-white/20 text-xs font-normal tracking-wider rounded-full border border-white/20"
            >
              FOR WORLD-CLASS TALENT
            </Badge>
            <div className="lg:max-w-xl xl:max-w-2xl flex flex-col items-center text-center md:text-start md:items-start lg:items-start gap-1.5 xl:items-start tracking-wider w-full capitalize text-wrap">
              <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
                your career is a{" "}
                <HighlightText className="text-purple-500">
                  Masterpiece.
                </HighlightText>
              </span>
              <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
                lets build the next chapter.
              </span>
              <p className="text-xs md:w-fit lg:w-xl dark:text-gray-400 leading-4 md:leading-6 tracking-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae illo quo fugit blanditiis laboriosam rerum culpa,
                iusto quasi tenetur voluptas suscipit voluptatem sit reiciendis
                eveniet, consequuntur numquam quod id eligendi.
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-md items-center gap-2">
              <Button
                variant={"default"}
                size={"lg"}
                className="bg-purple-500 hover:bg-purple-500/85"
              >
                Build your profile
              </Button>
              <Button variant={"outline"} size={"lg"}>
                <Component />
                Explore roles
              </Button>
            </div>
          </div>

          <div className="flex-1 relative pl-6 md:pl-0 min-h-[400px] md:min-h-full">
            <Image
              src={startup}
              alt="Modern Office"
              fill
              priority
              className="object-cover rounded-l-2xl md:rounded-l-4xl"
            />
          </div>
        </div>
        <div
          className="absolute inset-0 -z-10 
  /* Light Mode: Moved from 38% 38% (top-ish) to 50% 110% (bottom center) */
  bg-[radial-gradient(ellipse_at_50%_110%,_#e8e4f8_0%,_#ddd8f0_45%,_#c8c0e4_100%)] 
  
  /* Dark Mode: Moved from 50% -5% (top) to 50% 105% (bottom) */
  dark:bg-[radial-gradient(ellipse_80%_90%_at_50%_105%,_#B48CDE,_#000)]"
        />
      </section>

      <MarketInsight />
      <Openings />
      <ProfilePresentation />

      <section className="relative flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl flex items-center justify-center h-full w-full md:px-24 md:py-24 px-6 py-6">
          <div className="flex items-center gap-6 md:gap-8 flex-col h-full justify-center">
            <div className="flex flex-col gap-y-2 md:gap-y-8 items-center shrink">
              <h1 className="font-bold leading-6 text-accent-foreground tracking-wide md:text-5xl text-2xl">
                Elevate Your Stroy.
              </h1>
              <h1 className="font-bold leading-6 tracking-wide md:text-5xl text-2xl text-purple-500">
                Join the Editorial.
              </h1>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed tracking-tight max-w-sm w-full text-center">
              Applications are reviwed on a rolling basis. Our next cohort of
              verified professional joins on the first of the month.
            </p>
            <div className="flex md:flex-row gap-4 flex-col flex-1 items-center">
              <Button
                variant={"secondary"}
                size={"lg"}
                className="bg-purple-500 hover:bg-purple-500/70"
              >
                Start Apply
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
