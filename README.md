# Fleetbase Postman Collections

Official Git-first Postman workspace for Fleetbase API collections and workflow collections.

## Repository Layout

- `collections/apis/` contains canonical API reference collections.
- `collections/workflows/` contains scenario and integration workflow collections.
- `environments/` contains importable environment templates only.
- `examples/` contains reusable sample request and response payloads.
- `scripts/` contains local helper commands used by npm scripts and CI.

## Collections

| Collection | Path | Purpose |
| --- | --- | --- |
| Fleetbase API | `collections/apis/fleetbase-api/collection.postman_collection.json` | Core Fleetbase platform API requests. |
| Storefront API | `collections/apis/storefront-api/collection.postman_collection.json` | Storefront and customer-facing commerce API requests. |
| Ledger API | `collections/apis/ledger-api/collection.yaml` | Ledger, balances, accounts, and transaction API requests. |
| Integrated Vendor | `collections/workflows/integrated-vendor/collection.postman_collection.json` | End-to-end vendor integration workflow examples. |

## Getting Started

1. Install the Postman CLI.
2. Import one of the environment templates from `environments/`.
3. Fill local values in Postman or use Postman Vault for secrets.
4. Run linting locally:

```sh
npm run postman:lint
```

Run a collection with an environment template or local environment copy:

```sh
npm run postman:run:fleetbase -- --environment environments/fleetbase.local.template.json
```

Workflow collections can also use iteration data:

```sh
npm run postman:run:integrated-vendor -- \
  --environment environments/fleetbase.local.template.json \
  --iteration-data collections/workflows/integrated-vendor/data/happy-path.example.json
```

## Variable Conventions

Use collection or environment variables instead of hard-coded values:

- `base_url`
- `namespace`
- `api_key`

Do not commit real tokens, keys, IDs, cookies, exported Vault data, or production credentials.

## Format

The imported Fleetbase API, Storefront API, and Integrated Vendor Flow collections are currently Postman v2.1 JSON exports. They should remain normalized to snake_case variables. Future migrations to Postman v3 YAML should be generated from these canonical collection exports with Postman CLI.
