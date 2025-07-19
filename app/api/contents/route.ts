import { NextResponse } from 'next/server';
import { getPublishedContents } from '@/lib/supabase';

export async function GET() {
  const contents = await getPublishedContents();
  return NextResponse.json(contents);
}
