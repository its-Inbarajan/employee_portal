"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import React from "react";

export default function CandidateOnboarding() {
  const { data } = useSession();
  const [open, setOpen] = React.useState<boolean>(true);
  console.log(data?.user);

  const handleDialogOpenChange = () => {
    setOpen(!open);
  };
  if (open) {
    return (
      <div className="w-full">
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
          <DialogContent showCloseButton={false} className="p-0">
            <DialogHeader className="p-6">
              <DialogTitle>Welcome Our Job Portal</DialogTitle>
              <DialogDescription>
                Let’s get your profile ready to land your dream job.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col p-6">
              <p className="leading-normal">
                We’re thrilled to have you here! To help us match you with the
                best opportunities, please take a moment to complete your
                professional profile. It only takes a few minutes and consists
                of four quick steps:
              </p>
              <ul>
                {[
                  "basic-information",
                  "professinal-information",
                  "skils-and-resume",
                  "job-preference",
                ].map((item) => (
                  <li
                    key={`steps-${item}`}
                    className="ml-12 list-disc capitalize"
                  >
                    {item?.split("-").join(" ")}
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter className="flex flex-col rounded-b-lg gap-2 items-center border-t bg-muted/50 px-6 py-3">
              <DialogClose asChild>
                <Button variant={"secondary"} size={"sm"}>
                  skip
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant={"default"} size={"sm"}>
                  Let’s Get Started
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return <div className="text-accent-foreground">CandidateOnboarding</div>;
}
