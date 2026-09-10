import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import emojiData from "@emoji-mart/data/sets/15/native.json";
import { type Gif } from "gif-picker-react";
import { Klipy, ContentFilter } from "gif-picker-react/providers/klipy";
import { fetchGifPage } from "./gifs";
import { copyGif } from "./clipboard";
import "./style.css";

const apiKey = import.meta.env.VITE_GIF_API_KEY?.trim();
const provider = apiKey
  ? Klipy(apiKey, { contentFilter: ContentFilter.HIGH, showBranding: true })
  : null;
const branding = provider?.getAttribution?.().branding;
const emojis = Object.values(emojiData.emojis);
const defaults = new Set([
  "joy",
  "heart",
  "fire",
  "clap",
  "rocket",
  "tada",
  "eyes",
  "thinking_face",
]);

function GifTile({
  gif,
  copied,
  onCopy,
}: {
  gif: Gif;
  copied: boolean;
  onCopy: () => void;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [preview, setPreview] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
  } | null>(null);
  function reveal() {
    const rect = button.current!.getBoundingClientRect();
    const ratio =
      image.current?.naturalWidth && image.current.naturalHeight
        ? image.current.naturalWidth / image.current.naturalHeight
        : gif.width / gif.height || 1;
    const maxWidth = window.innerWidth - 32;
    const maxHeight = Math.max(100, window.innerHeight - 100);
    const width = Math.min(
      Math.max(rect.width * 1.12, rect.height * 1.12 * ratio),
      maxWidth,
      maxHeight * ratio,
    );
    const height = width / ratio;
    const left = Math.max(
      16,
      Math.min(
        rect.left + (rect.width - width) / 2,
        window.innerWidth - width - 16,
      ),
    );
    const top = Math.max(
      16,
      Math.min(
        rect.top + (rect.height - height) / 2,
        window.innerHeight - height - 70,
      ),
    );
    setPreview({ width, height, left: left - rect.left, top: top - rect.top });
  }
  return (
    <button
      ref={button}
      className="gif"
      data-preview={!!preview}
      data-copied={copied}
      aria-label={`Copy ${gif.description || "reaction"} GIF`}
      onClick={onCopy}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") reveal();
      }}
      onPointerLeave={() => setPreview(null)}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) reveal();
      }}
      onBlur={() => setPreview(null)}
    >
      <span className="gif-visual" style={preview || undefined}>
        <img
          ref={image}
          src={gif.preview?.imageUrl || gif.imageUrl}
          alt={gif.description || "GIF reaction"}
          loading="lazy"
        />
        <span className="gif-caption">
          <span>{gif.description || "Say it with a GIF"}</span>
          <b aria-hidden="true">{copied ? "Copied!" : "Copy"}</b>
        </span>
      </span>
    </button>
  );
}

