# 10 — תשתיות, פריסה ותפעול

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
