export type Product = {
  title: string;
  category: string;
  description: string;
  date: string;
  imageUrl: string;
  author: string;
  tags: string[];
  slug: string;
  buttonType: "download" | "link" | "";
  buttonUrl: string;
};
