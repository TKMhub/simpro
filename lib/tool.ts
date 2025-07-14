import { Tool } from "@/types/tool";

export async function getPublishedTools(): Promise<Tool[]> {
  return [
    {
      title: "請求書自動生成ツール",
      category: "Excel VBA",
      description: "取引データからPDF請求書を一括作成。",
      date: "2025-07-10",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["請求書", "自動化", "業務効率化"],
      slug: "invoice-generator",
      buttonType: "download",
      buttonUrl: "/dummy/invoice-generator.zip",
    },
    {
      title: "日報自動化ツール",
      category: "Excel VBA",
      description: "Excelで日報を一瞬で生成・送信。",
      date: "2025-07-09",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["Excel", "自動化"],
      slug: "daily-report-automation",
      buttonType: "download",
      buttonUrl: "/dummy/daily-report-automation.zip",
    },
    {
      title: "スプレッドシート整理GAS",
      category: "Gas",
      description: "大量データを自動整理するGASスクリプト。",
      date: "2025-07-08",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["GAS"],
      slug: "spreadsheet-organizer",
      buttonType: "link",
      buttonUrl: "https://example.com/spreadsheet-organizer",
    },
    {
      title: "Markdown to HTML ツール",
      category: "Webツール",
      description: "Markdownをブラウザ上でHTMLに変換。",
      date: "2025-07-07",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["Web"],
      slug: "markdown-html-converter",
      buttonType: "link",
      buttonUrl: "https://example.com/markdown-html-converter",
    },
    {
      title: "ファイル整理バッチ",
      category: "Executable File",
      description: "指定フォルダ内のファイルを自動で整理。",
      date: "2025-07-06",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["bat"],
      slug: "file-organizer-batch",
      buttonType: "download",
      buttonUrl: "/dummy/file-organizer-batch.zip",
    },
    // ↓ 重複データも修正
    {
      title: "スプレッドシート整理GAS",
      category: "Gas",
      description: "大量データを自動整理するGASスクリプト。",
      date: "2025-07-08",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["GAS"],
      slug: "spreadsheet-organizer-2", // ← slug を一意に変更
      buttonType: "link",
      buttonUrl: "https://example.com/spreadsheet-organizer",
    },
    {
      title: "Markdown to HTML ツール",
      category: "Webツール",
      description: "Markdownをブラウザ上でHTMLに変換。",
      date: "2025-07-07",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["Web"],
      slug: "markdown-html-converter-2",
      buttonType: "link",
      buttonUrl: "https://example.com/markdown-html-converter",
    },
    {
      title: "ファイル整理バッチ",
      category: "Executable File",
      description: "指定フォルダ内のファイルを自動で整理。",
      date: "2025-07-06",
      imageUrl: "/Simplo_gray_main_sub.jpg",
      author: "taku",
      tags: ["bat"],
      slug: "file-organizer-batch-2",
      buttonType: "download",
      buttonUrl: "/dummy/file-organizer-batch.zip",
    },
  ];
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await getPublishedTools();
  return tools.find((tool) => tool.slug === slug);
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await getPublishedTools();
  return tools.filter((tool) => tool.category === category);
}
