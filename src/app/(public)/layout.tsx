import Header from "@/components/public-header";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="overflow-hidden">
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    )
}