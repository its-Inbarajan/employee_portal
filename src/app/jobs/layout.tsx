"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const tabs = [
  { value: "jobs", label: "Browse all" },
  { value: "saved", label: "Saved" },
  { value: "hidden", label: "Hidden" },
];

export default function JobLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const hideFor = ["/jobs/applications"];
  if (pathname && hideFor.some((p) => pathname.startsWith(p))) {
    return <>{children}</>;
  }

  const activeTab =
    tabs.find((tab) => pathname.endsWith(tab.value))?.value || "jobs";

  const handleChange = (value: string) => {
    router.push(value === "jobs" ? "/jobs" : `/jobs/${value}`);
  };
  return (
    <div className="md:max-w-screen w-full max-w-5xl mx-auto md:px-6 px-1 sm:max-w-sm py-3.5 md:py-6">
      <h1 className="font-semibold leading-relaxed tracking-tight text-4xl">
        Search for jobs
      </h1>
      <div className="flex justify-between  items-center gap-3">
        <Tabs
          value={activeTab}
          onValueChange={handleChange}
          className="w-fit border-b-0"
        >
          <div className="flex md:flex-row border-none flex-wrap flex-col w-full md:justify-between justify-self-start md:items-center border-b border-gray-300 rounded-none bg-transparent ">
            <TabsList className="flex md:flex-wrap lg:flex-nowrap gap-2 p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={clsx(
                    "relative px-4 py-2 text-sm font-normal text-black transition-all",
                    activeTab === tab?.value
                      ? "text-black border-b-2"
                      : "hover:text-gray-800 hover:bg-transparent"
                  )}
                >
                  {tab.label}
                  <span
                    className={clsx(
                      "absolute left-0 bottom-0 h-[2px] w-full bg-black transition-transform duration-300",
                      activeTab === tab?.value
                        ? "scale-x-100"
                        : "scale-x-0 origin-center"
                    )}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}
