'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = React.useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);

        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false, // handle redirect manually
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/candidate"); // redirect on success
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default SignIn;
