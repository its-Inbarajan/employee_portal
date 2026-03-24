import React from "react";
import StepTwoForm from "../_components/step-two-form";
import { api } from "@/lib/api";
import { ProfessionalInfoFormValues } from "@/schema/candidate-onboarding-schema";

export default async function SteptwoPage() {
  const { data } = await api.get<{ responses: ProfessionalInfoFormValues }>(
    "/candidate/getProfile",
    { isServer: true },
  );
  return (
    <StepTwoForm
      defaultValues={data?.responses as ProfessionalInfoFormValues}
    />
  );
}
