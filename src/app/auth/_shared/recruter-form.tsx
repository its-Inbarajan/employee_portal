"use client";
import React from "react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, type Control } from "react-hook-form";
import { basicSigupType } from "@/schema/recruter-onboarding-schema";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Checkbox } from "@/components/ui/checkbox";

type RecruterFormProps = {
  control: Control<basicSigupType>;
};

export default function RecruterForm({ control }: RecruterFormProps) {
  const [show, setShow] = React.useState<boolean>(false);
  const handleShowPassword = () => {
    setShow(!show);
  };
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend className="text-center lg:w-xs text-xl font-semibold leading-6">
          Sign up to get started with your organization
        </FieldLegend>

        <FieldGroup className="gap-3.5">
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="family-name"
                  placeholder="John wick"
                  required
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="work_email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="work_email">Work Email</FieldLabel>
                <Input
                  {...field}
                  autoComplete="work email webauthn"
                  id="work_email"
                  type="email"
                  name="email"
                  placeholder="example@company.com"
                  required
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={show ? "text" : "password"}
                    {...field}
                    name="password"
                    autoComplete="new-password"
                    placeholder="******"
                  />
                  <InputGroupButton type="button" onClick={handleShowPassword}>
                    {show ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroup>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="phoneNumber">
                  Mobile Number (Optional)
                </FieldLabel>
                <PhoneInput
                  autoComplete="cc-number"
                  id="phoneNumber"
                  international
                  name="phoneNumber"
                  placeholder="+91 1234567890"
                  defaultCountry="IN"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="recruiterType"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="recruiterType">Recruiter Type</FieldLabel>
                <RadioGroup
                  id="recruiterType"
                  defaultValue="INHOUSE"
                  value={value}
                  onValueChange={onChange}
                  className="flex flex-wrap flex-row gap-5"
                >
                  <div className="inline-flex items-center  gap-3">
                    <RadioGroupItem
                      defaultChecked
                      value="INHOUSE"
                      id="INHOUSE"
                    />
                    <FieldLabel htmlFor="INHOUSE">
                      In-house (Corporate)
                    </FieldLabel>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <RadioGroupItem value="AGENCY" id="AGENCY" />
                    <FieldLabel htmlFor="AGENCY">Agency/Third-party</FieldLabel>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <RadioGroupItem value="FREELANCE" id="FREELANCE" />
                    <FieldLabel htmlFor="FREELANCE">Freelance</FieldLabel>
                  </div>
                </RadioGroup>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="terms"
            render={({ field, fieldState }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="terms"
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  value={String(field.value)}
                  checked={field.value}
                  name="terms"
                />
                <FieldContent>
                  <FieldLabel htmlFor="terms">
                    I agree to the Terms and Conditions.
                  </FieldLabel>
                  <FieldError errors={[fieldState.error]} />
                  {/* <FieldDescription>
                      This application is fully developers personal project to
                      showcase his skill in full stack development. so,
                      don&#39;t use any personal informations to access the
                      application.
                    </FieldDescription> */}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
