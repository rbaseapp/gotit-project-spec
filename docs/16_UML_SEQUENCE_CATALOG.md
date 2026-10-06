# 16 — קטלוג UML Sequence Diagrams

## 2026-10-06 - Meaning recognition rounds and touch repair

SEQ-04 now records repeated matching/ordinary rounds and explicit completion after the existing mistake repair. [Behavior and source](29_MEANING_MATCHING_ROUNDS.md).

## 2026-10-05 - UX 2.1 DEV checkpoint

SEQ-13 / P06/P08/P10/P11 records independent word-game return context, language metadata, authoritative attempts and stable article-publication retry. [Source](../uml/13-ux-context-reading.puml). [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

SEQ-01 now includes mailbox-code verification, explicit login and password recovery with session revocation. [Contract and release evidence](27_EMAIL_AUTH_RECOVERY.md).

## 2026-10-05 - Selected-language practice

SEQ-04: Web resolves/preserves selected language before unscoped creation and includes it in resume links. Active resume retrieves existing study-card endpoint and checks language before setting session UI or issuing exercises. Backend checks exact language and compatible script throughout snapshots/cards/issuance. This adds a validation request on previously started resumes, with no new API or service. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## תיקון רצף השיעור — 2026-09-30

SEQ-07 עודכן לשימור הוראות בכל תור יזום ולזרימת השמעה/זמן חשיבה/המשך מוגבל.
הבקר פועל ב־Web, והדמו הפנימי אינו כולל אותו. חוזה ההתנהגות: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## SEQ-12 — קורס אישי ושיעורי בית

נוסף [12-personal-course.puml](../uml/12-personal-course.puml): שיחה, אישור העדפות,
יצירה, אישור גרסה, שיעור, בית ושמירה/המשך. [SEQ-07](../uml/07-private-lesson.puml)
הורחב בהקשר קורס וביצירת חבילה idempotent לפני השלמת היומן.
חוזים וגבולות אטומיות ב־[22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

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
# SEQ-14 — Guided lesson activity and report

[14-guided-lesson-dev.puml](../uml/14-guided-lesson-dev.puml) covers owned context, minute allocation, activity creation, revision/receipt checks, bounded AI evaluation and atomic report cleanup with retry on failure. [Source and acceptance status](30_FIGMA_FULL_DEV.md).


## 2026-10-06 — DEV learning-path correction

Sequence: map GET → learn/known evidence → session POST → authoritative eligibility → reject 409 or allocate provider/minutes. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 — Unit study source checkpoint

Unit flow: visible pack detail → independent image/example requests → guarded cache/provider → unit game chooser → pack-scoped session. Viewing creates no progress. [Contract, source and verification](32_UNIT_STUDY_AND_GAME_SCOPE.md).


## 2026-10-06 - Practice clarity Web source checkpoint

[Native reading-guide sequence](../uml/15-practice-reading-guides.puml) covers scoped batch selection, cache reuse, bounded provider work and conditional persistence. Pronunciation study metadata and automatic playback remain separate from recording/attempt grading. [Exact contract and verification](32_PRACTICE_CLARITY.md).
