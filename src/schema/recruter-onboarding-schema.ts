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

export type basicSigupType = z.infer<typeof basicSigupSchema>;
