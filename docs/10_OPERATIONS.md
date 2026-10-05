# 10 — תשתיות, פריסה ותפעול

## 2026-10-05 - Email rollout preparation

Email-auth rollout preparation: full backup with Core/migration metadata and verified TLS passed; public DNS for auth.rbaseapp.com is published. Provider verification and API-key creation approval remain pending; Core/Web are still on their previous Live SHAs. [Exact archive hash, preflight and pending actions](27_EMAIL_AUTH_RECOVERY.md#production-preparation-checkpoint-2026-10-05-1809-utc-onward).

## 2026-10-05 - Email verification and recovery

Email auth rollout is pending verified Resend DNS and Core secrets, production backup/migration, exact-SHA Core/Web deploy and owner-controlled mailbox smoke. [Current setup state and runbook](27_EMAIL_AUTH_RECOVERY.md).

## 2026-10-05 - Selected-language practice

Backend `e5f4817b8544b95da739ce4f462e95f50b99689c` and Web `e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0` are pushed to main and observed Live at their exact SHAs in Render. Readiness and authenticated English/Arabic queue, study and first exercise smoke passed on 2026-10-05. No migration or environment change. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-05 - Free Google preview rollout

Source: `gotIt-backend@98136a06cc3aaee14263011e3307ca1f920a21bf`. Incident `bd4923d9-de72-4b96-9dc6-a54343ebd52f` at 20:14:12 Asia/Jerusalem returned HTTP 402 `SUBSCRIPTION_REQUIRED` from `/api/v1/captures/preview` for the Store extension. The vocabulary write guard ran before Google.

The fix permits authenticated explicit `dictionary` preview without `vocabulary.write`. `auto`/omitted-method routing, save and explicit AI checks remain unchanged. No schema, Core plan, environment or extension package change is required. Google calls can now incur ordinary provider usage for free accounts under the existing authenticated rate limits; no new provider, data category or retention is introduced.

Local verification: typecheck, 209 fast tests, build, 60 disposable PostgreSQL tests, changed-file Prettier and diff check passed. Docker was initially stopped; after starting it all integration tests passed. Full format check reports 36 pre-existing unchanged files. Changed Markdown links and evidence JSON passed; the changed PlantUML annotations/control blocks passed a structural syntax check (no renderer installed). `test/free-google-preview.test.ts` failed 402 before the fix and passes afterward, covering the actual capture/registry/Google adapter with fake transport, signed results, scoped lookup, invalid input, absent/invalid authentication, and denied AI/auto/profile/save requests.

Deployment status: exact source SHA is Live on Render service `srv-dak3h50jo6nc73bc43h0`, deployment `dep-db1tqlrtqb8s73b970kg`, started 2026-10-05 20:24:39 Asia/Jerusalem and completed in 32.4 seconds. `/health`, `/ready` and `/api/v1` returned 200; unauthenticated `/api/v1/profile` returned 401. [Dashboard screenshot](evidence/free-google-preview-deploy-2026-10-05.png).

The ordinary local preflight/audit commands initially reported database unavailable. Repeating the read-only checks with the existing ignored production external runtime configuration passed: schema/privileges OK, product-only role, normalization complete with 242 learning items and 302 translations checked and zero mismatches. No production data was modified by these checks.

Live provider smoke in the existing admin Web session returned a visible `google_cloud_translation` candidate for `commandeered` (Hebrew translation); the preview was closed without saving. This checks provider health, not free-account entitlement acceptance.

Free-account Store smoke remains pending user retry: the browser automation policy blocks `chrome-extension://` pages, and the available Web session is admin. The user was asked to repeat Google translation in the affected free account; do not count admin-only success as free-account acceptance. Rollback uses the previous compatible Backend commit; no down migration is required.

## 2026-10-04 - Dev database migration catch-up

The owner requested migration catch-up after manually deploying dev Backend, Web and Core. The verified target was Render `gotit-postgres-dev` (`dpg-dar6fkp7lnhs73a7mspg-a`), database `gotit_dev`, separate from production. Backend source: `10602736bdf5422116eb838e57e9d708318156be`; Core source: `6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`. No application source changed.

A full database custom-format backup was created and validated with PostgreSQL 17 `pg_restore --list` (363 archive lines): local Backend `.local-backups/gotit-dev-full-before-migrations-2026-10-04T08-16-35-081Z.dump`, 12,006,890 bytes, SHA-256 `fb803ba84025b307986d10798793f32079828a53e4cf6bf2fac0fa09337e98b7`. Windows native certificate validation failed; backup succeeded using the documented Docker tooling with `verify-full` and system roots.

Core already contained all 24 source migration records. GotIt had 17 of 32. The existing administrator/schema owner `gotit_dev_user` ran the explicit GotIt up runner over verified TLS, applying the 15 migrations from `1789488017000_private-lesson-proficiency-evidence` through `1790800011000_english-unique-catalog`. No runtime credential was used for DDL and no role/security permissions were expanded. Repeating up returned zero pending migrations. Read-only schema preflight passed with strict-role enforcement disabled for the administrator connection; direct privilege inspection confirmed existing `gotit_runtime` DML on all 50 product tables. A direct runtime login to dev was not available; SET ROLE was rejected and no membership was granted. Normalization checked 120 learning items and 160 translations with zero mismatches. Catalog readback: 60 version-4 packs, 3,000 entries and 3,000 distinct English forms.

**Configuration discrepancy:** inspection of the dev Backend's existing `DATABASE_URL` identified production host `dpg-dagov2pt0dsc73a37me0-a` and database `rbase_core_db`, role `gotit_runtime`. No connection setting was changed. Readiness returned HTTP 200 for dev Backend, Core and Web, but Backend readiness therefore does not prove use of the newly upgraded dev database. Retargeting dev services requires the owner's pending decision and separate configuration validation; authenticated dev behavior remains unverified. Production database was not migrated by this task. Backend deploy `dep-db10kplg1s2s7380qu1g`, Core `dep-db10kq6gekts73bkv2p0` and Web `dep-db10kp0u01pc73c9ltj0` were observed Live for the owner's releases. Web source: `3ec2d2899e4cf6504e65aba01f19e425c9a87942`.

## 2026-10-01 — Tutor avatar Web rollout

Render `dep-davbpls9v7es73f6nk7g` reports `Deploy succeeded | Live` for exact
`gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd` (47.8s manual deploy).
Web/Backend `/ready`, `/private-lesson?free=1`, CSS, JavaScript and both new PNGs
returned 200. Generated PNG SHA-256 matches source; delivered pure component/helper
pose and silence smoke passed. No migration/configuration change. Google chooser
input timed out, so an authenticated live voice conversation was not started.
[Full verification and limits](25_TUTOR_AVATAR_MOTION.md).

## 2026-10-01 — Unique English catalog rollout (production verified)

Completed: validated full product/migration-metadata backup `gotit-product-full-before-unique-english-2026-10-01T19-27-38-494Z.dump` (SHA-256 `b2ae90a62f5fbee4882c3d5e8f781064d7219af1561a3a34c990dba152e7559c`); dedicated `migrate-provisioned` up and restricted runtime preflight; one migration row; 60 version-4 packs with 50 entries, 3,000 distinct English forms; 1,418 archived known and 51 archived links; 710 active known and 51 active links. Render `dep-davb9j9srm7s73bb3p70` is Live for Backend `10602736bdf5422116eb838e57e9d708318156be`. Public Backend `/ready`, `/health` and Web `/english-learning` returned 200; signed-in `ori` unit-3 preview opened with 50 entries and 48 known. Preserve the archive for recovery and use a reviewed forward fix for any future content/progress issue.

For Backend `10602736bdf5422116eb838e57e9d708318156be`, the rollout procedure was: validate a full `product_gotit` plus `gotit_migrations` backup; record current pack/progress counts; run `1790800011000_english-unique-catalog.js` with the dedicated `gotit_migrator`; confirm restricted-runtime preflight; inspect the migration record, 60 version-4 packs, 50 entries each, global uniqueness, archive and restored progress; deploy the exact Backend SHA; check readiness and authenticated unit content. These steps were observed above, with one signed-in unit-3 preview rather than first/last-unit browser coverage. No new API route or Web deployment was required. Do not run production down automatically: existing user progress requires a reviewed restore.

## 2026-10-01 - Bulk-known Web release

No Backend, migration or configuration change was needed for the final responsive footer. Render Web deployment `dep-davaakflot8c73cu3sig` reports `Deploy succeeded | Live` for exact SHA `gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c`. `https://gotit.rbaseapp.com/ready`, `/english-learning` and `https://gotit-backend.onrender.com/ready` each returned HTTP 200. In an authenticated production English path unit, two checked words enabled the bulk known action; the wider footer showed Hebrew Add, known and undo controls without a selected-word removal action. The checks were cleared and the modal closed; the unit stayed at 2/50 known. The previous corrected-copy deploy `dep-dava57ghfsis73c06h0g` had verified reversible bulk known/undo on the same two initially unknown words with the original 2/50 count restored.

## 2026-10-01 — Web auth persistence deployment

Render manual deployment `dep-dav9obaj9qps73e5j320` is Live for exact `gotIt-front@9fb80b2d02a3017511080eefbb3470e750968a4c`. Web and Backend `/ready` returned 200 and the production Web bundle includes the persistent refresh-token code. No Core, Backend, migration, or configuration rollout was needed. Authenticated browser restart smoke remains pending account-owner completion of the Google chooser.

## 2026-10-01 selected-word release

No database migration or configuration change was needed. Manual Render deploys `dep-dav9ef1srm7s73eegcng` (Backend `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`) and `dep-dav9f0lg1s2s73couufg` (Web `623202a3e1f5c51b71baf12bd1c78c4a0967860b`) both reported `Deploy succeeded | Live`. Public Backend and Web `/ready` each returned HTTP 200; `/english-learning` returned HTTP 200. Authenticated smoke in one unit selected two words, confirmed both bulk actions enabled, cleared the selection, removed one previously linked word and added it back. The modal was closed with no selection left.

## 2026-10-01 — Hebrew path preview Web deployment

Render Web deployment `dep-dav8pnk9v7es73fjv47g` reports `Deploy succeeded | Live` for exact source `gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c` after manual "Deploy latest commit". Public Web `/ready` and `/english-learning` returned HTTP 200. The served CSS `index-R3SsXn_J.css` and JavaScript `index-BqsjPd1-.js` returned HTTP 200; CSS contains the aligned preview/footer rules and JavaScript contains the new Hebrew title. A new production browser tab presented Login, so an authenticated visual unit-preview smoke was unavailable. No Backend deployment or migration was required.


## 2026-10-01 — Web release result

Render Web deployment `dep-dav4nrgjo6nc73fgnt9g` is Live for exact SHA `383482331ca895c1491123643138bd0973fd7395`. The public route and both service `/ready` endpoints returned 200; the served HTML, CSS and English path JavaScript expose the committed layout change. Database readback after smoke retained 213 corrections and zero known rows. The signed-in tab disappeared before a visual check of the new Web layout, so that check remains unverified; no additional production migration or backend deployment is needed.

## 2026-10-01 — Sense rollout verified; Web layout pending

The dedicated migrator applied backend migration `1790800010000`; readback found 213 corrected senses across 3,000 entries and no saved known rows before smoke. Backup identifiers and hashes are recorded in [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md). Render Backend `dep-dav4i2p7lnhs73aqouc0` is Live for exact SHA `10bf19712bc9831a77dd9672c5f78701577a2966`, restricted-runtime preflight passed, both `/ready` endpoints returned 200, and authenticated month/modal smoke passed. Next deploy Web `383482331ca895c1491123643138bd0973fd7395` and verify the single-word control visually in production.

## 2026-10-01 — Contextual English catalog rollout

After the already applied version-2 course migration, apply `1790800010000_english-communication-senses.js` with the dedicated `gotit_migrator` credential, then deploy Backend `10bf19712bc9831a77dd9672c5f78701577a2966`. Take and validate a fresh product/migration-metadata backup, preflight the restricted runtime, verify the migration row, 60 units/3,000 entries, selected version-3 packs and `May` versus `may`, both `/ready` endpoints, and an authenticated known-word sense smoke. Web `cbc5bac2a374e150c3d1ef31e77041cba27f387e` already contains the one-click controls. Production result is pending at this source checkpoint; do not run a destructive down in production.

## 2026-10-01 — English migration retry after role-boundary failure

The initial `node scripts/migrate-provisioned.js gotit-v1-up` stopped with SQLSTATE 42501 (`permission denied for schema core`) in the known-entry table migration. No catalog version change was observed afterward. `gotIt-backend@8db500a5594fbc99c1d3e104701b31bd37c372b0` moves the new FK to `product_gotit.user_profiles` so the existing dedicated migrator can apply it without Core schema access. Fresh local schema and full product/migration-metadata backups were created and `pg_restore --list` validated the full archive: `gotit-schema-before-v1-2026-10-01T11-32-28-745Z.dump` (SHA-256 `2c4623432c9d0a168c6e564c230f68deb38c776c5204eb4781919d9b8def826d`) and `gotit-product-full-before-named-english-2026-10-01T11-32-28-741Z.dump` (SHA-256 `c0c508b726a1055f6c0f2b247d296698fc367525a5b629c1f3ba94555d1f2375`). Recheck path installations/links, retry the dedicated migration, then verify schema/catalog and deploy Backend/Web. Do not grant the migrator Core access or use runtime credentials for migration.


## 2026-10-01 — Named English catalog rollout pending

For `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b`, run the additive known-state migration and guarded version-2 catalog migration with the dedicated migrator after a fresh product/migration-metadata backup. The Backend runtime role cannot run DDL, and startup does not migrate. Read-only precheck found 60 version-1 English packs and zero installed/linked entries; recheck immediately before migration because the content replacement aborts if a learner has begun a pack. Deploy Backend only after both migrations, then deploy the matching Web source. Verify exact source SHAs, both `/ready` endpoints, 60 titled packs with 50 entries, representative early words, an authenticated `PUT .../known` and a pack practice session on a test user. Do not run production down automatically. Production migration/deploy not yet verified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## תיקון רצף השיעור — 2026-09-30

תיקון רצף השיעור דורש Web עם סכמת הוראות מורחבת; יש לפרוס אותו לפני או יחד
עם Backend שמחזיר הוראות מלאות. Web החדש תואם תגובה ישנה ללא continuationEvent.
אין מיגרציה או משתנה סביבה חדש לתיקון. נדרשת בדיקת קבלה קולית לאחר פריסה: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## מסלול שחרור קורסים — נוסף 2026-09-30, טרם הופעל

יש להריץ backup → migrations up בתפקיד ייעודי → preflight בתפקיד runtime → Backend → Web.
preflight כולל את הטבלאות והשדה החדשים. משתמשים במשתני OpenAI הקיימים; אין צורך
במפתח חדש בצד הלקוח. יש לבדוק בניית קורס, תמלול קצר, שני אישורים והמשך בית מול
המודלים המוגדרים בסביבת בדיקה. מגבלות גוף לתמלול עודכנו בשרת וב־gateway.
אין לבצע down בייצור: הוא מוחק נתוני קורס/בית. [פירוט 22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. סביבות

| סביבה | מטרה | נתונים/ספקים |
|---|---|---|
| local | פיתוח מהיר | Docker PostgreSQL, providers אופציונליים |
| test | unit/integration | DB חד־פעמי, fakes ללא רשת |
| staging | migration ו־acceptance | credentials/catalog נפרדים |
| production | משתמשים אמיתיים | Render + managed PostgreSQL |

אין להשתמש ב־Production DB לבדיקות. staging צריך application/OAuth/Paddle
catalog נפרדים כדי למנוע זליגה.

## 2. Services ו־Ports

| Service | Local | Health | Ready |
|---|---|---|---|
| Core | `localhost:8080` | `/health` | `/ready` |
| GotIt Backend | `localhost:3001` | `/health` | `/ready` |
| Front/Gateway | Vite dev או `:10000` | `/health` | `/ready` |

Extension development נבנה עם endpoints local דרך `npm run build:dev`.

## 3. פקודות איכות ובנייה

```powershell
# Core
npm ci
npm run typecheck
npm test
npm run build
npm run test:integration

# GotIt Backend
npm ci
npm run typecheck
npm test
npm run build
npm run test:integration
npm run preflight

# Web
npm ci
npm run check
npm run test:responsive

# Extension
npm ci
npm run verify
npm run package
```

ב־Windows ניתן להשתמש ב־`npm.cmd` אם execution policy חוסם `npm.ps1`.

לשחרור Chrome Web Store מעלים רק `gotIt-chrome/artifacts/gotit-chrome-WEBSTORE-v<version>.zip`
לפריט הקיים. `dist/manifest.json` כולל מפתח ציבורי לזהות מקומית קבועה ואינו
מיועד להעלאה. `npm run package` בודק גם את ה־manifest בתוך ה־ZIP הסופי.
יש לבדוק את ה־ZIP בפרופיל Chrome נקי ואת מסלולי התרגום וההגדרות בחשבון מחובר
לפני הגשה לבדיקת החנות. בניית ZIP מקומית אינה פרסום בחנות.

## 4. Migration Runbook — GotIt

1. ודא commit/image מדויקים ו־maintenance window.
2. הפעל managed backup ו־`backup:production-schema`.
3. הרץ `audit:normalization` ו־`preflight` עם runtime read credentials.
4. הגדר `GOTIT_MIGRATION_DATABASE_URL` ל־migrator בלבד.
5. הרץ `npm run migrate:up` כ־one-off job.
6. אמת metadata, expected tables/columns/indexes ו־grants.
7. פרוס image; עקוב אחרי `/ready`, errors, latency ו־pool.
8. הרץ smoke authenticated לכל flow שהשתנה.
9. הסר migrator credential מה־job/runtime.

אין fallback מ־migration URL ל־runtime DB URL, ואין migrations ב־GotIt startup.

## 5. Deployment Order

לשינוי backward-compatible:

```text
DB additive migration → Core (אם נדרש) → GotIt Backend → Web → Extension
```

הרחבת response לפני לקוח בטוחה רק אם parser תומך. הסרת שדה/enum דורשת rollout
דו־שלבי. Extension מהחנות מתעדכן באיחור ולכן backend חייב חלון compatibility.

## 6. Render Topology

- Core: Docker, port 8080, managed DB, migration בזמן container start כיום.
- GotIt: Docker, health `/ready`, no implicit migration, max shutdown 90s.
- Front: Docker static build + Node gateway, health `/ready`.
- HTTPS/TLS מנוהל על ידי Render.
- provider credentials ו־DB URLs הם secret env values, לא repo settings.

## 7. Observability

### חובה בלוג

- timestamp, level, service, environment, request ID.
- route template, method, status, duration.
- safe error code ו־dependency class.
- provider ID/model/status/latency בלי prompt/body.
- migration version/start/end.

### אסור בלוג

Authorization/cookies/tokens, passwords, raw request body, selected context,
DB URL, JWT/provider secrets, raw audio ו־Paddle payload מלא.

### Metrics מוצעים

- request rate/error/latency לפי service/route.
- Core auth latency ו־unavailable rate.
- DB pool wait/query timeout/deadlock.
- provider success/rate-limit/timeout/cost.
- capture preview→save, replay/conflict.
- practice attempt transaction failures.
- reading quota/use ו־lesson completion.
- billing webhook lag/failure.

Alerting thresholds ו־on-call integration עדיין דורשים החלטה.

## 8. Incident Runbooks

### Core לא זמין

אמת `/health` ו־`/ready`, DB, deployment ו־logs. אל תעקוף auth. Web/Extension
מציגים זמנית unavailable. לאחר התאוששות אמת refresh ו־GotIt auth call.

### GotIt DB לא זמין

`/ready` יורד. עצור deploy נוסף, בדוק pool/managed DB/storage/connections.
אין לבצע migration/down בזמן incident ללא owner ו־backup.

### Provider outage

זהה class: auth/billing/permission לעומת timeout/rate/upstream. בטל feature דרך
config רק אם safe; manual capture/library נשארים. אל תחליף ספק בלי data/privacy review.

### חשיפת secret

בטל/סובב אצל הספק, עדכן Render, deploy/restart, חפש שימוש ולוגים, revoke sessions
אם JWT/session material נחשף, תעד impact והודעות נדרשות.

### Paddle drift

עצור שינוי catalog, שמור גישה קיימת לפי policy, בצע reconciliation של webhook,
subscription ו־transaction IDs; אין לערוך DB ידנית בלי audit.

## 9. Backup/DR

נדרש להחליט ולבדוק:

- RPO/RTO לכל service;
- retention והצפנת backups;
- restore staging רבעוני;
- export של schema/grants/migration metadata;
- failover DNS/provider plan;
- owner ותיעוד החלטה לכל restore Production.

## 10. Production Acceptance

- register/login/Google/Facebook/refresh/logout.
- trial/status/plans, checkout sandbox/live smoke ו־portal.
- capture manual/provider, merge/new sense/replay.
- library edits/bulk/restore/pack.
- כל practice mode, queue, XP ו־dashboard.
- reading preview/open/quota/quiz.
- speech/microphone במכשירים אמיתיים.
- private lesson timer/wrap-up/report/continuity.
- export/import חלקי.
- Web deep links, CSP, mobile/RTL.
- Extension unpacked + Web Store candidate.

## 2026-10-01 vocabulary reading-guide release evidence

Render showed Backend deployment `dep-dauope8jo6nc73e0n2dg` Live for
`gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0` and Web
deployment `dep-dauormu0tbcc73c43lkg` Live for
`gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe`. Backend and
Web `/ready` returned HTTP 200. The live vocabulary page showed aligned
English/Hebrew guides and, after a guarded account-scoped production data
backfill, Arabic/Hebrew guides in the list and detail. Readback confirmed
12/12 active Arabic-to-Hebrew items with `transliteration:he`. This data
change used existing columns; it required no migration or service deploy.

## 2026-10-01 English learning path catalog rollout

For `gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f`, the existing dedicated migrator applied `1790800006000_daily-english-catalog.js` then `1790800007000_english-learning-path.js`. Ordinary Render commit deployment and backend startup did not insert the catalog. Keep production down migrations out of automatic rollback; the follow-up down rejects user installations/progress.

Deployment observation: Backend `dep-dav2078473hc73d6n53g` at `74eb91d` and Web `dep-dav20jo473hc73d6okp0` at `4da3411` completed. The first live check found 9 topics and an empty route. The ignored local `.env.production.generated` file held the dedicated role connection; the Render runtime service did not. Render Free Recovery reported no managed backups, so local schema and full product/migration-metadata dumps were created and checked with `pg_restore --list` before mutation (filenames and SHA-256 in [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md)). Read-only normalization and runtime preflight passed. `node scripts/migrate-provisioned.js gotit-v1-up` applied the two pending migrations and returned passing preflight. Readback found 10 topics, 3 new tracks, 60 packs, and 3,000 entries of 50 per pack. Both `/ready` checks returned 200, and an authenticated browser showed all levels and first/last previews. No user-account installation was performed; production installation smoke on a separate test account remains pending.

## 2026-10-01 Facebook Login activation

2026-10-02 owner-account acceptance: Core Facebook exchange returned 200 twice; `/auth/me` and GotIt `/profile` returned 200, logout returned 204 and a subsequent Facebook login succeeded. The owner's authenticated learning page was observed. Invalid-token gateway smoke remains 401. Current Core environment deployment is `dep-davots49v7es738kolqg` at `6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`. Public Meta publication/non-role-account acceptance remain blocked by incomplete business verification; [canonical request/timing evidence](24_FACEBOOK_LOGIN_ROLLOUT.md).

2026-10-02 repair: the actual current Meta credential replaced the mismatched GotIt entry in Core's secret environment configuration. Environment deployment `dep-davots49v7es738kolqg` is Live at `core-platform@6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`; Core/Web readiness and login HTTP checks passed. New-runtime Meta client-credential validation returned 200 with a token present, without recording its value. Repeat this positive app-credential check after future secret updates; a synthetic-invalid-user-token 401 is insufficient. Fresh account exchange and public verification/publication remain pending. See the [canonical rollout checkpoint](24_FACEBOOK_LOGIN_ROLLOUT.md).

2026-10-02 verification after the owner update: Core `dep-davojrmgekts73escndg` is Live at `6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6` and public readiness passed, but Meta still rejects the runtime app credential. The active value has 8 characters. Current Meta-secret comparison requires owner password re-entry; positive exchange remains pending. See the [canonical rollout checkpoint](24_FACEBOOK_LOGIN_ROLLOUT.md). No source or schema changed.

Live diagnosis after the deployed popup fix: Meta accepts the user's token for the correct app, future expiry, email scope and email, but rejects the active Core runtime App Secret with `Error validating client secret.` The owner must enter the current Meta secret in production Core `FACEBOOK_APP_SECRETS` and save/rebuild/deploy, then repeat app-credential validation and a fresh real-account exchange. A synthetic-invalid-token 401 alone cannot establish a valid server secret. Keep credentials out of command output and documentation. The [rollout record](24_FACEBOOK_LOGIN_ROLLOUT.md) owns diagnostic evidence.

Latest deployment checkpoint: `gotIt-front@7c956aa2e517aed331d98ce9228860bb1afb8f3c` is Live as `dep-davbhmqd0e5s73fbfn5g`. Readiness, login and served-bundle HTTP smoke passed; the production button opens Meta's consent popup and an unanswered attempt times out with retry. Real-account exchange remains pending. Meta's app verification screen exposes only incomplete business verification; the owner has no registered business, so public publication remains blocked pending a supported verification path. The [rollout record](24_FACEBOOK_LOGIN_ROLLOUT.md) owns current evidence.

Current checkpoint: `gotIt-front@8423c90012bd803bf4f9c231559fa1226c21c792` waits for full SDK readiness and permits retry after a blocked bundle; local check passed (167 Vitest, 16 gateway, typecheck/lint/build), production deployment pending. Core environment deployment `dep-davb4unavr4c73b9ing0` after the owner-reported secret replacement is Live at `6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`; readiness and invalid-token smoke passed. Meta portfolio is connected but Unverified, and publication remains disabled. The historical checkpoint below is superseded by the [rollout record](24_FACEBOOK_LOGIN_ROLLOUT.md).

Follow [the Facebook rollout record](24_FACEBOOK_LOGIN_ROLLOUT.md) for the Meta app settings, Core provider configuration, server-only App Secret, Web deployment and live smoke checks. After the owner-reported secret reset and configuration replacement, Core environment deployment `dep-davb4unavr4c73b9ing0` is Live at `core-platform@6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`; readiness returned 200 and the synthetic invalid-token request returned 401 `FACEBOOK_TOKEN_INVALID`. Meta icon is saved, but business verification keeps Publish disabled. The replacement secret's real-token exchange remains unverified; never put the secret in Web, logs or documentation.

2026-10-02: Web `3fa4da4f31023682c9308d686fb04dbb0676b590` manually deployed on Render service `srv-dal8smbm8hqs73fabfng`, deploy `dep-davom667bikc73ese7e0`, Live in 41.2s. Readiness and delivered slower-lip code smoke passed. [Evidence and limits](25_TUTOR_AVATAR_MOTION.md).

2026-10-02 follow-up: Web `3ec2d2899e4cf6504e65aba01f19e425c9a87942` deployed manually on service `srv-dal8smbm8hqs73fabfng`, deploy `dep-davp0egu01pc73fjqnig`, Live in 1m18s. Production readiness and delivered visual timing smoke passed. [Evidence and scope](25_TUTOR_AVATAR_MOTION.md).
