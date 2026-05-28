"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import React from "react";
import { NavUser } from "./nav-user";
import { usePathname, useRouter } from "next/navigation";
import { DynamicIcon, IconName } from "@/components/dynamic-icon";
import { navigation } from "@/data/dashboard.json";

export default function RecruiterAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/recruiter") return pathname === "/recruiter";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar {...props} className="sidebar-scroll">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-white/40 px-3">
                  {item.title}
                </SidebarGroupLabel>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => {
                      const active = isActive(item.url);
                      return (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            className="text-white/70 cursor-pointer text-xs hover:text-white hover:bg-white/10 data-[active=true]:bg-blue-600 data-[active=true]:text-white rounded-lg"
                            asChild
                            onClick={() => router.push(item.url)}
                            isActive={active}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && (
                                <DynamicIcon
                                  name={item.icon as IconName}
                                  className="size-4"
                                />
                              )}
                              {item.title}
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigation.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
