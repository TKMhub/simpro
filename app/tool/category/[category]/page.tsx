import { ToolGrid } from "@/app/components/tool/ToolGrid";
import { getToolsByCategory } from "@/lib/tool";
import { notFound } from "next/navigation";
import { ToolBreadcrumbs } from "@/app/components/tool/ToolBreadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";

export default async function ToolCategoryPage({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const { category: raw } = await params;
  const category = decodeURIComponent(raw);
  const tools = await getToolsByCategory(category);

  if (tools.length === 0) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Tools", url: `${baseUrl}/tool` },
    { name: category },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-20 py-4 mt-8">
      <Script id="breadcrumb-tool-category-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <ToolBreadcrumbs category={category} title="" />
      <h1 className="py-4 mt-4 text-2xl text-gray-800">
        ツール一覧<span>（{category}）</span>
      </h1>
      <div className="py-2">
        <ToolGrid tools={tools} />
      </div>
    </section>
  );
}
