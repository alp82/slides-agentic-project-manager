<script setup>
const rows = [
  [
    ['Search rules', 'Grilling'], ['GIF provider', 'Research'], ['Keyboard needs', 'Grilling'], ['Motion limits', 'Research'], ['Copy formats', 'Research'],
  ],
  [
    ['Search flow', 'Prototype'], ['Provider adapter', 'Task'], ['Keyboard flow', 'Prototype'], ['Motion study', 'Prototype'], ['Clipboard API', 'Task'],
  ],
  [
    ['Search + GIFs', 'Task'], ['Results layout', 'Grilling'], ['Focus behavior', 'Task'], ['Interaction feel', 'Grilling'], ['Copy feedback', 'Prototype'],
  ],
  [
    ['Unified picker', 'Prototype'], ['Empty states', 'Task'], ['Keyboard checks', 'Task'], ['Motion polish', 'Task'], ['Clipboard checks', 'Task'],
  ],
]
const tickets = rows.flatMap((row, r) => row.map(([title,type], c) => ({id:r*5+c+1,title,type,row:r,x:100+c*158,y:30+r*70})))
const dependencies = [
  [1,6],[2,7],[3,8],[4,9],[5,10],
  [6,11],[7,11],[7,12],[8,13],[8,14],[9,14],[10,15],
  [11,16],[12,16],[12,17],[13,18],[14,19],[15,20],
]
function connector([from,to]) {
 const a=tickets[from-1], b=tickets[to-1]
 return `M ${a.x+73} ${a.y+56} C ${a.x+73} ${a.y+62}, ${b.x+73} ${b.y-6}, ${b.x+73} ${b.y-3}`
}
</script>

<template>
  <div class="dependency-map">
    <div class="ticket-graph" role="group" aria-label="Example GIF picker dependency graph. Five green frontier tickets are ready to claim. Arrows connect prerequisites to dependent tickets below.">
      <div class="frontier-band" />
      <div class="row-label" style="top:45px"><b>FRONTIER</b><span>Ready to claim</span></div>
      <div class="row-label" style="top:185px"><b>BLOCKED</b></div>
      <svg viewBox="0 0 892 300" aria-hidden="true">
        <defs><marker id="dependency-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="#64766b" /></marker></defs>
        <path v-for="edge in dependencies" :key="edge.join('-')" :d="connector(edge)" fill="none" stroke="#64766b" stroke-width="1.8" marker-end="url(#dependency-arrow)" />
      </svg>
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket" :class="{ready:ticket.row===0}" :style="{left:`${ticket.x}px`,top:`${ticket.y}px`}">
        <b>{{ticket.title}}</b><div><span class="type-chip" :class="ticket.type.toLowerCase()">{{ticket.type}}</span><span class="ticket-id">#{{ticket.id}}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dependency-map{margin-top:17px;color:#172b2a}.ticket-graph{position:relative;height:300px;margin-top:3px}.frontier-band{position:absolute;left:0;right:0;top:23px;height:70px;border-radius:8px;background:#d3e9aa66}.row-label{position:absolute;left:10px;width:82px}.row-label b{display:block;font:800 9px monospace;letter-spacing:.2px}.row-label span{display:block;margin-top:5px;font-size:10px;font-weight:600}.ticket-graph svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.ticket{position:absolute;box-sizing:border-box;width:146px;height:56px;padding:7px 9px;background:#faf7ef;border:1.5px solid #a8b1a7;border-radius:6px;box-shadow:0 2px 0 #172b2a0c}.ticket.ready{background:#e3f0cc;border:2px solid #7d9d56}.ticket>b{display:block;font-size:12px;line-height:15px;font-weight:800;white-space:nowrap}.ticket>div{display:flex;align-items:center;justify-content:space-between;margin-top:5px}.type-chip{padding:2px 6px;border-radius:4px;font-size:9px;line-height:12px;font-weight:800}.research{background:#dce8ee;color:#284f65}.grilling{background:#f7dccb;color:#803d24}.prototype{background:#e6dff0;color:#604177}.task{background:#dce8da;color:#315b35}.ticket-id{font:700 9px monospace;color:#526056}
</style>
