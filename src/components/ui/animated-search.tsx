"use client";
import { Search } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import useKeyboardShortcut from "@/hooks/use-keyboard-shortcut-key";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export default function AnimatedSearch() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputFocus = React.useRef<boolean>(false);

  const ToggleInput = React.useCallback(() => {
    setIsOpen((pre) => !pre);
  }, []);

  useKeyboardShortcut("k", ToggleInput);
  // Close search when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        inputFocus.current = true;
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={containerRef} className="flex justify-center items-center group">
      <form autoFocus>
        <div
          className={`flex items-center rounded-full transition-all duration-500 ease-in-out ${
            isOpen ? "w-64 border border-gray-300 overflow-hidden" : ""
          }`}
        >
          {/* Search Input */}
          <Input
            type="text"
            autoFocus={true}
            placeholder="Search..."
            className={`bg-transparent outline-none border-none px-3 text-sm transition-all duration-500 ${
              isOpen ? " opacity-100 w-full" : "hidden opacity-0 w-0"
            }`}
          />

          {/* Search Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={"link"}
                onClick={ToggleInput}
                className={
                  isOpen
                    ? "hidden"
                    : "flex items-center rounded-full justify-center group hover:bg-purple-200 w-10 h-10 cursor-pointer bg-transparent"
                }
              >
                <Search className="size-5 text-gray-500 group-hover:text-purple-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Press CRTL + K</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}
