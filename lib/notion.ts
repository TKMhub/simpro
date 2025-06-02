import { BlogPost } from "@/types/blog";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPublishedArticles(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "isPublished",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "publishedAt",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    const title = page.properties.title?.title?.[0]?.plain_text ?? "No title";
    return {
      id: page.id,
      title,
      slug: page.properties.slug?.rich_text?.[0]?.plain_text ?? "",
      category: page.properties.category?.select?.name ?? "Uncategorized",
      tags: page.properties.tags?.multi_select?.map((t: any) => t.name) ?? [],
      author: page.properties.author?.rich_text?.[0]?.plain_text ?? "anonymous",
      publishedAt: page.properties.publishedAt?.date?.start ?? "",
    };
  });
}

// 子ページの title に一致する Notion ページの本文を取得
// export async function getPageContentByTitle(title: string) {
//   const parentPageId = process.env.NOTION_PARENT_PAGE_ID!;

//   // 親ページ配下のブロックを取得し、タイトル一致の子ページを探す
//   const children = await notion.blocks.children.list({
//     block_id: parentPageId,
//   });

//   const matchingPage = children.results.find((block) => {
//     return (
//       isFullBlockObject(block) &&
//       block.type === "child_page" &&
//       block.child_page?.title === title
//     );
//   });

//   if (!matchingPage || !("id" in matchingPage)) {
//     throw new Error(`No matching child page found for title: ${title}`);
//   }

//   const pageId = matchingPage.id;

//   // 該当ページの本文（ブロック）を取得
//   const blocks = await notion.blocks.children.list({ block_id: pageId });

//   return blocks.results.filter(isFullBlockObject);
// }

// function isFullBlockObject(
//   block: BlockObjectResponse | { [key: string]: any }
// ): block is BlockObjectResponse {
//   return block && "type" in block;
// }

export async function getPageContentByTitle(
  title: string
): Promise<BlockObjectResponse[]> {
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID!;
  const children = await notion.blocks.children.list({
    block_id: parentPageId,
  });

  const match = children.results.find(
    (b) =>
      "type" in b &&
      b.type === "child_page" &&
      (b as any).child_page.title === title
  );

  if (!match) throw new Error("該当する記事ページが見つかりません");

  const content = await notion.blocks.children.list({
    block_id: match.id,
  });

  return content.results as BlockObjectResponse[];
}
