#!/usr/bin/env python3
"""Local-only bridge for visibly typing slide prompts into the demo tmux pane."""

import subprocess
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = "127.0.0.1"
PORT = 7683
PANE = "wayfinder-live-demo:0.0"
ALLOWED_ORIGINS = {"http://localhost:3047", "http://127.0.0.1:3047"}
MAX_PROMPT_BYTES = 16_384
CHUNK_SIZE = 1
CHUNK_DELAY_SECONDS = 0.014


class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        if not self._allow_origin():
            self.send_error(403)
            return
        self.send_response(204)
        self._cors_headers()
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path != "/type" or not self._allow_origin():
            self.send_error(403 if self.path == "/type" else 404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error(400)
            return
        if not 0 < length <= MAX_PROMPT_BYTES:
            self.send_error(413)
            return
        try:
            prompt = self.rfile.read(length).decode("utf-8")
            for offset in range(0, len(prompt), CHUNK_SIZE):
                subprocess.run(
                    ["tmux", "send-keys", "-t", PANE, "-l", "--", prompt[offset : offset + CHUNK_SIZE]],
                    check=True,
                    timeout=2,
                )
                time.sleep(CHUNK_DELAY_SECONDS)
        except (UnicodeDecodeError, subprocess.SubprocessError):
            self.send_error(503, "The demo tmux session is not available")
            return
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def _allow_origin(self):
        return self.headers.get("Origin") in ALLOWED_ORIGINS

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
        self.send_header("Vary", "Origin")

    def log_message(self, *_args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
