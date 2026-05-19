import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const basicSigupSchema = z.object({
  fullName: z.string().min(4, { error: "At least enter 4 charaters" }),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid international phone number format (E.164 required)",
    }),
  work_email: z.email(),
  password: z.string().min(6, { error: "Minimum 6 charaters" }),
  recruiterType: z.enum(["INHOUSE", "AGENCY", "FREELANCE"]),
  terms: z.boolean().refine((val) => !!val, {
    message: "Make sure you accept oru terms and conditions.",
  }),
});

export const companyOnboardingDetails = z.object({
  company_logo: z.string(),
  company_name: z.string().min(4, { error: "At least enter 4 charaters" }),
  company_email: z.email(),
  company_industry: z.string().min(4, { error: "At least enter 4 charaters" }),
  company_location: z.string().min(4, { error: "At least enter 4 charaters" }),
  company_website: z.string().url({ error: "URL Required" }),
  company_about: z
    .string()
    .min(4, { error: "At least enter 4 charaters" })
    .max(200, "maximum 200 charaters allowed"),
  company_size: z.string(),
});

export const companySocialMedia = z.object({
  linkedin: z.string().url("Must be a valid URL"),
  social_medias: z
    .array(
      z.object({
        url: z.string().url("Must be a valid URL"),
      }),
    )
    .optional(),
});

export const inviteRecruitersSchema = z.object({
  invitation: z
    .object({
      email: z
        .string() // Zod .email() requires a string chain base
        .email("Invalid email format")
        .min(1, "Give at least one email address"),
      role: z.enum(
        [
          "OWNER",
          "ADMIN",
          "RECRUITER",
          "HIRING_MANAGER",
          "INTERVIEWER",
          "AGENCY",
        ],
        { error: "Invalid Role" },
      ),
    })
    .array(),
});

export type basicSigupType = z.infer<typeof basicSigupSchema>;
export type onboardingDetailsValue = z.infer<typeof companyOnboardingDetails>;
export type companySocialMediaValue = z.infer<typeof companySocialMedia>;
export type inviteRecruitersValue = z.infer<typeof inviteRecruitersSchema>;
