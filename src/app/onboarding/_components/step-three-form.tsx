"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { api } from "@/lib/api";
import {
  SkillsAndResumeInfoFormValues,
  SkillsAndResumeInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PickaxeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  defaultValues?: SkillsAndResumeInfoFormValues;
}

interface OnboardingSkip {
  data: { message: string };
  message: string;
  success: boolean;
  statusCode: number;
}

export default function StepThreeForm({ defaultValues }: Readonly<Props>) {
  console.log(defaultValues);
  const form = useForm<SkillsAndResumeInfoFormValues>({
    resolver: zodResolver(SkillsAndResumeInfoSchema),
    defaultValues: {
      project: [
        {
          description: "",
          endDate: "",
          repoUrl: "",
          startDate: "",
          title: "",
          url: "",
        },
      ],
      resumes: undefined,
      skills: [
        {
          level: "BEGINNER",
          name: "",
          yearsOfExp: 0,
        },
      ],
    },
  });

  const onsubmit = (data: SkillsAndResumeInfoFormValues) => {
    console.log(data);
  };
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

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
    <Card className="pb-0 relative">
      <form onSubmit={form.handleSubmit(onsubmit)} noValidate>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PickaxeIcon />
              </EmptyMedia>
              <EmptyTitle>Working in Progress</EmptyTitle>
              <EmptyDescription>
                You can skipp this step and start explore dashboard and profile.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                type="button"
                onClick={handleOnboardingSkip}
                variant={"default"}
                size={"lg"}
              >
                {loading ? (
                  <Loader2 className="inline-block animate-spin" />
                ) : (
                  "skip"
                )}
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </form>
    </Card>
  );
}
