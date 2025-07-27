import type { Metadata } from "next";
import { HeaderProduct } from "../components/HeaderProduct";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Products",
  description: "Product distribution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderProduct />
      <main className="flex-grow mt-[130px]">{children}</main>
      <Footer />
    </div>
  );
}
