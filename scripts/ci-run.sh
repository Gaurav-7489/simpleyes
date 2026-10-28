#!/usr/bin/env bash
# Runs a CI command; on failure, surfaces the tail of its output as a GitHub
# annotation so failures are readable from the checks API / PR UI.
set -o pipefail
NAME="$1"; shift
LOG="$(mktemp)"
if "$@" 2>&1 | tee "$LOG"; then exit 0; fi
STATUS=${PIPESTATUS[0]}
MSG="$(grep -v '^\s*$' "$LOG" | tail -n 60 | sed 's/%/%25/g' | awk '{printf "%s%%0A", $0}' | cut -c1-60000)"
echo "::error title=${NAME} failed::${MSG}"
exit "${STATUS:-1}"
