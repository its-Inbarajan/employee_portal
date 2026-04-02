"use client";
import { loginAction, LoginState } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
const initialState: LoginState = {
  success: false,
  message: "",
  errors: {},
};

function ForgotPasswordButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleForGotPasswordClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("form", "verifyEmail");

    router.push(`/auth/reset-password?${params.toString()}`);
  };
  return (
    <div className="flex items-center">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Button
        type="button"
        onClick={handleForGotPasswordClick}
        variant={"link"}
        size={"sm"}
        className="ml-auto inline-block text-xs active:text-blue-500 underline-offset-4 hover:underline"
      >
        Forgot your password?
      </Button>
    </div>
  );
}

const SignIn = () => {
  const router = useRouter();

  const [show, setShow] = React.useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = React.useState<boolean>(false);

  const [state, formAction, isPending] = React.useActionState<
    LoginState,
    FormData
  >(loginAction, initialState);
  const credentialsRef = React.useRef<{
    email: string;
    password: string;
  } | null>(null);

  const isLoading = isPending || isSigningIn;

  const loadingMessage = isPending
    ? "Verifying credentials..." // step 1: server action calling backend
    : isSigningIn
      ? "Setting up your session..." // step 2: signIn() calling /api/auth/providers
      : "Login";

  React.useEffect(() => {
    if (!state.success) return;

    async function callBackSignIn() {
      if (!credentialsRef.current) return;

      setIsSigningIn(true);
      const result = await signIn("credentials", {
        email: credentialsRef.current?.email,
        password: credentialsRef.current?.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/candidate");
      } else {
        setIsSigningIn(false);
      }
    }

    callBackSignIn();
  }, [state.success, router]);

  const handleFormAction = (formData: FormData) => {
    credentialsRef.current = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    formAction(formData);
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <section className="flex items-center justify-center px-4 md:px-6 h-screen relative overflow-hidden dark:bg-background bg-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <Card className="w-full max-w-sm mx-auto pb-0 relative z-10">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/auth/sign-up"} className="underline">
              Sign Up
            </Link>
          </CardAction>
        </CardHeader>
        <form className="space-y-4" action={handleFormAction}>
          <CardContent>
            <FieldGroup>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
                {state.errors?.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.email}
                  </p>
                )}
              </Field>

              <Field className="max-w-sm">
                <Suspense fallback={<div>Loading...</div>}>
                  <ForgotPasswordButton />
                </Suspense>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="******"
                    disabled={isLoading}
                  />
                  <InputGroupButton type="button" onClick={handleShowPassword}>
                    {show ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroup>
                {state.errors?.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.password}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 py-3">
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  {loadingMessage}
                  <Loader className="size-5 animate-spin" />
                </span>
              ) : (
                "Login"
              )}
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              type="button"
              className="w-full"
            >
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SignIn;
