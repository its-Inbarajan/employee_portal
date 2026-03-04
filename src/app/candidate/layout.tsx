import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Asidebar } from "@/components/asidebar";
import { Toaster } from "@/components/ui/sonner";
import Advertice from "@/components/advertice";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CandidateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    console.log(session)
    // Protect — redirect if not logged in
    if (!session) {
        redirect("/auth/sign-in");
    }
    return (
        <div>
            <SidebarProvider>
                <div className="min-h-screen md:h-screen w-full grid grid-cols-[auto_1fr]">
                    <aside className="sticky top-0 h-screen overflow-y-auto">
                        <Asidebar />
                    </aside>
                    <div className="grid grid-rows-[auto_1fr] min-h-screen">
                        <header>
                            <Advertice />
                            <Navbar />
                        </header>

                        <main className="min-h-0 overflow-y-auto p-2 md:p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Toaster position="bottom-right" theme="system" />
        </div>
    );
}
