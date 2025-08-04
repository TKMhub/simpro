export type NavItem = {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
};

export const navigation: NavItem[] = [
  { title: "サービス", href: "/#services" },
  { title: "実績", href: "/#projects" },
  { title: "お問い合わせ", href: "/#contact" },
  {
    title: "Blog",
    href: "/blog",
    children: [
      { title: "Skill", href: "/blog/category/Skill" },
      { title: "Book", href: "/blog/category/Book" },
      { title: "Job", href: "/blog/category/Job" },
      { title: "Life", href: "/blog/category/Life" },
      { title: "Design", href: "/blog/category/Design" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "Tool", href: "/products/categories/tool" },
      { title: "Template", href: "/products/categories/template" },
    ],
  },
];
