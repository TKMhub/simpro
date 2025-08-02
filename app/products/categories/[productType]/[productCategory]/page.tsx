import Link from "next/link";
import { notFound } from "next/navigation";
import { productDummy } from "@/data/products_dummy";

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ productType: string; productCategory: string }>;
}) {
  const { productType, productCategory } = await params;
  const decoded = decodeURIComponent(productCategory);
  const items = productDummy[productType]?.[decoded];
  if (!items) {
    notFound();
  }

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <h1 className="py-4 mt-4 text-2xl font-bold">{decoded}</h1>
      <div className="py-2">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="border rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <Link
                href={`/products/categories/${productType}/${encodeURIComponent(
                  decoded
                )}/${item.slug}`}
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
