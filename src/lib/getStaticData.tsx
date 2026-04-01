import path from "path";
import { readFileSync } from "fs";
import React from "react";
import { cn } from "./utils";

export function getMarketingData() {
  const filePath = path.join(process.cwd(), "data", "marketing.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export const HighlightText = ({
  children,
  className,
}: {
  children: Readonly<React.ReactNode>;
  className?: string;
}) => (
  <span
    className={cn(
      `text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600`,
      className,
    )}
  >
    {children}
  </span>
);
