import { ProductRecord } from "@/types/productRecord";
import { fetchPublishedProducts, fetchProductById } from "@/lib/supabase";
import { Product } from "@/types/product";

// Check if file path points to an image
function isImageFile(path: string | null | undefined): boolean {
  if (!path) return false;
  return /\.(png|jpe?g|gif|svg|webp)$/i.test(path);
}

// Convert ProductRecord to Product type
function mapRecordToProduct(item: ProductRecord): Product {
  const imageUrl = isImageFile(item.filePath)
    ? (item.filePath as string)
    : "/Simplo_gray_main_sub.jpg";

  return {
    title: item.title,
    category: item.category,
    description: item.description ?? "",
    date: item.createdAt,
    imageUrl,
    author: item.authorId,
    tags: item.tags,
    slug: item.id.toString(),
    buttonType: item.deliveryType === "FILE" ? "download" : "link",
    buttonUrl:
      item.deliveryType === "FILE" ? item.filePath ?? "" : item.url ?? "",
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
  return products
    .filter((c) => c.category === category)
    .map(mapRecordToProduct);
}

export async function getProductsByTypeAndCategory(
  type: string,
  category: string
): Promise<Product[]> {
  const records = await fetchPublishedProducts();
  return records
    .filter((r) => r.type === type && r.category === category)
    .map(mapRecordToProduct);
}
