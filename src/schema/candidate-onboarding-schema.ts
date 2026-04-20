import { ProfessionalCategory } from "@/@types/candidate-types";
import z from "zod";

const phoneRegex = new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/);

const socialMediaSchema = z.object({
  // URL validation + Specific domain check
  github: z
    .url({ message: "Invalid GitHub URL" })
    .regex(/github\.com/, "Must be a valid GitHub link")
    .optional()
    .or(z.literal("")),

  linkedin: z
    .url({ message: "Invalid LinkedIn URL" })
    .regex(/linkedin\.com/, "Must be a valid LinkedIn link")
    .optional()
    .or(z.literal("")),

  twitter: z
    .url({ message: "Invalid Twitter URL" })
    .regex(/(twitter\.com|x\.com)/, "Must be a valid Twitter/X link")
    .optional()
    .or(z.literal("")),

  portfolio: z
    .url({ message: "Invalid portfolio URL" })
    .optional()
    .or(z.literal("")),

  facebook: z
    .url({ message: "Invalid Facebook URL" })
    .regex(/facebook\.com/, "Must be a valid Facebook link")
    .optional()
    .or(z.literal("")),
});

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

export const ZodStringNumberOrNull = z
  .string()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .refine((value) => value === null || !isNaN(Number(value)), {
    message: "Invalid number",
  })
  .transform((value) => (value === null ? null : Number(value)));

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
  totalExperienceYears: z.number().min(0),
  professionalCategory: z.nativeEnum(ProfessionalCategory, {
    message: "Select atleast one value.",
  }),
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
  currentCtc: z
    .number()
    .min(1, "Current CTC must be atleast one.")
    .refine((val) => !!val, { message: "Choose atleast single digit." }),
});

export const SkillsAndResumeInfoSchema = z.object({
  skills: z
    .object({
      name: z.string(),
      level: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"])
        .optional(),
      yearsOfExp: z.number().optional(),
    })
    .array()
    .optional(),
  languages: z
    .object({
      language: z.string(),
      proficiency: z.enum([
        "BASIC",
        "CONVERSATIONAL",
        "PROFESSIONAL",
        "NATIVE",
      ]),
    })
    .array()
    .optional(),
  project: z.array(ProjectSchema).optional(),
  resumes: z
    .custom<File>()
    .refine((file) => file instanceof File, "File is required") // Ensures the input is a File object
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file.type as AllowedMimeTypes),
      "Only .pdf and .docx formats are supported",
    ),
});

export const JobPreferencesSchema = z.object({
  desiredRoles: z.string().array().min(1, "At least enter one value"),
  desiredSalaryMin: z.number().min(0),
  desiredSalaryMax: z.number().min(0),

  currency: z.string(),
  noticePeriodDays: z.number().min(0).max(365),

  isImmediateJoiner: z.boolean(),
  preferredLocations: z.string().array().min(1, "At least enter one value"),
  workModePreference: z.enum(["REMOTE", "HYBRID", "ONSITE", "ANY"]),
  preferredCompanySize: z.enum(["STARTUP", "SME", "MID_SIZE", "LARGE", "ANY"]),
  preferredJobTypes: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
    .array()
    .min(1, "Select at least one"),
  preferredIndustries: z.string().array(),
  openToRelocate: z.boolean(),
  isOpenToWork: z.boolean(),
  isProfilePublic: z.boolean(),
  socialLinks: socialMediaSchema,
});

export type BasicsInforFormValues = z.infer<typeof basicsInfoSchema>;
export type ProfessionalInfoFormValues = z.infer<typeof professionalInfoSchema>;
export type SkillsAndResumeInfoFormValues = z.infer<
  typeof SkillsAndResumeInfoSchema
>;
export type JobPreferencesFormValues = z.infer<typeof JobPreferencesSchema>;
