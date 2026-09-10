"use client";
import { type UserSignupResponse } from "@/@types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import Link from "next/link";
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
  //     route.push("/onboarding");
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
        route.push("/auth/sign-in");
        return;
      }

      if (result?.ok) {
        route.push("/onboarding");
        route.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen relative  overflow-hidden dark:bg-background bg-accent">
      <div className="absolute bottom-0 left-0 right-0 top-0  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      {/* <div className="max-w-sm w-full relative z-20 px-4 md:px-6 bg-accent py-6 rounded-2xl dark:bg-background"> */}

      <Card className="w-full max-w-lg relative z-20 pb-0">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create and Setup your account to browse jobs
          </CardDescription>
          <CardAction>
            <Button asChild variant={"outline"} size={"sm"}>
              <Link href={"/auth/sign-up/recruiter"}>Recruiter Sign up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <FieldGroup className="gap-3">
              <FieldSet>
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
                <Controller
                  control={control}
                  name="terms"
                  render={({ field, fieldState }) => (
                    <Field orientation="horizontal" className="mb-4">
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
                          I agree to the Terms and Conditions.
                        </FieldLabel>
                        <FieldError errors={[fieldState.error]} />
                        {/* <FieldDescription>
                      This application is fully developers personal project to
                      showcase his skill in full stack development. so,
                      don&#39;t use any personal informations to access the
                      application.
                    </FieldDescription> */}
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
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
          </CardFooter>
        </form>
      </Card>
      {/* </div> */}
    </section>
  );
};

export default SignUp;
