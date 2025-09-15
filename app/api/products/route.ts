import { NextResponse } from "next/server";
import {
  fetchPublishedProducts,
  createProduct,
  uploadFile,
} from "@/lib/supabase";

type FormFields = Omit<Parameters<typeof createProduct>[0], "filePath"> & {
  file?: File | null;
  filePath?: string;
  image?: File | null;
  imagePath?: string | null;
};

export async function GET() {
  const products = await fetchPublishedProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const json = form.get("data");
  if (typeof json !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const fields: FormFields = JSON.parse(json);
  const file = form.get("file") as File | null;
  const image = form.get("image") as File | null;

  // 配布ファイル（FILEのとき）
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const { path } = await uploadFile(arrayBuffer, file.name, file.type);
    fields.filePath = path;
  }

  // 表示用画像（任意）
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const { path } = await uploadFile(arrayBuffer, image.name, image.type);
    fields.imagePath = path;
  }

  const created = await createProduct(fields);
  return NextResponse.json(created, { status: 201 });
}
