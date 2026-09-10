<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useNav } from '@slidev/client'
import { slidePrompts } from './data/slide-prompts.js'
const nav = useNav()
const enabled = import.meta.env.DEV && import.meta.env.VITE_LIVE_TERMINAL === '1'
const active = computed(() => enabled && !nav.isPrintMode.value)
const expanded = ref(true)
const mounted = ref(false)
const terminalWidth = ref(50)
const resizing = ref(false)
const loads = ref(0)
const presenter = computed(() => nav.isPresenter.value)
const slidePrompt = computed(() => slidePrompts[nav.currentPage.value])
const source = computed(() => `http://127.0.0.1:${presenter.value ? 7681 : 7682}`)
let channel
let container
function layout() {
  container?.classList.toggle('terminal-expanded', active.value && expanded.value)
  container?.style.setProperty('--terminal-width', `${terminalWidth.value}%`)
  container?.style.setProperty('--slide-fraction', (1 - terminalWidth.value / 100).toString())
  window.dispatchEvent(new CustomEvent('wayfinder-terminal-state', { detail: { expanded: active.value && expanded.value } }))
}
function publish() { channel?.postMessage({ expanded: expanded.value, width: terminalWidth.value }) }
function resize(width) {
  terminalWidth.value = Math.max(25, Math.min(75, width))
  publish()
}
function startResize(event) {
  if (event.button !== 0) return
  resizing.value = true
  event.currentTarget.setPointerCapture(event.pointerId)
}
function moveResize(event) {
  if (!resizing.value) return
  const bounds = container.getBoundingClientRect()
  resize(100 * (bounds.right - event.clientX) / bounds.width)
}
function stopResize() { resizing.value = false }
onMounted(() => {
  if (!enabled) return
  container = document.querySelector('#slide-container')
  mounted.value = true
  layout()
  channel = new BroadcastChannel('wayfinder-live-terminal')
  channel.onmessage = ({ data }) => {
    if (typeof data === 'boolean') expanded.value = data
    else { expanded.value = data.expanded; terminalWidth.value = data.width }
  }
})
watch([expanded, terminalWidth, active], layout)
onUnmounted(() => { channel?.close(); container?.classList.remove('terminal-expanded'); container?.style.removeProperty('--terminal-width'); container?.style.removeProperty('--slide-fraction') })
function toggle() { expanded.value = !expanded.value; publish() }
</script>

<template>
  <Teleport v-if="mounted && active" to="#slide-container">
    <aside class="live-terminal" :class="{ collapsed: !expanded, resizing }">
      <div v-show="expanded" class="terminal-resizer" role="separator" tabindex="0"
        aria-label="Terminal width" aria-orientation="vertical" aria-valuemin="25" aria-valuemax="75"
        :aria-valuenow="Math.round(terminalWidth)" :aria-valuetext="`${Math.round(terminalWidth)}% terminal width`"
        @pointerdown.stop.prevent="startResize" @pointermove="moveResize"
        @pointerup="stopResize" @pointercancel="stopResize" @lostpointercapture="stopResize"
        @click.stop @dblclick.stop="resize(50)"
        @keydown.left.prevent.stop="resize(terminalWidth + 2)"
        @keydown.right.prevent.stop="resize(terminalWidth - 2)"
        @keydown.home.prevent.stop="resize(25)" @keydown.end.prevent.stop="resize(75)"
      ><span aria-hidden="true" /></div>
      <iframe allow="clipboard-read; clipboard-write" :src="source" title="Shared live terminal" :data-loads="loads" @load="loads++" />
    </aside>
    <div class="terminal-actions" :class="{ expanded }">
      <Transition name="prompt-slide">
        <PromptTyper v-if="expanded && slidePrompt" :prompt="slidePrompt" />
      </Transition>
      <button class="terminal-slide-toggle" :aria-expanded="expanded" :aria-label="expanded ? 'hide terminal' : 'show terminal'" :title="expanded ? 'Hide terminal' : 'Show terminal'" @click.stop="toggle">
        <span class="terminal-toggle-icon" aria-hidden="true"><i/><i/><i/><b>&gt;_</b></span>
        <kbd aria-hidden="true">{{ expanded ? '×' : '›' }}</kbd>
      </button>
    </div>
    <nav class="terminal-navigation" @keydown.right.prevent.stop="nav.next()" @keydown.left.prevent.stop="nav.prev()">
      <button aria-label="Previous slide" @click.stop="nav.prev()">←</button>
      <span>{{ nav.currentPage.value }} / {{ nav.total.value }}</span>
      <button aria-label="Next slide" @click.stop="nav.next()">→</button>
    </nav>
  </Teleport>
