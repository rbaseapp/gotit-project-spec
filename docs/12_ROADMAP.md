# 12 — מצב, פערים ומפת דרך

## Structured English zero-to-C1 ? 2026-10-21

The zero-to-C1 runtime implementation and DEV release are tracked in the canonical runtime contract. External CEFR calibration, expert phoneme review and a longitudinal learner study remain distinct validation work; no native-equivalence claim is made. [Canonical implementation and DEV evidence](48_ENGLISH_ZERO_C1_RUNTIME.md).

## Admin owner feedback 0.3 — 2026-10-16

The reported usability and operational gaps are implemented and locally verified for 0.3; ordered deployment and owner production acceptance remain the release follow-up. [Canonical requirements, contracts, checks and rollout](43_ADMIN_CONSOLE_FOUNDATION.md#owner-feedback-completion-03-2026-10-16).

## 2026-10-05 - UX 2.1 DEV checkpoint

UX 2.1 existing-contract UI implementation/local gates are complete for the coverage in 28. Release remains blocked by DEV Backend DB isolation. Guided task/stage protocol, microphone-free text teacher, durable voice resume/billing pause, new reward economies and readiness-based teacher stations remain proposed; six-locale new helper copy uses English fallback. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

FR-AUTH-009/010 are implemented and locally/integration verified in Core; client rollout, verified sending domain and live acceptance remain release gates. [Current status](27_EMAIL_AUTH_RECOVERY.md).

## תיקון רצף השיעור — 2026-09-30

תיקון שפה, רצף הוראה והמשך אחרי שתיקה ממומש מקומית. קבלה קולית חיה ואימות
פדגוגי של מספר רמות ושפות עדיין נדרשים; בדיקות mock אינן סוגרות פערים אלה: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## עדכון 2026-09-30 — קורסים ושיעורי בית

זרימת היכרות → אישור העדפות → תוכנית מלאה → אישור קורס → שיעור → סיכום → בית
ממומשת מקומית. [22](22_PERSONAL_COURSES_IMPLEMENTATION.md) מפרט קוד וראיות. לשחרור
נדרשים אימות ספק/מודל ומכשירי קול, ביקורת סילבוסים וכיול פדגוגי. חזרה מרווחת עצמאית
ליעדי קורס ובדיקת ידע לדילוג על יחידה הן הרחבות שלא מומשו; retention מסומן לא נבדק.
לא נוספו יעדי KPI מספריים או הבטחת שליטה מלאה בשפה.

## 1. Baseline נוכחי

ארבעת הרכיבים ממומשים ונמצאים במאגרים נפרדים. ה־Backend כולל 56 handlers
מוצריים בפועל, Web כולל מסכי live ו־demo, Core כולל auth+billing, והתוסף כולל
capture מלא. סטטוס Production משתנה לפי רכיב ו־integration; אין להסיק מהימצאות
קוד שכל ספק/flow עבר acceptance חי.

## 2. פערים בעדיפות P0 — לפני הרחבה ציבורית

| פער                               | סיכון                       | תוצר סיום                                 |
| --------------------------------- | --------------------------- | ----------------------------------------- |
| password email verification/reset | השתלטות/שירות לקוי          | flows, provider, throttling, tests        |
| API catalog חסר 7 lesson routes   | contract drift              | catalog/generated contract test           |
| migration role separation עקבי    | runtime עם DDL/rollback קשה | pre-deploy migrator בכל services          |
| Production provider acceptance    | feature מציג זמין אך נכשל   | matrix מתועדת לכל ספק/model               |
| Paddle live reconciliation        | גישה/חיוב שגויים            | webhook, renewal, failure, cancel, refund |
| retention/account deletion        | פרטיות/ציות                 | policy, API/process, SLA, legal approval  |
| monitoring/alerts/on-call         | incident ללא גילוי          | dashboards, SLOs, paging, runbooks        |
| backup restore drill              | אובדן נתונים                | RPO/RTO מאושרים ותרגיל מוצלח              |

## 3. P1 — איכות מוצר והפחתת סיכון

- contract generation או OpenAPI מתוך schemas/routes.
- CI אחיד cross-repo ו־compatibility test בין clients לשרתים.
- calibrated CEFR evaluation על corpus אנושי; כרגע הערכות דורשות validation.
- mastery/interval/XP experiments מבוססי usage אמיתי.
- physical-device validation ל־Safari safe area, Android keyboard, microphone.
- פיצול bundle ראשי של Web: build תקין אך chunk מרכזי הוא כ־1.15MB לפני gzip
  ומפעיל אזהרת Vite; יש לקבוע performance budget ולבצע vendor/manual chunking.
- billing UI/locale/tax/refund acceptance.
- admin/support tools לקריאת audit, revoke session ו־entitlement diagnosis.
- provider cost budgets, alerts ו־kill switches.
- accessibility audit עם screen readers אמיתיים.

## 4. P2 — הרחבות מוצר

- achievements/badges רק לאחר anti-gaming design.
- import formats נוספים עם mapping preview.
- permanent deletion self-service.
- email notifications/daily reminders לפי consent.
- vocabulary sharing/collaboration לאחר privacy model.
- native/mobile clients רק עם reuse של contracts ולא business logic כפול.
- providers/models נוספים דרך registries קיימים.

## 5. החלטות פתוחות

| החלטה                             | Owner מוצע        | Deadline/Trigger     |
| --------------------------------- | ----------------- | -------------------- |
| מכסת AI reading לפי plan          | Product + Finance | לפני pricing launch  |
| ערכי XP ו־review intervals סופיים | Learning + Data   | אחרי cohort data     |
| ספק pronunciation עיקרי           | Product + Eng     | לפני marketing claim |
| retention ומחיקה קבועה            | Legal + Security  | לפני public launch   |
| paragraph capture default         | Product + Privacy | לפני Store review    |
| SLO/RPO/RTO                       | Eng + Ops         | לפני paid GA         |
| supported browsers/devices        | Product + QA      | release policy       |
| CEFR claim wording                | Learning + Legal  | לפני public claim    |

## 6. Milestones

### M0 — Specification Baseline

- מסמכים אלה מאושרים.
- owners assigned לכל subsystem.
- contract drift מתוקן.
- status labels ו־release evidence אחידים.

### M1 — Secure Account GA

- verification/reset/email provider.
- brute-force controls ו־session admin.
- privacy/terms/retention/account deletion.
- security review ו־incident process.

### M2 — Paid Production GA

- Paddle live end-to-end/reconciliation.
- entitlements בכל Web/Extension/API.
- backup/restore, SLO/alerts/on-call.
- provider cost and availability gates.

### M3 — Learning Quality Validation

- mastery/queue/XP telemetry.
- offline evaluation ו־human learning review.
- calibrated level evidence.
- A/B mechanism עם algorithm versioning.

### M4 — Scale and Portfolio Reuse

- OpenAPI/SDK generation.
- Core admin/email/observability modules.
- product bootstrap template.
- multi-product isolation/load audit.

## 7. Definition of Done — GotIt V1

V1 נחשב מוכן רק כאשר משתמש אמיתי יכול:

1. ליצור ולאמת חשבון או להיכנס עם OAuth.
2. ללכוד פריט ב־Web/Chrome, לבחור משמעות ולשמור idempotently.
3. לערוך ולנהל ספרייה, tags, packs ו־soft delete/restore.
4. לתרגל בכל mode נתמך עם scoring סמכותי.
5. להגיע ל־learned/established לפי evidence ולהבין את ההתקדמות.
6. לקבל dashboard, streak ו־XP עקביים.
7. ליצור ולפתוח קריאה, לבצע quiz ולשמור history.
8. להשתמש ב־speech/private lesson במכשירים הנתמכים.
9. לשדרג/לבטל subscription ולשמור read-only data access.
10. לייצא נתונים ולבקש מחיקה לפי policy.

ובמקביל: migration/backup/rollback, monitoring, security, accessibility, legal,
support ו־live acceptance הושלמו עם ראיות.

# Guided learning DEV milestone — 2026-10-06

Backend contracts are implemented/integration verified at `0404c8cc72bbb4f32a125f4c9e255318beff9a60`; remaining gates are DEV schema rollout, Web final quality/fidelity acceptance, exact-SHA deployment and authenticated provider smoke. Parent/child account relationships, account deletion and native Google Play purchases are explicitly a separate owner-selected phase. Reward-economy concepts and new published language catalogs are not inferred from design examples. [Scope and current status](30_FIGMA_FULL_DEV.md).

## 2026-10-06 — DEV learning-path correction

Unit gating implemented; cross-unit adaptive checkpoint remains outside this contract. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 - Practice clarity Web source checkpoint

Requested practice clarity and native reading guides are locally implemented. Publication, target selection, exact-SHA deployment and authenticated provider/audio smoke remain open. [Canonical source and evidence](32_PRACTICE_CLARITY.md).

## 2026-10-07 - Private lesson conversation room

Approved private-lesson room implementation and remaining physical-device acceptance: [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).

### DEV practice alignment — 2026-10-12

Owner alignment implementation is local-complete; real device microphone/audio and provider latency remain acceptance boundaries, independently of the exact DEV deployment status. See [canonical scope and evidence](37_FOCUS_GAMES_DEV.md#owner-plan-versus-dev-alignment--2026-10-12).

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

## All-user vocabulary and quick image replacement - 2026-10-16

All-user vocabulary and quick replacement are released to main and deployed; paid-provider acceptance and private Core CI checkout access remain follow-up items. [Canonical contract and verification](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#all-user-vocabulary-and-quick-image-replacement--2026-10-16).

## Quick word-card images and automatic backfill - follow-up 2026-10-16

FR-CON-07/08 removes manual setup from image replacement: cards offer an inline Pixabay gallery and one-click GPT with editable prompt. Migration 1792192000000 derives exact bilingual image identities and reuses existing pictures; learning state is preserved. New unlinked words are prepared within the authorized action. [Current contract, process and production evidence](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#quick-card-actions-and-automatic-historical-linking-follow-up-2026-10-16).

## Admin program and lesson editor - 2026-10-16

Application-scoped shared and personal unit content, full course revision,
published learner templates, Realtime previews/snapshots and measured lesson
statistics are owned by [45 - Admin program editor](45_ADMIN_PROGRAM_EDITOR.md).
This is local/integration implementation evidence; shared-environment migration
and deployment remain separate.


## 2026-10-21 - Free learning paths and reversible skips

FR-PATH-CHOICES / UC-PATH-CHOICES / P-LEARNING-NAVIGATION: prepared programs and personal courses allow direct content selection, with reversible skips stored separately from completed learning. Backend/Web ownership, exact API/data contracts, invariants, acceptance and DEV release evidence are maintained in the [canonical feature contract](49_LEARNING_PATH_CHOICES.md).
