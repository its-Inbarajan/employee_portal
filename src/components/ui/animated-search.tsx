"use client";
import { Search } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function AnimatedSearch() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputFocus = React.useRef<boolean>(false);
  const ToggleInput = () => {
    setIsOpen((pre) => !pre);
    inputFocus.current = false ? true : false;
  };
  // Close search when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={containerRef} className="flex justify-center items-center">
      <div
        className={`flex items-center rounded-full transition-all duration-500 ease-in-out ${
          isOpen ? "w-64 border border-gray-300 overflow-hidden" : "w-5"
        }`}
      >
        {/* Search Input */}
        <Input
          type="text"
          autoFocus={inputFocus.current}
          placeholder="Search..."
          className={`bg-transparent outline-none border-none px-3 text-sm transition-all duration-500 ${
            isOpen ? " opacity-100 w-full" : "hidden opacity-0 w-0"
          }`}
        />

        {/* Search Button */}
        <Button
          type="button"
          variant={"link"}
          onClick={ToggleInput}
          className={
            isOpen
              ? "hidden"
              : "inline-flex items-center rounded-full cursor-pointer bg-transparent text-gray-500 hover:text-gray-800"
          }
        >
          <Search className="size-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
