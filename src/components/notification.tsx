'use client'
import React from "react";
import useKeyboardShortcut from "@/hooks/use-keyboard-shortcut-key";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Bell } from "lucide-react";

export function Notification() {

    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpenNotifiation = React.useCallback(
        () => setOpen((pre) => !pre),
        []
    );

    useKeyboardShortcut("i", handleOpenNotifiation);
    return (
        <DropdownMenu onOpenChange={handleOpenNotifiation} open={open}>
            <DropdownMenuTrigger
                role="button"
                className="group p-2 rounded-full cursor-pointer hover:bg-purple-200 transition ease-in-out"
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Bell className="size-5 text-gray-500 group-hover:text-purple-500" />
                    </TooltipTrigger>
                    <TooltipContent>Press CRTL + I</TooltipContent>
                </Tooltip>
            </DropdownMenuTrigger>
            <div className="">
                <DropdownMenuContent className="w-xs absolute -translate-1/2 top-6">
                    <DropdownMenuLabel>No notification.</DropdownMenuLabel>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    )
}