"use client";
import { ChevronRight, XIcon } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RecentlyApplied = [
  {
    id: 2,
    image: "/next.svg",
    company_name: "text-company",
    title: "MERN Stack developer",
    location: "Bangalore - Remote",
    salary_range: "16L – ₹18L",
    company_profile_link: "/",
    job_link: "/",
    createdAt: "3 days ago",
    company_des: "Conversational workplace application",
  },
];

const ClientApplied = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<
    "application" | "job-description" | "company-info" | string
  >("application");
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const id = searchParams.get("jobId");

    if (id) {
      setSelectedJobId(id);
      setOpen(true);
    } else {
      setSelectedJobId(null);
      setOpen(false);
    }
  }, [searchParams]);

  const handleAppliedClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("jobId", value);

    router.push(`${pathName}?${params.toString()}`);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("jobId");
      const qs = params.toString();
      router.push(`${pathName}${qs ? `?${qs}` : ""}`);
    }
  };

  const handleTabValue = (
    value: "application" | "job-description" | "company-info" | string
  ) => {
    setActiveTab(value);
  };

  return (
    <div className="md:px-6 md:py-4 px-3 py-3  overflow-scroll scroll-smooth  min-h-screen">
      <div className="md:max-w-screen max-w-sm mx-auto w-full">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-semibold leading-6 tracking-wide md:text-3xl text-lg text-black">
            Applications
          </h1>

          <div className="flex flex-col gap-6 max-w-full mt-5 w-full">
            <Tabs defaultValue="ongoing">
              <TabsList>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="ongoing">
                {RecentlyApplied &&
                  RecentlyApplied.map((item) => (
                    <div
                      onClick={() => handleAppliedClick(String(item.id))}
                      className="w-full"
                      key={item.company_profile_link}
                    >
                      <div className="flex cursor-pointer w-full py-4 bg-white px-4 rounded-md border gap-4 items-start">
                        <div className="w-16 h-fit border rounded-sm">
                          <Image
                            src={item.image ?? "/next.svg"}
                            width={100}
                            height={100}
                            alt="company_profile"
                            className="h-full w-full aspect-square object-center"
                          />
                        </div>
                        <div className="flex w-full flex-row md:flex-col items-start">
                          <h1 className="font-semibold mb-2 leading-6 tracking-wide md:text-lg text-lg">
                            Job Title
                          </h1>
                          <span className="capitalize font-normal text-sm block text-gray-600 leading-5 tracking-wide">
                            {item.title}
                          </span>
                          <div className="flex items-center justify-self-start w-full gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                            <span className="capitalize font-medium text-black tracking-wide leading-5 text-xs">
                              Not Accepted
                            </span>
                            <span className="capitalize font-medium text-gray-400 tracking-wide leading-5 text-xs">
                              Aug 30
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 border flex justify-center items-center rounded">
                          <ChevronRight className="size-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="archived">
                <div className="flex justify-center items-center h-60">
                  <h1 className="font-bold leading-6 tracking-wide text-xl text-black">
                    There is no items here!
                  </h1>
                </div>
              </TabsContent>
              <Drawer
                direction="right"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-xl ">
                  <div className="flex gap-2 justify-between items-start border-b px-4 py-4">
                    <Link
                      href={RecentlyApplied[0].company_profile_link}
                      className="flex flex-row w-full gap-4 items-center"
                    >
                      <div className="w-16 h-fit border rounded-sm">
                        <Image
                          width={100}
                          height={100}
                          alt="company_profile"
                          className="h-full w-full aspect-square object-center"
                          src={RecentlyApplied[0].image}
                        />
                      </div>
                      <div className="grid capitalize items-center space-y-px">
                        <DrawerTitle>
                          {RecentlyApplied[0].company_name} {selectedJobId}
                        </DrawerTitle>
                        <DrawerDescription>
                          {RecentlyApplied[0].company_des}
                        </DrawerDescription>
                        <span className="font-medium text-muted-foreground leading-relaxed tracking-wide text-sm">
                          {RecentlyApplied[0].createdAt}
                        </span>
                      </div>
                    </Link>

                    <Button
                      onClick={() => handleOpenChange(false)}
                      type="button"
                      size={"icon-sm"}
                      variant={"secondary"}
                    >
                      <XIcon />
                    </Button>
                  </div>
                  <Tabs
                    className="w-full"
                    value={activeTab}
                    onValueChange={handleTabValue}
                  >
                    <div className="w-full bg-white shadow">
                      <TabsList className="bg-transparent space-x-4 pb-0 rounded-none">
                        {["application", "job-description", "company-info"].map(
                          (item) => (
                            <TabsTrigger
                              className={
                                "capitalize relative px-4 py-2 text-sm font-normal text-black transition-all"
                              }
                              key={`tab-value-${item}`}
                              value={item}
                            >
                              {item.split("-").join(" ")}
                              <span
                                className={cn(
                                  "absolute left-0 bottom-0 w-full h-[2px] bg-black transition-transform duration-300",
                                  activeTab === item
                                    ? "scale-x-100"
                                    : "scale-x-0 origin-center"
                                )}
                              />
                            </TabsTrigger>
                          )
                        )}
                      </TabsList>
                    </div>
                    <TabsContent className="" value="application">
                      Application
                    </TabsContent>
                  </Tabs>
                </DrawerContent>
              </Drawer>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientApplied;
