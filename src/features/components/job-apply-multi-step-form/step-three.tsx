"use client";

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { applyJobSchema } from "@/features/job-apply-form-schema/schema";
import { useApplyJob } from "@/features/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderOpen } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const applyFormStepOneSchema = applyJobSchema.pick({
  resume: true,
  terms: true,
  notice_period: true,
});

type ApplyFormStepThreeSchema = z.infer<typeof applyFormStepOneSchema>;

type StepOneProps = {
  handleStepBack: () => void;
};

export default function StepThree({ handleStepBack }: StepOneProps) {
  const setData = useApplyJob((state) => state.setData);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ApplyFormStepThreeSchema>({
    resolver: zodResolver(applyFormStepOneSchema),
    defaultValues: {
      notice_period: "",
      resume: "",
      terms: true,
    },
    mode: "onChange",
  });

  const onSubmit = (data: ApplyFormStepThreeSchema) => {
    try {
      toast.success("Thanks for applying!");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const options = [
    "Immediate joiner",
    "15 Days or less",
    "1 month",
    "2 month",
    "3 month",
    "more that 3 month",
    "serving notice period",
  ];
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FieldLabel className="text-sm md:text-lg font-medium text-gray-500">
              What is your current notice period?
            </FieldLabel>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="notice_period">Notice period</FieldLabel>
                <Controller
                  name="notice_period"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                        <SelectValue placeholder={"Immediate joiner"} />
                      </SelectTrigger>
                      <SelectContent className="border-1 relative z-50 rounded shadow-none">
                        <SelectGroup>
                          <SelectLabel>Notice period</SelectLabel>
                          {options.map((item) => (
                            <SelectItem
                              className="capitalize"
                              id="notice_period"
                              key={`notice_period_${item}`}
                              value={item}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>{errors.notice_period?.message}</FieldError>
              </Field>
            </div>

            {/* Resume */}
            <FieldLabel htmlFor="resume">Resume</FieldLabel>
            <div className="relative h-48 rounded-lg border-dotted border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
              <div className="absolute">
                <div className="flex flex-col items-center">
                  <FolderOpen className="text-blue-700 size-10" />
                  <span className="block text-gray-400 font-normal">
                    Attach you files here
                  </span>
                </div>
              </div>
              <Controller
                control={control}
                name="resume"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="file"
                    id="resume"
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                )}
              />
            </div>

            <FieldGroup>
              <Field orientation="horizontal">
                <Controller
                  name="terms" // The name of your checkbox field
                  control={control} // Pass the control object from useForm
                  render={({
                    field: { onChange, value = true, ...restField },
                  }) => (
                    <input
                      type="checkbox"
                      onChange={(e) => onChange(e.target.checked)} // Update value with e.target.checked
                      checked={value} // The checked state of the checkbox
                      {...restField} // Pass any other field props
                    />
                  )}
                />
                <FieldLabel htmlFor="terms" className="font-normal">
                  I have read and agree to the Terms and Conditions.
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldGroup>
          <div className="mt-2 flex gap-2 justify-end w-full">
            <Button type="button" onClick={handleStepBack}>
              Back
            </Button>
            <DrawerClose asChild>
              <Button type="submit">Submit</Button>
            </DrawerClose>
          </div>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
