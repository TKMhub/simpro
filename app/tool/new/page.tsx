import { ToolForm } from "@/app/components/tool/ToolForm";

export default function NewToolPage() {
  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">ツール登録</h1>
      <ToolForm />
    </section>
  );
}
