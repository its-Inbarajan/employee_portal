"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

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
  },
];

const ClientApplied = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
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
    console.log(params);
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
  return (
    <div className="md:px-6 md:py-4 px-3 py-3  overflow-scroll scroll-smooth  min-h-screen">
      <div className="md:max-w-screen max-w-sm mx-auto w-full">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-semibold leading-6 tracking-wide md:text-3xl text-lg text-black">
            Applications
          </h1>

          <div className="flex flex-col gap-6 max-w-full w-full">
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
                <DrawerContent>
                  <DrawerTitle>View Applied Job{selectedJobId}</DrawerTitle>
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
