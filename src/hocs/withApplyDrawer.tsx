"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { JobListProps } from "@/@types/jobs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type RenderContent = (job?: JobListProps) => React.ReactNode;

/**
 * HOC that injects an `openApplyDrawer` prop into the wrapped component.
 * When `openApplyDrawer` is called the app-wide drawer is opened showing
 * simple apply content. You can pass a `renderDrawerContent` prop to the
 * wrapped component to customize the drawer body.
 */
function withApplyDrawer<P extends object>(
  WrappedComponent: React.ComponentType<P & { openApplyDrawer: () => void }>
) {
  return function WithApplyDrawer(
    props: P & {
      job?: JobListProps;
      renderDrawerContent?: RenderContent;
      className: string;
    }
  ) {
    const [open, setOpen] = React.useState<boolean>(false);

    const openApplyDrawer = React.useCallback(() => setOpen(true), []);

    return (
      <>
        <WrappedComponent {...props} openApplyDrawer={openApplyDrawer} />
        <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
          <DrawerContent
            className={cn("overflow-y-auto h-auto", props.className)}
          >
            <DrawerHeader>
              <DrawerTitle>Apply: {props.job?.title ?? "Job"}</DrawerTitle>
            </DrawerHeader>

            <div className="p-4">
              {props.renderDrawerContent ? (
                props.renderDrawerContent(props.job)
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Fill your details and submit your application.
                  </p>
                  {/* Minimal default content - replace with real form as needed */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Full name"
                      className="flex-1 rounded border px-2 py-1"
                    />
                    <Input
                      placeholder="Email"
                      className="flex-1 rounded border px-2 py-1"
                    />
                  </div>
                  <Textarea
                    placeholder="Message"
                    className="w-full rounded border p-2"
                    rows={4}
                  />
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => setOpen(false)}>Submit</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
}

export default withApplyDrawer;
