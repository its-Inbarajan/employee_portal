import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LandingPage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_90%_at_50%_-5%,#B48CDE,#000)]"></div>

      <div className="relative z-20 flex mx-auto max-w-6xl w-full flex-row justify-between h-screen items-center px-4 gap-4">
        <div className="flex flex-col max-w-full items-center w-full lg:gap-y-2 gap-2 xl:gap-y-4 xl:items-start lg:items-start md:items-start">
          <Badge
            className="rounded-full sm:text-xs leading-6 tracking-normal text-[10px] font-normal uppercase"
            variant={"outline"}
          >
            architecting the future of recruitmen
          </Badge>
          <div className="lg:max-w-xl xl:max-w-2xl flex flex-col items-center text-center md:text-start md:items-start lg:items-start gap-1.5 xl:items-start tracking-wider w-full capitalize text-wrap">
            <span className="text-4xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
              find the right role.
            </span>
            <span className="text-4xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
              hire the elite.
            </span>
            <p className="text-xs md:w-fit lg:w-xl dark:text-gray-400 leading-6 tracking-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae illo quo fugit blanditiis laboriosam rerum culpa,
              iusto quasi tenetur voluptas suscipit voluptatem sit reiciendis
              eveniet, consequuntur numquam quod id eligendi.
            </p>
          </div>
          <div className="flex flex-1 w-full items-center gap-2">
            <InputGroup className="max-w-xs h-10">
              <InputGroupInput
                type="search"
                placeholder="Search roles, skills and companies..."
                className="placeholder:text-xs text-xs"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <Button
              className="bg-violet-500 h-10 text-white text-sm"
              variant={"default"}
              size={"sm"}
            >
              Explore Roles
            </Button>
          </div>
        </div>
        <figure className="w-2xl hidden md:block max-w-xs rounded-xl p-1 bg-white/10 backdrop-blur-sm max-h-full h-3/5 relative z-40">
          <Image
            src={"/landing-1.jpg"}
            alt="landing-image"
            width={100}
            height={100}
            className="aspect-auto w-full h-full object-center object-fill rounded-xl"
          />
        </figure>
      </div>
    </section>
  );
}
