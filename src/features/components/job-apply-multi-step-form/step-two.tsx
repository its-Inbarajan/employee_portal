import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { applyJobSchema } from "@/features/job-apply-form-schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const applyJobFormStepTwo = applyJobSchema.pick({
  address: true,
  ectc: true,
  exp: true,
  ctc: true,
  location: true,
  notice_period: true,
  resume: true,
  terms: true,
});

type ApplyJobFormStepTwo = z.infer<typeof applyJobFormStepTwo>;

export default function StepTwo() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ApplyJobFormStepTwo>({
    resolver: zodResolver(applyJobFormStepTwo),
    mode: "onChange",
    defaultValues: {
      address: {
        city: "",
        state: "",
        zip: "",
      },
      ctc: "",
      ectc: "",
      exp: {
        month: "",
        year: "",
      },
      location: {
        current_loc: "",
        preferred_loc: "",
      },
      notice_period: "",
      resume: "",
      terms: false,
    },
  });

  const onSubmit = (data: ApplyJobFormStepTwo) => {
    console.log(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="exp.year">First name</FieldLabel>
                <Controller
                  name="exp.year"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="exp.year"
                      type="text"
                      placeholder="Joe"
                      required
                      autoFocus={true}
                    />
                  )}
                />
                <FieldError>{errors.exp?.year?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="exp.month">Last name</FieldLabel>

                <Controller
                  name="exp.month"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="exp.month"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  )}
                />
                <FieldError>{errors.exp?.month?.message}</FieldError>
              </Field>
            </div>
            {/* <Field>
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
            </Field> */}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <div className="mt-2 flex justify-end w-full">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
