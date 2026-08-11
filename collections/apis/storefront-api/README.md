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

## Marketplace network keys

Use a `network_...` Storefront API key to browse a marketplace. The same public routes are used for both editions, but the key determines the owner and access scope:

- `GET /about` returns the network owner for a network key and the store owner for a store key.
- `GET /stores`, `GET /store-locations`, and `GET /tags` are marketplace network resources.
- Categories can represent the network's member-store taxonomy or, with `store`, a member store's product taxonomy.
- Products, reviews, stores, and locations are limited to active network membership; unavailable or foreign resources return the endpoint's normal not-found or validation response.
- Each cart line records its `store_id` and `store_location_id`. Multi-store checkout is accepted only when the network enables `multi_cart_enabled`; mixed currencies are rejected.
- A `Customer-Token` is authoritative at checkout. A conflicting `customer` parameter returns `403` instead of checking out as another customer.

The collection deliberately uses placeholders and local environment variables. Do not save real network keys or customer tokens in collection files.
