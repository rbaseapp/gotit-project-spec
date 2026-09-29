# יומן שינויים

## 2026-09-30

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
