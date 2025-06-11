import { BlockObjectResponse } from "@notionhq/client";
import Image from "next/image";

export function renderBlock(block: BlockObjectResponse) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>{block.paragraph.rich_text.map((t) => t.plain_text).join("")}</p>
      );

    case "heading_1":
      return (
        <h1>{block.heading_1.rich_text.map((t) => t.plain_text).join("")}</h1>
      );

    case "heading_2":
      return (
        <h2>{block.heading_2.rich_text.map((t) => t.plain_text).join("")}</h2>
      );

    case "heading_3":
      return (
        <h3>{block.heading_3.rich_text.map((t) => t.plain_text).join("")}</h3>
      );

    case "bulleted_list_item":
      return (
        <li>
          {block.bulleted_list_item.rich_text.map((t) => t.plain_text).join("")}
        </li>
      );

    case "numbered_list_item":
      return (
        <li>
          {block.numbered_list_item.rich_text.map((t) => t.plain_text).join("")}
        </li>
      );

    case "code":
      return (
        <pre>
          <code>{block.code.rich_text.map((t) => t.plain_text).join("")}</code>
        </pre>
      );

    case "image":
      const url =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      return (
        <Image
          src={url}
          alt="Notion image"
          width={800}
          height={400}
          className="w-full my-4"
          style={{ objectFit: "contain" }}
        />
      );

    default:
      return (
        <p className="text-sm text-gray-400">
          未対応のブロック（{block.type}）
        </p>
      );
  }
}
