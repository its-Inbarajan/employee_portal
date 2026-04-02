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
      skills: [""],
    },
  });

  const onsubmit = (data: SkillsAndResumeInfoFormValues) => {
    console.log(data);
  };
  return (
    <Card className="pb-0 relative">
      <form onSubmit={form.handleSubmit(onsubmit)} noValidate>
        <CardContent></CardContent>
      </form>
    </Card>
  );
}
