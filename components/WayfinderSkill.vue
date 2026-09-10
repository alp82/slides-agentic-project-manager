<template>
  <div class="field-layout">
    <section class="field-title">
      <span class="eyebrow">THE WAYFINDER SKILL</span>
      <h1>Start with a<br>rough description<br><em>of your goal</em></h1>
      <p>Manages work that doesn’t fit<br>into a single chat session.</p>
      <code>/wayfinder</code>
    </section>
    <section class="field-index">
      <span class="eyebrow">IT KEEPS TRACK OF</span>
      <div><b>01</b><section><h2>Decisions</h2><p>The questions that shape the work.</p></section></div>
      <div><b>02</b><section><h2>Dependencies</h2><p>What needs to happen first.</p></section></div>
      <div><b>03</b><section><h2>The next useful step</h2><p>A path toward completion.</p></section></div>
      <aside><b>WHEN TO SKIP IT</b><p>When planning fits in a single chat.</p></aside>
    </section>
  </div>
</template>

<style scoped>
.field-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  padding-top: 24px;
}
.eyebrow { font: 700 10px monospace; letter-spacing: 1.5px; color: var(--orange); }
.field-title {
  padding: 28px 28px 25px;
  min-height: 381px;
  background: var(--ink);
  color: var(--paper);
  box-shadow: 7px 7px 0 var(--mint);
}
.field-title .eyebrow { color: var(--mint); }
.field-title h1 {
  margin: 22px 0 0;
  font-size: 38px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -1.8px;
  color: var(--paper);
}
.field-title em { color: #ff9a75; font-style: normal; }
.field-title p { margin: 22px 0 18px; font-size: 16px; line-height: 1.5; color: #e2e7dd; opacity: 1; }
.field-title code { border: 1px solid #658178; background: none; color: var(--mint); padding: 6px 10px; font-size: 13px; }
.field-index { padding-top: 8px; }
.field-index > div { display: flex; gap: 18px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.field-index > div > b { font: 12px monospace; color: var(--orange); padding-top: 5px; }
.field-index h2 { margin: 0; font-size: 23px; letter-spacing: -.7px; font-weight: 800; color: var(--ink); }
.field-index p { margin: 5px 0 0; font-size: 13px; opacity: 1; }
.field-index aside { border-left: 3px solid var(--orange); padding: 2px 0 2px 14px; margin-top: 24px; }
.field-index aside b { font: 700 9px monospace; letter-spacing: 1px; color: var(--orange); }
</style>
