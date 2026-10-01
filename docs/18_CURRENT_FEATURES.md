# 18 — קטלוג יכולות נוכחי (As-Built)

## 2026-10-01 - Bulk known and undo in production

The current Web release `gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` is Live in Render `dep-davaakflot8c73cu3sig`. English unit previews retain multiword checkboxes and Add selected, and offer bulk I already know and Undo known without a Remove selected button. Authenticated smoke confirmed the final Hebrew two-row footer with two selected words, then cleared the checks; the unit remained at 2/50 known. The immediately preceding `e519242` Live release passed reversible bulk known/undo server smoke on two initially unknown words and restored the original count. Web and Backend readiness and the public path returned 200.

## 2026-10-01 - Bulk known verified live; footer layout source verified

Web `e5192422075850a7db6c64134a13565d3c3acf58` was Live in Render deployment `dep-dava57ghfsis73c06h0g`. Authenticated smoke on the English unit preview selected `illegal` and `regulation`, bulk-marked both known, then bulk-unmarked both; the original 2/50 known count returned. Public Web and Backend readiness and `/english-learning` were 200. Web `gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` improves the five-button footer width and passed local check/responsive regression, but its own production deploy is pending at this source checkpoint.

## 2026-10-01 - Corrected bulk known controls (source verified)

Web `gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` replaces the previously deployed Remove selected button in `/english-learning` with bulk mark-known and undo-known for checked words. Add selected and the checkboxes remain. The existing `PUT /word-packs/:id/known` updates learner declarations, without changing pack inclusion or awarding mastery/XP. Local Web check (164 Vitest, 16 gateway, typecheck, lint, build) and targeted responsive Playwright passed. This commit's production deployment and authenticated smoke are pending at this source checkpoint; the older add/remove deployment below is historical.

## 2026-10-01 — Persistent Web authentication

`gotIt-front@9fb80b2` keeps the rotating Core refresh token across browser restarts and hydrates the live account at the next visit. Existing tab sessions migrate when used. Explicit logout and invalid refresh clear the saved token; transient Core/network failure leaves it available for retry. The access token remains memory-only. Core refresh sessions currently expire 30 days after issue by default, even if refreshed. Locally verified and deployed on Render `dep-dav9obaj9qps73e5j320`; public readiness and served-bundle checks passed. Authenticated browser restart smoke pending.

## 2026-10-01 - Multiword English unit actions in production

Backend `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7` and Web `623202a3e1f5c51b71baf12bd1c78c4a0967860b` are Live on Render (deploys `dep-dav9ef1srm7s73eegcng` and `dep-dav9f0lg1s2s73couufg`). In `/english-learning`, the unit preview allows multiple checked words, select all/clear, add selected and remove selected. The existing pack endpoint accepts an empty complete selection so the last link can be excluded without deleting the unit. Both readiness endpoints and the path returned 200. Authenticated smoke verified selection and a reversible remove/re-add of a linked word; zero-link behavior was verified in disposable PostgreSQL, not mutated in production.

## 2026-10-01 — English path final deployment state

Backend `10bf197` and Web `3834823` are Live on Render. The contextual meanings and known-state separation had an authenticated production smoke before the Web layout release; the Web layout release has public route, health and served CSS/JS verification, with 375 local responsive checks. Signed-in visual inspection of the final button layout remains unverified because the earlier authenticated browser tab was unavailable after deployment. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Live English senses and preview source

Backend `10bf19712bc9831a77dd9672c5f78701577a2966` and migration `1790800010000` are production verified by Render exact-SHA Live status, database readback and authenticated month/modal smoke. Web source `383482331ca895c1491123643138bd0973fd7395` fixes wrapping of the single-word known control and passed local UI checks; its deploy is pending at this checkpoint. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English path sense refinement

Backend source `gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966` corrects 213 context-sensitive Hebrew catalog meanings and keeps known-word propagation within a shared English/Hebrew sense. Local and PostgreSQL verification passed; the production correction migration/deploy remains pending at this source checkpoint. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English prior-knowledge controls in Web source

`gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` locally verifies named unit cards, a one-click whole-unit known action, per-word known actions in the preview, reversal, and skipping known entries during installation. It consumes the backend known/completed fields from `gotIt-backend@14012a0`. `npm.cmd run check` passed (160 Vitest, 16 gateway), and 374 Playwright responsive checks passed. Production deployment and authenticated smoke pending. See [SCR-16](17_SCREEN_CATALOG.md).


## 2026-10-01 — Named English units and known-word backend source

`gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` locally verifies 60 supplied themed English/Hebrew units and a learner-declared known state. A protected single request can mark an entry or all 50 entries; repeated English words across units share that state. Pack practice skips known entries; completion counts known ∪ mastered without granting mastery/XP. Disposable PostgreSQL tests passed. Production still serves the previous version until the guarded migration and deployment are verified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).


