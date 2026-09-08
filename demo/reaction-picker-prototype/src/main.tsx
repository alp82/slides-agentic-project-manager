// Throwaway POC: compare Studio, Spotlight, and Compact at ?variant=A|B|C.
// Question: which layout makes finding, previewing, and copying a reaction clearest on stage?
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import emojiData from "@emoji-mart/data/sets/15/native.json";
import { GifPicker, Theme, type Gif } from "gif-picker-react";
import { Giphy, ContentRating } from "gif-picker-react/providers/giphy";
import { Klipy, ContentFilter } from "gif-picker-react/providers/klipy";
import "./style.css";

type Emoji = {
  id: string;
  name: string;
  keywords: string[];
  skins: { native: string }[];
};
type Reaction =
  | { kind: "emoji"; id: string; text: string; name: string }
  | { kind: "gif"; id: string; gif: Gif; name: string };
type Variant = "A" | "B" | "C";
const emojis = Object.values(emojiData.emojis) as Emoji[];
const categories = emojiData.categories as { id: string; emojis: string[] }[];
const categoryNames: Record<string, string> = {
  people: "Faces & people",
  nature: "Nature",
  foods: "Food",
  activity: "Activity",
  places: "Places",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
};
const favorites = [
  "melting_face",
  "eyes",
  "fire",
  "partying_face",
  "rocket",
  "clap",
  "joy",
  "heart",
  "thinking_face",
  "exploding_head",
  "100",
  "sparkles",
  "saluting_face",
  "upside_down_face",
  "skull",
  "muscle",
  "pray",
  "sunglasses",
  "sob",
  "raised_hands",
  "brain",
  "coffee",
  "tada",
  "nerd_face",
];
const emojiById = new Map(emojis.map((emoji) => [emoji.id, emoji]));
const variantNames = { A: "Studio", B: "Spotlight", C: "Compact" };
const configuredProvider =
  import.meta.env.VITE_GIF_PROVIDER?.toLowerCase() || "giphy";
const apiKey = import.meta.env.VITE_GIF_API_KEY?.trim();
const provider = !apiKey
  ? null
  : configuredProvider === "giphy"
    ? Giphy(apiKey, { rating: ContentRating.G })
    : configuredProvider === "klipy"
      ? Klipy(apiKey, { contentFilter: ContentFilter.HIGH, showBranding: true })
      : null;
const branding = provider?.getAttribution?.().branding;

function readVariant(): Variant {
  const value = new URLSearchParams(location.search).get("variant");
  return value === "B" || value === "C" ? value : "A";
}

function EmojiBrowser({
  onSelect,
}: {
  onSelect: (reaction: Reaction) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("favorites");
  const [skin, setSkin] = useState(0);
  const matching = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length)
      return emojis.filter((emoji) => {
        const terms =
          `${emoji.name} ${emoji.id.replaceAll("_", " ")} ${emoji.keywords.join(" ")} ${emoji.skins.map((s) => s.native).join(" ")}`.toLowerCase();
        return words.every((word) => terms.includes(word));
      });
    const ids =
      category === "favorites"
        ? favorites
        : categories.find((item) => item.id === category)?.emojis || [];
    return ids.flatMap((id) => emojiById.get(id) || []);
  }, [query, category]);
  return (
    <div className="emoji-browser">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Search emoji"
          placeholder="Search a feeling, thing, or emoji…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            ×
          </button>
        )}
      </label>
      <div className="filter-row">
        <label className="sr-only" htmlFor="category">
          Emoji category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setQuery("");
          }}
        >
          <option value="favorites">Good reactions</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {categoryNames[item.id] || item.id}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="skin">
          Skin tone
        </label>
        <select
          id="skin"
          value={skin}
          onChange={(event) => setSkin(Number(event.target.value))}
        >
          {[
            "Default",
            "Light",
            "Medium-light",
            "Medium",
            "Medium-dark",
            "Dark",
          ].map((name, i) => (
            <option value={i} key={name}>
              {name} tone
            </option>
          ))}
        </select>
      </div>
      <div className="emoji-grid" aria-label="Emoji results">
        {matching.map((emoji) => {
          const text = (emoji.skins[skin] || emoji.skins[0]).native;
          return (
            <button
              className="emoji-tile"
              key={emoji.id}
              title={emoji.name}
              aria-label={emoji.name}
              onClick={() =>
                onSelect({ kind: "emoji", id: text, text, name: emoji.name })
              }
            >
              {text}
            </button>
          );
        })}
        {!matching.length && (
          <p className="empty-result">
            No reactions found. Try “happy”, “rocket”, or “coffee”.
          </p>
        )}
      </div>
      <p className="browser-note">
        {matching.length} reactions · pick one that says it all
      </p>
    </div>
  );
}

