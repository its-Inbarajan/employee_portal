"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  SkillsAndResumeInfoFormValues,
  SkillsAndResumeInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: SkillsAndResumeInfoFormValues;
}

export default function StepThreeForm({ defaultValues }: Readonly<Props>) {
  const {} = useForm<SkillsAndResumeInfoFormValues>({
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
      skills: [""],
    },
  });
  return (
    <Card className="pb-0 relative">
      <form noValidate>
        <CardContent></CardContent>
      </form>
    </Card>
  );
}
