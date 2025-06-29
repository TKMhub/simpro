import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-neutral-800  text-white text-sm ">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10 space-x-52">
          {/* ロゴと社名 */}
          <div className="space-y-4">
            <p className="text-gray-400 text-5xl">Simpro</p>
          </div>

          {/* カテゴリ群 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols- gap-2 flex-1">
            {[
              {
                title: "主なカテゴリ",
                items: [
                  "業務自動化",
                  "システム開発",
                  "個人開発",
                  "キャリア構築",
                  "デザイン",
                ],
              },
              {
                title: "トピック",
                items: ["ChatGPT", "VBA", "Next.js", "Supabase", "Notion"],
              },
              {
                title: "使用技術",
                items: [
                  "Next.js",
                  "Supabase",
                  "TypeScript",
                  "Tailwind CSS",
                  "Shadcn UI",
                  "Prisma",
                  "Notion",
                  // "Stripe",
                ],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-2 text-white">{col.title}</h4>
                <ul className="space-y-1 text-gray-400">
                  {col.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 下部のソーシャルリンク */}
        <div className="flex justify-between items-center border-t border-gray-700 mt-10 pt-6 text-xs text-gray-400">
          <p>© Simpro - All rights reserved.</p>
          <div className="flex gap-4">
            {/* <Facebook size={16} /> */}
            <FaInstagram size={20} className="hover:text-white transition" />
            <FaXTwitter size={20} className="hover:text-white transition" />
            <FaYoutube size={20} className="hover:text-white transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}
