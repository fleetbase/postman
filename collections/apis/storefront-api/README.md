# Storefront API Collection

Reference collection for Fleetbase Storefront API requests.

## Variables

- `base_url`
- `namespace`
- `api_prefix`
- `api_key`

## Auth

Requests inherit bearer token authentication from the collection. Set `api_key` locally or through Postman Vault.

The bearer token identifies the storefront. Customer-scoped requests additionally send the customer session token as `Customer-Token`. Profile update requests require that token and reject attempts to update a different customer.

## Checkout capture

`Capture checkout as order` is idempotent and verifies Stripe payments on the server. Confirm the PaymentIntent returned by checkout initialization before capture; Fleetbase uses the PaymentIntent linked to the checkout and rejects incomplete, missing, or mismatched payments. A concurrent capture can return `409` while the first request is still in progress and can be retried with the same checkout token.

## Coverage

The editable Postman Local Mode collection lives at `postman/collections/Fleetbase Storefront API`. It uses `api_prefix=storefront`, so versioned request URLs resolve as `{{base_url}}/{{api_prefix}}/{{namespace}}/...`.
