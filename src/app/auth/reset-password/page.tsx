"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  forgotPasswordSchema,
  ForgotPasswordType,
  verifyEmailSchema,
  VerifyEmailType,
  VerifyOtpType,
  verifyOtpSchema,
} from "@/schema/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/use-api-error";
import { api } from "@/lib/api";
import { useResetPasswordStore } from "@/features/store";
import { Loader2 } from "lucide-react";

function ResetForms() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setEmail = useResetPasswordStore((state) => state.setEmail);
  const setResetToken = useResetPasswordStore((state) => state.setResetToken);
  const email = useResetPasswordStore((state) => state.email);
  const resetToken = useResetPasswordStore((state) => state.resetToken);
  const resetStore = useResetPasswordStore((state) => state.resetStore);

  const verifyEmailForm = useForm<VerifyEmailType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const resetPasswordForm = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    values: {
      confirm_password: "",
      new_password: "",
      email: email,
      resetToken: resetToken,
    },
    mode: "onChange",
  });

  const otpForm = useForm<VerifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    values: {
      otp: "",
      email: email.toString(),
    },
    mode: "onChange",
  });

  async function handleSubmitEmail(data: { email: string }) {
    try {
      const response = await api.post<
        { responses: { email: string } },
        { email: string }
      >("/otps/sendOtp", {
        ...data,
      });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      if (response?.success) {
        setEmail(response.data?.responses?.email as string);
        router.push("/auth/reset-password?form=verifyOtp");
        router.refresh();
        toast.success(response.message);
      }
    } catch (error: unknown) {
      toast.error(handleApiError(error as Error));
    }
  }

  async function verifyOtp(data: { otp: string }) {
    const payload = {
      otp: data.otp,
      email: email,
    };
    try {
      const res = await api.put<
        {
          message: string;
          statusCode: number;
          success: boolean;
          responses: { resetToken: string };
        },
        { otp: string; email: string }
      >("/otps/verifyOtp", {
        ...payload,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res?.success) {
        setResetToken(res.data?.responses.resetToken as string);
        router.push("/auth/reset-password?form=updatePassword");
        router.refresh();
        toast.success(res.message);
      }
    } catch (error: unknown) {
      toast.error(handleApiError(error));
    }
  }

  async function updatePassword(data: {
    new_password: string;
    confirm_password: string;
  }) {
    const payload = {
      new_password: data.new_password,
      confirm_password: data.confirm_password,
      resetToken: resetToken,
      email: email,
    };

    try {
      const res = await api.put<
        { message: string },
        {
          new_password: string;
          confirm_password: string;
          resetToken: string;
          email: string;
        }
      >("/users/forgot-password", {
        ...payload,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res?.success) {
        resetStore();
        router.push("/auth/sign-in");
        router.refresh();
        toast.success(res.message);
      }
    } catch (error: unknown) {
      toast.error(handleApiError(error));
    }
  }
  return (
    <div className="relative isolate w-full z-10">
      {searchParams.get("form") === "verifyEmail" ? (
        <FormProvider {...verifyEmailForm}>
          <form
            noValidate
            onSubmit={verifyEmailForm.handleSubmit(handleSubmitEmail)}
            className="w-full flex items-center justify-center"
          >
            <EmailVerificationForm />
          </form>
        </FormProvider>
      ) : searchParams.get("form") === "verifyOtp" ? (
        <FormProvider {...otpForm}>
          <form
            noValidate
            onSubmit={otpForm.handleSubmit(verifyOtp)}
            className="w-full flex items-center justify-center"
          >
            <OtpForm />
          </form>
        </FormProvider>
      ) : (
        searchParams.get("form") === "updatePassword" && (
          <FormProvider {...resetPasswordForm}>
            <form
              noValidate
              onSubmit={resetPasswordForm.handleSubmit(updatePassword)}
              className="w-full flex items-center justify-center"
            >
              <ResetPasswordForm />
            </form>
          </FormProvider>
        )
      )}
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <section className="flex flex-col dark:bg-background bg-white items-center gap-4 justify-center h-screen overflow-x-hidden relative">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <React.Suspense
        fallback={
          <div className="flex flex-row items-center justify-center h-screen animate-spin">
            <Loader2 className="size-5" />
          </div>
        }
      >
        <ResetForms />
      </React.Suspense>
    </section>
  );
}
function EmailVerificationForm() {
  const { control } = useFormContext();
  return (
    <Card className="max-w-sm mx-auto w-full pb-0">
      <CardHeader>
        <CardTitle>Verify your email address.</CardTitle>
        <CardDescription>verify your email address with OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel data-invalid={fieldState.invalid} htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  autoCapitalize="on"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  placeholder="name@example.com"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t [.border-t]:pt-3 bg-muted/50 px-6 py-3">
        <Button
          variant={"outline"}
          size={"sm"}
          type="submit"
          className="w-full"
        >
          Send
          {/* <LoaderIcon className="animate-spin" /> */}
        </Button>
      </CardFooter>
    </Card>
  );
}

function OtpForm() {
  const { control } = useFormContext();

  return (
    <Card className="max-w-sm mx-auto w-full pb-0">
      <CardHeader>
        <CardTitle>Verify otp</CardTitle>
        <CardDescription>Find your OTP in given mail.</CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="otp">OTP</FieldLabel>
              <InputOTP maxLength={6} {...field} id="otp" className="w-full">
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <InputOTPSlot key={`otp-index-${index}`} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </CardContent>
      <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t [.border-t]:pt-3 bg-muted/50 px-6 py-3">
        <Button variant={"outline"} size={"sm"} className="w-full">
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
}

function ResetPasswordForm() {
  const { control } = useFormContext();

  return (
    <Card className="max-w-sm mx-auto w-full pb-0">
      <CardHeader>
        <CardTitle>Update your password</CardTitle>
        <CardDescription>
          Make sure new and confirm password match.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Controller
              control={control}
              name="new_password"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="new_password">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="new_password"
                    autoComplete="new-password"
                    placeholder="******"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="confirm_password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirm_password"
                    placeholder="******"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t [.border-t]:pt-3 bg-muted/50 px-6 py-3">
        <Button
          type="submit"
          variant={"outline"}
          size={"sm"}
          className="w-full"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
