import { NextRequest, NextResponse } from "next/server";
// import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// export default withAuth(
//   function middleware(req: NextRequestWithAuth) {
//     const token = req.nextauth.token;
//     const pathname = req.nextUrl.pathname;

//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/signin", req.url));
//     }

//     const isDashboard = pathname.startsWith("/candidate/dashboard");
//     const isOnboarding = pathname.startsWith("/onboarding");

//     if (isDashboard && !token.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/onboarding", req.url));
//     }

//     // If onboarding already done, don't let them go back to onboarding
//     if (isOnboarding && token.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       // Only run middleware if there's a token
//       authorized: ({ token }: { token: JWT | null }) => !!token,
//     },
//   },
// );

// export async function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   // ── Candidate token ──
//   const candidateToken = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     cookieName: "next-auth.session-token", // adjust if needed
//     // for candidate handler path
//     // salt: "/api/auth/candidate",
//   });

//   // ── Recruiter token ──
//   const recruiterToken = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     // salt: "/api/auth/recruiter",
//   });

//   const isCandidatePath = pathname.startsWith("/candidate");
//   const isRecruiterPath = pathname.startsWith("/recruiter");

//   console.log(candidateToken);
//   // ── Protect /candidate/* ──
//   if (isCandidatePath) {
//     // No candidate token
//     if (!candidateToken) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     // Has token but wrong role
//     if (candidateToken.userRole !== "CANDIDATE") {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }
//     // Onboarding guard
//     const isOnboarding = pathname.startsWith("/onboarding");
//     const isDashboard = pathname.startsWith("/candidate");
//     if (isDashboard && !candidateToken.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/onboarding", req.url));
//     }
//     if (isOnboarding && candidateToken.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/candidate", req.url));
//     }
//   }

//   // ── Protect /recruiter/* ──
//   if (isRecruiterPath) {
//     const isLoginPage =
//       pathname === "/auth/sign-in" || pathname === "/auth/sign-up/recruiter";
//     if (isLoginPage) return NextResponse.next();

//     // No recruiter token
//     if (!recruiterToken) {
//       return NextResponse.redirect(new URL("/auth/sign-up/recruiter", req.url));
//     }
//     // Has token but wrong role
//     if (recruiterToken.userRole !== "RECRUITER") {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }
//     // Onboarding guard
//     const isOnboarding = pathname.startsWith("/recruiter/onboarding");
//     const isDashboard = pathname.startsWith("/recruiter/dashboard");
//     if (isDashboard && !recruiterToken.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/recruiter/onboarding", req.url));
//     }
//     if (isOnboarding && recruiterToken.onboardingCompleted) {
//       return NextResponse.redirect(new URL("/recruiter/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/candidate/:path*", "/recruiter/:path*"],
// };

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isCandidatePath = pathname.startsWith("/candidate");
  const isRecruiterPath = pathname.startsWith("/recruiter");

  // ── Public recruiter paths — skip auth ──
  const recruiterPublicPaths = ["/auth/sign-up/recruiter", "/auth/sign-in"];
  if (recruiterPublicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (isCandidatePath) {
    //  Read candidate session cookie
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      // Next-auth sets cookie name based on NEXTAUTH_URL + basePath
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });

    // Not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Wrong role — recruiter trying to access candidate path
    if (token.userRole !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Onboarding guard
    const isOnboarding = pathname.startsWith("/onboarding");
    const isDashboard = !isOnboarding;

    if (isDashboard && !token.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding?step=1", req.url));
    }
    if (isOnboarding && token.onboardingCompleted) {
      return NextResponse.redirect(new URL("/candidate", req.url));
    }
  }

  if (isRecruiterPath) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Wrong role — candidate trying to access recruiter path
    if (token.userRole !== "RECRUITER") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Onboarding guard
    const isOnboarding = pathname.startsWith("/recruiter/onboarding");
    const isDashboard =
      !isOnboarding &&
      !pathname.startsWith("/auth/sing-in") &&
      !pathname.startsWith("/auth/sing-up/recruiter");

    if (isDashboard && !token.onboardingCompleted) {
      return NextResponse.redirect(
        new URL("/recruiter/onboarding?step=1", req.url),
      );
    }
    if (isOnboarding && token.onboardingCompleted) {
      return NextResponse.redirect(new URL("/recruiter/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/candidate/:path*", "/recruiter/:path*"],
};
