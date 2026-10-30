# 50 — Unlimited administrator PRO access

2026-10-30. **Backend/Web Live in Production; Chrome v1.4.6 artifacts verified, installation/publication pending.** The owner requested all PRO learning features without commercial
usage limits for every existing administrator in Web and Chrome. This does not
promote accounts or grant operational console permissions.

## Diagnosis and authority

A read-only check of the reported account in the actual production Core database
confirmed an active, verified `admin`. Evaluating the unchanged production Core
billing resolver against that same read-only connection returned `source:
administrator`, `tier: paid`, `access: true`, plan `admin` and seven entitlements.
No subscription, charge, minute grant or account role was changed. The same email
is a normal user in DEV; environment-specific roles remain separate.

The old Chrome client discarded the Core role and gated AI selection solely on
the billing response. Existing Backend entitlement guards already recognized
administrators, but daily AI quotas and monthly reading reservations did not.
Tutor creation already skipped minute charging for admin; its balance response
and Web presentation could still show an empty paid minute bank.

## Current contract

- Core remains the authority for application-scoped current roles. Chrome checks
  `/auth/me` using its current bearer token at bootstrap/content configuration,
  retries an expired access token once through normal refresh, and returns the
  current user rather than the pre-refresh cached identity. Missing/invalid/live
  unavailable identity never inherits cached administrator privileges.
- Popup, options and background content configuration use one `hasProAccess`
  predicate: authenticated current admin, or an accessible paid billing tier.
  Ordinary trial/free accounts retain their previous AI eligibility. No account
  email is hardcoded in application code. Backend still independently authorizes
  every protected operation.
- The authenticated server scope can carry its Core role. Administrators do not
  reserve daily AI feature allowances or monthly article allowances. Reading quota
  returns the already-supported `null` value instead of a fabricated finite cap.
  Ordinary user accounting, exhaustion and failure-release behavior is preserved.
- Minute balance adds optional `unlimited: true` for admin, with zero numeric
  purchased-bank fields and no expiry. Consumers must use the flag; zero does not
  mean the administrator needs a purchase. Admin balance/reservation bypasses
  purchased grants without creating or consuming them. Valid session-duration
  bounds remain enforced. Existing clients accept the additive field.
- Web displays administrator/unlimited PRO copy in subscription, account, billing,
  reading and tutor preparation. Administrator article generation is not disabled
  by a finite quota. All eight locale catalogs include the new strings.
- Provider availability, authenticated ownership, application isolation, request
  validation, technical rate/concurrency limits and ordinary session timing remain
  in force. The change removes commercial limits rather than changing these APIs.

## Release and verification

Production releases start from the exact previously Live Backend `8a09d8b` and Web
`c2ac476`, preserving unrelated local changes in their original working trees.
Backend release `9bc79a7` and Web release `39f3087` are published on
`fix/admin-pro-production-20261030` in their owning repositories. No main merge,
Core deployment, migration, account promotion or payment operation is needed.

- Backend build and 249 fast tests passed, including admin quota bypass, ordinary
  exhaustion, explicit unlimited minutes and no purchased-grant consumption.
  Changed-file formatting passed. Local Docker build could not run because the
  Docker engine was stopped; Render's actual Docker build/deployment is separate
  hosted evidence.
- Web check passed: typecheck, lint, 258 tests, build and 20 gateway tests. New
  regressions cover unlimited admin presentation and preserved ordinary offers.
  The subscription test setup was corrected to avoid returning a mock function as
  a lifecycle cleanup callback.
- Chrome production and DEV verification passed: typecheck, 67 tests, builds,
  identity/security/permission/CSP checks. Regressions cover an existing login's
  promotion, demotion, invalid identity, rotated refresh and ordinary paid/free/
  trial behavior. Concurrent user-owned session recovery work was preserved.
- The v1.4.6 Store ZIP was packaged and inspected: no `manifest.key`, expected
  version and production destinations; its background worker equals the verified
  production unpacked worker. The DEV build remains isolated in `dist-dev`.

Chrome `dist` and `dist-dev` are updated locally. An installed unpacked extension
must be reloaded. The prepared Store ZIP is not a published Chrome Web Store
release, and no installed-extension/Google-consent acceptance was performed.
Browser access was unavailable during this task. No production authenticated HTTP
session was manufactured for verification; the account/billing diagnostic was
read-only internal service evaluation, not browser acceptance.

Exact service deployment IDs, readiness, artifact hash and live checks are recorded
in [release evidence](evidence/2026-10-30-admin-pro-access/release.json).
Rollback deploys the previous compatible Backend/Web commits and retains all user
data. Unpacked Chrome rollback uses its previous verified package.
