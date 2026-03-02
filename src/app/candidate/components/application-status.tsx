"use client";
import { CheckCircle2, LoaderIcon, XCircleIcon } from "lucide-react";
import React from "react";

type Status = "pending" | "rejected" | "shortlisted";

interface ApplicationStatusProps {
  status?: Status;
  name?: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  name,
  status = "pending",
}) => {
  return (
    <div
      className={`w-full h-32 rounded border-2 px-4 py-4 ${status === "pending"
        ? "border-yellow-500 bg-yellow-100"
        : status === "rejected"
          ? "border-red-500 bg-red-100"
          : "border-green-500 bg-green-100"
        }`}
    >
      <div className="flex flex-row gap-4 flex-1 justify-start w-full">
        <span
          className={`size-5 ${status === "pending"
            ? "text-yellow-500"
            : status === "rejected"
              ? "text-red-500 "
              : "text-green-500 "
            }`}
        >
          {status === "pending" ? (
            <LoaderIcon />
          ) : status === "rejected" ? (
            <XCircleIcon />
          ) : (
            <CheckCircle2 />
          )}
        </span>
        <div className="flex flex-col gap-2 flex-1">
          <span className="capitalize text-accent-foreground dark:text-accent font-medium">Application {status}</span>
          <p className="font-normal text-accent-foreground dark:text-accent leading-relaxed tracking-wide">
            Your application is awaiting review by {name} . We’ll notify you
            when they make a decision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
