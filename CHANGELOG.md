# יומן שינויים

## 2026-10-01 — Supplied English units and known-word backend

- `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` replaces the English path catalog with 60 named thematic units (50 entries each) and adds a protected one-action known-word API, cross-unit propagation for repeated English forms, completed counts and pack-practice omission. It preserves evidence/XP and guards the content migration against existing learner progress.
- Local gates passed: typecheck, build, 206 fast tests, 59 disposable PostgreSQL integration tests and targeted formatting. Repository-wide formatting reports 36 pre-existing files. Production migration, deployment and authenticated smoke remain pending. See [English path](docs/23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 - Remove duplicate shell level card and live notice

- `gotIt-front@d2d59437d57580ba3e9db5b8cdc933baf798b2db` removes the sidebar lesson-level card and the generic live-account notice. The latest lesson assessment remains linked in the top bar; Free read-only and demo notices remain. `test/app-shell.test.tsx` covers the reported duplicate and both retained notice states. Local `npm.cmd run check` passed typecheck, lint, 159/159 Vitest tests, production build, and 16/16 gateway tests; `npm.cmd run test:responsive` passed 374/374 Playwright checks. No API, schema, or configuration change.

Render deployment `dep-dav3tlnpn0mc73a0fp90` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/dashboard` browser reload showed the English A2-B2 assessment in the top bar, no sidebar assessment card, and no generic live-account notice.

## 2026-10-01 — Chrome Web Store ZIP 1.4.4 with separate local identity

- `gotIt-chrome@e8d70a45246d7a191e66e784bb0a47774d8076f6`: the local unpacked build retains its stable public key; the Store package is now named `gotit-chrome-WEBSTORE-v1.4.4.zip` and its archived manifest is checked for the expected version and absence of `manifest.key`. A failed archive check removes the ZIP. The README identifies the correct upload file.
- Local verification passed: typecheck, 39/39 tests, unpacked identity check, Store package build, and independent ZIP inspection (one root manifest, version 1.4.4, no key or sourcemaps). This is a prepared local artifact, not a Chrome Web Store upload or published release. Authenticated translation and settings smoke from the Store package remains pending.

## 2026-10-01 — English unit cards identify their level

- `gotIt-front@66767de` displays Basic, Good, or Advanced on every English path unit card, including cards viewed after their section heading scrolls offscreen. Production data confirms `satellite` belongs to Advanced unit 5 (COCA rank 3117), not Basic unit 5. The regression renders Basic and Advanced cards together and checks both labels. Local `npm.cmd run check` passed: typecheck, lint, 157 Vitest tests, build, and 16 gateway tests. Render deployment `dep-dav2m90jo6nc73f7uefg` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200; an authenticated browser showed the level name in Basic and Advanced cards and opened Advanced unit 5 with `satellite` in its 50-entry preview.

## 2026-10-01 — English learning path activated in production

- `gotIt-backend@74eb91d` migrations `1790800006000` and `1790800007000` ran through the existing dedicated `gotit_migrator` credential in an ignored local generated environment. Production readback found 10 topics, the named `en`/`he` path, 3 tracks, 60 packs of exactly 50, and 3,000 entries. Authenticated browser smoke displayed all levels and first/last pack previews; both `/ready` endpoints returned 200. A 50-entry installation on a separate test account remains untested.
- Render Free has no managed backup. Before the additive migration, local schema and full product/migration-metadata dumps were created and checked with `pg_restore --list`; normalization audit and runtime preflight passed. See [rollout evidence](docs/23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English path deployments; initial data gap

- Render Backend `dep-dav2078473hc73d6n53g` deployed `74eb91d`; Web `dep-dav20jo473hc73d6okp0` deployed `4da3411`. Both `/ready` endpoints returned 200; live navigation and `/english-learning` were observed.
- The first live check found 9 `word_topics` and an empty path. The dedicated credential was subsequently found in the ignored local provisioning file and the catalog was migrated; see the activation entry above.

## 2026-10-01 — Free removed from selectable billing offers

- `gotIt-front@196cf9593cda52360160d620d02091071b421ce5` keeps Core-assigned Free in the current-plan summary and removes its offer card. Paid subscriptions and the one-time minutes pack remain selectable; no API or data contract changes.
- Local `npm run check` passed: typecheck, lint, 157 Vitest tests including Free and paid status regression, build, and 16 gateway tests. Render deployment `dep-dav2137pn0mc739o6l30` reported `Deploy succeeded | Live` for the exact Web SHA. Production `/ready` and the new `BillingPage-CkcRmmd0.js` asset returned 200; the served asset retains the current-plan marker and omits the Free-offer marker. Authenticated billing UI smoke was unavailable because the test tab had no session.

## 2026-10-01 — Dedicated English learning path in Web source

- `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af` adds `/english-learning` with three levels, ordered 50-item units, progress, next unit, preview, and direct practice. The general word-pack screen links to the path and no longer lists these course units as generic packs.
- Web typecheck, lint, 155/155 Vitest tests, build, and 16/16 gateway tests passed. Production deployment, authenticated path smoke, and database migration remain unverified. See [English path](docs/23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English learning path catalog correction

- `gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f` adds a versioned follow-up migration to rename the catalog "מסלול לימוד אנגלית" and correct 72 Hebrew catalog meanings while preserving installed learning items.
- Local backend typecheck, 204 fast tests, build, and 26 PostgreSQL integration subtests passed. Production migration and smoke are pending; see [path handoff](docs/23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Initial English catalog in source

- `gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a` adds a Hebrew-to-English catalog of three 1,000-entry tracks, 60 units of 50, and migration `1790800006000_daily-english-catalog.js`.
- Source commit and regression test are present. Production migration, catalog availability, and exact-commit smoke are unverified. The dedicated course screen and course-oriented label requested afterward remain to be implemented. See [English learning path handoff](docs/23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Smart review matching rotation

- `gotIt-backend@d659b274397421685ff840c9013437a366ab1718` makes successful drag-board words rotate across days using the last current-revision matching success. Eligible words without a matching success come first; the learning algorithm version is `gotit-v1.3`. No schema or API payload change.
- The reported account has persisted matching successes for the pictured words, confirming the repeat was a queue-order issue rather than a missing attempt write. The two-day PostgreSQL regression passed, as did 203 fast tests. Full integration and global quality gates have unrelated existing failures.
- Deployment follow-up: Render `dep-daup51s9v7es73aeastg` reported `Deploy succeeded | Live` for the exact source SHA. `/health`, `/ready`, and `/api/v1` returned 200. Read-only evaluation of the committed queue service against the reported account's production data returned `gotit-v1.3-e531b7086602` and selected `maintenance`, `sanction`, `mediation` instead of the three words in the screenshot. An authenticated HTTP queue request was unavailable in this session; this verification does not claim an end-to-end browser review submission.

## 2026-10-01 — Reading guide alignment

- `gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe` keeps the
  English expression and Hebrew reading guide together in RTL layouts.
- Local Web check passed: typecheck, lint, 154 Vitest, build, 16 gateway.
  Render deployment `dep-dauormu0tbcc73c43lkg` was observed Live and the
  corrected alignment was confirmed in the live vocabulary browser.

## 2026-10-01 — Web vocabulary reading guides

- `gotIt-front@c585b8860756e739859137d6e391643c321c5282` displays
  stored learner-script guides below source expressions in the live list and
  detail. It tolerates older API responses and omits unrelated phonetic schemes.
- Local Web check passed: typecheck, lint, 154 Vitest tests, build and
  16 gateway tests. The initial Web deployment was observed Live, followed
  by the alignment correction and live browser smoke.

## 2026-10-01 — Backend vocabulary reading guides

- `gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0` exposes
  existing phonetic text and scheme on owner-scoped library list items.
- The requested account's 84 active English words received Hebrew-script
  reading guides in production data; scoped readback confirmed 84/84.
- Local verification: backend typecheck, 201 fast tests, 26 PostgreSQL
  integration tests and build passed. Backend deployment
  `dep-dauope8jo6nc73e0n2dg` was observed Live; `/ready` returned HTTP 200.
- Follow-up: the same account's 12 active Arabic-to-Hebrew items received
  Hebrew-script reading guides in production data. Scoped readback confirmed
  12/12 and live vocabulary list/detail smoke showed the guides. New captures
  still require an automatic generation path.

## 2026-09-30

- תיקון איכות שיעור פרטי לפי דיווח משתמש: שפת יעד בפתיחה, הסבר לפני תרגול,
  מניעת לולאות חזרה והמשך מונחה אחרי שתיקה. כל הוראת Realtime יזומה שומרת את
  ההקשר הפדגוגי המלא. נוספו בקר השמעה/דיבור ובדיקות רגרסיה ב־Backend/Web;
  [PLQ-01–05, סעיף 9](docs/22_PERSONAL_COURSES_IMPLEMENTATION.md). אין טענת פריסה או קבלה קולית חיה.

- מימוש מקומי של [קורס אישי ושיעורי בית](docs/22_PERSONAL_COURSES_IMPLEMENTATION.md):
  שיחת AI בכתב/קול, העדפות שמורות ושני אישורים, תוכנית מלאה וגרסאות, רצף שיעורים,
  סיכום תמציתי ותרגול אחד בכל פעם עם שמירה, רמז ומשוב. נוספו API, מיגרציה ושמונה תרגומי UI.
  נבדקו Backend, Web, PostgreSQL disposable ומסכי Edge; אין טענת פריסה או אימות ספק חי.
  תוקנו גם ספירות קטלוג API וטבלאות ובדיקות integration שהתיישנו. פירוט ראיות ב־docs/11.

- הרחבת [אפיון הקורס האישי](docs/21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md) לפי בקשת המשתמש:
  סשן היכרות אינטגרלי עם מורה AI בכתב ובקול, שמירת העדפות והצגתן לאישור לפני יצירת מפת הדרכים,
  ולאחריה אישור התוכנית או בקשת שינויים. נוספו PC-19–PC-28 ומסכי SCR-PC-00A–00B.
  תיעוד בלבד; ההמחשה הקודמת וקוד המוצר לא הורחבו בסבב זה.

- הוספת [אפיון מוצע לקורס אישי ושיעורי בית](docs/21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md):
  כל היחידות ותוכנן גלויות בעת היצירה, תוכנית בעלת גרסה, חבילת תרגול מקושרת לכל שיעור,
  שמירה והמשך, משוב וקשר לשיעור הבא. כולל PC-01–PC-18; שינוי תיעוד בלבד, ללא טענת מימוש או פריסה.

- הרחבת האפיון לרמת תעשייה וניהול: Project Charter, בעלי עניין, CTQ, שרשרת ערך,
  SIPOC, קטלוג תהליכים, Service Blueprint, RACI, KPI Dictionary, FMEA ו־governance.
- הוספת קטלוג As-Built מפורט של היכולות הנוכחיות בכל ארבעת הרכיבים.
- הוספת קטלוג מסכים עם routes, wireframes, מקורות נתונים, פעולות, הרשאות,
  מצבי loading/error/empty/locked וקריטריוני קבלה.
- הוספת קטלוג דרישות פורמלי עם מזהי BR/FR/NFR, עדיפויות, acceptance וסטטוס,
  וכן קטלוג Use Cases מפורט לתהליכים המרכזיים.
- הוספת 11 UML Sequence Diagrams בפורמט PlantUML עבור Auth, refresh, capture,
  practice, semantic edit, reading, private lesson, billing, word packs, transfer ו־deployment.
- החלפת `AGENTS.md` במדריך AI מלא הכולל source-of-truth hierarchy, invariants,
  סטטוס working tree, workflow, impact checklists, quality gates ו־handoff format.
- תיעוד מפורש של המעבר הלא־שמור מ־Anthropic ל־OpenAI עבור AI Reading כ־WIP
  בבעלות המשתמש, ללא הצגתו כ־baseline יציב או deployment.

## 2026-09-29

- יצירת פרויקט האפיון המאוחד.
- מיפוי ארבעת מאגרי הקוד לפי ה־commits המופיעים ב־README.
- תיעוד ארכיטקטורת Core + Product Backend + Web + Chrome.
- תיעוד חוזי API, 13 טבלאות Core ו־37 טבלאות `product_gotit`.
- הוספת מודל אבטחה, תפעול, בדיקות, roadmap ומטריצת עקיבות.
- זיהוי פער: קטלוג `GET /api/v1` ב־GotIt מפרסם 49 נתיבים, בעוד שבקוד קיימים
  56 handlers מוצריים; שבעת נתיבי ניהול השיעור הפרטי החדשים חסרים בקטלוג.
