"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CompoBox } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDialog from "@/hocs/useDialog";
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  ChevronDown,
  DollarSignIcon,
  EyeOffIcon,
  ListFilter,
  MapPinIcon,
  NewspaperIcon,
  PenIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import JobFilter from "../components/job-filter";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useDrawer from "@/hocs/useDrawer";
import JobPreferenceForm from "../components/job-preference-form";

type TabsValue = {
  id: string;
  name: string;
  value: string;
};

const OpenFilterDialog: React.FC<{ openDialog: () => void }> = ({
  openDialog,
}) => {
  return (
    <Button
      type="button"
      className="w-full hover:bg-gray-400 bg-white transition-all duration-500 ease-in-out border-b-gray-100 rounded-none rounded-bl rounded-br border border-b-2"
      variant={"secondary"}
      onClick={openDialog}
    >
      <ListFilter className="size-5" /> Filter{" "}
      <ChevronDown className="size-5" />
    </Button>
  );
};

const OpenPrefernceEdit: React.FC<{ openDrawer: () => void }> = ({
  openDrawer,
}) => {
  return (
    <Button
      onClick={openDrawer}
      size={"sm"}
      variant={"default"}
      className="bg-transparent h-4 hover:bg-transparent text-blue-500"
    >
      <PenIcon className="size-3" />
    </Button>
  );
};

