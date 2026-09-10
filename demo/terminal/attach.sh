#!/usr/bin/env bash
# Keep ttyd's connection alive when the last tmux pane exits.
set -u
mode=$1
session=$2
workspace=$3
shift 3
client=
cleanup() {
  if [[ -n "$client" ]]; then
    kill "$client" 2>/dev/null || true
    wait "$client" 2>/dev/null || true
  fi
  exit 0
}
trap cleanup HUP INT TERM
[[ -d "$workspace" ]] || { printf "Missing demo workspace: %s\n" "$workspace" >&2; exit 1; }
while true; do
  if ! tmux has-session -t "=$session" 2>/dev/null; then
    # Presenter and audience may both reach this point; only one creates it.
    if tmux new-session -d -s "$session" -x 120 -y 32 -c "$workspace" env -u NO_COLOR COLORTERM=truecolor FORCE_COLOR=3 "$@" 2>/dev/null; then
      tmux set-option -t "=$session" status off
    fi
  fi
  if [[ "$mode" == reader ]]; then
    tmux attach-session -r -f ignore-size -t "=$session" <&0 &
  else
    tmux attach-session -t "=$session" <&0 &
  fi
  client=$!
  wait "$client"
  client=
  printf '\r\nTerminal exited. Restarting…\r\n'
  sleep 1
done
