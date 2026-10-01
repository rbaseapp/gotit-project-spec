# 11 — אסטרטגיית בדיקות ואיכות

## 2026-10-01 — Hebrew path preview production check

Render `dep-dav8pnk9v7es73fjv47g` is Live for exact Web SHA `5dd490426768c983c8eef368e2f512ea2b9a780c`. Public `/ready`, `/english-learning`, served CSS and JavaScript returned 200. CSS includes the new modal footer and fixed action-column rules; JavaScript includes "לימוד שפה מאפס". The production browser opened at Login, so a signed-in visual preview check was not performed. Local 50-word Playwright geometry remains the functional layout regression.


## 2026-10-01 — Hebrew path label and preview alignment

`gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c`: `npm.cmd run check` passed TypeScript, ESLint, 160/160 Vitest tests, production build and 16/16 gateway tests. Targeted `npm.cmd run test:responsive -- --grep "English unit"` passed 2/2 Playwright tests. The regression checks the new Hebrew heading and a 50-word modal at 320px/568px, 525px/709px and 1920px/900px: known buttons stay aligned and on one line, the list scrolls, and both footer actions remain inside the modal. Production deploy and authenticated visual smoke are pending.


## 2026-10-01 — Final Web deployment verification

Render Web `dep-dav4nrgjo6nc73fgnt9g` is Live at exact `383482331ca895c1491123643138bd0973fd7395`. Production `/english-learning`, Web `/ready`, Backend `/ready`, CSS and dynamically loaded path JavaScript returned 200; the latter assets contain the new row/no-wrap selectors and class. The production visual button check in an authenticated session could not be repeated after Web deploy because the prior tab was lost and a new one showed Login. Local regression passed 160 Vitest, 16 gateway, 375 Playwright checks including the 320px/1920px one-line assertion.

## 2026-10-01 — Known-control visual regression and live backend smoke

`gotIt-front@383482331ca895c1491123643138bd0973fd7395` passed `npm.cmd run check` (160 Vitest, 16 gateway, typecheck, lint, build), 375/375 Playwright responsive checks, and targeted Prettier. The component regression asserts the scoped modal/row classes, while Playwright measures a one-line button and no row overflow at 320px and 1920px. Backend `10bf197` is Live on Render `dep-dav4i2p7lnhs73aqouc0`; authenticated Web smoke displayed `second = שנייה`, `May = מאי`, and an unmarked modal `may = ייתכן ש־` after the month was temporarily marked. The test mark was reversed. Web layout deploy pending at this source checkpoint.

## 2026-10-01 — Contextual English meanings

`gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966`: `npm.cmd run typecheck`, `npm.cmd run build`, 207/207 fast tests, 59/59 disposable PostgreSQL integration tests, and targeted Prettier passed. The integration migrates up/down, checks `May`/`may` translation and known-state separation, carries the same modal sense to a later unit, and preserves cross-unit same-sense propagation. Production migration, exact-SHA deploy and authenticated smoke are pending at this checkpoint.

## 2026-10-01 — First-profile known action and migration role correction

`gotIt-backend@8db500a5594fbc99c1d3e104701b31bd37c372b0` passed typecheck, build, 206/206 fast tests, 59/59 PostgreSQL integration tests, and targeted Prettier. The new integration branch starts with a Core-authenticated user who has no GotIt profile, marks a repeated English word known, verifies profile creation and cross-unit known state, then reverses the state. The production migration's first attempt failed on the original direct Core FK (SQLSTATE 42501) before catalog replacement; no production success is claimed for that attempt. Retry with the corrected source is pending.


## 2026-10-01 — Named-unit Web regression

`gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` passed `npm.cmd run check`: typecheck, lint, 160/160 Vitest tests, production build and 16/16 gateway tests. `npm.cmd run test:responsive` passed 374/374 Playwright checks. `test/live.test.tsx` covers the named unit, a 50-ID initial install, whole-unit known mark/unmark, single-word known mark, and a 49-ID install that excludes the known word. Exact-SHA production deployment and authenticated smoke remain pending. Backend counterpart and its 59 PostgreSQL checks are recorded above.


## 2026-10-01 — Named English units and known-word backend

`gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b`: `npm.cmd run typecheck`, `npm.cmd test` (206/206), `npm.cmd run build`, `npm.cmd run test:integration` (59/59 on disposable PostgreSQL), and targeted Prettier passed. `test/word-packs.test.ts` validates all supplied unit names/words, 50 translated entries per unit, calendar/home coverage and no Basic `satellite`. `test/integration/practice.integration.test.ts` validates the migrated catalog, one-action 50-word known marking, cross-unit repeated-word state, isolation, reversal, and omission from pack practice. Migration down/up also ran on disposable PostgreSQL. Repository-wide `format:check` still reports 36 pre-existing unrelated files. Production migration, deployment, and authenticated known-word smoke are pending.


## 2026-10-01 - Shell duplicate regression

`gotIt-front@d2d59437d57580ba3e9db5b8cdc933baf798b2db` adds `test/app-shell.test.tsx`: an assessed live account has exactly the top-bar level link and no sidebar card or generic live notice; Free and demo keep their respective notices. `npm.cmd run check` passed typecheck, lint, 159/159 Vitest tests, production build, and 16/16 gateway tests. `npm.cmd run test:responsive` passed 374/374 Playwright checks.

Render deployment `dep-dav3tlnpn0mc73a0fp90` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/dashboard` browser reload showed the English A2-B2 assessment in the top bar, no sidebar assessment card, and no generic live-account notice.

## 2026-10-01 — English unit level label regression

`gotIt-front@66767de`: `test/live.test.tsx` renders Basic unit 1 and Advanced unit 5 on the dedicated path, then asserts each card displays its own level while retaining the existing 50-entry installation request coverage. `npm.cmd run check` passed: typecheck, lint, 157/157 Vitest, production build, and 16/16 gateway tests. Render deployment `dep-dav2m90jo6nc73f7uefg` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/english-learning` browser smoke showed the new level label in Basic unit 5 and Advanced unit 5 cards; the Advanced unit 5 preview contained `satellite`.

## 2026-10-01 — English path production verification

The dedicated migrator applied both catalog migrations after a local schema and full product backup. Read-only verification found 10 topics, 3 path tracks, 60 packs, 3,000 entries, and no pack outside 50 entries. Restricted runtime preflight passed. Backend and Web `/ready` returned 200; the authenticated browser displayed all 60 units and opened the first Basic and last Advanced unit previews with 50 English/Hebrew entries. A separate test-account 50-entry installation was not performed; the local Web regression covers that request path.

## 2026-10-01 — Initial English path production observation (resolved)

Render deployed Backend `74eb91d` (`dep-dav2078473hc73d6n53g`) and Web `4da3411` (`dep-dav20jo473hc73d6okp0`). The first authenticated live check showed the empty state and 9 topics, which triggered the subsequent migration and verification above.

## 2026-10-01 — Dedicated English path Web verification

`gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af` passed `npm.cmd run check`: typecheck, lint, 155/155 Vitest tests, production build, and 16/16 gateway tests. `test/live.test.tsx` verifies the dedicated route, three-level entry, preview, and 50-entry installation request. The i18n test verifies all eight locale catalogs contain the new keys. Production browser and authenticated API smoke are pending.

## 2026-10-01 — English path migration verification

`gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f`: typecheck, 204/204 fast tests, build, and 26/26 targeted PostgreSQL integration subtests passed locally. The integration checks the renamed topic, 3 tracks, 60 units, 3,000 entries, a corrected meaning, and language filtering. Targeted formatting passed; the repository-wide formatting gate reports 38 existing files outside the changed path. No production migration or authenticated smoke was observed.

## 2026-10-01 — Initial English catalog regression scope

`gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a` includes `test/daily-english-catalog.test.ts` for counts, 50-entry grouping, disjoint vocabulary, Hebrew meanings, representative expressions, migration statements, and protected rollback. An exact-commit test report and authenticated production smoke have not been recorded. The rollout gate is a dedicated migration followed by `en`/`he` catalog, detail, and 50-entry install checks. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Mixed-direction alignment regression

`gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe` passed
`npm.cmd run check`: typecheck, lint, 154/154 Vitest tests, build, and
16/16 gateway tests. The vocabulary regression now asserts that the guide
shares a left-to-right reading group with its source word. The failure was
observed in live list/detail screenshots on the preceding Web commit;
The corrected Web deployment `dep-dauormu0tbcc73c43lkg` was observed Live;
browser smoke confirmed aligned English source/guide in the list and Arabic
source/guide in the list and detail.

