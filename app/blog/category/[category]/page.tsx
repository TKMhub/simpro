import { BlogGrid } from "@/app/components/blog/BlogGrid";
import { HeaderBlog } from "@/app/components/HeaderBlog";
import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";
import { notFound } from "next/navigation";

interface Params {
  params: {
    category: string;
  };
}
export const dynamic = "force-dynamic";
export default async function CategoryPage({ params }: Params) {
  const allPosts: BlogPost[] = await getPublishedArticles();
  const category = decodeURIComponent(params.category);
  console.log("カテゴリ:", category);

  const filtered = allPosts.filter((post) => post.category === category);

  console.log("filtered");
  console.log(filtered);

  if (filtered.length === 0) {
    notFound(); // 404返す
  }

  const blogs = filtered.map((post) => ({
    title: post.title,
    category: post.category,
    date: post.publishedAt,
    author: post.author,
    imageUrl: undefined,
    tags: post.tags,
  }));

  return (
    <>
      <HeaderBlog />
      <main className="container mx-auto pt-40 px-4">
        <h1 className="text-2xl mb-4">カテゴリ: {category}</h1>
        <BlogGrid blogs={blogs} />
      </main>
    </>
  );
}
