"use client";
import { ICandidateProfile } from "@/@types/candidate-types";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleApiError } from "@/lib/api/use-api-error";
import { useApiMutation } from "@/lib/api/use-query";
import {
  BasicsInforFormValues,
  basicsInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  defaultValues?: Partial<BasicsInforFormValues>;
}

export default function StepOneForm({ defaultValues }: Props) {
  const router = useRouter();

  const form = useForm<BasicsInforFormValues>({
    resolver: zodResolver(basicsInfoSchema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      phoneNumber: defaultValues?.phoneNumber ?? "",
      dateOfBirth: defaultValues?.dateOfBirth ?? "",
      gender: defaultValues?.gender ?? "",
      location: {
        city: defaultValues?.location?.city ?? "",
        state: defaultValues?.location?.state ?? "",
        country: defaultValues?.location?.country ?? "",
      },
    },
    mode: "all",
  });

  const { mutate, isPending } = useApiMutation<
    ICandidateProfile,
    BasicsInforFormValues
  >(`/candidate/onboarding/step-1`, "PATCH", {
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        router.push("/onboarding/step-2");
      }
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(handleApiError(err));
    },
  });

  return (
    <Card className="pb-0 relative">
      <form onSubmit={form.handleSubmit((values) => mutate(values))}>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Tell us about yourself</FieldLegend>
              <FieldDescription>
                This helps employers know who you are.
              </FieldDescription>
              <FieldGroup>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <Controller
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <Input
                          type="text"
                          autoComplete="name"
                          id="firstName"
                          placeholder="john"
                          {...field}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                          type="text"
                          autoComplete="name"
                          id="lastName"
                          {...field}
                          placeholder="wick"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <Controller
                    control={form.control}
                    name="phoneNumber"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="phoneNumber">
                          Phone Number
                        </FieldLabel>
                        <Input
                          {...field}
                          type="number"
                          autoComplete="cc-number"
                          id="phoneNumber"
                          placeholder="12345678910"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="dateOfBirth">
                          Date Of Birth
                        </FieldLabel>
                        <Input
                          type="date"
                          autoComplete="bday-day"
                          id="dateOfBirth"
                          value={value}
                          onChange={onChange}
                          // onBlur={field.onBlur}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-3 w-full gap-2">
                  <Controller
                    control={form.control}
                    name="location.country"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="contry">Contry</FieldLabel>
                        <Input
                          id="contry"
                          placeholder="Contry"
                          type="text"
                          {...field}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="location.state"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="state">state</FieldLabel>
                        <Input
                          id="state"
                          placeholder="state"
                          type="text"
                          {...field}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="location.city"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="city">city</FieldLabel>
                        <Input
                          id="city"
                          placeholder="City"
                          {...field}
                          type="text"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="gender">Gender</FieldLabel>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
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
                              value={item.toLocaleUpperCase()}
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
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex mt-4 flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
          <Button variant={"outline"} size={"lg"} className="w-full">
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