function GifGallery({
  query,
  onCopy,
  copiedId,
}: {
  query: string;
  onCopy: (gif: Gif) => void;
  copiedId?: string;
}) {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState("loading");
    const debounce = setTimeout(
      async () => {
        if (!apiKey) {
          setState("error");
          return;
        }
        try {
          const result = await fetchGifPage(
            apiKey,
            query,
            page,
            AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
          );
          if (!active) return;
          setGifs((previous) => [
            ...new Map(
              [...previous, ...result.gifs].map((gif) => [gif.id, gif]),
            ).values(),
          ]);
          setHasNext(result.hasNext);
          setState("ready");
        } catch {
          if (active) setState("error");
        }
      },
      page === 1 ? 300 : 0,
    );
    return () => {
      active = false;
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query, page, retry]);

  useEffect(() => {
    if (state !== "ready" || !hasNext || !sentinel.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setPage((value) => value + 1);
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [state, hasNext, gifs]);

  return (
    <section aria-label="GIF results" aria-busy={state === "loading"}>
      <div className="result-heading">
        <h2>Or say a little more</h2>
        {branding && (
          <a href={branding.href} target="_blank" rel="noreferrer">
            <img className="branding" src={branding.logo} alt={branding.alt} />
          </a>
        )}
      </div>
      {state === "loading" && !gifs.length && (
        <p className="empty" role="status">
          Finding GIFs…
        </p>
      )}
      {state === "error" && (
        <div className="empty">
          <h3>GIF search unavailable</h3>
          <p>Emoji are still ready to go.</p>
          <button
            className="retry"
            onClick={() => setRetry((value) => value + 1)}
          >
            Retry
          </button>
        </div>
      )}
      {gifs.length ? (
        <div className="gifs">
          {gifs.map((gif) => (
            <GifTile
              key={gif.id}
              gif={gif}
              copied={copiedId === gif.id}
              onCopy={() => onCopy(gif)}
            />
          ))}
        </div>
      ) : state === "ready" && !hasNext ? (
        <p className="empty">No GIFs found. Try another search.</p>
      ) : null}
      {(gifs.length > 0 || hasNext) && state !== "error" && (
        <div className="load-more" ref={sentinel}>
          {state === "loading" ? (
            <p role="status">Loading more GIFs…</p>
          ) : hasNext ? (
            <button
              className="retry"
              onClick={() => setPage((value) => value + 1)}
            >
              More GIFs
            </button>
          ) : (
            <p>You’ve seen them all. Try another search.</p>
          )}
        </div>
      )}
    </section>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [manual, setManual] = useState("");
  const copying = useRef(false);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    kind: "gif" | "emoji";
  } | null>(null);
  useEffect(() => {
    if (!confirmation) return;
    const timer = setTimeout(() => {
      setConfirmation(null);
      setFeedback("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [confirmation]);
  const matching = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return emojis
      .filter((emoji) =>
        words.length
          ? words.every((word) =>
              `${emoji.id.replaceAll("_", " ")} ${emoji.name} ${emoji.keywords.join(" ")} ${emoji.skins.map((s) => s.native).join(" ")}`
                .toLowerCase()
                .includes(word),
            )
          : defaults.has(emoji.id),
      )
      .slice(0, 24);
  }, [query]);

  async function copy(value: string, gif?: Gif) {
    if (copying.current) return;
    copying.current = true;
    setConfirmation(null);
    setManual("");
    setFeedback("Copying…");
    try {
      if (gif) {
        setFeedback(await copyGif(value));
        setConfirmation({ id: gif.id, kind: "gif" });
        void Promise.resolve(
          provider?.onClick?.(gif, { searchTerm: query.trim() }),
        ).catch(() => {});
      } else {
        await navigator.clipboard.writeText(value);
        setFeedback("Emoji text copied!");
        setConfirmation({ id: value, kind: "emoji" });
      }
    } catch {
      setFeedback(
        `Clipboard unavailable. Copy the ${gif ? "GIF URL" : "emoji text"} below.`,
      );
      setManual(value);
    } finally {
      copying.current = false;
    }
  }

  return (
    <div className="app">
      <header>
        <a href="/" className="wordmark">
          re:act<span>✳</span>
        </a>
        <p>Emoji and GIF reactions.</p>
      </header>
      <main>
        <section className="intro">
          <p className="kicker">GIFs for every occasion</p>
          <h1>Find a reaction.</h1>
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search reactions"
              placeholder="lets go, sus, disappear, ..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </label>
          <p className="hint">Click a reaction to copy it.</p>
        </section>
        <section className="emojis" aria-label="Emoji results">
          <h2>Keep it simple</h2>
          <div>
            {matching.map((emoji) => (
              <button
                key={emoji.id}
                title={emoji.name}
                data-copied={
                  confirmation?.kind === "emoji" &&
                  confirmation.id === emoji.skins[0].native
                }
                aria-label={`Copy ${emoji.name} emoji`}
                onClick={() => void copy(emoji.skins[0].native)}
              >
                {emoji.skins[0].native}
                {confirmation?.kind === "emoji" &&
                  confirmation.id === emoji.skins[0].native && (
                    <span className="emoji-confirmation">Copied!</span>
                  )}
              </button>
            ))}
          </div>
          {!matching.length && (
            <p>No matching emoji. Try “happy”, “rocket”, or “coffee”.</p>
          )}
        </section>
        <GifGallery
          key={query.trim()}
          query={query.trim()}
          onCopy={(gif) => void copy(gif.imageUrl, gif)}
          copiedId={confirmation?.kind === "gif" ? confirmation.id : undefined}
        />
      </main>
      <div className="feedback">
        <p role="status">{feedback}</p>
        {manual && (
          <input
            aria-label="Copy manually"
            value={manual}
            readOnly
            onFocus={(event) => event.target.select()}
          />
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
