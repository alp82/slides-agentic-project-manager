<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
defineProps({ step: { type: Number, required: true } })
const nav = useNav()
const click = computed(() => nav.clicks?.value ?? 0)
const types=[
  ['⌕','Research','Agent-ready','Find facts before choosing a direction.','ASTRA'],
  ['?','Grilling','Human in the loop','Expose assumptions and force a clear choice.','ASTRA'],
  ['◇','Prototype','Human in the loop','Make something concrete enough to react to.','FABLE'],
  ['→','Task','Agent-ready','Carry out a step once the decision is clear.','ASTRA'],
]
</script>

<template>
<article class="story">
  <div class="grain"/>
  <header :class="{ 'cover-header': step===0 }"><span v-if="step!==0" class="brand"><i/> AGENTIC PROJECT MANAGER</span><span>{{String(nav.currentPage.value).padStart(2,'0')}} / {{String(nav.total.value).padStart(2,'0')}}</span></header>
  <main :class="`beat-${step}`">
    <template v-if="step===0">
      <div class="title"><span class="kicker">ONE DECISION AT A TIME</span><h1>Agentic Project Manager</h1><p class="sub">Use <code>/wayfinder</code> to <s>generate code</s> → <strong>drive decisions</strong></p></div>
    </template>

    <template v-else-if="step===1">
      <WayfinderSkill />
    </template>

    <template v-else-if="step===2">
      <h1>The Map</h1><p class="lede">One place to see the destination, current state, and what can move next.</p>
      <MapTerritories />
      <a class="map-link" href="https://github.com/alp82/reaction-picker-wayfinder-demo/issues" target="_blank">OPEN THE LIVE MAP ↗</a>
    </template>

    <template v-else-if="step===3">
      <h1>Four Ticket Types</h1><p class="lede">Some work can run independently. Other work needs your judgment.</p>
      <div class="mode-groups"><div><span>HUMAN IN THE LOOP</span><section v-for="(t,i) in types.filter(x=>x[2]==='Human in the loop')" :key="t[1]" :class="{active: click===i}"><b class="mark">{{t[0]}}</b><h2>{{t[1]}}</h2><p>{{t[3]}}</p><em>{{t[4]}}</em></section></div><div><span>AGENT-READY</span><section v-for="(t,i) in types.filter(x=>x[2]==='Agent-ready')" :key="t[1]" :class="{active: click===i+2}"><b class="mark">{{t[0]}}</b><h2>{{t[1]}}</h2><p>{{t[3]}}</p><em>{{t[4]}}</em></section></div></div>
    </template>

    <template v-else-if="step===4">
      <h1>The Frontier</h1><p class="lede">The agent manages ticket dependencies and keeps the frontier ready.</p>
      <DependencyMap />
    </template>

    <template v-else-if="step===5">
      <h1>Scope changes are normal</h1><p class="lede">Wayfinder keeps the plan in sync: it updates past decisions, creates new tickets, and works out what needs to happen next.</p>
      <div class="diff"><section><span>BEFORE</span><strong>Emoji picker</strong></section><b>↝</b><section class="after"><span>AFTER</span><strong>Let’s decide together</strong><small>What would you change?</small></section></div>
    </template>

    <template v-else-if="step===6">
      <h1>Lifecycle of a map</h1><p class="lede">Finish a map, carry the useful context forward, and chart the next one.</p>
      <div class="life"><section><b>01</b><span>CHECK</span><h2>Read related tickets</h2><p>Gather relevant context for this question.</p></section><i>→</i><section><b>02</b><span>WORK</span><h2>Update the ticket</h2><p>Keep discoveries and changes with the work.</p></section><i>→</i><section><b>03</b><span>RESOLVE</span><h2>Record the resolution</h2><p>Close with answer, rationale, and evidence.</p></section><i>↺</i></div>
      <div class="context"><strong>THE NEXT MAP STARTS INFORMED</strong><span>finished map → preserved decisions → next destination</span></div>
    </template>

    <template v-else-if="step===7">
      <aside class="decision-callout"><span>Matt recommends Wayfinder for planning</span><blockquote cite="https://www.aihero.dev/skills-wayfinder">“A decision map tells you what to build. It does not build it.”</blockquote><cite>— <a href="https://www.aihero.dev/skills-wayfinder" target="_blank" rel="noopener noreferrer">AI Hero: The /wayfinder Skill ↗</a></cite></aside>
      <div class="possibilities">
        <h1>My experience: /wayfinder is<br><em>great for building too</em></h1>
        <p class="intent">Include execution in the scope, and Wayfinder can coordinate the work too—carrying decisions into action.</p>
        <div class="use-list"><b>Research and write a report</b><b>Organize a community event</b><b>Design and build a bookshelf</b><b>Create and rehearse a talk</b><b>Set up a home workshop</b><b>Run a customer research study</b></div>
      </div>
    </template>

    <template v-else-if="step===8">
      <div class="challenges">
        <span class="kicker">CHALLENGE 1 · TOO MANY QUESTIONS</span>
        <h1>The questions can wear you out.</h1>
        <p class="challenge-intro">The agent can spend too long on small details and unlikely scenarios.</p>
        <div class="grilling-content">
          <div class="challenge-tip"><strong>Tell it to keep things simple.</strong><p>Otherwise, grilling sessions with 40+ questions won't be a rarity.</p></div>
          <a class="tweet" href="https://x.com/alperortac/status/2097661439901048852" target="_blank" rel="noopener noreferrer" aria-label="Read Alper Ortac’s post on X">
            <div class="tweet-header"><img src="/images/alper-x-avatar.jpg" alt=""><div><strong>Alper Ortac <svg class="verified" viewBox="0 0 24 24" aria-label="Verified"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="m6 12 4 4 8-8" fill="none" stroke="white" stroke-width="2.5"/></svg></strong><span>@alperortac</span></div><svg class="x-logo" viewBox="0 0 24 24" aria-label="X"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.2-8.5L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z"/></svg></div>
            <blockquote>Pro tip for anyone using /grill-me<br><br>Tell the agent: "fyi, we dont want to overengineer anything here"</blockquote>
            <div class="tweet-date">Sep 9, 2026 · Excerpt</div>
            <div class="tweet-more">Full post on X ↗</div>
          </a>
        </div>
      </div>
    </template>

    <template v-else-if="step===10">
      <div class="challenges">
        <span class="kicker">CHALLENGE 2 · WORKING AT THE SAME TIME</span>
        <h1>Parallel work: Agents can cause conflicts</h1>
        <p class="challenge-intro">Two agents may edit the same files, repeat work, or make conflicting decisions.</p>
        <div class="collision"><b>AGENT A</b><i>↘</i><strong>SAME FILES</strong><i>↙</i><b>AGENT B</b></div>
        <div class="challenge-tip"><strong>Check for overlap before starting.</strong><p>Give each agent separate work. Default to running them one at a time.</p></div>
      </div>
    </template>

    <template v-else>
      <div class="demo"><section><span class="stamp">APPENDIX</span><h1>Prototype That I built</h1></section><div class="preview"><img src="/demo/reaction-picker.png" alt="Completed reaction picker"><div><a href="http://127.0.0.1:5175" target="_blank">LIVE PROTOTYPE ↗</a><a href="http://127.0.0.1:5174" target="_blank">REFERENCE ↗</a></div></div></div>
    </template>
  </main>
