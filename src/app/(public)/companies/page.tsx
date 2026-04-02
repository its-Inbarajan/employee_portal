import React from "react";
import CompanyHero from "../_shared/sections/for-companies/company-hero";
import AdvanceSection from "../_shared/sections/for-companies/advance-section";
import QuantifiableSection from "../_shared/sections/for-companies/quantifiable";
import { Button } from "@/components/ui/button";

export default function ForCompanies() {
  return (
    <div>
      <CompanyHero />
      <AdvanceSection />
      <QuantifiableSection />

      <section className="relative flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl flex items-center justify-center h-full w-full md:px-24 md:py-24 px-6 py-6">
          <div className="flex items-center gap-8 flex-col h-full justify-center">
            <div className="flex flex-col gap-y-6 items-center shrink">
              <h1 className="font-bold leading-6 text-accent-foreground tracking-wide md:text-5xl text-2xl">
                Ready to sacle your team?
              </h1>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed tracking-tight max-w-sm w-full text-center">
              Join over 2000+ forward-thinking enterprise building the future on
              Modernize.
            </p>
            <div className="flex md:flex-row gap-4 flex-col flex-1 items-center">
              <Button
                variant={"secondary"}
                size={"sm"}
                className="bg-purple-500 hover:bg-purple-500/70"
              >
                Contact Sales
              </Button>
              <Button variant={"outline"} size={"sm"}>
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
