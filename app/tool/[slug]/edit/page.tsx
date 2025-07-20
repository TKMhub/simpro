import { notFound } from "next/navigation";
import { ToolForm } from "@/app/components/tool/ToolForm";
import { getContentById } from "@/lib/supabase";

export default async function EditToolPage({ params }: { params: { slug: string } }) {
  const id = Number(params.slug);
  const content = await getContentById(id);

  if (!content || content.type !== "TOOL") {
    notFound();
  }

  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">ツール編集</h1>
      <ToolForm
        id={content.id}
        defaultValues={{
          title: content.title,
          document: content.document,
          category: content.category,
          tags: content.tags.join(", "),
          description: content.description ?? "",
          deliveryType: content.deliveryType,
          url: content.url ?? "",
          isPublished: content.isPublished,
          authorId: content.authorId,
        }}
      />
    </section>
  );
}
