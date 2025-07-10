import { Tool } from "@/types/tool";

export async function getPublishedTools(): Promise<Tool[]> {
  return [
    {
      title: "請求書自動生成ツール",
      description: "取引データからPDF請求書を一括作成。",
      date: "2025-07-10",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["VBA", "請求書"],
      slug: "invoice-generator",
    },
    {
      title: "日報自動化ツール",
      description: "Excelで日報を一瞬で生成・送信。",
      date: "2025-07-09",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["Excel", "自動化"],
      slug: "daily-report-automation",
    },
  ];
}
