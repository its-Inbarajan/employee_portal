import React from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipProps = {
  value: string;
  onClick?: () => void;
  className?: string;
  spanClass?: string;
  isButtonRequire?: boolean;
};

const Chip: React.FC<ChipProps> = ({
  onClick,
  value,
  className,
  spanClass,
  isButtonRequire = true,
}) => {
  return (
    <div
      className={cn(
        "w-fit rounded bg-gray-300 px-2 py-2 flex flex-row gap-2 items-center",
        className
      )}
    >
      <span
        className={cn(
          "font-normal leading-relaxed text-sm text-black",
          spanClass
        )}
      >
        {value}
      </span>
      {isButtonRequire && (
        <Button
          onClick={onClick}
          variant={"default"}
          className="bg-transparent h-5 p-0 hover:bg-transparent inline-block"
        >
          <X className="size-5 text-black" />
        </Button>
      )}
    </div>
  );
};

export default Chip;
