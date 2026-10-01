# יומן שינויים

## 2026-10-01 - Readable bulk-action footer

- `gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` widens the English unit preview and lays out its five footer actions in a responsive grid. This follows an authenticated live check in which the new long Hebrew labels were readable but compressed into narrow vertical buttons. Local Web check passed (165 Vitest, 16 gateway, typecheck, lint, build); targeted 320px/525px/desktop responsive Playwright passed 1/1 with a minimum action width assertion. This CSS release's deploy is pending at the source checkpoint.
- The preceding corrected-copy Web release `e5192422075850a7db6c64134a13565d3c3acf58` reached Live in Render `dep-dava57ghfsis73c06h0g`. Web and Backend `/ready` and `/english-learning` returned 200. Authenticated smoke bulk-marked `illegal` and `regulation` known, then bulk-unmarked them; both row states and the unit's original known count (2/50) returned.

## 2026-10-01 - Repair Hebrew bulk-known labels

- `gotIt-front@e5192422075850a7db6c64134a13565d3c3acf58` restores four Hebrew strings that were encoded as question marks in the first bulk-known release and adds an exact-copy regression. Web check passed (165 Vitest, 16 gateway, typecheck, lint, build); focused i18n/live tests passed 30/30 after incorporating the unrelated Facebook Login commit. The first bulk-known Render deployment `dep-dav9s5btqb8s73d0bvd0` was Live for `4512a93` but its Hebrew bulk buttons displayed question marks; this fix's deployment and authenticated smoke are pending at this source checkpoint.

## 2026-10-01 - GotIt Facebook Login configuration in progress

- `gotIt-front@c5c6e0173515a1de05baf55a3f4c56c2452e0722` supplies Meta App ID `2207127606520765` when the build override is blank, so the Facebook button can initialize the SDK. The regression covers the blank override. Local `npm.cmd run check` passed: typecheck, lint, 164 Vitest tests, build, and 16 gateway tests.
- Meta app `gotit` has `email` ready for testing, JavaScript SDK login enabled, allowed domain `gotit.rbaseapp.com`, exact root redirect URI, and the GotIt privacy, terms and deletion-instructions links. Core production's `gotit` Facebook provider row was set to the same App ID and read back enabled. Render Web deployment `dep-dav9uak1nsns73at2gk0` is Live at the exact source commit; `/ready`, `/` and the served JavaScript returned 200, and the bundle contains the App ID and SDK loader. App Secret configuration, Meta publication and live sign-in smoke remain pending; see [Facebook rollout](docs/24_FACEBOOK_LOGIN_ROLLOUT.md).

## 2026-10-01 - Selected English words: known and undo actions

- `gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` keeps multiword checkboxes and Add selected, replaces Remove selected with bulk I already know and Undo known actions, and clears the checks only after a successful known-state write. It uses the existing protected `PUT /word-packs/:id/known`; the Backend empty-selection add contract remains available but is no longer a preview removal action. Local check passed (164 Vitest, 16 gateway, typecheck, lint, build), and targeted 320px/525px/desktop responsive Playwright passed (1/1). Production deployment and authenticated smoke pending at this source checkpoint.

## 2026-10-01 — Persistent Web sign-in, locally verified

- `gotIt-front@9fb80b2` stores the rotating refresh token in browser local storage, migrates existing tab storage, and restores the account after a browser restart. Logout clears both stores; an invalid session still requires sign-in. Transient startup network failures retain the token for a later retry. Core's existing session expiry remains 30 days by default from login; no Core API or database change. Focused tests passed 23/23, typecheck, lint, build, gateway 16/16 and targeted formatting passed. The full Vitest run had one unrelated English unit test failure on concurrent uncommitted edits. Authenticated restart smoke pending.
- Render Web deployment `dep-dav9obaj9qps73e5j320` reports `Deploy succeeded | Live` at exact source `9fb80b2d02a3017511080eefbb3470e750968a4c`. Web and Backend `/ready` returned 200; the served Web bundle `/assets/index-D9vzuLtW.js` contains the persistent `gotit.refresh` path. Authenticated browser close/reopen smoke awaits completion of the Google account chooser by the account owner.

## 2026-10-01 - Multiword unit controls deployed

- Render Backend `dep-dav9ef1srm7s73eegcng` is Live at `gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`; Web `dep-dav9f0lg1s2s73couufg` is Live at `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b`. Both `/ready` endpoints and `/english-learning` returned HTTP 200. An authenticated production unit preview displayed selection controls; two checks changed the selected count and action states. A linked word was removed and re-added, with the original removable state restored.

