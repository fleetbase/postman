# Contributing

## Collection Organization

- Add product API requests under `postman/collections/`.
- Add end-to-end business flows under `postman/collections/`.
- Keep request names stable and descriptive so CI and docs can reference them.
- Put workflow-specific iteration data under the workflow's `data/` directory.

## Variables and Secrets

- Use variables for hostnames, tokens, IDs, and workflow values.
- Commit template environments only.
- Store real API keys and tokens in Postman Vault or local untracked files.
- Never commit exported Vault files, cookies, session tokens, or production credentials.

## Validation

Run the lint check before opening a pull request:

```sh
npm run postman:lint
```

Run the specific collection you changed when a safe local or QA environment is available:

```sh
npm run postman:run:fleetbase -- --environment postman/environments/local.postman_environment.json
```

## Collection Variables

Keep collection variables in snake_case. The shared environment variables are `base_url`, `namespace`, and `api_key`.
