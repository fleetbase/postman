# Integrated Vendor Workflow

End-to-end workflow collection for integrated vendor scenarios.

## Variables

- `base_url`
- `namespace`
- `api_key`

## Intended Flow

1. Verify API access.
2. Retrieve or create vendor context.
3. Submit an order payload.
4. Dispatch or assign to the vendor.
5. Verify webhook delivery state.

This collection is based on the exported Fleetbase Integrated Vendor Flow Postman collection and uses `{{base_url}}/{{namespace}}` for request URLs.

## Data

Use `data/happy-path.example.json` for a safe example iteration payload.
