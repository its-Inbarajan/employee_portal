import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell } from "lucide-react";
import AnimatedSearch from "./ui/animated-search";

export const Navbar = () => {
  return (
    <nav className="py-4 bg-white border-b border-gray-300 w-full px-12">
      <div className="flex justify-between items-center">
        <div className="rounded-xl">
          <Image
            src={"/next.svg"}
            alt="logo"
            loading="lazy"
            width={0}
            height={0}
            className="w-10 h-10 object-center"
          />
        </div>
        <div className="flex justify-center items-center gap-2.5">
          <div className="flex items-center">
            <AnimatedSearch />
          </div>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger
                role="button"
                className="group p-2 rounded-full cursor-pointer hover:bg-purple-200 transition ease-in-out"
              >
                <Bell className="size-5 text-gray-500 group-hover:text-purple-500" />
              </DropdownMenuTrigger>
              <div className="">
                <DropdownMenuContent className="w-xs absolute -translate-1/2 top-10">
                  <DropdownMenuLabel>No notification.</DropdownMenuLabel>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
          <div className="">
            <p>Ready for work dropdown</p>
          </div>
          <div className="">
            <p>Profile</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
