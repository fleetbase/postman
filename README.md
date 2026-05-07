# Fleetbase Postman Collections

Official Git-first Postman workspace for Fleetbase API collections and workflow collections.

## Repository Layout

- `postman/collections/` contains Postman Native Git collection files.
- `postman/environments/` contains Postman Native Git environment files with empty secret values.
- `collections/` contains repo-level notes and placeholders for future API groups.
- `examples/` contains reusable sample request and response payloads.
- `scripts/` contains local helper commands used by npm scripts and CI.

## Collections

| Collection | Path | Purpose |
| --- | --- | --- |
| Fleetbase API | `postman/collections/Fleetbase API` | FleetOps API and platform logistics requests. |
| Fleetbase Core API | `postman/collections/Fleetbase Core API` | Core API requests shared across Fleetbase modules. |
| Storefront API | `postman/collections/Fleetbase Storefront API` | Storefront and customer-facing commerce API requests. |
| Ledger API | `postman/collections/Fleetbase Ledger API` | Public Ledger wallet, invoice payment, and gateway webhook requests. |
| Integrated Vendor | `postman/collections/Fleetbase Integrated Vendor Flow` | End-to-end vendor integration workflow examples. |

## Getting Started

1. Install the Postman CLI.
2. Select one of the environments from `postman/environments/`.
3. Fill local values in Postman or use Postman Vault for secrets.
4. Run linting locally:

```sh
npm run postman:lint
```

Run a collection with an environment template or local environment copy:

```sh
npm run postman:run:fleetbase -- --environment postman/environments/local.environment.yaml
```

Workflow collections can also use iteration data:

```sh
npm run postman:run:integrated-vendor -- \
  --environment postman/environments/local.environment.yaml \
  --iteration-data collections/workflows/integrated-vendor/data/happy-path.example.json
```

## Variable Conventions

Use collection or environment variables instead of hard-coded values:

- `base_url`
- `namespace`
- `api_prefix`
- `api_key`

Collection-level `api_prefix` values handle package routing while keeping shared environments simple:

- Storefront API uses `api_prefix=storefront`, producing `/storefront/{{namespace}}/...`.
- Ledger API uses `api_prefix=ledger`, producing `/ledger/{{namespace}}/...` for wallet routes and `/ledger/public/...` or `/ledger/webhooks/...` for non-versioned public routes.

Do not commit real tokens, keys, IDs, cookies, exported Vault data, or production credentials.

## Format

The source format for Local Mode is Postman v3 YAML / Native Git layout under `postman/`. JSON exports are treated as import/export artifacts only.
