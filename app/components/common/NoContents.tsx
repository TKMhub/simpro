type NoContents = {
  message?: string;
};

export function NoContents({
  message = "現在、このカテゴリーに表示できる公開記事はありません。",
}: NoContents) {
  return (
    <div
      className="my-5 py-30 px-5 text-sm text-muted-foreground border rounded-lg bg-muted/30 flex items-center justify-center"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
