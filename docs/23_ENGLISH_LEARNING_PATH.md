# English learning path: initial catalog handoff

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
