# 00 — תקציר ומפת מסמכים

## 2026-10-05 - UX 2.1 DEV checkpoint

UX 2.1 DEV redesign is locally implemented and verified; server release remains blocked by Backend DEV targeting the production DB. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

Email verification/reset: Core is locally and integration verified; provider, clients and production acceptance are tracked in [27](27_EMAIL_AUTH_RECOVERY.md).

Practice language isolation: [26 - incident, contracts, tests and rollout](26_PRACTICE_LANGUAGE_ISOLATION.md).

## תקציר מנהלים

GotIt הוא מוצר לימוד שפה מבוסס אוצר מילים בהקשר. המשתמש לוכד מילה או ביטוי
מה־Web או מתוסף Chrome, מאשר משמעות ושפות, שומר אותו כסנס נפרד או ממזג לסנס
קיים, ומתרגל אותו במספר מיומנויות. השרת מנהל הוכחות למידה, תזמון חזרות, XP,
קריאה מותאמת, תמונות לימוד ושיעור קולי פרטי. rbase Core מספק זהות, sessions,
תפקידי משתמש, חיוב ו־entitlements משותפים.

המערכת בנויה מארבעה רכיבים עצמאיים:

```text
Web Frontend ───────┐
                    ├──> rbase Core: auth, identity, billing, entitlements
Chrome Extension ──┤
                    └──> GotIt Backend: vocabulary, learning, AI, speech
                                      │
                                      └──> PostgreSQL: core + product_gotit
```

### מצב נוכחי בקצרה

| תחום | מצב |
|---|---|
| Auth בדוא״ל, Google ו־Facebook | ממומש ב־Core |
| access JWT + rotating refresh session | ממומש |
| Billing, trial, Paddle ו־entitlements | ממומש; השלמת rollout מסחרי דורשת בדיקות חיות |
| Capture, ספרייה, tags ו־word packs | ממומש |
| Practice, five-skill evidence, queue, mastery, XP | ממומש |
| AI reading, study images, speech | ממומש ומותנה בספקים ובהרשאות |
| שיעור פרטי Realtime, roadmap והערכת רמה | ממומש; דורש אימות ספק/מכשיר מתמשך |
| קורס אישי, שני אישורים ושיעורי בית באפליקציה | ממומש מקומית; לא נפרס; [פרטים וגבולות](22_PERSONAL_COURSES_IMPLEMENTATION.md) |
| Web application ו־production gateway | ממומש |
| Chrome MV3 capture client | ממומש |
| Email verification / password reset | Core integration verified; [activation status](27_EMAIL_AUTH_RECOVERY.md) |
| מחיקה קבועה ו־retention policy מלא | החלטה פתוחה |

## מפת המסמכים

| מסמך | קהל יעד | תשובה מרכזית |
|---|---|---|
| [01_PRODUCT_REQUIREMENTS](01_PRODUCT_REQUIREMENTS.md) | מוצר, UX, הנהלה | מה בונים, למי ולמה |
| [02_SYSTEM_ARCHITECTURE](02_SYSTEM_ARCHITECTURE.md) | ארכיטקטים ומפתחים | איך המערכת מחולקת ומתקשרת |
| [03_CORE_PLATFORM](03_CORE_PLATFORM.md) | צוות Core | זהות, sessions, billing ו־roles |
| [04_GOTIT_BACKEND](04_GOTIT_BACKEND.md) | Backend | מודולים, חוקים וספקים |
| [05_WEB_FRONTEND](05_WEB_FRONTEND.md) | Frontend/UX | מסכים, state, gateway ונגישות |
| [06_CHROME_EXTENSION](06_CHROME_EXTENSION.md) | Extension | לכידה, storage, permissions ו־release |
| [07_API_CONTRACTS](07_API_CONTRACTS.md) | כל צוותי הפיתוח | endpoints, auth, idempotency ושגיאות |
| [08_DATA_MODEL](08_DATA_MODEL.md) | Backend/Data | schemas, tables, בעלות ויחסים |
| [09_SECURITY_PRIVACY](09_SECURITY_PRIVACY.md) | Security/Legal | trust boundaries, threats ופרטיות |
| [10_OPERATIONS](10_OPERATIONS.md) | DevOps/SRE | build, deploy, migrations ו־runbooks |
| [11_TESTING](11_TESTING.md) | QA/Engineering | אסטרטגיית בדיקות ושערי שחרור |
| [12_ROADMAP](12_ROADMAP.md) | Product/Engineering | פערים, סדר עדיפויות ו־DoD |
| [13_TRACEABILITY](13_TRACEABILITY.md) | ניהול פרויקט | דרישה → רכיב → API → נתונים → בדיקה |
| [14_GLOSSARY](14_GLOSSARY.md) | כולם | מונחים ושפה אחידה |
| [15_INDUSTRIAL_ENGINEERING_SPEC](15_INDUSTRIAL_ENGINEERING_SPEC.md) | תעשייה וניהול/מוצר | Charter, SIPOC, תהליכים, RACI, KPI ו־FMEA |
| [16_UML_SEQUENCE_CATALOG](16_UML_SEQUENCE_CATALOG.md) | Product/Engineering/AI | אינטראקציות מקצה לקצה וקובצי PlantUML |
| [17_SCREEN_CATALOG](17_SCREEN_CATALOG.md) | Product/UX/QA | מסכים, wireframes, states וקריטריוני קבלה |
| [18_CURRENT_FEATURES](18_CURRENT_FEATURES.md) | כולם/AI handoff | מה קיים, conditional, חלקי או בתהליך |
| [19_REQUIREMENTS_CATALOG](19_REQUIREMENTS_CATALOG.md) | Product/BA/QA/AI | BR/FR/NFR ממוספרים, עדיפות וקבלה |
| [20_USE_CASE_CATALOG](20_USE_CASE_CATALOG.md) | Product/UX/Engineering | Actors, preconditions, flows ו־postconditions |
| [21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL](21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md) | Product/UX/Learning | דרישות קורס אישי ושיעורי בית שאושרו לפיתוח |
| [22_PERSONAL_COURSES_IMPLEMENTATION](22_PERSONAL_COURSES_IMPLEMENTATION.md) | Product/Engineering/QA | מימוש, חוזים, נתונים, בדיקות וגבולות שחרור |
| [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md) | Product/Engineering/QA | Hebrew-to-English catalog, rollout status, and path handoff |

