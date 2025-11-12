"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  Dock,
  Home,
  BriefcaseBusiness,
  MessageCircle,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile/edit/overview",
    icon: User2,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applied",
    url: "/jobs/applications",
    icon: Dock,
  },
  {
    title: "Message",
    url: "#",
    icon: MessageCircle,
  },
];

export const Asidebar = () => {
  const pathName = usePathname();
  return (
    <Sidebar className="sticky isolate">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-4">
                  <SidebarMenuButton
                    isActive={pathName.toString() === item.url.toString()}
                    asChild
                    tooltip={item.title.toString()}
                  >
                    <Link
                      href={item.url}
                      className="flex w-full flex-col h-fit"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
