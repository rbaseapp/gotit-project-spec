# 13 — מטריצת עקיבות ואחריות

## 2026-10-01 — FR-LESS-006

P12, UC-07/UC-11, SCR-10/SCR-PC-00A → `TeacherAvatar.tsx`, `avatarMotion.ts`,
מד השמע ב־`privateLesson.ts`, CSS ונכסי שני המורים → בדיקות avatar-motion,
teacher-avatar, private-lesson-connection, private-lesson ו־Playwright.
מקור: `gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd`;
[ראיות](25_TUTOR_AVATAR_MOTION.md), פריסה ממתינה.

## 2026-10-01 — FR-PACK-005 production evidence

`gotIt-backend@10602736bdf5422116eb838e57e9d708318156be` is deployed as Render `dep-davb9j9srm7s73bb3p70`. The dedicated migration and product-only preflight passed, then production readback verified 60×50, 3,000 unique English entries, version 4, the renamed topic and archived/remapped prior progress. Authenticated SCR-16 smoke opened Basic unit 3 and read its 50 entries and existing known/unknown state. This closes the catalog and display acceptance for the observed release; new Hebrew draft meanings still need editorial review. See [23](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — FR-PACK-005 / UC-04B / SCR-16 unique-unit correction

The requested no-duplicate English path maps to `gotIt-backend@10602736bdf5422116eb838e57e9d708318156be`, `migrations/1790800011000_english-unique-catalog.js`, its source/catalog assets, `test/word-packs.test.ts`, `test/integration/practice.integration.test.ts` and `test/integration/english-catalog.integration.test.ts`. The existing `/word-packs*` contracts and Web unit view consume the same pack IDs and API fields. Acceptance: 60×50 entries, 3,000 unique English forms, Hebrew coverage, title **לימוד שפה מאפס**, and no known progress assigned to a changed word or sense. Saved old associations are archived and exact matches restored. Local/unit/PostgreSQL evidence passed; production migration and smoke remain pending at this checkpoint.

## 2026-10-01 - SCR-16 footer readability

`gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` maps the bulk-known action readability requirement to `src/production.css` and the 320px/525px/1920px modal checks in `test/e2e/responsive.spec.ts`. The new check enforces at least 100px of width per footer action. Local Web check passed (165 Vitest, 16 gateway, typecheck, lint, build) and targeted responsive passed 1/1. Preceding `e519242` is production verified for the Hebrew copy and reversible two-word known/undo flow in Render `dep-dava57ghfsis73c06h0g`; this layout commit's deploy is pending.

## 2026-10-01 - FR-PACK-006 / UC-04C / SCR-16 bulk known correction

`gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` maps the corrected selected-word behavior to `src/pages/EnglishLearningPathPage.tsx`, eight locale catalogs, `test/live.test.tsx` and `test/e2e/responsive.spec.ts`. The Web uses existing Backend `PUT /word-packs/:id/known` (`gotIt-backend@14012a0`); Backend `d8d930a` empty `POST /add` support remains but is not triggered by the preview. Regression includes failed-write retry, selected-ID scope, preserved links and 320px/525px/desktop layout. Local check: 164 Vitest, 16 gateway, typecheck/lint/build; targeted responsive 1/1. Deploy pending at this source checkpoint.

## 2026-10-01 — FR-AUTH-011 persistent Web session

`gotIt-front@9fb80b2`: `src/lib/api.ts` and `src/context/AppContext.tsx` implement SCR-01/UC-01 restoration from browser local storage, with regressions in `test/api.test.ts` and `test/app.test.tsx`. Local focused tests and build passed. Render `dep-dav9obaj9qps73e5j320` is Live at the exact SHA and public readiness passed; authenticated browser restart remains pending. Core's default absolute refresh expiry remains 30 days.

## 2026-10-01 - FR-PACK-006 production evidence

Backend `gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` is Live on Render `dep-dav9ef1srm7s73eegcng`; Web `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` is Live on `dep-dav9f0lg1s2s73couufg`. Public readiness and path checks passed. Authenticated SCR-16 smoke verified two-word selection, clear/disabled states and removal/re-addition of an existing link, restoring the original state. PostgreSQL regression covers clearing the final link. Maps FR-PACK-006 / UC-04C to production UI plus Backend contract evidence.

## 2026-10-01 - FR-PACK-006 / UC-04C / SCR-16

`gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` maps the multiword unit request to `EnglishLearningPathPage.tsx`, responsive CSS, eight UI catalogs, `test/live.test.tsx` and `test/e2e/responsive.spec.ts`. Backend `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` accepts the zero-ID replacement and has schema/PostgreSQL regressions. Web check (161 Vitest, 16 gateway) and two targeted Playwright checks passed; exact-commit deployment and authenticated live smoke pending.

## 2026-10-01 — FR-PACK-005 selected-word removal backend

`gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` maps the requested remove-only-selected action in SCR-16 to the existing transactional pack selection replacement and its newly accepted empty `entryIds` payload. Source: `src/modules/word-packs/word-packs.validation.ts`; regressions: `test/word-packs.test.ts`, `test/integration/practice.integration.test.ts`. 207 fast and 59 PostgreSQL tests passed locally; production deployment and authenticated smoke are pending.

## 2026-10-01 — SCR-16 production deployment evidence

The Hebrew path name and preview alignment `gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c` are deployed as Render `dep-dav8pnk9v7es73fjv47g` (Live, exact source SHA). Public route and `/ready` passed; served CSS and JS contain the changed rules and text. Authenticated visual unit smoke remains unverified because the production browser presented Login.


## 2026-10-01 — SCR-16 path name and preview controls

`gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c` maps the requested Hebrew path name and SCR-16 unit preview alignment to `src/locales/he/translation.json`, `src/production.css`, `test/live.test.tsx` and `test/e2e/responsive.spec.ts`. The local gate passed 160 Vitest, 16 gateway and two targeted Playwright tests across 320px, 525px and desktop. Exact-SHA production deployment and visual smoke remain pending.


## 2026-10-01 — SCR-16 Web release evidence

The FR-PACK-005/SCR-16 one-click layout fix `gotIt-front@383482331ca895c1491123643138bd0973fd7395` is Live on Render `dep-dav4nrgjo6nc73fgnt9g`. Public route/health and served CSS/JS asset smoke passed; post-deploy authenticated visual rendering remains unverified because the signed-in tab was unavailable. Local component and 320px/1920px layout regressions plus 375 responsive checks passed. Backend sense smoke had passed earlier on its exact release.

## 2026-10-01 — FR-PACK-005 readable one-click controls

`gotIt-front@383482331ca895c1491123643138bd0973fd7395` maps SCR-16 per-word known-button readability to `EnglishLearningPathPage.tsx`, `production.css`, `test/live.test.tsx` and `test/e2e/responsive.spec.ts`. Local 160 Vitest, 16 gateway and 375 Playwright checks passed. Backend sense handling is production verified on `10bf197`/Render `dep-dav4i2p7lnhs73aqouc0`; Web visual deployment remains pending at this checkpoint.

## 2026-10-01 — FR-PACK-005 contextual sense correction

`gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966` maps the named English-unit content and already-known skip requirement to forward migration `1790800010000`, its 213-row correction asset, the sense-aware known-entry join, `test/word-packs.test.ts`, and `test/integration/practice.integration.test.ts`. The latter verifies that month `May` stays separate from modal `may`, while identical modal senses propagate. Local 207 fast/59 PostgreSQL tests passed; production verification pending at this checkpoint. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — FR-PACK-005 migrator compatibility trace

`gotIt-backend@8db500a5594fbc99c1d3e104701b31bd37c372b0` maps the protected first-known-word flow to the product-profile FK and standard profile initialization. `test/integration/practice.integration.test.ts` covers no prior profile, scoped state, cross-unit propagation and reversal; local 206 fast/59 PostgreSQL tests passed. The initial production migration failed on a Core schema permission denial before replacing catalog content; corrected migration retry and deploy remain pending. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 — FR-PACK-005 Web trace

`gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` maps FR-PACK-005 / UC-04B / SCR-16 to `/english-learning`, `EnglishLearningPathPage.tsx`, the additive word-pack parser, eight locale catalogs and `test/live.test.tsx`. The test covers unit names, full-unit and per-entry known actions, reversal and the unknown-only install payload. Local Web check (160 Vitest, 16 gateway) and 374 responsive checks passed. Backend source is `gotIt-backend@14012a0`; production verification is pending. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 — FR-PACK-005 backend trace

`gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` maps FR-PACK-005 / UC-04B / SCR-16 to migrations `1790800008000` and `1790800009000`, the 60-unit catalog asset, `PUT /api/v1/word-packs/:id/known`, additive `GET` progress/entry fields, and known filtering in pack practice. Regression: `test/word-packs.test.ts` and `test/integration/practice.integration.test.ts`, plus migration down/up in the disposable PostgreSQL suite. Backend gates passed (206 fast, 59 integration); Web commit and production verification are pending. Canonical detail: [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 - SCR-00 shell assessment placement

`gotIt-front@d2d59437d57580ba3e9db5b8cdc933baf798b2db` maps the removal of duplicate lesson-level UI and generic live notice to `src/components/AppShell.tsx`, `src/styles.css`, and `test/app-shell.test.tsx`. The top-bar assessment link and Free/demo notice cases passed locally in 159 Vitest tests; 374 Playwright responsive checks and 16 gateway tests passed. No API or data migration.

Render deployment `dep-dav3tlnpn0mc73a0fp90` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/dashboard` browser reload showed the English A2-B2 assessment in the top bar, no sidebar assessment card, and no generic live-account notice.

## 2026-10-01 — SCR-16 unit identity

`gotIt-front@66767de` maps the level-identification requirement on each English path card to `EnglishLearningPathPage.tsx`, `production.css`, and the Basic/Advanced combined-card regression in `test/live.test.tsx`. Production `satellite` data was checked separately and remains Advanced unit 5. Local Web check passed. Render deployment `dep-dav2m90jo6nc73f7uefg` is Live for that SHA; `/ready` returned 200, and the authenticated browser showed both card labels and `satellite` in the Advanced unit 5 preview. No API or data migration.

## 2026-10-01 — FR-PACK-004 production activation

Backend `74eb91d` and Web `4da3411` are deployed. Migrations `6000` and `7000` ran with the dedicated role after local schema/full backups and read-only preflight. PACK-01/FR-PACK-004 and SCR-16 were verified in production by exact data counts (3 tracks, 60 packs, 3,000 entries, 50 each), both `/ready` endpoints, and authenticated first/last unit previews. The test-account 50-entry installation remains unverified in production. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Initial FR-PACK-004 deployment gap (resolved)

Backend `74eb91d` and Web `4da3411` were initially observed with a healthy but empty route and 9 topics. The dedicated credential was found in the ignored provisioning file and the content migration completed as recorded above.

## 2026-10-01 — FR-PACK-004 / UC-04 / SCR-16

`gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af` maps the dedicated English course requirement to `/english-learning`, `EnglishLearningPathPage.tsx`, existing `/api/v1/word-packs*`, existing catalog/progress tables, and `test/live.test.tsx`. Source path slugs tolerate the original and renamed catalog during rollout. Local Web check passed; production deploy and authenticated catalog smoke remain unverified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — PACK-01 English path data correction

`gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f` maps the requested course name and corrected Hebrew meanings to `word_topics`, `word_pack_entries`, migrations `1790800006000` and `1790800007000`, `test/daily-english-catalog.test.ts`, and the PostgreSQL catalog subtest in `test/integration/practice.integration.test.ts`. API shape is unchanged. Local gates passed as recorded in [11_TESTING](11_TESTING.md); production migration and smoke remain open.

## 2026-10-01 — Initial English learning catalog trace

The Hebrew-to-English path request maps to existing PACK-01, the word-pack process, `SCR-07`, `/api/v1/word-packs*`, and the existing pack tables. `gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a` supplies the catalog migration and `test/daily-english-catalog.test.ts`; it does not supply a dedicated path screen. Production migration/smoke are unverified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — FR-LIB-008 visual correction

`gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe` addresses
the SCR-05/06 RTL alignment failure for UC-13. The changed
`LiveVocabularyPage.tsx`, `production.css`, and `test/live.test.tsx`
connect source and guide in one reading group. Web check passed locally
(154 Vitest, 16 gateway). Render deployment `dep-dauormu0tbcc73c43lkg`
was observed Live on 2026-10-01 and the corrected English alignment was
confirmed in the live browser. Arabic-to-Hebrew follow-up data readback
confirmed 12/12 populated items; live SCR-05/06 smoke confirmed the reading
guide for an Arabic item in the list and detail.

## 2026-10-01 — FR-LIB-008 / UC-13 / SCR-05 and SCR-06

Web `gotIt-front@c585b8860756e739859137d6e391643c321c5282`
maps the additive library phonetic fields to the list and detail guide.
`test/live.test.tsx` verifies Hebrew guide placement and rejects the
`hebrew_niqqud` scheme. `npm.cmd run check` passed locally
(154 Vitest, 16 gateway). The backend trace and 84/84 data readback are
recorded below. The Web commits were observed Live on Render and the live
vocabulary list/detail showed saved reading guides on 2026-10-01.

## 2026-10-01 — Vocabulary reading guide

Initial pilot: owner-scoped English expressions can carry a Hebrew reading guide
in existing phonetic columns. Backend source:
`gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0`;
`library.repository.ts` list fields; regression:
`test/integration/practice.integration.test.ts` (owner and foreign user).
84/84 active English items in the requested account were populated and read
back in the production database. Backend deployment
`dep-dauope8jo6nc73e0n2dg` was observed Live for this commit and `/ready`
returned HTTP 200. Web rendering and Arabic follow-up evidence are recorded
above.

## תיקון רצף השיעור — 2026-09-30

PLQ-01/02/03/05 מקושרות ל־private-lesson.prompt/service ולבדיקות private-lesson
ו־courses ב־Backend; PLQ-04 מקושרת ל־PrivateLessonFlow, PrivateLessonPage ולבדיקות
flow/component/browser ב־Web. ההגדרות והגבולות הקובעים: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## תוספת קורס אישי — 2026-09-30

FR-PC-001–005 ממפות את PC-01–28 למודול `courses`, למסכי CoursePage/HomeworkPage,
ל־12 נתיבי API ול־learning_documents/learning_commands. פירוט דרישה→מימוש→בדיקה
ב־[22, סעיף 7](22_PERSONAL_COURSES_IMPLEMENTATION.md); תוצאות סופיות ב־[11](11_TESTING.md).
מצב: ממומש ונבדק מקומית, טרם נפרס; קבלת ספק, מכשיר ואיכות פדגוגית נשארות נפרדות.

## 1. דרישה → מימוש

| ID | דרישה | רכיב | API | נתונים | בדיקה עיקרית | מצב |
|---|---|---|---|---|---|---|
| AUTH-01 | register/login מבודד application | Core | `/auth/register`,`/login` | users, credentials, sessions | core auth integration | ממומש |
| AUTH-02 | Google Web + Extension | Core/Web/Chrome | `/auth/google*` | provider clients, identities | google auth suites + live | ממומש; live config נדרש |
| AUTH-03 | Facebook | Core/Web | `/auth/facebook` | identities | `gotIt-front/test/facebook.test.tsx` (blank App ID override, full-SDK readiness, explicit popup over FedCM, load/login timeout, late callback, retry), Core Facebook suites + live | `gotIt-front@7c956aa2e517aed331d98ce9228860bb1afb8f3c` Live: public HTTP, consent popup and unanswered-attempt timeout/retry verified. Real token passes Meta inspection; active Core App Secret is rejected and owner repair is pending. Meta verification/publication and positive Core exchange remain pending ([evidence](24_FACEBOOK_LOGIN_ROLLOUT.md)) |
| AUTH-04 | email verification/reset | Core/Web | TBD | TBD | TBD | מתוכנן P0 |
| BILL-01 | plans/status/trial | Core/clients | `/billing/plans`,`/status` | billing tables | billing/access tests | ממומש |
| BILL-02 | checkout/webhook/portal | Core/Web | billing mutations | checkout/subscription/events | webhook + live Paddle | ממומש; rollout נדרש |
| BILL-03 / FR-BILL-006 | Free status-only in billing UI | Web | Core plans + status | none | `gotIt-front/test/billing-page.test.tsx` (Free and paid states), `npm run check`; Render `dep-dav2137pn0mc739o6l30`, `/ready`, billing asset smoke | local pass at `gotIt-front@196cf9593cda52360160d620d02091071b421ce5`; deployed asset verified; authenticated UI smoke pending |
| CAP-01 | contextual preview | Backend/Web/Chrome | `/captures/preview` | enrichment_runs | enrichment/capture tests | ממומש |
| CAP-02 | sense-safe save | Backend/clients | `/captures` | items/translations/occurrences | integration + replay | ממומש |
| LIB-01 | browse/filter/edit/bulk | Backend/Web | `/learning-items*` | vocabulary tables | library/client tests | ממומש |
| PACK-01 | leveled word packs | Backend/Web | `/word-packs*` | pack tables | word-pack tests | ממומש |
| PRAC-01 | server-authoritative exercises | Backend/Web | `/practice/*` | sessions/exercises/attempts | practice integration | ממומש |
| PRAC-02 | cross-day smart matching rotation | Backend/Web | `/learning/queue`, `/practice/sessions` | current-revision matching attempts | practice integration: next-day queue after correct board; production-data read-only smoke | Deployed; authenticated HTTP smoke pending |
| LEARN-01 | five-skill evidence + mastery | Backend/Web | `/learning/*` | progress/effects/events | learning tests | ממומש |
| GAME-01 | XP/level/streak | Backend/Web | dashboard/gamification | XP/daily/gamification | learning/dashboard tests | ממומש |
| READ-01 | AI reading + quiz | Backend/Web | `/reading*` | generated content | reading/client tests | ממומש; provider acceptance נדרש |
| SPEECH-01 | TTS/pronunciation | Backend/Web | audio/assessments | attempt receipts | speech tests + device | ממומש; live/device נדרש |
| IMG-01 | relevant study image | Backend/Web | study image | item/image assets | provider relevance tests | ממומש; live eval נדרש |
| LESSON-01 | Realtime private lesson | Backend/Web | `/private-lessons*` | lesson tables | lesson suites + live | ממומש; live/device נדרש |
| TRANS-01 | export/import | Backend/Web | `/export`,`/import` | items/receipts | transfer/client tests | ממומש |
| EXT-01 | capture from page | Chrome | capture APIs | browser storage | extension verify + manual | ממומש |
| PRIV-01 | export/delete/retention | all | export + TBD delete | all user data | legal/delete acceptance | חלקי |
| OPS-01 | health/readiness/shutdown | services | `/health`,`/ready` | — | health/gateway tests | ממומש |
| OPS-02 | monitored restoreable production | Ops | — | backups/logs/metrics | restore/incident drill | פתוח P0 |

## 1.1 עקיבות תהליך ומסך

| Requirement group | Process IDs | Screen IDs | Sequence IDs |
|---|---|---|---|
| Identity/session | P01–P03 | SCR-01, SCR-00, SCR-11 | SEQ-01, SEQ-02 |
| Capture/library | P04–P06 | SCR-05–SCR-07, SCR-X01–X03 | SEQ-03, SEQ-05 |
| Packs/practice/learning | P07–P09 | SCR-02–SCR-04, SCR-08 | SEQ-04, SEQ-09 |
| Reading | P10–P11 | SCR-09, SCR-04 | SEQ-06 |
| Private lesson | P12–P13 | SCR-10, SCR-00 | SEQ-07 |
| Billing | P14 | SCR-13, SCR-14, SCR-00 | SEQ-08 |
| Transfer | P15 | SCR-12 | SEQ-10 |
| Release/operations | P16 | n/a | SEQ-11 |

## 2. בעלות RACI מוצעת

דרישות שאושרו ומומשו מקומית: [קורסים אישיים ושיעורי בית](21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md).
קריטריוני PC-01–PC-28 במסמך זה מקשרים את הרחבת P08–P09/P12–P13 למסכי SCR-PC-00A–00B,
SCR-PC-01–04 ול־SCR-10. הם כוללים סשן היכרות בכתב ובקול, אישור העדפות לפני יצירה
ואישור תוכנית או בקשת שינויים לפני הפעלה. ראיות הבדיקה וגבולות המימוש נוספו ב־
[22](22_PERSONAL_COURSES_IMPLEMENTATION.md), בנפרד מטבלאות ה־baseline ההיסטוריות.

| תחום | Responsible | Accountable | Consulted |
|---|---|---|---|
| Core identity/billing | Core engineer | Platform owner | Security, Finance |
| Learning domain/API | Backend engineer | Product tech lead | Learning expert |
| Web UX/gateway | Frontend engineer | Product tech lead | Design, Security |
| Extension/Store | Extension engineer | Product tech lead | Privacy, Support |
| Data/migrations | Backend/Core owners | Platform owner | DBA/Ops |
| Providers/AI quality | Backend engineer | Product owner | Privacy, Finance |
| Security/privacy | Security owner | Business owner | Legal, all engineering |
| Release/observability | Ops owner | Platform owner | all engineering |

שמות אנשים ותאריכים יתווספו בתכנון release; הטבלה אינה מקצה סמכות בפועל.

## 3. Baseline Verification — 2026-09-29

| Repo | Commit | Worktree בעת המיפוי | Gate בהרצה זו |
|---|---|---|---|
| gotIt-backend | `9f57e7e` | clean | typecheck, 140/140 tests, build — עבר |
| gotIt-front | `c410a90` | clean | typecheck, lint, 97/97 tests, build, 13/13 gateway — עבר |
| core-platform | `1e9d259` | clean | typecheck, 26/26 tests, build — עבר |
| gotIt-chrome | `d6659b1` | clean | typecheck, 28/28 tests, build, package verify — עבר |

Release 1.4.4 של `gotIt-chrome@e8d70a45246d7a191e66e784bb0a47774d8076f6`
מעדכן את ראיית EXT-01 לאריזת החנות: `npm run verify` עבר עם 39/39 בדיקות,
ו־`npm run package` בדק את ה־manifest מתוך ה־ZIP הסופי, ללא מפתח ובגרסה
הצפויה. הזהות הקבועה של `dist` אומתה בנפרד. ה־ZIP טרם הועלה לחנות;
בדיקת translation/settings מחוברת מתוך מועמד החנות עוד נדרשת.

ההרצה אינה כוללת integration suites שדורשים PostgreSQL, את 276 בדיקות Playwright
הרספונסיביות, או acceptance חי מול OAuth/Paddle/AI/Speech. build ה־Web עבר עם
אזהרת performance על chunk ראשי גדול מ־500KB; היא אינה שגיאת build אך רשומה ב־Roadmap.

## 4. Contract Drift Register

| ID | פער | השפעה | תיקון מוצע |
|---|---|---|---|
| DRIFT-01 | תוקן בסבב קורסים: קטלוג 68 נתיבים, כולל 7 lesson ו־12 course | בדיקת ספירה/ייחודיות ו־HTTP נוספה | יצירה אוטומטית מתוך mounts עדיין הרחבה |
| DRIFT-02 | תוקן Backend README ל־39 טבלאות לאחר מיגרציית קורסים | ספירה מאומתת ב־PostgreSQL | baseline הישן היה 37 |
| DRIFT-03 | Extension README מזכיר current 41-route release | נתון היסטורי | להפנות ל־API catalog generated |
| DRIFT-04 | מסמכים היסטוריים כוללים סטטוסים ישנים | החלטות עלולות להתבסס על snapshot | הפרויקט הזה הוא entrypoint חדש |

## 5. עדכון המטריצה

בכל שינוי משמעותי:

1. הקצה ID לדרישה.
2. עדכן component/API/data/test.
3. סמן status רק לפי evidence.
4. הוסף migration/compatibility/rollout אם נדרש.
5. עדכן CHANGELOG ו־baseline commit לאחר release.
