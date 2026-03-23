import {
  Field,
  FieldDescription,
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
import React from "react";

export default function StepOne() {
  return (
    <div>
      <form action="" noValidate>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Personal Information</FieldLegend>
            <FieldDescription>
              Please provide your personal details for our records
            </FieldDescription>
            <FieldGroup className="space-y-5">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    type="text"
                    autoComplete="name"
                    id="firstName"
                    placeholder="john"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    type="text"
                    autoComplete="name"
                    id="lastName"
                    placeholder="wick"
                  />
                </Field>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <Field>
                  <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                  <Input
                    type="number"
                    autoComplete="cc-number"
                    id="phoneNumber"
                    placeholder="12345678910"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="dateOfBirth">Date Of Birth</FieldLabel>
                  <Input type="date" autoComplete="bday-day" id="dateOfBirth" />
                </Field>
              </div>
              <div className="grid md:grid-cols-3 w-full gap-2">
                <Field>
                  <FieldLabel htmlFor="contry">Contry</FieldLabel>
                  <Input id="contry" placeholder="Contry" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="state">state</FieldLabel>
                  <Input id="state" placeholder="state" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="city">city</FieldLabel>
                  <Input id="city" placeholder="City" type="text" />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {["male", "female", "others", "prefered not to say."].map(
                      (item) => (
                        <SelectItem
                          key={`gender-${item}`}
                          value={item}
                          className="capitalize"
                        >
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
