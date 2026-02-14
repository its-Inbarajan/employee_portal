export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <header>Navbar</header>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    )
}