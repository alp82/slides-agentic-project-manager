// Throwaway visual comparison on /visual-prototype.html?variant=A|B|C.
// Question: gallery, filmstrip, or collage for a GIF-first picker on a projector?
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './visual-prototype.css';

type Variant = 'A' | 'B' | 'C';
const names = { A: 'Gallery', B: 'Filmstrip', C: 'Collage' };
const samples = [
  { id: '3o7abKhOpu0NwenH3O', label: 'Yes!', emoji: '🙌' },
  { id: '111ebonMs90YLu', label: 'Excellent', emoji: '👍' },
  { id: 'l0MYt5jPR6QX5pnqM', label: 'Celebrate', emoji: '🎉' },
  { id: '26ufdipQqU2lhNA4g', label: 'Mind blown', emoji: '🤩' },
  { id: 'Is1O1TWV0LEJi', label: 'Happy dance', emoji: '💃' },
  { id: '10UeedrT5MIfPG', label: 'Amazing', emoji: '✨' },
];
const readVariant = (): Variant => {
  const value = new URLSearchParams(location.search).get('variant');
  return value === 'B' || value === 'C' ? value : 'A';
};
function App() {
  const [variant, setVariant] = useState<Variant>(readVariant);
  const [query, setQuery] = useState('excited');
  const [settledQuery, setSettledQuery] = useState(query);
  const [copied, setCopied] = useState('');
  useEffect(() => { const timer = setTimeout(() => setSettledQuery(query), 300); return () => clearTimeout(timer); }, [query]);
  const changeVariant = (value: Variant) => {
    setVariant(value);
    const url = new URL(location.href); url.searchParams.set('variant', value);
    history.replaceState({}, '', url);
  };
  const cycle = (step: number) => changeVariant((['A', 'B', 'C'] as Variant[])[(['A', 'B', 'C'].indexOf(variant) + step + 3) % 3]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.closest('input, textarea, [contenteditable]')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); cycle(event.key === 'ArrowLeft' ? -1 : 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant]);
  async function copy(value: string, kind: string) {
    try { await navigator.clipboard.writeText(value); setCopied(`${kind} copied!`); }
    catch { setCopied('Clipboard unavailable in this browser.'); }
  }
  const gifs = <section className="vp-gifs" aria-label="GIF results">{samples.map((sample, i) => <button className={`vp-gif tile-${i}`} key={sample.id} onClick={() => copy(`https://media.giphy.com/media/${sample.id}/giphy.gif`, 'GIF URL')} aria-label={`Copy ${sample.label} GIF URL`}>
    <img src={`https://media.giphy.com/media/${sample.id}/giphy.gif`} alt={sample.label} />
    <span>{sample.label}<b aria-hidden="true">↗</b></span>
  </button>)}</section>;
  const emojis = <aside className="vp-emojis"><h2>Or keep it simple</h2><div>{samples.map(sample => <button key={sample.id} onClick={() => copy(sample.emoji, 'Emoji text')} aria-label={`Copy ${sample.emoji}`}>{sample.emoji}</button>)}</div></aside>;
  return <div className={`vp variant-${variant}`}>
    <header><a href="/visual-prototype.html">re:act<span>✳</span></a><p>A little feeling. A big reaction.</p></header>
    <main>
      <section className="vp-intro"><p className="vp-kicker">FIND YOUR FEELING</p><h1>{variant === 'A' ? <>Less typing.<br/><em>More feeling.</em></> : variant === 'B' ? <>Let the GIF do the talking.</> : <>Big mood.<span>✷</span></>}</h1>
        <label className="vp-search"><span aria-hidden="true">⌕</span><input aria-label="Search reactions" value={query} onChange={event => setQuery(event.target.value)} placeholder="How are you feeling?"/></label>
        <p className="vp-hint">Click a reaction to copy it.</p>
      </section>
      <div className="vp-results"><div className="vp-result-heading"><h2>GIFs for “{settledQuery || 'anything'}”</h2><span>Sample set · <a href="https://giphy.com/" target="_blank" rel="noreferrer">GIPHY</a></span></div>
        <div className="vp-result-layout">{gifs}{emojis}</div>
      </div>
      <p className="vp-toast" role="status">{copied}</p>
    </main>
    {import.meta.env.DEV && <nav className="vp-switcher" aria-label="Visual prototype variants"><button aria-label="Previous variant" onClick={() => cycle(-1)}>←</button><div><strong>{variant} · {names[variant]}</strong><small>Visual prototype · fixed sample GIFs · URL copy only</small></div><button aria-label="Next variant" onClick={() => cycle(1)}>→</button></nav>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<App />);
