"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type RenderContent<T> = (content?: T) => React.ReactNode;

function useDialog<P extends object>(
  Component: React.ComponentType<P & { openDialog: () => void }>
) {
  return function useDialog(
    props: P & {
      renderDialogContent?: RenderContent<{
        title: string;
        description?: string;
      }>;
      data?: { title: string; description?: string };
    }
  ) {
    const [open, setOpen] = React.useState<boolean>(false);
    const openDialog = React.useCallback(() => setOpen((pre) => !pre), []);

    const closeModal = React.useCallback(() => {
      setTimeout(() => {
        setOpen(false);
      }, 300); // Delay content removal for animation effect
    }, []);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeModal]);
    return (
      <>
        <Component {...props} openDialog={openDialog} />

        <Dialog open={open} onOpenChange={openDialog}>
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-5xl p-0 rounded max-h-[80vh] flex flex-col overflow-y-scroll "
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{props.data?.title}</DialogTitle>
              <DialogDescription>{props.data?.description}</DialogDescription>
            </DialogHeader>
            {props.renderDialogContent ? (
              props.renderDialogContent(props.data)
            ) : (
              <DialogHeader>
                <DialogTitle>Dialog Opened</DialogTitle>
                <DialogDescription>
                  This is a duplicate content. you can pass renderComponent to
                  render your own content here.
                </DialogDescription>
              </DialogHeader>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  };
}

export default useDialog;
