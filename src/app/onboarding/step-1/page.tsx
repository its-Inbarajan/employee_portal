import { api } from "@/lib/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import StepOneForm from "../_components/step-one-form";
import { BasicsInforFormValues } from "@/schema/candidate-onboarding-schema";
import { authOptions } from "@/lib/authOptions";

export default async function StepOnePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  // Pre-fill form with existing data if they're coming back
  const { data: profile } = await api.get<{ responses: BasicsInforFormValues }>(
    "/candidate/getProfile",
    { isServer: true },
  );

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="">
        <h1 className="text-2xl font-bold">Tell us about yourself</h1>
        <p className="text-muted-foreground text-sm mt-1">
          This helps employers know who you are.
        </p>
      </div> */}
      <StepOneForm defaultValues={profile?.responses} />
    </div>
  );
}
