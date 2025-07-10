"use client";
import Link from "next/link";
import Image from "next/image";
import { Tool } from "@/types/tool";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="rounded-xl shadow bg-white overflow-hidden">
      <Image
        src={tool.imageUrl}
        alt={tool.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{tool.title}</h3>
        <p className="text-sm text-gray-600">{tool.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{tool.date}</span>
          <span>{tool.author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
        >
          ダウンロード
        </Link>
      </div>
    </div>
  );
}
