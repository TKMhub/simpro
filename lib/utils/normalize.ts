// lib/utils/normalize.ts
export function normalizeTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}
