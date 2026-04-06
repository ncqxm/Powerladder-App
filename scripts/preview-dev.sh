#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"

echo "Starting Powerladder App preview on http://localhost:${PORT}"
echo "Tip: use Ctrl+C to stop."

npm run dev -- --host 0.0.0.0 --port "${PORT}"
