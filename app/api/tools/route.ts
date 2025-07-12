import { NextResponse } from "next/server";
import { getPublishedTools } from "@/lib/tool";

export async function GET() {
  const tools = await getPublishedTools();
  return NextResponse.json(tools);
}
