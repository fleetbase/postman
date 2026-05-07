#!/usr/bin/env sh
set -eu

if ! command -v postman >/dev/null 2>&1; then
  echo "Postman CLI is required. Install it from https://learning.postman.com/docs/postman-cli/postman-cli-installation/"
  exit 127
fi

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <collection-path> [postman collection run options]"
  exit 64
fi

collection="$1"
shift

postman collection run "$collection" "$@"
