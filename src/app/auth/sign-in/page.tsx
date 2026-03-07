'use client'
import { loginAction, LoginState } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
const initialState: LoginState = {
    success: false,
    message: "",
    errors: {},
};
const SignIn = () => {
    const router = useRouter();
    const [state, formAction, isPending] = React.useActionState<LoginState, FormData>(
        loginAction,
        initialState
    );
    const credentialsRef = React.useRef<{ email: string, password: string } | null>(null);


    React.useEffect(() => {
        if (!credentialsRef.current) return;


        async function callBackSignIn() {
            await signIn("credentials", {
                email: credentialsRef.current?.email,
                password: credentialsRef.current?.password,
                redirect: false,
            }).then(() => router.push("/candidate"));
        };

        callBackSignIn();
    }, [state.success, router]);


    const handleFormAction = (formData: FormData) => {
        credentialsRef.current = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        formAction(formData);
    };

    return (
        <section className='flex items-center justify-center h-screen overflow-hidden dark:bg-background bg-white'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Link href={'/auth/sign-up'} className=''>Sign Up</Link>
                    </CardAction>
                </CardHeader>
                <form className='space-y-4' action={handleFormAction}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                {state.errors?.email && (
                                    <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" name="password" type="password" required />
                                {state.errors?.password && (
                                    <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button disabled={isPending} type="submit" className="w-full">
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className='size-5' />
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}

export default SignIn;
