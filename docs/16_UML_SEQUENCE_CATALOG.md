# 16 — קטלוג UML Sequence Diagrams

## 1. שימוש

התרשימים נכתבו ב־PlantUML ונמצאים תחת [`uml/`](../uml). הם מתארים את ה־happy
path וגם מסלולי כשל ובקרה. הם אינם מחליפים את חוזי השדות ב־API או את ה־SQL schema.

| ID | תהליך | קובץ | תנאי התחלה | תנאי סיום |
|---|---|---|---|---|
| SEQ-01 | Registration/Login/OAuth | [01-authentication.puml](../uml/01-authentication.puml) | application פעילה | Core session פעיל |
| SEQ-02 | Refresh + Product Authentication | [02-token-refresh-product-auth.puml](../uml/02-token-refresh-product-auth.puml) | refresh קיים | בקשת מוצר מזוהה/נדחית |
| SEQ-03 | Chrome Capture Preview/Save | [03-capture-extension.puml](../uml/03-capture-extension.puml) | selection + session | receipt שמור |
| SEQ-04 | Practice Attempt | [04-practice-attempt.puml](../uml/04-practice-attempt.puml) | entitlement + items | evidence/XP/review committed |
| SEQ-05 | Semantic Edit | [05-semantic-edit.puml](../uml/05-semantic-edit.puml) | owned item | revision חדשה או conflict |
| SEQ-06 | AI Reading | [06-ai-reading.puml](../uml/06-ai-reading.puml) | quota + entitlement | opened reading/quiz-ready |
| SEQ-07 | Private Lesson | [07-private-lesson.puml](../uml/07-private-lesson.puml) | profile + practice access | report/evidence persisted |
| SEQ-08 | Billing Checkout/Webhook | [08-billing.puml](../uml/08-billing.puml) | authenticated user | entitlement projection updated |
| SEQ-09 | Word Pack Installation | [09-word-pack.puml](../uml/09-word-pack.puml) | compatible pack | links/items committed |
| SEQ-10 | Export/Import | [10-transfer.puml](../uml/10-transfer.puml) | authenticated user/file | export או per-entry results |
| SEQ-11 | Migration/Deployment | [11-deployment.puml](../uml/11-deployment.puml) | approved release+backup | verified deploy/rollback decision |

## 2. כללי סימון

- `alt` — תנאים חלופיים עסקיים.
- `critical` — קטע שחייב להיות אטומי.
- `break` — עצירה ללא המשך תהליך.
- `par` — פעולות מקבילות מותרות.
- `note` — invariant או מידע שאסור להסיק אחרת.
- Database lifeline מייצג את ה־schema הרלוונטי, לא בהכרח instance נפרד.

## 3. מיפוי לתהליכים ולמסכים

| Sequence | Process | Screens |
|---|---|---|
| SEQ-01/02 | P01/P02 | SCR-01, SCR-00 |
| SEQ-03 | P04/P05 | SCR-07, SCR-X01, SCR-X02 |
| SEQ-04 | P08/P09 | SCR-03, SCR-04, SCR-02 |
| SEQ-05 | P06 | SCR-05, SCR-06 |
| SEQ-06 | P10/P11 | SCR-09, SCR-04 article quiz |
| SEQ-07 | P12/P13 | SCR-10 |
| SEQ-08 | P14 | SCR-13, SCR-14, SCR-00 |
| SEQ-09 | P07 | SCR-08, SCR-03 |
| SEQ-10 | P15 | SCR-12 |
| SEQ-11 | P16 | ללא מסך משתמש |

## 4. רינדור

ניתן לרנדר עם PlantUML CLI/IDE extension. אין לבצע שינוי בתרשים בלי לעדכן את
החוזה או התהליך שהוא מייצג. CI עתידי צריך לבצע syntax/render check לכל `.puml`.

