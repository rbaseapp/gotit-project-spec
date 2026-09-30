# יומן שינויים

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
