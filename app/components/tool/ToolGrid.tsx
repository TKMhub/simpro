"use client";
import { Tool } from "@/types/tool";
import { ToolCard } from "./ToolCard";

type Props = {
  tools: Tool[];
};

export function ToolGrid({ tools }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
