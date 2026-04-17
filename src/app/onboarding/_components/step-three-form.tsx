"use client";

import ResumeUpload from "@/components/resume-upload-input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  SkillsAndResumeInfoFormValues,
  SkillsAndResumeInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SkillManager } from "./skills-manager";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// interface OnboardingSkip {
//   data: { message: string };
//   message: string;
//   success: boolean;
//   statusCode: number;
// }

export default function StepThreeForm() {
  const [active, setActive] = React.useState<
    string | "skills" | "languages" | "projects"
  >("skills");
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
      languages: [
        {
          language: "",
          proficiency: "BASIC",
        },
      ],
    },
  });

  const stepThreeArrayFields = useFieldArray<SkillsAndResumeInfoFormValues>({
    control: form.control,
    name: "skills",
    keyName: "id",
  });

  const onsubmit = (data: SkillsAndResumeInfoFormValues) => {
    console.log(data);
  };
  // const [loading, setLoading] = React.useState<boolean>(false);
  // const router = useRouter();

  // async function handleOnboardingSkip() {
  //   setLoading(true);
  //   try {
  //     const response = await api.patch<OnboardingSkip, { skipped: boolean }>(
  //       "/users/onboarding-complete",
  //       {
  //         skipped: true,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     if (!response.success) {
  //       throw new Error(response.message);
  //     }

  //     if (response.success) {
  //       toast.success(response.message);
  //       router.push("/candidate");
  //     }
  //   } catch (error: unknown) {
  //     console.log(error);
  //     if (error instanceof Error) toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
              </Field>
              <Field>
                <RadioGroup
                  defaultValue="skills"
                  value={active}
                  onValueChange={(val) => setActive(val)}
                  className="w-full grid grid-cols-3 my-2 gap-4 items-center"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="skills" id="skills" />
                    <Label htmlFor="skills">Skills</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="languages" id="language" />
                    <Label htmlFor="language">Languages</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="projects" id="projects" />
                    <Label htmlFor="projects">Projects</Label>
                  </div>
                </RadioGroup>
              </Field>
              {active === "skills" && (
                <Field>
                  <FieldLabel>Add Skills</FieldLabel>
                  <SkillManager skillArrayField={stepThreeArrayFields} />
                </Field>
              )}

              {active === "languages" && <div className="">Languages</div>}
              {active === "projects" && <div className="">Projects</div>}
            </FieldGroup>
          </Field>
        </CardContent>
        <CardFooter className="flex mt-4 flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
          <Button
            // disabled={isPending}
            variant={"outline"}
            size={"lg"}
            className="w-full"
          >
            {/* {isPending ? (
              <Loader className="inline-block size-5 animate-spin" />
            ) : (
            )} */}
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

// interface SkillsInputsProps {
//   skillFields: UseFieldArrayReturn<SkillsAndResumeInfoFormValues>;
//   form: UseFormReturn<SkillsAndResumeInfoFormValues>;
// }

// function SkillsInputs({ skillFields, form }: SkillsInputsProps) {
//   const { control, getValues } = form;

//   return (
//     <div className="">
//       {skillFields.fields.map((item, idx) => (
//         <div
//           key={item.id}
//           className="grid md:grid-cols-3 grid-cols-1 items-center gap-3 w-full"
//         >
//           <Controller
//             control={control}
//             name={`skills.${idx}.name`}
//             render={({ field, fieldState }) => (
//               <Field>
//                 <FieldLabel htmlFor="name">Skill</FieldLabel>
//                 <Input {...field} type="text" placeholder="skill name" />
//                 <FieldError errors={[fieldState.error]} />
//               </Field>
//             )}
//           />
//           <Controller
//             control={control}
//             name={`skills.${idx}.yearsOfExp`}
//             render={({ field, fieldState }) => (
//               <Field>
//                 <FieldLabel>Years Of Exp</FieldLabel>
//                 <Input {...field} type="number" placeholder="" />
//                 <FieldError errors={[fieldState.error]} />
//               </Field>
//             )}
//           />
//           <Controller
//             control={control}
//             name={`skills.${idx}.level`}
//             render={({ field, fieldState }) => (
//               <Field>
//                 <FieldLabel>Years Of Exp</FieldLabel>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].map(
//                         (item) => (
//                           <SelectItem key={`levels-${item}`} value={item}>
//                             {item}
//                           </SelectItem>
//                         ),
//                       )}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 <FieldError errors={[fieldState.error]} />
//               </Field>
//             )}
//           />

//           {idx >= 1 && (
//             <Button
//               type="button"
//               variant={"destructive"}
//               size={"icon-sm"}
//               onClick={() => skillFields.remove(idx)}
//             >
//               <XIcon />
//             </Button>
//           )}
//         </div>
//       ))}
//       <Button
//         type="button"
//         className="w-fit bg-transparent text-blue-400"
//         variant={"link"}
//         size={"icon-lg"}
//         onClick={() =>
//           skillFields.append({
//             name: "",
//             yearsOfExp: Number(""),
//             level: "BEGINNER",
//           })
//         }
//       >
//         <PlusIcon />
//       </Button>
//     </div>
//   );
// }
