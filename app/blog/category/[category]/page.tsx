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

export default async function CategoryPage({ params }: Params) {
  const allPosts: BlogPost[] = await getPublishedArticles();
  const category = decodeURIComponent(params.category);

  const filtered = allPosts.filter((post) => post.category === category);

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
        <BlogGrid blogs={blogs} />
      </main>
    </>
  );
}
