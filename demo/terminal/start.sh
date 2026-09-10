#!/usr/bin/env bash
# Local presentation servers; the tmux conversation survives shutdown.
set -euo pipefail
cd "$(dirname "$0")/../.."
for tool in tmux ttyd claude node python3; do
  command -v "$tool" >/dev/null || { printf 'Required command missing: %s\n' "$tool" >&2; exit 1; }
done
workspace=${WAYFINDER_DEMO_DIR:-/home/alp/dev/reaction-picker-wayfinder-demo}
[[ -f "$workspace/CLAUDE.md" && -d "$workspace/.git" ]] || {
  printf 'Set WAYFINDER_DEMO_DIR to the prepared standalone demo checkout: %s\n' "$workspace" >&2
  exit 1
}
# Fail before starting servers if a previous launcher owns any fixed port.
python3 - <<'PY'
import socket
sockets = []
try:
    for port in (3047, 7681, 7682, 7683):
        listener = socket.socket()
        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        listener.bind(('127.0.0.1', port))
        sockets.append(listener)
except OSError as error:
    raise SystemExit(f'Presentation port {port} unavailable: {error}')
finally:
    for listener in sockets:
        listener.close()
PY
session=wayfinder-live-demo
attach="$PWD/demo/terminal/attach.sh"
pids=()
cleanup() {
  trap - EXIT INT TERM
  if ((${#pids[@]})); then
    kill "${pids[@]}" 2>/dev/null || true
    wait "${pids[@]}" 2>/dev/null || true
  fi
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
ttyd -i 127.0.0.1 -p 7681 -W -O -t fontSize=22 bash "$attach" writer "$session" "$workspace" claude &
pids+=($!)
ttyd -i 127.0.0.1 -p 7682 -O -t fontSize=22 bash "$attach" reader "$session" "$workspace" claude &
pids+=($!)
python3 demo/terminal/type-server.py &
pids+=($!)
VITE_LIVE_TERMINAL=1 node node_modules/@slidev/cli/bin/slidev.mjs --port 3047 &
pids+=($!)
printf 'Presenter: http://localhost:3047/presenter/1\nAudience: http://localhost:3047/1\nFallback: tmux attach -t %s\nWorkspace: %s\n' "$session" "$workspace"
# If a server fails, stop its peers instead of leaving a partial setup running.
wait -n "${pids[@]}"
