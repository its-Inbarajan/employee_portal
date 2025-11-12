import { cn } from "@/lib/utils";
import React, { ChangeEvent } from "react";

type ToggleSwitchProps = {
  label?: string;
  className?: string;
  value?: string;
  onChage?: (e: ChangeEvent<HTMLInputElement | boolean>) => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  className,
  label,
  onChage,
  value,
}) => {
  return (
    <label
      //   htmlFor={label}
      className={cn(
        "relative inline-flex h-8 gap-2 items-center cursor-pointer",
        className
      )}
    >
      <input
        type="checkbox"
        id={label}
        className="sr-only peer"
        value={value}
        onChange={onChage}
      />
      <div className="group peer bg-white rounded-full duration-300 w-10 h-4 ring-1 ring-gray-500 after:duration-300 after:bg-gray-500 peer-checked:bg-blue-500 peer-checked:after:bg-white peer-checked:ring-blue-500 after:rounded-full after:absolute after:h-4 after:w-4 after:top-2 after:left-0 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6  peer-hover:after:scale-95"></div>
      <span>{label}</span>
    </label>
  );
};
