"use client";

import ResumeUpload from "@/components/resume-upload-input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  SkillsAndResumeInfoFormValues,
  SkillsAndResumeInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SkillManager } from "./skills-manager";
import { Button } from "@/components/ui/button";
import LanguageManager from "./language-manager";
import ProjectsManager from "./projects-fields-manager";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useApiUpload } from "@/lib/api/use-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/api/use-api-error";
import { Loader } from "lucide-react";

// interface OnboardingSkip {
//   data: { message: string };
//   message: string;
//   success: boolean;
//   statusCode: number;
// }

export default function StepThreeForm() {
  const router = useRouter();
  const form = useForm<SkillsAndResumeInfoFormValues>({
    resolver: zodResolver(SkillsAndResumeInfoSchema),
    defaultValues: {
      project: [],
      resumes: undefined,
      skills: [],
      languages: [],
    },
  });

  const stepThreeSkillsArrayFields =
    useFieldArray<SkillsAndResumeInfoFormValues>({
      control: form.control,
      name: "skills",
      keyName: "id",
    });

  const stepThreeLanguageArrayFields =
    useFieldArray<SkillsAndResumeInfoFormValues>({
      control: form.control,
      name: "languages",
      keyName: "id",
    });

  const stepThreeProjectsArrayFields =
    useFieldArray<SkillsAndResumeInfoFormValues>({
      control: form.control,
      name: "project",
      keyName: "id",
    });

  const { mutate, isPending } = useApiUpload<{
    message: string;
  }>("/candidate/onboarding/step-3", {
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Skills and resume saved!");
        router.push("/onboarding/step-4");
      }
    },
    onError: (err) => {
      console.log(handleApiError(err));
      toast.error(handleApiError(err));
    },
  });

  const onsubmit = (data: SkillsAndResumeInfoFormValues) => {
    // const formData = new FormData();

    const formData = new FormData();

    // File — must be appended with the key your multer expects
    if (data.resumes) {
      formData.append("resume", data.resumes);
    }

    // Arrays must be JSON stringified — multipart only carries strings + files
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("languages", JSON.stringify(data.languages ?? []));
    formData.append("projects", JSON.stringify(data.project ?? []));
    console.log(formData);
    mutate(formData);
  };

  return (
    <Card className="@container/card w-full pb-0 relative h-full">
      <form onSubmit={form.handleSubmit(onsubmit)} noValidate>
        <CardContent>
          <Field>
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="resumes"
                  className="relative after:content-['_*'] after:text-red-500 after:font-black"
                >
                  Resume
                </FieldLabel>
                <ResumeUpload
                  onFileSelect={(file: File) =>
                    form.setValue("resumes", file, { shouldValidate: true })
                  }
                  maxSizeInMB={2}
                  accpect={{
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                  }}
                />
                <FieldError errors={[form.formState.errors.resumes]} />
              </Field>
              <Accordion
                type="single"
                collapsible
                defaultValue="skills"
                className="w-full"
              >
                <AccordionItem value="skills">
                  <AccordionTrigger>
                    <FieldLabel>Add Skills</FieldLabel>
                  </AccordionTrigger>
                  <AccordionContent>
                    <SkillManager
                      skillArrayField={stepThreeSkillsArrayFields}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="language">
                  <AccordionTrigger>
                    <FieldLabel>Add Language</FieldLabel>
                  </AccordionTrigger>
                  <AccordionContent>
                    <LanguageManager
                      langugageArrayField={stepThreeLanguageArrayFields}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="projects">
                  <AccordionTrigger>
                    <FieldLabel>Add Projects</FieldLabel>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProjectsManager
                      projectsArrayField={stepThreeProjectsArrayFields}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FieldGroup>
          </Field>
        </CardContent>
        <CardFooter className="flex mt-4 flex-col  rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
          <Button
            disabled={isPending}
            variant={"outline"}
            size={"lg"}
            className="w-full disabled:hover:cursor-not-allowed"
          >
            {isPending ? (
              <Loader className="inline-block size-5 animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
