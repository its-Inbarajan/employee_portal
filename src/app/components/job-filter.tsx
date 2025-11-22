"use client";
import { Button } from "@/components/ui/button";
import { CompoBox } from "@/components/ui/combobox";
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
import { Target } from "lucide-react";
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
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-1 pb-20">
        <div className="h-fit bg-white flex flex-col shadow px-3 py-3 rounded ">
          <div className="grid  relative w-full grid-cols-2 gap-2.5 items-center">
            <CompoBox
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
            />
          </div>
          <div className="sticky top-0 z-20">
            <div className="col-span-full  w-full  bg-white  py-2">
              <div className="border-dotted border-2 px-1 py-1 rounded w-fit inline-block text-gray-400 border-gray-300">
                No filter Selected
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 md:py-6 md:px-6">
          <h1 className="font-semibold text-lg mb-3 text-black leading-relaxed">
            Compenstation
          </h1>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded ring py-3 px-2 ring-secondary w-full">
              <div className="px-2 py-2 space-y-5">
                <p className="font-medium leading-tight text-black text-lg">
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
                <p className="font-medium leading-tight text-black text-lg">
                  Equity
                </p>
                <div className="grid w-full gap-2 items-center">
                  <Label htmlFor="equity-value">0% - 2%+</Label>
                  <Slider defaultValue={[33]} max={100} step={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-3 md:py-6 md:px-6">
          <h1 className="font-semibold inline-flex gap-2 items-center text-lg mb-3 text-black leading-relaxed bg-white py-2">
            <Target className="size-5" /> Areas of Interest
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded ring py-3 px-2 ring-secondary w-full">
              <div className="px-2 py-2 space-y-5">
                <p className="font-medium leading-tight text-black text-lg">
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
                <p className="font-medium leading-tight text-black text-lg">
                  Equity
                </p>
                <div className="grid w-full gap-2 items-center">
                  <Label htmlFor="equity-value">0% - 2%+</Label>
                  <Slider defaultValue={[33]} max={100} step={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
      </div>
      {/* footer */}
      <div className="border-t py-2 px-2 flex w-full justify-end bg-white h-fit">
        <Button variant={"default"} type="button">
          View Result
        </Button>
      </div>
    </div>
  );
}
