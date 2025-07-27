import type { Metadata } from "next";
import { HeaderProduct } from "../components/HeaderProduct";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Products",
  description: "Product distribution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderProduct />
      <main className="mt-[130px]">{children}</main>
      <Footer />
    </div>
  );
}
