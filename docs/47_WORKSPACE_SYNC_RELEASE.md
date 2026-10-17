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
