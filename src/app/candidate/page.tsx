"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { JobList } from "./components/job-list";
import { useSession } from "next-auth/react";
import ProfileCard from "./_shared/profile-card";
import { useCandidateStore } from "@/features/candidate-store";

export default function CandidatePage() {
  const RecommendedJobs = [
    {
      id: 0,
      image: "/next.svg",
      company_name: "text-company",
      title: "Full Stack developer",
      location: "Bangalore",
      salary_range: "16L – ₹18L",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
      createdAt: "3 days ago",
      company_profile_link: "/",
      job_link: "/",
      job_type: "Full Time",
      exp: "2+ years",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
    },
    {
      id: 1,
      image: "/next.svg",
      company_name: "text-company",
      title: "MERN Stack developer",
      location: "Bangalore - Remote",
      salary_range: "16L – ₹18L",
      createdAt: "3 days ago",
      company_profile_link: "/",
      job_link: "/",
      exp: "2+ years",
      job_type: "Full Time",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
    },
    {
      id: 2,
      image: "/next.svg",
      company_name: "text-company",
      title: "MERN Stack developer",
      location: "Bangalore - Remote",
      salary_range: "16L – ₹18L",
      company_profile_link: "/",
      job_link: "/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
      exp: "2+ years",
      job_type: "Full Time",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
      createdAt: "3 days ago",
    },
    {
      id: 3,
      image: "/next.svg",
      company_name: "text-company",
      title: "Frontend developer",
      location: "Bangalore - Remote",
      salary_range: "16L – ₹18L",
      company_profile_link: "/",
      job_link: "/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
      exp: "2+ years",
      job_type: "Full Time",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
      createdAt: "3 days ago",
    },
    {
      id: 4,
      image: "/next.svg",
      company_name: "text-company",
      title: "ReactJs developer",
      location: "Bangalore - Remote",
      salary_range: "16L – ₹18L",
      company_profile_link: "/",
      job_link: "/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
      exp: "2+ years",
      job_type: "Full Time",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
      createdAt: "3 days ago",
    },
  ];

  const RecentlyApplied = [
    {
      id: 2,
      image: "/next.svg",
      company_name: "text-company",
      title: "MERN Stack developer",
      location: "Bangalore - Remote",
      salary_range: "16L – ₹18L",
      company_profile_link: "/",
      job_link: "/",
      exp: "2+ years",
      job_type: "Full Time",
      skills: [
        "React",
        "NodeJs",
        "Aws",
        "ExpressJs",
        "MongoDb",
        "Kafka",
        "redis",
        "tailwindcss",
      ],
      createdAt: "3 days ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum incidunt quas a, eligendi ullam dolor atque consequuntur qui commodi ex officiis perspiciatis, esse ut temporibus nesciunt laborum quia mollitia vero!",
    },
  ];
  const candidateDetails = useCandidateStore((state) => state.candiate);
  const { status } = useSession();

  if (status === "loading")
    return (
      <p className="flex flex-row items-center h-full justify-center">
        <span className="animate-spin">
          <Loader2 />
        </span>{" "}
        Loading...
      </p>
    );
  if (status === "unauthenticated") return <p>Access Denied</p>;

  return (
    <div className="md:max-w-full md:w-full sm:w-sm max-w-sm mx-auto gap-5 flex flex-col justify-self-start">
      <ProfileCard candidate={candidateDetails} />
      <div className="w-full ">
        <Card className="md:px-6 md:py-4 px-3 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start lg:gap-3">
            <div className="inline-block float-start space-y-1.5">
              <h1 className="text-xl font-semibold leading-5 tracking-wide">
                Recommended Jobs
              </h1>
              <p className="font-normal mb-2 text-muted-foreground text-sm text-wrap tracking-wide leading-5">
                Jobs where you are a top applicant based on your profile job
                search.
              </p>
            </div>
            <div className="block text-nowrap float-end">
              <Link
                href={"/candidate/profile/edit/preferences"}
                className="bg-transparent hover:underline text-blue-500 cursor-pointer font-normal text-xs tracking-wide"
              >
                Change job preference
              </Link>
            </div>
          </div>
          {RecommendedJobs &&
            RecommendedJobs.map((item) => (
              <JobList
                key={`${item.id}_${item.title}`}
                item={item}
                isApplied={false}
              />
            ))}
          <div className="flex items-center w-full justify-center">
            <Button
              variant={"secondary"}
              className="bg-transparent hover:bg-transparent text-blue-500 cursor-pointer w-auto inline-block font-medium text-base"
            >
              See more
            </Button>
          </div>
        </Card>
      </div>
      <div className="w-full ">
        <Card className="md:px-6 md:py-4 px-3 py-3">
          <CardContent>
            <div className="flex flex-row justify-between items-start gap-2">
              <div className="inline-block float-start space-y-1.5">
                <h1 className="text-xl font-semibold leading-5 tracking-wide">
                  Recently Applied Jobs
                </h1>
              </div>
            </div>
            {RecentlyApplied &&
              RecentlyApplied.map((item) => (
                <JobList
                  key={`recent_${item.id}_${item.title}`}
                  item={item}
                  isApplied={true}
                />
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
