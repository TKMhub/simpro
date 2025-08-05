import Link from "next/link";
import { notFound } from "next/navigation";
import { productDummy } from "@/data/products_dummy";

export default async function ProductTypePage({
  params,
}: {
  params: Promise<{ productType: string }>;
}) {
  const { productType } = await params;
  const categories = productDummy[productType];

  if (!categories) {
    notFound();
  }

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <h1 className="py-4 mt-4 text-2xl font-bold">{productType} カテゴリ</h1>
      <div className="py-2">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categories).map(([category, items]) => (
            <li key={category} className="border rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <p className="text-sm text-gray-600 mb-2">アイテム数: {items.length}</p>
              <Link
                href={`/products/categories/${productType}/${encodeURIComponent(
                  category
                )}`}
                className="text-blue-600 hover:underline"
              >
                詳細を見る
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

