import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?1\s?)\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
);

// const ExperienceSchema = z.object({
//   title: z.string().max(4, "title is required."),
//   company: z.string().max(4, "company is required."),
//   location: z.string(),
//   locationType: z.enum(["REMOTE", "HYBRID", "ONSITE"]),
//   employmentType: z.enum([
//     "FULL_TIME",
//     "PART_TIME",
//     "CONTRACT",
//     "FREELANCE",
//     "INTERNSHIP",
//   ]),
//   startDate: z.string(),
//   endDate: z.string(), // null = currently working
//   isCurrent: z.boolean(),
//   description: z.string(),
//   skills: z.array(z.string()), // skills used in this role
// });

// const EducationSchema = z.object({
//   institution: z.string(),
//   degree: z.string(), // "B.Tech", "MBA"
//   fieldOfStudy: z.string(), // "Computer Science"
//   startYear: z.number(),
//   endYear: z.number(),
//   grade: z.string(), // "8.7 CGPA" or "First Class"
//   activities: z.string(),
// });

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string().max(120, "Maximum length reached"),
  url: z.string(),
  repoUrl: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
});

const MAX_FILE_SIZE = 5000000; // Example: 5MB
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
] as const;

type AllowedMimeTypes =
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const basicsInfoSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format."),
  dateOfBirth: z.string().optional(),
  location: z.object({
    city: z.string().min(1, "Required"),
    state: z.string().min(1, "Required"),
    country: z.string().min(1, "Required"),
  }),
  gender: z.string().min(1, "Please select an option."),
});

export const professionalInfoSchema = z.object({
  currentTitle: z.string(),
  currentCompany: z.string(),
  totalExperienceYears: z.number(),
  experienceLevel: z
    .enum([
      "FRESHER",
      "JUNIOR",
      "MID",
      "SENIOR",
      "LEAD",
      "PRINCIPAL",
      "EXECUTIVE",
    ])
    .refine((val) => !!val, { message: "Unknow experience level." }),
  currentCtc: z.number().min(1, "Minium value 1"),
  // languages: z.object({
  //   language: z.string().array(),
  //   proficiency: z.enum(["BASIC", "CONVERSATIONAL", "PROFESSIONAL", "NATIVE"]),
  // }),
  // headline: z.string().max(120),
  // experience: z.array(ExperienceSchema),
  // skills: z.string().array().min(1, "Atleast enter one skill."),
  // education: z.array(EducationSchema),
});

export const SkillsAndResumeInfoSchema = z.object({
  skills: z.array(z.string()).min(1, "Minium one skill is required"),
  project: z.array(ProjectSchema),
  resumes: z
    .custom<File>()
    .refine((file) => file instanceof File, "File is required") // Ensures the input is a File object
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file.type as AllowedMimeTypes),
      "Only .pdf and .docx formats are supported",
    ),
});

export type BasicsInforFormValues = z.infer<typeof basicsInfoSchema>;
export type ProfessionalInfoFormValues = z.infer<typeof professionalInfoSchema>;
export type SkillsAndResumeInfoFormValues = z.infer<
  typeof SkillsAndResumeInfoSchema
>;
