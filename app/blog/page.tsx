// app/blog/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";
import { BlogGrid } from "../components/blog/BlogGrid";

export default async function HomePage() {
  const posts: BlogPost[] = await getPublishedArticles();

  // Notion → BlogGrid 用の型に変換（author/日付などは仮）
  const blogs = posts.map((post) => ({
    title: post.title,
    date: post.publishedAt,
    author: post.author,
    imageUrl: undefined,
  }));

  return (
    <>
      <BlogGrid blogs={blogs} />
    </>
  );
}
