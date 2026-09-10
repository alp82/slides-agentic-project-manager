import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// The runbook is the single source of prompt wording.
const source = readFileSync(new URL('../docs/demo/runbook.md', import.meta.url), 'utf8');
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const prompts = [...source.matchAll(/### ([^\n]+)\n\n```text\n([\s\S]*?)\n```/g)];
if (prompts.length !== 5) throw new Error('Expected five demo prompts in the runbook');
const cards = prompts.map(([, title, prompt]) => `<section><h2>${escape(title)}</h2><textarea aria-label="${escape(title)}" rows="5">${escape(prompt)}</textarea><button type="button">Copy prompt</button><span role="status"></span></section>`).join('\n');
const html = `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Wayfinder presenter prompts</title>
<style>body{max-width:850px;margin:40px auto;padding:0 24px;background:#faf5eb;color:#242623;font:18px/1.5 system-ui}a{color:#bb431c}nav{display:flex;flex-wrap:wrap;gap:20px}section{margin:32px 0;border-top:1px solid #d8d0c1}textarea{display:block;box-sizing:border-box;width:100%;font:16px/1.5 monospace;padding:14px;background:white;color:#242623}button{margin:12px 12px 0 0;padding:10px 18px;background:#242623;color:white;border:0;border-radius:6px;cursor:pointer}span{font-size:14px}</style>
<h1>Presenter prompts</h1><p>Start a fresh Claude session for each step. Edit the map number, ticket title, or audience change before copying. Use the map created by Chart; the starter has no pre-created map.</p>
<nav><a href="/presenter/1">Presenter deck</a><a href="https://github.com/alp82/reaction-picker-wayfinder-demo/issues" target="_blank" rel="noopener noreferrer">Live tracker ↗</a><a href="http://127.0.0.1:5175" target="_blank" rel="noopener noreferrer">Live app ↗</a><a href="http://127.0.0.1:5174" target="_blank" rel="noopener noreferrer">Prebuilt reference ↗</a></nav>
<p>After Chart, let its research worker finish; do not duplicate it. Complete research and grilling before changing scope. Finish any reopened decision before Prototype. Start Execute after prototype approval, immediately before Q&amp;A.</p>
${cards}
<script>document.querySelectorAll('button').forEach(button=>button.addEventListener('click',async()=>{const field=button.parentElement.querySelector('textarea');const status=button.nextElementSibling;try{await navigator.clipboard.writeText(field.value);status.textContent='Copied';}catch{field.focus();field.select();status.textContent='Press Ctrl+C / Cmd+C to copy the selected prompt';}}));</script></html>`;
mkdirSync(new URL('../public/demo/', import.meta.url), { recursive: true });
writeFileSync(new URL('../public/demo/prompts.html', import.meta.url), html);
console.log('Generated presenter page from five runbook prompts');
