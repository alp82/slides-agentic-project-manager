<script setup>
import { useNav } from '@slidev/client'
defineProps({ kind: { type: String, required: true } })
const nav = useNav()
</script>

<template>
  <article class="insert">
    <div class="grain" />
    <header><span class="brand"><i/> AGENTIC PROJECT MANAGER</span><span>{{String(nav.currentPage.value).padStart(2,'0')}} / {{String(nav.total.value).padStart(2,'0')}}</span></header>

    <main v-if="kind==='author'" class="author">
      <section><span class="kicker">HELLO</span><h1>I'm Alper</h1><p>I build software, experiment with agent workflows, and care about turning useful ideas into systems that actually get finished.</p><div class="facts"><span>KASSEL, GERMANY</span><span>BUILDER</span><a href="https://alperortac.com" target="_blank" rel="noopener noreferrer">ALPERORTAC.COM <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M21 14v7H3V3h7" /></svg></a></div></section>
      <div class="portrait"><img src="/images/alper-ortac.jpg" alt="Alper Ortac"></div>
    </main>

    <main v-else-if="kind==='goal'" class="goal">
      <span class="kicker">THE GOAL OF THIS TALK</span>
      <h1>PLAN &amp; BUILD<br><span>A GIF SEARCH</span><br>APPLICATION</h1>
      <p>From idea to working app.</p>
      <div class="gif-collage" aria-label="Four animated reaction GIFs">
        <figure class="gif-card"><img src="/images/goal/mind-blown.gif" alt="A mind-blown reaction"><figcaption>MIND BLOWN</figcaption></figure>
        <figure class="gif-card"><img src="/images/goal/thinking.gif" alt="A thoughtful reaction"><figcaption>HMM</figcaption></figure>
        <figure class="gif-card"><img src="/images/goal/approved.gif" alt="A thumbs-up reaction"><figcaption>APPROVED</figcaption></figure>
        <figure class="gif-card"><img src="/images/goal/celebrate.gif" alt="Leonardo DiCaprio raising a glass"><figcaption>SHIP IT</figcaption></figure>
      </div>
    </main>

    <main v-else-if="kind==='skills'" class="skills">
      <section><h1>Engineering Skills</h1><p>Matt Pocock publishes small, composable instructions that give coding agents repeatable engineering workflows.</p><code>npx skills@latest add mattpocock/skills</code></section>
      <a href="https://github.com/mattpocock/skills" target="_blank" class="repo"><img src="/images/mattpocock-skills.png" alt="GitHub preview for Matt Pocock's Skills for Real Engineers repository"><span>github.com/mattpocock/skills ↗</span></a>
    </main>

    <main v-else-if="kind==='meta'" class="meta">
      <section><h1>A slide deck about Wayfinder,<br>made with Wayfinder.</h1></section>
      <a class="meta-gif" href="https://giphy.com/gifs/YellowstoneTV-paramountnetwork-yellowstone-yellowstonetv-W0cp0XrvIe6PxFEYAM" target="_blank" rel="noopener noreferrer"><img src="/images/wayfinder-meta.gif" alt="Yellowstone reaction GIF captioned A little meta"><span>YELLOWSTONE / GIPHY ↗</span></a>
    </main>

    <main v-else-if="kind==='resources'" class="resources">
      <h1>Resources</h1>
      <div class="resource-grid">
        <a href="https://github.com/alp82/slides-agentic-project-manager" target="_blank" rel="noopener noreferrer"><strong>This slide deck ↗</strong><p>Slides, speaker notes, and demo setup.</p><span>github.com/alp82/slides-agentic-project-manager</span></a>
        <a href="https://github.com/alp82/reaction-picker-wayfinder-demo" target="_blank" rel="noopener noreferrer"><strong>The demo project ↗</strong><p>The reaction picker and its decision map.</p><span>github.com/alp82/reaction-picker-wayfinder-demo</span></a>
        <a href="https://github.com/mattpocock/skills" target="_blank" rel="noopener noreferrer"><strong>Matt’s skills on GitHub ↗</strong><p>Wayfinder and the other engineering skills.</p><span>github.com/mattpocock/skills</span></a>
        <a href="https://www.aihero.dev/skills-wayfinder" target="_blank" rel="noopener noreferrer"><strong>AI Hero docs ↗</strong><p>How Wayfinder works and when to use it.</p><span>aihero.dev/skills-wayfinder</span></a>
      </div>
    </main>

    <main v-else class="questions">
      <span class="kicker">OVER TO YOU</span><h1>Q&amp;A</h1>
    </main>
  </article>
</template>

<style scoped>
p{font-weight:600;opacity:1!important}

