"use client";

import { JobApplicationInputs, JobListProps } from "@/@types/jobs";
import StepOne from "@/features/components/job-apply-multi-step-form/step-one";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ApplyFormProps = {
  job?: JobListProps;
  initial?: Partial<JobApplicationInputs>;
  onSubmit?: () => void;
};

export function ApplyForms({ job }: ApplyFormProps) {
  // const [step, setStep] = React.useState<number>(1);

  // const handleNextStep = () => {
  //   setStep((pre) => pre + 1);
  // };

  // const handleStepBack = () => {
  //   setStep((pre) => pre - 1);
  // };
  return (
    <div className="md:px-4 md:py-4 px-2 py-2">
      <div className="grid grid-cols-12 gap-5 items-start w-full">
        <div className="col-span-12 flex-row rounded bg-gray-100 h-full md:px-6 px-3 md:py-6 py-3 w-full gap-3 flex sm:col-span-6">
          <div className="w-20 h-fit border border-gray-400 rounded-sm">
            <Image
              src={job?.image ?? "/next.svg"}
              width={100}
              height={100}
              alt="company_profile"
              className="h-full w-full aspect-square object-center"
            />
          </div>
          <div className="flex flex-col space-y-1 w-full overflow-scroll justify-self-start">
            <div className="flex flex-col mb-4">
              <h1 className="font-semibold text-xl leading-relaxed text-black">
                {job?.title}
              </h1>
              <Link
                href={job?.company_profile_link as string}
                className="hover:underline inline-block w-fit"
              >
                <span className="font-medium leading-relaxed tracking-wide text-sm text-black">
                  {job?.company_name}
                </span>
              </Link>
              <p className="font-normal text-balance leading-relaxed tracking-wide text-xs text-black">
                {job?.description}
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col w-full gap-1">
                <h1 className="font-medium text-sm tracking-wide text-gray-700">
                  Hires Remotely in
                </h1>
                <span className="font-normal tracking-wide text-xs text-gray-700">
                  {job?.location}
                </span>
              </div>

              <div className="flex gap-1 flex-col w-full ">
                <h1 className="font-medium text-sm tracking-wide text-gray-700">
                  Job Types
                </h1>
                <span className="font-normal tracking-wide text-xs text-gray-700">
                  {job?.job_type}
                </span>
              </div>
              <div className="flex gap-1 flex-col w-full ">
                <h1 className="font-medium text-sm tracking-wide text-gray-700">
                  Salary range
                </h1>
                <span className="font-normal tracking-wide text-xs text-gray-700">
                  {job?.salary_range}
                </span>
              </div>
              <div className="flex gap-1 flex-col w-full ">
                <h1 className="font-medium text-sm tracking-wide text-gray-700">
                  Experience
                </h1>
                <span className="font-normal tracking-wide text-xs text-gray-700">
                  {job?.exp}
                </span>
              </div>
              <div className="flex gap-1 flex-col w-full ">
                <h1 className="font-medium text-sm tracking-wide text-gray-700">
                  Skills
                </h1>
                <div className="flex gap-2 flex-wrap items-start w-md">
                  {job?.skills.map((item) => (
                    <span
                      key={`skills_${item}`}
                      className="font-normal tracking-wide text-xs text-gray-700"
                    >
                      {item.split(" ").concat(",")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <StepOne />
        </div>
      </div>
    </div>
  );
}