</article>
</template>

<style scoped>
p{font-weight:600;opacity:1!important}

.story{--paper:#f3efe4;--ink:#172b2a;--muted:#172b2a;--orange:#e0542f;--mint:#b9d8c3;--line:#b9b8ac;position:absolute;inset:0;overflow:hidden;padding:28px 44px 42px;background:var(--paper);color:var(--ink);font-family:Inter,system-ui,sans-serif}.grain{position:absolute;inset:0;opacity:.16;background-image:radial-gradient(#1b3431 .55px,transparent .7px);background-size:7px 7px;mask-image:linear-gradient(120deg,#000,transparent 72%)}header{display:flex;justify-content:space-between;position:relative;font:700 11px monospace;letter-spacing:1.7px}.brand{display:flex;align-items:center;gap:8px}.brand i{width:9px;height:9px;background:var(--orange);border-radius:50%;box-shadow:0 0 0 4px #e0542f26}.cue{position:relative;margin-top:24px;font:700 10px monospace;letter-spacing:1.4px;color:var(--orange)}main{position:relative;margin-top:12px}h1{margin:0!important;color:var(--ink)!important;font-size:46px!important;line-height:.98!important;letter-spacing:-2.3px!important;font-weight:780!important}h2{margin:0!important;color:var(--ink)!important}.lede{max-width:760px;margin:12px 0 0;font-size:18px;line-height:1.4;color:var(--muted)}em{color:var(--orange);font-style:normal}.sub{font-size:22px;line-height:1.35;color:var(--muted)}.kicker{font:700 10px monospace;letter-spacing:1.5px;color:var(--orange)}a{color:inherit;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}footer{position:absolute;left:44px;right:44px;bottom:18px;display:flex;align-items:center;gap:14px;font:700 9px monospace;letter-spacing:1.4px;color:var(--muted)}footer i{height:1px;background:var(--line);flex:1}
.beat-0{margin-top:34px}.title{border-left:8px solid var(--orange);padding-left:26px}.cover-header{justify-content:flex-end}.beat-0 h1{font-size:64px!important;letter-spacing:-3.2px!important;white-space:nowrap}.beat-0 .sub{margin:14px 0 0;font-size:24px;color:var(--ink)}.rail{position:relative;display:grid;grid-template-columns:repeat(3,1fr);margin-top:48px;border-top:2px solid var(--ink)}.rail:after{content:"";position:absolute;right:-3px;top:-6px;width:11px;height:11px;background:var(--orange);transform:rotate(45deg)}.rail div{display:flex;gap:13px;padding-top:14px;font-size:17px;font-weight:750;text-transform:uppercase}.rail b{font:700 10px monospace;color:var(--orange)}
.skill-card{position:relative;width:69%;min-height:183px;margin-top:28px;padding:24px;background:var(--ink);color:var(--paper);display:grid;grid-template-columns:1.6fr 1fr;gap:26px}.tab{position:absolute;top:0;left:0;transform:translateY(-100%);padding:7px 12px;background:var(--orange);font:700 10px monospace}.skill-card strong{font-size:20px;line-height:1.25}.skill-card p{margin:14px 0 4px;font-size:14px;color:var(--paper)}.skill-card ul{margin:0;padding-left:20px;list-style:disc;font-size:14px;font-weight:600;line-height:1.5}.mini{position:relative;border:1px solid #56706a}.mini i{position:absolute;width:15px;height:15px;border:3px solid var(--mint);border-radius:50%}.mini i:nth-child(1){left:18px;top:22px}.mini i:nth-child(2){right:22px;top:62px}.mini i:nth-child(3){left:54px;bottom:19px}.mini b{position:absolute;right:19px;bottom:18px;width:22px;height:22px;background:var(--orange);transform:rotate(45deg)}.harness{position:absolute;left:72%;right:-44px;top:99px;height:120px;padding:24px;border:1px solid;background:repeating-linear-gradient(135deg,#172b2a12,#172b2a12 4px,transparent 4px,transparent 12px);mask-image:linear-gradient(90deg,#000 0,#000 22%,transparent 90%)}.harness span,.harness b{display:block}.harness span{font:700 10px monospace;color:var(--orange)}.harness b{margin-top:15px;font-size:16px}.threshold{display:flex;gap:18px;margin-top:15px;padding:12px 16px;border-left:5px solid var(--orange);background:#e4e1d6;font-size:15px;font-weight:650}.threshold b{font:700 10px monospace;color:var(--orange)}
.map{display:grid;grid-template-columns:1fr 1fr;margin-top:20px;border:1px solid var(--line)}.map section{min-height:112px;padding:16px 20px;display:grid;grid-template-columns:34px 1fr;gap:12px;border-bottom:1px solid var(--line)}.map section:nth-child(odd){border-right:1px solid}.map section:nth-child(n+3){border-bottom:0}.map h2{font-size:20px!important}.map p{margin:5px 0 8px;font-size:13px;color:var(--muted)}.map em{font-size:11px;font-style:italic;color:#815746}.map section>b{font-size:25px;color:var(--orange)}.map .destination{background:var(--ink);color:var(--paper)}.map .destination h2{color:var(--paper)!important}.fog{background:repeating-linear-gradient(135deg,transparent,transparent 10px,#172b2a0d 10px,#172b2a0d 12px)}.outside{opacity:.62}.map-link{float:right;margin-top:12px;font:700 10px monospace}
.tickets{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.tickets section{display:grid;grid-template-columns:48px 1fr auto;align-items:center;min-height:102px;padding:13px 16px;border:1px solid var(--line);background:#ffffff4d}.tickets .prototype{background:var(--ink)}.tickets .prototype h2,.tickets .prototype p{color:var(--paper)!important}.mark{font:500 34px Georgia;color:var(--orange)}.tickets h2{font-size:20px!important}.tickets p{margin:4px 0 2px;font-size:14px}.tickets em{font-size:11px;font-style:italic;color:var(--muted)}.chip{align-self:start;padding:5px 8px;border-radius:20px;background:var(--mint);font:800 9px monospace}.chip.fable{background:#ffc29f}
.graph{position:relative;margin-top:14px;border:1px solid var(--line);background:#ffffff40}.graph svg{display:block;width:100%;height:245px}.paths path{fill:none;stroke:#8e938c;stroke-width:2;marker-end:url(#arrow)}.fline{stroke:var(--orange);stroke-width:2;stroke-dasharray:5 5}.nodes rect{stroke-width:2}.nodes .open{fill:var(--mint);stroke:var(--ink)}.nodes .blocked{fill:url(#stripe);stroke:#8e938c;stroke-dasharray:5 4}.labels text{font-family:Inter;fill:var(--ink);font-weight:750;font-size:15px}.labels text:nth-child(even){font-size:11px;font-weight:500;fill:#617069}.frontier{position:absolute;z-index:2;left:232px;top:14px;padding:7px 10px;background:var(--orange);color:white;font:800 10px monospace}.frontier span{margin-left:9px;font-weight:500;text-transform:none}
.beat-5{margin-top:28px}.stamp{display:inline-block;margin-bottom:18px;padding:7px 10px;background:var(--orange);color:white;font:800 10px monospace;letter-spacing:1px}.beat-5 h1{font-size:60px!important}.diff{display:grid;grid-template-columns:1fr 80px 1.3fr;align-items:stretch;margin-top:25px}.diff section{padding:16px 20px;border:1px solid var(--line)}.diff section>span{display:block;margin-bottom:8px;font:700 9px monospace;color:var(--muted)}.diff strong{font-size:20px}.diff>b{align-self:center;text-align:center;font-size:35px;color:var(--orange)}.diff .after{background:var(--ink);color:var(--paper)}.diff .after>span{color:var(--paper)}.diff small{display:block;margin-top:8px;color:#b9c7c0}
.life{display:grid;grid-template-columns:1fr 26px 1fr 26px 1fr 26px;align-items:center;margin-top:27px}.life section{min-height:174px;padding:16px;border-top:4px solid var(--orange);background:#e5e1d6}.life section b{float:right;font:700 11px monospace;color:var(--orange)}.life section>span{font:700 9px monospace;color:var(--muted)}.life h2{margin-top:23px!important;font-size:19px!important}.life p{font-size:13px;color:var(--muted)}.life>i{text-align:center;color:var(--orange);font-style:normal;font-size:23px}.context{display:flex;justify-content:space-between;margin-top:15px;padding:12px 15px;background:var(--ink);color:var(--paper);font-size:12px}.context strong{color:#ffc29f;font:700 10px monospace}
.demo{display:grid;grid-template-columns:.8fr 1.35fr;gap:30px;align-items:center;margin-top:25px}.demo h1{font-size:48px!important}.preview{border:1px solid;box-shadow:8px 8px 0 var(--mint)}.preview img{display:block;width:100%}.preview>div{display:flex;justify-content:space-between;padding:11px 13px;background:var(--ink);color:var(--paper);font:700 9px monospace}.closing{display:grid;grid-template-columns:1.6fr .8fr;gap:35px;align-items:center;margin-top:32px}.closing h1{margin-top:17px!important;font-size:52px!important}.closing section>a{display:inline-block;margin-top:28px;font:700 11px monospace}.closing aside{padding:22px;background:var(--ink);color:var(--paper);box-shadow:9px 9px 0 var(--orange)}.closing aside span{font:700 9px monospace;color:#ffc29f}.closing aside strong{display:block;margin-top:8px;font-size:53px}.closing aside p{font-size:15px}.closing aside img{width:86px;height:86px;background:white;padding:4px}
.beat-0{margin-top:70px}.skill-card{width:100%;grid-template-columns:1.05fr 1fr}.journey{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:18px;border:1px solid #56706a}.journey span,.journey strong{font:800 10px monospace}.journey i{color:#ffc29f}.journey b{color:var(--mint)}.threshold{display:grid;grid-template-columns:auto 1fr;align-items:center}.threshold span{font-size:12px;border-left:1px solid var(--line);padding-left:12px}
.map-console{margin-top:18px;padding:17px;background:#0d1114;color:#d7ddd9;border-radius:5px;box-shadow:8px 8px 0 #172b2a24}.map-title{font:700 10px monospace;letter-spacing:1.6px;color:#7e8b92}.status-strip{display:grid;grid-template-columns:7fr .8fr .65fr 1.9fr;height:38px;gap:2px;margin-top:12px}.status-strip span{display:flex;justify-content:center;align-items:center;gap:6px;font:10px monospace;border:1px solid #34454c}.done{background:#264b3f}.running{background:#102d3e}.blocked{background:repeating-linear-gradient(0deg,#24161a,#24161a 5px,#6b2931 6px,#24161a 7px)}.foggy{background:repeating-linear-gradient(45deg,#252a2e,#252a2e 8px,#30363b 8px,#30363b 15px)}.map-summary{margin-top:16px;padding:22px;border-left:4px solid var(--orange);background:#171d20}.map-summary strong{font-size:22px}.map-summary p{margin:7px 0 12px;font-size:16px}.map-summary span{font-size:12px;color:#9eaaa6}.map-lanes{display:grid;grid-template-columns:1fr 28px 1fr 28px 1fr;align-items:center;margin-top:16px}.map-lanes section{min-height:105px;padding:16px;background:#214b3c}.map-lanes .wait{background:#1d2226}.map-lanes section>*{display:block}.map-lanes b{font:800 9px monospace}.map-lanes strong{margin:14px 0 10px}.map-lanes em{font-size:10px}.map-lanes>i{text-align:center}.ledger{display:grid;grid-template-columns:1.2fr 1fr .85fr;gap:8px;margin-top:16px}.ledger section{min-height:108px;padding:14px;background:#171d20;border-top:3px solid #5eb68c}.ledger span,.ledger strong,.ledger small{display:block}.ledger span{font:800 9px monospace}.ledger strong{margin:14px 0 8px;font-size:14px}.ledger small{font-size:10px;color:#8f9c98}
.mode-groups{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:22px}.mode-groups>div{padding:12px;border-top:4px solid var(--orange)}.mode-groups>div:nth-child(2){border-color:var(--ink)}.mode-groups>div>span{font:800 10px monospace}.mode-groups section{display:grid;grid-template-columns:44px 1fr auto;grid-template-areas:'mark title chip' 'mark desc chip';align-items:center;min-height:102px;padding:14px;margin-top:9px;background:#e4e1d6;border:2px solid transparent;opacity:.38}.mode-groups section.active{opacity:1;border-color:var(--orange);box-shadow:5px 5px 0 #e0542f25}.mode-groups .mark{grid-area:mark}.mode-groups h2{grid-area:title;font-size:23px!important;font-weight:900!important}.mode-groups p{grid-area:desc;margin:4px 12px 0 0;font-size:12px}.mode-groups em{grid-area:chip;align-self:start;padding:5px 8px;border-radius:14px;background:var(--mint);font:800 9px monospace;color:var(--ink)}
.life{position:relative;padding-bottom:34px}.life:after{content:'CONTINUE WITH THE NEXT MAP';position:absolute;right:8px;bottom:0;left:8px;height:25px;border:2px solid var(--orange);border-top:0;border-radius:0 0 25px 25px;text-align:center;font:800 9px/25px monospace;color:var(--orange)}
.decision-callout{margin-top:20px;padding:16px 20px;border:1px solid #675321;border-radius:9px;background:#17150e;color:#f3efe4}.decision-callout>span{display:block;margin-bottom:7px;font:700 9px monospace;letter-spacing:1px;color:#f8cd57}.decision-callout>blockquote{margin:0;padding:0 0 0 14px;border-left:3px solid #f8cd57;font-size:20px;font-weight:700;line-height:1.3;color:inherit;background:none}.decision-callout>cite{display:block;margin-top:10px;font-size:11px;font-style:normal;color:#d2cbb9}.possibilities{margin-top:24px}.possibilities h1{font-size:43px!important;line-height:1.08!important}.possibilities p{max-width:790px;color:var(--muted)}.use-list{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}.use-list b{padding:14px 12px;background:#e3dfd3;font-size:14px;border-left:3px solid var(--orange)}
.closing{margin-top:20px}.closing h1{font-size:43px!important}.closing .sub{font-size:16px}.takeaways{display:grid;grid-template-columns:26px 1fr;gap:8px 12px;margin-top:18px}.takeaways b{display:grid;place-items:center;width:24px;height:24px;background:var(--orange);color:white}.takeaways span{font-size:13px;font-weight:650}.closing aside{min-height:260px;display:flex;flex-direction:column;justify-content:center}
.possibilities .intent{margin:18px 0 0;font-size:14px;line-height:1.45}.possibilities .intent em{font-weight:800}.challenges{margin-top:30px}.challenges>h1{margin-top:14px!important;font-size:44px!important;line-height:1.1!important}.challenge-intro{max-width:810px;margin:20px 0 0;font-size:21px;line-height:1.45}.challenge-tip{margin-top:26px;padding:20px 24px;border-left:5px solid var(--orange);background:#e4e1d6}.challenge-tip>strong{font-size:24px}.challenge-tip p{margin:8px 0 0;font-size:18px;line-height:1.4}.grilling-content{display:grid;grid-template-columns:.85fr 1.15fr;gap:28px;align-items:start;margin-top:26px}.grilling-content .challenge-tip{margin-top:0}.tweet{display:block;padding:20px 22px;border:1px solid #cfd9de;border-radius:16px;background:white;color:#0f1419;text-decoration:none;font-family:Arial,sans-serif}.tweet-header{display:flex;align-items:center;gap:10px}.tweet-header>img{width:42px;height:42px;border-radius:50%;object-fit:cover}.tweet-header>div{flex:1}.tweet-header strong{display:flex;align-items:center;gap:4px;font-size:16px}.tweet-header span{display:block;color:#536471;font-size:14px;margin-top:2px}.verified{width:17px;height:17px}.x-logo{width:24px;height:24px;align-self:start}.tweet blockquote{margin:18px 0 14px;padding:0;border:0;background:none;font-size:18px;font-weight:400;line-height:1.4;color:inherit}.tweet-date{font-size:13px;color:#536471}.tweet-more{margin-top:14px;padding-top:12px;border-top:1px solid #eff3f4;font-size:14px;font-weight:700;color:#006cae}.collision{display:grid;grid-template-columns:1fr 42px 1.1fr 42px 1fr;align-items:center;max-width:700px;margin:25px auto}.collision b,.collision strong{padding:20px 14px;text-align:center;background:var(--mint);font:800 16px monospace}.collision strong{background:var(--ink);color:var(--paper)}.collision i{text-align:center;color:var(--orange);font-style:normal;font-size:28px}
</style>
