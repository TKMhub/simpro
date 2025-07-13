import { getPublishedTools } from "@/lib/tool";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";
import { ToolBreadcrumbs } from "../components/tool/ToolBreadcrumbs";
import { ToolGrid } from "../components/tool/ToolGrid";

export default async function ToolsPage() {
  const tools = await getPublishedTools();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Tools", url: `${baseUrl}/tool` },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <Script id="breadcrumb-tools-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <ToolBreadcrumbs />
      <h1 className="py-4 mt-8 text-2xl text-gray-800">ツール一覧</h1>
      <div className="py-2">
        <ToolGrid tools={tools} />
      </div>
    </section>
  );
}
