"use client";
import { ICandidateProfile } from "@/@types/candidate-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, List, ListChecksIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileCardProps {
  candidate: Partial<ICandidateProfile>;
}

export default function ProfileCard({ candidate }: Readonly<ProfileCardProps>) {
  return (
    <div>
      <Card>
        <CardContent className="w-full">
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <Image
              src={candidate?.avatarUrl ?? "/next.svg"}
              width={10}
              height={10}
              className="rounded-full h-16 w-16 border-1 dark:brightness-75 dark:contrast-125 dark:invert border-black select-none object-fit "
              alt="profile-piture"
            />
            <div className="flex justify-between flex-col lg:flex-row items-start w-full gap-5">
              <div className="flex flex-col gap-4 h-full">
                <div className="inline-flex flex-col">
                  <p className="font-bold md:text-xl md:mb-2 text-lg leading-4 tracking-wide">
                    {candidate.firstName} {candidate.lastName}
                  </p>
                  <span className="font-semibold text-sm inline-flex flex-col leading-5 tracking-wide">
                    {candidate.currentTitle ?? "--"} @{" "}
                    {candidate.currentCompany ?? "--"}
                    <span className="inline-block font-normal text-xs">
                      <span className="mr-1">
                        {candidate.location?.city}, {candidate.location?.state},
                      </span>
                      <span className="mr-1">
                        {candidate.location?.country}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="inline-flex flex-col">
                  <p className="font-semibold text-sm inline-flex flex-col leading-5 tracking-wide">
                    Where are you in your job search?
                  </p>
                  <span className="font-normal mb-2 text-gray-400 text-sm tracking-wide leading-5">
                    Keep your job status up-to-date to inform employers of your
                    search.
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      role="button"
                      className="md:w-3xs px-2 py-2 border rounded-sm flex justify-between items-center gap-2"
                    >
                      <ListChecksIcon className="size-5 text-green-500" />
                      <span className="font-medium select-none dark:text-white text-black text-base">
                        Ready to interview
                      </span>
                      <ChevronDown className="size-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-[16rem] px-2.5 py-2 absolute rounded -translate-1/2 md:top-[6.5rem] lg:top-[9.5rem]">
                      <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-muted hover:cursor-pointer rounded-sm">
                        <div className="flex  items-center gap-2">
                          <List className="size-5 text-green-500" />
                          <span>Ready for interview</span>
                        </div>
                        <p className="font-normal leading-5 tracking-wider text-balance">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Quibusdam, accusamus.
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-muted hover:cursor-pointer rounded-sm">
                        <div className="flex  items-center gap-2">
                          <List className="size-5 text-green-500" />
                          <span>Open for offer</span>
                        </div>
                        <p className="font-normal leading-5 tracking-wider text-balance">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Quibusdam, accusamus.
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-muted hover:cursor-pointer rounded-sm">
                        <div className="flex  items-center gap-2">
                          <List className="size-5 text-green-500" />
                          <span>Close to offer</span>
                        </div>
                        <p className="font-normal leading-5 tracking-wider text-balance">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Quibusdam, accusamus.
                        </p>
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex flex-row gap-3  items-center">
                <Button
                  size={"sm"}
                  variant={"link"}
                  type="button"
                  className="bg-transparent hover:underline cursor-pointer text-blue-500 text-nowrap text-sm"
                >
                  View your public profile
                </Button>
                <Link
                  href={"/candidate/profile/edit"}
                  className="bg-transparent hover:underline cursor-pointer text-blue-500 text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
