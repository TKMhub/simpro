import { notFound } from "next/navigation";
import { productDummy } from "@/data/products_dummy";

export default function ProductDetailPage({
  params,
}: {
  params: { type: string; category: string; slug: string };
}) {
  const { type, category, slug } = params;
  const decoded = decodeURIComponent(category);
  const item = productDummy[type]?.[decoded]?.find((p) => p.slug === slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-700">{item.description}</p>
    </div>
  );
}
