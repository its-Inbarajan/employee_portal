import PublicFooter from "@/components/public-footer";
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
      <footer>
        <PublicFooter />
      </footer>
    </div>
  );
}
