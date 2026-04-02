import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HighlightText } from "@/lib/getStaticData";
import Image from "next/image";
import React from "react";
import company_dashboard from "@/assets/pngs/company-dashboard.jpg";
import { Card, CardContent } from "@/components/ui/card";
import ParallaxTilt from "@/components/animations/parallax-tilt";
export default function CompanyHero() {
  return (
    <>
      <section className="relative overflow-hidden min-h-screen ">
        <div className="absolute bottom-0 left-0 right-0 top-0  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="flex flex-col md:flex-row w-full h-full mt-6 md:mt-12 items-center md:items-stretch gap-10 py-20 md:px-5 lg:px-12 lg:max-w-7xl mx-auto">
          <div className="flex-1 flex flex-col md:items-start items-center relative z-40 justify-center px-6 gap-6">
            <Badge
              variant={"outline"}
              className="bg-white/20 uppercase text-xs font-normal tracking-wider rounded-full border border-white/20"
            >
              enterprise grade platform
            </Badge>
            <div className="xl:max-w-2xl flex flex-col md:w-xs items-center text-center md:text-start md:items-start lg:items-start gap-1.5 xl:items-start tracking-wider w-full capitalize text-wrap">
              <span className="text-3xl lg:text-3xl xl:text-7xl w-full lg:w-xl block lg:font-extrabold font-bold">
                Empower your{" "}
                <HighlightText className="text-purple-500 inline-block">
                  Enterprise.
                </HighlightText>
              </span>
              <p className="text-xs md:w-fit lg:w-sm dark:text-gray-400 leading-4 md:leading-6 tracking-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae illo quo fugit blanditiis laboriosam rerum culpa,
                iusto quasi tenetur voluptas suscipit voluptatem sit reiciendis
                eveniet, consequuntur numquam quod id eligendi.
              </p>
              <div className="flex flex-col md:flex-row w-full md:w-md items-center gap-2">
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="bg-purple-500 hover:bg-purple-500/85"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center md:px-6 md:py-4 px-3 py-2 md:justify-end">
            <ParallaxTilt>
              <Card className="relative mx-auto pointer-events-none w-full h-[250px] md:h-full max-w-full md:max-w-xl lg:max-w-full pt-0 overflow-hidden">
                <CardContent className="p-0 w-full h-full">
                  <div className="glint pointer-events-none absolute inset-0 bg-white/10 blur-3xl opacity-0 z-30 transition-opacity" />
                  <Image
                    src={company_dashboard}
                    alt="Modern Office"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw)"
                    className="object-cover brightness-60 grayscale dark:brightness-40"
                  />
                </CardContent>
              </Card>
            </ParallaxTilt>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden  bg-accent-foreground/5">
        <div className="w-full mx-auto lg:max-w-5xl md:max-w-6xl max-w-full lg:py-10 lg:px-8 py-12 px-5">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <p className="font-normal leading-relaxed uppercase tracking-wider text-xs md:text-sm text-muted-foreground">
              powering the world&apos;s most innovative teams
            </p>
            <div className="flex md:flex-row flex-col items-center gap-8">
              {[
                "/favicon.ico",
                "/next.svg",
                "/favicon.ico",
                "/next.svg",
                "/favicon.ico",
              ].map((item, index) => (
                <Image
                  src={item}
                  alt=""
                  key={`companies-${index}`}
                  width={10}
                  height={10}
                  className="size-20"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
