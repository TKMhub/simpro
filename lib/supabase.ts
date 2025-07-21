import { createClient } from "@supabase/supabase-js";
import { Contents } from "@/types/contents";

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
async function supabaseFetch<T>(path: string, params: string) {
  const url = `${SUPABASE_URL}/rest/v1/${path}?${params}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getPublishedContents(): Promise<Contents[]> {
  const params = new URLSearchParams({
    select: "*",
    isPublished: "eq.true",
  }).toString();
  return supabaseFetch<Contents[]>("Contents", params);
}

export async function getContentById(
  id: number
): Promise<Contents | undefined> {
  const params = new URLSearchParams({
    select: "*",
    id: `eq.${id}`,
  }).toString();
  const data = await supabaseFetch<Contents[]>("Contents", params);
  return data[0];
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

export async function createContent(
  data: Partial<Contents>
): Promise<Contents> {
  const result = await supabaseRequest<Contents[]>("POST", "Contents", "", [
    data,
  ]);
  return result[0];
}

export async function updateContent(
  id: number,
  data: Partial<Contents>
): Promise<Contents> {
  const params = new URLSearchParams({ id: `eq.${id}` }).toString();
  const result = await supabaseRequest<Contents[]>(
    "PATCH",
    "Contents",
    params,
    data
  );
  return result[0];
}

export async function deleteContent(id: number): Promise<void> {
  const params = new URLSearchParams({ id: `eq.${id}` }).toString();
  await supabaseRequest("DELETE", "Contents", params);
}

// ------------------------------
// ファイル操作系（Storage）
// ------------------------------

//ファイル新規作成
export async function uploadFile(
  file: ArrayBuffer,
  filename: string,
  contentType: string
): Promise<string> {
  const { error } = await supabase.storage
    .from("contents")
    .upload(filename, file, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase file upload failed: ${error.message}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/contents/${filename}`;
}

//ファイル削除
export async function deleteFile(fileUrl: string): Promise<void> {
  if (!fileUrl) return;

  const prefix = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/`;
  if (!fileUrl.startsWith(prefix)) return;

  const path = fileUrl.slice(prefix.length);
  const { error } = await supabase.storage.from(SUPABASE_BUCKET).remove([path]);

  if (error) {
    throw new Error(`Supabase file delete failed: ${error.message}`);
  }
}
