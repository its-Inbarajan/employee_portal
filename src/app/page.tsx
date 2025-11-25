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
import { JobList } from "./components/job-list";
import Link from "next/link";

export default function Home() {
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
  return (
    <div className="md:max-w-full md:w-full sm:w-sm max-w-sm mx-auto gap-5 flex flex-col justify-self-start">
      <div className="w-full">
        <Card className="shadow-neutral-50 ">
          <CardContent className="w-full">
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <Image
                src={"/next.svg"}
                width={10}
                height={10}
                className="rounded-full h-16 w-16 border-1 border-black select-none object-fit "
                alt="profile- piture"
              />
              <div className="flex justify-between flex-col lg:flex-row items-start w-full gap-5">
                <div className="flex flex-col gap-4 h-full">
                  <div className="inline-flex flex-col">
                    <p className="font-bold md:text-xl md:mb-2 text-lg leading-4 tracking-wide">
                      Inbarajan
                    </p>
                    <span className="font-semibold text-sm inline-flex flex-col leading-5 tracking-wide">
                      Full Stack Developer @ Comapny Name
                      <span className="inline-block font-normal text-xs">
                        Location
                      </span>
                    </span>
                  </div>
                  <div className="inline-flex flex-col">
                    <p className="font-semibold text-sm inline-flex flex-col leading-5 tracking-wide">
                      Where are you in your job search?
                    </p>
                    <span className="font-normal mb-2 text-gray-400 text-sm tracking-wide leading-5">
                      Keep your job status up-to-date to inform employers of
                      your search.
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        role="button"
                        className="md:w-3xs px-2 py-2 border rounded-sm flex justify-between items-center gap-2"
                      >
                        <ListChecksIcon className="size-5 text-green-500" />
                        <span className="font-medium select-none text-black text-base">
                          Ready to interview
                        </span>
                        <ChevronDown className="size-5" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-[16rem] px-2.5 absolute rounded -translate-1/2 md:top-[6.5rem] lg:top-[9.5rem]">
                        <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                          <div className="flex  items-center gap-2">
                            <List className="size-5 text-green-500" />
                            <span>Ready for interview</span>
                          </div>
                          <p className="font-normal leading-5 tracking-wider text-balance">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quibusdam, accusamus.
                          </p>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
                          <div className="flex  items-center gap-2">
                            <List className="size-5 text-green-500" />
                            <span>Open for offer</span>
                          </div>
                          <p className="font-normal leading-5 tracking-wider text-balance">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quibusdam, accusamus.
                          </p>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel className="flex gap-1 flex-col hover:bg-gray-200 hover:cursor-pointer rounded-sm">
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
                    variant={"link"}
                    type="button"
                    className="bg-transparent hover:underline cursor-pointer text-blue-500 text-nowrap text-sm"
                  >
                    View your public profile
                  </Button>
                  <Link
                    href={"/profile/edit"}
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
      <div className="w-full ">
        <Card className="shadow-neutral-50 md:px-6 md:py-4 px-3 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start lg:gap-3">
            <div className="inline-block float-start space-y-1.5">
              <h1 className="text-xl font-semibold leading-5 tracking-wide">
                Recommended Jobs
              </h1>
              <p className="font-normal mb-2 text-gray-400 text-sm text-wrap tracking-wide leading-5">
                Jobs where you are a top applicant based on your profile job
                search.
              </p>
            </div>
            <div className="block text-nowrap float-end">
              <Link
                href={"/profile/edit/preferences"}
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
        <Card className="shadow-neutral-50 md:px-6 md:py-4 px-3 py-3">
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
        </Card>
      </div>
    </div>
  );
}
