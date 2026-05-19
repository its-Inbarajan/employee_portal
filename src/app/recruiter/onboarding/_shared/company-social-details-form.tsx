import { Button } from "@/components/ui/button";
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
import { companySocialMediaValue } from "@/schema/recruter-onboarding-schema";
import { Minus, Plus } from "lucide-react";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  control: Control<companySocialMediaValue>;
  register: UseFormRegister<companySocialMediaValue>;
  errors: FieldErrors<companySocialMediaValue>;
}

export default function CompanySocialDetailsForm({
  control,
  errors,
  register,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_medias",
  });

  return (
    <Field>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Social Profiles</FieldLegend>
          <FieldDescription>
            Please make sure all the urls start with https
          </FieldDescription>
          <Controller
            name="linkedin"
            control={control}
            render={({
              field: { name, onBlur, onChange, ref, value },
              fieldState,
            }) => (
              <Field className="gap-1">
                <FieldLabel
                  htmlFor="linkedin"
                  className="after:content-['*'] after:text-red-500"
                >
                  Linked In
                </FieldLabel>
                <Input
                  type="url"
                  id="linkedin"
                  name={name}
                  placeholder="linked in profile"
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={onChange}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Field className="gap-1 space-y-2">
            <FieldLabel
              htmlFor="social_medias"
              className="after:content-['*'] after:text-red-500"
            >
              Social Medias
            </FieldLabel>
            {fields.map((item, indx) => (
              <Field key={item.id} orientation={"horizontal"}>
                <Field orientation={"responsive"}>
                  <Input
                    type="url"
                    id="social_medias"
                    {...register(`social_medias.${indx}.url` as const)}
                    defaultValue={item.url}
                    placeholder="e.g facebook, reddit, instagram etc"
                  />
                  {errors.social_medias?.[indx]?.url && (
                    <FieldError className="text-red-500 text-xs mb-0">
                      {errors.social_medias[indx]?.url?.message}
                    </FieldError>
                  )}
                </Field>
                <Button
                  onClick={() => append({ url: "" })}
                  type="button"
                  variant={"outline"}
                  size={"icon-sm"}
                >
                  <Plus />
                </Button>

                <Button
                  disabled={fields.length === 1}
                  onClick={() => remove(indx)}
                  type="button"
                  className="disabled:cursor-not-allowed"
                  variant={"destructive"}
                  size={"icon-sm"}
                >
                  <Minus />
                </Button>
              </Field>
            ))}
          </Field>
        </FieldSet>
      </FieldGroup>
    </Field>
  );
}
