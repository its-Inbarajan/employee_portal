import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLinkIcon, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navigations = [
  {
    id: 0,
    title: "for job seekers",
    route: "/seekers",
  },
  {
    id: 1,
    title: "for companies",
    route: "/companies",
  },
];
export default function Header() {
  return (
    <div className="fixed z-50 rounded-full top-0 sm:top-5 left-0 sm:left-1/2 md:-translate-x-1/2 bg-white/20 sm:p-0.5 w-full md:w-2xl lg:w-3xl flex items-center ">
      <div className="w-full text-black px-8 rounded-none sm:rounded-full backdrop-blur-md">
        <div className="flex w-full justify-between items-center gap-10">
          <figure>
            <Link href={"/"} title="Home">
              <Image
                src={"./next.svg"}
                alt={"logo"}
                className="w-12 h-12 object-fill object-center"
                loading="lazy"
                width={50}
                height={50}
              />
            </Link>
          </figure>
          {/* Mobile Navigation */}
          <MobileNav />
          <nav className="relative md:block hidden">
            <ul className="list-none flex  items-center gap-2">
              {Navigations.map((nav) => (
                <li
                  key={`public-nav-${nav.title}`}
                  className="inline-block hover:bg-white rounded-full hover:ring hover:ring-black px-2 py-1 transition-all duration-300 ease-linear tracking-wide"
                >
                  <Link
                    href={`${nav.route}`}
                    className="text-black text-sm font-light font-Poppins leading-tight capitalize"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden sm:flex items-center justify-end gap-2">
            <Button asChild variant={"secondary"} size={"sm"}>
              <Link href={"/auth/sign-in"}>Sign in</Link>
            </Button>
            <Button asChild variant={"default"} size={"sm"}>
              <Link href={"/auth/sign-up"}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 justify-between h-full pb-4 px-4">
            <div className="flex flex-col gap-2">
              {["For job seekers", "for companies"].map((nav) => (
                <Link
                  key={`mobile-public-nav-${nav}`}
                  href={`/${nav}`}
                  className="capitalize inline-flex w-full justify-between items-center"
                >
                  {nav}
                  <ExternalLinkIcon size={10} />
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center w-full  gap-2">
              <Button
                asChild
                variant={"outline"}
                size={"sm"}
                className="w-full"
              >
                <Link href={"/auth/sign-in"} prefetch="auto">
                  Sign in
                </Link>
              </Button>
              <Button
                asChild
                variant={"outline"}
                size={"sm"}
                className="w-full"
              >
                <Link href={"/auth/sign-up"} prefetch="auto">
                  Sign Up
                </Link>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
