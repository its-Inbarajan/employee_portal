"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCandidateStore } from "@/features/candidate-store";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function OverviewPage() {
  const candiate = useCandidateStore((state) => state.candiate);
  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      <div className="flex flex-col h-full">
        <h1 className="font-semibold mb-2 text-accent-foreground text-lg leading-6 tracking-wide">
          What recruiters will see?
        </h1>
        <div className="md:px-4 h-auto md:py-4 p-2 border rounded-sm w-full">
          <div className="flex items-start sm:flex-wrap md:flex-row flex-col gap-3 md:px-2 md:py-2.5 px-3.5 py-2">
            <div className="flex items-start gap-4 md:flex-row flex-col flex-1">
              <div className="h-20 w-20 rounded-full border">
                <Image
                  src={candiate.avatarUrl ?? "/next.svg"}
                  alt="profile-image"
                  width={50}
                  height={50}
                  className="w-full h-full dark:brightness-75 dark:contrast-125 dark:invert object-fill aspect-auto"
                />
              </div>
              <div className="flex flex-col flex-1 items-start justify-start">
                <p className="font-semibold text-xl text-accent-foreground mb-1.5 leading-6 tracking-wide text-nowrap">
                  {candiate.firstName}{" "}
                  <span className="text-muted-foreground">
                    ({candiate.gender})
                  </span>
                </p>
                <p className="font-normal text-sm text-muted-foreground md:leading-relaxed mb-2  tracking-wider">
                  {candiate.totalExperienceYears} years of exp •{" "}
                  {candiate.location?.city}, {candiate.location?.country} • 0.5
                  hours behind
                  {/* • Open to remote */}
                </p>
                <Badge variant={"default"}>Active today</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-start">
              {/* {Object.keys(candiate?.socialLinks).map((item) => (
                <span key={`socialLinks-${item}`}>{item}</span>
              ))} */}
              {/* <Link href={"/"} className="w-auto bg-muted rounded p-1.5">
                <Github className="size-4 text-muted-foreground" />
              </Link>
              <Link href={"/"} className="w-auto bg-muted rounded p-1.5">
                <Linkedin className="size-4 text-muted-foreground" />
              </Link>
              <Link href={"/"} className="w-auto bg-muted rounded p-1.5">
                <Earth className="size-4 text-muted-foreground" />
              </Link>
              <Link href={"/"} className="w-auto bg-muted rounded p-1.5">
                <Newspaper className="size-4 text-muted-foreground" />
              </Link> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="" variant={"outline"} size={"icon-sm"}>
                    <Plus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Social Links</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
              Looking for
            </span>
            <div className="flex items-start gap-3">
              {/* Left bubble + line */}
              <div className="relative flex flex-col items-center">
                <div className="w-5 h-5 rounded-full shadow-gray-300 shadow bg-gray-100 border-[1px] flex items-center justify-center">
                  <span className="text-muted-foreground text-xs font-serif">
                    “
                  </span>
                </div>
                <div className="w-px flex-1 h-full  borders bg-muted mt-1"></div>
              </div>

              {/* Text content */}
              <p className="font-normal text-sm text-balance leading-5 tracking-wider text-accent-foreground">
                {candiate.bio?.trim() ? candiate.bio : "Bio Not yet added"}
              </p>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
              Experience
            </span>

            <div className="flex gap-4 items-start w-full">
              <div className="h-12 w-1h-12 inline-block">
                <Image
                  src={"/image.png"}
                  alt="company-profile"
                  width={50}
                  height={50}
                  className="w-full h-full rounded-lg aspect-square object-fill"
                />
              </div>
              <div className="flex flex-col  gap-">
                <h1 className="font-medium text-accent-foreground text-xl ">
                  {!candiate.currentTitle?.trim()
                    ? "Current Title Not Yet added"
                    : candiate.currentTitle}
                </h1>
                <p className="font-medium text-muted-foreground text-sm ">
                  {!candiate.currentCompany?.trim()
                    ? "Current Company Not Yet added"
                    : candiate.currentCompany}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
              Skills
            </span>

            <div className="flex gap-2 flex-wrap items-start w-full">
              {!candiate.skills?.length && "---"}
              {candiate.skills?.length !== 0 &&
                candiate?.skills?.map((item) => (
                  <Badge key={`skill-${item.name}`} variant={"secondary"}>
                    {item.name}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-semibold text-sm text-muted-foreground leading-6 tracking-wide">
              Ideal next opportunity
            </span>
            <div className="flex flex-col flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Desired Salary
              </span>
              <span className="inline-block font-normal text-sm text-muted-foreground rounded bg-muted px-1.5 py-1">
                {candiate.jobPreferences?.currency}{" "}
                {candiate.jobPreferences?.desiredSalaryMin} /{" "}
                {candiate.jobPreferences?.desiredSalaryMax}
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Desired Role
              </span>
              {candiate.jobPreferences?.desiredRoles.length !== 0 &&
                candiate.jobPreferences?.desiredRoles.map((ite) => (
                  <Badge key={`roles-${ite}`} variant={"secondary"}>
                    {ite}
                  </Badge>
                ))}
              {!candiate.jobPreferences?.desiredRoles.length && "---"}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Remote Work
              </span>
              {candiate.jobPreferences?.workModePreference.length !== 0 && (
                <Badge variant={"secondary"}>
                  {candiate.jobPreferences?.workModePreference}
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Desired Location{" "}
              </span>
              {candiate.jobPreferences?.preferredLocations.length !== 0 &&
                candiate.jobPreferences?.preferredLocations.map((item) => (
                  <Badge
                    key={`preferredLocations-${item}`}
                    variant={"secondary"}
                  >
                    {item}
                  </Badge>
                ))}

              {!candiate.jobPreferences?.preferredLocations.length && "---"}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Preferred Jobs{" "}
              </span>
              <div className="flex flex-row flex-wrap flex-1 gap-2">
                {candiate.jobPreferences?.preferredJobTypes.length !== 0 &&
                  candiate.jobPreferences?.preferredJobTypes.map((item) => (
                    <Badge
                      variant={"secondary"}
                      key={item}
                      className="inline-block font-normal text-sm text-muted-foreground rounded bg-muted px-1.5 py-1"
                    >
                      {item}
                    </Badge>
                  ))}
                {candiate.jobPreferences?.preferredJobTypes.length === 0 &&
                  "---"}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-muted-foreground leading-6 tracking-wide">
                Preferred Industries
              </span>
              <ul className="flex list-none flex-row flex-wrap flex-1 gap-2">
                {candiate.jobPreferences?.preferredIndustries.length !== 0 &&
                  candiate.jobPreferences?.preferredIndustries.map((item) => (
                    <Badge
                      variant={"secondary"}
                      key={item}
                      role="li"
                      className="inline-block font-normal text-sm text-muted-foreground rounded bg-muted px-1.5 py-1"
                    >
                      {item}
                    </Badge>
                  ))}
                {!candiate.jobPreferences?.preferredIndustries.length && "---"}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
