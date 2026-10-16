# Admin user details — 2026-10-16

Status: implemented in the local Admin, Core and Backend working trees. No publication,
deployment or production-data mutation is included. Existing unrelated working-tree
changes are preserved. This extends [operational administration](43_ADMIN_CONSOLE_FOUNDATION.md).

## User behavior and acceptance

FR-ADM-14 / SCR-ADM-USR: selecting a user opens a dedicated Hebrew user card.
The header shows registration date, current effective plan and access source,
provider subscription state and effective-access expiry. Provider cancellation
and payment transaction state remain separate from administrative access overrides.

FR-ADM-15: paginated tabs cover primary/OAuth/billing email addresses, authentication
sessions, subscriptions and temporary grants, payment statuses, daily activity,
game aggregates, practice sessions and attempts/scores, XP ledger, private lessons
and reports (including hidden journal entries), personal courses, roadmaps,
installed prepared packs, homework progress and measured AI usage. Histories retain
the owning application and target user scope and are not truncated to one recent page.

FR-ADM-16: each personal course exposes its active and draft plan, preferences,
version-matched evidence, covered/independently demonstrated lessons, and authoritative
next lesson. Course edits open the existing learner-assignment editor; completed
content and evidence retain its existing protection. Prepared packs show installed
version, word count and known-word markings, which are not represented as mastery.

FR-ADM-17: account identity/status, role/permissions and plan edits use existing Core
commands. Product-profile editing covers languages/self-assessment, timezone, goals,
new-item allowance, translation preference, enabled skills and interests. Separate
forms edit notification preferences and per-language private-lesson preferences.
Owner validation, `users.write`, current authenticator verification, an audit reason,
stable operation UUID, transactional audit/receipt and optimistic revision are required.
An email notification preference cannot be enabled for an unverified target address.
Notification delivery still depends on the configured provider/device. No notification
or provider call is triggered by saving a preference.

FR-ADM-18: totals report recorded learning time and activity with explicit coverage.
Practice uses existing bounded active-answer seconds, not elapsed-session duration.
Private lessons use recorded actual duration and are attributed to their start day
in the profile timezone. Activity days include recorded practice/session starts,
lessons, vocabulary creation and course/homework creation. Untracked visits, browsing,
idle time and lessons without duration are excluded. Daily rows show recorded days;
absence of a row does not establish that the user never visited the product.

Token sums cover measured provider events. Missing historical/streaming tokens and
monetary costs remain unknown; cached input is a subset of input tokens. Payment rows
show stored transaction states and currency; amounts, invoices and refunds require
the provider's records. Scores, XP and system assessments are evidence, not freely
editable account settings. Passwords, password/session hashes, OAuth subjects,
provider secrets, audio and private expected practice answers are never projected.

## Owner contracts

All paths below use `/api/v1/admin` at the owner and trusted application context.

| Owner | Route | Contract |
| --- | --- | --- |
| Core | `GET /learners/:id/:section` | `emails`, `sessions`, `subscriptions`, `payments`; validates target in the actor's application, including disabled users |
| Product | `GET /learners/:id/:section` | `overview`, `activity`, `games`, `sessions`, `attempts`, `xp`, `lessons`, `courses`, `homework`, `roadmaps`, `packs`, `usage`; reauthorizes admin and validates target through Core |
| Product | `GET /learners/:id/courses/:courseId` | Full active/draft plan and evidence for one scoped course; list pages carry summaries instead of full plans |
| Product | `PATCH /learners/:id/profile` | `{operationId, reason, expectedRevision, changes}`; existing strict profile schema and timestamp revision |
| Product | `PATCH /learners/:id/settings` | `{operationId, reason, expectedRevision, kind, changes}`; kind `notifications` or `lesson`, existing strict domain schemas; null revision means create if absent |

History pagination is strict `{page, perPage}`, default 1/25, maximum page size 50.
Responses are `{data, total}`; overview and writes return `{data:{id,...}}`.
Writes replay the original result for the same operation/payload and reject changed
payloads or stale revisions with 409. Profile writes reuse the existing repository
inside the admin transaction, so preference, audit and receipt commit together.
Overview uses a read-only repeatable-read product transaction and does not create a
profile for a user who has never initialized one. Such users retain account editing
and an explicit empty product-profile state.

