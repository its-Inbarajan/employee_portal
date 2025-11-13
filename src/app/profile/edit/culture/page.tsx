import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Chip from "@/components/ui/chip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Culture() {
  const maxtwo = [
    "Having a say in what I work on and how I work",
    "Opportunities to progress within the company",
    "Team members I can learn from",
    "A company with a good growth trajectory",
    "Having a say in the companys and/or my teams direction",
    "Mentorship opportunities",
    "Learn new things and develop my skills",
    "Challenging problems to work on",
    "A diverse team",
  ];

  const projects = [
    "media",
    "health care",
    "enterprise software",
    "games",
    "real e-state",
    "e-commerce",
    "education",
    "secrurity",
    "fashion",
    "fitness",
    "database",
    "finance",
    "productivity software",
    "travel",
    "developer tools",
    "drones",
    "wearables",
    "virtual reality",
    "consumer",
    "esports",
    "adtect",
    "Artificial Intelligence / Machine Learning",
    "Analytics / Data",
    "Blockchain / Cryptocurrency",
    "HR / Recruiting",
    "Logistics / Transportation / Shipping",
    "social good",
  ];

  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      {/* Description */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Describe what you are looking for in your next job
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Startups tell us this is one of the first things they look at in a
              profile.
            </span>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <span className="inline-block text-sm text-gray-400 text-end font-medium leading-relaxed">
                1000
              </span>
              <Textarea
                placeholder="Descripe what your are looking for next jobs."
                id="descripe"
                name="descripe"
                className="h-[12rem] rounded-md text-sm leading-relaxed border-px border-gray-500"
              />
              <div className="flex flex-row mt-2 items-center justify-end gap-2">
                <Button className="" variant={"default"}>
                  Close
                </Button>
                <Button className="" variant={"default"}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4 md:my-8 lg:my-12" />

      {/* motivates   */}

      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              What motivates you more?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <RadioGroup>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="solving_technical_problems"
                    id="solving_technical_problems"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="solving_technical_problems"
                  >
                    Solving technical problems
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="building_products"
                    id="building_products"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="building_products"
                  >
                    Building products
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 md:my-8 lg:my-12" />
      {/* next five years, */}
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Over the next five years, what career track do you want to follow?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <RadioGroup>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="individual_contributor"
                    id="individual_contributor"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="individual_contributor"
                  >
                    Individual contributor{" "}
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="manage"
                    id="manage"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="manage"
                  >
                    Manage
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      {/* environment  */}
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              What environment do you work better in?{" "}
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <RadioGroup>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="responsibilities"
                    id="responsibilities"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="responsibilities"
                  >
                    Clear role and set of responsibilities. Consistent feedback
                    from management.
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="figure_it_out"
                    id="figure_it_out"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="figure_it_out"
                  >
                    Employees wear a lot of hats. Assignments often require
                    employees to &quot;figure it out&quot; on their own.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {/* maxtwo */}
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              What&apos;s most important to you in your next job? (Max 2)
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center gap-3">
              {maxtwo.map((item) => (
                <div
                  key={item.split(" ").join("_").toLocaleLowerCase()}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    className="ring-1"
                    id={item.split(" ").join("_").toLocaleLowerCase()}
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor={item.split(" ").join("_").toLocaleLowerCase()}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* flexible  */}

      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              How important is it that your next job has a flexible remote work
              policy?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <RadioGroup>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="very_important"
                    id="very_important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="very_important"
                  >
                    Very important
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="important"
                    id="important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="important"
                  >
                    Important
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="not_important"
                    id="not_important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="not_important"
                  >
                    Not important
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {/* quiet office*/}
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              How important is it that you work in a quiet office?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid w-full items-center">
              <RadioGroup>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="very_important"
                    id="very_important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="very_important"
                  >
                    Very important
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="important"
                    id="important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="important"
                  >
                    Important
                  </Label>
                </div>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem
                    className="ring-1"
                    value="not_important"
                    id="not_important"
                  />
                  <Label
                    className="font-medium leading-relaxed text-gray-800"
                    htmlFor="not_important"
                  >
                    Not important
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {/* MOST interested  */}
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Which markets are you MOST interested in working in?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-3 items-center w-full">
              <div className="col-span-1">
                <div className="flex flex-row flex-wrap gap-2 items-center">
                  <Chip value="Frontend Developer" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    {projects.map((item) => (
                      <SelectItem
                        className="capitalize"
                        key={item}
                        value={item}
                      >
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

      {/* NOT willing */}

      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Which markets are you NOT willing to work in?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-3 items-center w-full">
              <div className="col-span-1">
                <div className="flex flex-row flex-wrap gap-2 items-center">
                  <Chip value="Backend Developer" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    {projects.map((item) => (
                      <SelectItem
                        className="capitalize"
                        key={item}
                        value={item}
                      >
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

      {/* technologies */}
      <Separator className="my-4 md:my-8 lg:my-12" />
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Which technologies are you MOST interested in working with?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-3 items-center w-full">
              <div className="col-span-1">
                <div className="flex flex-row flex-wrap gap-2 items-center">
                  <Chip value="Backend Developer" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    {projects.map((item) => (
                      <SelectItem
                        className="capitalize"
                        key={item}
                        value={item}
                      >
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
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-xs w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-medium leading-6 text-black">
              Which technologies are you NOT willing to work with?
            </p>
          </div>

          <div className="flex gap-3 space-y-2 flex-col w-full flex-1">
            <div className="grid gap-3 items-center w-full">
              <div className="col-span-1">
                <div className="flex flex-row flex-wrap gap-2 items-center">
                  <Chip value="Backend Developer" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full border-px border-gray-500 rounded-md shadow-none ">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="border-1 rounded shadow-none">
                  <SelectGroup>
                    {projects.map((item) => (
                      <SelectItem
                        className="capitalize"
                        key={item}
                        value={item}
                      >
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
    </div>
  );
}
