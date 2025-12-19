import { Button } from "@/components/ui/button";
import {
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import React from "react";

export default function JobPreferenceForm() {
  return (
    <>
      <DrawerHeader className="px-2 flex-shrink-0">
        <DrawerTitle className="inline-block">
          Manage your job preferences
        </DrawerTitle>
      </DrawerHeader>
      <form className="flex flex-col flex-1 min-h-0 overflow-y-auto px-2">
        <ScrollArea>
          <div className="flex flex-col gap-4 flex-1 pr-2">
            <div className="grid w-full gap-2 items-center">
              <Label htmlFor="preferred-job">Preferred Job Role (Max 3)</Label>
              <Input
                type="text"
                id="preferred-job"
                placeholder="Enter your preferred Job Role"
                className="rounded-xl h-12 w-full"
              />
              <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                {[
                  "frontend developer",
                  "mern stack developer",
                  "full stack developer",
                ].map((ite) => (
                  <div
                    key={`prefferred-job-${ite}`}
                    className=" inline-flex items-center gap-2 rounded-full capitalize py-1.5 px-2.5 w-fit bg-gray-200 ring font-medium text-sm tracking-wide text-black"
                  >
                    {ite}{" "}
                    <Button size={"sm"} className="h-fit has-[>svg]:px-0 px-0">
                      <XIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-2 items-center">
              <Label>Preferred Salary</Label>
              <div className="grid grid-cols-12">
                <div className="col-span-2">
                  <Select>
                    <SelectTrigger
                      className="rounded-xl data-[size=default]:h-12"
                      size="default"
                    >
                      <SelectValue placeholder="₹" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectGroup>
                        {["₹", "$"].map((ite) => (
                          <SelectItem key={ite} value={ite}>
                            {ite}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-10">
                  <Input
                    className="w-full rounded-xl h-12"
                    placeholder="eg : 4,50,000"
                  />
                </div>
              </div>
            </div>
            <div className="grid w-full gap-2 items-center">
              <Label htmlFor="preferred-job">
                Preferred Work Locations (Max 10)
              </Label>
              <Input
                type="text"
                id="preferred-job"
                placeholder="Enter your preferred Job Role"
                className="rounded-xl h-12 w-full"
              />
              <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                {[
                  "pune",
                  "Noida",
                  "Mumbai (All Areas)",
                  "Mumbai",
                  "Kolkata",
                  "Hyderabad/Secunderabad",
                  "Delhi / NCR",
                  "Chennai",
                  "Bangalore/Bengaluru",
                  "Ahmedabad",
                ].map((ite) => (
                  <div
                    key={`prefferred-job-${ite}`}
                    className=" inline-flex items-center gap-2 rounded-full capitalize py-1.5 px-2.5 w-fit bg-gray-200 ring font-medium text-sm tracking-wide text-black"
                  >
                    {ite}{" "}
                    <Button size={"sm"} className="h-fit has-[>svg]:px-0 px-0">
                      <XIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter className="flex-shrink-0 fixed bottom-0 right-0 rounded-bl-xl left-0 border-t pt-7 bg-white px-10">
            <div className="flex w-full justify-start items-center gap-2">
              <Button>Submit</Button>
              <Button type="reset">Close</Button>
            </div>
          </DrawerFooter>
        </ScrollArea>
      </form>
    </>
  );
}
