"use server";

export interface LoginState {
    success: boolean;
    message: string;
    errors?: {
        email?: string;
        password?: string;
    };
}
export async function loginAction(_prevState: LoginState,
    formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email) return { success: false, message: "Validation failed", errors: { email: "Email is required." } };
    if (!password) return { success: false, message: "Validation failed", errors: { password: "Password is required." } };

    try {
        const response = await fetch(`${process.env.API_URL}/users/sign-in`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const text = await response.text();
        const data = text ? await JSON.parse(text) : {};

        if (!response.ok) {
            return { success: false, message: data.message || 'Invalid credentials' };
        }

        return { success: true, message: "Login successfull" };
    } catch {
        return { success: false, message: "Something went wrong, Please try again." }
    }
}   