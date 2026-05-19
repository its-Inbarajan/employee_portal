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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { onboardingDetailsValue } from "@/schema/recruter-onboarding-schema";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface CompanyDetailsFormProps {
  control: Control<onboardingDetailsValue>;
}

export default function CompanyDetailsForm({
  control,
}: CompanyDetailsFormProps) {
  return (
    <div>
      <FieldSet className="gap-2.5">
        <FieldLegend>Company Basic Details</FieldLegend>
        <FieldDescription>
          Please fill all the fields that marks with *
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="company_name"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="company_name"
                    className="after:content-['*'] after:text-red-500"
                  >
                    Company Name
                  </FieldLabel>
                  <Input
                    type="text"
                    id="company_name"
                    placeholder="abc pvt"
                    {...field}
                  />
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />

            <Controller
              name="company_email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="company_email"
                    className="after:content-['*'] after:text-red-500"
                  >
                    Company email
                  </FieldLabel>
                  <Input
                    type="text"
                    id="company_email"
                    placeholder="info@company.com"
                    {...field}
                  />
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />

            <Controller
              name="company_website"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="company_website"
                    className="after:content-['*'] after:text-red-500"
                  >
                    Company website
                  </FieldLabel>
                  <Input
                    type="url"
                    id="company_email"
                    placeholder="https://www.companyname.com"
                    {...field}
                  />
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />
          </div>

          <Controller
            name="company_about"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="company_about"
                  className="after:content-['*'] after:text-red-500"
                >
                  About
                </FieldLabel>
                <Textarea
                  placeholder="Tell candidate about you."
                  id="company_about"
                  {...field}
                />
                <FieldError
                  className="text-red-500 text-xs mb-0"
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="company_industry"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="company_industry"
                    className="after:content-['*'] after:text-red-500"
                  >
                    Company Industry
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="company_industry"
                    placeholder="industry"
                  />
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />

            <Controller
              name="company_location"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="company_location"
                    className="after:content-['*'] after:text-red-500"
                  >
                    Company Location
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="company_location"
                    placeholder="location"
                  />
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />

            <Controller
              name="company_size"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    className="after:content-['*'] after:text-red-500"
                    htmlFor="company_size"
                  >
                    Company Size
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "1-10",
                          "11-50",
                          "51-200",
                          "201-500",
                          "501-1000",
                          "1001-5000",
                          "5000+",
                        ].map((item) => (
                          <SelectItem value={item} key={`company_size-${item}`}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError
                    className="text-red-500 text-xs mb-0"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />
          </div>

          <Controller
            name="company_logo"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="company_logo">Company Logo</FieldLabel>
                <Input type="file" id="company_logo" {...field} />
                <FieldError
                  className="text-red-500 text-xs mb-0"
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
