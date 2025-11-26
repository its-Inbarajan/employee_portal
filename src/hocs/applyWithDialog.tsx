"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { JobListProps } from "@/@types/jobs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type RenderContent = (job?: JobListProps) => React.ReactNode;

/**
 * HOC that injects an `openApplyDrawer` prop into the wrapped component.
 * When `openApplyDrawer` is called the app-wide drawer is opened showing
 * simple apply content. You can pass a `renderDrawerContent` prop to the
 * wrapped component to customize the drawer body.
 */
function applyWithDialog<P extends object>(
  WrappedComponent: React.ComponentType<P & { openApplyDrawer: () => void }>
) {
  return function ApplyWithDialog(
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={false}
            className={cn(
              "sm:max-w-5xl rounded max-h-[80vh] px-2 flex flex-col overflow-y-scroll",
              props.className
            )}
          >
            <DialogHeader className="flex items-center w-full">
              <DialogTitle>Apply: {props.job?.title ?? "Job"}</DialogTitle>
            </DialogHeader>

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
          </DialogContent>
        </Dialog>
      </>
    );
  };
}

export default applyWithDialog;
