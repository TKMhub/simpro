import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Product distribution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mt-6">{children}</main>
    </div>
  );
}
