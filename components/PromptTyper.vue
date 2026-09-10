<script setup>
import { onUnmounted, ref } from 'vue'

const props = defineProps({
  prompt: { type: String, required: true },
  label: { type: String, required: true },
  subtle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const enabled = import.meta.env.DEV && import.meta.env.VITE_LIVE_TERMINAL === '1'
const state = ref('idle')
let cooldown

async function typePrompt() {
  if (props.disabled || !props.prompt || state.value !== 'idle') return
  state.value = 'typing'
  cooldown = setTimeout(() => { state.value = 'idle' }, 3000)
  try {
    const response = await fetch('http://127.0.0.1:7683/type', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: props.prompt,
    })
    if (!response.ok) throw new Error(await response.text())
    state.value = 'done'
  } catch {
    state.value = 'error'
  }
}

onUnmounted(() => {
  clearTimeout(cooldown)
})
</script>

<template>
  <div v-if="enabled" class="prompt-typer" :class="{ subtle }" @click.stop @keydown.stop>
    <button class="prompt-trigger" :class="{ unavailable: disabled }" type="button" :disabled="disabled || state !== 'idle'" :title="disabled ? 'Show the terminal to enter a prompt' : undefined" @click="typePrompt">
      <span class="text-icon" aria-hidden="true"><b>Abc</b><i>↳</i></span>
      <span class="prompt-label">
        <small>{{ state === 'error' ? 'connection error' : label }}</small>
        <strong>{{ state === 'typing' ? 'typing…' : state === 'done' ? 'prompt entered' : state === 'error' ? 'terminal unavailable' : 'enter prompt' }}</strong>
      </span>
    </button>
  </div>
</template>

<style scoped>
.prompt-typer { font-family: ui-monospace, monospace; }
.prompt-trigger { box-sizing:border-box;display: flex; align-items: center; gap: 17px; width: max-content; height:64px; border: 1px solid #526763; border-bottom: 4px solid #091918; border-radius: 6px; background: #17302e; color: white; padding: 10px 17px 10px 12px; text-align: left; cursor: pointer; box-shadow: 0 3px 0 #ee5731; }
.text-icon { position: relative; display: grid; width: 44px; height: 34px; flex: none; place-items: center; border: 1px solid #8ba09a; border-radius: 3px; background: #091918; color: #bce1c9; }
.text-icon b { font: 700 13px ui-monospace, monospace; letter-spacing: -.04em; }
.text-icon i { position: absolute; right: 3px; bottom: 1px; color: #ee5731; font: 700 8px ui-monospace, monospace; font-style: normal; }
.prompt-label { display: flex; flex-direction: column; }
.prompt-label small { color: #bce1c9; font: 700 10px ui-monospace, monospace; text-transform: uppercase; letter-spacing: .13em; }
.prompt-label strong { margin-top: 2px; font: 700 14px ui-monospace, monospace; text-transform: uppercase; letter-spacing: .045em; }
.prompt-trigger:hover:not(:disabled) { background: #21413e; transform: translateY(-1px); }
.prompt-trigger, .text-icon, .prompt-label small { transition: background-color .24s ease, border-color .24s ease, color .24s ease, box-shadow .24s ease; }
.subtle .prompt-trigger { background: transparent; color: #17302e; border-color: #17302e40; box-shadow: 0 3px 0 #ee573140; }
.subtle .text-icon { background: transparent; color: #17302e; border-color: #17302e60; }
.subtle .prompt-label small { color: #526763; }
.subtle .prompt-trigger:hover:not(:disabled) { background: #17302e0d; }
.prompt-trigger:focus-visible { outline: 3px solid #ee5731; outline-offset: 3px; }
.prompt-trigger:disabled { opacity: .62; cursor: wait; box-shadow: 0 1px 0 #ee5731; transform: translateY(2px); }
.prompt-trigger:disabled .text-icon b { animation: terminal-cursor .45s steps(1) infinite alternate; }
.prompt-trigger.unavailable { cursor: not-allowed; }
.prompt-trigger.unavailable .text-icon b { animation: none; }
@keyframes terminal-cursor { to { color: #ee5731; } }
</style>
