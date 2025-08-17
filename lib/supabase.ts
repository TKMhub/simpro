// lib/supabase.ts
import "server-only";
import { ProductRecord } from "@/types/product";
import { createClient } from "@supabase/supabase-js";

// ------------------------------
// 環境変数
// ------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? "public";

// ------------------------------
// Supabase クライアント
// ------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// ------------------------------
// DB操作系
// ------------------------------
// async function supabaseFetch<T>(path: string, params: string) {
//   const url = `${SUPABASE_URL}/rest/v1/${path}?${params}`;
//   const res = await fetch(url, {
//     headers: {
//       apikey: SUPABASE_SERVICE_ROLE_KEY,
//       Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
//     },
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error(`Supabase fetch failed: ${res.status}`);
//   }
//   return (await res.json()) as T;
// }

export async function fetchPublishedProducts(): Promise<ProductRecord[]> {
  // コメント: select("*") 維持、順序保証のみ追加
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("isPublished", true)
    .order("createdAt", { ascending: true });

  if (error) throw new Error(`fetchPublishedProducts failed: ${error.message}`);
  return (data ?? []) as ProductRecord[];
}

/** id単体取得（1件 or undefined） */
export async function fetchProductById(
  id: number
): Promise<ProductRecord | undefined> {
  // コメント: maybeSingle で配列[0]不要・意図明確
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`fetchProductById failed: ${error.message}`);
  return (data ?? undefined) as ProductRecord | undefined;
}

// ------------------------------
// mutation helpers
// ------------------------------

async function supabaseRequest<T>(
  method: string,
  path: string,
  params: string,
  body?: unknown,
  contentType = "application/json"
) {
  const url = `${SUPABASE_URL}/rest/v1/${path}?${params}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
  if (body) {
    headers["Content-Type"] = contentType;
    headers["Prefer"] = "return=representation";
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Supabase request failed: ${res.status}`);
  }

  return body ? ((await res.json()) as T) : (undefined as T);
}

export async function createProduct(
  data: Partial<ProductRecord>
): Promise<ProductRecord> {
  const result = await supabaseRequest<ProductRecord[]>(
    "POST",
    "Products",
    "",
    [data]
  );
  return result[0];
}

export async function updateProduct(
  id: number,
  data: Partial<ProductRecord>
): Promise<ProductRecord> {
  const params = new URLSearchParams({ id: `eq.${id}` }).toString();
  const result = await supabaseRequest<ProductRecord[]>(
    "PATCH",
    "Products",
    params,
    data
  );
  return result[0];
}

export async function deleteProduct(id: number): Promise<void> {
  const params = new URLSearchParams({ id: `eq.${id}` }).toString();
  await supabaseRequest("DELETE", "Products", params);
}

// ------------------------------
// ファイル操作系（Storage）
// ------------------------------
const FALLBACK_IMAGE = "/Simplo_gray_main_sub.jpg";

// 画像拡張子判定
export function isImageFile(p?: string | null): boolean {
  if (!p) return false;
  return /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(p);
}

// Storageの公開URL取得（パス想定）
export function publicUrlFromPath(path: string): string {
  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  return data?.publicUrl ?? "";
}

// 公開URL or パス → 公開URL正規化
export function normalizeToPublicUrl(p?: string | null): string {
  if (!p) return "";
  // すでにhttpsならそのまま返す（Supabase公開URL想定）
  if (/^https?:\/\//i.test(p)) return p;
  // Storageパスなら公開URL化
  return publicUrlFromPath(p);
}

// 表示画像URL解決（imagePath優先、無ければfilePathが画像なら採用、最後にフォールバック）
export function resolveImageUrl(
  imagePath?: string | null,
  filePath?: string | null
): string {
  if (isImageFile(imagePath)) {
    const url = normalizeToPublicUrl(imagePath);
    return url || FALLBACK_IMAGE;
  }
  if (isImageFile(filePath)) {
    const url = normalizeToPublicUrl(filePath);
    return url || FALLBACK_IMAGE;
  }
  return FALLBACK_IMAGE;
}

// 配布URL解決（FILE→Storage、URL→外部URL、無効→空）
export function resolveDeliveryUrl(params: {
  deliveryType: "FILE" | "URL";
  filePath?: string | null;
  url?: string | null;
}): string {
  const { deliveryType, filePath, url } = params;
  if (deliveryType === "FILE" && filePath) {
    return normalizeToPublicUrl(filePath) || "";
  }
  if (deliveryType === "URL" && url) {
    return url;
  }
  return "";
}

// 公開URL → Storageパス（削除用などに使用）
export function urlToStoragePath(publicUrl: string): string | null {
  // 例: https://xxxx.supabase.co/storage/v1/object/public/products/dir/file.png
  const m = publicUrl.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/);
  return m ? m[1] : null;
}

// 画像アップロード（パスと公開URLを同時返却）
export async function uploadImage(
  file: ArrayBuffer,
  filename: string, // 例: products/123/cover.webp でも OK
  contentType: string // image/webp など
): Promise<{ path: string; publicUrl: string }> {
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filename, file, { contentType, upsert: true });

  if (error) throw new Error(`Supabase image upload failed: ${error.message}`);

  const publicUrl = normalizeToPublicUrl(filename);
  return { path: filename, publicUrl };
}

// パスで削除（公開URLしか無い場合は urlToStoragePath で変換）
export async function deleteByPath(path: string): Promise<void> {
  if (!path) return;
  const { error } = await supabase.storage.from(SUPABASE_BUCKET).remove([path]);
  if (error) throw new Error(`Supabase file delete failed: ${error.message}`);
}
