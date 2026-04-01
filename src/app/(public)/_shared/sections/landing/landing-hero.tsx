import AvatarGroupComponent from "@/components/avatar-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
const HelixCube = dynamic(() => import("@/components/HelixCube"), {
  ssr: false,
});
export default function LandingHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_38%_38%,_#e8e4f8_0%,_#ddd8f0_45%,_#c8c0e4_100%)] dark:bg-[radial-gradient(ellipse_80%_90%_at_50%_-5%,#B48CDE,#000)]" />
      <div className="absolute bottom-0 z-20 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="relative mb-52 z-20 pt-4 select-none flex lg:px-16 w-full flex-row justify-between h-screen items-center px-4 gap-4">
        <div className="flex flex-col max-w-full items-center w-full lg:gap-y-2 gap-2 xl:gap-y-2 xl:items-start lg:items-start md:items-start">
          <Badge
            className="rounded-full sm:text-xs leading-6 bg-white/5 backdrop-blur-md tracking-normal text-[10px] font-normal uppercase"
            variant={"outline"}
          >
            architecting the future of recruitment
          </Badge>
          <div className="lg:max-w-xl  xl:max-w-2xl flex flex-col items-center text-center md:text-start md:items-start lg:items-start gap-1.5 xl:items-start tracking-wider w-full capitalize text-wrap">
            <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
              find the right role.
            </span>
            <span className="text-3xl lg:text-6xl xl:text-7xl lg:font-extrabold font-bold">
              hire the elite.
            </span>
            <p className="text-xs md:w-fit lg:w-xl dark:text-gray-400 leading-4 md:leading-6 tracking-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae illo quo fugit blanditiis laboriosam rerum culpa,
              iusto quasi tenetur voluptas suscipit voluptatem sit reiciendis
              eveniet, consequuntur numquam quod id eligendi.
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-md items-center gap-2">
            <InputGroup className="max-w-md  w-full h-10">
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
              className="bg-violet-500 h-10 text-white text-sm w-full md:w-fit"
              variant={"default"}
              size={"sm"}
            >
              Explore Roles
            </Button>
          </div>

          <AvatarGroupComponent />
        </div>

        <figure className="max-w-full w-full sm:block hidden h-full relative isolate">
          <HelixCube className="absolute inset-0 -z-10 md:z-10 right-0 w-md h-1/2" />
        </figure>
      </div>
    </section>
  );
}
