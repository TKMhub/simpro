import { ToolForm } from "@/app/components/tool/ToolForm";

export default function ToolNewPage() {
  return (
    <section className="px-20 py-4 mt-8">
      <h1 className="text-2xl font-bold">新規コンテンツ作成</h1>
      <ToolForm />
    </section>
  );
}
