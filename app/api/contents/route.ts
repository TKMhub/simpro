import { NextResponse } from 'next/server';
import {
  getPublishedContents,
  createContent,
  uploadFile,
} from '@/lib/supabase';

type FormFields = Omit<Parameters<typeof createContent>[0], 'filePath'> & {
  file?: File | null;
};

export async function GET() {
  const contents = await getPublishedContents();
  return NextResponse.json(contents);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const json = form.get('data');
  if (typeof json !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const fields: FormFields = JSON.parse(json);
  const file = form.get('file') as File | null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFile(buffer, file.name, file.type);
    fields.filePath = url;
  }

  const created = await createContent(fields);
  return NextResponse.json(created, { status: 201 });
}
