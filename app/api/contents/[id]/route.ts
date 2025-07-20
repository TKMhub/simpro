import { NextResponse } from 'next/server';
import {
  getContentById,
  updateContent,
  deleteContent,
  uploadFile,
} from '@/lib/supabase';
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const form = await request.formData();
  const json = form.get('data');
  if (typeof json !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const fields = JSON.parse(json) as any;
  const file = form.get('file') as File | null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFile(buffer, file.name, file.type);
    fields.filePath = url;
  }

  const updated = await updateContent(id, fields);
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  await deleteContent(id);
  return NextResponse.json({ success: true });
}
