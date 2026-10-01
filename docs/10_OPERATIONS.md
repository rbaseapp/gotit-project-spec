# 10 — תשתיות, פריסה ותפעול

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
