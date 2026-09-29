# 00 — תקציר ומפת מסמכים

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
| Web application ו־production gateway | ממומש |
| Chrome MV3 capture client | ממומש |
| password reset ואימות דוא״ל | לא ממומש |
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
| [21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL](21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md) | Product/UX/Learning | הצעה: תוכנית קורס מלאה מראש, יחידות ושיעורי בית באפליקציה |

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
