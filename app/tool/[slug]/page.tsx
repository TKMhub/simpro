import { ToolBreadcrumbs } from "@/app/components/tool/ToolBreadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getToolBySlug } from "@/lib/tool";
import { Badge } from "@/components/ui/badge";
import { tagColors } from "@/lib/utils/tag_color";
import { CalendarIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Tools", url: `${baseUrl}/tool` },
    { name: tool.category, url: `${baseUrl}/tool/category/${encodeURIComponent(tool.category)}` },
    { name: tool.title },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="px-20 py-4 mt-8">
      <ToolBreadcrumbs category={tool.category} title={tool.title} />
      <div className="max-w-3xl mx-auto py-12">
        <Script id="breadcrumb-tool-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        <header className="mb-8 border-b pb-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <p>{tool.date}</p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-2 p-3">
              <UserCircleIcon className="w-4 h-4" />
              <span>{tool.author}</span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {tool.tags.map((tag) => (
                <Badge
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${tagColors[tag] || tagColors.default}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>
        <div className="mb-8">
          <Image src={tool.imageUrl} alt={tool.title} width={600} height={400} className="w-full h-64 object-cover" />
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{tool.description}</p>
      </div>
    </div>
  );
}
