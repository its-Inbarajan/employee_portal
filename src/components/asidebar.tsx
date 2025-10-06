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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile/1234",
    icon: User2,
  },
  {
    title: "Jobs",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applied",
    url: "#",
    icon: Dock,
  },
  {
    title: "Message",
    url: "#",
    icon: MessageCircle,
  },
];

export const Asidebar = () => {
  return (
    <Sidebar className="sticky isolate">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
