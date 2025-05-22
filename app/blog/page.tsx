import { BlogGrid } from "../components/blog/BlogGrid";
import { CategoryNav } from "../components/blog/CategoryNav";

export default function HomePage() {
  return (
    <>
      <CategoryNav />
      <BlogGrid />
    </>
  );
}
