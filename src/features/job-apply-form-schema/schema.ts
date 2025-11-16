import { z } from "zod";

export const applyJobSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  resume: z.string(),
  exp: z.object({
    year: z.string(),
    month: z.string(),
  }),
  ctc: z.string(),
  ectc: z.string(),
  brief_intro: z.string(),
  notice_period: z.string(),
  mobile_no: z.string(),
  email: z.string(),
  address: z.object({
    state: z.string(),
    city: z.string(),
    zip: z.string(),
  }),
  location: z.object({
    preferred_loc: z.string(),
    current_loc: z.string(),
  }),
  terms: z.boolean().refine((data) => data),
});

export type ApplyJobSchema = z.infer<typeof applyJobSchema>;
