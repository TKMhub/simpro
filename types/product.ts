export type Product = {
  id: number;
  title: string;
  document: string;
  type: "TOOL" | "TEMPLATE"; // ← enum ProductType の想定
  deliveryType: "FILE" | "URL"; // ← enum DeliveryType の想定
  url?: string | null;
  filePath?: string | null;
  description?: string | null;
  category: string;
  tags: string[];
  starRating: number;
  downloadCount: number;
  isPublished: boolean;
  createdAt: string; // DateTime → ISO文字列
  updatedAt: string;
  authorId: string;
  author: string; // ユーザー名など必要に応じて詳細定義（省略も可）
};
