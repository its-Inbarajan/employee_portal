// app/api/auth/logout/route.ts
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '../[...nextauth]/route';
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // ✅ Read refreshToken cookie from the incoming browser request
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "refreshToken is missing" }, { status: 204 });
    }

    try {
        // ✅ Call your backend logout endpoint
        const res = await fetch(`${process.env.API_URL}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        const result = await res.json();
        console.log(result)
        if (!res.ok) {
            throw new Error(result.message);
        }

        // ✅ Also clear the cookie on Next.js side
        const response = NextResponse.json({
            message: result.message || "Logged out successfully"
        });
        response.cookies.delete("refreshToken");

        return response;

    } catch (error: unknown) {
        console.log(error)
        // ✅ Still return success — client will clear session anyway
        return NextResponse.json({ message: "Logged out" }, { status: 200 });
    }
}