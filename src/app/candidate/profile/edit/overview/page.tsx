import Chip from "@/components/ui/chip";
import { Earth, Github, Linkedin, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="max-w-screen border rounded-sm min-h-screen relative px-4 py-4">
      <div className="flex flex-col h-full">
        <h1 className="font-semibold mb-2 text-black text-lg leading-6 tracking-wide">
          What recruiters will see?
        </h1>
        <div className="md:px-4 h-auto md:py-4 p-2 border rounded-sm w-full">
          <div className="flex items-start sm:flex-wrap md:flex-row flex-col gap-3 md:px-2 md:py-2.5 px-3.5 py-2">
            <div className="flex items-start gap-4 md:flex-row flex-col flex-1">
              <div className="h-20 w-20 rounded-full border">
                <Image
                  src={"/next.svg"}
                  alt="profile-image"
                  width={50}
                  height={50}
                  className="w-full h-full object-fill aspect-auto"
                />
              </div>
              <div className="flex flex-col flex-1 items-start justify-start">
                <p className="font-semibold text-xl text-black mb-1.5 leading-6 tracking-wide text-nowrap">
                  Inba Rajan <span className="text-gray-500">(He/Him)</span>
                </p>
                <p className="font-normal text-gray-700 md:leading-relaxed mb-2  tracking-wider">
                  3 years of exp • Bangalore Urban, India • 0.5 hours behind •
                  Open to remote
                </p>
                <span className="rounded-full bg-gray-200 inline-block font-normal text-xs h-fit p-2 leading-5 tracking-wide text-gray-700">
                  Active today
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-start">
              <Link href={"/"} className="w-auto bg-gray-200 rounded p-1.5">
                <Github className="size-4 text-gray-500" />
              </Link>
              <Link href={"/"} className="w-auto bg-gray-200 rounded p-1.5">
                <Linkedin className="size-4 text-gray-500" />
              </Link>
              <Link href={"/"} className="w-auto bg-gray-200 rounded p-1.5">
                <Earth className="size-4 text-gray-500" />
              </Link>
              <Link href={"/"} className="w-auto bg-gray-200 rounded p-1.5">
                <Newspaper className="size-4 text-gray-500" />
              </Link>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
              Looking for
            </span>
            <div className="flex items-start gap-3">
              {/* Left bubble + line */}
              <div className="relative flex flex-col items-center">
                <div className="w-5 h-5 rounded-full shadow-gray-300 shadow bg-gray-100 border-[1px] flex items-center justify-center">
                  <span className="text-gray-500 text-xs font-serif">“</span>
                </div>
                <div className="w-px flex-1 h-full  borders bg-gray-200 mt-1"></div>
              </div>

              {/* Text content */}
              <p className="font-normal text-sm text-balance leading-5 tracking-wider text-black">
                I am looking for a role where I can take ownership of end-to-end
                development, work closely with a passionate team, and contribute
                to building impactful products. I want to work in an environment
                that encourages innovation, quick decision-making, and
                continuous learning, while allowing me to deepen my skills.
              </p>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
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
                <h1 className="font-medium text-black text-xl ">
                  Full stack Developer
                </h1>
                <p className="font-medium text-gray-500 text-sm ">
                  Company Name
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
              Skills
            </span>

            <div className="flex gap-2 flex-wrap items-start w-full">
              {[
                "CSS",
                "React",
                "NextJs",
                "NodeJs",
                "ExpressJs",
                "Mongodb",
                "socket.io",
                "Redux",
                "Tanstack(Query)",
                "scss/css",
                "AWS/EC2/ELB/S3/DynamoDB",
                "Full-Stack Web Development (Node/Redux/React)",
                "MERN Stack - Javascript (ES5 & ES6), MongoDB, Express.Js, React, Node.Js",
                "TailwindCSS",
                "TypeScript",
              ].map((item) => (
                <Chip
                  key={item}
                  spanClass="size-4 text-gray-600 font-medium  text-xs"
                  className="w-auto bg-gray-200 rounded inline-block px-1.5 py-1.5 text-center"
                  value={item}
                  isButtonRequire={false}
                />
              ))}
            </div>
          </div>
          <div className="flex md:px-5 md:py-2.5 px-3.5 py-2 items-start gap-2.5 w-full flex-col">
            <span className="font-semibold text-lg text-gray-800 leading-6 tracking-wide">
              Ideal next opportunity
            </span>
            <div className="flex flex-col flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Desired Salary
              </span>
              <span className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1">
                $7,882 / ₹700,000
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Desired Role
              </span>
              <span className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1">
                Full-Stack Engineer
              </span>
              <span className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1">
                Open to Frontend Engineer or Software Engine
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Remote Work
              </span>
              <span className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1">
                Onsite Or Remote
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Desired Location{" "}
              </span>
              <span className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1">
                Bangalore Urban (current)
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Desired Tech Stack{" "}
              </span>
              <div className="flex flex-row flex-wrap flex-1 gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Express.js",
                  "Javascript",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-normal text-xs text-gray-500 leading-6 tracking-wide">
                Wants
              </span>
              <ul className="flex list-none flex-row flex-wrap flex-1 gap-2">
                {[
                  "To build products",
                  "Employees 'wear a lot of hats'",
                  "A flexible remote work policy",
                  "Individual contributor track",
                  "Autonomy",
                  "Quiet office",
                ].map((item) => (
                  <li
                    key={item}
                    className="inline-block font-normal text-sm text-gray-500 rounded bg-gray-200 px-1.5 py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
