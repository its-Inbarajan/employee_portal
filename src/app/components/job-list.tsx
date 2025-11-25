"use client";
import { JobListProps } from "@/@types/jobs";
import { Button } from "@/components/ui/button";
import withApplyDrawer from "@/hocs/withApplyDrawer";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ApplyForms } from "./job-apply-form";

export const JobList: React.FC<{ item: JobListProps; isApplied: boolean }> = ({
  item,
  isApplied = false,
}) => {
  const RawApplyButton: React.FC<{ openApplyDrawer: () => void }> = ({
    openApplyDrawer,
  }) => (
    <Button
      type="button"
      variant={"default"}
      className="w-full px-4 py-2 bg-transparent cursor-pointer ring-1 text-black ring-black hover:bg-black hover:text-white text-sm text-center transition-all duration-500 ease-in-out"
      onClick={openApplyDrawer}
    >
      Apply
    </Button>
  );

  const ApplyButton = withApplyDrawer(RawApplyButton);
  return (
    <div className="flex md:flex-row flex-col w-full py-3 border-b gap-4 items-start">
      <div className="w-16 h-fit border rounded-sm">
        <Image
          src={item.image ?? "/next.svg"}
          width={100}
          height={100}
          alt="company_profile"
          className="h-full w-full aspect-square object-center"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-4 md:flex-row w-full items-start">
        <div className="flex flex-col gap-1 lg:space-y-2.5 w-full">
          <div className="flex flex-1 flex-col w-full">
            <Link
              href={"/"}
              className="font-semibold hover:underline text-nowrap block w-full text-lg leading-5 tracking-wide"
            >
              {item.title}
            </Link>
            <Link
              href={"/"}
              className="font-normal hover:underline text-sm block text-gray-400 leading-5 tracking-wide"
            >
              {item.company_name}
            </Link>
            <span className="font-normal text-xs block text-gray-400 leading-5 tracking-wide">
              {item.location}
            </span>
          </div>
          <div className="inline-block float-start">
            <span className="font-medium text-black tracking-wide leading-5 text-sm">
              ₹16L – ₹18L • 0.0% – 1.0%
            </span>
          </div>
          <div className="inline-block float-start">
            <span className="font-medium text-black tracking-wide leading-5 text-xs">
              Posted: 3 days ago
            </span>
          </div>
        </div>
        {!isApplied ? (
          <div className="md:inline-block md:w-fit block w-full">
            <ApplyButton
              className=""
              job={item}
              renderDrawerContent={(job) => <ApplyForms job={job} />}
            />
          </div>
        ) : (
          <Link
            href={`/jobs/applications?jobId=${String(item.id)}`}
            className="inline-block w-auto px-4 py-2 bg-transparent active:ring-1 active:ring-black  text-black cursor-pointer text-xs text-center transition-all duration-150 ease-in-out"
          >
            <ChevronRight className="size-5" />
          </Link>
        )}
      </div>
    </div>
  );
};
