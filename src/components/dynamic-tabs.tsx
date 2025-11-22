"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardTitle } from "./ui/card";

type TabItem = {
  id: string;
  title: string;
  content?: React.ReactNode;
};

/**
 * DynamicTabs
 * - clicks + to add a new tab
 * - renders TabContent only for existing tabs
 * - demonstrates lazy content rendering (only render when tab exists/active)
 */
export function DynamicTabs({ initial = 1 }: { initial?: number }) {
  const [tabs, setTabs] = React.useState<TabItem[]>(() =>
    Array.from({ length: initial }).map((_, i) => ({
      id: String(i + 1),
      title: `Tab ${i + 1}`,
      content: `Content for tab ${i + 1}`,
    }))
  );

  const [active, setActive] = React.useState<string>(tabs[0]?.id ?? "1");

  React.useEffect(() => {
    if (!tabs.find((t) => t.id === active) && tabs.length > 0) {
      setActive(tabs[0].id);
    }
  }, [tabs, active]);

  const addTab = () => {
    const next = tabs.length + 1;
    const newTab: TabItem = {
      id: String(Date.now()),
      title: `Tab ${next}`,
      content: `Content for tab ${next}`,
    };
    setTabs((s) => [...s, newTab]);
    setActive(newTab.id);
  };

  const removeTab = (id: string) => {
    setTabs((s) => s.filter((t) => t.id !== id));
    if (active === id) {
      // switch to previous tab or first
      const remaining = tabs.filter((t) => t.id !== id);
      setActive(remaining[remaining.length - 1]?.id ?? "");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Tabs value={active} onValueChange={(v) => setActive(v)}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="mr-2">
                <div className="flex items-center gap-2">
                  <span>{tab.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button
            onClick={addTab}
            variant={"ghost"}
            size={"sm"}
            aria-label="Add tab"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <div>
        {tabs.map((tab) => (
          <div key={`content_${tab.id}`} hidden={active !== tab.id}>
            {/* Render content only when tab is present; could be lazy-loaded */}
            {active === tab.id && (
              //   <div className="p-4 border rounded-md bg-white">
              //     <div className="flex justify-between items-start">
              //       <h3 className="font-medium">{tab.title}</h3>
              //       <Button
              //         size="sm"
              //         variant="ghost"
              //         onClick={() => removeTab(tab.id)}
              //         aria-label={`Close ${tab.title}`}
              //       >
              //         Close
              //       </Button>
              //     </div>
              //     <div className="mt-2">{tab.content}</div>
              //   </div>
              <TabsContent value={tab.id}>
                <Card>
                  <CardTitle>{tab.title}</CardTitle>
                </Card>
              </TabsContent>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicTabs;