## עקרונות שאינם נתונים לפרשנות

1. Core ו־GotIt Backend הם שירותים נפרדים עם מחזור חיים ופריסה עצמאיים.
2. `application_id` הוא גבול אבטחה; אין משתמש גלובלי משותף בין מוצרים.
3. זהות מוצר מתקבלת מ־Core. לקוח אינו רשאי לבחור `application_user_id`.
4. לקוחות שולחים תשובה או self-rating, לא score, XP או תוצאת למידה סמכותית.
5. מוטציות שניתן לשחזר חייבות idempotency key וקבלה שמורה.
6. מפתחות ספקי AI/Translation/Speech נשארים בשרת בלבד.
7. הקלטת קול של המשתמש חולפת ואינה נשמרת במסלול ההגייה.
8. עריכה סמנטית מאפסת הוכחות עדכניות בלי למחוק היסטוריית ניסיונות ו־XP.
9. קוד קיים גובר על מסמך היסטורי; שינוי חוזה מחייב עדכון מסמכים ובדיקות.
# Canonical Figma learning/account implementation

[35 — Dashboard design in DEV](35_DASHBOARD_DESIGN_DEV.md) owns the two approved
dashboard variants, existing-mechanism decision, hostname rollout boundary and
verification/deployment evidence.

[30 — Figma full DEV](30_FIGMA_FULL_DEV.md) owns the 2026-10-06 guided-lesson, unit-word, interface-preference and scoped-history contracts and their exact source/deployment status. [SEQ-14](../uml/14-guided-lesson-dev.puml) describes activity and report transactions.


## 2026-10-06 — DEV learning-path correction

DEV learning-path fidelity and sequencing. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 — Unit study media and scoped games

[Unit study contract and verification](32_UNIT_STUDY_AND_GAME_SCOPE.md) records
catalog images/examples, familiar-word exclusion, scoped game selection, source
commits, regression results and the pending release destination.


## 2026-10-07 - Private lesson conversation room

Canonical conversation-room contract, exact source and release evidence for SCR-10: [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).


## 2026-10-11 ? Approved DEV practice design

[36 ? Practice design in DEV](36_PRACTICE_DESIGN_DEV.md) owns the selected Claude practice artboard, original assets, DEV-only gate, live-data behavior and release evidence.


## 2026-10-11 - Focus games in DEV

Canonical focus-game design, behavior, DEV boundary and evidence. [Canonical contract and evidence](37_FOCUS_GAMES_DEV.md).


## 2026-10-12 — My Words design in DEV

[Canonical behavior, API, validation and DEV release evidence](38_MY_WORDS_DESIGN_DEV.md).


## 2026-10-12 - Illustrated My Programs (DEV)

DEV programs now derive card content/progress from existing resources, generate scoped AI covers and language-specific Mohi, and preserve the fixed shared header. API, cache/privacy invariants, responsive QA, checks and rollout are owned by [39 - Programs design DEV](39_PROGRAMS_DESIGN_DEV.md).


## 2026-10-13 - DEV program chooser

The screenshot-based, dynamic new-program chooser is implemented and locally verified in Web. Final desktop/mobile/browser QA passed after reconnection; the new chooser is now deployed and authenticated navigation is verified in DEV. See [canonical behavior and evidence](40_PROGRAM_CHOOSER_DEV.md).


## 2026-10-13 - Prepared program map design (DEV)

The supplied screenshot is implemented as a dynamic, modular prepared-unit map
under the existing DEV gate. Server progression/locks and the canonical shared
header are retained. Behavior, acceptance, source and exact release evidence are
owned by [41 - Program map DEV](41_PROGRAM_MAP_DESIGN_DEV.md).


## 2026-10-14 - Settings reference design in DEV

SCR-11 now has the approved category navigation and profile layout in Web DEV,
with existing supported settings, isolated category saves, eight locales and
320px RTL/LTR. Unsupported account actions remain explicitly unavailable per
owner selection. No API/schema/Core/Backend/Chrome change. Local validation and
exact deployment status are owned by the [canonical settings contract](42_SETTINGS_DESIGN_DEV.md).


## 2026-10-14 - Independent Admin Console foundation

Created a separate React-admin/Node administration foundation with Core-authenticated access, eight explicit module connection states, read-only gateway, CI and a Render Web Service Blueprint. Owner-service management APIs and writes remain deferred. Local checks include 23 tests, build, clean dependency audit, official Blueprint schema validation and isolated desktop/mobile browser QA. [Canonical scope and evidence](43_ADMIN_CONSOLE_FOUNDATION.md).


## Admin user details — 2026-10-16

[44 — Admin user details](44_ADMIN_USER_DETAILS.md): complete recorded user history, course roadmaps, billing/access distinction and audited preference editing.
