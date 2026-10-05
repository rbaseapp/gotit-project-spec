# Email verification and password recovery — 2026-10-05

## Source and release status

Core source: `core-platform@b2e46bd5bfc95f2da994675492f59571d6fa81b3`.
Core is locally and PostgreSQL-integration verified.
Web source: `gotIt-front@da913168f85baddc844978412058cf888117e85c`, locally verified.
Chrome source: `gotIt-chrome@46dff89bbc974d932abc7228f09ce23198954a34`, locally verified;
keyless Store archive version 1.4.5 is built, not yet uploaded/published.
Production migration, exact-SHA deployment and real mailbox acceptance are pending.
This record supersedes historical statements that email verification/reset are absent.

The owner explicitly requested both flows and authorized creating the email provider.
The owner approved Resend signup using `ori@rbaseapp.com` and its terms without a
purchase. A Resend account was created; sending domain `auth.rbaseapp.com` is pending
DNS verification. Squarespace contains the new public DKIM TXT record. Two sending
CNAME records remain; Squarespace's Google reauthentication popup is awaiting the
owner because automated interaction stalls. No paid plan was purchased.

## Behavior and API contract

Owner: Core. Requirements FR-AUTH-001/009/010, UC-01 and SCR-01 / SEQ-01.
All endpoints below are `POST /api/v1/auth/*`, require an active
`X-Application-Key`, have strict JSON schemas and return `Cache-Control: no-store`.

| Route | Input | Success |
|---|---|---|
| `register` | `{email,password}` (12–128 characters) | 202 accepted challenge; no user, credential or session is created |
| `resend-verification` | `{email}` | 202 accepted |
| `forgot-password` | `{email}` | 202 accepted, identical for unknown/ineligible accounts |
| `verify-email` | `{email,code,password}` | 204; mailbox proof creates a verified user and password atomically |
| `reset-password` | `{email,code,password}` | 204; password replacement, verification, challenge consumption and all-session revocation are atomic |

The accepted body is exactly `{status:"accepted",expiresIn:600,retryAfter:60}`.
It means the request was accepted, not that delivery occurred. Existing verified
accounts cannot be re-registered or have their password replaced by a verification
code. Recovery sends only for active accounts with a password credential. OAuth-only
accounts continue using their provider. Disabled users remain disabled.

Codes are six numeric digits, expire after ten minutes, allow five attempts and are
single-use. Resend rotates the code and is limited to one request per minute and
five per hour per application/address/purpose. A persisted socket-address budget
allows 300 security-email requests per ten minutes; forwarded IP headers are not
trusted. Invalid attempts commit their counters even though the API returns an error.

Errors: 400 `EMAIL_CODE_INVALID` for wrong/expired/used/foreign-purpose codes;
429 `EMAIL_RATE_LIMITED`; 503 `EMAIL_DELIVERY_UNAVAILABLE` when provider configuration
is missing. Transport failures invalidate their challenge and emit only a safe
delivery failure event, while preserving the generic public accepted response.
Generic response bodies do not establish constant-time account anonymity: eligible
requests still wait for the bounded provider request. Rate limits and operational
monitoring remain required.

Password login after correct credentials returns 403 `EMAIL_VERIFICATION_REQUIRED`
for legacy unverified accounts. Mailbox proof chooses a fresh password, preventing
a password planted before verification from surviving ownership proof. Verified OAuth
linking likewise deletes an unverified password and revokes old sessions. All protected
Core requests now check the stored session, expiry, revocation, active user and verified
email. Password reset therefore invalidates both refresh and previously issued access
tokens. No automatic login follows verification or reset.

## Data and security

Additive migration: `1790000010000_email-auth-challenges.js`.

- `core.email_auth_challenges`: primary key `(application_id,email,purpose)`,
  keyed HMAC-SHA256 code digest, expiration, attempt count, send timestamp and hourly
  send window/count. Digests bind application, normalized email, purpose and code.
  The secret is the existing server-only JWT secret with an explicit purpose prefix.
- `core.auth_request_limits`: `(application_id,bucket)` key, hashed socket address,
  ten-minute window and request count. Both tables reference Core applications.
- Existing users, password credentials and sessions keep their schema. No historical
  migration, product table or verification timestamp is backfilled.