export default function Jobs() {
  const OpenDrawer = useDrawer(OpenPrefernceEdit);
  const OpenDialog = useDialog(OpenFilterDialog);
  const [tabs, setTabs] = React.useState<TabsValue[]>(() =>
    Array.from({ length: 1 }).map((_, i) => ({
      id: String(i + 1),
      name: `Search Tab ${i + 1}`,
      value: `default`,
    }))
  );

  const [activeTab, setActiveTab] = React.useState<string>(
    tabs[0]?.value ?? "default"
  );

  React.useEffect(() => {
    if (!tabs.find((t) => t.value === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs, activeTab]);

  const handleAddTabs = () => {
    if (tabs.length >= 5) {
      toast.warning("Tabs Limit has been reached!");
      return;
    }

    const next = tabs.length + 1;
    const newTab: TabsValue = {
      id: String(Date.now()),
      name: `Search  Tab ${next}`,
      value: `Content for tab ${next}`,
    };
    setTabs((s) => [...s, newTab]);
  };

  const removeTab = (value: string) => {
    setTabs((s) => s.filter((t) => t.value !== value));
    if (activeTab === value) {
      // switch to previous tab or first
      const remaining = tabs.filter((t) => t.value !== value);
      setActiveTab(remaining[remaining.length - 1]?.value ?? "");
    }
  };

  const roles = [
    {
      heading: "Engineering",
      data: [
        "software engineering",
        "mobile developer",
        "IOS developer",
        "andriod developer",
        "frontend engineering",
        "backend engineering",
        "Full-Stack engineering",
        "software architect",
        "security engineering",
        "machine learning engineering",
        "embedded engineering",
        "data engineering",
        "devops",
        "engineering manager",
        "qa engineering",
        "data scientict",
      ],
    },
    {
      heading: "Designer",
      data: [
        "Junior Designer",
        "Graphic Designer",
        "Visual Designer",
        "User Interface (UI) Designer",
        "User Experience (UX) Designer",
        "Product Designer",
        "Interaction Designer",
        "Motion Graphics Designer",
        "Web Designer",
      ],
    },
  ];

  return (
    <div className="w-full group-data-[collapsible=icon]:bg-red-500">
      <Tabs
        className="gap-0"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v)}
        defaultValue={`default`}
      >
        <div className="flex flex-row">
          <TabsList className="font-normal p-0 relative text-sm text-black flex w-fit items-center mb-0 rounded-none">
            {tabs.map((item, index) => (
              <TabsTrigger
                key={`key-${item.name}-${index}`}
                className="border w-fit relative rounded-none rounded-t-sm"
                value={`${item.value}`}
              >
                {item.name} <PenIcon className="size-3" />
                {tabs.length >= 2 && item.value !== "default" && (
                  <Button
                    onClick={() => removeTab(item.value)}
                    className="h-fit absolute inset-0 -top-2 bg-white size-[20px] flex items-center z-10 rounded-full left-28"
                    variant={"secondary"}
                    size={"sm"}
                    type="button"
                  >
                    <XIcon className="size-4" />
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            className="border px-2 w-12 rounded-none rounded-t-sm"
            type="button"
            variant={"secondary"}
            onClick={handleAddTabs}
          >
            <PlusIcon />
          </Button>
        </div>
        {tabs.map((item) => (
          <TabsContent
            value={`${item.value}`}
            key={`content-${item.value}-${item.id}`}
            className="w-full"
          >
            <Card className="rounded-none w-full shadow-2xs bg-white mt-0">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-center">
                  <CompoBox
                    PopoverClassName="w-full rounded h-12 bg-gray-200 px-1 border-px border-gray-500"
                    options={roles}
                    placeholder="Choose Role"
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                  <CompoBox
                    PopoverClassName="w-full rounded h-12 bg-gray-200 px-1 border-px border-gray-500"
                    options={[]}
                    placeholder="Choose location"
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex w-full">
        <OpenDialog
          data={{
            title: "Job Filters",
          }}
          renderDialogContent={() => <JobFilter />}
        />
      </div>
      <div className="grid grid-cols-12 gap-3.5 w-full items-start">
        <div className="col-span-12 md:col-span-7">
          {[1, 2, 3, 4, 5].map((it) => (
            <Link
              key={it}
              href={"#"}
              className="flex items-center my-4 max-w-3xl gap-4 flex-col"
            >
              <Card className="rounded-2xl shadow hover:shadow-2xs transition-all ease-in-out duration-200">
                <CardContent className="space-y-3">
                  <div className="flex flex-row items-center justify-between">
                    <div className="inline-flex flex-col justify-start">
                      <CardTitle className="leading-snug tracking-wide">
                        Frontend developer
                      </CardTitle>
                      <span className="font-medium text-xs leading-5 tracking-wide text-gray-700">
                        Company name
                      </span>
                    </div>
                    <div className="w-12 h-fit border rounded-sm">
                      <Image
                        src={"/next.svg"}
                        width={50}
                        height={50}
                        className="h-full w-full aspect-square object-center ring-1"
                        alt="company_profile"
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-start line-clamp-1 text-nowrap gap-1">
                    <div className="flex flex-row flex-1 items-center">
                      <div className="flex flex-row h-3 gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <BriefcaseBusinessIcon className="size-4 text-gray-600" />
                          <span className="font-normal text-gray-700 text-sm">
                            1-3 Yrs
                          </span>
                        </div>
                        <Separator orientation="vertical" className="mr-2" />
                      </div>
                      <div className="flex flex-row h-3 gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <DollarSignIcon className="size-4 text-gray-600" />
                          <span className="font-normal text-gray-700 text-sm">
                            Not disclosed
                          </span>
                        </div>
                        <Separator orientation="vertical" className="mr-2" />
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="size-4 text-gray-600" />
                          <span className="font-normal text-gray-700 text-sm">
                            Remote
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 flex-1 items-center">
                      <NewspaperIcon className="size-4 text-gray-600" />
                      <span className="font-normal text-gray-700 text-sm">
                        Experiene : 1-3 yrs
                      </span>
                      <span className="font-normal text-gray-700 inline-block text-sm">
                        Eduation : Bachelors / Master in software development
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row text-nowrap line-clamp-1 gap-2 flex-1 items-center">
                    {[
                      "Frontend development",
                      "Redux",
                      "JavaScript",
                      "TypeScript",
                      "Nextjs",
                      "CSS/SCSS",
                      "HTML",
                    ].map((item) => (
                      <span
                        key={`jobs-skills-${item}`}
                        className="font-normal text-gray-600 text-sm"
                      >
                        {item},
                      </span>
                    ))}
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="font-normal tracking-wide text-xs text-gray-400">
                      2 days ago
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="hover:text-blue-500 p-0 text-black inline-flex items-center text-xs font-normal"
                      >
                        <EyeOffIcon /> Hide
                      </Button>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="hover:text-blue-500 p-0 text-black inline-flex items-center text-xs font-normal"
                      >
                        <BookmarkIcon /> Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex my-4 col-span-5 w-full">
          <Card className="shadow-none">
            <CardContent>
              <CardTitle className="font-semibold text-nowrap text-lg">
                Add preferences to get match
              </CardTitle>
              <div className="space-y-2">
                <span className="inline-flex mt-2 text-sm font-normal tracking-tight text-gray-600 items-center gap-1">
                  Preferred job role{" "}
                  <OpenDrawer
                    direction="right"
                    renderComponent={() => <JobPreferenceForm />}
                  />
                </span>
                <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                  {[
                    "frontend developer",
                    "mern stack developer",
                    "full stack developer",
                  ].map((ite) => (
                    <div
                      key={`prefferred-job-${ite}`}
                      className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                    >
                      {ite}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="inline-flex mt-2 text-sm font-normal tracking-tight text-gray-600 items-center gap-1">
                  Preferred work location{" "}
                  <OpenDrawer
                    direction="right"
                    renderComponent={() => <JobPreferenceForm />}
                  />
                </span>
                <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                  {[
                    "pune",
                    "Noida",
                    "Mumbai (All Areas)",
                    "Mumbai",
                    "Kolkata",
                    "Hyderabad/Secunderabad",
                    "Delhi / NCR",
                    "Chennai",
                    "Bangalore/Bengaluru",
                    "Ahmedabad",
                  ].map((ite) => (
                    <div
                      key={`prefferred-job-${ite}`}
                      className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                    >
                      {ite}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="inline-flex mt-2 text-sm font-normal tracking-tight text-gray-600 items-center gap-1">
                  Preferred Salary{" "}
                  <OpenDrawer
                    direction="right"
                    renderComponent={() => <JobPreferenceForm />}
                  />
                </span>
                <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                  {["₹ 6,60,000"].map((ite) => (
                    <div
                      key={`prefferred-job-${ite}`}
                      className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                    >
                      {ite}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
