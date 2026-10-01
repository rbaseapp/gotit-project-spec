# 19 — קטלוג דרישות ממוספר

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
| FR-AUTH-001 | הרשמה בדוא״ל/סיסמה בתוך application | Must | user+session אטומיים | Stable |
| FR-AUTH-002 | כניסה עם שגיאה גנרית ל־credentials | Must | ללא account enumeration | Stable |
| FR-AUTH-003 | Google Web login | Must | audience per web client | Stable |
| FR-AUTH-004 | Google Chrome login | Must | extension client/access token | Stable |
| FR-AUTH-005 | Facebook login | Should | app/scopes/expiry/email verified | Stable |
| FR-AUTH-006 | access token קצר ו־refresh rotation | Must | token ישן נדחה | Stable |
| FR-AUTH-007 | logout/revocation | Must | idempotent revoked session | Stable |
| FR-AUTH-008 | user/admin role מהמסד | Must | input/JWT אינו סמכות | Stable |
| FR-AUTH-009 | אימות דוא״ל | Must before public password GA | expiry/single use/resend | Planned |
| FR-AUTH-010 | password reset | Must before public password GA | secure token/revoke policy | Planned |

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
