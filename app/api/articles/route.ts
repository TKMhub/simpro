import { NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/notion"; // 既存のAPI関数を流用

export async function GET() {
  const articles = await getPublishedArticles();
  return NextResponse.json(articles);
}
