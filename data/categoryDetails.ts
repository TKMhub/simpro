export type CategoryDetail = {
  description: string;
  image: string;
};

export const categoryDetails: Record<string, Record<string, CategoryDetail>> = {
  tool: {
    "Executable File": {
      description: "OS上で直接実行できる便利なツールをまとめています。",
      image: "/Simplo_gray_main_sub.jpg",
    },
  },
  template: {
    "Webテンプレート": {
      description: "ウェブサイト制作に役立つテンプレート集です。",
      image: "/Simplo_gray_main_sub.jpg",
    },
  },
};
