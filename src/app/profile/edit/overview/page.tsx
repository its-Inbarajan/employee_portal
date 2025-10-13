import { Earth, Github, Linkedin, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="max-w-screen border rounded-sm relative px-4 py-4">
      <div className="flex flex-col">
        <h1 className="font-semibold mb-2 text-black text-lg leading-6 tracking-wide">
          What recruiters will see?
        </h1>
        <div className="md:px-4 h-screen md:py-4 p-2 border rounded-sm w-full">
          <div className="flex items-start md:flex-row flex-col gap-3 md:px-5 md:py-2.5 px-3.5 py-2">
            <div className="h-20 w-20 rounded-full border">
              <Image
                src={"/next.svg"}
                alt="profile-image"
                width={50}
                height={50}
                className="w-full h-full object-fill aspect-auto"
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="font-semibold text-xl text-black mb-1.5 leading-6 tracking-wide text-nowrap">
                Inba Rajan <span className="text-gray-500">(He/Him)</span>
              </p>
              <span className="font-normal text-gray-7 leading-5 mb-2 text-wrap w-xl tracking-wider">
                3 years of exp • Bangalore Urban, India • 0.5 hours behind •
                Open to remote
              </span>
              <span className="rounded-full bg-gray-200 inline-block font-normal text-xs h-fit p-2 leading-5 tracking-wide text-gray-700">
                Active today
              </span>
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
        </div>
      </div>
    </div>
  );
}
