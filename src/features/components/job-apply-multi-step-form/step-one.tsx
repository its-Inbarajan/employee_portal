"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema } from "../../job-apply-form-schema/schema";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApplyJob } from "@/features/store";
import { Textarea } from "@/components/ui/textarea";

const applyFormStepOneSchema = applyJobSchema.pick({
  first_name: true,
  last_name: true,
  email: true,
  mobile_no: true,
  brief_intro: true,
});

type ApplyFormStepOneSchema = z.infer<typeof applyFormStepOneSchema>;

type StepOneProps = {
  handleNextStep: () => void;
};

export default function StepOne({ handleNextStep }: StepOneProps) {
  const setData = useApplyJob((state) => state.setData);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplyFormStepOneSchema>({
    resolver: zodResolver(applyFormStepOneSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_no: "",
      brief_intro: "",
    },
  });

  const onSubmit = (data: ApplyFormStepOneSchema) => {
    console.log(data);
    setData(data);
    handleNextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="first_name">First name</FieldLabel>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="first_name"
                      type="text"
                      placeholder="Joe"
                      required
                      autoFocus={true}
                    />
                  )}
                />
                <FieldError>{errors.first_name?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">Last name</FieldLabel>

                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="last_name"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  )}
                />
                <FieldError>{errors.last_name?.message}</FieldError>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="mobile_no">Mobile no</FieldLabel>
              <Controller
                name="mobile_no"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="mobile_no"
                    type="number"
                    placeholder="123456789"
                    required
                  />
                )}
              />
              <FieldError>{errors.mobile_no?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Joe"
                    required
                  />
                )}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="brief_intro">Brief Introduction</FieldLabel>
              <Controller
                name="brief_intro"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="brief_intro"
                    placeholder="Tell us about yourself..."
                    required
                    className="h-[12rem] rounded-md text-sm leading-relaxed shadow"
                  />
                )}
              />
              <FieldError>{errors.brief_intro?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <div className="mt-2 flex justify-end w-full">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
