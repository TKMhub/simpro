import Link from "next/link";
import { notFound } from "next/navigation";
import { productDummy } from "@/data/products_dummy";

export default function ProductCategoryPage({
  params,
}: {
  params: { type: string; category: string };
}) {
  const { type, category } = params;
  const decoded = decodeURIComponent(category);
  const items = productDummy[type]?.[decoded];
  if (!items) {
    notFound();
  }

  return (
    <section className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{decoded}</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="border rounded-md p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <Link
              href={`/products/${type}/${encodeURIComponent(decoded)}/${item.slug}`}
              className="text-blue-600 hover:underline"
            >
              詳細を見る
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
