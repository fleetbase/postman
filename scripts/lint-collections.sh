#!/usr/bin/env sh
set -eu

node ./scripts/validate-collections.js

if command -v postman >/dev/null 2>&1; then
  for collection in ./postman/collections/*/; do
    [ -d "$collection" ] || continue
    echo "Linting $(basename "$collection")..."
    postman collection lint "$collection" --fail-severity error
  done
else
  echo "Postman CLI not found; skipped v3 YAML schema lint."
fi
