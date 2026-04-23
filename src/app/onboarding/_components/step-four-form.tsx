"use client";
import { ICandidateProfile } from "@/@types/candidate-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingStore } from "@/features/candidate-onboarding-store";
import { handleApiError } from "@/lib/api/use-api-error";
import { useApiMutation } from "@/lib/api/use-query";
import { JobPreferencesFormValues } from "@/schema/candidate-onboarding-schema";
import { Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface StepFourProps {
  form: UseFormReturn<JobPreferencesFormValues>;
  handleOnboardingSkip: () => Promise<void>;
  loading: boolean;
}

const currency = [
  {
    country: "United States",
    currency_name: "Dollar",
    code: "USD",
    symbol: "$",
  },
  {
    country: "Euro Member Countries",
    currency_name: "Euro",
    code: "EUR",
    symbol: "€",
  },
  {
    country: "United Kingdom",
    currency_name: "Pound Sterling",
    code: "GBP",
    symbol: "£",
  },
  {
    country: "Japan",
    currency_name: "Yen",
    code: "JPY",
    symbol: "¥",
  },
  {
    country: "China",
    currency_name: "Yuan Renminbi",
    code: "CNY",
    symbol: "¥",
  },
  {
    country: "India",
    currency_name: "Rupee",
    code: "INR",
    symbol: "₹",
  },
  {
    country: "Russia",
    currency_name: "Ruble",
    code: "RUB",
    symbol: "₽",
  },
  {
    country: "Canada",
    currency_name: "Canada Dollar",
    code: "CAD",
    symbol: "$",
  },
  {
    country: "Australia",
    currency_name: "Australia Dollar",
    code: "AUD",
    symbol: "$",
  },
  {
    country: "Switzerland",
    currency_name: "Franc",
    code: "CHF",
    symbol: "CHF",
  },
  {
    country: "Mexico",
    currency_name: "Peso",
    code: "MXN",
    symbol: "$",
  },
];

export default function StepFourForm({
  form,
  loading,
  handleOnboardingSkip,
}: StepFourProps) {
  const router = useRouter();
  const anchor = useComboboxAnchor();
  const {
    locations,
    industries,
    desiredRoles,
    addLocations,
    addIndustries,
    removeLocation,
    addDesiredRole,
    removeIndustrie,
    removeDesiredRole,
  } = useOnboardingStore((state) => state);

  const { watch, setValue } = form;
  const [role, setRole] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [industrie, setIndustries] = React.useState<string>("");
  const roles = watch("desiredRoles") ?? [];
  const industrieWatch = watch("preferredIndustries") ?? [];
  const locationWatch = watch("preferredLocations") ?? [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedValue = role?.trim();

      if (trimmedValue) {
        // 1. Update the list by appending the new role
        setValue("desiredRoles", [...roles, trimmedValue], {
          shouldDirty: true,
          shouldTouch: true,
        });
        addDesiredRole(trimmedValue);
        setRole("");
      }
    }
  };
  const handleLocationInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedValue = location?.trim();

      if (trimmedValue) {
        // 1. Update the list by appending the new role
        setValue("preferredLocations", [...locationWatch, trimmedValue], {
          shouldDirty: true,
          shouldTouch: true,
        });
        addLocations(trimmedValue);
        setLocation("");
      }
    }
  };
  const handleIndustriesInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedValue = industrie?.trim();

      if (trimmedValue) {
        // 1. Update the list by appending the new role
        setValue("preferredLocations", [...industrieWatch, trimmedValue], {
          shouldDirty: true,
          shouldTouch: true,
        });
        addIndustries(trimmedValue);
        setIndustries("");
      }
    }
  };

  const removeRole = (type: string, index: number) => {
    if (type == "role") {
      setValue(
        "desiredRoles",
        desiredRoles.filter((_, i) => i !== index),
        { shouldValidate: true },
      );
      removeDesiredRole(index);
    } else if (type === "location") {
      setValue(
        "preferredLocations",
        locations.filter((_, i) => i !== index),
        { shouldValidate: true },
      );
      removeLocation(index);
    } else if (type === "industries") {
      setValue(
        "preferredIndustries",
        industries.filter((_, i) => i !== index),
        { shouldValidate: true },
      );
      removeIndustrie(index);
    }
  };

  const { mutate, isPending } = useApiMutation<
    ICandidateProfile,
    JobPreferencesFormValues
  >(`/candidate/onboarding/step-4`, "PATCH", {
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        router.push("/candidate");
      }
    },
    onError: (err) => {
      toast.error(handleApiError(err));
      console.log(handleApiError(err));
    },
  });

  const handleSubmitForm = (data: JobPreferencesFormValues) => {
    mutate(data);
  };
  const noError = (err: FieldErrors<JobPreferencesFormValues>) => {
    const firstError = Object.keys(err)[0];
    if (firstError) {
      document.getElementsByName(firstError)[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    console.log(err);
    // Optional toast
    toast.error("Please fix the errors before continuing");
  };
  return (
    <Card className="pb-0 @container/card w-full">
      <form noValidate onSubmit={form.handleSubmit(handleSubmitForm, noError)}>
        <CardContent>
          <FieldSet>
            <FieldLegend>Job preference</FieldLegend>
            <FieldDescription>
              Update your jobs preference to optimized jobs list.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <Controller
                  control={form.control}
                  name="desiredSalaryMin"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="desiredSalaryMin">
                        Minimum Salary
                      </FieldLabel>
                      <Input
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                        value={field.value ?? ""}
                        onBlur={field.onBlur}
                        type="number"
                        id="desiredSalaryMin"
                        ref={field.ref}
                        name="desiredSalaryMin"
                        placeholder="e.g: 80000"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="desiredSalaryMax"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="desiredSalaryMax">
                        Maximum Salary
                      </FieldLabel>
                      <Input
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                        value={field.value ?? ""}
                        onBlur={field.onBlur}
                        type="number"
                        ref={field.ref}
                        id="desiredSalaryMax"
                        name="desiredSalaryMax"
                        placeholder="e.g: 180000"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="currency"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="currency">Currency</FieldLabel>
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currency.map((item) => (
                            <SelectItem
                              className="flex flex-1 gap-2 items-center"
                              key={`onboarding-${item.currency_name}`}
                              value={item.code}
                            >
                              <span>{item.country}</span>
                              <span>{item.symbol}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <div className="block">
                  <Field>
                    <FieldLabel htmlFor="preferredLocations">
                      Preferred Locations
                    </FieldLabel>
                    <div className="flex flex-wrap items-start gap-2">
                      {locations.map((role, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="gap-1 pl-2.5 pr-1.5 py-1"
                        >
                          {role}
                          <Button
                            size={"icon-xs"}
                            variant={"outline"}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRole("location", idx);
                            }}
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="size-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      type="text"
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyDown={handleLocationInputKeyDown}
                      value={location}
                      id="preferredLocations"
                      name="preferredLocations"
                      placeholder="e.g : India, Germany, Russia"
                    />
                    <FieldDescription className="text-xs">
                      Type location and press Enter...
                    </FieldDescription>
                  </Field>
                </div>
                <div className="block">
                  <Field>
                    <FieldLabel htmlFor="preferredIndustries">
                      Preferred Industries
                    </FieldLabel>
                    <div className="flex flex-wrap items-start gap-2">
                      {industries.map((role, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="gap-1 pl-2.5 pr-1.5 py-1"
                        >
                          {role}
                          <Button
                            size={"icon-xs"}
                            variant={"outline"}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRole("industries", idx);
                            }}
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="size-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      type="text"
                      id="preferredIndustries"
                      placeholder="e.g. Fintech, SaaS, E-commerce..."
                      onChange={(e) => setIndustries(e.target.value)}
                      onKeyDown={handleIndustriesInputKeyDown}
                      value={industrie}
                    />
                    <FieldDescription className="text-xs">
                      Type Industries and press Enter...
                    </FieldDescription>
                  </Field>
                </div>
                <div className="block ">
                  <Field>
                    <FieldLabel htmlFor="role">Desired Roles</FieldLabel>
                    <div className="flex flex-wrap items-start gap-2">
                      {desiredRoles.map((role, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="gap-1 pl-2.5 pr-1.5 py-1"
                        >
                          {role}
                          <Button
                            size={"icon-xs"}
                            variant={"outline"}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRole("role", idx);
                            }}
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="size-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      id="role"
                      type="text"
                      placeholder="e.g Full stack, Sales"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <FieldDescription className="text-xs">
                      Type role and press Enter...
                    </FieldDescription>
                    {/* <FieldError errors={[fieldState.error]} /> */}
                  </Field>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <Controller
                  control={form.control}
                  name="workModePreference"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="workModePreference">
                        Work Mode Preference
                      </FieldLabel>
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Work Mode Preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {["REMOTE", "HYBRID", "ONSITE", "ANY"].map(
                            (place) => (
                              <SelectItem
                                key={`workModePreference-${place}`}
                                value={place}
                              >
                                {place}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="preferredCompanySize"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="preferredCompanySize">
                        Company Size
                      </FieldLabel>
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Company Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {["STARTUP", "SME", "MID_SIZE", "LARGE", "ANY"].map(
                            (size) => (
                              <SelectItem
                                key={`preferredCompanySize-${size}`}
                                value={size}
                              >
                                {size}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="preferredJobTypes"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="preferredJobTypes">
                        Job Types
                      </FieldLabel>

                      <Combobox
                        onValueChange={onChange}
                        value={value}
                        multiple
                        autoHighlight
                        items={
                          [
                            "FULL_TIME",
                            "PART_TIME",
                            "CONTRACT",
                            "INTERNSHIP",
                          ] as const
                        }
                      >
                        <ComboboxChips ref={anchor} className="w-full max-w-xs">
                          <ComboboxValue>
                            {(values) => (
                              <React.Fragment>
                                {values.map((value: string) => (
                                  <ComboboxChip key={value}>
                                    {value}
                                  </ComboboxChip>
                                ))}
                                <ComboboxChipsInput placeholder="choose job types" />
                              </React.Fragment>
                            )}
                          </ComboboxValue>
                        </ComboboxChips>
                        <ComboboxContent anchor={anchor}>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-2 items-center">
                <Controller
                  control={form.control}
                  name="openToRelocate"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel>Open To Relocate</FieldLabel>
                      <RadioGroup
                        value={
                          value === true
                            ? "openToRelocate-yes"
                            : "openToRelocate-no"
                        }
                        onValueChange={(val) =>
                          onChange(val === "openToRelocate-yes")
                        }
                        defaultValue="openToRelocate-yes"
                        className="inline-flex items-center"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="openToRelocate-yes"
                            id="openToRelocate-yes"
                          />
                          <FieldLabel htmlFor="openToRelocate-yes">
                            Yes
                          </FieldLabel>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="openToRelocate-no"
                            id="openToRelocate-no"
                          />
                          <FieldLabel htmlFor="openToRelocate-no">
                            No
                          </FieldLabel>
                        </div>
                      </RadioGroup>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="isOpenToWork"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel>Profile Open To Work</FieldLabel>
                      <RadioGroup
                        defaultValue="isOpenToWork-yes"
                        onValueChange={(val) =>
                          onChange(val === "isOpenToWork-yes")
                        }
                        value={
                          value === true
                            ? "isOpenToWork-yes"
                            : "isOpenToWork-no"
                        }
                        className="inline-flex items-center"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isOpenToWork-yes"
                            id="isOpenToWork-yes"
                          />
                          <FieldLabel htmlFor="isOpenToWork-yes">
                            Yes
                          </FieldLabel>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isOpenToWork-no"
                            id="isOpenToWork-no"
                          />
                          <FieldLabel htmlFor="isOpenToWork-no">No</FieldLabel>
                        </div>
                      </RadioGroup>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="isProfilePublic"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel>Profile Public?</FieldLabel>
                      <RadioGroup
                        onValueChange={(val) =>
                          onChange(val === "isProfilePublic-yes")
                        }
                        value={
                          value === true
                            ? "isProfilePublic-yes"
                            : "isProfilePublic-no"
                        }
                        defaultValue="isProfilePublic-yes"
                        className="inline-flex items-center"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isProfilePublic-yes"
                            id="isProfilePublic-yes"
                          />
                          <FieldLabel htmlFor="isProfilePublic-yes">
                            Yes
                          </FieldLabel>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isProfilePublic-no"
                            id="isProfilePublic-no"
                          />
                          <FieldLabel htmlFor="isProfilePublic-no">
                            No
                          </FieldLabel>
                        </div>
                      </RadioGroup>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-2 items-center">
                <Controller
                  control={form.control}
                  name="noticePeriodDays"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="noticePeriodDays">
                        Notice Period in Days
                      </FieldLabel>
                      <Input
                        type="number"
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                        value={field.value ?? ""}
                        onBlur={field.onBlur}
                        name="noticePeriodDays"
                        id="noticePeriodDays"
                        placeholder="e.g : 30"
                        ref={field.ref}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="isImmediateJoiner"
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Field>
                      <FieldLabel>Are you Immediate Joiner?</FieldLabel>
                      <RadioGroup
                        onValueChange={(val) =>
                          onChange(val === "isImmediateJoiner-yes")
                        }
                        value={
                          value === true
                            ? "isImmediateJoiner-yes"
                            : "isImmediateJoiner-no"
                        }
                        defaultValue="isImmediateJoiner-yes"
                        className="inline-flex items-center"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isImmediateJoiner-yes"
                            id="isImmediateJoiner-yes"
                          />
                          <FieldLabel htmlFor="isImmediateJoiner-yes">
                            Yes
                          </FieldLabel>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="isImmediateJoiner-no"
                            id="isImmediateJoiner-no"
                          />
                          <FieldLabel htmlFor="isImmediateJoiner-no">
                            No
                          </FieldLabel>
                        </div>
                      </RadioGroup>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex mt-2 flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
          <Field orientation={"horizontal"}>
            <Button
              onClick={handleOnboardingSkip}
              variant={"secondary"}
              size={"lg"}
              type="button"
              disabled={loading}
            >
              {loading ? (
                <Loader className="size-5 inline-block animate-spin" />
              ) : (
                "Skip"
              )}
            </Button>
            <Button
              disabled={isPending}
              variant={"outline"}
              size={"lg"}
              type="submit"
            >
              {isPending ? (
                <Loader className="size-5 inline-block animate-spin" />
              ) : (
                "Finish"
              )}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
