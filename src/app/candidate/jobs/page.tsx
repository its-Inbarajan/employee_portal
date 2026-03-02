"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CompoBox } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDialog from "@/hocs/useDialog";
import {
  ChevronDown,
  ListFilter,
  PenIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import JobFilter from "../components/job-filter";
import JobPreferenceForm from "../components/job-preference-form";
import NaukriStyleJobCard from "../components/naukri-style-job-card";
import JobPreference from "../components/job-preference";
import useDrawer from "@/hocs/useDrawer";

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
      className="w-full hover:bg-gray-400 dark:bg-sidebar bg-white transition-all duration-500 ease-in-out border-b-gray-100 rounded-none rounded-bl rounded-br"
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
      size={"sm"}
      variant={'ghost'}
      onClick={openDrawer}
    >
      <PenIcon className="" />
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
    <div className="w-full group-data-[collapsible=icon]:bg-red-500 relative">
      <Tabs
        className="gap-0 sticky -top-14 z-40"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v)}
        defaultValue={`default`}
      >
        <div className="flex flex-row ">
          {tabs.map((item, index) => (
            <TabsList key={`key-${item.name}-${index}`} className="font-normal p-0 relative text-sm text-black flex w-fit items-center mb-0 rounded-none">
              <TabsTrigger
                className="border w-fit relative rounded-none rounded-t-sm"
                value={`${item.value}`}
              >
                {item.name} <PenIcon className="size-3" />
                {tabs.length >= 2 && item.value !== "default" && (
                  <div>
                    <Button
                      onClick={() => removeTab(item.value)}
                      className="h-fit absolute inset-0 -top-2 bg-white size-[20px] flex items-center z-10 rounded-full left-28"
                      variant={"secondary"}
                      size={"sm"}
                      type="button"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                )}
              </TabsTrigger>
            </TabsList>
          ))}

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
            <Card className="rounded-none w-full shadow-2xs  mt-0">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-center">
                  <CompoBox
                    PopoverClassName="w-full 4 dark:ring dark:ring-black place-holder:text-black h-12 bg-gray-200 px-1 border-px border-gray-500"
                    options={roles}
                    placeholder="Choose Role"
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                  <CompoBox
                    PopoverClassName="w-full rounded dark:ring dark:ring-black place-holder:text-black h-12 bg-gray-200 px-1 border-px border-gray-500"
                    options={[]}
                    placeholder="Choose location"
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
        <div className="flex w-full">
          <OpenDialog
            data={{
              title: "Job Filters",
            }}
            renderDialogContent={() => <JobFilter />}
          />
        </div>
      </Tabs>
      <div className="grid grid-cols-12 gap-3.5 w-full items-start">
        <div className="col-span-12 flex flex-col w-full gap-4 mt-4 md:col-span-7">
          {[1, 2, 3, 4, 5].map((it) => (
            <NaukriStyleJobCard key={it} />
          ))}
        </div>
        <div className="col-span-5 mt-4 w-full">
          <JobPreference
            OpenDrawer={
              <OpenDrawer
                direction="right"
                renderComponent={() => <JobPreferenceForm />}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
