import Header from "@/components/public-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={``}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
}
