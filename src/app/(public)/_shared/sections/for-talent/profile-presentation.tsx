import AvatarGroupComponent from "@/components/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Check } from "lucide-react";
import React from "react";

export default function ProfilePresentation() {
  return (
    <section className="relative overflow-hidden bg-accent-foreground/5 flex flex-col min-h-screen items-center justify-center gap-5 md:gap-8 md:py-24 md:px-12 py-12 px-6">
      <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 md:gap-10 gap-5 items-start">
        <div className="lg:col-span-7 md:col-span-3 col-span-1 flex flex-col items-start gap-5">
          <div className="flex flex-col items-start md:gap-6 gap-4">
            <h1 className="font-bold leading-6 tracking-wide md:text-3xl lg:text-5xl text-xl text-white">
              Your Profile.
            </h1>
            <h1 className="font-bold leading-6 tracking-wide md:text-3xl lg:text-5xl text-xl text-white">
              Our Presentation.
            </h1>
          </div>

          <div className="block float-left">
            <p className="text-balance leading-relaxed text-xs lg:text-sm font-normal text-muted-foreground tracking-wide">
              We don&apos;t just list your expreience; We curate your narrative.
              Our platform present your skills, achivements and portfolio as a
              premium digital experience.
            </p>
          </div>

          <ul className="list-none flex flex-col gap-5 items-start">
            {[
              "verified skill endorsements",
              "dynamic interactive portfolio",
              "private enterprise access",
            ].map((item) => (
              <li
                key={`list-${item}`}
                className="font-medium text-muted-foreground text-xs capitalize flex list-none flex-1 gap-4 items-center"
              >
                <div className="rounded w-6 h-6 bg-background justify-center flex items-center">
                  <Check size={15} className="text-purple-900/80" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 md:col-span-3 relative w-full group col-span-1">
          {/* Top Right Glow */}
          <div className="absolute -top-10 z-0 -right-10 w-40 h-40 bg-slate-200/20 blur-[80px] rounded-full pointer-events-none" />

          {/* Bottom Left Glow */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-slate-200/10 blur-[100px] rounded-full pointer-events-none" />
          <Card className="@container/card bg-black overflow-hidden z-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
            <CardContent>
              <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-1 flex-row  items-start md:items-center gap-5 md:gap-10 justify-start">
                  <Avatar className="rounded-lg ring-3 ring-white/50 w-16 h-full">
                    <AvatarImage
                      className="rounded-md dark:brightness-75 dark:contrast-125 dark:invert border-black select-none"
                      src={"/next.svg"}
                      alt={`profile`}
                    />
                    <AvatarFallback className="text-white">NJ</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start">
                    <h1 className="font-semibold text-sm md:text-lg lg:text-2xl text-white leading-5 tracking-wide">
                      Inba Rajan
                    </h1>
                    <p className="font-normal md:leading-6 tracking-wide text-purple-600 text-xs md:text-sm">
                      Creative Director & Full Stack Developer
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-start justify-start flex-wrap w-full">
                  <p className="font-normal leading-5 tracking-normal text-xs text-muted-foreground">
                    CORE COMPETECIES
                  </p>
                  <div className="flex w-full flex-col flex-wrap md:flex-row items-start md:items-center gap-2">
                    {[
                      "Design System",
                      "Product Strategy",
                      "Team Leadership",
                    ].map((item) => (
                      <div
                        key={`skill-${item}`}
                        className="px-2.5 py-2.5 text-shadow-muted bg-accent text-xs text-nowrap tracking-wide rounded"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-row flex-col justify-between w-full items-start gap-5">
                  <AvatarGroupComponent />
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="text-purple-500 underline text-sm"
                  >
                    View Full Profile <ArrowUpRight className="size-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
