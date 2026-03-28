import path from "path";
import { readFileSync } from "fs";

export function getMarketingData() {
  const filePath = path.join(process.cwd(), "data", "marketing.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}
