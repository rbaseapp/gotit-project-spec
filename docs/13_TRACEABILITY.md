# 13 — מטריצת עקיבות ואחריות

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
| AUTH-03 | Facebook | Core/Web | `/auth/facebook` | identities | facebook suite + live | ממומש; live config נדרש |
| AUTH-04 | email verification/reset | Core/Web | TBD | TBD | TBD | מתוכנן P0 |
| BILL-01 | plans/status/trial | Core/clients | `/billing/plans`,`/status` | billing tables | billing/access tests | ממומש |
| BILL-02 | checkout/webhook/portal | Core/Web | billing mutations | checkout/subscription/events | webhook + live Paddle | ממומש; rollout נדרש |
| CAP-01 | contextual preview | Backend/Web/Chrome | `/captures/preview` | enrichment_runs | enrichment/capture tests | ממומש |
| CAP-02 | sense-safe save | Backend/clients | `/captures` | items/translations/occurrences | integration + replay | ממומש |
| LIB-01 | browse/filter/edit/bulk | Backend/Web | `/learning-items*` | vocabulary tables | library/client tests | ממומש |
| PACK-01 | leveled word packs | Backend/Web | `/word-packs*` | pack tables | word-pack tests | ממומש |
| PRAC-01 | server-authoritative exercises | Backend/Web | `/practice/*` | sessions/exercises/attempts | practice integration | ממומש |
| PRAC-02 | cross-day smart matching rotation | Backend/Web | `/learning/queue`, `/practice/sessions` | current-revision matching attempts | practice integration: next-day queue after correct board | Implemented locally; deployment pending |
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
