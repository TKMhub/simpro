import { notFound } from "next/navigation";
import { ToolForm } from "@/app/components/tool/ToolForm";
import { getContentById } from "@/lib/supabase";

export default async function ToolEditPage({ params }: { params: { slug: string } }) {
  const id = parseInt(params.slug, 10);
  const content = await getContentById(id);
  if (!content) {
    notFound();
  }
  return (
    <section className="px-20 py-4 mt-8">
      <h1 className="text-2xl font-bold">コンテンツ編集</h1>
      <ToolForm initial={content} />
    </section>
  );
}
