"use client";

import { JobApplication, JobListProps } from "@/@types/jobs";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

type ApplyFormProps = {
  job?: JobListProps;
  initial?: Partial<JobApplication>;
  onSubmit?: () => void;
};

export function ApplyForm({ initial, job, onSubmit }: ApplyFormProps) {
  return (
    <div className="md:px-4 md:py-4 px-2 py-2">
      <div className="grid grid-cols-12 gap-5 items-start w-full">
        <div className="col-span-12 sm:col-span-6">
          <div className="flex flex-col space-y-1 justify-self-start">
            <h1 className="font-semibold text-xl leading-relaxed text-black">
              {job?.title}
            </h1>
            <p className="font-normal text-balance leading-relaxed tracking-wide text-sm text-black">
              {job?.description}
            </p>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <form noValidate onSubmit={onSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <div className="flex md:flex-row flex-col items-center gap-2">
                    <Field>
                      <FieldLabel htmlFor="first_name">First name</FieldLabel>
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="Joe"
                        required
                        autoFocus={true}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                      <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="john"
                        required
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </Field>
                  <div className="flex md:flex-row flex-col items-center gap-3">
                    <Field>
                      <FieldLabel htmlFor="state">state</FieldLabel>
                      <Input
                        id="state"
                        placeholder="state"
                        name="state"
                        type="text"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="city">city</FieldLabel>
                      <Input
                        id="city"
                        placeholder="city"
                        name="city"
                        type="text"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="zip">zip</FieldLabel>
                      <Input
                        id="zip"
                        placeholder="zip"
                        name="zip"
                        type="number"
                        required
                      />
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
