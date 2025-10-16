import { Button } from "@/components/ui/button";
import { CompoBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, X } from "lucide-react";
import Image from "next/image";

const roles = [
  {
    heading: "Engineering",
    data: [
      "software engineering",
      "mobile developer",
      "IOS developer",
      "andriod developer",
      "frontend engineering",
      "backend engineering",
      "Full-Stack engineering",
      "software architect",
      "security engineering",
      "machine learning engineering",
      "embedded engineering",
      "data engineering",
      "devops",
      "engineering manager",
      "qa engineering",
      "data scientict",
    ],
  },
  {
    heading: "Designer",
    data: [
      "Junior Designer",
      "Graphic Designer",
      "Visual Designer",
      "User Interface (UI) Designer",
      "User Experience (UX) Designer",
      "Product Designer",
      "Interaction Designer",
      "Motion Graphics Designer",
      "Web Designer",
    ],
  },
];

const years = [
  {
    data: [
      "< 1 year",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "7 years",
      "8 years",
      "9 years",
      "10+ years",
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              About
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Tell us about yourself so startups know who you are.
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full  items-center">
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
                autoComplete="username"
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

            <div className="grid w-full items-center ">
              <label
                htmlFor="location"
                className="font-semibold text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Where are you based?
              </label>

              <div className="relative">
                <div className="absolute top-2 flex justify-center items-center left-2 inset-0 w-7 h-7 rounded bg-gray-300">
                  <SearchIcon className="size-4 top-2 static" />
                </div>
                <Input
                  className="rounded-md pl-10 border-px h-11 border-gray-500"
                  type="search"
                  id="location"
                  name="location"
                  placeholder="e.g. San Francisco"
                />
              </div>
            </div>

            <div className="grid w-full items-center ">
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-12 lg:col-span-8 ">
                  <label
                    htmlFor="primary role"
                    className="font-semibold col-span-1 text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                  >
                    Select your primary role
                  </label>
                  <CompoBox
                    PopoverClassName="w-full rounded-md border-px border-gray-500"
                    options={roles}
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <label
                    htmlFor="experience"
                    className="font-semibold col-span-1 text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                  >
                    Years of experience
                  </label>
                  <CompoBox
                    PopoverClassName="w-full  rounded-md border-px border-gray-500"
                    options={years}
                    CommandClassName="max-w-full w-[18rem] lg:w-[12rem]"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2.5 w-full items-center ">
              <label
                htmlFor="location"
                className="font-semibold text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Open to the following roles
              </label>
              <div className="flex flex-row col-span-12 flex-wrap gap-2 items-center">
                <div className="w-auto rounded bg-gray-300 px-2 py-2 flex flex-row gap-2 items-center">
                  <span className="font-normal leading-relaxed text-sm text-black">
                    Frontend Developer
                  </span>
                  <Button
                    variant={"default"}
                    className="bg-transparent h-5 p-0 hover:bg-transparent  cursor-pointer inline-block"
                  >
                    <X className="size-5 text-black" />
                  </Button>
                </div>
              </div>
              <CompoBox
                PopoverClassName="w-full col-span-12 lg:col-span-12 rounded-md border-px border-gray-500"
                options={roles}
                CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
              />
            </div>

            <div className="grid w-full items-center">
              <div className="flex flex-row w-full justify-between items-center">
                <label className="font-semibold text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block">
                  Your bio
                </label>
                <span className="inline-block text-sm font-medium leading-relaxed">
                  160
                </span>
              </div>
              <Textarea className="h-[12rem] rounded-md text-sm leading-relaxed border-px border-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex">
        <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
          <p className="text-xl font-normal leading-relaxed text-black">
            Social Profiles
          </p>
          <span className="font-normal text-sm text-gray-500 leading-relaxed">
            Where can people find you online?
          </span>
        </div>
      </div> */}
    </div>
  );
}
