import React, { Suspense } from "react";
import StepTwoForm from "../_components/step-two-form";
import { api } from "@/lib/api";
import { ProfessionalInfoFormValues } from "@/schema/candidate-onboarding-schema";

export default async function SteptwoPage() {
  const { data } = await api.get<{ responses: ProfessionalInfoFormValues }>(
    "/candidate/getProfile",
    { isServer: true },
  );

  return (
    <div className="lg:max-w-3xl md:max-w-2xl max-w-full mx-auto w-full">
      <Suspense fallback={<div>Loading....</div>}>
        <StepTwoForm
          defaultValues={data?.responses as ProfessionalInfoFormValues}
        />
      </Suspense>
    </div>
  );
}
