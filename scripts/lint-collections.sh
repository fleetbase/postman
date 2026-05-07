#!/usr/bin/env sh
set -eu

node ./scripts/validate-collections.js

if command -v postman >/dev/null 2>&1; then
  yaml_files="$(find ./postman/collections -name '*.yaml' -print)"
  if [ -n "$yaml_files" ]; then
    for yaml_file in $yaml_files; do
      postman collection lint "$yaml_file" --fail-severity error
    done
  fi
else
  echo "Postman CLI not found; skipped v3 YAML schema lint."
fi
