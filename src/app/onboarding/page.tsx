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

import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import StepOne from "./steps/step-one";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";
import StepFour from "./steps/step-four";

interface OnboardingSkip {
  data: { message: string };
  message: string;
  success: boolean;
  statusCode: number;
}

export default function CandidateOnboarding() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleDialogOpenChange = () => {
    setOpen(!open);
  };

  async function handleOnboardingSkip() {
    setLoading(true);
    try {
      const response = await api.patch<OnboardingSkip, { skipped: boolean }>(
        "/users/onboarding-complete",
        {
          skipped: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.success) {
        console.log(response);
        toast.success(response.message);
        router.push("/candidate");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const formElement = [
    <StepOne key={0} />,
    <StepTwo key={1} />,
    <StepThree key={2} />,
    <StepFour key={3} />,
  ];

  const current = formElement[currentStep - 1];

  const goToNext = () => {
    if (currentStep < formElement.length) {
      setCurrentStep((pre) => pre + 1);
    }
  };
  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (open) {
    return (
      <div className="w-full">
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
          <DialogContent
            onInteractOutside={(e) => e.preventDefault()}
            showCloseButton={false}
            className="p-0"
          >
            <DialogHeader className="p-6">
              <DialogTitle>Welcome to Our Job Portal</DialogTitle>
              <DialogDescription>
                Let’s get your profile ready to land your dream job.
              </DialogDescription>
            </DialogHeader>
            <div className="flex  flex-col gap-4 px-6">
              <p className="leading-normal">
                We’re thrilled to have you here! To help us match you with the
                best opportunities, please take a moment to complete your
                professional profile. It only takes a few minutes and consists
                of four quick steps:
              </p>
              <ul className="flex flex-col gap-4 items-start justify-center">
                {[
                  "basic-information",
                  "professinal-information",
                  "skils-and-resume",
                  "job-preference",
                ].map((item) => (
                  <li
                    key={`steps-${item}`}
                    className="ml-4 text-sm font-normal list-decimal capitalize"
                  >
                    {item?.split("-").join(" ")}
                  </li>
                ))}
              </ul>
            </div>

            <DialogFooter className="flex flex-col rounded-b-lg gap-2 w-full items-center border-t bg-muted/50 px-6 py-3">
              <DialogClose asChild>
                <Button disabled={loading} variant={"default"} size={"sm"}>
                  Let’s Get Started
                </Button>
              </DialogClose>
              <Button
                type="button"
                disabled={loading}
                onClick={handleOnboardingSkip}
                variant={"secondary"}
                size={"sm"}
              >
                {loading ? (
                  <Loader2 className="inline-block animate-spin" />
                ) : (
                  "skip"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <section className="min-h-screen py-4 px-4 md:py-6 md:px-6 relative overflow-hidden">
      <div className="flex w-full h-full flex-col py-4 px-4 gap-6">
        <div className="mx-auto w-full md:max-w-xl max-w-full">
          <Card>
            <CardContent>{current}</CardContent>
            <CardFooter>
              <Field orientation={"horizontal"}>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={goToPrevious}
                >
                  Back
                </Button>
                <Button type="button" onClick={goToNext}>
                  Next
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