## 2026-10-01 - Multiword controls in the English unit preview

- `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` adds checkboxes, select all/clear, and add/remove-selected actions in SCR-16. Existing linked words remain included when adding a subset; removal affects checked linked words only, including the final link through Backend `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`. Web check passed (161 Vitest, 16 gateway, typecheck, lint, build); two targeted Playwright layout checks passed. Production Web deploy and authenticated smoke are pending.

## 2026-10-01 — Empty word-pack selection supported in Backend source

- `gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` allows `POST /api/v1/word-packs/:id/add` with `{"entryIds":[]}`. The existing transactional replacement of the pack selection can now exclude its last linked word while retaining the installed unit. Backend typecheck, build, 207 fast tests, 59 PostgreSQL integration tests and targeted formatting passed. Production deploy and authenticated selection smoke are pending.

## 2026-10-01 — Hebrew path preview Web deployed

- Render Web `dep-dav8pnk9v7es73fjv47g` is Live for exact `gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c`. Public `/ready`, `/english-learning`, CSS and JS returned 200; the served assets contain the new preview layout and Hebrew title. A fresh browser tab showed Login, so authenticated visual unit smoke remains unverified.


## 2026-10-01 — Hebrew path name and unit preview alignment

- `gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c` changes the Hebrew path label to "לימוד שפה מאפס" in navigation and the heading. The 50-word preview aligns word, meaning and known buttons and keeps the footer controls padded within the modal on short screens. Local `npm.cmd run check` passed (160 Vitest, 16 gateway, typecheck, lint, build); two targeted Playwright checks passed at 320px, 525px and desktop. Production deploy and visual smoke are pending at this checkpoint.


## 2026-10-01 — English preview Web deployment

- Render Web deployment `dep-dav4nrgjo6nc73fgnt9g` reports `Deploy succeeded | Live` for exact source `gotIt-front@383482331ca895c1491123643138bd0973fd7395`. Public `/ready` returned 200, `/english-learning` returned 200, and the served CSS plus dynamically imported English path JavaScript contain the scoped row layout. Backend `/ready` remained 200; readback still found 213 corrections, 3,000 entries and zero known rows after reversing the smoke mark. The prior authenticated browser tab was lost before a post-Web visual check, so the button's production rendering has not been visually confirmed after this Web deploy.

## 2026-10-01 — English preview known-button layout

- `gotIt-front@383482331ca895c1491123643138bd0973fd7395` gives each English-path preview row a two-column layout so the single-word known button stays on one line at desktop and 320px phone widths. Component and layout regressions were added. `npm.cmd run check` passed (160 Vitest, 16 gateway, typecheck, lint, build); 375/375 Playwright responsive checks passed. Web deploy pending at this source checkpoint.
- Backend `10bf19712bc9831a77dd9672c5f78701577a2966` is Live in Render deployment `dep-dav4i2p7lnhs73aqouc0`. The dedicated migration applied and readback confirmed all 213 corrections, 3,000 entries and zero pre-existing known rows. Backend/Web `/ready` returned 200; authenticated browser smoke saw the corrected meanings and kept month `May` independent of modal `may`.

## 2026-10-01 — Contextual meanings in English units

- `gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966` adds forward migration `1790800010000` for 213 contextual Hebrew corrections in the supplied 60-unit course. Affected packs move from version 2 to 3. Already-known propagation now requires the same normalized English expression and Hebrew meaning, keeping month `May` separate from modal `may`.
- Local typecheck, build, 207 fast tests, 59 PostgreSQL integration tests and targeted formatting passed. Production migration and exact-SHA deploy are pending in this source record. See [English path](docs/23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English known-state migration role fix

- `gotIt-backend@8db500a5594fbc99c1d3e104701b31bd37c372b0` changes the new known-entry FK to the GotIt profile and initializes that profile on first known-word action. The first production migration attempt had stopped at a Core schema permission denial before catalog replacement; no extra Core grant is required.
- Local typecheck, build, 206 fast tests, 59 PostgreSQL integration tests and targeted formatting passed. Production migration retry and deployment pending. See [English path](docs/23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 — English named-unit and known-word Web controls

- `gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` adds named unit cards, one-click whole-unit and per-word known toggles, completed/known progress and unknown-only unit installation on `/english-learning`. Hebrew and English copy plus six English fallback locale catalogs are included.
- Local `npm.cmd run check` passed (160 Vitest, 16 gateway, typecheck, lint, build); 374 Playwright responsive checks passed. Production deployment and authenticated smoke remain pending. See [English path](docs/23_ENGLISH_LEARNING_PATH.md).


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
