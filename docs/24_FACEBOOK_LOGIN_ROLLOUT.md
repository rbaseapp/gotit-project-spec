# GotIt Facebook Login rollout

Status on 2026-10-01: configuration in progress. This document distinguishes locally verified source from production activation.

## Contract and ownership

- GotIt Web loads the Meta JavaScript SDK and requests `public_profile,email`. It forwards the short-lived user access token to Core `POST /api/v1/auth/facebook` with `X-Application-Key: gotit`.
- Core verifies the token through Meta Graph API, including app binding, expiry, scopes and email, then issues an application-scoped Core session. Core stores the public App ID in `core.application_auth_providers`; only its server-side `FACEBOOK_APP_SECRETS` environment variable may contain the App Secret. No API or database schema changed in this rollout.
- Users whose Facebook account does not supply an email receive `FACEBOOK_EMAIL_REQUIRED`; email/password remains available.

## Source and test evidence

- Source: `gotIt-front@c5c6e0173515a1de05baf55a3f4c56c2452e0722`. The public fallback App ID is `2207127606520765`. An empty `VITE_FACEBOOK_APP_ID` is treated as unset so the SDK receives the fallback in local and production builds. A nonempty override remains supported.
- `npm.cmd run check` passed locally: typecheck, ESLint, 164/164 Vitest tests (including the blank-override regression in `test/facebook.test.tsx`), production build and 16/16 gateway tests. These tests use a fake Meta SDK and do not prove a live Facebook account login.

## Provider and production configuration evidence

- Meta application `gotit` (`2207127606520765`): `email` is Ready for testing; `public_profile` is available. Client and Web OAuth, HTTPS enforcement and strict redirect matching are enabled. JavaScript SDK login is enabled; allowed SDK domain is `gotit.rbaseapp.com`; the exact root redirect URI is `https://gotit.rbaseapp.com/`. App domain is `gotit.rbaseapp.com`, category Education, and privacy, terms and deletion-instructions URLs point to the corresponding GotIt pages. The privacy policy contains deletion request instructions. These settings were saved in Meta's developer UI.
- On production Render service `rbase-core-api`, a read-only query initially found only Google for application `gotit`. The Facebook provider row was inserted with public App ID `2207127606520765`; readback returned `provider=facebook`, the same App ID and `enabled=true`.
- Render Web deployment `dep-dav9uak1nsns73at2gk0` reports `Deploy succeeded | Live` for the exact source SHA `c5c6e0173515a1de05baf55a3f4c56c2452e0722`. Production `/ready` and `/` returned HTTP 200; `/assets/index-BWI5Hy42.js` returned 200 and contains App ID `2207127606520765` and the Meta SDK loader. In a separate browser profile, the production sign-in page displayed an enabled Facebook button. This proves the public build and UI entry point, not a real Facebook login.
- Pending at this checkpoint: Meta App Secret in Core's Render `FACEBOOK_APP_SECRETS`, required Meta icon and publication, and a real-account login/logout smoke test. Do not describe Facebook sign-in as production verified until all are observed.

## Completion checks

1. In Meta, complete the icon and publication requirements and verify the app is Live. Keep only the requested `public_profile,email` permissions.
2. Store `{"2207127606520765":"<App Secret>"}` in Core's Render environment. Never place the secret in a `VITE_*` variable, repository, document or browser bundle. Verify the Core service redeploys healthy.
3. Deploy the Web commit through the repository's protected `main` flow. Verify Render reports the exact commit and `/ready` is healthy; verify the served bundle includes the public App ID and the sign-in button is enabled.
4. With an authorized Facebook test account, complete the Meta consent flow and verify `POST /core-api/api/v1/auth/facebook`, authenticated `/auth/me`, a GotIt profile request, logout, and sign-in again. Verify an unavailable email fails without creating a partial account.

Rollback: revert or disable the Web entry point, disable the application-scoped Facebook provider in Core, and unpublish Meta if needed. Do not delete linked users or identities as an automatic rollback.
