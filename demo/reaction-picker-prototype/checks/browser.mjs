// Run with Playwright installed outside the app (see README).
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(
  process.env.PLAYWRIGHT_PACKAGE || import.meta.url,
);
const { chromium, firefox } = require("playwright");
const browserType =
  process.env.CHECK_BROWSER === "firefox" ? firefox : chromium;
const browser = await browserType.launch({
  headless: true,
  ...(process.env.BROWSER_PATH
    ? { executablePath: process.env.BROWSER_PATH }
    : {}),
  args: browserType === chromium ? ["--no-sandbox"] : [],
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  ...(browserType === chromium
    ? { permissions: ["clipboard-read", "clipboard-write"] }
    : {}),
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const requests = [];
const media = "https://fixture.invalid/reaction.gif";
// Two-frame GIF fixture, never shipped as app search data.
const gifBytes = Buffer.from(
  "47494638396101000100800000000000ffffff21ff0b4e45545343415045322e30030100000021f904000a0000002c000000000100010000020244010021f904000a0000002c00000000010001000002024c01003b",
  "hex",
);
const item = (title, id = 1) => ({
  id,
  slug: `fixture-${id}`,
  title,
  type: "gif",
  file: Object.fromEntries(
    ["hd", "md", "sm", "xs"].map((quality) => [
      quality,
      { gif: { url: media, width: 300, height: 200 } },
    ]),
  ),
});
let fail = false;
await page.route("https://fixture.invalid/**", (route) =>
  route.fulfill({ contentType: "image/gif", body: gifBytes }),
);
await page.route("https://api.klipy.com/**", async (route) => {
  const url = new URL(route.request().url());
  requests.push(url);
  if (fail) return route.fulfill({ status: 503 });
  const q = url.searchParams.get("q");
  const requestedPage = Number(url.searchParams.get("page") || 1);
  if (q === "slow") await new Promise((resolve) => setTimeout(resolve, 1200));
  return route.fulfill({
    json: {
      result: true,
      data: {
        data:
          q === "nothing-xyz" || requestedPage > 2
            ? []
            : Array.from({ length: 24 }, (_, i) =>
                item(q || "Trending", i + (requestedPage - 1) * 23),
              ),
        has_next: q !== "nothing-xyz" && requestedPage < 3,
      },
    },
  });
});
try {
  await page.goto(process.env.APP_URL || "http://127.0.0.1:5184");
  await page.locator(".gif").first().waitFor();
  assert.equal(await page.locator(".gif").count(), 24);
  assert.equal(
    await page.evaluate(
      () =>
        document
          .querySelector(".emojis")
          .compareDocumentPosition(
            document.querySelector('[aria-label="GIF results"]'),
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ),
    4,
  );
  fail = true;
  await page.locator(".load-more").scrollIntoViewIfNeeded();
  await page.getByText("GIF search unavailable", { exact: true }).waitFor();
  assert.equal(await page.locator(".gif").count(), 24);
  fail = false;
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".gif").length === 47,
  );
  await page.locator(".load-more").scrollIntoViewIfNeeded();
  await page
    .getByText("You’ve seen them all. Try another search.", { exact: true })
    .waitFor();
  assert.equal(await page.locator(".gif").count(), 47);
  assert.deepEqual(
    requests
      .filter((url) => url.pathname.endsWith("/trending"))
      .map((url) => url.searchParams.get("page")),
    ["1", "2", "2", "3"],
  );
  await page.evaluate(() => scrollTo(0, 0));
  const supports = await page.evaluate(
    () =>
      typeof ClipboardItem !== "undefined" &&
      ClipboardItem.supports("image/gif"),
  );
  console.log(
    "Native image/gif support:",
    supports,
    "browser:",
    browser.version(),
  );
  const search = page.getByRole("textbox", { name: "Search reactions" });
  requests.length = 0;
  await search.fill("roc");
  await search.fill("rock");
  await search.fill("rocket");
  await page
    .getByRole("button", { name: "Copy rocket GIF", exact: true })
    .first()
    .waitFor();
  assert.deepEqual(
    requests
      .filter((url) => url.pathname.endsWith("/search"))
      .map((url) => url.searchParams.get("q")),
    ["rocket"],
  );
  assert.equal(requests[0].searchParams.get("content_filter"), "high");
  await page
    .getByRole("button", { name: "Copy Rocket emoji", exact: true })
    .click();
  await page.getByText("Emoji text copied!", { exact: true }).waitFor();
  if (browserType === chromium)
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      "🚀",
    );
  await page.locator(".gif").first().click();
  await page
    .getByText(supports ? "GIF image copied!" : "GIF URL copied!", {
      exact: true,
    })
    .waitFor();
  if (browserType === chromium && !supports)
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      media,
    );
  await search.fill("slow");
  await page.waitForTimeout(400);
  await search.fill("happy");
  await page
    .getByRole("button", { name: "Copy happy GIF", exact: true })
    .first()
    .waitFor();
  await page.waitForTimeout(1000);
  assert.equal(
    await page
      .getByRole("button", { name: "Copy slow GIF", exact: true })
      .count(),
    0,
  );
  fail = true;
  await search.fill("rocket");
  await page.getByText("GIF search unavailable", { exact: true }).waitFor();
  await page
    .getByRole("button", { name: "Copy Rocket emoji", exact: true })
    .click();
  await page.getByText("Emoji text copied!", { exact: true }).waitFor();
  fail = false;
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await page.locator(".gif").first().waitFor();
  await search.fill("nothing-xyz");
  await page
    .getByText("No GIFs found. Try another search.", { exact: true })
    .waitFor();
  await page.getByText("No matching emoji.", { exact: false }).waitFor();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.locator(".gif").first().waitFor();
  await page.screenshot({
    path: process.env.SCREENSHOT_PATH || "/tmp/reaction-gallery-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  await page.screenshot({
    path: "/tmp/reaction-gallery-mobile.png",
    fullPage: true,
  });
  // Capability simulation verifies the otherwise-unavailable byte path, not OS support.
  await page.evaluate(() => {
    window.originalClipboardItem = ClipboardItem;
    window.originalClipboard = navigator.clipboard;
    window.ClipboardItem = class {
      static supports() {
        return true;
      }
      constructor(data) {
        this.data = data;
      }
    };
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        write: async (items) => {
          const blob = await items[0].data["image/gif"];
          window.copiedBytes = Array.from(
            new Uint8Array(await blob.arrayBuffer()),
          );
        },
        writeText: async (text) => {
          window.copiedText = text;
        },
      },
    });
  });
  await page.locator(".gif").first().click();
  await page.getByText("GIF image copied!", { exact: true }).waitFor();
  assert.deepEqual(await page.evaluate(() => window.copiedBytes), [
    ...gifBytes,
  ]);
  await page.evaluate(() => {
    navigator.clipboard.write = async () => {
      throw Error("Unsupported");
    };
  });
  await page.locator(".gif").first().click();
  await page.getByText("GIF URL copied!", { exact: true }).waitFor();
  assert.equal(await page.evaluate(() => window.copiedText), media);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw Error("Denied");
    };
  });
  await page.locator(".gif").first().click();
  await page.getByRole("textbox", { name: "Copy manually" }).waitFor();
  assert.equal(
    await page.getByRole("textbox", { name: "Copy manually" }).inputValue(),
    media,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: pagination, append retry, deduplication, end of results, emoji-first order, debounce, stale response, emoji copy, GIF copy, failure/retry, empty states, responsive layout, simulated original-byte write and denied-clipboard fallback.",
  );
} finally {
  await browser.close();
}
