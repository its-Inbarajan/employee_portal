import React from "react";
import SectionCards from "../_components/dashboard/section-cards";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import RecentApplicationsTable from "../_components/dashboard/recent-applications-table";
import TodaysInterviewListing from "../_components/dashboard/todays-interview-listing";
import { stats, applications, interviews } from "@/data/dashboard.json";
import dynamicIconImports from "lucide-react/dynamicIconImports";
interface StatsData {
  desc: string;
  count: string;
  content: string;
  icon: keyof typeof dynamicIconImports | null;
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col pb-10">
      <div className="flex justify-between md:flex-row flex-col items-start md:items-center gap-5 px-4 py-6 lg:px-6 lg:py-10">
        <div className="flex flex-col shrink-0 gap-2">
          <h1 className="font-bold leading-6 tracking-wide text-accent-foreground @xl:text-xl @5xl:text-4xl">
            Hello, Alex 👋
          </h1>
          <p className="font-normal tracking-wide text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your open roles today.
          </p>
        </div>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-500"
          asChild
          variant={"default"}
          size={"sm"}
        >
          <Link href={"/recruiter/post-jobs"}>
            <PlusIcon />
            Post a Job
          </Link>
        </Button>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-12">
        <SectionCards statsData={stats.statsData as StatsData[]} />
        <div className="flex flex-1 flex-col px-4 lg:px-6 ">
          <div className="grid grid-cols-12 w-full items-start gap-5">
            <div className="col-span-7">
              <RecentApplicationsTable applications={applications} />
            </div>
            <div className="col-span-5">
              <TodaysInterviewListing interviews={interviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
