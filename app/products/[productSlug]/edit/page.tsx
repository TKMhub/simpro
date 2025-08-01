import { notFound } from "next/navigation";
import { ProductForm } from "@/app/components/product/ProductForm";
import { fetchProductById } from "@/lib/supabase";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }> | { productSlug: string };
}) {
  const { productSlug } = await params;
  const id = Number(productSlug);
  const content = await fetchProductById(id);

  if (!content || content.type !== "TOOL") {
    notFound();
  }

  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">プロダクト編集</h1>
      <ProductForm
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
