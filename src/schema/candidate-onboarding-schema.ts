import z from "zod";

export const basicsInfoSchema = z.object({
  firstName: z.string().min(4, "Minium 4 charater required"),
  lastName: z.string().min(4, "Minium 4 charater required."),
  headline: z.string(),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),

  location: z.object({
    city: z.string(),
    contry: z.string(),
    state: z.string(),
  }),
});

export const professionalInfoSchema = z.object({
  currentTitle: z.string(),
  currentCompany: z.string(),
  totalExperienceYears: z.number(),
  experienceLevel: z.string(),
  currentCtc: z.number(),
  skills: z.string().array(),
  languages: z.string().array(),
});

export const resumeSchema = z.object({
  resumes: z.string(),
});
