import { ProductForm } from "@/app/components/product/ProductForm";

export default function NewProductPage() {
  return (
    <section className="px-8 md:px-16 lg:px-20 py-4 mt-8">
      <h1 className="py-4 mt-4 text-xl font-bold">プロダクト登録</h1>
      <ProductForm />
    </section>
  );
}
