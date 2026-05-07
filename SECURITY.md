# Security Policy

## Secret Handling

This repository must not contain real credentials or customer data.

Do not commit:

- API keys, bearer tokens, cookies, or session IDs.
- Postman Vault exports.
- Local environment exports with real values.
- Real company, customer, vendor, order, or ledger identifiers.
- Production webhook signing secrets.

Use Postman Vault for local secrets. Template environments should contain empty placeholder values only.

## Reporting a Security Issue

Please report suspected credential leaks or security issues privately to the Fleetbase maintainers. Rotate any exposed credential immediately before opening a cleanup pull request.
