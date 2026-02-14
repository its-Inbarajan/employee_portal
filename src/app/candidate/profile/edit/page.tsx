"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Chip from "@/components/ui/chip";
import { CompoBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  EarthIcon,
  Github,
  Linkedin,
  Plus,
  SearchIcon,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React from "react";

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

const positions = [
  {
    data: [
      "This is a... position",
      "This is a sales position",
      "This is a Technical position",
    ],
  },
];

const pronouns = [
  {
    data: [
      "He / Him",
      "She / Her",
      "Type / Them",
      "Self Describe",
      "Prefer not to say",
    ],
  },
];

const gender = [
  {
    data: ["Men", "Women", "Non-Binary", "self describe", "Prefer not to say"],
  },
];

const race = [
  "Black / African-American",
  "East Asian (including Chinese, Japanese, Korean, and Mongolian)",
  "Hispanic or Latino/a/x",
  "Middle Eastern",
  "Native American or Alaskan Native",
  "Pacific Islander",
  "South Asian (including Bangladeshi, Bhutanese, Indian, Nepali, Pakistani, and Sri Lankan)",
  "Southeast Asian (including Burmese, Cambodian, Filipino, Hmong, Indonesian, Laotian, Malaysian, Mien, Singaporean, Thai, and Vietnamese)",
  "White",
  "Prefer not to say",
  "Self-describe",
];

type ToggleKeys = "exp" | "edu";

export default function ProfilePage() {
  const [toggle, setToggle] = React.useState<Record<ToggleKeys, boolean>>({
    exp: false,
    edu: false,
  });

  const handleToggle = (key: ToggleKeys) => {
    setToggle((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
                className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Full Name
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="full_name"
                autoFocus={true}
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
              <div className="flex items-center space-x-4">
                <Label
                  htmlFor="file_input"
                  className="ring-1 w-2xs max-w-fit cursor-pointer text-black text-center inline-block px-2.5 font-normal hover:bg-black hover:text-white transition-all duration-500 ease-in-out py-2 rounded ring-black"
                >
                  {/* <svg
                    className="w-5 h-5 inline-block mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg> */}
                  Upload a new photo
                </Label>
                <Input
                  type="file"
                  id="file_input"
                  className="hidden"
                  accept=".png"
                />
              </div>
            </div>

            <div className="grid w-full items-center ">
              <label
                htmlFor="location"
                className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
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
                    className="font-normal col-span-1 text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                  >
                    Select your primary role
                  </label>
                  <CompoBox
                    PopoverClassName="w-full rounded-md border-px border-gray-500"
                    options={roles}
                    placeholder="Choose Role"
                    CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <label
                    htmlFor="experience"
                    className="font-normal col-span-1 text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                  >
                    Years of experience
                  </label>
                  <CompoBox
                    PopoverClassName="w-full  rounded-md border-px border-gray-500"
                    options={years}
                    placeholder="Choose experience"
                    CommandClassName="max-w-full w-[18rem] lg:w-[12rem]"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2.5 w-full items-center ">
              <label
                htmlFor="location"
                className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
              >
                Open to the following roles
              </label>
              <div className="flex flex-row col-span-12 flex-wrap gap-2 items-center">
                <Chip value="Frontend Developer" />
              </div>
              <CompoBox
                PopoverClassName="w-full col-span-12 lg:col-span-12 rounded-md border-px border-gray-500"
                options={roles}
                placeholder="Choose a role"
                CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
              />
            </div>

            <div className="grid w-full items-center">
              <div className="flex flex-row w-full justify-between items-center">
                <label className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block">
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
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Social Profiles
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Where can people find you online?
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full  items-center">
              <label
                htmlFor="website"
                className="font-normal text-black leading-relaxed text-lg flex items-center w-full gap-2"
              >
                <EarthIcon className="size-4" /> <span>Website</span>
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="website"
                name="website"
                autoComplete="website"
              />
            </div>
            <div className="grid w-full items-center">
              <label
                htmlFor="linkedin"
                className="font-normal text-black leading-relaxed text-lg flex items-center w-full gap-2"
              >
                <Linkedin className="size-4" /> <span>Linkedin</span>
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="linkedin"
                name="linkedin"
                autoComplete="linkedin-url"
              />
            </div>
            <div className="grid w-full items-center">
              <label
                htmlFor="github"
                className="font-normal text-black leading-relaxed text-lg flex items-center w-full gap-2"
              >
                <Github className="size-4" /> <span>Github</span>
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="github"
                name="github"
                autoComplete="username"
              />
            </div>
            <div className="grid w-full items-center">
              <label
                htmlFor="twitter"
                className="font-normal text-black leading-relaxed text-lg flex items-center w-full gap-2"
              >
                <Twitter className="size-4" /> <span>Twitter</span>
              </label>
              <Input
                className="rounded-md border-px border-gray-500"
                type="text"
                id="twitter"
                name="twitter"
                autoComplete="username"
              />
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 md:my-8 lg:my-12" />
      {/* Experience */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Your work experience
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              What other positions have you held?
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            {!toggle.exp && (
              <div className="w-full block">
                <Button
                  onClick={() => handleToggle("exp")}
                  type="button"
                  variant={"link"}
                  className="bg-transparent font-normal leading-relaxed text-blue-500"
                >
                  <Plus className="size-4" />
                  Add work experience
                </Button>
              </div>
            )}
            {toggle.exp && (
              <Card className="bg-[#f5f5f5] rounded shadow-none">
                <CardContent>
                  <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
                    <div className="grid w-full  items-center">
                      <label
                        htmlFor="company"
                        className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                      >
                        Company
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="company"
                        name="company"
                        autoComplete="company"
                        placeholder="Type to search"
                      />
                    </div>
                    <div className="grid w-full items-center">
                      <label
                        htmlFor="title"
                        className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                      >
                        Title
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="title"
                        name="title"
                        autoComplete="title"
                        placeholder="Title"
                      />
                    </div>
                    <div className="grid w-full items-center">
                      <label
                        htmlFor="start_date"
                        className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                      >
                        State Date
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="date"
                        id="start_date"
                        name="start_date"
                      />
                    </div>
                    <div className="grid w-full items-center">
                      <label
                        htmlFor="end_date"
                        className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                      >
                        State Date
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="date"
                        id="end_date"
                        name="end_date"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="isCurrentCompany" />
                      <label
                        htmlFor="isCurrentCompany"
                        className="font-normal text-black leading-relaxed"
                      >
                        I currently work here
                      </label>
                    </div>
                    <div className="grid w-full items-center">
                      <label className="font-normal text-black leading-relaxed text-lg ">
                        Description
                      </label>
                      <Textarea
                        placeholder="Description"
                        id="description"
                        name="description"
                        className="h-[12rem] rounded-md text-sm leading-relaxed border-px border-gray-500"
                      />
                    </div>

                    <div className="grid w-full items-center">
                      <CompoBox
                        options={positions}
                        CommandClassName="w-full"
                        PopoverClassName="rounded-md border-px border-gray-500 w-full"
                        placeholder={positions[0].data[0] ?? "Choose position"}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-2">
                  <Button
                    type="reset"
                    variant={"default"}
                    onClick={() => handleToggle("exp")}
                    className="bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
                  >
                    Close
                  </Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      {/* Education */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Education
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              What schools have you studied at?
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            {!toggle.edu && (
              <div className="w-full block">
                <Button
                  onClick={() => handleToggle("edu")}
                  type="button"
                  variant={"link"}
                  className="bg-transparent font-normal leading-relaxed text-blue-500"
                >
                  <Plus className="size-4" />
                  Add Education
                </Button>
              </div>
            )}
            {toggle.edu && (
              <Card className="bg-[#f5f5f5] rounded shadow-none">
                <CardContent>
                  <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
                    <div className="grid w-full  items-center">
                      <label
                        htmlFor="education"
                        className="font-normal text-black leading-relaxed text-lg after:content-['*'] after:text-red-500 after:ml-1 after:inline-block"
                      >
                        Education
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="education"
                        name="education"
                        autoComplete="education"
                        placeholder="Collage / University"
                      />
                    </div>
                    <div className="grid w-full items-center">
                      <label
                        htmlFor="graduation"
                        className="font-normal text-black leading-relaxed text-lg "
                      >
                        Graduation
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="graduation"
                        name="graduation"
                        autoComplete="graduation"
                        placeholder="Graduation"
                      />
                    </div>
                    <div className="grid w-full items-center">
                      <label
                        htmlFor="degree_major"
                        className="font-normal text-black leading-relaxed text-lg "
                      >
                        Degree & Major
                      </label>
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="degree_major"
                        name="degree_major"
                        autoComplete="Degree & Major"
                        placeholder="Degree & Major"
                      />
                    </div>
                    <div className="grid gap-2 w-full items-center">
                      <Input
                        className="rounded-md border-px border-gray-500 bg-white"
                        type="text"
                        id="major_field_study"
                        name="major_field_study"
                        autoComplete="Major / Field of Study"
                        placeholder="Major / Field of Study"
                      />
                      <Button
                        variant={"ghost"}
                        className="text-gray-500 py-0 h-fit font-normal flex gap-1 flex-row items-center justify-self-start text-xs leading-relaxed"
                      >
                        <Plus className="size-3" /> Add major
                      </Button>
                    </div>
                    <div className="grid  w-full items-center">
                      <label
                        htmlFor="GPA"
                        className="font-normal text-black leading-relaxed text-lg "
                      >
                        GPA
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        <Input
                          className="rounded-md col-span-2 border-px border-gray-500 bg-white"
                          type="text"
                          id="GPA"
                          name="GPA"
                          autoComplete="GPA"
                          placeholder="GPA"
                        />

                        <Input
                          className="rounded-md col-span-2 border-px border-gray-500 bg-white"
                          type="text"
                          id="MAX"
                          name="MAX"
                          autoComplete="MAX"
                          placeholder="MAX"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-2">
                  <Button
                    type="reset"
                    variant={"default"}
                    onClick={() => handleToggle("edu")}
                    className="bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
                  >
                    Close
                  </Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      {/* Skills */}

      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Your Skills
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              This will help startups hone in on your strengths.
            </span>
          </div>
          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="flex flex-wrap gap-1.5">
              {[
                "Frontend developer",
                "Full Stack Developer",
                "MERN Stack Developer",
                "ReactJs",
                "NextJs",
                "NodeJs",
                "ExpressJs",
                "Typescript",
                "Javascript",
                "Redux",
                "Socket.io",
                "CSS",
                "SCSS",
                "AWS",
              ].map((item) => (
                <Chip key={`title_${item}`} value={item} />
              ))}
            </div>

            <div className="grid w-full items-center ">
              <div className="relative">
                <div className="absolute top-2 flex justify-center items-center left-2 inset-0 w-7 h-7 rounded bg-gray-300">
                  <SearchIcon className="size-4 top-2 static" />
                </div>
                <Input
                  className="rounded-md pl-10 border-px h-11 border-gray-500"
                  type="search"
                  id="skill"
                  name="skill"
                  placeholder="e.g. Python, React"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      {/* Achivement */}

      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Your Skills
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              This will help startups hone in on your strengths.
            </span>
          </div>
          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <span className="inline-block text-sm text-gray-400 text-end font-medium leading-relaxed">
                1000
              </span>
              <Textarea
                placeholder="It's OK to brag"
                id="achivement"
                name="achivement"
                className="h-[12rem] rounded-md text-sm leading-relaxed border-px border-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />
      {/* Gender */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Identity
            </p>
            <span className="font-normal text-sm text-gray-700 leading-relaxed">
              At JOBS, we’re committed to helping companies hire in a more
              inclusive way. Part of that includes asking candidates to share
              demographic information so we can help recruiters understand and
              build their pipeline.
            </span>
            <span className="font-normal text-sm text-gray-700 leading-relaxed">
              Self identifying is completely optional, and we&apos;ll handle
              your information with care. Your responses to gender and ethnicity
              will not be displayed on your profile, and displaying your
              pronouns is optional.
            </span>
          </div>
          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid items-center w-full">
              <label
                htmlFor="pronouns"
                className="font-normal text-black leading-relaxed text-lg "
              >
                Pronouns
              </label>
              <Select name="pronouns">
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="Select Pronouns" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    <SelectLabel>Pronouns</SelectLabel>
                    {pronouns[0].data.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="display-pronouns-on-proflie" />
              <Label htmlFor="display-pronouns-on-proflie">
                Display pronouns on my profile
              </Label>
            </div>
            <div className="grid items-center w-full">
              <label
                htmlFor="gender"
                className="font-normal text-black leading-relaxed text-lg "
              >
                Gender Identity
              </label>
              <Select name="gender">
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {gender[0].data.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center w-full">
              <label
                htmlFor="race"
                className="font-normal text-black leading-relaxed text-lg "
              >
                Race/Ethnicity
              </label>
              <span className="font-normal leading-relaxed text-xs text-gray-400">
                You can select multiple
              </span>
              {race.map((item) => (
                <div key={`race_${item}`} className="flex items-center gap-3">
                  <Checkbox id={item} className="border-px border-gray-400" />
                  <label
                    htmlFor={item}
                    className="font-normal text-black leading-relaxed"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