## 2026-10-01 — Reading guide Web evidence

`gotIt-front@c585b8860756e739859137d6e391643c321c5282` passed
`npm.cmd run check`: typecheck, lint, 154/154 Vitest tests, build and 16/16
gateway tests. The new live vocabulary regression checks placement of a
Hebrew guide and omission of a non-transliteration scheme. Browser/device
acceptance was performed in the live vocabulary browser on 2026-10-01.

## 2026-10-01 — Reading guide backend evidence

`gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0`: typecheck,
201/201 fast tests, targeted PostgreSQL integration 26/26, and build passed.
The new regression verifies that a stored `transliteration:he` guide reaches
the owner in `GET /learning-items` while another user receives no item.
Production data was read back as 84/84 active English items with guides.
Repository-wide `format:check` reports 37 pre-existing unformatted files.
Backend deployment `dep-dauope8jo6nc73e0n2dg` was observed Live for this
commit; backend `/ready` and Web `/ready` returned HTTP 200. Scoped production
readback confirmed 12/12 active Arabic-to-Hebrew items with
`transliteration:he` after the follow-up data backfill; live list and detail
smoke showed the Hebrew reading guides. These checks do not cover automatic
generation for future captures.

## תיקון רצף השיעור — ראיות מקומיות 2026-09-30

- Backend: `npm.cmd run typecheck`, `npm.cmd test` — 157/157, ו־`npm.cmd run build` עברו.
  חוזה קורס באנגלית עם שפת עזר עברית בודק פתיחה בשפת היעד ושימור ההנחיות
  והיעד המאושר בכל ארבע הפעולות; בדיקות ערבית ומתחילים בספרדית נשמרו.
- Web: `npm.cmd run check` עבר: typecheck, lint, 115/115 Vitest, build ו־13/13 gateway.
  שמונה בדיקות בקר מכסות השמעה אחרי response.done, דיבור והפרעה, מד שמע,
  תקציב פניות, השהיה, שגיאה ומרוץ VAD. בדיקת רכיב מפעילה את השעון והאירועים,
  ממשיכה ידנית ומוודאת עצירה בהשתקה, בסיום וביציאה. נבדקה תאימות לשרת ישן.
- דפדפן: `npx.cmd playwright test --config playwright.lesson.config.ts` — 8/8 Edge,
  he/en ברוחב 320/390/844/1440 כולל landscape. ה־Web וה־connection adapter אמיתיים;
  HTTP, מיקרופון ו־Realtime מדומים. נבדקים סיום השמעה, שתי פניות אוטומטיות,
  כפתור המשך ידני, נראות בתוך המסך, ללא גלישה אופקית וללא חפיפה בין אזורי השיעור.
  בדיקת תמונות חשפה חפיפת כותרת/מילים ברוחב landscape; תוקנו עמודות מינימום
  והקצאת הכותרת לשורה מלאה, ונוספה בדיקת מלבני האזורים. תוצרים:
  `gotIt-front/test-results/lesson-resume-{he,en}-{width}.png`.
- לאחר עיצוב כפתור ההמשך הורצו lint ו־build שוב; אזהרת chunk ראשי הקיימת נשארה.
  SEQ-07 עבר בדיקת PlantUML. לא נדרשה ולא הורצה שוב בדיקת DB: התיקון אינו משנה
  שאילתות, טבלאות או מיגרציות. ראיות PostgreSQL מהסבב הקודם מופיעות בהמשך.

איכות ההוראה הקולית עדיין מחייבת קבלה מול הספק והמיקרופון בפועל. אלו בדיקות
חוזה/בקר/ממשק, לא הוכחה שהמודל תמיד יפעל לפי ההנחיות ולא אישור פריסה.
הגדרות PLQ-01–05 וגבולות המימוש: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## קורסים ושיעורי בית — ראיות מקומיות 2026-09-30