.insert{--paper:#f3efe4;--ink:#172b2a;--muted:#172b2a;--orange:#e0542f;--mint:#b9d8c3;position:absolute;inset:0;overflow:hidden;padding:28px 44px;background:var(--paper);color:var(--ink);font-family:Inter,system-ui,sans-serif}.grain{position:absolute;inset:0;opacity:.16;background-image:radial-gradient(#1b3431 .55px,transparent .7px);background-size:7px 7px;mask-image:linear-gradient(120deg,#000,transparent 72%)}header{display:flex;justify-content:space-between;position:relative;font:700 11px monospace;letter-spacing:1.7px}.brand{display:flex;align-items:center;gap:8px}.brand i{width:9px;height:9px;background:var(--orange);border-radius:50%;box-shadow:0 0 0 4px #e0542f26}.kicker{font:800 10px monospace;letter-spacing:1.5px;color:var(--orange)}h1{margin:12px 0!important;color:var(--ink)!important;font-size:54px!important;line-height:1!important;letter-spacing:-2.7px!important;font-weight:820!important}p{color:var(--muted);font-size:18px;line-height:1.45}.author{display:grid;grid-template-columns:1.25fr .75fr;gap:70px;align-items:center;margin-top:54px}.author section{border-left:8px solid var(--orange);padding-left:28px}.author p{max-width:560px}.portrait{position:relative}.portrait img{display:block;width:270px;height:270px;object-fit:cover;filter:grayscale(.2);box-shadow:12px 12px 0 var(--mint)}.facts{display:flex;gap:9px;margin-top:28px}.facts span,.facts a{padding:7px 10px;background:#e3dfd3;font:800 9px monospace}.facts a{display:inline-flex;align-items:center;gap:5px;color:inherit;text-decoration:none;border-bottom:1px solid currentColor}.facts a svg{width:12px;height:12px}.skills{display:grid;grid-template-columns:1fr 1.1fr;gap:34px;align-items:center;margin-top:34px}.skills h1{font-size:46px!important}.skills p{font-size:16px}.skills code{display:block;padding:12px 14px;background:var(--ink);color:#c4e0cd;font-size:11px}.repo{display:block;border:1px solid var(--ink);background:var(--ink);box-shadow:10px 10px 0 var(--orange);text-decoration:none}.repo img{display:block;width:100%}.repo span{display:block;padding:12px;color:white;font:800 10px monospace}.questions{display:flex;min-height:470px;flex-direction:column;align-items:center;justify-content:center;text-align:center}.questions h1{font-size:100px!important}.questions p{font-size:24px}.questions div{display:flex;align-items:center;gap:14px;margin-top:32px;font:800 10px monospace}.questions i{width:36px;height:2px;background:var(--orange)}
.meta{position:relative;display:grid;grid-template-columns:1.1fr 1fr;gap:42px;align-items:center;margin-top:38px}.meta section{border-left:8px solid var(--orange);padding-left:26px}.meta h1{font-size:43px!important;line-height:1.15!important;letter-spacing:-1.8px!important}.meta-gif{display:block;background:var(--ink);border:2px solid var(--ink);box-shadow:9px 9px 0 var(--orange);text-decoration:none}.meta-gif img{display:block;width:100%;aspect-ratio:1;object-fit:contain}.meta-gif>span{display:block;padding:8px 11px;font:700 9px monospace;letter-spacing:.7px;color:var(--paper)}
.resources{position:relative;margin-top:42px}.resource-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px}.resource-grid>a{display:block;padding:24px 20px;border:1px solid #b9b8ac;border-top:4px solid var(--orange);background:#e9e5d9;color:var(--ink);text-decoration:none}.resource-grid strong{font-size:24px}.resource-grid p{margin:12px 0 20px;font-size:16px}.resource-grid span{font:600 11px monospace;overflow-wrap:anywhere}.resource-grid>a:hover{background:#e0e7dc}
.goal{position:relative;min-height:470px;padding-top:32px}.goal .kicker{font-size:14px;letter-spacing:2px}.goal h1{margin:24px 0!important;font-size:86px!important;line-height:1.08!important;letter-spacing:-4px!important;font-weight:900!important}.goal h1 span{color:var(--orange)}.goal p{margin:0;font-size:25px}
.gif-collage{position:absolute;right:8px;top:50%;width:244px;height:254px;transform:translateY(-50%)}.gif-card{position:absolute;width:126px;margin:0;padding:6px 6px 0;background:#fffdf7;box-shadow:0 3px 6px #172b2a20,0 8px 16px #172b2a26}.gif-card img{display:block;width:114px;height:76px;object-fit:cover;background:var(--mint)}.gif-card figcaption{padding:8px 0 10px;text-align:center;font:800 8px monospace;letter-spacing:1px;color:var(--ink)}.gif-card:nth-child(1){left:0;top:4px;transform:rotate(-10deg);z-index:2}.gif-card:nth-child(2){left:115px;top:0;transform:rotate(7deg);z-index:1}.gif-card:nth-child(3){left:7px;top:144px;transform:rotate(-5deg);z-index:3}.gif-card:nth-child(4){left:117px;top:140px;transform:rotate(11deg);z-index:4}
</style>
