# Admin recent activity dashboard — 2026-10-16

Status: published, deployed to the existing Core/Product/Admin services and
verified in the authenticated live Admin on 2026-10-16. This replaces the Admin
homepage's introductory hero, connection counters and module tiles with real
recent activity. Initial local evidence and the later authorized release are
recorded separately below.

## Requirements and screen behavior

- **FR-ADM-ACT-01 / SCR-ADM-HOME:** show newest users, new subscriptions,
  recently canceled subscriptions, new personal programs, new program-template
  revisions, new user vocabulary and recorded failed AI requests.
- **FR-ADM-ACT-02:** each feed independently loads six records per page, sorted
  newest first with stable owner-side ID tie-breaking; users can page in either
  direction, refresh and open a record or the complete filtered list. These are
  latest records across all available history, not a fixed reporting window.
- **FR-ADM-ACT-03:** loading, empty, unavailable and retryable error states remain
  distinct. One failed feed does not hide the others or substitute simulated data.
  Hebrew/RTL layout supports 320px and desktop widths.

**UC-ADM-ACT-01:** an authenticated, active, verified administrator opens the
homepage, reviews independently loaded activity, pages through a feed and opens
its detail or full list. The personal-program link selects the existing Learner
programs tab. Existing permission/MFA checks still control any subsequent edit.

## Ownership and read contracts

Admin uses its existing data provider, same-origin gateway and owner APIs; it has
no direct database connection. Users and subscriptions belong to Core. Personal
programs (`assignments`), template revisions (`programs`), words and AI usage
belong to Product. Other feeds sort by `createdAt DESC`.

Core `/api/v1/admin/subscriptions` and its gateway resource accept optional
`activity=cancelled`; Core filters **before counting and pagination** to provider
`status=canceled` and manual grants with `status=revoked`. An additive nullable
`activityAt` field is sortable: provider cancellations use `provider_occurred_at`,
manual revocations use `revoked_at`. The provider date is the latest stored event
while canceled, not a guaranteed first cancellation-request time. The UI explains
this. Expired manual grants and future scheduled cancellations are excluded.
Scheduled cancellations remain visibly marked in the new-subscriptions feed;
manual access grants and provider subscriptions have separate source labels.

Product `/api/v1/admin/usage` and its gateway resource accept optional
`activity=failed`; Product filters recorded `ai_usage_events.status=failed`
**before counting and pagination**. This is limited to existing AI instrumentation,
not all HTTP failures or unrecorded historical provider errors. Existing request
search, counts and application isolation apply to both filters. Invalid filter
values/resources are rejected at the gateway; the list owners reject activity
filters on other resources or detail calls. Existing requests without these
optional fields retain their behavior.

`/admin-api/status` additionally exposes the existing auxiliary `assignments`
resource so the homepage can check its own capability independently of templates.
This does not create a new menu module or grant permissions.

## Verification and release

- Admin `npm.cmd run check`: TypeScript, 49 gateway/config tests and Vite build
  passed. The existing bundle-size advisory remains.
- Core typecheck, 32 fast tests and build passed.
- Product typecheck, 241 fast tests and build passed.
- Product `test/integration/admin-activity.integration.test.ts` passed against a
  disposable loopback Docker PostgreSQL database bootstrapped with the local Core
  migrations. It exercises actual Core/Product queries: cancellation timestamp
  sorting, manual/provider separation, scheduled-cancellation exclusion, counts,
  pagination, optional-filter compatibility, search and cross-application isolation.
- Isolated Chrome with `test/fixtures/activity-preview.mjs` verified all seven
  feeds, independent paging, empty templates, a failed usage load followed by
  successful retry, the personal-program tab link, and preservation of the
  cancellation filter/sort in the full-list request. Desktop 1440px and mobile
  320px had no horizontal document/card overflow; screenshots are local ignored
  artifacts under `gotit-admin/output/playwright/activity-*.png`.

Deploy matching Core and Product code before Admin so the two filtered feeds work.
At the initial local checkpoint, no new migration, configuration, provider call,
production data mutation, commit, publication or deployment had been performed.
Existing unrelated user changes are preserved. The subsequent owner-authorized
release and live acceptance are recorded below.

## Authorized release ? 2026-10-16

The owner explicitly requested publication and deployment after local verification.
Prepared isolated worktrees on the observed live baselines, preserving newer
word/image functionality and all unrelated original working-tree changes:
`gotit-admin-activity-release`, `core-platform-activity-release`,
`gotIt-backend-activity-release`, and `gotit-spec-activity-release`.

