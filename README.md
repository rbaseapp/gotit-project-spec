# GotIt — מפרט פרויקט מלא

פרויקט זה הוא מקור האמת המאוחד לאפיון מוצר GotIt ולמערכת rbase שעליה הוא נשען.
המסמכים מתארים את המוצר, הארכיטקטורה, צד השרת, צד הלקוח, Core, תוסף Chrome,
חוזי API, מודל הנתונים, אבטחה, תפעול, בדיקות ומפת הדרך.

**תאריך אפיון:** 2026-09-30; baseline קוד יציב: 2026-09-29  
**שפת המסמכים:** עברית; שמות קוד, שדות ונתיבים נשמרים באנגלית.  
**סוג בסיס:** `as-built` — מתאר קודם כול את הקוד הקיים, ובנפרד דרישות עתידיות.

## איך לקרוא את האפיון

1. [תקציר ומפת מסמכים](docs/00_INDEX.md)
2. [קטלוג היכולות הנוכחי](docs/18_CURRENT_FEATURES.md)
3. [אפיון תעשייה וניהול](docs/15_INDUSTRIAL_ENGINEERING_SPEC.md)
4. [קטלוג מסכים](docs/17_SCREEN_CATALOG.md) ו־[UML Sequence](docs/16_UML_SEQUENCE_CATALOG.md)
5. [חזון, קהלים ודרישות מוצר](docs/01_PRODUCT_REQUIREMENTS.md)
6. [ארכיטקטורת המערכת](docs/02_SYSTEM_ARCHITECTURE.md)
7. מפרטי רכיבים: [Core](docs/03_CORE_PLATFORM.md), [Backend](docs/04_GOTIT_BACKEND.md),
   [Frontend](docs/05_WEB_FRONTEND.md), [Chrome](docs/06_CHROME_EXTENSION.md)
8. חוזים טכניים: [API](docs/07_API_CONTRACTS.md), [נתונים](docs/08_DATA_MODEL.md),
   [אבטחה](docs/09_SECURITY_PRIVACY.md)
9. מסירה: [תשתיות ותפעול](docs/10_OPERATIONS.md), [איכות ובדיקות](docs/11_TESTING.md),
   [Roadmap](docs/12_ROADMAP.md), [עקיבות](docs/13_TRACEABILITY.md)
10. מסמכי דרישות פורמליים: [קטלוג דרישות](docs/19_REQUIREMENTS_CATALOG.md)
    ו־[Use Cases](docs/20_USE_CASE_CATALOG.md)

מודל AI שמקבל את הפרויקט צריך להתחיל ב־[AGENTS.md](AGENTS.md). הקובץ כולל את
ה־mental model, סטטוס ה־working trees, חוקי ארכיטקטורה, invariants, workflow,
checklists, פקודות אימות וכללי handoff.

## מקורות הקוד שנבדקו

| רכיב | נתיב יחסי ב־workspace | commit שנבדק |
|---|---|---|
| GotIt Backend | `../gotIt-backend` | `9f57e7eefbc9a8915539fb1de778b36904f1d0f8` |
| GotIt Frontend | `../gotIt-front` | `c410a90cd407ed45112d7c0123c7b295b2e93a12` |
| rbase Core | `../core-platform` | `1e9d259ef141c17ee6c37c20596593d7267188ba` |
| Chrome Extension | `../gotIt-chrome` | `d6659b1e694301518b327e103918ae2628e8d979` |

## כללי סטטוס

- **ממומש** — קיים בקוד הנוכחי.
- **מאומת מקומית** — עבר שערי איכות בהרצה המתועדת בפרויקט זה.
- **מאומת Production** — קיימת ראיה מפורשת לבדיקה בסביבה חיה.
- **חלקי** — קיים מימוש, אך חסר חוזה, אינטגרציה, כיסוי או השלמת rollout.
- **מתוכנן** — דרישה מאושרת שאינה ממומשת.
- **החלטה פתוחה** — אין עדיין החלטת מוצר או הנדסה מחייבת.

אין להסיק שמימוש קיים פרוס ל־Production ללא סימון מפורש. אין להעתיק סודות,
מפתחות API, אסימונים או כתובות מסד נתונים למסמכים.
