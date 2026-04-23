"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  BuildingIcon,
  ComputerIcon,
  EarthIcon,
  PlusIcon,
  SearchIcon,
  Target,
} from "lucide-react";
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
export default function JobFilter() {
  return (
    <>
      <form>
        <div className="flex flex-col h-full relative">
          <div className="overflow-auto flex-1">
            <div className="h-fit flex flex-col shadow px-3 py-3 rounded ">
              <div className="grid relative w-full grid-cols-1 md:grid-cols-2 gap-2.5 items-center">
                {/* <CompoBox
                  PopoverClassName="w-full rounded h-12 bg-gray-200 px-1 border-px border-gray-500"
                  options={roles}
                  placeholder="Choose Role"
                  CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                />
                <CompoBox
                  PopoverClassName="w-full rounded h-12 bg-gray-200 px-1 border-px border-gray-500"
                  options={[]}
                  placeholder="Choose location"
                  CommandClassName="max-w-full w-[18rem] lg:w-[24rem]"
                /> */}

                <Combobox items={roles}>
                  <ComboboxInput placeholder="Select a framework" />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <div className="sticky top-0 z-20">
                <div className="col-span-full  w-full py-2">
                  <div className="border-dotted border-2 px-1 py-1 rounded w-fit inline-block text-gray-400 border-gray-300">
                    No filter Selected
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold text-lg mb-3 text-accent-foreground leading-relaxed">
                Compenstation
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 space-y-5">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Salary
                    </p>
                    <div className="font-normal text-gray-300 text-sm">
                      Any Salary
                    </div>
                    <div className="flex md:flex-row flex-col gap-2.5 w-full items-center">
                      <Input
                        placeholder="Minimum salary"
                        className="rounded w-full placeholder:text-gray-400"
                        type="number"
                      />{" "}
                      <span className="text-xl text-gray-400">-</span>
                      <Input
                        placeholder="Maximum salary"
                        className="rounded w-full placeholder:text-gray-400"
                        type="number"
                      />
                    </div>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currency.map((item) => (
                            <SelectItem
                              className="flex flex-1 gap-2 items-center"
                              key={`filters-${item.currency_name}`}
                              value={item.code}
                            >
                              <span>{item.country}</span>
                              <span>{item.symbol}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 space-y-5">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Equity
                    </p>
                    <div className="grid w-full gap-2 items-center">
                      <Label htmlFor="equity-value">0% - 2%+</Label>
                      <Slider defaultValue={[0.1, 0.1]} max={10} step={2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-accent-foreground leading-relaxed py-2">
                <Target className="size-5" /> Areas of Interest
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Skills
                    </p>

                    <div className="flex flex-col gap-2.5 w-full items-center">
                      <Input
                        placeholder="Type to search"
                        className="rounded w-full placeholder:text-gray-400"
                        type="search"
                      />
                      <div className="flex flex-col justify-self-start  w-full">
                        <div className="uppercase font-normal text-gray-400 text-xs">
                          Popular
                        </div>
                        {[
                          "react",
                          "python",
                          "nextjs",
                          "java",
                          "ruby on rails",
                        ].map((item) => (
                          <div
                            className="flex justify-between items-center gap-2 w-full"
                            key={`popular-lan-${item}`}
                          >
                            <div className="font-medium leading-relaxed text-sm capitalize tracking-wide">
                              {item}
                            </div>
                            <Button
                              size={"icon-sm"}
                              variant={"secondary"}
                              className="hover:bg-transparent bg-transparent"
                            >
                              <PlusIcon className="size-5 text-blue-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Market
                    </p>

                    <div className="flex flex-col gap-2.5 w-full items-center">
                      <Input
                        placeholder="Type to search"
                        className="rounded w-full placeholder:text-gray-400"
                        type="search"
                      />
                      <div className="flex flex-col justify-self-start  w-full">
                        <div className="uppercase font-normal text-gray-400 text-xs">
                          Popular
                        </div>
                        {[
                          "Healthcare",
                          "E-Commerce",
                          "Education",
                          "Enterprise Software",
                          "Marketplaces",
                        ].map((item) => (
                          <div
                            className="flex justify-between items-center gap-2 w-full"
                            key={`popular-lan-${item}`}
                          >
                            <div className="font-medium leading-relaxed text-sm capitalize tracking-wide">
                              {item}
                            </div>
                            <Button
                              size={"icon-sm"}
                              variant={"secondary"}
                              className="hover:bg-transparent bg-transparent"
                            >
                              <PlusIcon className="size-5 text-blue-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-accent-foreground leading-relaxed py-2">
                <ComputerIcon className="size-5" /> Job Details
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Job Types
                    </p>

                    <div className="flex flex-col gap-2.5 w-full justify-start">
                      {["Full Time", "Contract", "Internship", "Cofounder"].map(
                        (item) => (
                          <div
                            key={`job-types-${item}`}
                            className="flex items-center justify-start gap-2"
                          >
                            <Checkbox
                              id={item.toLocaleLowerCase()}
                              name={item.toLocaleLowerCase()}
                            />
                            <Label htmlFor={item.toLocaleLowerCase()}>
                              {item}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Required experience
                    </p>
                    <div className="grid w-full gap-2 items-center">
                      <Label
                        htmlFor="exp"
                        className="text-xs tracking-wide leading-relaxed text-gray-400"
                      >
                        {" "}
                        Filter jobs by minimum years of experience
                      </Label>
                      <Slider
                        defaultValue={[0, 10]} // Or use `value` prop for controlled component
                        max={10}
                        step={1}
                        // value={range}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-accent-foreground leading-relaxed py-2">
                <SearchIcon className="size-5" /> Keywords
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Included keywords
                    </p>

                    <div className="flex flex-col gap-2.5 w-full justify-start">
                      <div className="relative w-full">
                        <Input type="search" name="keywords" id="keywords" />
                        <div className="absolute inset-0 top-0 left-0 md:left-[24.5rem] z-0">
                          <Button variant={"default"} type="button">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Excluded keywords
                    </p>
                    <div className="flex flex-col gap-2.5 w-full justify-start">
                      <div className="relative w-full">
                        <Input type="search" name="keywords" id="keywords" />
                        <div className="absolute inset-0 top-0 left-0 md:left-[24.5rem] z-0">
                          <Button variant={"default"} type="button">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-accent-foreground leading-relaxed py-2">
                <BuildingIcon className="size-5" /> Company Details
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Company size
                    </p>

                    <div className="flex flex-col gap-2.5 w-full justify-start">
                      {[
                        "1-10 employees",
                        "11-50 employees",
                        "51-200 employees",
                        "201-500 employees",
                        "501-1000 employees",
                        "1001-5000 employees",
                        "5000+ employees",
                      ].map((item) => (
                        <div
                          key={`company-size-${item}`}
                          className="flex items-center justify-start gap-2"
                        >
                          <Checkbox
                            id={item.toLocaleLowerCase()}
                            name={item.toLocaleLowerCase()}
                          />
                          <Label htmlFor={item.toLocaleLowerCase()}>
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Investment stage
                    </p>
                    <div className="flex flex-col gap-2.5 w-full justify-start">
                      {[
                        "Seed Stage",
                        "Series A",
                        "Series B",
                        "Growth",
                        "IPO",
                        "Acquired",
                      ].map((item) => (
                        <div
                          key={`investment-stage-${item}`}
                          className="flex items-center justify-start gap-2"
                        >
                          <Checkbox
                            id={item.toLocaleLowerCase()}
                            name={item.toLocaleLowerCase()}
                          />
                          <Label htmlFor={item.toLocaleLowerCase()}>
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Remote culture
                    </p>
                    <div className="flex items-center justify-start gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="remote-culture" />
                        <Label htmlFor="remote-culture">
                          {" "}
                          Only show jobs at companies that are mostly or fully
                          remote
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Responsiveness
                    </p>
                    <div className="flex items-center justify-start gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="responsiveness" />
                        <Label htmlFor="responsiveness">
                          {" "}
                          Only show companies highly responsive to incoming
                          applications
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-3 md:py-6 md:px-6">
              <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-accent-foreground leading-relaxed py-2">
                <EarthIcon className="size-5" /> Immigration
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded ring py-3 px-2 ring-secondary w-full">
                  <div className="px-2 py-2 grid w-full gap-4">
                    <p className="font-medium leading-tight text-accent-foreground text-lg">
                      Immigration
                    </p>
                    <div className="flex items-center justify-start gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="immigration" />
                        <Label htmlFor="immigration">
                          {" "}
                          Only show companies that can sponsor a visa
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </div>
        {/* footer */}
        <DialogFooter className="flex-shrink-0 bg-background rounded-bl-xl left-0 border-t py-5 px-10">
          <div className="flex w-full justify-start items-center gap-2">
            <Button>Submit</Button>
          </div>
        </DialogFooter>
      </form>
    </>
  );
}
