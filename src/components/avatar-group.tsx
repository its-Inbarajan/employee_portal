"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./ui/avatar";

const avatar = [
  {
    url: "https:randomuser.me/api/portraits/women/44.jpg",
    fallback: "BA",
  },
  {
    url: "https://randomuser.me/api/portraits/women/68.jpg",
    fallback: "AN",
  },
  {
    url: "https://randomuser.me/api/portraits/men/32.jpg",
    fallback: "CN",
  },
];
export default function AvatarGroupComponent() {
  return (
    <AvatarGroup className="select-none">
      {avatar.map((item) => (
        <Avatar key={`avatar-${item.fallback}`}>
          <AvatarImage src={item.url} alt={`image-${item.fallback}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}
