import { NextResponse } from "next/server";

export async function GET() {
  console.log("SOMEONE CALLED DEFAULT SESSION");
  return NextResponse.json({});
}