</template>

<style>
#slide-container.terminal-expanded > #slide-content {
  left: calc((100% - var(--terminal-width, 50%)) / 2);
  transform: translate(-50%, -50%) scale(calc(var(--slidev-slide-scale) * var(--slide-fraction, 0.5)));
}
.live-terminal { position: absolute; top: 0; right: 0; bottom: 0; width: var(--terminal-width, 50%); background: #111; border-left: 1px solid #3d3d3b; z-index: 100; transform:translateX(0); transition:transform .24s cubic-bezier(.2,.8,.2,1); }
.live-terminal iframe { width: 100%; height: 100%; border: 0; }
.live-terminal.collapsed { pointer-events: none; transform:translateX(100%); }
.terminal-actions{position:absolute;right:42px;bottom:22px;z-index:101;display:flex;align-items:stretch;gap:14px;transition:right .24s cubic-bezier(.2,.8,.2,1)}.terminal-actions.expanded{right:calc(var(--terminal-width, 50%) + 22px)}
.terminal-slide-toggle { box-sizing:border-box;display:flex;align-items:center;gap:10px;height:64px;padding:10px 12px;border:1px solid #526763;border-bottom:4px solid #091918;border-radius:6px;background:#17302e;color:white;cursor:pointer;box-shadow:0 3px 0 #ee5731;font-family:ui-monospace,monospace;transform-origin:bottom right;transition:transform .15s ease,background .15s ease }
.prompt-slide-enter-active,.prompt-slide-leave-active{transition:opacity .24s ease,transform .24s cubic-bezier(.2,.8,.2,1)}.prompt-slide-enter-from,.prompt-slide-leave-to{opacity:0;transform:translateX(36px)}
.terminal-slide-toggle:hover{background:#21413e;transform:translateY(-1px)}.terminal-slide-toggle:focus-visible{outline:3px solid #ee5731;outline-offset:3px}.terminal-slide-toggle kbd{display:grid;width:34px;height:34px;place-items:center;border:1px solid #a6bbb5;border-bottom-width:4px;border-radius:4px;background:#273f3c;font:700 19px/1 ui-monospace,monospace}.terminal-toggle-icon{position:relative;width:44px;height:34px;flex:none;border:1px solid #8ba09a;border-radius:3px;background:#091918}.terminal-toggle-icon i{position:absolute;top:5px;width:4px;height:4px;border-radius:50%;background:#ee5731}.terminal-toggle-icon i:nth-child(1){left:6px}.terminal-toggle-icon i:nth-child(2){left:13px;opacity:.7}.terminal-toggle-icon i:nth-child(3){left:20px;opacity:.45}.terminal-toggle-icon b{position:absolute;left:7px;bottom:4px;color:#bce1c9;font:700 11px ui-monospace,monospace}
.terminal-navigation { position: absolute; bottom: 24px; left: 0; width: 100%; display: flex; align-items: center; justify-content: center; gap: 14px; font: 14px system-ui; color: #242623; z-index: 99; }
.terminal-expanded .terminal-navigation { width: calc(100% - var(--terminal-width, 50%)); }
.terminal-navigation span { background: #faf5eb; border-radius: 5px; padding: 4px 8px; }
.terminal-navigation button { background: #faf5eb; color: #242623; border: 1px solid #70706b; border-radius: 5px; padding: 4px 12px; }
.terminal-resizer { position: absolute; left: -16px; top: 0; bottom: 0; width: 32px; display: flex; align-items: center; justify-content: center; cursor: col-resize; touch-action: none; z-index: 1; }
.terminal-resizer::before { content: ""; position: absolute; top: 0; bottom: 0; width: 1px; background: #64645e; }
.terminal-resizer span { position: relative; width: 8px; height: 28px; border: 1px solid #96968d; border-radius: 4px; background: #b8b8af; }
.terminal-resizer:hover span, .terminal-resizer:focus-visible span, .resizing .terminal-resizer span { background: #d4d4cb; }
.terminal-resizer:focus-visible { outline: 2px solid #b7b7ae; outline-offset: -2px; }
.live-terminal.resizing iframe { pointer-events: none; }
#slide-container:has(.resizing) { cursor: col-resize; user-select: none; }
</style>
