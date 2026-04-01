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
      </section>

      <MarketInsight />
      <Openings />
      <ProfilePresentation />
    </>
  );
}
