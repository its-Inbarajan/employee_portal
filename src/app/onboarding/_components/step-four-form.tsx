import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
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
import { JobPreferencesFormValues } from "@/schema/candidate-onboarding-schema";
import { Loader } from "lucide-react";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

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
  const addDesiredRole = useOnboardingStore((state) => state.addDesiredRole);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDesiredRole("");
    }
  };
  return (
    <Card className="pb-0 @container/card w-full">
      <form noValidate>
        <CardContent>
          <FieldSet>
            <FieldLegend>Job preference</FieldLegend>
            <FieldDescription>
              Update your jobs preference to optimized jobs list.
            </FieldDescription>
            <FieldGroup>
              <Controller
                control={form.control}
                name="desiredRoles"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Field>
                    <FieldLabel htmlFor="desiredRoles">
                      Desired Roles
                    </FieldLabel>
                    <Input
                      id="desiredRoles"
                      type="text"
                      placeholder="e.g Full stack, Sales"
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      onKeyDown={handleKeyDown}
                    />
                    <FieldDescription className="text-xs">
                      Type role and press Enter...
                    </FieldDescription>
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <Field>
                  <FieldLabel htmlFor="desiredSalaryMin">
                    Minimum Salary
                  </FieldLabel>
                  <Input
                    type="number"
                    id="desiredSalaryMin"
                    name="desiredSalaryMin"
                    placeholder="e.g: 80000"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="desiredSalaryMax">
                    Maximum Salary
                  </FieldLabel>
                  <Input
                    type="number"
                    id="desiredSalaryMax"
                    name="desiredSalaryMax"
                    placeholder="e.g: 180000"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="currency">Currency</FieldLabel>
                  <Select>
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
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                <Field>
                  <FieldLabel htmlFor="preferredLocations">
                    Preferred Locations
                  </FieldLabel>
                  <Input
                    type="text"
                    id="preferredLocations"
                    placeholder="e.g : India, Germany, Russia"
                  />
                  <FieldDescription className="text-xs">
                    Type location and press Enter...
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="preferredIndustries">
                    Preferred Industries
                  </FieldLabel>
                  <Input
                    type="text"
                    id="preferredIndustries"
                    placeholder="e.g : India, Germany, Russia"
                  />
                  <FieldDescription className="text-xs">
                    Type Industries and press Enter...
                  </FieldDescription>
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <Field>
                  <FieldLabel htmlFor="workModePreference">
                    Work Mode Preference
                  </FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Work Mode Preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {["REMOTE", "HYBRID", "ONSITE", "ANY"].map((place) => (
                        <SelectItem
                          key={`workModePreference-${place}`}
                          value={place}
                        >
                          {place}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="preferredCompanySize">
                    Company Size
                  </FieldLabel>
                  <Select>
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
                </Field>
                <Field>
                  <FieldLabel htmlFor="preferredJobTypes">Job Types</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"].map(
                        (type) => (
                          <SelectItem
                            key={`preferredJobTypes-${type}`}
                            value={type}
                          >
                            {type?.split("_").join(" ")}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-2 items-center">
                <Field>
                  <FieldLabel>Open To Relocate</FieldLabel>
                  <RadioGroup
                    defaultValue="openToRelocate-yes"
                    className="inline-flex items-center"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="openToRelocate-yes"
                        id="openToRelocate-yes"
                      />
                      <FieldLabel htmlFor="openToRelocate-yes">Yes</FieldLabel>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="openToRelocate-no"
                        id="openToRelocate-no"
                      />
                      <FieldLabel htmlFor="openToRelocate-no">No</FieldLabel>
                    </div>
                  </RadioGroup>
                </Field>
                <Field>
                  <FieldLabel>Profile Open To Work</FieldLabel>
                  <RadioGroup
                    defaultValue="isOpenToWork-yes"
                    className="inline-flex items-center"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="isOpenToWork-yes"
                        id="isOpenToWork-yes"
                      />
                      <FieldLabel htmlFor="isOpenToWork-yes">Yes</FieldLabel>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="isOpenToWork-no"
                        id="isOpenToWork-no"
                      />
                      <FieldLabel htmlFor="isOpenToWork-no">No</FieldLabel>
                    </div>
                  </RadioGroup>
                </Field>
                <Field>
                  <FieldLabel>Profile Public?</FieldLabel>
                  <RadioGroup
                    defaultValue="isProfilePublic-yes"
                    className="inline-flex items-center"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="isProfilePublic-yes"
                        id="isProfilePublic-yes"
                      />
                      <FieldLabel htmlFor="isProfilePublic-yes">Yes</FieldLabel>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="isProfilePublic-no"
                        id="isProfilePublic-no"
                      />
                      <FieldLabel htmlFor="isProfilePublic-no">No</FieldLabel>
                    </div>
                  </RadioGroup>
                </Field>
              </div>

              <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-2 items-center">
                <Field>
                  <FieldLabel htmlFor="noticePeriodDays">
                    Notice Period in Days
                  </FieldLabel>
                  <Input
                    type="number"
                    name="noticePeriodDays"
                    id="noticePeriodDays"
                    placeholder="e.g : 30"
                  />
                </Field>

                <Field>
                  <FieldLabel>Are you Immediate Joiner?</FieldLabel>
                  <RadioGroup
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
                      <FieldLabel htmlFor="isImmediateJoiner-no">No</FieldLabel>
                    </div>
                  </RadioGroup>
                </Field>
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
            <Button variant={"outline"} size={"lg"} type="submit">
              Finish
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
