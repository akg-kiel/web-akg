#!/usr/bin/env bash
set -euo pipefail

# One local preview per worktree; parallel Workerd instances share SQLite state.
node --input-type=module -e "import net from 'node:net'; const s = net.createServer(); s.on('error', () => { console.error('Port 8787 is already in use'); process.exitCode = 1; }); s.listen(8787, '127.0.0.1', () => s.close());"
node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 8787 &
server=$!
trap 'kill "$server" 2>/dev/null || true; wait "$server" 2>/dev/null || true' EXIT
ready=false
for _ in {1..40}; do
  kill -0 "$server" 2>/dev/null || exit 1
  if curl --fail --silent --max-time 3 http://127.0.0.1:8787/ --output /dev/null; then
    ready=true
    break
  fi
  sleep 1
done
[[ "$ready" == true ]] || { echo 'Preview did not become ready' >&2; exit 1; }
node scripts/check-cloudflare-build.mjs --origin=http://127.0.0.1:8787
node scripts/smoke.mjs http://127.0.0.1:8787
node scripts/browser-check.mjs http://127.0.0.1:8787
