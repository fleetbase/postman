# Pallet API Collection

Reference collection for the Fleetbase Pallet consumable API — inventory and warehouse management.

## Variables

- `base_url`
- `namespace` (`v1`)
- `api_prefix` (`pallet`)
- `api_key`

## Auth

Requests inherit bearer token authentication from the collection. The middleware behind these
routes is named `AuthenticateOnceWithBasicAuth` but reads `Authorization: Bearer`, so HTTP basic
auth will not authenticate. Store real API keys locally or in Postman Vault.

## Coverage

The editable Postman Local Mode collection lives at `postman/collections/Fleetbase Pallet API`.
It uses `api_prefix=pallet` and `namespace=v1`, so URLs resolve as
`{{base_url}}/{{api_prefix}}/{{namespace}}/...`.

Thirteen resources: products, product variants, suppliers, warehouses, warehouse zones, bin
locations, inventory, stock adjustments, purchase orders, sales orders, stock transfers, batches
and audits.

## Running in order

The folders are ordered so a full run builds its own fixtures: a product, supplier and warehouse
are created first and their public ids captured into environment variables, then zones and bins,
then the orders and transfers that consume them. Requests that address a record created earlier
use those captured variables rather than hardcoded ids.

## What the API will not do

Four resources deliberately refuse writes, so there are no requests here for them:

- stock levels have no create, update or delete — stock follows from operations
- adjustments cannot be updated or deleted — correcting one means making another
- batches are read-only — a batch is produced by receiving stock
- audit entries are read-only — they are written by the system

Transfers follow the same principle: no settable status, only the transition endpoints.
