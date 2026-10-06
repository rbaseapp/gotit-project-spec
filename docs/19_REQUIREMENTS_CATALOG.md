# 19 — קטלוג דרישות ממוספר

## 2026-10-06 - Figma fidelity correction, DEV Live

Web `e1948281adabe34d2ff6c4e4dc4f949e90c33436`. FR-UX-007: match approved Figma geometry, hierarchy and exact illustration assets for home/programs/lesson preparation/active lesson, with mobile reflow and editable preferences. Acceptance includes unobscured portrait, full lesson viewport, centered microphone, reachable short-screen responses, and actual server content without decorative guided-stage claims. **DEV Web is Live at this source; authenticated home/program/preparation UI smoke and three DEV readiness endpoints passed. Active voice appearance is fixture-verified; no real provider call was started.** **CI release gate remains open: 333 browser passes / 60 initial demo-game overflow failures; follow-up correction required.** [Canonical changes and evidence](28_UX_2_1_DEV.md#2026-10-06---figma-fidelity-correction-local-checkpoint).

## 2026-10-05 - UX 2.1 DEV checkpoint

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-UX-001 | Four roots; independent word games; preserve origin/search/filter/page/selection | library-context, learning-navigation, ux-navigation |
| FR-UX-002 | Clickable full answer-language alphabet; repeats/delete/clear; native keyboard/IME retained; no hidden-answer bank | letter-keyboard, live writing cases, ux-navigation |
| FR-UX-003 | Next action uses real resume or explicitly selected program per language, including a course with no saved words | ux-navigation program case; dashboard-home |
| FR-UX-004 | Generated article immediately readable; same token/event/payload on failed publication retry | live publication failure regression |
| FR-UX-005 | Actual teacher choice/support rules; scoped expiring preparation return; transcript replay labeled accurately | private-lesson, lesson-draft, private-lesson-flow |
| FR-UX-006 | Optional authoritative achievements and reduced motion; no invented reward/evidence rules | live practice receipts, avatar-motion, responsive cases |

NFR-UX-001 remains responsive reflow/touch coverage; NFR-UX-002 remains partial accessibility, not a WCAG certification. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

FR-AUTH-001 now requires no identity/session before proof; FR-AUTH-009/010 require scoped single-use expiring codes, bounded retries, matching passwords and recovery revocation. Core locally/integration verified; client and live acceptance pending. [Acceptance and source](27_EMAIL_AUTH_RECOVERY.md).

## 2026-10-05 - Selected-language practice

FR-PRAC-006 (Must): P08 / SCR-03 / SCR-04 presents practice source expressions in the selected language; incompatible scripts cannot enter cards/prompts/distractors. Filter before limits; empty scope never borrows another language. Preserve selection through loading/failure, wait for resolution before unscoped launch and reject cross-language active resumes before content. Retain learning evidence. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## FR-LESS-006 — תנועת אווטאר בזמן השמעה

Should: שתי דמויות המורה מציגות מעברים רציפים בין צורות פה, סגירה בשתיקה,
מצמוץ עצמאי בדיבור ונשימה עדינה; reduced motion ורוחב 320px נתמכים.
ממומש ומאומת מקומית במקור `gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd`;
[קבלה ובדיקות](25_TUTOR_AVATAR_MOTION.md). נפרס ב־Render ו־smoke קוד/נכסים
מוגשים עבר; קבלה קולית חיה טרם אומתה.

## 2026-10-01 — FR-PACK-005 unique catalog amendment

The current learner-approved source supersedes the earlier repeated-word catalog for SCR-16: three levels, 60 supplied units, 50 entries per unit, **3,000 unique English words or phrases across the whole path**, Hebrew translation coverage and title **לימוד שפה מאפס**. On migration, a changed ordinal entry ID must not transfer a learner's known or linked state to a different English form or Hebrew sense. Retain unmatched prior declarations and links for audit/recovery, without erasing their underlying learning evidence. Backend `10602736bdf5422116eb838e57e9d708318156be` passed local and disposable PostgreSQL acceptance; production acceptance remains pending.

## FR-PACK-006 - Corrected selected-word acceptance, 2026-10-01

In SCR-16, a learner may check multiple preview words, add checked words to a pack, mark checked words already known, or undo known marking for checked words. No selected-word removal button is presented. Add preserves previously linked unchecked words; known/undo uses the existing protected known-state operation and changes neither pack inclusion nor evidence/XP. The corresponding action is disabled when no checked word can change; failed writes retain the checks, and successful writes refresh server state and clear them. Acceptance: selected-ID scope, add-link preservation, mark/undo, failed-write retry, RTL/mobile modal layout. Web `gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` passed local regressions; production verification pending. The earlier FR-PACK-006 remove-button text below records the superseded 2026-10-01 implementation.

## FR-PACK-006 - Select multiple English unit words

Must: in SCR-16 an authenticated learner can check multiple preview words and add only those not already linked or remove only the checked linked words. Previously linked unselected words remain linked, an empty final selection is supported, and server detail/progress refresh after each change. No learning evidence, mastery or XP is inferred from selection changes; the existing `vocabulary.write` gate applies. Acceptance: first-time subset, partial removal, final-link removal, re-add, disabled inapplicable actions and mobile/RTL layout. Web `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` and Backend `gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` passed local gates; production verification pending. Maps to UC-04C and SCR-16.

## 2026-10-01 — FR-PACK-005 sense acceptance

Repeated spellings in the English path share an already-known declaration only for the same Hebrew meaning. Distinct contextual meanings remain individually learnable, including calendar `May` and modal `may`. The 60 supplied names and 50-entry unit sizes remain the acceptance baseline. Backend source `gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966` passed local and PostgreSQL regressions; production acceptance pending at this source checkpoint.

## 2026-10-01 — FR-PACK-005 Web acceptance

`gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` implements the learner controls for FR-PACK-005: theme name per 50-entry unit, whole-unit and per-entry known toggles, known and completed progress, next unfinished unit, and installation of only unknown IDs. The live-flow regression verifies 50 IDs with no prior knowledge and 49 after marking one word; it also marks and reverses an entire unit. Local Web gates and 374 responsive checks passed. Production acceptance still requires the guarded catalog migration, both service deployments and authenticated smoke. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## FR-PACK-005 — Named units and already-known words (backend source)

Must: the English/Hebrew path uses the 60 user-supplied unit names, three levels of 20 units and 50 translated entries per unit. A learner can mark one entry or a complete unit known in one request and reverse it. Repeated source words across this path share known state; installed pack practice omits known entries. Known state contributes to path completion without fabricated learning mastery or XP. Access is application/user scoped and requires `vocabulary.write`. Acceptance: catalog audit, per-user isolation, 50-entry action, cross-unit propagation, reversal and practice omission. Backend source `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` passed local and PostgreSQL gates; Web source/deploy pending. Maps to UC-04A, SCR-16 and [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## תיקון רצף השיעור — 2026-09-30

נוספו PLQ-01–05 בעקבות דיווח משתמש: שפה עקבית, הוראה לפני הפקה, התקדמות
והובלת מורה, המשך לאחר שתיקה ושימור הקשר בכל תור. קריטריוני הקבלה המפורטים
וההבחנה בין חוזה דטרמיניסטי לאיכות מודל: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## דרישות קורס אישי — נוספו 2026-09-30

| ID | דרישה וקבלה | מקור | מצב |
|---|---|---|---|
| FR-PC-001 | שיחה מותאמת והעדפות שמורות, קול/טקסט ותיקון | PC-19–23, 26–27 | Implemented; live voice acceptance pending |
| FR-PC-002 | כל היחידות מראש ושני אישורים לפי גרסה | PC-01–04, 22–25, 28 | Implemented locally |
| FR-PC-003 | שיעור בעל יעד, סיכום קצר ובית מחומר שנלמד | PC-05–07, 13–14, 18 | Implemented; provider/content QA pending |
| FR-PC-004 | משימה אחת, משוב, רמז, שקילות, שמירה, retry בטוח | PC-08–12, 17 | Implemented locally |
| FR-PC-005 | התאמה לגיל/קריאה, שפה, RTL ומכשיר | PC-15–16, 20 | UI verified; child/device acceptance pending |

קריטריוני הקבלה המלאים נשמרו ב־[21](21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md).
[22](22_PERSONAL_COURSES_IMPLEMENTATION.md) ממפה מימוש ובדיקות ומבדיל כיסוי חומר,
עצמאות ושימור שלא נבדק; אין דרישה להמציא רמת CEFR או לשנות XP.

## 1. שיטת ניהול

Priority: Must / Should / Could.  
Status: Stable / Conditional / Partial / Planned / Open / WIP.  
כל שינוי בדרישה מעדכן את ה־Process, Screen, Sequence, API, Data ו־Test הרלוונטיים.

## 2. דרישות עסקיות

| ID | דרישה | Priority | מדד/קבלה | מצב |
|---|---|---|---|---|
| BR-001 | המשתמש יוכל להפוך טקסט שפגש לפריט לימוד בהקשר | Must | capture receipt תקף | Stable |
| BR-002 | ההתקדמות תתבסס על evidence ולא על ניווט/קליקים | Must | אין mastery/XP ללא event תקף | Stable |
| BR-003 | המערכת תבחר תרגול רלוונטי ותשאיר שליטה ידנית | Must | smart + manual sessions | Stable |
| BR-004 | המשתמש יוכל ליישם מילים בקריאה ובשיחה | Should | reading/lesson flows | Conditional |
| BR-005 | מוצרי rbase ישתפו פלטפורמה ולא לקוחות/דומיין | Must | application isolation | Stable |
| BR-006 | ניתן יהיה לגבות תשלום בלי לחשוף נתוני כרטיס למוצר | Must | Paddle hosted flow | Partial rollout |
| BR-007 | משתמש יוכל לקרוא ולייצא את נתוניו גם במצב free | Must | read-only + export | Partial governance |
| BR-008 | המערכת תהיה ניתנת להעברה, תפעול והמשך פיתוח על ידי AI/צוות | Must | docs/traceability/AGENTS | Stable docs |

## 3. דרישות פונקציונליות — זהות וגישה

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-AUTH-001 | Application-scoped email registration | Must | No user or session before mailbox proof | Core integration verified; [rollout](27_EMAIL_AUTH_RECOVERY.md) |
| FR-AUTH-002 | כניסה עם שגיאה גנרית ל־credentials | Must | ללא account enumeration | Stable |
| FR-AUTH-003 | Google Web login | Must | audience per web client | Stable |
| FR-AUTH-004 | Google Chrome login | Must | extension client/access token | Stable |
| FR-AUTH-005 | Facebook login | Should | app/scopes/expiry/email verified; unanswered Web SDK callback ends within 60 seconds with localized retry, late callbacks ignored | Core/Web implemented; live Meta activation pending |
| FR-AUTH-006 | access token קצר ו־refresh rotation | Must | token ישן נדחה | Stable |
| FR-AUTH-007 | logout/revocation | Must | idempotent revoked session | Stable |
| FR-AUTH-008 | user/admin role מהמסד | Must | input/JWT אינו סמכות | Stable |
| FR-AUTH-009 | Email verification | Must before public password GA | Scoped expiring single-use OTP; resend and attempt limits | Core integration verified; [rollout](27_EMAIL_AUTH_RECOVERY.md) |
| FR-AUTH-010 | Password recovery | Must before public password GA | OTP proof, new password, all-session revocation | Core integration verified; [rollout](27_EMAIL_AUTH_RECOVERY.md) |
| FR-AUTH-011 | Web sign-in survives browser restart | Must | A valid Core refresh session restores identity after tab close/reopen; rotation updates persistent storage, explicit logout and invalid refresh clear it; transient startup failure preserves it for retry | Locally verified in `gotIt-front@9fb80b2`; production pending |

## 4. Profile ו־Onboarding

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-PRO-001 | profile ייווצר אוטומטית למשתמש מזוהה | Must | GET/PATCH idempotent | Stable |
| FR-PRO-002 | הגדרת source/translation language defaults | Must | BCP-47 canonical | Stable |
| FR-PRO-003 | timezone ויעד יומי | Must | IANA + items/minutes/attempts | Stable |
| FR-PRO-004 | שפות למידה ורמת self-assessed CEFR | Must | A1–C2 per language | Stable |
| FR-PRO-005 | enabled skills | Should | 1–5 unique skills | Stable |
| FR-PRO-006 | interests | Should | normalized unique bounded list | Stable |
| FR-PRO-007 | system CEFR evidence/range | Could | confidence/evidence trace | Stable but calibration open |

## 5. Capture ו־Library

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-CAP-001 | capture ידני ב־Web/Extension | Must | preview + save | Stable |
| FR-CAP-002 | capture selection/context menu/double-click | Must Chrome | bounded context only | Stable |
| FR-CAP-003 | פתרון source/target language | Must | user/profile/hint/provider precedence | Stable |
| FR-CAP-004 | ordinary/AI/manual enrichment | Must | provider conditional, no fake data | Stable/WIP provider |
| FR-CAP-005 | candidate provenance חתום | Must | token scope/expiry verified | Stable |
| FR-CAP-006 | explicit sense merge/new | Must | auto blocked if senses exist | Stable |
| FR-CAP-007 | idempotent save | Must | same UUID/payload same receipt | Stable |
| FR-CAP-008 | Google preview for authenticated free accounts | Must | Explicit dictionary preview succeeds without vocabulary.write, including expired trials; no AI or save access granted; unauthenticated and malformed requests rejected | [Evidence](10_OPERATIONS.md#2026-10-05---free-google-preview-rollout) |
| FR-LIB-001 | list/search/filter/sort/page | Must | bounded pagination | Stable |
| FR-LIB-002 | semantic edit עם revision | Must | evidence reset/history preserve | Stable |
| FR-LIB-003 | pause/resume/archive/delete/restore | Must | user and learning states separate | Stable |
| FR-LIB-004 | mastery/priority/hard controls | Should | source recorded/no fake evidence | Stable |
| FR-LIB-005 | tags/examples/occurrences/history | Should | ownership + limits | Stable |
| FR-LIB-006 | bulk actions עד 100 | Should | all IDs scoped/validated | Stable |
| FR-LIB-007 | permanent deletion | Must for privacy GA | policy/SLA/audit | Open |
| FR-LIB-008 | optional learner-script reading guide in vocabulary | Should | saved guide appears below the source word, is distinguished from translation and niqqud, and absent guides do not break the list | Locally verified pilot; deployment pending |

## 6. Packs, Practice ו־Learning

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-PACK-001 | catalog topic/track/CEFR/pack | Should | active compatible catalog | Stable |
| FR-PACK-002 | selective safe installation | Should | reuse same-sense/no duplicate | Stable |
| FR-PACK-003 | safe removal | Should | keep or archive exclusive only | Stable |
| FR-PRAC-001 | smart/manual session | Must | server selection snapshot | Stable |
| FR-PRAC-005 | smart review matching rotation | Must | A successful drag board remains behind eligible words with no current-revision matching success on subsequent days; exhausted words rotate by oldest success | Deployed; production-data smoke passed |
| FR-PRAC-002 | private exercises | Must | answer not exposed, expires/consumes | Stable |
| FR-PRAC-003 | flashcard/recall/listening/matching/pronunciation/quiz | Must/Should | server scoring | Stable conditional |
| FR-PRAC-004 | attempt idempotency | Must | stored authoritative receipt | Stable |
| FR-LEARN-001 | five-skill evidence | Must | effects + projections | Stable |
| FR-LEARN-002 | learned/established policy | Must | published versioned config | Stable |
| FR-LEARN-003 | review scheduling/demotion | Must | active recall rules | Stable |
| FR-LEARN-004 | semantic revision isolation | Must | stale exercise rejected | Stable |
| FR-GAME-001 | XP/level/streak/daily goal | Should | unique ledger/anti-gaming | Stable |

## 7. Reading, Speech ו־Private Lesson

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-READ-001 | reading preview לפי topic/level/type/length | Should | structured bounded output | Stable; provider WIP |
| FR-READ-002 | target vocabulary binding/repair | Must for feature | exact target mapping | Stable |
| FR-READ-003 | preview token and explicit publication | Must | unopened preview not persisted | Stable |
| FR-READ-004 | quota לפי tier/period | Must | atomic reserve/release | Stable; business limit open |
| FR-READ-005 | history/detail/delete/article quiz | Should | quiz evidence only | Stable |
| FR-SP-001 | reference audio | Should | supported configured language | Conditional |
| FR-SP-002 | transient pronunciation assessment | Should | no audio storage | Conditional |
| FR-IMG-001 | relevant study image | Could | lexical relevance + attribution | Conditional |
| FR-LESS-001 | configurable Realtime voice lesson | Should | ephemeral secret/WebRTC | Conditional |
| FR-LESS-002 | timer/wrap-up/translation/mute | Should | bounded lifecycle | Stable client |
| FR-LESS-003 | completion journal/report | Should | bounded turns + structured report | Conditional |
| FR-LESS-004 | roadmap/milestone/evidence | Could | explicit completed task evidence | Stable |
| FR-LESS-005 | skill/CEFR assessment | Could | range/confidence, no overclaim | Stable; calibration open |

## 8. Billing, Transfer ו־Legal

| ID | דרישה | Priority | Acceptance | מצב |
|---|---|---|---|---|
| FR-BILL-001 | free/trial/paid derivation | Must | stored plan/subscription policy | Stable |
| FR-BILL-002 | hosted checkout idempotent | Must | no card data in GotIt | Stable |
| FR-BILL-003 | signed webhook fulfillment | Must | raw signature/duplicate/stale | Stable |
| FR-BILL-004 | hosted portal | Must | provider IDs server-resolved | Stable |
| FR-BILL-005 | entitlement enforcement | Must | backend guard + UI state | Stable |
| FR-BILL-006 | Free is status-only in Web billing | Must | when Core reports Free, show it as current plan; never render it among selectable offers even when present in catalog | Deployed asset verified; authenticated UI smoke pending |
| FR-TRN-001 | paginated export | Must | versioned current library | Stable |
| FR-TRN-002 | idempotent bounded import | Should | per-entry 200/207 | Stable |
| FR-LEG-001 | terms/privacy/refund pages | Must | public routes | Stable; legal review ongoing |
| FR-LEG-002 | account deletion/data rights | Must | end-to-end SLA | Partial/Open |

## 9. דרישות לא־פונקציונליות

| ID | תחום | דרישה | Acceptance/Measure | מצב |
|---|---|---|---|---|
| NFR-SEC-001 | Isolation | כל query משתמש scope מהימן | negative integration tests | Stable pattern |
| NFR-SEC-002 | Secrets | secrets server-side/redacted | scans/artifact review | Stable pattern |
| NFR-SEC-003 | Input | strict bounded validation | contract tests | Stable |
| NFR-SEC-004 | Browser | CSP/origin/path/proxy controls | gateway tests | Stable |
| NFR-REL-001 | Idempotency | retry-safe mutations | replay/conflict tests | Stable |
| NFR-REL-002 | Atomicity | learning projections עקביים | DB integration | Stable pattern |
| NFR-REL-003 | Readiness | DB failure/draining → 503 | health tests | Stable |
| NFR-PERF-001 | Latency | budgets per route/provider | telemetry/SLO | Open |
| NFR-PERF-002 | Client bundle | performance budget | main chunk target | Open; warning exists |
| NFR-SCALE-001 | Capacity | pool/provider concurrency bounded | load tests | Open |
| NFR-UX-001 | Responsive | 320px–1920px without blocking overflow | Playwright matrix | Verified historically |
| NFR-UX-002 | Accessibility | WCAG 2.2 AA target | keyboard/screen reader audit | Partial |
| NFR-I18N-001 | Languages | 8 locales + RTL/LTR | catalog parity tests | Stable |
| NFR-OPS-001 | Observability | structured safe logs/metrics/alerts | dashboards/on-call | Partial |
| NFR-OPS-002 | Recovery | backup + tested RPO/RTO | restore drill | Open P0 |
| NFR-COMP-001 | Compatibility | Web/Chrome lag-safe API evolution | contract/rollout tests | Partial |
| NFR-PRIV-001 | Minimization | no full page/raw pronunciation audio | review/tests | Stable pattern |
| NFR-PRIV-002 | Retention | approved lifecycle per data type | policy/delete test | Open P0 |

## 10. מגבלות והנחות

- Node.js 24 הוא runtime היעד.
- PostgreSQL הוא מקור הנתונים; אין ORM.
- Render הוא hosting baseline הנוכחי; HTTPS מנוהל על ידי הפלטפורמה.
- Chrome 127+ הוא יעד התוסף.
- external providers אינם בשליטת המוצר; capability חייבת לשקף config אמיתי.
- Chrome Store rollout איטי מ־Web/backend ולכן חוזה חייב להיות backward compatible.
- users אינם משותפים אוטומטית בין applications.
- CEFR/mastery הם הערכות מוצר, לא הסמכה רשמית.

## 11. Definition of Ready לדרישה

דרישה מוכנה לפיתוח כאשר יש לה owner, actor/outcome, priority, acceptance,
process/screen mapping, data/API owner, security/cost impact והחלטות מוצר נדרשות.

## 12. Definition of Done לדרישה

דרישה הושלמה רק כאשר הסטטוס, הקוד, הבדיקות, המסמכים, rollout וראיית הסביבה
תואמים. `Implemented` לבדו אינו `Production verified`.

## FR-PACK-004 — Dedicated English learning path

Should: an authenticated English-to-Hebrew learner can open a named language-learning path distinct from generic word packs. It presents Basic, Good and Advanced in sequence, each with 20 ordered units of 50 words/expressions, server-reported progress and the next unfinished unit. The learner previews a unit and installs only that unit before pack-scoped practice. Empty, loading, error, and billing-restricted states are explicit. Data comes from existing protected pack APIs. Implemented locally in `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af`; production catalog and route smoke unverified. Maps to UC-04 and SCR-16.
