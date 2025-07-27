export type ProductRecord = {
  id: number;
  title: string;
  document: string;
  type: "TOOL" | "TEMPLATE";
  deliveryType: "FILE" | "URL";
  url?: string | null;
  filePath?: string | null;
  description?: string | null;
  category: string;
  tags: string;
  starRating: number;
  downloadCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
};
