"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pen, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type TabsValue = {
  name: string;
  value: string;
  count: number;
};

export default function Jobs() {
  const [tabCount, setTabCount] = React.useState<number>(1);
  const [tabs, setTabs] = React.useState<TabsValue[]>([
    {
      name: "search",
      value: "search",
      count: 0,
    },
  ]);

  const handleAddTabs = () => {
    if (tabs.length > 5) {
      toast.warning("Tabs Limit has been reached!");
      return;
    }
    setTabCount((pre) => pre + 1);
    const newTabs = {
      name: "new search",
      value: "new search value",
    };

    // if (tabs.length < 2) {
    //   setTimeout(() => {
    //     setTabs((pre) => ({
    //       ...pre,
    //     }));
    //   }, 2000);
    // }

    setTabs((pre) => [...pre, { ...newTabs, count: tabCount }]);
  };

  return (
    <div className="w-full">
      <Tabs className="gap-0 flex flex-row">
        {tabs.map((item, index) => (
          <div key={`key-${item.name}-${index}`} className="w-full">
            <TabsList className="font-normal p-0 text-sm text-black flex flex-row flex-1 w-fit items-center mb-0 rounded-none">
              <TabsTrigger
                className="border w-fit rounded-none rounded-t-sm"
                value={`${item.value}-${item.count}`}
              >
                {item.name} <Pen className="size-3" />
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value={`${item.value}-${item.count}`}
              key={`content-${item.value}-${item.count}`}
              className="w-full"
            >
              <Card className="rounded-none w-full shadow-2xs bg-white mt-0">
                <CardHeader>
                  <CardTitle className="">
                    {item.name}
                    {item.count}
                  </CardTitle>
                </CardHeader>
              </Card>
            </TabsContent>
          </div>
        ))}
        <Button
          className="border px-2 w-12 rounded-none rounded-t-sm"
          type="button"
          variant={"secondary"}
          onClick={handleAddTabs}
        >
          <Plus />
        </Button>
      </Tabs>
      <div className="flex w-full">
        <Button
          className="w-full hover:bg-gray-400 bg-white border-b-gray-400 rounded-none rounded-bl rounded-br border border-b-2"
          variant={"secondary"}
        >
          Filter
        </Button>
      </div>
    </div>
  );
}
