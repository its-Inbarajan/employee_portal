"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ProfessionalInfoFormValues,
  professionalInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/lib/api/use-query";
import { ICandidateProfile } from "@/@types/candidate-types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/api/use-api-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
interface Props {
  defaultValues: ProfessionalInfoFormValues;
}

export default function StepTwoForm({ defaultValues }: Readonly<Props>) {
  const router = useRouter();
  const form = useForm<ProfessionalInfoFormValues>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      currentCompany: defaultValues.currentCompany ?? "",
      currentCtc: defaultValues.currentCtc ?? "",
      currentTitle: defaultValues?.currentTitle ?? "",
      experienceLevel: defaultValues.experienceLevel ?? "FRESHER",
      professionalCategory: defaultValues.professionalCategory ?? "TECHNOLOGY",
      totalExperienceYears: defaultValues.totalExperienceYears ?? undefined,
    },
  });

  const { mutate, isPending } = useApiMutation<
    ICandidateProfile,
    ProfessionalInfoFormValues
  >("/candidate/onboarding/step-2", "PATCH", {
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        router.push("/onboarding/step-3");
      }
    },
    onError: (err) => {
      toast.error(handleApiError(err));
      console.log(handleApiError(err));
    },
  });

  return (
    <Card className="@container/card pb-0 relative">
      <form noValidate onSubmit={form.handleSubmit((values) => mutate(values))}>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>
                Tell us about your professional experience
              </FieldLegend>
              <FieldDescription>
                This helps employers know who you are.
              </FieldDescription>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="professionalCategory"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="professionalCategory">
                        Professional Category
                      </FieldLabel>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="professionalCategory">
                          <SelectValue placeholder="Professional Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "TECHNOLOGY",
                            "DESIGN",
                            "PRODUCT",
                            "MARKETING",
                            "SALES",
                            "FINANCE",
                            "OPERATIONS",
                            "HUMAN_RESOURCES",
                            "LEGAL",
                            "HEALTHCARE",
                            "EDUCATION",
                            "CREATIVE",
                            "CONSULTING",
                            "OTHER",
                          ].map((item) => (
                            <SelectItem
                              key={`professionalCategory-${item}`}
                              value={item}
                              className="capitalize"
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Controller
                    control={form.control}
                    name="currentTitle"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="currentTitle">
                          Current Titlte
                        </FieldLabel>
                        <Input
                          type="text"
                          autoComplete="off"
                          id="currentTitle"
                          placeholder="current title"
                          {...field}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="currentCompany"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="currentCompany">
                          Current Company
                        </FieldLabel>
                        <Input
                          type="text"
                          autoComplete="off"
                          id="currentCompany"
                          {...field}
                          placeholder="current company name"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  control={form.control}
                  name="totalExperienceYears"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="totalExperienceYears">
                        Total Experience Years
                      </FieldLabel>
                      <Input
                        type="number"
                        id="totalExperienceYears"
                        placeholder="total experience years"
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value),
                          )
                        }
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="experienceLevel"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="experienceLevel">
                        Experience Level
                      </FieldLabel>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="experienceLevel">
                          <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "FRESHER",
                            "JUNIOR",
                            "MID",
                            "SENIOR",
                            "LEAD",
                            "PRINCIPAL",
                            "EXECUTIVE",
                          ].map((item) => (
                            <SelectItem
                              key={`experienceLevel-${item}`}
                              value={item}
                              className="capitalize"
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="currentCtc"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="currentCtc">Current CTC</FieldLabel>
                      <Input
                        autoComplete="off"
                        id="currentCtc"
                        placeholder="current ctc"
                        type="number"
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex mt-4 flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
          <Button
            disabled={isPending}
            variant={"outline"}
            size={"lg"}
            className="w-full"
          >
            {isPending ? (
              <Loader className="inline-block size-5 animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