The gateway exposes only `GET /admin-api/learners/:id/:section` and
`GET /admin-api/learners/:id/courses/:courseId` plus
`PATCH /admin-api/learners/:id/profile|settings`, with UUID, section, paging, envelope,
Origin, capability, permission, step-up, response-size and sanitized-error checks.
`auth-sessions` maps to Core's `sessions`; product practice sessions stay distinct.
Reads are available without unlocking editing. Core/product outages are independently
visible with retry. Reload after conflict is explicit; unsaved values are not silently
submitted over newer data. Full details are collapsible and tables scroll within the
page on narrow screens. Full course details have a separate bounded 4 MiB response
limit; ordinary reads retain 1 MiB and lists avoid multiplying complete plans.

No new schema, data collection, retention or migration is introduced by this feature.
Deploy the matching Core and Product owners before the Admin frontend/gateway. Existing
administration migrations are prerequisites; unrelated pending migrations belong to
their own feature rollout.

## Verification

Backend `test/integration/admin-operations.integration.test.ts` adds real disposable-
PostgreSQL coverage for disabled-user inspection, target/application isolation,
every history query, pagination, active-time versus elapsed-time accounting,
Jerusalem day boundaries, unknown usage, profile normalization, MFA, audit/receipt
replay, stale/concurrent edits and notification/lesson preferences with target email
verification. Core account projections are checked for secret exclusion and ownership.

Admin `test/gateway.test.mjs` verifies fixed owner routes, paging/field rejection,
unauthenticated access, explicit profile writes and denied permission/MFA. The
loopback `test/fixtures/admin-learner-preview.ts` uses disposable PostgreSQL, fake
accounts and seeded learning data, with no paid provider, Google or Paddle requests.
Browser QA covers opening the card from Users, all 15 history tabs, 30-session
pagination, course roadmap states, actual TOTP unlocking, profile/notification/lesson
preference saves and narrow-screen layouts. Final command counts and limits are
recorded with the feature handoff, not assumed to be production evidence.

Release verification on the isolated `release/user-details-20261016` worktrees:
Core typecheck, 32 tests and build passed. Backend format, typecheck/build, 239 fast
tests and the full 95-test disposable PostgreSQL integration suite passed after
merging the already-published program editor. Admin `npm.cmd run check` passed
TypeScript, 45 gateway/config tests and Vite build; its exact release CI passed.
The program-editor merge retains its already-deployed additive schema and existing
prompt features. Migration/table-count assertions were updated to that merged baseline.
A known Vite bundle-size warning remains. Browser QA verified actual preference
persistence, independent/current course markers and 320px overview/settings/history
without page overflow. Screenshots remain local ignored artifacts under Backend
`output/playwright/learner-*`. Paid AI/Paddle calls and physical devices were not tested.

Backend GitHub Actions run `38884422041` passed npm installation, format, typecheck,
239 tests and build, then failed to check out the pinned private Core repository:
`Repository not found`. The Backend repository has no Actions secrets, including
`CORE_PLATFORM_READ_TOKEN`. Local integration uses the exact reviewed Core checkout;
remote integration and Docker CI did not run. Do not remove this gate or copy a broad
local credential into Actions. A repository owner must configure read-only access to
Core for that existing checkout step before CI can complete.

## Release sources ? 2026-10-16

All source commits were pushed to `main` without resetting the original dirty worktrees:

| Owner | Source SHA |
|---|---|
| Core | `3c99ec6130140b37adb2e4ee83b51b6a004cacbf` |
| Backend | `143320b358fc9c3910ce6f770a56dcba1fc2311c` |
| Admin | `96327a35a13cd5dec17a6e82f47f2ee2020b4ade` |

Core deploy `dep-db8v8qss728c73b7ajf0` and Backend deploy
`dep-db8vc07avr4c73cgco70` were observed `Deploy succeeded|Live` at these SHAs.
Admin deploy `dep-db8vdkei0phs7395dfb0` was observed Live at `96327a3`.
All three `/ready` endpoints returned HTTP 200 after rollout. The live Admin HTML
serves `/assets/index-JLnN5u50.js`, matching the validated build and containing
learner inspection, settings, measured tokens and course-progress code.
Production authenticated user-card acceptance remains unverified: two Google sign-in
attempts were interrupted by browser disconnection. The existing authenticated tab
was in an unrelated in-progress operation and was left unchanged. No real learner
preferences, subscriptions or provider state were mutated by this rollout.

Deployment proof: local ignored artifact
`gotIt-backend/output/playwright/learner-admin-live-release.jpg`.
Admin CI: https://github.com/rbaseapp/gotit-admin/actions/runs/38884139980
Backend CI limitation: https://github.com/rbaseapp/gotIt-backend/actions/runs/38884422041
