import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ChartNoAxesCombined, PlusIcon } from "lucide-react";
import React from "react";

export default function QuantifiableSection() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-16 md:py-8 md:px-2 lg:px-5 px-4 bg-muted-foreground/5">
      <div className=" max-w-full w-full flex items-center justify-center ">
        <Card className="rounded-2xl shadow backdrop-blur-md">
          <CardContent>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 w-full">
              <div className="flex flex-col w-full items-start gap-4">
                <h1 className="font-semibold leading-5 md:leading-10 capitalize tracking-wide text-wrap lg:text-[2rem] md:text-xl text-accent-foreground">
                  Quantifiable value for your bottom line
                </h1>
                <p className="font-normal text-muted-foreground leading-relaxed tracking-wide lg:text-sm text-xs text-balance">
                  Our clients see an average of 42% increase in operational
                  efficiency within 6 months. Calculate your potential saving
                  based on your team size and infrastructure complexity.
                </p>
                <div className="flex flex-col items-start gap-4 ">
                  <div className="w-2xs md:w-xs flex flex-col py-2.5 items-start px-4 border-l-4 rounded-lb-2xl border-l-blue-500">
                    <span>400+ hours</span>
                    <span className="text-xs font-normal tracking-wide text-muted-foreground">
                      saving per month through automation
                    </span>
                  </div>
                  <div className="w-2xs md:w-xs flex flex-col py-2.5 items-start px-4 border-l-4 rounded-lb-2xl border-l-blue-500">
                    <span>32% Lowers</span>
                    <span className="text-xs font-normal tracking-wide text-muted-foreground">
                      infrastructure maintance cost
                    </span>
                  </div>
                </div>
              </div>
              <Card className="relative aspect-square bg-white/5 border saturate-50 border-white/5 shadow rounded-md backdrop-blur-md h-[350px] md:h-[400px] overflow-hidden pointer-events-none">
                <CardContent>
                  <div className="flex flex-col space-y-6 items-start">
                    <div className="flex justify-between items-center gap-2 w-full flex-1">
                      <span className="text-xs font-medium text-muted-foreground leading-relaxed tracking-wide">
                        ESTIMATED ANNUAL ROI
                      </span>
                      <span>
                        <ChartNoAxesCombined className="size-5 text-purple-500" />
                      </span>
                    </div>
                    <div className="font-semibold lg:text-6xl md:text-xl text-lg inline-flex items-baseline justify-start gap-0">
                      $2.5M
                      <PlusIcon className="size-4 text-purple-500" />
                    </div>

                    <div className="flex flex-col space-y-6 w-full items-start">
                      <div className="flex justify-between w-full mb-1">
                        <span className="text-xs tracking-wider font-medium uppercase">
                          Resource saving
                        </span>
                        <span className="text-xs font-medium uppercase">
                          88%
                        </span>
                      </div>
                      <div className="w-full bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "88%" }}
                        />
                      </div>
                      <div className="flex justify-between w-full mb-1">
                        <span className="text-xs tracking-wider font-medium uppercase">
                          Time efficiency
                        </span>
                        <span className="text-xs font-medium uppercase">
                          72%
                        </span>
                      </div>
                      <div className="w-full bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-blue-500 bg-transparent bg-clip to-sky-500 h-2 rounded-full"
                          style={{ width: "72%" }}
                        />
                      </div>
                      <div className="flex justify-between w-full mb-1">
                        <span className="text-xs tracking-wider font-medium uppercase">
                          scaling velocity
                        </span>
                        <span className="text-xs font-medium uppercase">
                          94%
                        </span>
                      </div>
                      <div className="w-full bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "94%" }}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between  items-center gap-2 md:gap-5 w-full">
                      <p className="font-normal text-muted-foreground text-xs tracking-wide">
                        Project based on 500+ headcount
                      </p>
                      <Button
                        variant={"link"}
                        size={"sm"}
                        className="text-purple-500 text-xs font-normal w-fit"
                      >
                        <span className="md:block hidden">Full Report</span>
                        <ArrowRight className="text-purple-500 size-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
