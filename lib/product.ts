import {
  fetchPublishedProducts,
  fetchProductById,
  resolveDeliveryUrl,
  resolveImageUrl,
} from "@/lib/supabase";
import { Product, ProductRecord } from "@/types/product";

// Check if file path points to an image
function isImageFile(path: string | null | undefined): boolean {
  if (!path) return false;
  return /\.(png|jpe?g|gif|svg|webp)$/i.test(path);
}

// ISO文字列 → YYYY-MM-DD
function toYmd(iso: string): string {
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return "";
  }
}

// Convert ProductRecord to Product type
export function mapRecordToProduct(item: ProductRecord): Product {
  return {
    // 必須
    id: item.id,
    slug: String(item.id),
    title: item.title,
    document: item.document,
    type: item.type,
    category: item.category,

    // 表示用整形
    description: item.description ?? "",
    tags: item.tags ?? [],
    date: toYmd(item.createdAt),

    // 画像: imagePath優先 → 公開URL解決 → フォールバック
    imageUrl: resolveImageUrl(item.imagePath, item.filePath),

    // 著者: まずはID（将来ユーザー名に差し替え）
    author: item.authorId,

    // 配布導線: deliveryType/URL解決
    buttonType:
      item.deliveryType === "FILE"
        ? "download"
        : item.deliveryType === "URL"
        ? "link"
        : "",
    buttonUrl: resolveDeliveryUrl({
      deliveryType: item.deliveryType,
      filePath: item.filePath,
      url: item.url,
    }),
  };
}

export async function getPublishedProducts(): Promise<Product[]> {
  const products = await fetchPublishedProducts();
  return products.map(mapRecordToProduct);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const id = Number(slug);
  const record = await fetchProductById(id);
  return record ? mapRecordToProduct(record) : undefined;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await getPublishedProducts();
  return products.filter((p) => p.category === category);
}

export async function getProductsByTypeAndCategory(
  type: "TOOL" | "TEMPLATE",
  category: string
): Promise<Product[]> {
  const products = await getPublishedProducts();
  return products.filter((p) => p.type === type && p.category === category);
}
