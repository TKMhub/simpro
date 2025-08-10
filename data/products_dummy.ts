export type ProductItem = {
  slug: string;
  title: string;
  description: string;
};

export const productDummy: Record<string, Record<string, ProductItem[]>> = {
  tool: {
    "Webツール": [
      {
        slug: "tool-1",
        title: "Tool 1",
        description: "Webツールのダミー1",
      },
      {
        slug: "tool-2",
        title: "Tool 2",
        description: "Webツールのダミー2",
      },
    ],
    GAS: [
      {
        slug: "gas-1",
        title: "GAS Script",
        description: "GASスクリプトのダミー",
      },
    ],
    "VBA": [
      {
        slug: "vba-1",
        title: "VBA Macro",
        description: "VBAのダミー",
      },
    ],
    "Executable File": [
      {
        slug: "exe-1",
        title: "Executable Utility",
        description: "実行ファイルのダミー",
      },
    ],
  },
  template: {
    "Webサイトテンプレート": [
      {
        slug: "site-1",
        title: "Website Template",
        description: "Webサイトテンプレートのダミー",
      },
    ],
    "Webアプリテンプレート": [
      {
        slug: "app-1",
        title: "App Template",
        description: "Webアプリテンプレートのダミー",
      },
    ],
  },
};
