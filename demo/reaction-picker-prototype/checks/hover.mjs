import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(
  process.env.PLAYWRIGHT_PACKAGE || import.meta.url,
);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_PATH
    ? { executablePath: process.env.BROWSER_PATH }
    : {}),
  args: ["--no-sandbox"],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1100 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  await page.route("https://fixture.invalid/**", (route) =>
    route.fulfill({
      contentType: "image/svg+xml",
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="500"><rect width="300" height="500" fill="orange"/><circle cx="150" cy="250" r="100" fill="white"/></svg>',
    }),
  );
  await page.route("https://api.klipy.com/**", (route) =>
    route.fulfill({
      json: {
        result: true,
        data: {
          has_next: false,
          data: Array.from({ length: 9 }, (_, i) => ({
            id: i,
            slug: `tile-${i}`,
            title: `Tile ${i}`,
            type: "gif",
            file: {
              md: {
                gif: {
                  url: `https://fixture.invalid/${i}.gif`,
                  width: 300,
                  height: 500,
                },
              },
              sm: {
                gif: {
                  url: `https://fixture.invalid/${i}.gif`,
                  width: 300,
                  height: 500,
                },
              },
            },
          })),
        },
      },
    }),
  );
  await page.goto(process.env.APP_URL || "http://127.0.0.1:5174");
  const tiles = page.locator(".gif");
  await tiles.nth(8).waitFor();
  await page.evaluate(() => scrollTo(0, 400));
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".gif img")].every(
      (img) => img.complete && img.naturalWidth,
    ),
  );
  const original = await tiles.nth(4).boundingBox();
  for (const target of [0, 1, 2, 3, 5, 6, 7, 8]) {
    await page.mouse.move(
      original.x + original.width / 2,
      original.y + original.height / 2,
    );
    await page.waitForFunction(
      () =>
        document.querySelectorAll('.gif[data-preview="true"]').length === 1 &&
        document.querySelectorAll(".gif")[4].dataset.preview === "true",
    );
    await page.waitForTimeout(180);
    const visual = await tiles.nth(4).locator(".gif-visual").boundingBox();
    assert.ok(Math.abs(visual.width / visual.height - 300 / 500) < 0.01);
    assert.deepEqual(await tiles.nth(4).boundingBox(), original);
    const neighbor = await tiles.nth(target).boundingBox();
    const left = Math.max(visual.x, neighbor.x),
      right = Math.min(visual.x + visual.width, neighbor.x + neighbor.width);
    const top = Math.max(visual.y, neighbor.y),
      bottom = Math.min(visual.y + visual.height, neighbor.y + neighbor.height);
    assert.ok(
      right > left && bottom > top,
      `Preview overlaps neighbor ${target}`,
    );
    await page.mouse.move((left + right) / 2, (top + bottom) / 2);
    assert.equal(
      await tiles.nth(target).getAttribute("data-preview"),
      "true",
      `Can enter overlapped neighbor ${target}`,
    );
    assert.equal(await tiles.nth(4).getAttribute("data-preview"), "false");
  }
  await page.mouse.click(
    original.x + original.width / 2,
    original.y + original.height / 2,
  );
  await tiles.nth(4).getByText("Copied!", { exact: true }).waitFor();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "https://fixture.invalid/4.gif",
  );
  await page.screenshot({ path: "/tmp/reaction-hover.png" });
  await page.mouse.move(5, 5);
  assert.equal(await page.locator('.gif[data-preview="true"]').count(), 0);
  console.log(
    "PASS: true aspect ratio, stable grid, all eight overlapped neighbors, click-to-copy and pointer exit.",
  );
} finally {
  await browser.close();
}
