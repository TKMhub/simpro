import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productType: string; productCategory: string; itemSlug: string }>;
}) {
  const { itemSlug } = await params;
  const item = await getProductBySlug(itemSlug);
  if (!item) {
    notFound();
  }

  return (
    <div className="px-20 py-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-700">{item.description}</p>
    </div>
  );
}
