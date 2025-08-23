import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";
import { BlogGrid } from "../components/blog/BlogGrid";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";
import { Breadcrumbs } from "../components/blog/Breadcrumbs";

export default async function HomePage() {
  const allPosts: BlogPost[] = await getPublishedArticles();

  const blogs = allPosts.map((post) => ({
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
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-4 md:px-16 lg:px-20 py-4 mt-8">
      <Script id="breadcrumb-category-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <Breadcrumbs />
      <h1 className="py-4 mt-8 text-2xl text-gray-800">記事一覧</h1>
      <div className="py-2">
        <BlogGrid blogs={blogs} />
      </div>
    </section>
  );
}
