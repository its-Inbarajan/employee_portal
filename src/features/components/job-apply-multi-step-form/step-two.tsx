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
import { useApplyJob } from "@/features/store";
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

type StepTwoProps = {
  handleStepBack: () => void;
  handleNextStep: () => void;
};
export default function StepTwo({
  handleStepBack,
  handleNextStep,
}: StepTwoProps) {
  const setData = useApplyJob((state) => state.setData);
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
    setData(data);
    handleNextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FieldLabel className="text-sm md:text-lg font-medium text-gray-500">
              How Many years of Experience do you have?
            </FieldLabel>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="exp.year">Year</FieldLabel>
                <Controller
                  name="exp.year"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="exp.year"
                      type="text"
                      placeholder="Year"
                      required
                      autoFocus={true}
                    />
                  )}
                />
                <FieldError>{errors.exp?.year?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="exp.month">Month</FieldLabel>

                <Controller
                  name="exp.month"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="exp.month"
                      type="text"
                      placeholder="Month"
                      required
                    />
                  )}
                />
                <FieldError>{errors.exp?.month?.message}</FieldError>
              </Field>
            </div>

            <FieldLabel className="text-sm md:text-lg font-medium text-gray-500">
              what is your current/last CTC and ECTC?
            </FieldLabel>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="ctc">Current/Last CTC</FieldLabel>
                <Controller
                  name="ctc"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="ctc"
                      type="text"
                      placeholder="ctc"
                      required
                    />
                  )}
                />
                <FieldError>{errors?.address?.state?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="ectc">Expected CTC</FieldLabel>

                <Controller
                  name="ectc"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="ectc"
                      type="text"
                      placeholder="ectc"
                      required
                    />
                  )}
                />
                <FieldError>{errors.exp?.month?.message}</FieldError>
              </Field>
            </div>

            <FieldLabel className="text-sm md:text-lg font-medium text-gray-500">
              Address
            </FieldLabel>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="address.state">State</FieldLabel>
                <Controller
                  name="address.state"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="address.state"
                      type="text"
                      placeholder="state"
                      required
                    />
                  )}
                />
                <FieldError>{errors?.address?.state?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="address.city">city</FieldLabel>

                <Controller
                  name="address.city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="address.city"
                      type="text"
                      placeholder="city"
                      required
                    />
                  )}
                />
                <FieldError>{errors.exp?.month?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="address.zip">zip</FieldLabel>

                <Controller
                  name="address.zip"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="address.zip"
                      type="text"
                      placeholder="zip"
                      required
                    />
                  )}
                />
                <FieldError>{errors.exp?.month?.message}</FieldError>
              </Field>
            </div>

            <FieldLabel className="text-sm md:text-lg font-medium text-gray-500">
              what is your Current location?
            </FieldLabel>
            <div className="flex md:flex-row flex-col items-center gap-2">
              <Field>
                <FieldLabel htmlFor="location.current_loc">
                  Current location
                </FieldLabel>
                <Controller
                  name="location.current_loc"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="location.current_loc"
                      type="text"
                      placeholder="current location"
                      required
                    />
                  )}
                />
                <FieldError>
                  {errors?.location?.current_loc?.message}
                </FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="location.preferred_loc">
                  Preferred Location
                </FieldLabel>

                <Controller
                  name="location.preferred_loc"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="location.preferred_loc"
                      type="text"
                      placeholder="preferred location"
                      required
                    />
                  )}
                />
                <FieldError>
                  {errors.location?.preferred_loc?.message}
                </FieldError>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
        <div className="mt-2 flex gap-2 justify-end w-full">
          <Button type="button" onClick={handleStepBack}>
            Back
          </Button>
          <Button type="button" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
