import z from "zod";

export const sigupSchema = z.object({
  email: z.email(),
  user_name: z.string().trim().min(4, "Minium 4 charater is required"),
  lastName: z.string().trim().nonempty(),
  password: z.string().trim().min(6, "Minium 6 charater is required"),
  userRole: z
    .string()
    .trim()
    .refine((val) => !!val, {
      message: "Oops!, UserRole is missing!",
    }),
  terms: z.boolean().refine((val) => !!val, {
    message: "Make sure you accept oru terms and conditions.",
  }),
});

export type SignupSchemaValue = z.infer<typeof sigupSchema>;