Published main commits:

- Core `e947d919136237f32dafa6f1ec3235e6849d5746` (previous `3c99ec6`).
- Product `99083f8feb38d027caff0713bca4788d1594293e` (previous `6db6db6`).
- Admin `6be8635c0af13b8cf5c1dff4ad92b204214f68a6` (previous `eb80165`).

Release checkout checks: Admin 50 tests, TypeScript, Vite build and official Render
Blueprint validation passed. Core TypeScript, 32 tests and build passed. Product
TypeScript, all 242 fast tests, build, focused activity PostgreSQL integration and
repository formatting passed using the canonical Git/Linux LF line endings.
The existing bundle-size advisory remains.

[Admin CI run 38898007956](https://github.com/rbaseapp/gotit-admin/actions/runs/38898007956)
passed. [Product CI run 38898002670](https://github.com/rbaseapp/gotIt-backend/actions/runs/38898002670)
passed formatting, typecheck, fast tests and build, then failed on the existing
cross-repository Core checkout authorization (`repository not found` for the
private Core repository). The prior Product run has the same failure. No token,
repository permissions or security settings were expanded. The workflow's default
pinned Core baseline now matches the released Core commit. Local integration
uses that exact isolated checkout and disposable loopback Docker PostgreSQL.

No migration/schema/configuration change is part of this release. Existing Core
pre-deploy migration execution is retained; this release adds no migration files.
Rollback uses the previous application commits, retaining all stored data.

The full release integration suite also passed: `node --import tsx --test
--test-concurrency=2 test/integration/*.test.ts` with `CORE_PLATFORM_PATH` pointing
to `core-platform-activity-release`: **122/122 tests**, including real owner queries,
scoped learning, billing/admin, vocabulary and shared-image regressions. Docker
image build `gotit-backend:admin-activity` passed. These local checks cover the
integration stage blocked by the existing private-repository CI credential.

## Live deployment and authenticated acceptance

All three exact source commits are Live in the existing Render services:

| Service | Source | Successful deployment | Duration |
| --- | --- | --- | --- |
| Core | `e947d91` | [dep-db9151lg1s2s738vede0](https://dashboard.render.com/web/srv-dagpddpt0dsc73a5190g/deploys/dep-db9151lg1s2s738vede0) | 1m30s |
| Product | `99083f8` | [dep-db9160vavr4c73cm53u0](https://dashboard.render.com/web/srv-dak3h50jo6nc73bc43h0/deploys/dep-db9160vavr4c73cm53u0) | 41.5s |
| Admin | `6be8635` | [dep-db91arff3r2c73fol1cg](https://dashboard.render.com/web/srv-db8jhsdfii8s739jaji0/deploys/dep-db91arff3r2c73fol1cg) | 1m22s |

Core and Product were Live before Admin deployment. The first Admin deployment
`dep-db916ojrjlhs73drrvh0` built successfully but stayed in the deployment phase
without starting a new process. After 8m13s it was canceled; a retry of the same
verified SHA succeeded. No resource-plan, environment, permissions or credentials
were changed. Core's existing pre-deploy runner reported no pending migrations.

Public `/health` and `/ready` returned 200 for all three services after rollout;
unauthenticated Admin `/admin-api/status` returned 401. The served
`/assets/index-BxyQ66Mh.js` is byte-for-byte SHA-256 identical to the verified
Admin release build.

Reloaded the existing authorized administrator tab at
[the live homepage](https://gotit-admin.onrender.com/#/). All seven feeds finished
loading with zero feed alerts. Users, subscriptions, personal programs and words
showed real records; cancellations, program templates and measured failed AI
requests returned truthful empty states. Dates were descending. User pagination
loaded the next six records independently, and Previous returned to the latest
records. The full cancellation link retained `activity=cancelled` and
`sort=activityAt DESC` in its URL; the personal-program link selected Learner
programs and displayed all three stored programs. Existing write/MFA gates remain.
Desktop document width had no horizontal overflow. Live screenshot:
`../gotit-admin/output/playwright/activity-live.jpg` (ignored local artifact).

No production learning/account/subscription mutation or paid provider operation
was used for acceptance. Empty production feeds were not seeded to make them look
populated. The private-Core GitHub CI authorization issue remains an operational
follow-up; all 122 equivalent integration tests and Docker build passed locally.
