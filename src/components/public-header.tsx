import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLinkIcon, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const Navigations = [
    {
        id: 0,
        title: 'for job seekers',
        route: '/seekers'
    },
    {
        id: 1,
        title: 'for companies',
        route: '/companies'
    },

]
export default function Header() {
    // bg-linear-to-r from-[#B9FF66] to-gray-100 bg-size-[200%_200%]
    return (
        <div className="fixed z-50 rounded-full top-0 sm:top-5 left-0 sm:left-1/2 md:-translate-x-1/2 bg-white/5 sm:p-0.5 w-full md:w-2xl lg:w-3xl flex items-center ">
            <div className="w-full text-black px-8 rounded-none sm:rounded-full backdrop-blur-md">
                <div className="flex w-full justify-between items-center gap-10">
                    <figure>
                        <Link href={'/'} title="Home">
                            <Image
                                src={'./next.svg'}
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
                            {Navigations.map(nav => (
                                <li key={`public-nav-${nav.title}`} className="inline-block hover:bg-white rounded-full hover:ring hover:ring-black px-2 py-1 transition-all duration-300 ease-linear tracking-wide">
                                    <Link href={`${nav.route}`} className="text-black text-sm font-light font-Poppins leading-tight capitalize">
                                        {nav.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="hidden sm:flex items-center justify-end gap-2">
                        <Link href={'/auth/sign-in'} className="bg-white ring text-black ring-black text-sm font-light inline-block md:px-4 md:py-1.5 py-1 px-2.5 rounded-md hover:bg-black hover:text-[#B9FF66] transition-all duration-300 ease-in-out">
                            Sign in
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="border-none">
                                <Button className="bg-white ring text-black ring-black text-sm font-light h-8 text-center inline-flex items-center rounded-md hover:bg-black hover:text-[#B9FF66] transition-all duration-300 ease-in-out">Sign Up</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup >
                                    <Link href={'/auth/sign-up'}>
                                        <DropdownMenuItem className="hover:cursor-pointer">
                                            I&apos;m looking for a job
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/auth/recruit/sign-up'}>
                                        <DropdownMenuItem className="hover:cursor-pointer">
                                            I&apos;m looking for a candidates
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div >
    )
}


function MobileNav() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={'icon'} variant={"ghost"}>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="border-b pb-4">
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-4 justify-between h-full pb-4 px-4">
                        <div className="flex flex-col gap-2">
                            {['For job seekers', 'for companies'].map(nav => (
                                <Link key={`mobile-public-nav-${nav}`} href={`/${nav}`} className="capitalize inline-flex w-full justify-between items-center">
                                    {nav}  <ExternalLinkIcon className="size-4" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col items-center w-full  gap-2">
                            <Link href={'/auth/sign-in'} className="bg-white text-center w-full ring text-black ring-black text-sm font-light block md:px-4 md:py-1.5 py-1 px-2.5 rounded-md hover:bg-black hover:text-[#B9FF66] transition-all duration-300 ease-in-out h-8">
                                Sign in
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="border-none">
                                    <Button variant="outline" className="bg-white ring w-full text-black ring-black text-sm font-light h-8 text-center inline-flex items-center rounded-md hover:bg-black hover:text-[#B9FF66] transition-all duration-300 ease-in-out">Sign Up</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuGroup >
                                        <Link href={'/auth/sign-in'}>
                                            <DropdownMenuItem className="hover:cursor-pointer">
                                                I&apos;m looking for a job
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem>I&apos;m looking for a candidates</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}