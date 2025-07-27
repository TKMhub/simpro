import { ProductForm } from "@/app/components/product/ProductForm";

export default function NewProductPage() {
  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">プロダクト登録</h1>
      <ProductForm />
    </section>
  );
}
