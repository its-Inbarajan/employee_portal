"use client";
import React from "react";
import StepFourForm from "../_components/step-four-form";
import { useForm } from "react-hook-form";
import {
  JobPreferencesFormValues,
  JobPreferencesSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface OnboardingSkip {
  data: { message: string };
  message: string;
  success: boolean;
  statusCode: number;
}

export default function StepFourPage() {
  const form = useForm<JobPreferencesFormValues>({
    resolver: zodResolver(JobPreferencesSchema),
    defaultValues: {
      desiredRoles: [],
      desiredSalaryMin: 0,
      desiredSalaryMax: 0,
      currency: "INR",
      noticePeriodDays: 0,
      isImmediateJoiner: false,
      preferredLocations: [],
      workModePreference: "ANY",
      preferredCompanySize: "ANY",
      preferredJobTypes: [],
      preferredIndustries: [],
      openToRelocate: false,
      isOpenToWork: true,
      isProfilePublic: true,
      socialLinks: {
        facebook: "",
        github: "",
        linkedin: "",
        portfolio: "",
        twitter: "",
      },
    },
    mode: "onChange",
  });
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleOnboardingSkip() {
    setLoading(true);
    try {
      const response = await api.patch<OnboardingSkip, { skipped: boolean }>(
        "/users/onboarding-complete",
        {
          skipped: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/candidate");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:max-w-4xl max-h-full mx-auto">
      <StepFourForm
        form={form}
        loading={loading}
        handleOnboardingSkip={handleOnboardingSkip}
      />
    </div>
  );
}
