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
import { useSearchParams } from "next/navigation";

export default function ForgotPassword() {
  const searchParams = useSearchParams();

  const verifyEmailForm = useForm<VerifyEmailType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const resetPasswordForm = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      confirm_password: "",
      new_password: "",
      userId: "",
    },
    mode: "onChange",
  });

  const otpForm = useForm<VerifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  // React.useEffect(() => {
  //   if (!searchParams.get("form")?.length) {
  //     const params = new URLSearchParams(searchParams.toString());

  //     params.set("form", " ");
  //   }
  // }, [searchParams]);
  return (
    <section className="flex flex-col items-center gap-4 justify-center h-screen overflow-hidden relative">
      {searchParams.get("form") === "verifyEmail" ? (
        <FormProvider {...verifyEmailForm}>
          <form noValidate className="w-full flex items-center justify-center">
            <EmailVerificationForm />
          </form>
        </FormProvider>
      ) : searchParams.get("form") === "verifyOtp" ? (
        <FormProvider {...otpForm}>
          <form noValidate className="w-full flex items-center justify-center">
            <OtpForm />
          </form>
        </FormProvider>
      ) : (
        searchParams.get("form") === "updatePassword" && (
          <FormProvider {...resetPasswordForm}>
            <form
              noValidate
              className="w-full flex items-center justify-center"
            >
              <ResetPasswordForm />
            </form>
          </FormProvider>
        )
      )}
    </section>
  );
}

function EmailVerificationForm() {
  const { control } = useFormContext();
  return (
    <Card className="max-w-sm mx-auto w-full pb-0">
      <CardHeader>
        <CardTitle>Verify your email address.</CardTitle>
        <CardDescription>
          verify your email address with OTP in your inbox.
        </CardDescription>
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
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t [.border-t]:pt-3 bg-muted/50 px-6 py-3">
        <Button variant={"outline"} size={"sm"} className="w-full">
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
        <CardDescription>Find your OTP in given mail indox.</CardDescription>
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
            <Field>
              <FieldLabel htmlFor="new_password">New Password</FieldLabel>
              <Input
                id="new_password"
                autoComplete="new-password"
                name="new_password"
                placeholder="******"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm_password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm_password"
                name="confirm_password"
                placeholder="******"
              />
            </Field>
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
