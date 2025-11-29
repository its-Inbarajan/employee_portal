"use client";
import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type RenderContent = (content?: unknown) => React.ReactNode;

function useDrawer<P extends object>(
  Component: React.ComponentType<P & { openDrawer: () => void }>
) {
  return function HDrawer(
    props: P & {
      className?: string;
      renderComponent: RenderContent;
      direction: "bottom" | "left" | "right" | "top";
    }
  ) {
    const [open, setOpen] = React.useState<boolean>(false);
    const openApplyDrawer = React.useCallback(() => setOpen(true), []);

    return (
      <>
        <Component {...props} openDrawer={openApplyDrawer} />
        <Drawer direction={props.direction} open={open} onOpenChange={setOpen}>
          <DrawerContent
            className={cn(
              "data-[vaul-drawer-direction=right]:sm:max-w-xl px-10 w-full overflow-hidden flex flex-col  pb-20",
              props.className
            )}
          >
            {props.renderComponent ? (
              props.renderComponent()
            ) : (
              <div>Give render component</div>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  };
}

export default useDrawer;
