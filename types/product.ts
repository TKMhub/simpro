export type ProductRecord = {
  // ← SupabaseからSELECTする生データ型
  id: number;
  title: string;
  document: string;
  type: "TOOL" | "TEMPLATE";
  deliveryType: "FILE" | "URL";
  url: string | null;
  filePath: string | null; // 配布物の実体（ZIP等）
  imagePath: string | null; // 表示用画像のStorageパス（例: products/123/cover.webp）
  description: string | null;
  category: string;
  tags: string[]; // text[] を直接受ける
  starRating: number;
  downloadCount: number;
  isPublished: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  authorId: string;
  // author名は別取得でも可。まずはIDで統一
};

export type Product = {
  // ← 画面で使う最終型（カード/一覧/詳細で統一）
  id: number;
  slug: string; // id の文字列化
  title: string;
  document: string;
  type: "TOOL" | "TEMPLATE";
  category: string;
  description: string; // 空文字で統一
  tags: string[];
  date: string; // 表示用 YYYY-MM-DD
  imageUrl: string; // 画像URL（解決済み or フォールバック）
  author: string; // まずは authorId を入れる（後日ユーザー名解決）
  buttonType: "download" | "link" | ""; // 配布導線
  buttonUrl: string; // 解決済みURL or 空文字
};
