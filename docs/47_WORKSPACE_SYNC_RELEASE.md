# Workspace synchronization and release — 2026-10-17

The owner explicitly requested committing all current project changes, synchronizing
with remote main, merging into main, pushing and deploying the combined release.
The six Git repositories are Backend, Web, Core, Chrome, Admin and this specification.
The historical `rbaseapp_project_docs_updated` directory has no Git repository/remote.
Generated browser traces, screenshots and temporary release scripts remain local.

## Integration decisions

- Snapshot commits and `backup/pre-main-sync-20261017` branches preserve original work.
  Main updates retain the already released quick image actions, translation bridges,
  program editing and activity feeds alongside automatic AI concept assignment.
- Admin's local foundation and published main had separate Git roots. A normal merge
  retaining both histories reconciles matching files and the new assignment interface.
- The unshipped assignment migration is now
  `1792194000000_automatic-concept-assignment.js`. The published
  `1792192000000_automatic-word-images.js` and `1792193000000_translation-concept-links.js`
  retain their names/order. The combined schema has 39 GotIt migrations and 65 tables.
- Assigned item meanings take priority in image reads, Admin metadata and direct image
  replacement; the existing reviewed-translation resolver remains the lexical fallback.
- Web locale merging retains both landing-page copy and published program material.
  The extra logo worktree's source change is already represented by current main.

## Local verification

- Backend: typecheck, build, repository formatting, 245 fast tests and all 135
  disposable PostgreSQL tests passed. The latter includes direct image preparation
  retaining an AI-assigned meaning and the combined migration rollback/up sequence.
- Web: `npm run check` passed: typecheck, lint, 256 Vitest cases, build and 20
  gateway/source-map boundary cases.
- Core: typecheck, 32 fast tests and build passed. Its merged source matches the
  already published main source; no new Core database migration is required.
- Admin: typecheck, 50 gateway/config/bundling cases, build, official Render Blueprint
  validation and production dependency audit passed (zero vulnerabilities).
- Chrome: verify passed with 46 cases; the production Web Store ZIP was built and
  verified locally, including omission of `manifest.key`. This does not publish it.
- Existing large-bundle warnings remain. Full Web browser/device/provider acceptance,
  Core database integration and authenticated production mutation acceptance are
  separate from these checks.

## Production preparation

Read-only inspection confirmed the dedicated runtime and migrator target the same
database. Before release it had 38 migrations, 268 words, 502 concept expressions
and 247 concepts. Only the new assignment migration was pending.

A custom PostgreSQL backup of `product_gotit` and `gotit_migrations` was created and
validated using `pg_restore --list`: 37,812,894 bytes, 424 archive entries, SHA-256
`682e6595d28aee47147d307782b7672c81ac70beef2643caf37d0c68a5d97894`.
It remains in the ignored Backend `.local-backups` directory. Integration migration
rehearsal used disposable PostgreSQL, never this production database.

Production migration, exact release commits and Render deployment evidence are
recorded below as they are completed. Retain additive schema/data on application
rollback; never force destructive down migrations through authored concept work.

## Completed production rollout

The dedicated migrator applied only `1792194000000_automatic-concept-assignment`.
Readback found 39 migrations, 263 eligible backfill jobs and the same 268 learner
items. Post-migration preflight passed schema, privileges and the product-only
runtime-role check. Subsequent read-only worker inspection found 25 completed jobs
and 238 pending jobs, with no recorded errors. This establishes actual processing,
not an evaluation of every AI meaning decision.

All six repositories were pushed to main without force. Original active development
branches and the two additional source snapshots were also pushed. Core's obsolete
September local main included a product-profile implementation predating the service
split; it was preserved as `archive/local-main-before-sync-20261017` locally rather
than reintroducing product ownership into Core. Its current main matches published
Core behavior and retains the approved application/service boundary.

| Service | Main commit | Render deployment | Result |
| --- | --- | --- | --- |
| Backend | `e3bc7c57e28ce76be5908f9c3e698fcbdc75bae9` | [dep-db9rjceq1p3s739bg8p0](https://dashboard.render.com/web/srv-dak3h50jo6nc73bc43h0/deploys/dep-db9rjceq1p3s739bg8p0) | Live, 41.1 seconds |
| Core | `bdef15ea8775960a45f0f6199875c25b9e61b7e1` | [dep-db9rjnmq1p3s739bhhg0](https://dashboard.render.com/web/srv-dagpddpt0dsc73a5190g/deploys/dep-db9rjnmq1p3s739bhhg0) | Live, 55.8 seconds |
| Web | `c2ac4762c80cfcd1c194a245cd0030b91f5fa514` | [dep-db9rjucs728c73cpplh0](https://dashboard.render.com/web/srv-dal8smbm8hqs73fabfng/deploys/dep-db9rjucs728c73cpplh0) | Live, 1 minute 4 seconds |
| Admin | `a40a212cfd9b4c5e993dd8b35f6c0a3fe2aaae04` | [dep-db9rk1jrjlhs73fu220g](https://dashboard.render.com/web/srv-db8jhsdfii8s739jaji0/deploys/dep-db9rk1jrjlhs73fu220g) | Live, 1 minute 23 seconds |
| Chrome | `89f6aeb2007d19d8f8c10853d68c28a10950f3e3` | Local Web Store ZIP, no hosted service | Source pushed; Store publication not performed |

Deployments were initiated on 2026-10-17 at 21:08:50, 21:09:34, 21:10:01 and
21:10:14 respectively, Jerusalem time. Existing service targets and manual deployment
policies were used. Publishing the existing Core development branch also triggered
the already configured DEV Core automatic deployment; it reported Deployed in the
overview. No new DEV database migration or product grant was applied.

After all four release deployments were Live, each `/health` and `/ready` returned
HTTP 200. Unauthenticated admin reads returned 401 at Backend, application-routed
Core and Admin. Admin serves `index-BIRlewPN.js`, matching its verified build; Web
serves `index-CYkfcxWP.js`, matching the exact Render Docker build (its environment
differs from the local build). [Render services screenshot](evidence/2026-10-17-workspace-release/render-services.png).

Admin [GitHub CI](https://github.com/rbaseapp/gotit-admin/actions/runs/39056733851)
passed. Backend [GitHub CI](https://github.com/rbaseapp/gotIt-backend/actions/runs/39056734008)
passed formatting, typecheck, all fast tests and build, then failed to check out the
private Core repository (`Repository not found`). Hosted integration/Docker steps
were skipped; all 135 integration cases and Docker build passed locally. Repository
access/token scope was not changed. Web's hosted browser suite was still running
when this record was prepared; its typecheck, lint and unit-test steps had passed.

All six primary checkouts have no uncommitted tracked changes. Remaining untracked
files are local browser traces, screenshots, comparison output and temporary tools.
The extension ZIP is `gotIt-chrome/artifacts/gotit-chrome-WEBSTORE-v1.4.5.zip`.
Uploading/publishing that package in Chrome Web Store remains separate from this
Git/Render release. Authenticated production editing and broad device/provider
quality acceptance were not performed by this release task.
