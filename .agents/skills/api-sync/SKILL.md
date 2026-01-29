IGNORE THIS FILE

THIS FILE IS COPIED FROM OTHER PROJECT AND THE SKILL DESCRIBED BELOW
SHOULD NOT REFLECT HOW AGENTIC MODEL SHOULD BEHAVE.

---

name: api-sync
description: Sync new/updated Greet Academy APIs end-to-end: schemas, API paths, service methods, query keys, UI wiring, and localization.

---

# API Sync Skill

Use this skill when adding or updating Greet Academy APIs.

## Source of truth

- API docs: `https://academy-api-dev.heygreet.cloud/api/v1.3.3` unless specified.
- Keep API entries sorted by API number.

## Workflow

1. Identify the API:
   - Number, method, path, request/response schema, and error envelope.
2. Model & schema:
   - Add/adjust Zod schema + exported types in `model/greet/*.ts`.
3. API path and query keys:
   - Add path in `constants/api-path.ts` (sorted by API number).
   - Add query key helper in `constants/query-keys.ts` if needed.
4. Service method:
   - Add method in `app/services/greet/*API.ts`.
   - Use `deepTrim` for params when appropriate.
   - Use `GreetAPIParser` with the correct schema.
   - Use `fetcher.fetch` for authed calls; use `fetch` for unauthenticated (e.g., login).
   - Use `getFetchHeader()` for headers.
   - Handle JSON parse failures and throw `GreetAPIError` with API number as name.
5. Wire the domain accessor:
   - Expose the new API in `app/services/greet/GreetAPI.ts`.
6. UI integration:
   - Add React Query calls or hooks with `GreetQueryPolicy`.
   - Render loading / empty states where applicable.
7. Localization:
   - Add/update `localization/*.json` strings for new UI.

## Error Handling Pattern

- Parse response JSON with `GreetAPIParser`.
- On `response.ok`, return parsed data.
- On error, throw `GreetAPIError` with `{ name: "<API number>", message: response.statusText, data: parsed, httpCode: response.status }`.

## Final checks

- Verify API number ordering.
- Ensure no mixed auth usage (`fetch` vs `fetcher.fetch`).
- Suggest `npm run biome` if coherence check is requested.
