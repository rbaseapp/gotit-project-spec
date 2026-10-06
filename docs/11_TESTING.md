# 11 — אסטרטגיית בדיקות ואיכות

## 2026-10-06 - Canonical guided Web acceptance follow-up

Follow-up Backend `468357129d919b1dcacd15a409ec78d77e69bf68` reproduces the real `shortTitle` strict-schema rejection and passes after the required generation-schema repair. 230 fast/type/build/format and two relevant disposable PostgreSQL cases pass; prior full PostgreSQL 67 passes are recorded separately. Web `2ad61a3` final 406/406 local browser and exact Linux CI pass; live sample playback passes. Real guided lesson/report acceptance awaits the Backend follow-up rollout. [Evidence](30_FIGMA_FULL_DEV.md#required-generation-title--backend-source-checkpoint).

Web `2ad61a31a33cdb52809c85a0b2abd78a6a6de983`: 224 unit / 20 gateway, type/lint/build/format pass. Voice regression validates allowed MP3 Blob playback/cleanup; three library-to-ready families preserve language, eight idle-resume and four clipped-board touch cases pass. Initial full gate was 399/406; stable full gate and corrected live provider smoke are pending. [Exact diagnosis and checkpoint](30_FIGMA_FULL_DEV.md#web-playback-and-entry-follow-up--source-checkpoint).

## 2026-10-06 - Meaning recognition rounds and touch repair

PostgreSQL red/green regression verifies ten distinct matching words after review-date changes; 209 fast and 63 integration tests passed. Full authenticated DEV gameplay passed. Recurring boards and mobile drag regressions cover full ten-answer sessions, fresh state, completion, touch coordinates under a transformed ancestor, cancellation, outside release, RTL and four-row scrolling. [Canonical commands, counts and verification limits](29_MEANING_MATCHING_ROUNDS.md).

## 2026-10-06 - Fullscreen game entry follow-up

Web `9cff6a0f1de1c22da04e6d5ed285171d258457fb` follows the Figma correction. Fullscreen game entry stays contained in RTL; regression now samples the mounted game at animation start/middle/end. 84 viewport cases and local check (207 unit / 20 gateway-security), formatting and zero-finding audit passed. **DEV Live at exact source; delivered CSS and readiness verified; 393/393 local browser cases passed. Linux CI passed 207 unit / 393 browser / 20 gateway-security cases, build/type/lint and zero-finding audit; production excluded.** [Canonical source, behavior and release gate](28_UX_2_1_DEV.md#2026-10-06---game-entry-regression-follow-up).

## 2026-10-06 - Figma fidelity correction, DEV Live

Web `e1948281adabe34d2ff6c4e4dc4f949e90c33436`. 207 unit and 20 gateway/security tests passed. Full initial browser run passed 392/393; the localized-language locator was corrected and passed. Final targeted home/program (3) and lesson viewport (8) cases passed. Named fixture screenshots and failure-first cases are in the canonical checkpoint. **DEV Web is Live at this source; authenticated home/program/preparation UI smoke and three DEV readiness endpoints passed. Active voice appearance is fixture-verified; no real provider call was started.** **Historical CI checkpoint: 333 browser passes / 60 initial demo-game overflow failures, resolved and verified by the 9cff6a0 follow-up above.** [Canonical changes and evidence](28_UX_2_1_DEV.md#2026-10-06---figma-fidelity-correction-local-checkpoint).

## 2026-10-06 - UX DEV release smoke

Exact Web release `0e88da53f679a142bf040a51b4c428b6652e0a72` has passing CI: 206 unit, 391 browser, 20 gateway/security; type/lint/build/audit pass. Actual DEV smoke verified dashboard/program chooser/map/unit words/library/game hub/teacher preparation/history, mobile navigation and clickable repeated letters/delete/clear/capacity. One server-scored answer returned correct/100%/+10 XP; test session was explicitly stopped and visible in history. Physical devices, live AI/microphone/article generation/billing and a complete round were not exercised. [Canonical DEV release and acceptance](28_UX_2_1_DEV.md#dev-web-release-and-authenticated-smoke-2026-10-06).

## 2026-10-05 - UX 2.1 DEV checkpoint

Web `a535a880c3ee8746ebb49d65ce714ed0fcfd8a70` passed `npm.cmd run check`: typecheck/lint/build, 206 Vitest and 17 gateway cases. Full `npm.cmd run test:responsive -- --workers=4 --reporter=json`: 391/391. Regression covers alphabet metadata, click/IME/capacity, stable reading retry, cross-owner/expired drafts, contexts, explicit language program selection, touch/viewport/provider-event fixtures. Real provider/device/DEV mutations remain unverified. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Chrome verified email entry points

Chrome `46dff89bbc974d932abc7228f09ce23198954a34`: npm run verify passed typecheck, 41 tests, build and manifest/security checks; npm run package validated version 1.4.5 and absence of manifest.key. Regression covers no fetch on legacy registration and mode-only Web URLs. [Evidence](27_EMAIL_AUTH_RECOVERY.md).

## 2026-10-05 - Web email verification and recovery

Web source `da913168f85baddc844978412058cf888117e85c`: typecheck/lint/build, 183 Vitest, 17 gateway and four targeted English/Hebrew 320px/1280px Playwright cases passed. Tests cover failure states and no session before proof. [Evidence and boundaries](27_EMAIL_AUTH_RECOVERY.md#verification-and-deployment-runbook).

## 2026-10-05 - Email verification and recovery

Core passed 31 fast tests, 41 disposable PostgreSQL tests, typecheck/build and migration down/up. Coverage includes the pre-proof session failure, code replay/expiry/limits/scope, recovery revocation and OAuth preclaim defense. [Evidence and live-test boundaries](27_EMAIL_AUTH_RECOVERY.md#verification-and-deployment-runbook).

## 2026-10-05 - Selected-language practice

Backend `e5f4817b8544b95da739ce4f462e95f50b99689c`: 209 fast and 62 disposable PostgreSQL tests; Web `e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0`: 179 Vitest, 16 gateway and 15 targeted desktop/mobile Playwright checks. Typecheck/lint/build and changed-file formatting passed as applicable. Failure-first regressions reproduce mislabeled Arabic content and the selection overwrite. Live English/Arabic smart smoke passed; legacy-resume rejection is covered locally. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-05 - Free Google preview regression

FR-CAP-008 -> `test/free-google-preview.test.ts` in `gotIt-backend@98136a06cc3aaee14263011e3307ca1f920a21bf`: HTTP 402 before the fix, then successful Google preview with signed provenance using real service/registry/adapter and synthetic transport. The regression also covers scope, validation, authentication and unchanged paid-action denial. The full local run passed 209 fast tests and 60 PostgreSQL tests plus typecheck/build. [Operational evidence and live verification](10_OPERATIONS.md#2026-10-05---free-google-preview-rollout) owns deployment status and the existing format-check limitation.

## 2026-10-01 — רגרסיית אווטאר מורה

מקור `gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd`: ‏172 Vitest,
16 gateway, TypeScript/lint/build עברו; 8 בדיקות ממוקדות לאחר הרחבת מד הקול
ו־10 Playwright עברו. הרגרסיה מכסה דליפת פה סגור, עדכון מד קול מהיר,
שתיקה, שתי הדמויות, מצמוץ בדיבור, ניקוי ותנועה מופחתת.
[מיפוי בדיקות וצילום](25_TUTOR_AVATAR_MOTION.md). Render Live ב־SHA המדויק;
readiness, bytes של נכסי PNG ו־smoke פונקציות מהרכיב המוגש עברו.
שיחה קולית חיה לא אומתה עקב timeout בחלון Google; אלו ראיות נכסים/קוד בלבד.

## 2026-10-01 — Unique catalog production smoke

Following Backend `10602736bdf5422116eb838e57e9d708318156be`, dedicated migration/preflight passed and production readback returned one new migration row, 60 version-4 packs, 3,000/3,000 distinct entries, 50 per pack, 1,418 archived known rows, 51 archived links, 710 active distinct known marks and 51 active links. An exact source-and-meaning archive join found zero unexplained active known marks. Render `dep-davb9j9srm7s73bb3p70` is Live for that SHA. Public Backend `/ready`, `/health` and Web `/english-learning` were HTTP 200. Authenticated `ori` preview displayed Basic unit 3's 50 entries with 48 known and two unknown; no live mutation was performed. The UI session did not expose an email address. Backup identity and draft-translation limits are recorded in [23](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Unique English catalog regression

Backend `10602736bdf5422116eb838e57e9d708318156be`: `npm.cmd test` 208/208, `npm.cmd run test:integration` 59/59, focused `english-catalog.integration.test.ts` 1/1, `npm.cmd run typecheck` and `npm.cmd run build` passed. The catalog regression compares all 60 unit titles and ordered words to the user-supplied file, checks 50 Hebrew entries per unit and 3,000 globally unique case-insensitive English entries. The API regression verifies that a known `work` in unit 2 does not appear in unit 12. The focused disposable PostgreSQL migration seeds old `work`, modal `may` and removed `seek` as known, then proves only the matching `work` remains known, calendar `May` stays unknown and all three originals are archived. Targeted Prettier and `git diff --check` passed. Repository-wide `format:check` reports 36 unrelated pre-existing files. No production test is claimed here.

## 2026-10-01 - Final English preview production smoke

Render Web `dep-davaakflot8c73cu3sig` is Live for exact `gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c`. Public Web and Backend readiness and `/english-learning` returned 200. Authenticated preview inspection showed the wider two-row footer, correctly rendered Hebrew bulk known/undo labels, two selected words and no selected-word removal action. Clearing the selection disabled its bulk known action; closing the modal left Advanced unit 10 at 2/50 known. Reversible server-write smoke for the same feature passed on the immediately preceding `e519242` deploy; final CSS changed only width/grid layout. Local final-source gates: `npm.cmd run check` passed 165 Vitest, 16 gateway, typecheck/lint/build; targeted responsive Playwright passed 1/1 at 320px/525px/1920px.

## 2026-10-01 - Five-action modal layout regression

`gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` passed `npm.cmd run check`: TypeScript, ESLint, 165/165 Vitest, build and 16/16 gateway. `npm.cmd run test:responsive -- --grep "English unit preview"` passed 1/1 at 320px/568px, 525px/709px and 1920px/900px. The modal regression now requires every footer button to be at least 100px wide as well as inside the modal, with the 50-word list scrolling. The preceding `e519242` deployment passed authenticated bulk known/undo smoke with two initially unknown entries and restored their original states and 2/50 count. This layout revision awaits production visual verification.

## 2026-10-01 - Hebrew bulk-known encoding regression

`gotIt-front@e5192422075850a7db6c64134a13565d3c3acf58` asserts the exact four Hebrew bulk-known action/feedback strings in `test/i18n.test.ts`. `npm.cmd run check` passed TypeScript, ESLint, 165/165 Vitest, production build and 16/16 gateway tests. Focused i18n/live tests passed 30/30 after the unrelated Facebook Login fast-forward. Production visual check on `4512a93` found the four labels rendered as question marks, so that deployment is not accepted for Hebrew UI. Corrected deploy and known/undo smoke pending.

## 2026-10-01 - Bulk known and undo Web regression

`gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` passed `npm.cmd run check`: TypeScript, ESLint, 164/164 Vitest, production build and 16/16 gateway tests. `test/live.test.tsx` verifies add-selected preserves existing links, the removed UI action is absent, bulk known/undo sends only selected IDs to `PUT /known`, a failed write retains checks for retry, success clears them, and no pack-link update occurs during known actions. `npm.cmd run test:responsive -- --grep "English unit preview"` passed 1/1 at 320px/568px, 525px/709px and 1920px/900px with the five-action footer. Production smoke pending at this source checkpoint.

## 2026-10-01 — Web sign-in persistence, source `9fb80b2`

`gotIt-front/test/api.test.ts` verifies refresh after tab storage is cleared and the API module reloads, migration from legacy tab storage, cross-tab rotation, and logout clearing persistent storage. `test/app.test.tsx` verifies that login stores the refresh token persistently. Focused Vitest: 23/23 passed; typecheck, lint, production build, 16/16 gateway tests and targeted Prettier passed. Full Vitest: 163/164 passed, with one failure in the concurrently edited English unit bulk-action UI (`test/live.test.tsx`), outside the auth change. Production authenticated close/reopen smoke pending.

Render `dep-dav9obaj9qps73e5j320` is Live at exact source `9fb80b2d02a3017511080eefbb3470e750968a4c`. Public Web `/ready` and Backend `/ready` returned 200. The served `index-D9vzuLtW.js` includes the persistent refresh storage path. A new production tab presented Login; Google authentication reached the account chooser. The authenticated close/reopen behavior has not yet been exercised on production.

## 2026-10-01 - Selected-word production smoke

Render Backend `dep-dav9ef1srm7s73eegcng` reports Live at `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` and Web `dep-dav9f0lg1s2s73couufg` reports Live at `623202a3e1f5c51b71baf12bd1c78c4a0967860b`. `GET https://gotit-backend.onrender.com/ready` returned 200 with database ready; `GET https://gotit.rbaseapp.com/ready` and `/english-learning` returned 200. In an authenticated production path, a unit preview showed 50 labeled checkboxes, select all/clear and both bulk buttons. Checking two words changed the count to 2 and enabled both actions; clear returned count 0 and disabled them. A linked word was then removed: selecting it offered Add and disabled Remove. Re-adding restored the reverse button state. The selection was cleared and modal closed. This verifies one reversible server mutation and the deployed UI; first-time new-item creation and last-link removal remain covered by local/PostgreSQL tests rather than production account mutation.

## 2026-10-01 - Selected English unit words in Web source

`gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b`: `npm.cmd run check` passed TypeScript, ESLint, 161/161 Vitest tests, build and 16/16 gateway tests. The selected-word live test verifies preserving an existing link while adding one checked word, removing a different checked word, removing the final link with an empty selection and adding one word back. `npm.cmd run test:responsive -- --grep "English unit"` passed 2/2 at 320px, 525px and desktop after updating the modal fixture with checkboxes and bulk buttons. Targeted Prettier passed. Production authenticated selection smoke remains pending.

## 2026-10-01 — Backend empty-selection regression

`gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`: `npm.cmd run typecheck`, `npm.cmd run build`, 207/207 fast tests, 59/59 disposable PostgreSQL integration tests and targeted Prettier passed. `test/word-packs.test.ts` accepts an empty unique selection; `test/integration/practice.integration.test.ts` verifies partial exclusion, removal of the final link with `entryIds: []`, and restoration without deleting the installed pack. These are local/integration results, not production deployment evidence.

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
- Facebook credential boundary diagnosis and repair: a real app-developer token passed Meta `/me` and `/debug_token` (correct app, valid, future expiry, email scope and email), while the previous Core App Secret failed Meta validation. On 2026-10-02 the actual current secret was saved and environment deployment `dep-davots49v7es738kolqg` became Live at `core-platform@6f4098dcbeb868441a4ed0b9787af1fa84dd5bd6`. New-runtime Meta client-credential validation returned 200 with a token present; Core/Web readiness and login HTTP checks passed. Live owner-account Facebook exchange returned 200 twice, Core `/auth/me` and GotIt `/profile` returned 200, logout returned 204 and repeat login succeeded. Authenticated learning UI was observed, and synthetic-invalid-user-token gateway smoke returned 401. No credential values were recorded. No source changed and source regression suites were not rerun. Public/non-role and live missing-email account tests remain unperformed. [Canonical evidence](24_FACEBOOK_LOGIN_ROLLOUT.md).
- Facebook Web blank-build-override regression: `gotIt-front/test/facebook.test.tsx` verifies the public GotIt App ID initializes the SDK when `VITE_FACEBOOK_APP_ID` is empty. At `gotIt-front@c5c6e0173515a1de05baf55a3f4c56c2452e0722`, `npm.cmd run check` passed 164/164 Vitest and 16/16 gateway tests with typecheck, lint and build. Live Meta consent and Core token exchange remain pending; see [rollout record](24_FACEBOOK_LOGIN_ROLLOUT.md).
- Facebook unanswered-SDK regression: the same test file simulates a `FB.login` call that never invokes its callback. At `gotIt-front@af299153dde90879aafa0aa3a42e1ae8a8d2469d`, the button exits loading after 60 seconds, shows a localized error, ignores a late token and permits retry. `npm.cmd run check` passed: typecheck, ESLint, 166/166 Vitest, build and 16/16 gateway tests. Live provider acceptance remains pending.
- Facebook full-SDK readiness regression at `gotIt-front@8423c90012bd803bf4f9c231559fa1226c21c792`: bootstrap load alone leaves login disabled; missing bundle readiness times out, removes the queued SDK and permits a fresh initialized retry. `npm.cmd run check` passed typecheck, ESLint, 167/167 Vitest, build and 16/16 gateway tests. The readiness fix deployed but did not open the HTTPS popup. `gotIt-front@7c956aa2e517aed331d98ce9228860bb1afb8f3c` opts out of the vendor's FedCM default; its SDK contract regression and the same full quality gates passed. Render `dep-davbhmqd0e5s73fbfn5g` is Live at that SHA with passing readiness/login/bundle HTTP smoke, production consent-popup opening, and timeout/retry after an unanswered attempt. Real-account continuation controls were disabled during observation, so token exchange remains pending. Core replacement-config deployment `dep-davb4unavr4c73b9ing0` is Live, `/ready` returned 200 and a synthetic-invalid-token POST returned 401 `FACEBOOK_TOKEN_INVALID`.
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

2026-10-02: `gotIt-front@3fa4da4f31023682c9308d686fb04dbb0676b590` slows avatar lip response for FR-LESS-006; locally verified (173 Vitest, 16 gateway, 2 avatar Playwright). Exact SHA is Live on Render; production delivered-code/readiness smoke passed. See [canonical behavior and regression evidence](25_TUTOR_AVATAR_MOTION.md).

2026-10-02 follow-up: `gotIt-front@3ec2d2899e4cf6504e65aba01f19e425c9a87942` further slows FR-LESS-006 avatar lips; 173 Vitest, 16 gateway and 2 avatar browser tests passed. Exact SHA is Live; production readiness and delivered-code smoke passed. [Current thresholds and evidence](25_TUTOR_AVATAR_MOTION.md).
## 2026-10-06 — DEV UX dependency audit regression

Source `gotIt-front@0e88da53f679a142bf040a51b4c428b6652e0a72` patches source-map-js
1.2.1 to 1.2.2. New `test/source-map-security.test.mjs` rejects excessive direct
and cumulative nested offsets and preserves normal indexed mappings. The two
security cases fail on 1.2.1 and all three pass on 1.2.2. `npm.cmd run check`
passed typecheck/lint, 206 unit tests, build and 20 gateway/security tests;
`npm.cmd audit --omit=dev --audit-level=high --json` returned zero findings.
The 391 browser passes on the previous redesign SHA were also confirmed in CI;
new-SHA CI run `37429705998` subsequently passed all gates, including 391 browser
cases and audit. DEV-server verification remains pending; Backend's owner release
is observed Live, while Core/login acceptance is blocked by the reported upstream
error and fresh workstation network checks failing before HTTP responses.
Direct verified-TLS DEV runtime login and strict schema/privilege preflight passed;
this does not prove a successful Render runtime deployment or product writes.
[Canonical release gate](28_UX_2_1_DEV.md).
# Guided learning verification — 2026-10-06

Backend `0404c8cc72bbb4f32a125f4c9e255318beff9a60`: typecheck/build, 228 fast tests and 67 real disposable-PostgreSQL tests passed. New cases cover owner/app boundaries, expired session races, concurrent revisions, stable/changed command replay, normalized ambiguous unit words, report cleanup, runtime DDL denial, legacy preference merge and provider/sample failure/size/timeout. Changed-file Prettier passed; repository-wide existing formatting/Windows checkout drift is not resolved by this task. [Detailed checkpoint and pending live gates](30_FIGMA_FULL_DEV.md#verification-checkpoint).
# Backend release audit follow-up — 2026-10-06

Source `43a429ceeed3a2cd4715724a4d78568f846ef4d0` adds two proxy-subnet regressions and patches the locked transitive dependency. Typecheck/build, 230 fast tests and zero-finding audit pass. The preceding source passed 67 PostgreSQL tests. [Exact source and backup/release status](30_FIGMA_FULL_DEV.md#backend-security-release-gate-follow-up).
## 2026-10-06 - Complete Figma Web checkpoint

Web `2559d5bb22a928add4a56e53e74e9d514d0167fd`: typecheck/lint, 224 unit, production build, 20 gateway/security, formatting/diff and zero-finding audit pass. Nine new family/guided/focused-game browser cases pass at 320/390/1487, covering geometry, exact vocabulary scope, stable failure retry, microphone-free text, automatic summary and clickable letters. Complete 406-case browser run and Linux CI pending. Backend 230 fast/67 PostgreSQL functional cases pass; DEV migration/preflight/normalization/readiness verified, real provider acceptance pending. [Evidence and limits](30_FIGMA_FULL_DEV.md).

## 2026-10-06 - Full browser gate and real guided acceptance

Web `2ad61a3` passes 406/406 locally and exact Linux CI. Backend `4683571` passes
230 fast/two relevant PostgreSQL cases/type/build and is Live in DEV. Actual
brief/Realtime/typed stages/replay/report/history and completed-row temporary
cleanup pass. Web `7c68ca1` adds the real homework response to the guided fixture
and fixes the 1.02:1 helper-copy contrast: three browser cases fail before/pass
after; check passes 224 unit/20 gateway/type/lint/build. Its rollout remains pending
at source sync. [Exact acceptance and limits](30_FIGMA_FULL_DEV.md#real-guided-acceptance-and-contrast-follow-up--2026-10-06).

Final Web `7c68ca1` Linux CI passes 224 unit/406 browser/20 gateway, type/lint/build
and audit; the three enhanced local guided cases/check pass. Exact DEV source and
CSS hash are verified. Live reading failed on leftover Anthropic model configuration,
then succeeded after DEV-only `gpt-6-luna` environment deployment: actual preview,
meaning/save/quiz and letter/delete/capacity/correct server grading passed. All three
DEV readiness endpoints return 200. [Final evidence and unverified boundaries](30_FIGMA_FULL_DEV.md#final-deployment-and-authenticated-smoke--2026-10-06).


## 2026-10-06 — DEV learning-path correction

232 fast / 68 PostgreSQL tests; changed-file formatting verified, repository-wide formatting baseline remains. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).


Web 914aa06 exact Linux CI passes 225 unit, 413 browser, 20 gateway, type/lint/build/audit. Final image-shell follow-up passes 12 red/green full-shell cases, full check and live 260/180px desktop/mobile image measurements; exact-source Linux CI also passes all 413 browser, 225 unit and 20 gateway cases plus type/lint/build/audit. [Exact source, behavior and release evidence](31_LEARNING_PATH_FIDELITY_DEV.md).