function GifBrowser({
  onSelect,
  onEmoji,
}: {
  onSelect: (reaction: Reaction) => void;
  onEmoji: () => void;
}) {
  if (!provider)
    return (
      <div className="gif-empty">
        <div className="stacked-reactions" aria-hidden="true">
          <span>🎬</span>
          <span>🍿</span>
        </div>
        <h3>Bring on the GIFs.</h3>
        <p>
          {apiKey
            ? "The GIF provider is not configured correctly."
            : "GIF search isn’t connected yet."}{" "}
          Emoji are ready to go.
        </p>
        <button className="secondary" onClick={onEmoji}>
          Explore emoji <span aria-hidden="true">↗</span>
        </button>
      </div>
    );
  return (
    <div className="gif-browser">
      <GifPicker
        provider={provider}
        theme={Theme.DARK}
        width="100%"
        height={400}
        autoFocusSearch={false}
        onGifClick={(gif) =>
          onSelect({
            kind: "gif",
            id: `${gif.provider}:${gif.id}`,
            gif,
            name: gif.description || "Your reaction",
          })
        }
      />
    </div>
  );
}

function SourceCredit({ gif }: { gif: Gif }) {
  const raw = gif.raw as {
    user?: { display_name?: string; username?: string; profile_url?: string };
    source_post_url?: string;
    source?: string;
  } | null;
  const source = raw?.user?.profile_url || raw?.source_post_url || raw?.source;
  const sourceUrl = source && /^https?:\/\//i.test(source) ? source : null;
  return (
    <div className="source-credit">
      {branding && (
        <a href={branding.href} target="_blank" rel="noreferrer">
          <img
            src={branding.logoDark || branding.logo}
            alt={branding.alt || `Powered by ${gif.provider}`}
          />
        </a>
      )}
      {sourceUrl && (
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          {raw?.user?.display_name || raw?.user?.username || "Original source"}{" "}
          ↗
        </a>
      )}
    </div>
  );
}

