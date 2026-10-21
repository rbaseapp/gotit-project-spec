# 16 — קטלוג UML Sequence Diagrams

## Structured English zero-to-C1 ? 2026-10-21

Sequence C1: Web selects a content-version activity ? Backend authenticates through Core and resolves owner/revision ? product transaction claims the exact operation/activity ? any required AI call runs outside the transaction ? Backend validates the private result and commits evidence plus receipt ? Web resumes the acknowledged cursor. Hints, audio and transcription retain assistance/provenance; failed or lost responses reuse the original UUID. [Canonical process, API and release evidence](48_ENGLISH_ZERO_C1_RUNTIME.md).

## 2026-10-16 ? Multilingual concepts and shared images

Image sequence: authenticated learner ? exact-pair concept resolution ? current shared asset ? persistent claim if missing ? configured provider outside transaction ? revision-checked publication ? localized alt text. Admin writes use existing Core/MFA/receipt/audit sequence. [44 ? Multilingual concepts and shared images](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md).

## Admin owner feedback 0.3 — 2026-10-16

The owner interaction sequence now includes independent Core staff/plan authorization, scoped commands, revocation and effective-access refresh. [Canonical requirements, contracts, checks and rollout](43_ADMIN_CONSOLE_FOUNDATION.md#owner-feedback-completion-03-2026-10-16).

## 2026-10-11 — Fixed daily task rewards and answer Toasts (DEV)

Owner now selected fixed 100/75/50 XP completion bonuses. Server ledger awards once
per scoped profile day; Web displays server amounts/claimed state and persistent
green/red quick-review Toasts with success confetti. Additive dashboard contract;
existing XP tables, no migration, Core/billing or privacy expansion. Completion
criteria, cap separation, sequence, checks and rollout are owned by the
[canonical dashboard follow-up](35_DASHBOARD_DESIGN_DEV.md#fixed-task-rewards-and-answer-toasts--2026-10-11).

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

| ID     | תהליך                            | קובץ                                                                            | תנאי התחלה                | תנאי סיום                         |
| ------ | -------------------------------- | ------------------------------------------------------------------------------- | ------------------------- | --------------------------------- |
| SEQ-01 | Registration/Login/OAuth         | [01-authentication.puml](../uml/01-authentication.puml)                         | application פעילה         | Core session פעיל                 |
| SEQ-02 | Refresh + Product Authentication | [02-token-refresh-product-auth.puml](../uml/02-token-refresh-product-auth.puml) | refresh קיים              | בקשת מוצר מזוהה/נדחית             |
| SEQ-03 | Chrome Capture Preview/Save      | [03-capture-extension.puml](../uml/03-capture-extension.puml)                   | selection + session       | receipt שמור                      |
| SEQ-04 | Practice Attempt                 | [04-practice-attempt.puml](../uml/04-practice-attempt.puml)                     | entitlement + items       | evidence/XP/review committed      |
| SEQ-05 | Semantic Edit                    | [05-semantic-edit.puml](../uml/05-semantic-edit.puml)                           | owned item                | revision חדשה או conflict         |
| SEQ-06 | AI Reading                       | [06-ai-reading.puml](../uml/06-ai-reading.puml)                                 | quota + entitlement       | opened reading/quiz-ready         |
| SEQ-07 | Private Lesson                   | [07-private-lesson.puml](../uml/07-private-lesson.puml)                         | profile + practice access | report/evidence persisted         |
| SEQ-08 | Billing Checkout/Webhook         | [08-billing.puml](../uml/08-billing.puml)                                       | authenticated user        | entitlement projection updated    |
| SEQ-09 | Word Pack Installation           | [09-word-pack.puml](../uml/09-word-pack.puml)                                   | compatible pack           | links/items committed             |
| SEQ-10 | Export/Import                    | [10-transfer.puml](../uml/10-transfer.puml)                                     | authenticated user/file   | export או per-entry results       |
| SEQ-11 | Migration/Deployment             | [11-deployment.puml](../uml/11-deployment.puml)                                 | approved release+backup   | verified deploy/rollback decision |

## 2. כללי סימון

- `alt` — תנאים חלופיים עסקיים.
- `critical` — קטע שחייב להיות אטומי.
- `break` — עצירה ללא המשך תהליך.
- `par` — פעולות מקבילות מותרות.
- `note` — invariant או מידע שאסור להסיק אחרת.
- Database lifeline מייצג את ה־schema הרלוונטי, לא בהכרח instance נפרד.

## 3. מיפוי לתהליכים ולמסכים

| Sequence  | Process | Screens                     |
| --------- | ------- | --------------------------- |
| SEQ-01/02 | P01/P02 | SCR-01, SCR-00              |
| SEQ-03    | P04/P05 | SCR-07, SCR-X01, SCR-X02    |
| SEQ-04    | P08/P09 | SCR-03, SCR-04, SCR-02      |
| SEQ-05    | P06     | SCR-05, SCR-06              |
| SEQ-06    | P10/P11 | SCR-09, SCR-04 article quiz |
| SEQ-07    | P12/P13 | SCR-10                      |
| SEQ-08    | P14     | SCR-13, SCR-14, SCR-00      |
| SEQ-09    | P07     | SCR-08, SCR-03              |
| SEQ-10    | P15     | SCR-12                      |
| SEQ-11    | P16     | ללא מסך משתמש               |

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

## 2026-10-07 - Private lesson conversation room

[SEQ-16: acknowledged written conversation and completion](../uml/16-lesson-written-conversation.puml) supplements SEQ-07; guided transactions retain SEQ-14. [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).

## 2026-10-11 - Focus games in DEV

SEQ-17: [Focus practice in DEV](../uml/17-focus-practice-dev.puml) describes issuance, typed/voice receipt retry, checkpoints and close reconciliation. [Canonical contract and evidence](37_FOCUS_GAMES_DEV.md).

### DEV practice alignment — 2026-10-12

The DEV sequence now includes fresh exercises after consumed wrong answers and one listening end-queue repeat, with receipt-only XP. See [canonical scope and evidence](37_FOCUS_GAMES_DEV.md#owner-plan-versus-dev-alignment--2026-10-12).

SEQ-17 alignment includes fresh-question retries and once-only listening requeue: [sequence source](../uml/17-focus-practice-dev.puml).

## 2026-10-12 — SEQ-13 library return context

My Words passes exact selected IDs, language and safe library return state into existing practice entry. Drawer mutations retain existing semantic-edit/tag/bulk transactions; optional card projection is read-only. [Canonical behavior, API, validation and DEV release evidence](38_MY_WORDS_DESIGN_DEV.md).

## 2026-10-12 - Illustrated My Programs (DEV)

Owner-requested program artwork and language mascot use existing quota/cache controls; learning and billing truth are unchanged. Screen/API/storage/privacy/process/validation and rollout are canonical in [39](39_PROGRAMS_DESIGN_DEV.md); interaction sequence: [program artwork](../uml/18-program-artwork-dev.puml).

## Operational administration, 2026-10-16

The owner requested completing all eight Admin capabilities, including editing and
program creation. The cross-service implementation, requirements, API/data/security
boundaries, browser states and rollout evidence are maintained in
[the canonical Admin release](43_ADMIN_CONSOLE_FOUNDATION.md#operational-administration-02-2026-10-16).
This records local implementation and verification; production deployment is a
separate explicitly recorded release step. Existing learner Web/Chrome contracts
remain compatible.

## Admin user details — 2026-10-16

The [administration sequence](../uml/seq_admin_operations.puml) now includes user-card reads routed independently to Core or Product, scoped projections and per-owner failures. [User-detail contract](44_ADMIN_USER_DETAILS.md).

## All-user vocabulary and quick image replacement - 2026-10-16

The all-user word browsing and image-replacement interaction is in [seq_admin_words](../uml/seq_admin_words.puml). [Canonical contract and verification](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#all-user-vocabulary-and-quick-image-replacement--2026-10-16).

## Quick word-card images and automatic backfill - follow-up 2026-10-16

FR-CON-07/08 removes manual setup from image replacement: cards offer an inline Pixabay gallery and one-click GPT with editable prompt. Migration 1792192000000 derives exact bilingual image identities and reuses existing pictures; learning state is preserved. New unlinked words are prepared within the authorized action. [Current contract, process and production evidence](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#quick-card-actions-and-automatic-historical-linking-follow-up-2026-10-16).

## Admin program and lesson editor - 2026-10-16

Application-scoped shared and personal unit content, full course revision,
published learner templates, Realtime previews/snapshots and measured lesson
statistics are owned by [45 - Admin program editor](45_ADMIN_PROGRAM_EDITOR.md).
This is local/integration implementation evidence; shared-environment migration
and deployment remain separate.

## Automatic concept assignment - 2026-10-16

Automatic sequence: capture transaction commits word+job -> worker claims -> AI descriptor -> indexed candidates -> AI decision -> short revision-checked publication transaction -> Admin refresh and image reuse. [Canonical contract](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#automatic-assignment---2026-10-16).


## 2026-10-21 - Free learning paths and reversible skips

FR-PATH-CHOICES / UC-PATH-CHOICES / P-LEARNING-NAVIGATION: prepared programs and personal courses allow direct content selection, with reversible skips stored separately from completed learning. Backend/Web ownership, exact API/data contracts, invariants, acceptance and DEV release evidence are maintained in the [canonical feature contract](49_LEARNING_PATH_CHOICES.md).

Sequence: [explicit navigation and choice transaction](../uml/20-learning-path-choices.puml).
