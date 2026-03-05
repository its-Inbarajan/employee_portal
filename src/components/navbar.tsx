"use client";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, List, ListChecksIcon } from "lucide-react";
import AnimatedSearch from "./ui/animated-search";
import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ModeToggle } from "./ui/theme-toggle";
import { Notification } from "./notification";
import LogoutButton from "./logout-button";

export const Navbar = () => {

  return (
    <nav className="py-2 bg-sidebar text-sidebar-foreground w-full px-2 md:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger variant={'outline'} size={"icon"} className="dark:text-white" />
            </TooltipTrigger>
            <TooltipContent>Press CTRL + B</TooltipContent>
          </Tooltip>
          <div className="rounded-xl flex items-center gap-2">
            <Image
              src={"/next.svg"}
              alt="logo"
              loading="lazy"
              width={0}
              height={0}
              className="w-10 h-10 dark:brightness-75 dark:contrast-125 dark:invert object-center"
            />
          </div>
        </div>
        <div className="flex justify-between md:justify-center items-center gap-2.5">
          <div className="hidden md:flex items-center">
            <AnimatedSearch />
          </div>
          <div className="relative">
            <Notification />
          </div>
          <div className="relative">
            <ModeToggle />
          </div>
          <div className="md:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                role="button"
                className="w-full border bg-white px-2 py-1 ring-black rounded-sm flex justify-between items-center gap-2"
              >
                <ListChecksIcon className="size-5 text-green-500" />
                <span className="font-medium text-black text-base">
                  Ready to interview
                </span>
                <ChevronDown className="size-5 " />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[17rem] px-2.5 absolute -left-[6rem] md:-left-[1.5rem] rounded -translate-1/2 top-40">
                <DropdownMenuLabel className="flex gap-1 flex-col dark:hover:bg-background hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                  <div className="flex  items-center gap-2">
                    <List className="size-5 text-green-500" />
                    <span>Ready for interview</span>
                  </div>
                  <p className="font-normal leading-5 tracking-wider text-xs text-balance">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quibusdam, accusamus.
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex gap-1 flex-col dark:hover:bg-background hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                  <div className="flex  items-center gap-2">
                    <List className="size-5 text-green-500" />
                    <span>Open for offer</span>
                  </div>
                  <p className="font-normal leading-5 tracking-wider text-xs text-balance">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quibusdam, accusamus.
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex gap-1 flex-col dark:hover:bg-background hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                  <div className="flex  items-center gap-2">
                    <List className="size-5 text-green-500" />
                    <span>Close to offer</span>
                  </div>
                  <p className="font-normal leading-5 tracking-wider text-xs text-balance">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quibusdam, accusamus.
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger
                role="button"
                className="rounded-md px-2 flex w-20 justify-between h-12 items-center dark:hover:bg-background hover:bg-blue-50 hover:cursor-pointer"
              >
                <div className="w-9 block h-9 rounded-full ring-1 ring-gray-500">
                  <Image
                    src={"/next.svg"}
                    width={10}
                    height={10}
                    alt="profile"
                    className="w-full h-full dark:brightness-75 dark:contrast-125 dark:invert object-center aspect-auto"
                  />
                </div>
                <ChevronDown className="size-5" />
              </DropdownMenuTrigger>
              <div className="">
                <DropdownMenuContent className="w-[18rem] px-2.5 absolute -left-[6rem] md:-left-[7rem] rounded -translate-1/2 top-52 ">
                  <DropdownMenuLabel className="flex gap-1.5 items-center">
                    <Image
                      src={"/next.svg"}
                      width={10}
                      height={10}
                      className="rounded-full h-10 w-10 dark:brightness-75 dark:contrast-125 dark:invert border-1 border-black select-none object-fit "
                      alt="profile- piture"
                    />
                    <div className="w-full space-y-1.5">
                      <p className="font-bold leading-6 mb-0 tracking-wide text-sm">
                        Inba Rajan
                      </p>
                      <span className="font-normal leading-5 tracking-tight text-xs text-gray-400">
                        Looking for jobs
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="p-0">
                    <p className="text-md font-normal leading-6 mb-0 tracking-wide text-gray-400">
                      Personal
                    </p>
                    <ul className="list-none flex flex-col space-y-1.5 justify-start">
                      {[
                        "Edit profile",
                        "Cookie Prefernces",
                        "Settings",
                        "notification",
                        "referals",
                      ].map((item) => (
                        <li
                          key={item}
                          className="font-normal hover:bg-gray-400 cursor-pointer transition duration-500 ease-in-out py-1 px-1 rounded-xs  leading-4 tracking-wide text-sm"
                        >
                          <Link href={"/"} className="w-full capitalize ">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="p-0">
                    <p className="text-md font-normal leading-6 mb-0 tracking-wide text-gray-400">
                      Support
                    </p>
                    <ul className="list-none flex flex-col space-y-1.5 justify-start">
                      {["help", "status"].map((item) => (
                        <li
                          key={item}
                          className="font-normal hover:bg-gray-400 cursor-pointer transition duration-500 ease-in-out py-1 px-1 rounded-xs  leading-4 tracking-wide text-sm"
                        >
                          <Link href={"/"} className="w-full capitalize ">
                            {item}
                          </Link>
                        </li>
                      ))}
                      <LogoutButton />
                    </ul>
                    <div className="p-1">
                      <Button
                        type="button"
                        className="bg-blue-100 hover:cursor-pointer hover:bg-blue-200 ease-in-out transition duration-200 text-blue-500 font-medium text-base text-center w-full rounded-md py-2 px-2"
                      >
                        POST A JOB
                      </Button>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
