import { NextResponse } from 'next/server';
import { getContentById } from '@/lib/supabase';
import { getPageContentByTitle } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const content = await getContentById(id);
  if (!content) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const notion = await getPageContentByTitle(content.document);
  return NextResponse.json({ ...content, notion });
}
