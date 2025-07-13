import type { Metadata } from "next";
import { HeaderTool } from "../components/HeaderTool";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Tools",
  description: "Tool distribution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderTool />
      <main className="mt-[130px]">{children}</main>
      <Footer />
    </div>
  );
}
