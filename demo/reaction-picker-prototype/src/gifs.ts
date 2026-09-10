import type { Gif } from "gif-picker-react";
import type { KlipyItem } from "gif-picker-react/providers/klipy";

// The picker adapter exposes only page one. Use KLIPY's paginated endpoint
// for the gallery, retaining the adapter for branding and share tracking.
export async function fetchGifPage(
  key: string,
  query: string,
  page: number,
  signal: AbortSignal,
) {
  const url = new URL(
    `https://api.klipy.com/api/v1/${encodeURIComponent(key)}/gifs/${query ? "search" : "trending"}`,
  );
  url.search = new URLSearchParams({
    page: String(page),
    per_page: "24",
    format_filter: "gif",
    content_filter: "high",
    ...(query ? { q: query } : {}),
  }).toString();
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error("GIF search unavailable");
  const result = await response.json();
  if (!result.result || !Array.isArray(result.data?.data))
    throw new Error("GIF search unavailable");
  const items: KlipyItem[] = result.data.data;
  const gifs: Gif[] = items.flatMap((item) => {
    if (item.type !== "gif") return [];
    const image =
      item.file?.md?.gif || item.file?.hd?.gif || item.file?.sm?.gif;
    if (!image) return [];
    const preview = item.file?.sm?.gif || image;
    return [
      {
        id: item.slug,
        imageUrl: image.url,
        width: image.width,
        height: image.height,
        description: item.title,
        preview: {
          imageUrl: preview.url,
          width: preview.width,
          height: preview.height,
        },
        provider: "klipy",
        raw: item,
      },
    ];
  });
  return { gifs, hasNext: result.data.has_next === true };
}
