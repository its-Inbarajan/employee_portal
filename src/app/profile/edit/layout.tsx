"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "profile", label: "Profile" },
  { value: "resume", label: "Resume / CV" },
  { value: "preferences", label: "Preferences" },
  { value: "culture", label: "Culture" },
  // { value: "view", label: "Profile view" },
];

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    tabs.find((tab) => pathname.endsWith(tab.value))?.value || "profile";

  const handleChange = (value: string) => {
    router.push(
      value === "profile" ? "/profile/edit" : `/profile/edit/${value}`
    );
  };

  return (
    <div className="md:max-w-screen w-full overflow-hidden max-w-5xl mx-auto sm:max-w-sm">
      <h1 className="text-2xl font-semibold mb-6">Edit your Profile</h1>
      <div className="flex justify-between  items-center gap-3">
        <Tabs value={activeTab} onValueChange={handleChange} className="w-full">
          <div className="flex md:flex-row flex-wrap flex-col w-full md:justify-between justify-self-start md:items-center border-b border-gray-300 rounded-none bg-transparent overflow-x-auto">
            <TabsList className="flex md:flex-wrap lg:flex-nowrap gap-2 p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={clsx(
                    "relative px-4 py-2 text-sm font-medium text-gray-500 transition-all",
                    activeTab === tab?.value
                      ? "text-black"
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

            <TabsList>
              <TabsTrigger
                className="text-blue-500 text-xs font-medium leading-6 tracking-wide"
                value="/view"
              >
                Profile view
              </TabsTrigger>
              <TabsTrigger
                className="text-blue-500 text-xs font-medium leading-6 tracking-wide"
                value="view-public-profile"
              >
                View Public Profile{" "}
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="pt-4">{children}</div>
    </div>
  );
}
