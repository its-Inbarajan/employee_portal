// app/unauthorized/page.tsx
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground text-sm">
        You don&apos;t have permission to access this page.
      </p>
      <div className="flex gap-3">
        <Link href="/auth/sing-in" className="text-sm underline">
          Candidate Login
        </Link>
        <Link href="/auth/sing-in" className="text-sm underline">
          Recruiter Login
        </Link>
      </div>
    </div>
  );
}
