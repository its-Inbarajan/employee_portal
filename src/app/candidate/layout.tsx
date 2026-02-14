import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Asidebar } from "@/components/asidebar";
import { Toaster } from "@/components/ui/sonner";
import Advertice from "@/components/advertice";

export default function CandidateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
