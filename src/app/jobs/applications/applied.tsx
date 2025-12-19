"use client";
import {
  ChevronRight,
  FacebookIcon,
  FoldersIcon,
  GlobeIcon,
  LinkedinIcon,
  LocateFixedIcon,
  PaperclipIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ApplicationStatus from "@/app/components/application-status";
import Chip from "@/components/ui/chip";

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
    createdAt: "3 days ago",
    experience: "4+ years",
    relocation: "Allowed",
    visa_sponsorship: "Not Available",
    job_type: "Full Time",
    status: "pending",
    remote_work_policy: "In office - WFH flexibility",
    company_des: "Conversational workplace application",
    questions: [
      {
        title: "What are the common http methods?",
        answer: "GET,POST,PUT,DELETE",
      },
      {
        title: "What are the authentication methods have you integrated?",
        answer: "Oauth",
      },
      {
        title: "State management with any libraries?",
        answer: "Redux, zustan and Tanstack Query(React query)",
      },
      {
        title: "How do you test a performance of a website?",
        answer: "In Chrome Performance tab, lighthouse.",
      },
      {
        title:
          "Explain different HTTP Status codes in categories? {2xx, 3xx, 4xx, 5xx}",
        answer:
          "201 for create, 404 for not found, 500 for internal server error.",
      },
      {
        title: "What libraries do you use for form validations?",
        answer: "Zod",
      },
      {
        title:
          "Have you done any API integration and Authentication with the Backend?",
        answer: "Yes, I have done Oauth authentication flow.",
      },
      {
        title: "Are you familiar with Nextjs App Router?",
        answer: "Yes",
      },
      {
        title: "Have you built and published any NPM libraries?",
        answer: "Yes",
      },
      {
        title: "Have you worked improving accessibility (a11y) of a website?",
        answer: "Yes",
      },
    ],
    job_descript: {
      job_title: "SDE 2 Frontend Engineer (4+ Years of Experince)",
      salary: "₹22L – ₹40L • 0.05% – 0.1%",
      about_the_job: [
        "Looking for 4+ years experience as Senior Frontend Engineer with SciSpace a product-based AI startup",
        "AI Assistant for Research using state-of-the-art language models (ChatGPT for Research)",
        "At Scispace, we're using language models to automate and streamline research workflows from start to finish. And the best part? We're already making waves in the industry, with a whopping 5 million users on board as of November 2024! Our users love us too, with a 40% MOM retention rate and 10% of them using our app more than once a week! We're growing by more than 50% every month, all thanks to our awesome users spreading the word (see it yourself on Twitter). And with almost weekly feature launches since our inception, we're constantly pushing the boundaries of what's possible. Our team of experts in design, front-end, full-stack engineering, and machine learning is already in place, but we're always on the lookout for new talent to help us take things to the next level. Our user base is super engaged and always eager to provide feedback, making Scispace one of the most advanced applications of language models out there.",
        "The ideal candidate is someone who is self-motivated, empathetic, passionate about helping others, can communicate effectively with diverse groups and has a desire to build a positive relationship with our users. Knowledge of Research writing is not a must, however, applicants interested in the domain are encouraged to apply! :)",
      ],
      responsibilities: [
        "Partner with product owners to design software that integrates seamlessly into researchers’ workflows.",
        "Implement beautiful, user-friendly interfaces that enhance the user experience.",
        "Test and validate the code you write, continuously improving practices at SciSpace.",
        "Manage large projects from conceptualization through to release.",
        "Solve challenging browser quirks. For example: those encountered in collaborative text editors.",
        "Develop and maintain an ecosystem of standards and libraries to support junior developers.",
        "Monitor shipped features to ensure continuous availability and performance.",
        "Take ownership of the codebase, consistently improving it at scale.",
        "Participate actively in sprint planning, retrospectives, and daily stand-ups.",
        "Write clean, maintainable, and efficient code following best practices.",
        "Conduct regular code reviews to maintain code quality and share knowledge with team members.",
        "Stay updated with the latest industry trends and technologies to ensure the front-end architecture is scalable and maintainable.",
        "Mentor junior developers and guide them through complex problems.",
        "Lead the implementation of new front-end technologies and frameworks as necessary.",
        "Create and maintain documentation for front-end code and practices.",
      ],
      ideal_candidate: [
        "Have 4+ years of experience working in small to medium-sized teams building challenging features using React/Next.js.",
        "Have experience working with TypeScript and styling libraries like TailwindCSS.",
        "Know best practices in integrating backend systems using APIs and designing front-end components and systems.",
        "Take ownership of codebases and consistently improve them over time.",
        "Have a strong grasp of browser fundamentals and understand SPA (Single Page App) performance, including CWV scores.",
        "Be comfortable working with fuzzy problem statements and collaborate with product partners to clarify and finalize requirements.",
        "Understand RESTful APIs and integration with front-end components.",
        "Possess excellent problem-solving skills and attention to detail.",
        "Demonstrate strong communication skills and ability to work in a collaborative team environment.",
      ],
      bonus: [
        "        Understanding of SEO best practices and web accessibility standards.",
        "Experience being the point person for products.",
        "Prior experience working with high-volume, always-available web applications.",
        "Experience in being the technical lead in previous jobs is a plus.",
        "Contributions to open-source projects or personal coding projects demonstrating expertise and passion for development.",
        "Experience in performance tuning and optimizing front-end applications for speed and scalability.",
      ],
    },
    skills: [
      "Git",
      "API",
      "REST APIs",
      "React.js",
      "React Native",
      "ReactNative",
      "RESTful API",
      "Javascript / ReactJs / recact-native",
      "ReactJS with Redux (ES6)",
      "Next.Js",
      "NextJs",
      "ReactJS",
      "TailwindCSS",
      "ReactNative with Redux",
      "Next JS",
      "Android,Reactjs,ReactNative with redux,Nodejs,MongoDB,Firebase.",
      "Javascript/Typescript: ReactJS/Redux, Angular, Node/ExpressJS, Node/NestJs",
      "Tailwind CSS",
      "HTML5, CSS3, JavaScript, SASS, ReactJS, NextJS, Shopify, MongoDB, Firebase, ExpressJS",
      "Python, React, Redux, NextJS, TypeScript, PostgreSQL",
      "React / NextJS / Tailwindcss",
      "Shadcn UI",
      "StateManagement",
      "NextJS, React, Typescript, Tailwind CSS, Mantine UI, PostgreSQL, Prisma, Trpc API",
      "Shadcn-Ui",
      "Shadcn/ui",
      "Shadcn-Vue",
      "Shadcn",
    ],
    company_info: {
      badge: ["growth stage", "growing fast"],
      images: ["/next.svg", "/next.svg"],
      company_website: "/",
      about:
        "At SciSpace, we're using large language models to automate and streamline research workflows from start to finish. And the best part? We're already making waves in the industry, with a whopping 6 million users on board as of November 2025! Our users love us too, with 10% of them using our app more than once a week! We're growing by more than 50% every month, and profitable - all thanks to our awesome users spreading the word (see it yourself on Twitter). And with almost weekly feature launches since our inception, we're constantly pushing the boundaries of what's possible. Our team of experts in design, front-end, full-stack engineering, and machine learning is already in place, but we're always on the lookout for new talent to help us take things to the next level. SciSpace is one of the most advanced applications of language models out there.",
      testimonial: {
        title: "what our team members say",
        pros: [
          "Tons of independence.",
          "Great Pay.",
          "Dev environment is a dream team for Full-stack & Frontend Devs.",
          "A truly mission-led company that drives everything that we do.",
          "Great environment, great colleagues, and we have well looked after.",
          "Fast-paced and constantly changing with an ambition to always do better.",
          "Flexible hours.",
          "High-impact projects.",
          "Highly talented co-workers.",
          "Great perks.",
          "Challenging problems to solve that touch millions of researchers' lives.",
          "Great for getting mentorship.1. Tons of independence.",
          "Great Pay",
          "Dev environment is a dream team for Full-stack & Frontend Devs.",
          "A truly mission-led company that drives everything that we do.",
          "Great environment, great colleagues, and we have well looked after.",
          "Fast-paced and constantly changing with an ambition to always do better.",
          "Flexible hours.",
          "High-impact projects.",
          "Highly talented co-workers.",
          "Great perks.",
          "Challenging problems to solve that touch millions of researchers' lives.",
          "Great for getting mentorship.",
        ],
        cons: [
          "If you don't like the challenge of a fast-paced environment with constant change, then it can be challenging.",
          "Very high expectations.",
          "There are so many smart people here, and you should be willing to improvise yourself constantly.",
        ],
      },
      founders: [
        {
          name: "jhon deo",
          role: "founder",
          about:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea illum doloremque sapiente et obcaecati at quam eveniet ratione.",
          profile: "",
        },
        {
          name: "Mark Antonoy",
          role: "co founder",
          about:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea illum doloremque sapiente et obcaecati at quam eveniet ratione.",
          profile: "",
        },
      ],
      funding: [
        {
          title: "Funded over",
          answer: "2 rounds",
        },
        {
          title: "Latest round",
          answer: "Series A (Dec 2021)",
        },
      ],
      culture: {
        image: "",
        benefits: [
          "esop option",
          "work from home policy",
          "regular sports activites",
        ],
      },
    },
  },
];
const ClientApplied = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<
    "application" | "job-description" | "company-info" | string
  >("application");
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const id = searchParams.get("jobId");

    if (id) {
      setSelectedJobId(id);
      setOpen(true);
    } else {
      setSelectedJobId(null);
      setOpen(false);
    }
  }, [searchParams]);

  const handleAppliedClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("jobId", value);

    router.push(`${pathName}?${params.toString()}`);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("jobId");
      const qs = params.toString();
      router.push(`${pathName}${qs ? `?${qs}` : ""}`);
    }
  };

  const handleTabValue = (
    value: "application" | "job-description" | "company-info" | string
  ) => {
    setActiveTab(value);
  };

  return (
    <div className="md:max-w-screen max-w-sm mx-auto w-full">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-semibold leading-6 tracking-wide md:text-3xl text-lg text-black">
          Applications
        </h1>

        <div className="flex flex-col gap-6 max-w-full mt-5 w-full">
          <Tabs defaultValue="ongoing" className="relative">
            <TabsList>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="ongoing">
              {RecentlyApplied &&
                RecentlyApplied.map((item) => (
                  <div
                    onClick={() => handleAppliedClick(String(item.id))}
                    className="w-full"
                    key={item.company_profile_link}
                  >
                    <div className="flex cursor-pointer w-full py-4 bg-white px-4 rounded-md border gap-4 items-start">
                      <div className="w-16 h-fit border rounded-sm">
                        <Image
                          src={item.image ?? "/next.svg"}
                          width={100}
                          height={100}
                          alt="company_profile"
                          className="h-full w-full aspect-square object-center"
                        />
                      </div>
                      <div className="flex w-full flex-row md:flex-col items-start">
                        <h1 className="font-semibold mb-2 leading-6 tracking-wide md:text-lg text-lg">
                          {item.title}
                        </h1>
                        <span className="capitalize font-normal text-sm block text-gray-600 leading-5 tracking-wide">
                          {item.salary_range}
                        </span>
                        <div className="flex items-center justify-self-start w-full gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              item.status === "pending"
                                ? "bg-yellow-500"
                                : item.status === "rejected"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }  inline-block`}
                          />
                          <span className="capitalize font-medium text-black tracking-wide leading-5 text-xs">
                            {item.status}
                          </span>
                          <span className="capitalize font-medium text-gray-400 tracking-wide leading-5 text-xs">
                            {item.createdAt}
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 border flex justify-center items-center rounded">
                        <ChevronRight className="size-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="archived">
              <div className="flex justify-center items-center h-60">
                <h1 className="font-bold leading-6 tracking-wide text-xl text-black">
                  There is no items here!
                </h1>
              </div>
            </TabsContent>
            {/* View single job details */}
            <Drawer
              direction="right"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-2xl overflow-hidden max-h-full">
                <Tabs
                  className="w-full h-full overflow-y-auto"
                  value={activeTab}
                  onValueChange={handleTabValue}
                  defaultValue="job-description"
                >
                  <div className="relative inset-0 z-50 pb-36 w-full">
                    <div className="w-full fixed z-10 top-0 bg-white  rounded-tl-2xl shadow">
                      <div className="flex gap-2 justify-between items-start border-b px-4 py-4">
                        <Link
                          href={RecentlyApplied[0].company_profile_link}
                          className="flex flex-row w-full gap-4 items-center"
                        >
                          <div className="w-16 h-fit border rounded-sm">
                            <Image
                              width={100}
                              height={100}
                              alt="company_profile"
                              className="h-full w-full aspect-square object-center"
                              src={RecentlyApplied[0].image}
                            />
                          </div>
                          <div className="grid capitalize items-center space-y-px">
                            <DrawerTitle>
                              {RecentlyApplied[0].company_name} {selectedJobId}
                            </DrawerTitle>
                            <DrawerDescription>
                              {RecentlyApplied[0].company_des}
                            </DrawerDescription>
                            <span className="font-medium text-muted-foreground leading-relaxed tracking-wide text-sm">
                              {RecentlyApplied[0].createdAt}
                            </span>
                          </div>
                        </Link>

                        <Button
                          onClick={() => handleOpenChange(false)}
                          type="button"
                          size={"icon-sm"}
                          variant={"secondary"}
                        >
                          <XIcon />
                        </Button>
                      </div>
                      <TabsList className="bg-transparent space-x-4 pb-0 rounded-none">
                        {["application", "job-description", "company-info"].map(
                          (item) => (
                            <TabsTrigger
                              className={
                                "capitalize relative px-4 py-2 text-sm font-normal text-black transition-all"
                              }
                              key={`tab-value-${item}`}
                              value={item}
                            >
                              {item.split("-").join(" ")}
                              <span
                                className={cn(
                                  "absolute left-0 bottom-0 w-full h-[2px] bg-black transition-transform duration-300",
                                  activeTab === item
                                    ? "scale-x-100"
                                    : "scale-x-0 origin-center"
                                )}
                              />
                            </TabsTrigger>
                          )
                        )}
                      </TabsList>
                    </div>
                  </div>
                  {/* Application tab */}
                  <TabsContent
                    className="w-full px-4 py-4 space-y-2"
                    value="application"
                  >
                    <div className="flex flex-row gap-4 justify-start w-full">
                      <figure className="w-14 block h-14 ring rounded">
                        <Image
                          src={"/next.svg"}
                          alt="profile"
                          className="object-fill object-center w-full h-full"
                          width={50}
                          height={50}
                        />
                      </figure>
                      <div className="flex flex-col items-start gap-4">
                        {RecentlyApplied?.[0].questions.map((item) => (
                          <div
                            key={`questions-${item.title}`}
                            className="flex flex-col flex-1 gap-2 text-wrap"
                          >
                            <p className="font-medium inline-block leading-normal tracking-wide text-sm text-black">
                              {item.title}
                            </p>
                            <span className="before:content-['*'] inline-block before:inline-block before:mr-1 before:font-bold before:text-red-500 text-xs font-normal text-gray-400 tracking-wide">
                              {item.answer}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full ring hover:cursor-pointer flex-row gap-2 flex-1 rounded px-2 py-2">
                      <PaperclipIcon className="size-5" />
                      <p className="font-medium inline-block leading-relaxed tracking-wide text-xs">
                        Resume inbarajan_mern_stack_resume.png
                      </p>
                    </div>
                    <ApplicationStatus
                      name={RecentlyApplied[0]?.company_name ?? ""}
                    />
                  </TabsContent>
                  {/* Job description */}
                  <TabsContent
                    className="w-full px-4 py-4 space-y-2"
                    value="job-description"
                  >
                    <div className="flex flex-col gap-4 px-2  justify-start">
                      <div className="space-y-3">
                        <h1 className="font-medium text-lg tracking-wide text-black">
                          {RecentlyApplied[0]?.job_descript.job_title}
                        </h1>
                        <div className="inline-flex gap-2 items-center justify-start">
                          <p className="font-normal tracking-wide text-sm text-black">
                            {RecentlyApplied[0]?.job_descript.salary}
                          </p>
                          /
                          <span className="inline-flex items-center gap-1">
                            <LocateFixedIcon className="size-5" />{" "}
                            {RecentlyApplied[0]?.location}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-3">
                          <div className="inline-block">
                            <p className="font-medium text-sm tracking-wide text-black">
                              Experience
                            </p>
                            <span className="font-normal text-xs tracking-tight text-gray-500">
                              {RecentlyApplied[0]?.experience}
                            </span>
                          </div>
                          <div className="inline-block">
                            <p className="font-medium text-sm tracking-wide text-black">
                              Remote work policy
                            </p>
                            <span className="font-normal text-xs tracking-tight text-gray-500">
                              {RecentlyApplied[0]?.remote_work_policy}
                            </span>
                          </div>
                          <div className="inline-block">
                            <p className="font-medium text-sm tracking-wide text-black">
                              Relocation
                            </p>
                            <span className="font-normal text-xs tracking-tight text-gray-500">
                              {RecentlyApplied[0]?.relocation}
                            </span>
                          </div>

                          <div className="inline-block">
                            <p className="font-medium text-sm tracking-wide text-black">
                              Job type
                            </p>
                            <span className="font-normal text-xs tracking-tight text-gray-500">
                              {RecentlyApplied[0]?.job_type}
                            </span>
                          </div>
                          <div className="inline-block">
                            <p className="font-medium text-sm tracking-wide text-black">
                              Visa sponsorship
                            </p>
                            <span className="font-normal text-xs tracking-tight text-gray-500">
                              {RecentlyApplied[0]?.visa_sponsorship}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <div className="flex flex-col flex-1 space-y-2">
                          <h1 className="font-medium text-lg text-black tracking-wide">
                            About the job
                          </h1>
                          {RecentlyApplied[0]?.job_descript.about_the_job.map(
                            (item, idx) => (
                              <p
                                key={`about-the-job-${idx}`}
                                className="font-normal leading-relaxed tracking-wide text-sm text-gray-700"
                              >
                                {item}
                              </p>
                            )
                          )}
                          <h1 className="font-medium text-lg  text-black tracking-wide">
                            Responsibilities :
                          </h1>
                          <ul className="list-disc ml-5">
                            {RecentlyApplied[0]?.job_descript.responsibilities.map(
                              (item, idx) => (
                                <li
                                  key={`responsibilities-${idx}`}
                                  className="font-normal mb-1.5 leading-relaxed tracking-wide text-sm text-gray-700"
                                >
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                          <h1 className="font-medium text-lg  text-black tracking-wide">
                            Our Ideal Candidate would: :
                          </h1>
                          <ul className="list-disc ml-5">
                            {RecentlyApplied[0]?.job_descript.ideal_candidate.map(
                              (item, idx) => (
                                <li
                                  key={`ideal_candidate-${idx}`}
                                  className="font-normal mb-1.5 leading-relaxed tracking-wide text-sm text-gray-700"
                                >
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                          <h1 className="font-medium text-lg  text-black tracking-wide">
                            Skills:
                          </h1>
                          <div className="flex flex-wrap gap-2 items-center">
                            {RecentlyApplied[0]?.skills.map((item, idx) => (
                              <Chip
                                key={`skills-${idx}`}
                                value={item}
                                isButtonRequire={false}
                                className="font-normal mb-1.5 leading-relaxed tracking-wide text-sm text-gray-700"
                              />
                            ))}
                          </div>
                          <h1 className="font-medium text-lg  text-black tracking-wide">
                            Bonus:
                          </h1>
                          <ul className="list-disc ml-5">
                            {RecentlyApplied[0]?.job_descript.bonus.map(
                              (item, idx) => (
                                <li
                                  key={`bonus-${idx}`}
                                  className="font-normal mb-1.5 leading-relaxed tracking-wide text-sm text-gray-700"
                                >
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        {/* <div className="flex flex-col flex-1 space-y-2"></div> */}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Company Info */}
                  <TabsContent
                    className="w-full px-4 py-4 space-y-2"
                    value="company-info"
                  >
                    <div className="space-y-4 border-b">
                      <div className="grid grid-cols-2 items-center place-items-end">
                        <div className="flex flex-wrap gap-2 max-w-sm w-full items-center">
                          {RecentlyApplied[0].company_info.badge.map((item) => (
                            <span
                              key={`badge-${item}`}
                              className="p-1 rounded text-xs bg-pink-300 text-pink-900 capitalize"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-nowrap gap-2 items-center">
                          <div className="p-1 rounded bg-gray-600 text-gray-400 cursor-pointer inline-block">
                            <GlobeIcon className="size-4" />
                          </div>
                          <div className="p-1 rounded bg-gray-600 text-gray-400 cursor-pointer inline-block">
                            <LinkedinIcon className="size-4" />
                          </div>
                          <div className="p-1 rounded bg-gray-600 text-gray-400 cursor-pointer inline-block">
                            <FacebookIcon className="size-4" />
                          </div>
                          <div className="p-1 rounded bg-gray-600 text-gray-400 cursor-pointer inline-block">
                            <TwitterIcon className="size-4" />
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-2">
                        <div
                          id="controls-carousel"
                          className="relative w-full"
                          data-carousel="static"
                        >
                          <div className="relative h-40 overflow-hidden flex items-center justify-center bg-gray-900 rounded-base md:h-64 rounded">
                            <div
                              className="duration-700  ease-in-out"
                              data-carousel-item
                            >
                              {/* <Image
                              width={100}
                              height={100}
                              src="/docs/images/carousel/carousel-1.svg"
                              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                              alt="..."
                            /> */}
                              <FoldersIcon className="size-20 text-black" />
                            </div>
                          </div>
                          {/* <!-- Slider controls --> */}
                          <button
                            type="button"
                            className="absolute top-0 start-0 z-50 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            // data-carousel-prev
                          >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:outline-none ">
                              <svg
                                className="w-5 h-5 text-white rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m15 19-7-7 7-7"
                                />
                              </svg>
                              <span className="sr-only">Previous</span>
                            </span>
                          </button>
                          <button
                            type="button"
                            className="absolute top-0 end-0 z-50 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            // data-carousel-next
                          >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:outline-none ">
                              <svg
                                className="w-5 h-5 text-white rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m9 5 7 7-7 7"
                                />
                              </svg>
                              <span className="sr-only">Next</span>
                            </span>
                          </button>
                        </div>
                      </div>
                      <p className="font-normal leading-relaxed tracking-wide text-sm text-black">
                        {RecentlyApplied[0].company_info.about}
                      </p>

                      <div className="grid items-center gap-3">
                        <div className="inline-block">
                          <p className="font-medium text-sm tracking-wide text-black">
                            Location
                          </p>
                          <span className="font-normal text-xs tracking-tight text-gray-500">
                            {RecentlyApplied[0]?.location}
                          </span>
                        </div>
                        <div className="inline-block">
                          <p className="font-medium text-sm tracking-wide text-black">
                            Total raised
                          </p>
                          <span className="font-normal text-xs tracking-tight text-gray-500">
                            $0
                          </span>
                        </div>
                        <div className="inline-block">
                          <p className="font-medium text-sm tracking-wide text-black">
                            Company size
                          </p>
                          <span className="font-normal text-xs tracking-tight text-gray-500">
                            11-50 people
                          </span>
                        </div>
                        <div className="block">
                          <h1 className="font-medium text-lg  text-black tracking-wide">
                            Markets:
                          </h1>
                          <div className="flex flex-wrap gap-2 items-center">
                            {[
                              "Enterprise Software",
                              "Education",
                              "Artificial Intelligence",
                              "Researchers",
                              "Academic",
                            ].map((item, idx) => (
                              <Chip
                                key={`Markets-${idx}`}
                                value={item}
                                isButtonRequire={false}
                                className="font-normal mb-1.5 leading-relaxed tracking-wide text-sm text-gray-700"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </DrawerContent>
            </Drawer>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientApplied;
