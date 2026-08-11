#!/usr/bin/env sh
set -eu

node ./scripts/validate-collections.js

if command -v postman >/dev/null 2>&1; then
  postman collection lint ./postman/collections --fail-severity error
else
  echo "Postman CLI not found; skipped v3 YAML schema lint."
fi
