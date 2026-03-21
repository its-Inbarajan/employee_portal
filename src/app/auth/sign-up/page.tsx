"use client";
import { type UserSignupResponse } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { api } from "@/lib/api";
import { SignupSchemaValue, sigupSchema } from "@/schema/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const route = useRouter();
  const [show, setShow] = React.useState<boolean>(false);
  const handleShowPassword = () => {
    setShow(!show);
  };

  const { control, handleSubmit } = useForm<SignupSchemaValue>({
    resolver: zodResolver(sigupSchema),
    defaultValues: {
      email: "",
      user_name: "",
      lastName: "",
      password: "",
      userRole: "CANDIDATE",
      terms: false,
    },
    mode: "onChange",
  });

  // const { mutate, isPending } = useApiMutation<
  //   { responses: UserSignupResponse },
  //   SignupSchemaValue
  // >(`http://localhost:4050/api/v1/users/signup`, "POST", {
  //   onSuccess: (res) => {
  //     console.log(res.data?.responses);
  //     route.push("/candidate/onboarding");
  //     toast.success(res.message);
  //   },
  //   onError: (err) => {
  //     toast.error(handleApiError(err));
  //   },
  // });
  const [isPending, setIsPending] = React.useState(false);
  const onSubmit = async (data: SignupSchemaValue) => {
    setIsPending(true);
    try {
      const res = await api.post<UserSignupResponse>(`/users/signup`, {
        ...data,
        userRole: "CANDIDATE",
      });

      if (!res.success) {
        toast.error(res?.message);
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Account created but login failed. Please login manually.");
        route.push("/auth/signin");
        return;
      }

      if (result?.ok) {
        route.push("/candidate/onboarding");
        route.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen relative  overflow-hidden dark:bg-background bg-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="max-w-sm w-full relative z-20 px-4 md:px-6">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Sign up</FieldLegend>
              <FieldDescription>
                Create and Setup your account to browse jobs
              </FieldDescription>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="user_name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="user_name">First Name</FieldLabel>
                        <Input
                          type="text"
                          disabled={isPending}
                          autoComplete="name"
                          id="user_name"
                          {...field}
                          placeholder="Jhon"
                          required
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                          type="text"
                          disabled={isPending}
                          autoComplete="family-name"
                          id="lastName"
                          placeholder="wick"
                          {...field}
                          required
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        type="email"
                        disabled={isPending}
                        autoComplete="email"
                        id="email"
                        {...field}
                        placeholder="name@example.com"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="password"
                          type={show ? "text" : "password"}
                          disabled={isPending}
                          autoComplete="new-password"
                          placeholder="******"
                          {...field}
                          // disabled={isLoading}
                        />
                        <InputGroupButton
                          type="button"
                          onClick={handleShowPassword}
                        >
                          {show ? <EyeIcon /> : <EyeOffIcon />}
                        </InputGroupButton>
                      </InputGroup>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <Controller
              control={control}
              name="terms"
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms"
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                    value={String(field.value)}
                    checked={field.value}
                    disabled={isPending}
                    name="terms"
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="terms">
                      Terms and Conditions.
                    </FieldLabel>
                    <FieldError errors={[fieldState.error]} />
                    <FieldDescription className="line-clamp-3 hover:line-clamp-none active:line-clamp-none">
                      This application is fully developers personal project to
                      showcase his skill in full stack development. so,
                      don&#39;t use any personal informations to access the
                      application.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />
            <Field orientation="horizontal">
              <Button
                type="submit"
                variant={"default"}
                size={"lg"}
                className="w-full"
                disabled={isPending}
              >
                Submit{" "}
                {isPending && <Loader2 className="animate-spin inline-block" />}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
