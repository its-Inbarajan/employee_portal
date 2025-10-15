import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        {/* <div className="max-w-xs w-full">
          <label className="flex flex-col flex-1 gap-1 font-medium">
            About
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Tell us about yourself so startups know who you are.
            </span>
          </label>
        </div> */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col flex-1 gap-1 font-medium">
            About
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Tell us about yourself so startups know who you are.
            </span>
          </div>
          <div className="flex gap-3 flex-col w-full flex-1">
            <div className="grid w-full max-w-xl items-center">
              <label
                htmlFor="full_name"
                className="font-semibold text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Full Name
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="full_name"
                name="full_name"
              />
            </div>
            <div className="flex flex-row flex-1 gap-3 items-center flex-nowrap">
              <div className="w-20 block h-20 rounded-full ring-1 ring-gray-500">
                <Image
                  src={"/next.svg"}
                  width={50}
                  height={50}
                  className="w-full h-full object-center aspect-auto"
                  alt="edit-profile"
                />
              </div>
              <div className="ring-1 w-2xs max-w-fit cursor-pointer text-black text-center inline-block px-2.5 font-normal hover:bg-black hover:text-white transition-all duration-500 ease-in-out py-2 rounded ring-black">
                Upload a new photo
              </div>
            </div>

            <div className="grid w-full max-w-xl items-center ">
              <label
                htmlFor="full_name"
                className="font-semibold text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Where are you based?
              </label>
              {/* <InputGroup className="rounded-md  border-px border-gray-500 h-9 w-full">
                <InputGroupInput type="search" placeholder="Search..." />
                <InputGroupAddon className="bg-gray-500 text-center rounded text-black">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup> */}
              <div className="relative">
                <div className="absolute top-2 f;ex justify-center items-center left-2 inset-0 inline-block w-6 h-6 rounded bg-gray-300">
                  <SearchIcon className="size-5 top-2 static" />
                </div>
                <Input
                  className="rounded-md border-px h-10 border-gray-500"
                  type="text"
                  id="full_name"
                  name="full_name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
