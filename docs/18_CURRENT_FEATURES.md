# 18 — קטלוג יכולות נוכחי (As-Built)

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
| learned/established stages | Stable | policy v1.2 |
| manual mastery override | Stable | source=user, no fake evidence |
| demotion after failures | Stable | active recall policy |
| XP, daily cap, level, streak | Stable | Backend ledger/projections |

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
