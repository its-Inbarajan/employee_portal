import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { inviteRecruitersValue } from "@/schema/recruter-onboarding-schema";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
const ROLE = [
  "OWNER",
  "ADMIN",
  "RECRUITER",
  "HIRING_MANAGER",
  "INTERVIEWER",
  "AGENCY",
] as const;

interface InviteRecruitersFormProps {
  control: Control<inviteRecruitersValue>;
}

export default function InviteRecruitersForm({
  control,
}: InviteRecruitersFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invitation",
  });
  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-3 gap-3 place-items-center"
            >
              <Controller
                name={`invitation.${index}.email` as const} // Dynamic indexed path mapping
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Field>
                    <FieldLabel
                      htmlFor={`invitation.${index}.email`}
                      className="after:content-['*'] after:text-red-500"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id={`invitation.${index}.email`}
                      placeholder="recruiter@example.com"
                    />
                    <FieldError
                      className="text-red-500 text-xs mb-0"
                      errors={[error]}
                    />
                  </Field>
                )}
              />

              <Controller
                name={`invitation.${index}.role` as const} // Dynamic indexed path mapping
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Field>
                    <FieldLabel
                      className="after:content-['*'] after:text-red-500"
                      htmlFor={`invitation.${index}.role` as const}
                    >
                      Role
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="RECRUITER" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ROLE.map((item) => (
                            <SelectItem
                              key={`invitation-role-${item}`}
                              value={item}
                            >
                              {item.split("_").join(" ")}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError
                      className="text-red-500 text-xs mb-0"
                      errors={[error]}
                    />
                  </Field>
                )}
              />
              <Field orientation={"horizontal"} className="md:mt-7">
                <Button
                  onClick={() => append({ email: "", role: "RECRUITER" })}
                  size={"icon-sm"}
                  variant={"default"}
                  type="button"
                >
                  <Plus />
                </Button>

                <Button
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  size={"icon-sm"}
                  variant={"destructive"}
                  type="button"
                >
                  <Minus />
                </Button>
              </Field>
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
