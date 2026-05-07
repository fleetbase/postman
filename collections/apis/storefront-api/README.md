# Storefront API Collection

Reference collection for Fleetbase Storefront API requests.

## Variables

- `base_url`
- `namespace`
- `api_prefix`
- `api_key`

## Auth

Requests inherit bearer token authentication from the collection. Set `api_key` locally or through Postman Vault.

## Coverage

The editable Postman Local Mode collection lives at `postman/collections/Fleetbase Storefront API`. It uses `api_prefix=storefront`, so versioned request URLs resolve as `{{base_url}}/{{api_prefix}}/{{namespace}}/...`.
