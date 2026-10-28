#!/usr/bin/env bash
# Downloads the Satoshi variable font (Indian Type Foundry, distributed free via
# Fontshare under the ITF Free Font License, which permits commercial use and
# web embedding) and vendors the WOFF2 + licence into src/app/fonts/.
# Run once; the files are committed so builds never depend on Fontshare.
set -euo pipefail

DEST="src/app/fonts"
if [[ -f "$DEST/Satoshi-Variable.woff2" ]]; then
  echo "Satoshi already vendored."
  exit 0
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL --retry 3 "https://api.fontshare.com/v2/fonts/download/satoshi" -o "$TMP/satoshi.zip"
unzip -q "$TMP/satoshi.zip" -d "$TMP/x"

WOFF2="$(find "$TMP/x" -type f -name 'Satoshi-Variable.woff2' | head -n1)"
LICENSE="$(find "$TMP/x" -type f \( -iname '*licen*' -o -iname 'FFL*' \) | head -n1)"
if [[ -z "$WOFF2" ]]; then
  echo "::error::Satoshi-Variable.woff2 not found in Fontshare download"
  find "$TMP/x" -type f | head -50
  exit 1
fi

mkdir -p "$DEST"
cp "$WOFF2" "$DEST/Satoshi-Variable.woff2"
if [[ -n "$LICENSE" ]]; then cp "$LICENSE" "$DEST/Satoshi-LICENSE.txt"; fi
ls -la "$DEST"
