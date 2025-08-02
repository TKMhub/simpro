import { notFound } from "next/navigation";
import { productDummy } from "@/data/products_dummy";

export default function ProductDetailPage({
  params,
}: {
  params: { productType: string; productCategory: string; itemSlug: string };
}) {
  const { productType, productCategory, itemSlug } = params;
  const decoded = decodeURIComponent(productCategory);
  const item = productDummy[productType]?.[decoded]?.find((p) => p.slug === itemSlug);
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
