import z from "zod";

export const forgotPasswordSchema = z
  .object({
    new_password: z.string().trim().min(6, "Minium 6 charater is required."),
    confirm_password: z.string(),
    userId: z
      .string()
      .trim()
      .refine((val) => !!val, {
        message: "Oops!, User id is missing!",
      }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Specify the path for the error message
  });

export const verifyEmailSchema = z.object({
  email: z.email(),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .max(6)
    .regex(/^\d+$/, {
      // Ensures the string contains only digits
      message: "OTP must contain only numbers.",
    }),
});
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type VerifyEmailType = z.infer<typeof verifyEmailSchema>;
export type VerifyOtpType = z.infer<typeof verifyOtpSchema>;
