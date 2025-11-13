"use client";
import React from "react";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";

interface Options {
  heading?: string;
  data: string[];
  icon?: React.ReactNode;
}

type ComboBoxProps = {
  PopoverClassName?: string;
  CommandClassName?: string;
  options: Options[];
  placeholder: string;
};

export function CompoBox({
  PopoverClassName,
  options,
  CommandClassName,
  placeholder,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", PopoverClassName)}
        >
          {value
            ? options[0]?.data.find((item) => item === value)
            : placeholder}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", CommandClassName)}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No Options.</CommandEmpty>
            {options &&
              options.map((item) => (
                <CommandGroup
                  className="capitalize text-sm font-normal leading-relaxed"
                  key={`heading_${item.heading}`}
                  heading={item.heading ?? ""}
                >
                  {item.data &&
                    item.data.map((it) => (
                      <CommandItem
                        className="capitalize text-sm font-normal leading-relaxed"
                        key={`${item.heading ?? "items"}_${it}`}
                        value={it}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === it ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {it}
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
