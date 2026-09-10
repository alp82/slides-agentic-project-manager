/** Preserve the original GIF bytes; converting to PNG would lose animation. */
async function gifBlob(url: string): Promise<Blob> {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error("GIF download failed");
  const bytes = await response.arrayBuffer();
  const signature = new TextDecoder().decode(bytes.slice(0, 6));
  if (signature !== "GIF87a" && signature !== "GIF89a")
    throw new Error("Not a GIF");
  return new Blob([bytes], { type: "image/gif" });
}

export async function copyGif(url: string): Promise<string> {
  if (
    typeof ClipboardItem !== "undefined" &&
    ClipboardItem.supports?.("image/gif")
  ) {
    try {
      // Start the clipboard write during the click gesture, with deferred bytes.
      const bytes = gifBlob(url);
      // Some engines reject write before consuming the promised blob.
      void bytes.catch(() => {});
      await navigator.clipboard.write([
        new ClipboardItem({ "image/gif": bytes }),
      ]);
      return "GIF image copied!";
    } catch {
      /* Unsupported write, blocked download, or permission: try URL. */
    }
  }
  await navigator.clipboard.writeText(url);
  return "GIF URL copied!";
}
