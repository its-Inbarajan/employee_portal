import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="max-w-screen border rounded-sm relative px-4 py-4">
      <div className="flex justify-between items-start flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex max-w-sm w-full flex-col flex-1 gap-1 font-medium">
            <p className="text-xl font-normal leading-relaxed text-black">
              Upload your recent resume or CV
            </p>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              Upload your most up-to-date resume
            </span>
            <span className="font-normal text-sm text-gray-500 leading-relaxed">
              File types: DOC, DOCX, PDF, TXT
            </span>
          </div>
          <div className="flex flex-col justify-start gap-3 w-full flex-1">
            <p className="font-medium leading-5 line-clamp-1 text-wrap  tracking-wide text-black">
              inbarajan_mern_stack_developer_resume.pdf
            </p>
            <div className="flex font-normal leading-relaxed md:flex-row flex-col  flex-1 md:gap-2 items-start md:items-center">
              <span className="">
                <Link href={"/"} className="inline-block text-blue-500 ">
                  View your resume
                </Link>
              </span>
              <span>or</span>
              <span>upload a new one below</span>
            </div>
            <div className="relative h-48 rounded-lg border-dotted border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
              <div className="absolute">
                <div className="flex flex-col items-center">
                  <FolderOpen className="text-blue-700 size-10" />
                  <span className="block text-gray-400 font-normal">
                    Attach you files here
                  </span>
                </div>
              </div>
              <Input
                type="file"
                className="h-full w-full opacity-0 cursor-pointer"
                name="resume"
              />
            </div>
            <Button
              variant={"link"}
              type="button"
              className="text-gray-500 inline-block px-0 w-auto text-start"
            >
              Remove your resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
