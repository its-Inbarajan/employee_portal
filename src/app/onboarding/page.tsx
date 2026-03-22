"use client";

import Stepper from "@/components/stepper";
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface OnboardingSkip {
  data: { message: string };
  message: string;
  success: boolean;
  statusCode: number;
}

export default function CandidateOnboarding() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(true);

  const handleDialogOpenChange = () => {
    setOpen(!open);
  };

  const handleOnboardingSkip = async () => {
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
                <Button variant={"default"} size={"sm"}>
                  Let’s Get Started
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={handleOnboardingSkip}
                variant={"secondary"}
                size={"sm"}
              >
                skip
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
        <Stepper />
        <div className="mx-auto  w-full md:max-w-xl max-w-full">
          <form action="" noValidate>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Personal Information</FieldLegend>
                <FieldDescription>
                  Please provide your personal details for our records
                </FieldDescription>
                <FieldGroup className="space-y-5">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        type="text"
                        autoComplete="name"
                        id="firstName"
                        placeholder="john"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        type="text"
                        autoComplete="name"
                        id="lastName"
                        placeholder="wick"
                      />
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <Field>
                      <FieldLabel htmlFor="phoneNumber">
                        Phone Number
                      </FieldLabel>
                      <Input
                        type="number"
                        autoComplete="cc-number"
                        id="phoneNumber"
                        placeholder="12345678910"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="dateOfBirth">
                        Date Of Birth
                      </FieldLabel>
                      <Input
                        type="date"
                        autoComplete="bday-day"
                        id="dateOfBirth"
                      />
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-3 w-full gap-2">
                    <Field>
                      <FieldLabel htmlFor="contry">Contry</FieldLabel>
                      <Input id="contry" placeholder="Contry" type="text" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="state">state</FieldLabel>
                      <Input id="state" placeholder="state" type="text" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="city">city</FieldLabel>
                      <Input id="city" placeholder="City" type="text" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "male",
                          "female",
                          "others",
                          "prefered not to say.",
                        ].map((item) => (
                          <SelectItem
                            key={`gender-${item}`}
                            value={item}
                            className="capitalize"
                          >
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field
                orientation="horizontal"
                className="flex items-end justify-end"
              >
                <Button type="submit" variant={"default"} size={"lg"}>
                  Next
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
}