function Preview({ selected }: { selected: Reaction }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => {
    setCopyStatus("");
    setImageFailed(false);
  }, [selected]);
  const value =
    selected.kind === "emoji" ? selected.text : selected.gif.imageUrl;
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("Copied! Ready for your next conversation.");
    } catch {
      setCopyStatus("Clipboard unavailable. Select and copy the text below.");
    }
  }
  return (
    <section
      className={`preview panel ${selected.kind === "gif" ? "gif-preview" : ""}`}
      aria-label="Selected reaction"
    >
      <div className="panel-heading">
        <span className="eyebrow">YOUR REACTION</span>
        <span className="live-dot">
          {selected.kind === "emoji" ? "Emoji" : "GIF"}
        </span>
      </div>
      <div className="reaction-stage" key={selected.id}>
        {selected.kind === "emoji" ? (
          <span className="hero-emoji" role="img" aria-label={selected.name}>
            {selected.text}
          </span>
        ) : imageFailed ? (
          <p>That GIF couldn’t load. Try another reaction.</p>
        ) : (
          <img
            className="hero-gif"
            src={selected.gif.imageUrl}
            alt={selected.name}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="preview-bottom">
        <h2>{selected.name}</h2>
        {selected.kind === "gif" && <SourceCredit gif={selected.gif} />}
        <button className="copy-button" onClick={copy}>
          Copy {selected.kind === "emoji" ? "emoji" : "GIF link"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="copy-status" role="status">
          {copyStatus || "A little reaction. A lot less typing."}
        </p>
        {copyStatus.startsWith("Clipboard unavailable") && (
          <input
            className="manual-copy"
            aria-label="Reaction to copy manually"
            readOnly
            value={value}
            onFocus={(event) => event.target.select()}
          />
        )}
      </div>
    </section>
  );
}

function Studio({
  picker,
  preview,
  recent,
}: {
  picker: ReactNode;
  preview: ReactNode;
  recent: ReactNode;
}) {
  return (
    <>
      <div className="studio-layout">
        {picker}
        {preview}
      </div>
      {recent}
    </>
  );
}
function Spotlight({
  picker,
  preview,
  recent,
}: {
  picker: ReactNode;
  preview: ReactNode;
  recent: ReactNode;
}) {
  return (
    <div className="spotlight-layout">
      {preview}
      {recent}
      {picker}
    </div>
  );
}
function Compact({
  picker,
  preview,
  recent,
}: {
  picker: ReactNode;
  preview: ReactNode;
  recent: ReactNode;
}) {
  return (
    <div className="compact-layout">
      <div className="conversation">
        <span className="eyebrow">THE GROUP CHAT</span>
        <div className="chat-message">
          <span className="avatar">J</span>
          <p>
            <strong>Jamie</strong>It finally works on someone else’s machine.
          </p>
        </div>
        {preview}
      </div>
      <aside>
        {picker}
        {recent}
      </aside>
    </div>
  );
}

function App() {
  const [variant, setVariant] = useState<Variant>(readVariant);
  const [tab, setTab] = useState<"emoji" | "gif">("emoji");
  const [selected, setSelected] = useState<Reaction>({
    kind: "emoji",
    id: "🫠",
    text: "🫠",
    name: "Melting Face",
  });
  // Keep only emoji in recents: no GIF media/URL caching or persistent user data.
  const [recent, setRecent] = useState<Extract<Reaction, { kind: "emoji" }>[]>(
    [],
  );
  function choose(reaction: Reaction) {
    setSelected(reaction);
    if (reaction.kind === "emoji")
      setRecent((items) =>
        [reaction, ...items.filter((item) => item.id !== reaction.id)].slice(
          0,
          8,
        ),
      );
  }
  function changeVariant(next: Variant) {
    const url = new URL(location.href);
    url.searchParams.set("variant", next);
    history.replaceState(null, "", url);
    setVariant(next);
  }
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    function keydown(event: KeyboardEvent) {
      if (
        (event.target as HTMLElement)?.closest(
          'input, textarea, select, [contenteditable], [role="tablist"]',
        )
      )
        return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const keys: Variant[] = ["A", "B", "C"];
      changeVariant(
        keys[
          (keys.indexOf(variant) + (event.key === "ArrowRight" ? 1 : 2)) % 3
        ],
      );
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [variant]);
  useEffect(() => {
    if (import.meta.env.DEV)
      console.debug("Reaction POC state", {
        variant,
        tab,
        selected: { id: selected.id, kind: selected.kind, name: selected.name },
        recent: recent.map((item) => item.text),
        provider: provider ? configuredProvider : "disconnected",
      });
  }, [variant, tab, selected, recent]);
  const picker = (
    <section className="picker panel" aria-label="Find a reaction">
      <div className="panel-heading">
        <span className="eyebrow">FIND YOUR FEELING</span>
        <span className="tiny-star" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="tabs" aria-label="Reaction type">
        <button aria-pressed={tab === "emoji"} onClick={() => setTab("emoji")}>
          Emoji <span>☺</span>
        </button>
        <button aria-pressed={tab === "gif"} onClick={() => setTab("gif")}>
          GIFs <span>▷</span>
        </button>
      </div>
      {tab === "emoji" ? (
        <EmojiBrowser onSelect={choose} />
      ) : (
        <GifBrowser onSelect={choose} onEmoji={() => setTab("emoji")} />
      )}
    </section>
  );
  const recentView = (
    <section className="recent" aria-label="Recent emoji">
      <span className="eyebrow">RECENT EMOJI</span>
      <div>
        {recent.length ? (
          recent.map((item) => (
            <button
              key={item.id}
              aria-label={`Use ${item.name} again`}
              onClick={() => choose(item)}
            >
              {item.text}
            </button>
          ))
        ) : (
          <p>Your latest picks will land here.</p>
        )}
      </div>
      {recent.length > 0 && (
        <button className="text-button" onClick={() => setRecent([])}>
          Clear
        </button>
      )}
    </section>
  );
  const layoutProps = {
    picker,
    preview: <Preview selected={selected} />,
    recent: recentView,
  };
  return (
    <div className={`app variant-${variant}`}>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Reaction room home">
          <span className="brand-icon" aria-hidden="true">
            r.
          </span>
          reaction room
        </a>
        <span className="header-note">LESS TYPING. MORE FEELING.</span>
      </header>
      <main>
        <div className="intro">
          <div>
            <p className="eyebrow intro-kicker">
              <span aria-hidden="true">✦</span> FOR ALL YOUR PLOT TWISTS
            </p>
            <h1>
              There’s a reaction
              <br />
              for <em>that.</em>
            </h1>
          </div>
          <p>
            Big feelings. Tiny messages.
            <br />
            Find it, copy it, send it.
          </p>
        </div>
        {variant === "A" ? (
          <Studio {...layoutProps} />
        ) : variant === "B" ? (
          <Spotlight {...layoutProps} />
        ) : (
          <Compact {...layoutProps} />
        )}
      </main>
      <footer>
        <span>Made for the moments words don’t quite cover.</span>
        <span>Go on. Overreact a little. ↗</span>
      </footer>
      {import.meta.env.DEV && (
        <nav className="prototype-switcher" aria-label="Prototype layout">
          <button
            aria-label="Previous layout"
            onClick={() =>
              changeVariant(variant === "A" ? "C" : variant === "B" ? "A" : "B")
            }
          >
            ←
          </button>
          <span>
            POC · {variant} / {variantNames[variant]}
          </span>
          <button
            aria-label="Next layout"
            onClick={() =>
              changeVariant(variant === "A" ? "B" : variant === "B" ? "C" : "A")
            }
          >
            →
          </button>
        </nav>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
