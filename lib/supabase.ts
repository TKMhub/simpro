const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

import { Contents } from '@/types/contents';

async function supabaseFetch<T>(path: string, params: string) {
  const url = `${SUPABASE_URL}/rest/v1/${path}?${params}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getPublishedContents(): Promise<Contents[]> {
  const params = new URLSearchParams({
    select: '*',
    isPublished: 'eq.true',
  }).toString();
  return supabaseFetch<Contents[]>('Contents', params);
}

export async function getContentById(id: number): Promise<Contents | undefined> {
  const params = new URLSearchParams({
    select: '*',
    id: `eq.${id}`,
  }).toString();
  const data = await supabaseFetch<Contents[]>('Contents', params);
  return data[0];
}
