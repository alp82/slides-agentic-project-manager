<script setup>
const states = [
  { key: 'done', name: 'Done', count: 3, symbol: '✓', description: 'Resolved decisions' },
  { key: 'running', name: 'Running', count: 2, symbol: '↗', description: 'Claimed · in progress' },
  { key: 'frontier', name: 'Frontier', count: 4, symbol: '→', description: 'Open · unblocked · unassigned' },
  { key: 'blocked', name: 'Blocked', count: 2, symbol: '⊣', description: 'Waiting on a dependency' },
  { key: 'fog', name: 'Fog', count: 3, symbol: '≈', description: 'Questions still taking shape' },
]
const total = states.reduce((sum, state) => sum + state.count, 0)
</script>

<template>
  <div class="map-territories">
    <div class="map-heading"><b>REACTION PICKER</b><span>{{ total }} ITEMS · ONE SHARED MAP</span></div>
    <div class="territories">
      <section v-for="state in states" :key="state.key" :class="state.key" :aria-label="`${state.count} ${state.name}`">
        <div class="territory-heading"><b>{{ state.name }}</b><strong>{{ state.count }}</strong></div>
        <div class="territory-items" aria-hidden="true"><span v-for="i in state.count" :key="i">{{ state.symbol }}</span></div>
      </section>
    </div>
    <div class="legend">
      <div v-for="state in states" :key="state.key" :class="state.key">
        <b><i aria-hidden="true">{{ state.symbol }}</i>{{ state.count }} {{ state.name }}</b>
        <span>{{ state.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-territories { margin-top:18px; color:#172b2a; }
.done { --fill:#303536; --text:#fff9ed; --border:#303536; }
.running { --fill:transparent; --text:#286442; --border:#398454; }
.frontier { --fill:#d3e9aa; --text:#233d2a; --border:#7d9d56; }
.blocked { --fill:#b44e4e; --text:#fff9ed; --border:#b44e4e; }
.fog { --fill:#dcddda; --text:#414846; --border:#8a908b; }
.map-heading { display:flex; justify-content:space-between; align-items:center; font:800 11px monospace; letter-spacing:1px; }
.map-heading span { font-size:10px; }
.territories { display:grid; grid-template-columns:1fr 1.3fr 1fr; grid-template-rows:1fr 1fr; gap:10px; height:230px; margin-top:16px; }
.territories section { padding:13px; background:var(--fill); color:var(--text); border:2px solid var(--border); border-radius:8px; }
.territories .frontier { grid-column:2; grid-row:1/3; display:flex; flex-direction:column; justify-content:space-between; }
.territories .running { grid-column:1; grid-row:2; border-width:3px; }
.territories .blocked { grid-column:3; grid-row:1; }
.territories .fog { grid-column:3; grid-row:2; border-style:dashed; }
.territory-heading { display:flex; align-items:center; justify-content:space-between; }
.territories b { font-size:19px; }
.territories strong { font-size:34px; line-height:1; }
.territory-items { display:flex; gap:9px; margin-top:12px; }
.territory-items span { display:grid; place-items:center; width:36px; height:34px; border:2px solid currentColor; border-radius:6px; font-size:25px; font-weight:800; }
.frontier .territory-items { display:grid; grid-template-columns:1fr 1fr; }
.frontier .territory-items span { width:100%; height:65px; }
.legend { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:14px; padding-top:12px; border-top:2px solid #172b2a; }
.legend b { display:flex; align-items:center; gap:7px; font-size:16px; }
.legend i { display:grid; place-items:center; width:24px; height:24px; border:2px solid var(--border); border-radius:5px; background:var(--fill); color:var(--text); font-style:normal; }
.legend .fog i { border-style:dashed; }
.legend span { display:block; margin-top:7px; font-size:11px; font-weight:650; line-height:1.3; }
</style>
