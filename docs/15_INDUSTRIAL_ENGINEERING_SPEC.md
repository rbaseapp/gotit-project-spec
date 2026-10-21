# 15 — אפיון תעשייה וניהול: מודל הפעלה, תהליכים ובקרות

## Structured English zero-to-C1 ? 2026-10-21

Process P-C1 is placement/budget selection ? bounded target introduction and spaced retrieval ? authored AI lesson ? postlesson practice ? dose-gated reading ? unit/unseen gates ? separate four-skill exit. Server evidence and assisted/independent observations control progression; the canonical runtime contract owns thresholds. [Canonical implementation and DEV evidence](48_ENGLISH_ZERO_C1_RUNTIME.md).

## 2026-10-16 ? Multilingual concepts and shared images

Process: staff review one meaning ? add equivalent language expressions ? save ? create/reuse one image ? learning requests resolve that meaning. Control: ambiguous pairs never auto-share. KPI: image generations per concept revision and cache reuse across language pairs. [44 ? Multilingual concepts and shared images](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md).

## Admin owner feedback 0.3 — 2026-10-16

P-ADM-02 makes explicit role/permission and effective-plan changes auditable, while separating payment processing, learning evidence and access control. [Canonical requirements, contracts, checks and rollout](43_ADMIN_CONSOLE_FOUNDATION.md#owner-feedback-completion-03-2026-10-16).

## 2026-10-11 — Fixed daily task rewards and answer Toasts (DEV)

Owner now selected fixed 100/75/50 XP completion bonuses. Server ledger awards once
per scoped profile day; Web displays server amounts/claimed state and persistent
green/red quick-review Toasts with success confetti. Additive dashboard contract;
existing XP tables, no migration, Core/billing or privacy expansion. Completion
criteria, cap separation, sequence, checks and rollout are owned by the
[canonical dashboard follow-up](35_DASHBOARD_DESIGN_DEV.md#fixed-task-rewards-and-answer-toasts--2026-10-11).

## 2026-10-06 - Meaning recognition rounds and touch repair

P08 keeps learners in a bounded multi-round practice session and labels recognition separately from recall. Continue only after authoritative board receipts; summarize after the scoped rounds and existing repair. No KPI, mastery or XP threshold change. [Control and evidence](29_MEANING_MATCHING_ROUNDS.md).

## 2026-10-05 - UX 2.1 DEV checkpoint

P06/P08/P09 now retain navigation context and offer full-alphabet answer input without changing mastery/XP/scheduling authority. P10/P11 separate readable preview from publication confirmation. P12/P13 retain the two approval gates, version-specific evidence and report/save semantics; preparation drafts are not active lessons. Optional achievements measure existing projections only; no new KPI thresholds or reward economy. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

The identity process adds mailbox proof before account/session creation and a recovery path with all-session revocation. Invalid/expired/reused codes stop the process; no user/trial is created by merely requesting a code. [Controls, proposed KPIs and flows](27_EMAIL_AUTH_RECOVERY.md#process-screens-and-compatibility).

## 2026-10-05 - Selected-language practice

P08 / FR-PRAC-006 controls selected-language resolution at launch and validates resumed session content before display/issuance. Backend declared-language/script filtering precedes queue ranking and snapshots. Prevent mislabeled items consuming queue capacity while retaining historical evidence. No policy/KPI/XP threshold change. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-05 - P04 free Google preview

FR-CAP-008 / UC-02A separates translation preview from the P05 vocabulary save control: authenticated free learners may preview an explicit dictionary translation; saving and paid AI retain their existing gates. Identity, bounded inputs, provider validation, scoped traces and rate limits remain P04 controls. No learning progress or XP is inferred from preview. [Source and evidence](10_OPERATIONS.md#2026-10-05---free-google-preview-rollout).

## 2026-10-01 — English path prior-knowledge control

In the PACK-01 / UC-04A flow, the learner may declare one previewed word or a full unit already known before installation. Control points: validate that all IDs belong to the accessible pack, write application-scoped known state once, carry repeated source forms across this path, exclude known entries from pack practice, and count declared knowledge separately from evidence-backed mastery. This reduces repeated teaching while preserving learning evidence and XP integrity. Monitor the share of units skipped and reversals separately from actual mastery; no target KPI threshold is asserted. Backend `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` passed disposable PostgreSQL regression; Web/deployment pending.

## תיקון רצף השיעור — 2026-09-30

בקרת איכות שיעור נוספה לפי כשל שדווח: שפה תואמת, הסבר לפני הפקה, קידום
לאחר הצלחה, ויוזמת מורה אחרי שתיקה עם תקציב פניות. אלה בקרות ממומשות;
שיפור KPI או שביעות רצון טרם נמדד. פירוט: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## הרחבת P12–P13 — קורס אישי, 2026-09-30

P12 מתחיל בשיחת צורכי למידה ושני שערי אישור: snapshot העדפות, ואז גרסת תוכנית.
P13 מקשר שיעור ליעד מוגדר, מציג דוח קצר ויוצר חבילת בית מתוך עדות למידה.
התרגול מחזיר ראיות והמשך מומלץ; אי־ביצוע אינו חוסם שיעור. בקרות: בעלות, CAS,
deduplication, מקור משימה, הפרדה בין כיסוי לעצמאות ולשימור. סיכון מרכזי: איכות
תוכן/שיפוט ספק ורמת נגישות לילדים, הטעונים QA. מדדי הזרימה המוצעים באפיון 21 טרם
קיבלו baseline או יעד מספרי. [תהליך ממומש וגבולות 22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. אמנת הפרויקט

### 1.1 בעיה עסקית

לומדי שפה פוגשים מילים בהקשר אמיתי, אך המעבר מלכידה אקראית לזכירה ארוכת
טווח שבור בין כלים: תרגום נמצא במקום אחד, רשימה במקום אחר, והתרגול אינו מתחשב
במשמעות, בהקשר או בראיות למידה. GotIt מרכז את השרשרת ומודד אותה מקצה לקצה.

### 1.2 יעד

להגדיל את מספר פריטי אוצר המילים שהמשתמש לומד ושומר לטווח ארוך, תוך הקטנת
החיכוך בלכידה, שמירה על אמינות ההתקדמות ומתן שליטה למשתמש.

### 1.3 תוצרי המערכת

1. פריט לימוד מאומת בהקשר ובמשמעות.
2. תור למידה מותאם אישית.
3. evidence היסטורי לפי מיומנות.
4. סטטוס learned/established מבוסס כללים.
5. תוכן קריאה ושיחה שמשתמש בפריטים שנלמדו.
6. דוח התקדמות אישי ותוכנית המשך.
7. גישה מסחרית מבוקרת באמצעות trial/subscription.

### 1.4 גבולות היקף

בתוך ההיקף:

- Core identity, roles, billing ו־entitlements.
- GotIt Web, Backend ו־Chrome Extension.
- vocabulary capture/library, packs, practice, reading, speech, private lesson.
- PostgreSQL schemas, providers, deployment, privacy ו־quality gates.

מחוץ להיקף הנוכחי:

- מוצרי rbase אחרים.
- מערכת LMS ארגונית, כיתות ומורים מנהלים.
- רשת חברתית או שיתוף מילים בין משתמשים.
- אפליקציות native ל־iOS/Android.
- הבטחה מחקרית שרמת CEFR או mastery שוות להסמכה רשמית.

## 2. בעלי עניין וצרכים

| בעל עניין                       | צורך                               | מדד הצלחה                 | סיכון מרכזי               |
| ------------------------------- | ---------------------------------- | ------------------------- | ------------------------- |
| לומד                            | שמירה מהירה ולמידה אמינה           | learned items, retention  | חיכוך או progress לא אמין |
| Product Owner                   | שימוש, התמדה והכנסה                | WAU, conversion, churn    | feature breadth ללא focus |
| Learning Expert                 | validity פדגוגי                    | recall retention          | כלל mastery שגוי          |
| Engineering                     | חוזים יציבים ותחזוקה               | defect/lead time          | drift בין 4 repos         |
| Operations                      | זמינות והתאוששות                   | SLO, MTTR, restore        | provider/DB outage        |
| Security/Privacy                | מזעור נתונים ובקרות                | incidents, deletion SLA   | token/content exposure    |
| Finance                         | עלות ספקים ורווחיות                | cost per active/paid user | AI/Realtime cost          |
| Support                         | אבחון משתמשים                      | first-response resolution | אין admin/audit tooling   |
| Google/Meta/Paddle/AI providers | שימוש תקין בחוזים                  | policy compliance         | שינוי API/חסימה           |
| Chrome Web Store                | privacy ו־permission justification | approval                  | permissions רחבים         |

## 3. דרישות CTQ — Critical to Quality

| CTQ                 | הגדרה תפעולית                         | יעד מוצע                   | נקודת מדידה                |
| ------------------- | ------------------------------------- | -------------------------- | -------------------------- |
| Capture correctness | משמעות ושפות שאושרו נשמרות ללא כפילות | 99.9% mutation integrity   | receipt/DB audit           |
| Capture speed       | זמן מ־selection עד preview            | P95 ≤ 3s ללא cold/provider | client + server telemetry  |
| Learning integrity  | אין XP/mastery ללא evidence תקף       | 100% server-authoritative  | attempt transaction        |
| Review relevance    | פריטים due/חלשים מופיעים בזמן         | ≥95% queue contract        | offline queue evaluation   |
| Availability        | יכולת ליבה זמינה                      | 99.9% חודשי מוצע           | ready + synthetic          |
| Data isolation      | אין cross-user/application access     | 0 incidents                | integration/security tests |
| Idempotency         | retry אינו יוצר כפילות                | 100% covered mutations     | replay/conflict metrics    |
| Accessibility       | keyboard/RTL/mobile תפעוליים          | WCAG 2.2 AA יעד            | audit + E2E                |
| Cost control        | AI usage במסגרת plan                  | 100% quota enforcement     | quota/provider ledger      |
| Recoverability      | restore within agreed RTO             | טרם אושר                   | DR drill                   |

היעדים המספריים שאינם קיימים בקוד מסומנים כמוצעים ואינם SLA מחייב עד אישור.

## 4. שרשרת הערך Level 0

```mermaid
flowchart LR
  A[רכישת משתמש] --> B[יצירת זהות וגישה]
  B --> C[הגדרת שפה ומטרה]
  C --> D[לכידת תוכן]
  D --> E[אימות משמעות ושמירה]
  E --> F[היכרות ולמידה]
  F --> G[תרגול וחזרה]
  G --> H[יישום בקריאה ובשיחה]
  H --> I[מדידה והתאמה]
  I --> G
  I --> J[שימור/שדרוג/חידוש]
```

### ערך מול בזבוז

ערך: אישור משמעות, active recall, feedback, תזמון review, שימוש בהקשר.  
בזבוז שיש לצמצם: הקלדה כפולה, בחירת הגדרות בכל session, טעינת provider חוזרת,
כפילויות capture, retry שיוצר רשומה נוספת, מעבר למסכים ללא next action.

## 5. SIPOC — Capture to Learning

| Supplier                | Input                    | Process                  | Output                    | Customer          |
| ----------------------- | ------------------------ | ------------------------ | ------------------------- | ----------------- |
| המשתמש/עמוד Web         | selected text, context   | extract and bound        | capture context           | preview service   |
| Profile                 | שפות והעדפה              | resolve languages/method | resolved request          | provider registry |
| Translation/AI provider | candidate meanings       | validate, trace, sign    | selectable candidates     | המשתמש            |
| המשתמש                  | selected candidate/sense | save under lock          | item/occurrence receipt   | library/queue     |
| Learning engine         | due/evidence/policy      | rank and issue           | private exercise          | practice UI       |
| המשתמש                  | answer/self-rating       | score transaction        | attempt/effects/XP/review | dashboard/user    |

נקודות בקרה:

- C1: input bounds ו־language validity.
- C2: provider provenance ו־selection signature.
- C3: explicit sense decision.
- C4: idempotency lock/hash/receipt.
- C5: exercise ownership/revision/expiry.
- C6: server scoring ו־atomic projections.

## 6. קטלוג תהליכים

| ID  | תהליך                  | Trigger                | End state                  | Owner מערכת        |
| --- | ---------------------- | ---------------------- | -------------------------- | ------------------ |
| P01 | הרשמה/כניסה            | משתמש לא מזוהה         | session פעיל               | Core               |
| P02 | חידוש session          | access קרוב לפקיעה/401 | tokens מסובבים             | Core + client      |
| P03 | הגדרת פרופיל           | onboarding/settings    | preferences שמורות         | GotIt Backend      |
| P04 | Capture preview        | selection/manual input | מועמדים וסנסים             | GotIt Backend      |
| P05 | Capture save           | אישור משתמש            | item/occurrence receipt    | GotIt Backend      |
| P06 | ניהול ספרייה           | חיפוש/בחירה            | שינוי item/tag/status      | GotIt Backend      |
| P07 | התקנת חבילת מילים      | בחירת pack/entries     | items מקושרים              | GotIt Backend      |
| P08 | פתיחת practice session | smart/manual scope     | session active             | GotIt Backend      |
| P09 | הגשת attempt           | תשובה/skip/rating      | evidence + projections     | GotIt Backend      |
| P10 | יצירת קריאה            | prompt/settings        | preview token              | GotIt Backend + AI |
| P11 | פתיחת קריאה ו־quiz     | open/complete          | persisted reading/evidence | GotIt Backend      |
| P12 | שיעור פרטי             | setup + start          | Realtime session           | Backend + OpenAI   |
| P13 | השלמת שיעור            | timer/stop/disconnect  | report/evidence/roadmap    | GotIt Backend      |
| P14 | רכישה/חידוש            | upgrade/webhook        | billing projection/access  | Core + Paddle      |
| P15 | Export/Import          | user request/file      | download/results           | GotIt Backend      |
| P16 | Release                | approved change        | verified deployment        | Engineering/Ops    |

פירוט אינטראקציות נמצא ב־[16_UML_SEQUENCE_CATALOG](16_UML_SEQUENCE_CATALOG.md).

## 7. Service Blueprint

| שלב     | פעולת משתמש       | Frontstage             | Backstage                     | Evidence למשתמש           |
| ------- | ----------------- | ---------------------- | ----------------------------- | ------------------------- |
| Login   | מזין/בוחר ספק     | Auth screen            | Core verifies/creates session | מעבר לאפליקציה            |
| Capture | מסמן טקסט         | popup/inline/modal     | context extraction + preview  | translation/sense options |
| Save    | מאשר משמעות       | saving/success         | transaction + receipt         | confirmation + item link  |
| Learn   | בוחר smart/manual | Learn screen           | queue/session creation        | count/history             |
| Answer  | עונה              | exercise/feedback      | authoritative scoring         | score, correction, XP     |
| Review  | חוזר בהמשך        | due card               | scheduler/policy              | due/next review           |
| Apply   | קורא/מדבר         | Reading/Lesson         | AI generation/Realtime        | content/report            |
| Pay     | בוחר plan         | Billing/Paddle overlay | checkout/webhooks             | tier/access banner        |

## 8. RACI

R = מבצע, A = אחראי סופי, C = מתייעץ, I = מיודע.

| פעילות                | Product | Core Eng | Backend   | Frontend | Extension | Ops | Security/Legal |
| --------------------- | ------- | -------- | --------- | -------- | --------- | --- | -------------- |
| Product requirements  | A/R     | C        | C         | C        | C         | I   | C              |
| Auth/Billing change   | C       | A/R      | C         | C        | C         | C   | C              |
| Learning policy       | A       | I        | R         | C        | I         | I   | C              |
| Product API/schema    | C       | I        | A/R       | C        | C         | C   | C              |
| Web screen            | C       | I        | C         | A/R      | I         | I   | C              |
| Extension release     | C       | C        | C         | I        | A/R       | I   | C              |
| Provider/model change | A       | I        | R         | C        | C         | C   | C              |
| Migration             | I       | R/Core   | R/Product | I        | I         | A   | C              |
| Production release    | I       | R        | R         | R        | R         | A   | C              |
| Incident response     | I       | R        | R         | R        | R         | A   | C              |
| Privacy/retention     | C       | C        | C         | C        | C         | I   | A/R            |

## 9. KPI Dictionary

| KPI                       | נוסחה                                          | מקור                     | תדירות | Caveat                      |
| ------------------------- | ---------------------------------------------- | ------------------------ | ------ | --------------------------- |
| Capture completion        | saved captures / valid previews                | enrichment + occurrences | יומי   | retries נספרים לפי receipt  |
| Time to first value       | first successful capture − account creation    | Core + GotIt             | cohort | cross-schema analytics נדרש |
| First practice conversion | users with practice ≤24h / new capturing users | sessions/occurrences     | שבועי  | timezone/cohort definition  |
| Session completion        | completed / created sessions                   | practice_sessions        | יומי   | abandoned/network           |
| Recall success            | passing active recalls / scored recalls        | attempts/effects         | יומי   | לפי algorithm version       |
| Learned conversion        | items reaching learned / active items          | algorithm events         | שבועי  | window נדרש                 |
| Established retention     | stage≥4 and passing / learned cohort           | items/attempts           | חודשי  | survival bias               |
| Review adherence          | due items practiced on time / due items        | item schedule/attempts   | יומי   | grace window                |
| Reading utilization       | opened readings / valid previews               | generated_contents       | חודשי  | quota/tier split            |
| Lesson completion         | completed lessons / started lessons            | lesson_sessions          | שבועי  | duration split              |
| Trial conversion          | paid before/after trial / trial cohort         | Core billing             | חודשי  | refunds/cancel              |
| Provider cost/user        | total provider cost / active users             | vendor + telemetry       | חודשי  | price mapping               |
| Support defect rate       | confirmed defects / 1K active users            | support + usage          | חודשי  | tooling חסר                 |

אין לשלוח טקסטי משתמש גולמיים למערכת analytics. אירועים צריכים להשתמש ב־IDs,
counts וקטגוריות שאושרו בפרטיות.

## 10. FMEA — ניתוח כשל

ציונים מוצעים 1–10: Severity (S), Occurrence (O), Detection difficulty (D).
RPN = S×O×D; יש לאשר מחדש לאחר telemetry.

| כשל                      | השפעה                       |   S |   O |   D | RPN | בקרה נוכחית               | פעולה                     |
| ------------------------ | --------------------------- | --: | --: | --: | --: | ------------------------- | ------------------------- |
| cross-user query         | דליפת מידע                  |  10 |   2 |   6 | 120 | compound scope/FK/tests   | route-wide IDOR matrix    |
| duplicate mutation       | כפילות/XP שגוי              |   8 |   4 |   3 |  96 | idempotency receipt       | metric + alert            |
| client-forged score      | progress לא אמין            |   8 |   2 |   2 |  32 | server exercises/scoring  | keep contract tests       |
| provider hallucination   | משמעות/תוכן שגויים          |   7 |   5 |   6 | 210 | user confirmation/schema  | quality eval + feedback   |
| wrong sense merge        | evidence מזוהם              |   7 |   4 |   5 | 140 | explicit decision         | undo/audit UX             |
| billing drift            | גישה שגויה/אובדן הכנסה      |   8 |   3 |   6 | 144 | signed webhook/projection | reconciliation job        |
| migration failure        | downtime/data risk          |   9 |   3 |   4 | 108 | explicit migration/backup | staging rehearsal/restore |
| token leak               | account takeover            |  10 |   2 |   7 | 140 | rotation/CSP/redaction    | incident/revoke tooling   |
| AI cost runaway          | הפסד כספי                   |   7 |   4 |   5 | 140 | quota/retries             | budget kill switch        |
| audio permission failure | lesson unusable             |   5 |   5 |   3 |  75 | explicit UI error         | device matrix             |
| stale API docs           | AI/engineer breaks contract |   6 |   6 |   6 | 216 | manual catalog/docs       | generated spec CI         |

ה־RPN הגבוה ביותר כרגע הוא documentation/contract drift; הוא מסביר את חשיבות
פרויקט האפיון ו־AGENTS.md כ־control artifact.

## 11. Capacity ו־Cost Model

יחידות עומס:

- auth calls: כל login/refresh ובקשת GotIt מוגנת קוראת ל־Core `/auth/me`.
- DB transactions: capture/attempt הם write-heavy וכוללים כמה projections.
- reading/image/lesson: ספק חיצוני, latency ועלות גבוהים.
- lesson: WebRTC traffic מול OpenAI; Backend יוצר session ומעבד completion.

דרישות תכנון:

- למדוד request rate, Core fan-out, pool wait ו־provider concurrency.
- להגדיר concurrency/budget נפרד ל־translation, reading, image ו־Realtime.
- cache רק תוצאה שמותר לשתף; user context לעולם לא cache ציבורי.
- לבצע load test לפני שינוי quota, פתיחת feature או קמפיין.

## 12. Governance ושינוי מבוקר

כל שינוי עובר:

```text
Need → Requirement ID → Impact analysis → Contract/UX design
→ Security/Data review → Implementation → Verification
→ Migration/rollout → Acceptance evidence → Documentation baseline
```

Change Request חייב לציין:

- problem/outcome ו־owner;
- affected actors/screens/services/APIs/tables;
- backward compatibility, migration ו־rollback;
- security/privacy/provider/cost impact;
- acceptance criteria ו־measurement;
- status: proposed/approved/implemented/verified/deployed.

## 13. Acceptance מנהלי

פרויקט או feature אינו “הושלם” רק כי הקוד קיים. השלמה דורשת:

1. דרישה מאושרת ובעל תפקיד אחראי.
2. תהליך ומסך מתועדים.
3. API/data/security impacts מאושרים.
4. tests ו־evidence מתאימים לסיכון.
5. operational ownership, monitoring ו־rollback.
6. training/support/legal artifacts כאשר רלוונטי.
7. KPI או success signal שניתן למדוד.

# Guided learning control points — 2026-10-06

Private-lesson learning now has owner-resolved course/unit context, revision/idempotency checks before state transitions and an atomic report/temporary-text purge boundary. Assistance, correction and word study remain distinct from independent recall evidence; pausing the local interface does not pause minute billing. Scope selection is checked before SRS scheduling, and language/pack history filtering precedes pagination. [UC-GUIDED-01, UC-UX-05/06 and KPI constraints](30_FIGMA_FULL_DEV.md#processuse-cases-and-sequence).

## 2026-10-06 — DEV learning-path correction

P-learning control: study evidence precedes teacher entry; known declarations are not mastery. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 — Unit study source checkpoint

P07-P09: unit study media is preparation only; known marking remains a declaration, and scoped game selection retains server-authoritative learning evidence. [Contract, source and verification](32_UNIT_STUDY_AND_GAME_SCOPE.md).

## 2026-10-06 - Practice clarity Web source checkpoint

Practice clarity changes presentation and input modality, not authoritative learning scoring. Reading-guide generation is optional enrichment and awards no progress/XP. [Source, acceptance and release boundary](32_PRACTICE_CLARITY.md).

## 2026-10-07 - Private lesson conversation room

P12 accepts spoken or typed input; P13 includes actual typed evidence in the report. Minute, assessment and KPI authority is unchanged; no usability KPI improvement is claimed. [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).

## 2026-10-11 - Focus games in DEV

P08 retains one scoped session, issues visible exercises and advances on receipts. Self-rating/assisted recognition remain distinct from recall/provider evidence. No KPI or XP threshold change. [Canonical contract and evidence](37_FOCUS_GAMES_DEV.md).

### DEV practice alignment — 2026-10-12

P08: first-attempt stage accuracy, assistance-marked learning and actual session totals stay distinct; client celebrations do not assert retention or create rewards. See [canonical scope and evidence](37_FOCUS_GAMES_DEV.md#owner-plan-versus-dev-alignment--2026-10-12).

## 2026-10-12 — P06 library card view

Read projection and category counts preserve user/language/status scope; selected practice returns context, and display/selection never awards learning evidence or XP. [Canonical behavior, API, validation and DEV release evidence](38_MY_WORDS_DESIGN_DEV.md).

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

Administration process extension: inspect a scoped learner from Users, distinguish provider payment from effective access, drill into recorded learning and edit preferences through authorized audited commands. Metrics show their actual measurement coverage. [Acceptance and controls](44_ADMIN_USER_DETAILS.md).

## All-user vocabulary and quick image replacement - 2026-10-16

P-ADM-CON: find word, review unique meaning, select image source, reserve, generate outside transaction, atomically publish. Track completed publications separately from requests and provider failures. [Canonical contract and verification](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#all-user-vocabulary-and-quick-image-replacement--2026-10-16).

## Quick word-card images and automatic backfill - follow-up 2026-10-16

FR-CON-07/08 removes manual setup from image replacement: cards offer an inline Pixabay gallery and one-click GPT with editable prompt. Migration 1792192000000 derives exact bilingual image identities and reuses existing pictures; learning state is preserved. New unlinked words are prepared within the authorized action. [Current contract, process and production evidence](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#quick-card-actions-and-automatic-historical-linking-follow-up-2026-10-16).

## Admin program and lesson editor - 2026-10-16

Application-scoped shared and personal unit content, full course revision,
published learner templates, Realtime previews/snapshots and measured lesson
statistics are owned by [45 - Admin program editor](45_ADMIN_PROGRAM_EDITOR.md).
This is local/integration implementation evidence; shared-environment migration
and deployment remain separate.

## Automatic concept assignment - 2026-10-16

Process: confirm/save word -> durable queue -> AI meaning resolution -> existing/new concept -> scoped binding -> shared image. Control points: claim, owner/revision checks, candidate allowlist, quotas and retry. [Canonical contract](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#automatic-assignment---2026-10-16).


## 2026-10-21 - Free learning paths and reversible skips

FR-PATH-CHOICES / UC-PATH-CHOICES / P-LEARNING-NAVIGATION: prepared programs and personal courses allow direct content selection, with reversible skips stored separately from completed learning. Backend/Web ownership, exact API/data contracts, invariants, acceptance and DEV release evidence are maintained in the [canonical feature contract](49_LEARNING_PATH_CHOICES.md).
