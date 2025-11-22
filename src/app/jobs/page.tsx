"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ListFilter, Pen, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type TabsValue = {
  id: string;
  name: string;
  value: string;
};

export default function Jobs() {
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

  // const removeTab = (value: string) => {
  //   setTabs((s) => s.filter((t) => t.value !== value));
  //   if (activeTab === value) {
  //     // switch to previous tab or first
  //     const remaining = tabs.filter((t) => t.value !== value);
  //     setActiveTab(remaining[remaining.length - 1]?.value ?? "");
  //   }
  // };
  return (
    <div className="w-full">
      <Tabs
        className="gap-0"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v)}
        defaultValue={`default`}
      >
        <div className="flex flex-row">
          <TabsList className="font-normal  p-0 relative text-sm text-black flex w-fit items-center mb-0 rounded-none">
            {tabs.map((item, index) => (
              <TabsTrigger
                key={`key-${item.name}-${index}`}
                className="border w-fit relative rounded-none rounded-t-sm"
                value={`${item.value}`}
              >
                {item.name} <Pen className="size-3" />
                {/* {tabs.length >= 2 && item.value !== "default" && (
                  <Button
                    onClick={() => removeTab(item.value)}
                    className="h-fit absolute inset-0 -top-2 bg-white size-[20px] flex items-center z-10 rounded-full left-28"
                    variant={"secondary"}
                    type="button"
                  >
                    <X className="size-4" />
                  </Button>
                )} */}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            className="border px-2 w-12 rounded-none rounded-t-sm"
            type="button"
            variant={"secondary"}
            onClick={handleAddTabs}
          >
            <Plus />
          </Button>
        </div>

        {tabs.map((item) => (
          <TabsContent
            value={`${item.value}`}
            key={`content-${item.value}-${item.id}`}
            className="w-full"
          >
            <Card className="rounded-none w-full shadow-2xs bg-white mt-0">
              <CardHeader>
                <CardTitle className="">{item.name}</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex w-full">
        <Button
          className="w-full hover:bg-gray-400 bg-white transition-all duration-500 ease-in-out border-b-gray-400 rounded-none rounded-bl rounded-br border border-b-2"
          variant={"secondary"}
        >
          <ListFilter className="size-5" /> Filter{" "}
          <ChevronDown className="size-5" />
        </Button>
      </div>
    </div>
  );
}
