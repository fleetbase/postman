# Ledger API Collection

Reference collection for Fleetbase Ledger API requests.

## Variables

- `base_url`
- `namespace`
- `api_prefix`
- `api_key`

## Auth

Requests inherit bearer token authentication from the collection. Store real API keys locally or in Postman Vault.

## Coverage

The editable Postman Local Mode collection lives at `postman/collections/Fleetbase Ledger API`. It uses `api_prefix=ledger`, so wallet URLs resolve as `{{base_url}}/{{api_prefix}}/{{namespace}}/...`, while public invoice and webhook URLs resolve under `/ledger/public/...` and `/ledger/webhooks/...`.
