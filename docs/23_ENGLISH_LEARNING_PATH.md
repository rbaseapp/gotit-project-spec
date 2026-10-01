# English learning path: initial catalog handoff

## 2026-10-01 — Production activation

The initial Backend `74eb91d` and Web `4da3411` deployments exposed an empty path because production had only 9 topics. The dedicated `gotit_migrator` credential was then located in the ignored `.env.production.generated` provisioning artifact; it was never added to the Render runtime service or Git. Render Recovery reports that managed backups are unavailable on the Free database plan. Before changing production, a local schema dump (`gotit-schema-before-v1-2026-10-01T09-03-13-760Z.dump`, SHA-256 `b1f444b0078d5fa45ca7a9a783d62b91bd76066660f64e3633fbaa2e4cd84750`) and a full product plus migration-metadata dump (`gotit-product-full-before-english-path-2026-10-01T09-03-21-059Z.dump`, SHA-256 `b5972bedd426851f80ac854ce2dd66c86784b5dd8010777fcf99feea6aa9692c`) were created in ignored `.local-backups` and validated with `pg_restore --list`. Read-only normalization inspection had zero mismatches; restricted runtime preflight passed.

`node scripts/migrate-provisioned.js gotit-v1-up` applied `1790800006000_daily-english-catalog` then `1790800007000_english-learning-path` using the dedicated role and returned a passing runtime preflight. Production readback confirmed 10 topics, the named `english-learning-path-en-he` topic, 3 `en`/`he` tracks, 60 packs, 3,000 entries, and exactly 50 entries in each pack. Backend and Web `/ready` each returned HTTP 200. After refreshing a signed-in browser session, `/english-learning` displayed all three levels and 20 units per level. First Basic unit and last Advanced unit opened with 50 English/Hebrew entries each. No installation was performed on the user's account; the 50-entry installation flow remains covered by local regression rather than production test-account smoke.

## 2026-10-01 — Initial production rollout observation (resolved)

Render Backend deployment `dep-dav2078473hc73d6n53g` reports Live at `gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f`. Web deployment `dep-dav20jo473hc73d6okp0` reports Deploy succeeded for `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af`. Both public `/ready` endpoints returned HTTP 200, and `/english-learning` returned HTTP 200. An authenticated live browser showed the new navigation entry and dedicated page, but its content was empty. A read-only query through the production Backend runtime connection returned **9 word topics**, the pre-catalog count. The initial 60-unit migration has therefore not run; the 3,000 entries and follow-up correction are not live.

At the initial check, the Render Backend environment listed `DATABASE_URL` but no `GOTIT_MIGRATION_DATABASE_URL`, and the process environment lacked the dedicated variable. The existing ignored local provisioning file provided the dedicated credential for the completed migration above. Runtime `DATABASE_URL` was not used for migration.

## 2026-10-01 — Dedicated Web path

Source: `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af`. A live learner opens `/english-learning` from the primary navigation or the generic word-pack explorer. The screen filters the existing catalog to English source and Hebrew translation and accepts both the original and renamed topic slugs during rollout. It shows Basic, Good, and Advanced in order, units by module number, verified mastered counts, the next unfinished unit, a 50-entry preview, and an add-and-practice action. It uses the existing protected `/api/v1/word-packs*` and smart-practice contracts. The generic explorer excludes these course units while linking to the dedicated path. No backend API change or new user data table is introduced.

Screen states: loading, API error/retry, unavailable catalog or language pair, preview, installing, billing restriction, installed/practice, and completed-unit progress. New UI strings are authored in Hebrew and English; the other six supported locales have English fallback strings. The path groups by practical frequency progression, not unsupported thematic chapter labels. Web `npm.cmd run check` passed: typecheck, lint, 155/155 Vitest tests, production build, and 16/16 gateway tests. The live-flow regression covers route discovery, preview, and installing all 50 entries. This is source/local verification, not a production path smoke.

## 2026-10-01 — Named path and reviewed corrections

Source: `gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f`.
Migration `1790800007000_english-learning-path.js` follows the published initial catalog migration without editing it. It changes the topic slug to `english-learning-path-en-he` and the learner-facing title to "מסלול לימוד אנגלית". A separate correction asset identifies 72 Hebrew meanings by stable entry ID, validates their previous values, and updates catalog entries transactionally. Existing installed learning items and learning evidence are not rewritten. There is no API or schema shape change.

Local verification: backend typecheck, 204/204 fast tests, build, and the 26/26 targeted PostgreSQL integration subtests passed. The integration checked the topic title and slug, 3 tracks, 60 units, 3,000 entries, and a representative corrected meaning. Repository-wide formatting still reports pre-existing unrelated files; the changed migration and tests pass targeted formatting. Production migration and authenticated smoke remain unverified.

The intended learner path is a dedicated Web screen with level and unit progress, next unit, preview, and practice entry. That Web source commit is tracked separately. Rollout requires both migrations in sequence through the dedicated migrator before or alongside the Web deploy. Existing saved user translations may differ from corrected catalog meanings; they remain under user ownership.

Source: `gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a`.
Status on 2026-10-01: implemented as a data migration in source control. Production migration execution and an authenticated catalog smoke test have not been verified. A backend code deployment alone does not insert this content.

## Learner outcome and current limitation

The requested Hebrew-to-English path has three sequential levels: Basic, Good, Advanced. Each level has 1,000 distinct English words or expressions in 20 units of 50. The source migration creates one `word_topics` row, three `word_tracks`, 60 `word_packs`, and 3,000 `word_pack_entries`. It uses the existing protected word-pack API and installation flow. In this initial commit, the path is visible only through the general `/word-packs` screen and carries the user-facing topic name "אנגלית יום־יומית". The user has since requested a dedicated language-learning path and a course-oriented name; that change is pending in this handoff.

The frequency ranking combines COCA spoken/TV/movie and overall lemma signals, with common survival expressions brought forward. Oxford Phrase List and Cambridge English Vocabulary Profile were consulted as checks. Hebrew translations were drafted with `Helsinki-NLP/opus-mt-en-he` and manually corrected in selected cases. The broad stored CEFR ranges are navigation hints, not per-item certification. Editorial review of all 3,000 meanings remains open. See the source repository's `docs/DAILY_ENGLISH_CATALOG.md` for methodology.

## Data and operations

Migration `1790800006000_daily-english-catalog.js` inserts public catalog rows. It does not alter existing user progress. Its down path refuses removal when a user has installed or linked one of these packs. Run the dedicated migrator with `GOTIT_MIGRATION_DATABASE_URL` after backup; backend startup and ordinary Render deploy do not run migrations. Verify an `en` source / `he` translation profile with an authenticated `GET /api/v1/word-packs`, detail calls for the first and last units, and a 50-entry installation on a test account. Until those checks occur, the content must not be described as production available.

## Trace and evidence

- Outcome: a progressive English learning path for Hebrew speakers, 50 items per unit.
- Process: choose level and unit, inspect entries, install, practice, and track progress through existing pack and learning APIs.
- Screen: existing `SCR-07` word packs in this initial source commit; dedicated screen pending.
- API: no route or payload change; existing `/api/v1/word-packs*` contracts.
- Regression: `test/daily-english-catalog.test.ts` checks the 3 x 1,000 structure, 50-entry units, uniqueness, Hebrew presence, representative expressions, migration inserts and rollback guard. This record does not claim an exact-commit test run or production smoke for `ba9ab57`.
