"use client";
import Link from "next/link";
import Image from "next/image";
import { Tool } from "@/types/tool";
import { tagColors } from "@/lib/utils/tag_color";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="rounded-xl shadow bg-white overflow-hidden hover:shadow-md transition">
      <Link href={`/tool/${tool.slug}`}>
        <Image
          src={tool.imageUrl}
          alt={tool.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4 space-y-2">
        <Link
          href={`/tool/${tool.slug}`}
          className="text-lg font-semibold hover:underline block"
        >
          {tool.title}（{tool.category}）
        </Link>
        <p className="text-sm text-gray-600">{tool.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{tool.date}</span>
          <span>{tool.author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${
                tagColors[tag] || tagColors.default
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <Link
            href={`/tool/${tool.slug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            詳細はこちら
          </Link>
          {tool.buttonType === "download" && tool.buttonUrl ? (
            <a
              href={tool.buttonUrl}
              download
              className="text-sm text-blue-600 hover:underline"
            >
              ダウンロード
            </a>
          ) : null}
          {tool.buttonType === "link" && tool.buttonUrl ? (
            <a
              href={tool.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              外部リンク
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
