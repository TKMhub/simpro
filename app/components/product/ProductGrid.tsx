"use client";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

type Props = {
  tools: Product[];
};

export function ProductGrid({ tools }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ProductCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
