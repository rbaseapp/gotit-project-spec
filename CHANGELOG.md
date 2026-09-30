# יומן שינויים

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
