import { BlogGrid } from "@/app/components/blog/BlogGrid";
import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";
import { Breadcrumbs } from "@/app/components/blog/Breadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";
import { NoContents } from "@/app/components/common/NoContents";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const allPosts: BlogPost[] = await getPublishedArticles();

  // params は await 不要
  const raw = params?.category ?? "";
  const category = decodeURIComponent(raw);

  const filtered = allPosts.filter((post) => post.category === category);

  const blogs = filtered.map((post) => ({
    title: post.title,
    category: post.category,
    date: post.publishedAt,
    author: post.author,
    imageUrl: undefined,
    tags: post.tags,
  }));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: category },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-8 md:px-16 lg:px-20 py-4 mt-8">
      <Script id="breadcrumb-category-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <Breadcrumbs category={category} title="" />
      <h1 className="py-4 mt-4 text-2xl text-gray-800">
        記事一覧<span>（{category}）</span>
      </h1>

      {blogs.length === 0 ? (
        <NoContents />
      ) : (
        <div className="py-2">
          <BlogGrid blogs={blogs} />
        </div>
      )}
    </section>
  );
}
