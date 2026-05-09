"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLinkIcon, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

function NavLink({
  nav,
  isActive,
}: {
  nav: { route: string; title: string };
  isActive: boolean;
}) {
  return (
    <li
      key={`public-nav-${nav.title}`}
      className={cn(
        // Base Styles & Hover Effects (Your existing code)
        "inline-block group rounded-full px-2 py-1 transition-all  duration-300 ease-linear tracking-wide",
        "hover:bg-white hover:ring hover:ring-purple-500",

        // Active State: Forces the hover styles to stay on
        isActive && "bg-white ring ring-offset-2 ring-purple-500",
      )}
    >
      <Link
        href={`${nav.route}`}
        prefetch
        className={cn(
          // Base Link Styles
          "text-sm font-light text-accent-foreground transition-colors duration-300 ease-linear font-Poppins leading-tight capitalize",
          "group-hover:text-black",

          // Active Link State: Forces text to black
          isActive && "text-black font-medium",
        )}
      >
        {nav.title}
      </Link>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
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
              {Navigations.map((nav) => {
                const isActive = pathname === nav.route;
                return (
                  <NavLink
                    key={`public-comp-${nav.title}-${isActive}`}
                    isActive={isActive}
                    nav={nav}
                  />
                );
              })}
            </ul>
          </nav>
          <div className="hidden sm:flex items-center justify-end gap-2">
            <Button asChild variant={"secondary"} size={"sm"}>
              <Link href={"/auth/sign-in"}>Sign in</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size={"sm"}>
                  Sign up
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link prefetch href={"/auth/sign-up"}>
                    I&apos;m looking for job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link prefetch href={"/auth/sign-up/recruiter"}>
                    I&apos;m looking for candidates
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              {Navigations.map((nav) => (
                <SheetClose asChild key={`mobile-public-nav-${nav.id}`}>
                  <Link
                    href={`${nav.route}`}
                    prefetch
                    className="capitalize inline-flex w-ful justify-between items-center"
                  >
                    {nav.title}
                    <ExternalLinkIcon size={10} />
                  </Link>
                </SheetClose>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="w-full" size={"sm"}>
                    Sign up
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <Link prefetch href={"/auth/sign-up"}>
                      I&apos;m looking for job
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link prefetch href={"/auth/sign-up/recruiter"}>
                      I&apos;m looking for candidates
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Button
                asChild
               
                className="w-full"
              >
                <Link href={"/auth/sign-up"} prefetch="auto">
                  Sign Up
                </Link>
              </Button> */}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
