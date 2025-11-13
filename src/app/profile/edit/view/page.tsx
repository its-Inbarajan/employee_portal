import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const ProfileView = () => {
  return (
    <div className="max-w-screen border rounded-sm relative px-4 py-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium leading-relaxed text-black">
          Profile views
        </h1>
        <div className="flex justify-between flex-col md:flex-row md:items-center">
          <div className="flex flex-col md:flex-row gap-2.5 md:items-center">
            <div className="w-10 block h-10 rounded-full ring-1 ring-gray-500">
              <Image
                src={"/next.svg"}
                width={50}
                height={50}
                className="w-full h-full object-center aspect-auto"
                alt="edit-profile"
              />
            </div>
            <p className="font-semibold tracking-normal leading-6 text-sm">
              A chief of staff at a Seed technology company based in Bengaluru
            </p>
          </div>
          <span className="text-xs font-mono text-gray-400">2 month ago</span>
        </div>
        <Separator />
        <div className="flex justify-between flex-col md:flex-row md:items-center">
          <div className="flex flex-col md:flex-row gap-2.5 md:items-center">
            <div className="w-10 block h-10 rounded-full ring-1 ring-gray-500">
              <Image
                src={"/next.svg"}
                width={50}
                height={50}
                className="w-full h-full object-center aspect-auto"
                alt="edit-profile"
              />
            </div>
            <p className="font-semibold tracking-normal leading-6 text-sm">
              A chief of staff at a Seed technology company based in Bengaluru
            </p>
          </div>
          <span className="text-xs font-mono text-gray-400">2 month ago</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
