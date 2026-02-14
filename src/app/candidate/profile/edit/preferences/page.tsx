"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  ChevronDown,
  CurrencyIcon,
  List,
  ListChecksIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";

export default function Preference() {
  const currency = [
    {
      country: "United States",
      currency_name: "Dollar",
      code: "USD",
      symbol: "$",
    },
    {
      country: "Euro Member Countries",
      currency_name: "Euro",
      code: "EUR",
      symbol: "€",
    },
    {
      country: "United Kingdom",
      currency_name: "Pound Sterling",
      code: "GBP",
      symbol: "£",
    },
    {
      country: "Japan",
      currency_name: "Yen",
      code: "JPY",
      symbol: "¥",
    },
    {
      country: "China",
      currency_name: "Yuan Renminbi",
      code: "CNY",
      symbol: "¥",
    },
    {
      country: "India",
      currency_name: "Rupee",
      code: "INR",
      symbol: "₹",
    },
    {
      country: "Russia",
      currency_name: "Ruble",
      code: "RUB",
      symbol: "₽",
    },
    {
      country: "Canada",
      currency_name: "Canada Dollar",
      code: "CAD",
      symbol: "$",
    },
    {
      country: "Australia",
      currency_name: "Australia Dollar",
      code: "AUD",
      symbol: "$",
    },
    {
      country: "Switzerland",
      currency_name: "Franc",
      code: "CHF",
      symbol: "CHF",
    },
    {
      country: "Mexico",
      currency_name: "Peso",
      code: "MXN",
      symbol: "$",
    },
  ];

  const inputs = [
    {
      context: "Seed (1 - 10 employees)",
      input: ["ideal", "yes", "no"],
    },
    {
      context: "Early (11 - 50 employees)",
      input: ["ideal", "yes", "no"],
    },
    {
      context: "Mid-size (51 - 200 employees)",
      input: ["ideal", "yes", "no"],
    },
    {
      context: "Large (201 - 500 employees)",
      input: ["ideal", "yes", "no"],
    },
    {
      context: "Very Large (501 - 1000 employees)",
      input: ["ideal", "yes", "no"],
    },
    {
      context: "Massive (1001+ employees)",
      input: ["ideal", "yes", "no"],
    },
  ];

  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Where are you in job search? *
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Your current company will never see that you are looking for a
              job, no matter what you choose.
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="max-w-xs grid gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger
                  role="button"
                  className="w-full border bg-white px-2 py-1 ring-black rounded-sm flex h-12 justify-between items-center gap-2"
                >
                  <ListChecksIcon className="size-5 text-green-500" />
                  <span className="font-medium text-black text-base">
                    Ready to interview
                  </span>
                  <ChevronDown className="size-5 " />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[20rem] max-w-sm px-2.5 absolute -left-0 rounded -translate-1/2 top-36">
                  <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                    <div className="flex  items-center gap-2">
                      <List className="size-5 text-green-500" />
                      <span>Ready for interview</span>
                    </div>
                    <p className="font-normal leading-5 tracking-wider text-balance">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quibusdam, accusamus.
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                    <div className="flex  items-center gap-2">
                      <List className="size-5 text-green-500" />
                      <span>Open for offer</span>
                    </div>
                    <p className="font-normal leading-5 tracking-wider text-balance">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quibusdam, accusamus.
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                    <div className="flex  items-center gap-2">
                      <List className="size-5 text-green-500" />
                      <span>Close to offer</span>
                    </div>
                    <p className="font-normal leading-5 tracking-wider text-balance">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quibusdam, accusamus.
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-gray-500 font-normal leading-relaxed text-xs">
                Your job profile is visible to startups.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 md:my-8 lg:my-12" />

      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              US work authorization 🇺🇸 *
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-3 items-center">
              <span className="font-medium text-black leading-relaxed text-lg flex items-center w-full gap-2">
                Do you or will you require sponsorship for a US employment visa
                (e.g. H‑1B)?
              </span>

              <RadioGroup defaultValue="h1b_yes">
                <div className="flex items-center space-x-8">
                  <div className="flex gap-2">
                    <RadioGroupItem
                      value="h1b_yes"
                      id="h1b_yes"
                      className="ring-1"
                    />
                    <Label htmlFor="h1b_yes">Yes</Label>
                  </div>
                  <div className="flex gap-2">
                    <RadioGroupItem
                      value="h1b_no"
                      id="h1b_no"
                      className="ring-1"
                    />
                    <Label htmlFor="h1b_no">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-3 items-center">
              <span className="font-medium text-black leading-relaxed text-lg flex items-center w-full gap-2">
                Are you legally authorized to work in the United States?
              </span>

              <RadioGroup defaultValue="legally_authorized_US_yes">
                <div className="flex items-center space-x-8">
                  <div className="flex gap-2">
                    <RadioGroupItem
                      value="legally_authorized_US_yes"
                      id="legally_authorized_US_yes"
                      className="ring-1"
                    />
                    <Label htmlFor="legally_authorized_US_yes">Yes</Label>
                  </div>
                  <div className="flex gap-2">
                    <RadioGroupItem
                      value="legally_authorized_US_no"
                      id="legally_authorized_US_no"
                      className="ring-1"
                    />
                    <Label htmlFor="legally_authorized_US_no">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      {/* Type of jobs */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              What type of job are you interested in? *
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-2 items-center">
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="Full-time employee" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    <SelectLabel>Type of job</SelectLabel>
                    {[
                      "Full-time employee",
                      "Contractor",
                      "Intern",
                      "Co-founder",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center gap-4">
              <span className="text-lg font-medium leading-relaxed text-black">
                Also open to the following job types:
              </span>
              <div className="flex items-center space-x-3">
                <RadioGroup defaultValue="">
                  {["Contractor", "Intern", "Co-founder"].map((item) => (
                    <div
                      key={`type-of-job-${item}`}
                      className="flex space-x-2 items-center"
                    >
                      <RadioGroupItem
                        value={item}
                        id={item}
                        className="ring-1"
                      />
                      <Label htmlFor={item}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 md:my-8 lg:my-12" />
      {/* Preferred location */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              What locations do you want to work in?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className=" grid gap-2 items-center">
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
            <div className="flex gap-2 items-center">
              <Checkbox id="open-to-work-remote" className="ring-1" name="" />
              <Label htmlFor="open-to-work-remote">
                Open to working remotely
              </Label>
            </div>
            <div className="grid gap-2 items-center">
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="Onsite or Remote" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    {[
                      "Onsite or Remote",
                      "Onsite Preferred",
                      "Remote Preferred",
                      "Remote only",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              What is your desired salary?
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Let companies know how much you would like to earn annually.
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-5">
              <div className="col-span-5">
                <Select>
                  <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currency.map((item) => (
                      <SelectItem
                        className="flex flex-1 items-center"
                        key={item.currency_name}
                        value={item.code}
                      >
                        {item.country}
                        {item.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-7">
                <div className="relative">
                  <div className="absolute top-2 flex justify-center items-center left-2 inset-0 w-7 h-7 rounded bg-gray-300">
                    <CurrencyIcon className="size-4 top-2 static" />
                  </div>
                  <Input
                    className="rounded-md pl-10 border-px h-11 border-gray-500"
                    type="search"
                    id="amount"
                    name="amount"
                    placeholder="amount"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-semibold leading-relaxed text-black">
              Would you like to work at companies of these sizes?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-6 items-center">
              {inputs.map((item) => (
                <div
                  className="grid grid-cols-6 items-center"
                  key={item.context}
                >
                  <span className="col-span-3 text-nowrap font-medium text-sm">
                    {item.context}
                  </span>
                  {item.input.map((inp) => (
                    <RadioGroup key={`${item.context}_${inp}`}>
                      <div
                        key={`companies-size-${item}`}
                        className="flex space-x-2 items-center"
                      >
                        <RadioGroupItem
                          value={inp}
                          id={item.context}
                          className="ring-1"
                        />
                        <Label
                          htmlFor={item.context}
                          className="capitalize text-gray-700"
                        >
                          {inp}
                        </Label>
                      </div>
                    </RadioGroup>
                  ))}
                </div>
                // <div className="flex flex-col gap-14 w-full" >
                // </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