## 2026-10-01 - Shell assessment and notice placement

`gotIt-front@d2d59437d57580ba3e9db5b8cdc933baf798b2db` keeps the latest private-lesson assessment shortcut in the top bar and removes its duplicate sidebar card. The generic live-account notice is removed; Free read-only and demo notices remain. Local Web check and responsive suite passed. See [SCR-00](17_SCREEN_CATALOG.md).

Render deployment `dep-dav3tlnpn0mc73a0fp90` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/dashboard` browser reload showed the English A2-B2 assessment in the top bar, no sidebar assessment card, and no generic live-account notice.

## 2026-10-01 — English path card clarity (source)

`gotIt-front@66767de` shows each unit's level name inside its card, so Basic unit 5 and Advanced unit 5 can be distinguished after scrolling. Production catalog inspection confirmed `satellite` in Advanced unit 5. Local Web checks passed. Render deployment `dep-dav2m90jo6nc73f7uefg` is Live for the exact SHA; Web `/ready` returned 200 and an authenticated browser verified both card labels and the Advanced unit 5 preview. See [SCR-16](17_SCREEN_CATALOG.md).

## 2026-10-01 — English path live state

Backend `74eb91d` and Web `4da3411` are deployed on Render. Migrations `6000` and `7000` have run with the dedicated migrator. Production has 10 topics, including the named English learning path with 3 levels, 60 units, and 3,000 entries; each unit has 50. `/ready` returned 200 on both services, and an authenticated browser showed all levels and first/last unit previews. A separate test-account installation was not executed. Evidence: [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Dedicated English learning path Web source

`gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af` implements `/english-learning` with three ordered levels, 50-item units, server-reported mastery, next-unit guidance, preview, and practice. Generic word packs link to it but do not duplicate its units. Local Web check passed (155 Vitest, 16 gateway). The required catalog migrations and live availability have not been verified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Named English learning catalog

`gotIt-backend@74eb91d5691b357cbbe60e8262135977a5d2921f` locally verifies a follow-up migration that renames the English catalog as a learning path and corrects 72 catalog meanings. The source migration preserves installed learning items. Production migration and availability have not been verified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — English catalog source, rollout unverified

`gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a` contains a three-level Hebrew-to-English catalog with 60 units of 50 entries. It is currently implemented through the generic word-pack data model and screen. The dedicated language-learning path requested afterward is not present in this source commit. Migration execution and production availability have not been verified. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Initial vocabulary reading-guide pilot

Backend `c138f5464de818552a54ca584c43ccdaee980da0` exposes the existing
phonetic fields on owner-scoped library lists. Web
`c585b8860756e739859137d6e391643c321c5282` displays saved
`transliteration:<language>` guides below expressions in the live library and
detail; `adb2011869d851c3e01dc0dfa247e06084604dbe` aligns the guide with
the source expression in RTL layouts. All three code commits passed their
local tests and were observed Live on Render on 2026-10-01. The requested
account has a production-data pilot: 84/84 active English items and 12/12
active Arabic-to-Hebrew items have Hebrew-script guides. The Arabic additions
were verified in the live vocabulary list and item detail. These are one-time
data backfills, not automatic generation for new items.

## תיקון רצף השיעור — 2026-09-30

תיקון נוסף מקומי: פתיחת שיעור בשפה הנלמדת, הוראה לפני תרגול, דוגמאות מתקדמות
ומנגנון המשך אחרי שתיקה ב־Web. כל תור יזום משמר הקשר מלא. מימוש אינו אישור
לאיכות פדגוגית חיה או לפריסה. המקור: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## תוספת מקומית — 2026-09-30

קורס אישי ושיעורי בית ממומשים ב־Backend/Web: שיחת AI בכתב וקול, שני אישורים,
העדפות וגרסאות, כל היחידות מראש, המשך שיעור, סיכום קצר ותרגול עם שמירה ומשוב.
המקור הקובע לתוספת זו הוא [22](22_PERSONAL_COURSES_IMPLEMENTATION.md). אין שינוי Core/Chrome.
תוכן AI וקול הם Conditional; השינוי טרם נפרס. שימור קורס לאחר זמן וכיול פדגוגי אינם
מסומנים כמושלמים. הספירות הנוכחיות לאחר המיגרציה: 39 טבלאות מוצר ו־68 נתיבי API.

## 1. כללי קריאה

המסמך מפריד בין שלוש שכבות אמת:

- **Stable baseline** — קיים ב־commit האחרון שנבדק ב־2026-09-29.
- **Working-tree change** — קיים מקומית אך אינו commit/verified baseline.
- **Planned/Open** — מתועד אך אינו יכולת קיימת.

אין להציג Working-tree כ־Production. מקור הסטטוס המדויק הוא Git + tests +
deployment evidence, לא תאריך מסמך בלבד.

## 2. Identity ו־Account

| Feature | Core | Web | Chrome | מצב | הערות |
|---|---:|---:|---:|---|---|
| Email registration/login | ✓ | ✓ | ✓ | Stable | password 12–128 |
| Google login Web ID token | ✓ | ✓ | — | Stable | client per application |
| Google login Chrome access token | ✓ | — | ✓ | Stable | `chrome.identity` |
| Facebook login | ✓ | ✓ | — | Stable | email scope נדרש |
| Access JWT + rotating refresh | ✓ | ✓ | ✓ | Stable | storage שונה לכל client |
| Logout/revocation | ✓ | ✓ | ✓ | Stable | idempotent |
| Application role user/admin | ✓ | ✓ | חלקי | Stable | admin loaded from DB |
| Email verification | — | — | — | Planned P0 | UI אינו מבטיח |
| Password reset | — | — | — | Planned P0 | ספק email חסר |

Production activation status for Facebook Login on 2026-10-01: Meta `email` and SDK/domain settings are saved and the Core provider row points to App ID `2207127606520765`. The Web fallback fix at `gotIt-front@c5c6e0173515a1de05baf55a3f4c56c2452e0722` is deployed with a passing public bundle/readiness smoke. The unanswered-SDK timeout fix at `gotIt-front@af299153dde90879aafa0aa3a42e1ae8a8d2469d` is locally verified and awaiting deployment at this checkpoint. App Secret, publication and live provider acceptance remain pending. See [rollout evidence](24_FACEBOOK_LOGIN_ROLLOUT.md).

## 3. Profile ו־Preferences

| Feature | מצב | פרטים |
|---|---|---|
| source/translation default | Stable | nullable source enables provider detection |
| timezone | Stable | IANA; משפיע calendar day/streak |
| daily goal | Stable | items/minutes/attempts |
| new items/day | Stable | configurable |
| translation method | Stable | auto/dictionary/ai |
| enabled skills | Stable | 1–5 skills |
| language CEFR self-assessment | Stable | A1–C2 |
| system level/range/confidence | Stable | updated from lesson evidence |
| interests | Stable | reading personalization |
| UI locale | Stable | 8 locales ב־Web/Extension |

## 4. Capture ו־Vocabulary

| Feature | Web | Chrome | Backend | מצב |
|---|---:|---:|---:|---|
| Manual capture | ✓ | ✓ | ✓ | Stable |
| selection/context menu | — | ✓ | ✓ | Stable |
| double-click inline translation | — | ✓ | ✓ | Stable |
| floating selection action | — | ✓ | ✓ | Stable |
| contextual preview | ✓ | ✓ | ✓ | Stable |
| auto/dictionary/AI choice | ✓ | ✓ | ✓ | Stable; availability by config/tier |
| candidate provenance/signature | parsed | parsed | ✓ | Stable |
| existing-sense detection | ✓ | ✓ | ✓ | Stable |
| merge/new sense | ✓ | ✓ | ✓ | Stable |
| save idempotency | ✓ | ✓ | ✓ | Stable |
| edit semantic fields | ✓ | ✓ limited | ✓ | Stable |
| search/filter/sort/page | ✓ | — | ✓ | Stable |
| bulk actions | ✓ | — | ✓ | Stable |
| tags/examples/occurrences | ✓ | — | ✓ | Stable |
| soft delete/restore | ✓ | delete only | ✓ | Stable |
| permanent deletion | — | — | — | Open |

## 5. Word Packs

- Topic/track/CEFR/pack catalog.
- פרטי pack ו־entry preview.
- בחירת 1–100 entries בהתקנה.
- reuse של item קיים עם אותה משמעות.
- progress per pack: linked/new/learning/reviewing/mastered/due.
- remove with `archive_exclusive` או `keep_words`.
- filtering practice/library לפי pack/track/topic.

מצב: Stable ב־Backend וב־Web live; לא מוצג ב־demo/Chrome.

## 6. Practice ו־Learning

| Capability | מצב | מקור סמכות |
|---|---|---|
| smart review | Stable | Backend queue/policy |
| manual session | Stable | Backend |
| flashcards | Stable | self-rating scored server-side |
| typed recall | Stable | accepted forms/server scoring |
| multiple choice | Stable | opaque choice IDs |
| listening + spelling | Stable | server exercise + TTS |
| matching | Stable | server answer mapping |
| pronunciation | Stable conditional | configured speech provider |
| article quiz | Stable | reading-bound exercises |
| study cards before scoring | Stable | no evidence/XP |
| study images | Stable conditional | Pixabay/OpenAI provider |
| five-skill projections | Stable | attempts/effects |
| learned/established stages | Stable | policy v1.3 |
| manual mastery override | Stable | source=user, no fake evidence |
| demotion after failures | Stable | active recall policy |
| XP, daily cap, level, streak | Stable | Backend ledger/projections |

Smart review queue rotation (`gotIt-backend@d659b274397421685ff840c9013437a366ab1718`): among eligible words, a current-revision word with no successful matching attempt precedes one already solved in matching. Previously solved words rotate from oldest to newest matching success across calendar days. Due status, mastery gaps and active-recall requirements remain in the server policy. Render deployment `dep-daup51s9v7es73aeastg` is Live; production-data queue evaluation selected three different English words from the reported board.

## 7. Dashboard

Stable live capabilities:

- due/new/active/mastered/paused counts.
- daily goal and current progress.
- total XP, level, streak.
- five-skill aggregates.
- weekly activity/time and recent sessions.
- items needing strengthening.
- installed pack progress.
- latest private-lesson assessment shortcut in shell.

Demo dashboard uses local seed/reducer and must not be treated as server truth.

## 8. AI Reading

Stable committed baseline:

- topic, language, CEFR, content type, length and optional item selection.
- smart target selection.
- preview → signed publication token → open/persist.
- target occurrence binding and bounded repair.
- history/detail/delete and article quiz.
- trial/paid quota.
- committed provider: Anthropic adapter.

Working-tree change on 2026-09-30:

- Anthropic adapter/config removed locally.
- `OpenAiReadingGenerator` added locally.
- proposed default `AI_READING_MODEL=gpt-6-luna` using `OPENAI_API_KEY`.
- tests/config/README being adapted.
- all eight Web locale catalogs have local provider-error wording changed from
  Anthropic to OpenAI; Chrome README has a matching local edit.

סטטוס המעבר: **Work in progress, user-owned changes, not baseline** עד commit,
quality gates ו־deployment evidence. אין לערוך או לבטל שינויים אלה בלי בקשה מפורשת.

## 9. Speech ו־Images

- Google TTS/STT adapter עם locale/voice/model mappings.
- Azure TTS/native pronunciation adapter.
- WAV validation ו־transient user audio.
- pronunciation equivalence/homophone handling.
- Pixabay safe/relevant image search.
- OpenAI generated image fallback.
- shared image asset/cache/attribution.

היכולות conditional: route קיים אך `capabilities` עשוי להחזיר unavailable כאשר
credential/provider חסר.

## 10. Private Lesson

Stable:

- setup per target language.
- standard/absolute beginner mode.
- support language, CEFR, duration 1/5/10/15.
- female/male voice וחמש מהירויות.
- focus areas/custom focus.
- correction mode ו־vocabulary mode.
- roadmap recommended/communication/grammar.
- Realtime WebRTC session עם short-lived secret.
- microphone mute, timer, translation of latest tutor sentence.
- opening/wrap-up/finish lifecycle.
- completion report: strengths, corrections, grammar, vocabulary, suggestions.
- lesson history/detail/delete.
- skill evidence, level range/confidence ו־roadmap milestone progress.

מגבלה: איכות, latency, device microphone ו־model availability דורשים live/device
acceptance; test מקומי אינו הוכחה לחוויה חיה.

## 11. Billing ו־Entitlements

- Core plans, free/trial/paid status.
- product trial ממועד יצירת user.
- monthly/yearly plans לפי catalog.
- Paddle hosted checkout ו־customer portal.
- signed webhook fulfillment ו־idempotency.
- grace ל־past_due.
- Web subscription banner ו־billing screen.
- Web billing מציג Free רק כתוכנית נוכחית לפי Core, ולא כהצעה לבחירה בקטלוג.
- Backend guards ל־vocabulary write, practice, reading ו־speech.
- admin bypass לפי role מהמסד.

Production finance/legal/reconciliation נשארים rollout work עד ראיה מתועדת.

## 12. Transfer, Help ו־Legal

- paginated `learning_library_v1` export.
- `capture_requests_v1` import עד 100 entries ו־partial result.
- Help center קיים.
- Terms, Privacy ו־Refund pages קיימים עם route aliases.
- account permanent deletion ו־full portability process עדיין אינם שלמים.

## 13. Platform/Operations

- health/readiness לכל services.
- graceful shutdown ל־GotIt/Gateway.
- structured/redacted logging.
- CORS/origin/security headers/rate limits.
- explicit GotIt migrations ו־preflight scripts.
- Docker/Render manifests.
- automated test suites בכל repo.
- Chrome MV3 build/package verification.

פערים: monitoring/alerting, restore drill, generated API contract, Core migrator
separation ו־cross-repo compatibility CI.