- Backend: `npm.cmd run typecheck`, `npm.cmd test` — 156/156, `npm.cmd run build` עברו.
- PostgreSQL: `npm.cmd run test:integration` — 49/49 עברו במסדי Docker disposable,
  כולל scope, CAS, receipts, שמירה/חזרה, הרשאות ומיגרציות up/down/up. אין מיגרציית production.
- Web: `npm.cmd run check` עבר: typecheck, lint, 105/105 Vitest, build ו־13/13 gateway.
- Edge: `npm.cmd exec playwright -- test --config playwright.courses.config.ts` — 37 בדיקות
  מצבים/פריסה/מקלדת עברו, בשישה מצבים ב־he/en וברוחב 320/390/1440. צילומי המסך נבדקו חזותית.
  בדיקת הקראת אפשרויות נוספת עברה בהרצה ממוקדת אחרי תיקון ה־mock של SpeechSynthesis:
  `--grep 'oral support' --output test-results/voice-check`.
  ארבע בדיקות נוספות של תוכנית ובית ב־768×1024 וב־844×390 עברו עם
  `--grep 'additional viewport' --output test-results/viewport-check`.
  בסך הכול עברו 42 תרחישי דפדפן; בבדיקת הבית נבחרת תשובה לפני בדיקת זמינות כפתור השליחה.
- מסמכים: 74 קישורים יחסיים ו־workspace JSON נבדקו; שני תרשימי PlantUML עברו `-checkonly`.

