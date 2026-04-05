"use client";

import ResumeUpload from "@/components/resume-upload-input";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  SkillsAndResumeInfoFormValues,
  SkillsAndResumeInfoSchema,
} from "@/schema/candidate-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { SkillManager } from "./skills-manager";

// interface OnboardingSkip {
//   data: { message: string };
//   message: string;
//   success: boolean;
//   statusCode: number;
// }

export default function StepThreeForm() {
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

  // const skillFieldsArray = useFieldArray({
  //   control: form.control,
  //   name: "skills",
  //   keyName: "id",
  // });

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
    <Card className="@container/card w-full relative">
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
                    "image/png": [".png"],
                  }}
                />
              </Field>

              <Field>
                <FieldLabel>Add Skills</FieldLabel>
                <SkillManager />
              </Field>
            </FieldGroup>
          </Field>
        </CardContent>
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
