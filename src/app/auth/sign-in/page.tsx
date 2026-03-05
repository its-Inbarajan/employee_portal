'use client'
import { loginAction, LoginState } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Loader2 } from 'lucide-react';
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
    }
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Login</h1>

                {/* ✅ Global error message */}
                {!state.success && state.message && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {state.message}
                    </div>
                )}

                {/* ✅ Success message */}
                {state.success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {state.message}
                    </div>
                )}

                <form action={handleFormAction} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor='email' className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${state.errors?.email
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />
                        {state.errors?.email && (
                            <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor='password' className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${state.errors?.password
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />

                        {state.errors?.password && (
                            <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant={'outline'}
                        size={'lg'}
                        disabled={isPending}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className='size-5' />
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