במהלך ההרצה תוקנו fixtures שהתיישנו: ספירת migrations/טבלאות/word packs, הרשאות
לתפקידי בדיקה לאחר יצירה מחדש, וספירת image assets ביחס ל־baseline של התרחיש.
הבדיקות משתמשות בספקים מדומים; אין קבלת ספק/מיקרופון/מכשיר פיזי, מחקר ילדים או
אימות פדגוגי רב־לשוני. לא הורצה בסבב זה כל חבילת responsive הישנה של האתר.
אזהרת chunk ראשי מעל 500KB נשארה. [עקיבות ומגבלות 22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. פירמידת בדיקות

Smart review rotation regression: `test/integration/practice.integration.test.ts` backdates successful matching attempts by two days and verifies that the next queue still selects untouched words first. The test passed against disposable PostgreSQL. On the source commit, 203 fast tests passed; the full integration suite had five unrelated catalog/migration expectation failures, and typecheck/build/format checks were blocked by unrelated current files. Render deployment `dep-daup51s9v7es73aeastg` is Live for the source SHA; read-only production-data queue evaluation selected three words outside the reported repeated board. Authenticated HTTP queue and browser submission were not exercised.

| שכבה | מטרה | דוגמאות |
|---|---|---|
| Unit | חוקים טהורים וקצוות | scoring, policy, normalization, state machine |
| Contract/HTTP | route, validation, status/errors | Supertest, gateway tests |
| Integration DB | constraints/transactions/isolation | PostgreSQL אמיתי |
| Component | UX/state/accessibility | Testing Library |
| Browser/E2E | routing/layout/browser APIs | Playwright/manual Chrome |
| Live acceptance | providers, OAuth, billing, deploy | staging/production checklist |

Web billing regression in `gotIt-front/test/billing-page.test.tsx`: with Free in the catalog and status, it appears only in the current-plan summary; with a paid status, Free is absent. `gotIt-front@196cf9593cda52360160d620d02091071b421ce5` passed `npm run check` (typecheck, lint, 157 Vitest tests, build, 16 gateway tests). Render `dep-dav2137pn0mc739o6l30` is Live for that SHA; `/ready` and the new billing asset returned 200. The served asset has the current-plan marker and lacks the Free-offer marker. Authenticated UI smoke remains unverified because the test tab was not signed in.

## 2. Core Coverage חובה

- application context ו־cross-product rejection.
- register/login generic errors, password hash parameters.
- Google web/extension audience ו־Facebook app binding.
- verified email linking ואי־קישור בין applications.
- JWT claims, expiry, wrong audience/application.
- refresh rotation, replay, expiry, logout, disabled user.
- role מהמסד.
- billing plans/status/trial/grace/cancel.
- checkout idempotency.
- webhook signature, duplicate, failed retry, stale event.

## 3. Backend Coverage חובה

- malformed/large JSON, CORS, request ID, rate limit.
- Core unavailable/invalid identity ו־client spoof rejection.
- profile defaults/transaction/isolation.
- capture languages, provider failures, token tampering, senses, receipts.
- library pagination/filter/sort/edit revision/bulk/tags/restore.
- pack install/link/remove invariants.
- exercise secrecy/expiry/ownership/revision/consume.
- server scoring בכל mode, attempt replay ו־transaction rollback.
- mastery thresholds, calendar days, demotion, enabled skills.
- XP cap/ledger/streak/timezone.
- reading target binding, repair, token, quota reserve/release.
- speech WAV validation, no storage, provider mappings.
- image relevance/cache/attribution/fallback.
- private lesson prompt/setup/preferences/roadmap/summary/evidence/isolation.
- export cursor/import partial/idempotency.

## 4. Frontend Coverage חובה

- token hydrate/refresh concurrency/expiry/logout.
- strict parsing ו־localized error codes.
- live/demo separation.
- capture payload lock, sense selection ו־retry ID.
- library pagination/actions/modal focus.
- exercise rendering/submit/reconnect/no client scoring.
- microphone permission/track cleanup.
- reading Unicode ranges ו־publication state.
- Paddle config/checkout return states.
- legal routes, deep links, gateway allowlist/security headers.
- RTL/LTR, keyboard, reduced motion ו־responsive matrix.

## 5. Extension Coverage חובה

- context extraction boundaries.
- message parser reject unknown/extra/malformed payload.
- capture state transitions/error recovery.
- auth refresh/storage/logout/Google cancel.
- safe retry status and stable UUID.
- settings migration/sync/optional content registration.
- inline/popup i18n, direction, size/theme.
- generated manifest permissions, key rules ו־package contents.
- ZIP סופי: `manifest.json` בשורש, גרסה צפויה, ללא `manifest.key`; בדיקת כשל
  ל־ZIP עם מפתח או גרסה שגויה. בניית `dist` מקומית שומרת את המפתח הקבוע.

אימות release מקומי ב־2026-10-01 עבור `gotIt-chrome@e8d70a45246d7a191e66e784bb0a47774d8076f6`:
`npm run verify` עבר (typecheck, 39/39 tests, build ובדיקת זהות מקומית);
`npm run package` עבר. בדיקה עצמאית של ZIP 1.4.4 מצאה manifest יחיד בשורש,
גרסה `1.4.4`, ללא `key` או sourcemaps. לא בוצעו העלאה לחנות או בדיקה
ידנית מחוברת של התרגום וההגדרות מתוך ה־ZIP.

## 6. Test Data

- synthetic emails/domains בלבד.
- UUIDs deterministic כשנדרש.
- provider/OAuth fakes ב־CI; אין live call.
- DB חדש לכל integration suite או schema/database מבודד.
- test role נפרד מ־admin/migrator.
- cleanup מאומת גם בכשל.
- fixtures כוללים Unicode, RTL, emoji, combining characters ו־long text.

## 7. Quality Gates

PR לא עובר אם אחד נכשל:

1. typecheck.
2. lint/format לפי repo.
3. unit/contract tests.
4. build production.
5. integration tests לשינוי DB/domain.
6. gateway/extension package verification כאשר רלוונטי.
7. docs + traceability לחוזה/ארכיטקטורה.

Release מוסיף: dependency audit, migration rehearsal, browser/device matrix,
provider/OAuth/Paddle acceptance, smoke after deploy ו־rollback readiness.

## 8. בדיקות לא־פונקציונליות

- load: capture preview/save, queue, dashboard ו־Core auth.
- concurrency: duplicate captures/attempts/webhooks ו־pool exhaustion.
- resilience: Core/DB/provider latency ו־shutdown באמצע mutation.
- security: IDOR, header/origin/path, token replay, prompt injection, secret scan.
- accessibility: axe/manual keyboard/screen reader.
- cost: AI quota, image reuse, provider retries ו־lesson duration.

## 9. ראיות מצב

הקוד כולל suites בכל ארבעת המאגרים. מסמך זה אינו קובע pass לפי שמות קבצים;
תוצאת הרצה מתוארכת נרשמת ב־[13_TRACEABILITY](13_TRACEABILITY.md) וב־CHANGELOG.
בדיקות live אינן מוחלפות ב־mock או jsdom.
