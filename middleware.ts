import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const isDashboard = pathname.startsWith("/candidate/dashboard");
    const isOnboarding = pathname.startsWith("/onboarding");

    if (isDashboard && !token.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If onboarding already done, don't let them go back to onboarding
    if (isOnboarding && token.onboardingCompleted) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware if there's a token
      authorized: ({ token }: { token: JWT | null }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/candidate/:path*"],
};
