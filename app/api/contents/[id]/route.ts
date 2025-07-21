import { NextResponse } from 'next/server';
import {
  getContentById,
  updateContent,
  deleteContent,
  uploadFile,
  deleteFile,
} from '@/lib/supabase';
import { getPageContentByTitle } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const { id: raw } = await params;
  const id = parseInt(raw, 10);
  const content = await getContentById(id);
  if (!content) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const notion = await getPageContentByTitle(content.document);
  return NextResponse.json({ ...content, notion });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const { id: raw } = await params;
  const id = parseInt(raw, 10);
  const original = await getContentById(id);
  if (!original) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const form = await request.formData();
  const json = form.get('data');
  if (typeof json !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const fields = JSON.parse(json) as any;
  const file = form.get('file') as File | null;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const url = await uploadFile(arrayBuffer, file.name, file.type);
    fields.filePath = url;
    if (original.filePath) {
      await deleteFile(original.filePath);
    }
  } else if (
    fields.deliveryType === 'URL' &&
    original.deliveryType === 'FILE' &&
    original.filePath
  ) {
    await deleteFile(original.filePath);
    fields.filePath = null;
  }

  const updated = await updateContent(id, fields);
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const { id: raw } = await params;
  const id = parseInt(raw, 10);
  const content = await getContentById(id);
  if (!content) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (content.filePath) {
    await deleteFile(content.filePath);
  }
  await deleteContent(id);
  return NextResponse.json({ success: true });
}