No plaintext OTP or submitted password is stored in challenge rows. Verification and
reset select the address under an advisory lock and lock an existing user before
consuming a challenge, updating a password or revoking sessions. Wrong-code counters
survive transaction completion; concurrent verification yields one success.
Rows older than one day are deleted opportunistically on new requests; this is not a
hard retention SLA. Broader account deletion/retention governance remains open.

Resend receives the recipient address and transactional security message/code over
HTTPS. No learning content, password or authentication session token is sent.
The request is bounded to 15 seconds, rejects redirects and discards response bodies.
Server-only `AUTH_RESEND_API_KEY` and verified `AUTH_EMAIL_FROM` must be configured
in Core. Use sending-only permission scoped to the auth domain. Do not expose keys
in clients, Git, screenshots or logs. Domain signup currently selected Resend's Tokyo
region; record verified provider configuration before production acceptance.

## Process, screens and compatibility

Registration: enter email/password → generic request acknowledgment → code and matching
password confirmation → verified → return to login. Account creation/trial begins only
after proof. Recovery: forgot-password → enter address → code and new password twice →
success → explicit login. States include busy, generic delivery acknowledgment, invalid
or expired code, resend countdown, rate limit, offline/provider failure and retry.
The email/code stay in component memory; URLs contain only a mode, never credentials.
Focus moves to the step heading, results/errors use live regions, numeric codes are
LTR with one-time-code autocomplete, and copy covers eight supported UI locales.

Chrome registration and recovery open the Web flow, then the user signs into the
extension normally. A guard rejects old internal registration messages instead of
treating a 202 challenge as an authenticated session. No new extension permission.
The previously published Store build cannot complete direct email registration after
Core rollout; use the Web URL until the new package is published. Google/Facebook and
verified-account login keep their existing payloads. Existing unverified password
sessions require mailbox proof after rollout.

Process controls: no identity/session before mailbox proof, no recovery without code,
no account-state changes on invalid codes, no reuse or cross-application use. Useful
future KPIs are verification completion, resend rate, expiry/failure counts and reset
success; this change does not add an analytics provider or fabricate metrics.

## Verification and deployment runbook

Core: typecheck/build, 31 fast tests and 41 PostgreSQL tests passed. A disposable
PostgreSQL 17 database ran all migrations, then the new migration down/up successfully.
`test/integration/email-auth.test.ts` covers absent pre-proof user/session, digest-only
storage, wrong code/purpose/application, concurrent use/replay, resend/expiry/attempt
and hourly limits, generic missing-account responses, disabled/OAuth-only accounts,
legacy accounts, password replacement and old access/refresh rejection, delivery
failure, absent configuration, strict schemas, OAuth preclaim defense and socket limits.
Provider unit tests cover bounded HTTPS payload and sanitized rejection/timeout errors.
Mocks are not mailbox delivery evidence.

Web: `npm run check` passed typecheck, lint, 183 Vitest tests, production build and
17 gateway tests. Four targeted Playwright cases passed in English/Hebrew at
320px/1280px: registration, verification, forgot-password and reset, heading focus,
no horizontal overflow and no pre-proof stored session. Component regressions cover
challenge-only registration, confirmation mismatch, recovery and unverified login.
Gateway tests accept only the four named new routes and reject nested admin paths.
Changed-file formatting passed. Existing large-chunk/Zod build warnings remain.
Browser checks mock delivery; real production mailbox acceptance remains pending.

Chrome: `npm run verify` passed typecheck, 41 tests, build, identity and security
checks. `npm run package` validated the keyless 1.4.5 ZIP. New regressions assert
legacy registration fails before fetch and public Web links contain only auth modes.
No new permissions. Artifact: `gotIt-chrome/artifacts/gotit-chrome-WEBSTORE-v1.4.5.zip`.
Archive creation is not Store publication or authenticated live extension acceptance.

Before deployment: verified domain + scoped provider key → full Core/schema and migration
metadata backup → rehearse migration → exact Core deployment (current Docker startup
runs the migration) → compatible Web deployment → extension package/review. Confirm
both added tables and the migration row, `/health` and `/ready`, and exact source SHA.
Use a dedicated owner-controlled test mailbox/alias for live registration, invalid OTP,
mail receipt, verification, login, reset mail, new-password login and old session/password
rejection. Never reset a real user's password for smoke testing. Check the provider's
delivery status and inbox as separate evidence. Record evidence here after acceptance.
Use a forward fix for production issues; do not automatically down-migrate or restore
the insecure pre-verification registration behavior as a rollback.
