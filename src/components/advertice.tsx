"use client";
import React from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

const Advertice = () => {
  const [show, setShow] = React.useState<boolean>(true);
  const handleRemove = () => {
    setShow(!show);
  };
  return (
    <div
      className={
        show
          ? "h-10 bg-black text-white w-full md:flex gap-5 justify-center items-center hidden"
          : "hidden"
      }
    >
      <p className="font-medium text-nowrap text-xs text-center leading-relaxed">
        Hello There, This is a frontend demo inspired by{" "}
        <a
          href="https://wellfound.com/"
          target="_blank"
          className="underline text-blue-500"
        >
          Wellfound
        </a>
        . Content is for display purposes only to showcase my UI/UX development
        skills.
      </p>
      <Button
        variant={"default"}
        size={"icon-sm"}
        type="button"
        onClick={handleRemove}
      >
        <XIcon />
      </Button>
    </div>
  );
};

export default Advertice;
