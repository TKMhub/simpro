import { BlogPost } from "@/types/blog";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function isFullBlockObject(block: unknown): block is BlockObjectResponse {
  return !!block && typeof block === "object" && "type" in block;
}

export async function getPublishedArticles(): Promise<BlogPost[]> {
  const parentId = process.env.NOTION_PARENT_PAGE_ID!;

  const children = await notion.blocks.children.list({ block_id: parentId });

  const pages = children.results.filter(
    (b): b is BlockObjectResponse =>
      isFullBlockObject(b) && b.type === "child_page"
  );

  const articles = await Promise.all(
    pages.map(async (page): Promise<BlogPost | null> => {
      const blocks = await notion.blocks.children.list({ block_id: page.id });
      console.log(
        `🔍 Page ID ${page.id} blocks:`,
        blocks.results.map((b) => (isFullBlockObject(b) ? b.type : "unknown"))
      );
      const headerDb = blocks.results.find(
        (b): b is BlockObjectResponse =>
          isFullBlockObject(b) && b.type === "child_database"
      );

      if (!headerDb) return null;

      const meta: QueryDatabaseResponse = await notion.databases.query({
        database_id: headerDb.id,
      });

      const row = meta.results[0] as any;
      if (!row?.properties || !row.properties.IsPublished?.checkbox)
        return null;

      return {
        id: page.id,
        title: row.properties.Title.title[0]?.plain_text ?? "(No Title)",
        slug: row.properties.Slug.rich_text[0]?.plain_text ?? "",
        category: row.properties.Category?.select?.name ?? "Uncategorized",
        tags: row.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        publishedAt: row.properties.PublishedAt?.date?.start ?? "",
      };
    })
  );

  return articles.filter((a): a is BlogPost => a !== null);
}
