# Canonical Figma implementation and guided learning — DEV

## Scope and release status

The owner requested a full implementation of the learning/account screens and their
server logic from `kgMHTv0q4TJdwxCHYzUnSM`, pages 4:3–4:9. The former `8yRS...`
file is historical. User authorization is **DEV only**. On 2026-10-06 the owner
explicitly deferred parent/child account relationships, account deletion and native
Google Play purchases. Existing child-friendly lessons remain supported.

Backend source: [`0404c8cc72bbb4f32a125f4c9e255318beff9a60`](https://github.com/rbaseapp/gotIt-backend/commit/0404c8cc72bbb4f32a125f4c9e255318beff9a60) on `feat/figma-complete-dev`, based on
`ae2ae7f358a9d0b01fa6dcdcb4141b25431a96f1` so the newly released unseen-first
matching repair is preserved. Backend implementation is locally/integration verified;
this checkpoint is **not deployment evidence**. Web source and release acceptance
will be recorded separately after its gates.

Main currently auto-deploys production. Therefore source changes for this explicit
DEV-only task are pushed to a feature branch and only DEV services are retargeted.
No production source-main merge, production service/DB change or Core source change
is authorized by this release.

## Requirements and acceptance

| Requirement | Owner | Acceptance |
|---|---|---|
| FR-GUIDED-001 | GotIt Backend | Resolve an owned catalog unit before AI, allocation or minute reservation; use its actual target/support pair, words and level. A catalog/pack completion count does not certify speaking readiness. |
| FR-GUIDED-002 | GotIt Backend | Maintain server-selected learn/try/chat activity with bounded answer/hint/continue/review commands, owner scope, optimistic revision and durable idempotency. Replayed commands return their original receipt. |
| FR-GUIDED-003 | Backend/Web | Text input does not require microphone permission. Voice transcription is a channel, not verified pronunciation evidence. Incorrect answers permit one retry, then assisted continuation without awarding mastery. |
| FR-GUIDED-004 | Backend/Web | Replay original/slow/support-language turns without advancing the task. Review corrected transcript against its original question; preserve original answer and attempt history. |
| FR-GUIDED-005 | GotIt Backend | Complete a structured report and purge temporary activity/transcript receipts atomically. Failed report generation preserves bounded temporary data for retry. No learner audio file is stored. |
| FR-UX-007 | Backend/Web | Practice short/long/review-only selections preserve explicit owned IDs, pack and target language through launch. Server SRS and daily new-item caps remain authoritative. |
| FR-UX-008 | Backend/Web | Approved course unit vocabulary resolves owned normalized meanings for its exact language pair. Missing/ambiguous words require existing explicit capture/sense confirmation before practice. |
| FR-UX-009 | Backend/Web | UI locale, normal/large text, reduced motion and sound preferences persist per account. Legacy enabled-skills-only updates preserve these preferences. |
| FR-UX-010 | Backend/Web | History filters language/pack/course before the database limit; a language with no saved vocabulary can still show its course/lesson history. |
| FR-GUIDED-006 | GotIt Backend | Teacher sample uses the configured Marin/Cedar voices, fixed public AI-teacher text, bounded provider bytes/timeout and existing daily AI quota; no lesson or minute reservation is created. |

All are Must for this DEV scope. Source frame counts are inventories, not test counts.
No new reward economy, mastery threshold, CEFR certification, subscription price or
native purchase contract is inferred from illustrative Figma data.

## API contract additions

All routes require the existing trusted Core application/user identity. Lesson routes
retain `requireLessonAccess`; course words retain the existing course access contract.
Application/user IDs supplied by clients never select ownership.

| Method/path (under `/api/v1`) | Contract |
|---|---|
| GET `/private-lessons/units/:packId` | Return owned/entitled published unit context: target/support language, level, vocabulary and completion. Foreign/unavailable unit is 404. |
| GET `/private-lessons/:id/activity` | Read owned active server snapshot and tutor event. |
| POST `/private-lessons/:id/activity` | Strict `{eventId: UUID, revision: 0..99, action: answer|hint|continue|review}`. `answer` requires trimmed 1..1500 character answer and optional text/voice channel. Only review accepts correctedAnswer. Invalid extra fields are rejected. |
| POST `/private-lessons/:id/replay` | Strict original/translation and normal/slow; uses the current server turn. Missing support language is 400; expired/nonactive lesson is 409. |
| POST `/private-lessons/voice-sample` | Strict `{teacherVoice: female|male}` only. Returns bounded MP3 base64, voice and explicit `sampleLanguageCode: en`. Request is not a lesson. Cache contains at most two fixed public samples for one hour; response is private/no-store. |
| GET `/courses/:id/units/:unitKey/words` | Only owned active approved course version; bounded key. Returns vocabulary with zero or more existing owned active meaning IDs/translations for the approved pair. Does not save or merge words. |

Existing private-session creation accepts optional `packId`, station and guided/
conversation mode. Course and pack contexts cannot be combined; free conversation
cannot claim one of these structured scopes. Server-resolved course/unit pair takes
precedence over a forged client pair. Structured activity creation happens before a
Realtime ticket becomes usable. Guided VAD does not create provider responses itself.

Existing GET `/private-lessons` adds optional `packId` and `targetLanguageCode`.
Language matches the validated base language, before the row limit. Existing callers
omitting these fields retain their behavior.

Existing smart-review creation adds optional `includeNewItems`. Explicit false
excludes unintroduced items. Explicit selection is checked in full for ownership,
active status, correct script and one language before scheduling; a foreign ID cannot
be silently discarded. The due/new ranking and daily new-item cap are reused, and
the choice participates in the request fingerprint. Other modes reject this option.

Existing profile PATCH accepts optional UI fields within `learningPreferences`:
`uiLocale` (the eight supported UI locales), `textScale: normal|large`,
`reducedMotion` and `sounds` booleans. Transactional merge preserves omitted fields
and enabled-skill behavior. Notification delivery settings retain their existing API.

API catalog now contains **86** entries. No endpoint exposes expected recall answers.
Errors retain the standard envelope; activity conflicts use 409, access isolation 404,
provider/sample unavailability 503, daily AI quota 429. Unused allocations are released
on setup failure, including partial cleanup failures; one cleanup error does not skip
the remaining cleanup operations.

## Data model and privacy

Forward migration `1791280000000_guided-lesson-activities.js` adds:

- nullable object `private_lesson_sessions.word_pack_context`;
- `private_lesson_activities`: composite owner/lesson key, revision 0..100, bounded
  server plan/snapshot and update timestamp; owner/lesson FK with cascade;
- `private_lesson_activity_commands`: owner/lesson/event key, 64-character request
  fingerprint and original snapshot receipt; FK to the same owned activity.

Transactions serialize commands with advisory locking and compare active status,
revision and the actual lesson deadline. A request that expires during AI work cannot
write afterwards. Completion persists the report and purges both temporary tables in
one transaction; soft deletion also purges. Failed summarization permits retry.
Temporary snapshots include bounded text turns; audio is transient and not stored.
Reviewed transcripts are annotations of the active activity, not replacement learning
evidence and not a separate persistent recording archive. Transcript/revision/turn
limits prevent unlimited accumulation.

Runtime remains product-only DML. Apply migration with the existing dedicated migrator,
whose default privileges give runtime DML on new tables. Do not elevate runtime or
grant it Core schema/DDL. Down was tested only on disposable PostgreSQL. DEV rollback
keeps additive schema and deploys a previous compatible source; never down a live
database merely to roll back the UI.

Voice preview sends a fixed English sentence naming an AI teacher to OpenAI TTS,
using `gpt-4o-mini-tts` and the same configured voice identifier as the lesson. Voices
are supported by the [official speech contract](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
No learner text, identity or audio is sent for this preview. Live Realtime and report
generation retain their existing data minimization. Provider payloads are untrusted,
validated and bounded. Browser clients never receive the provider API key.

## Process/use cases and sequence

UC-GUIDED-01: open current unit → owner-resolved lesson preparation → select teacher,
support/target instruction and text/voice mode → reserve actual minutes → start owned
guided activity → learn/try/chat commands → optional original/slow/support replay →
complete → structured report → unit/course-specific practice or homework.

Alternatives: microphone denied switches to text; unsupported speech stays disabled;
provider failure preserves draft/UUID for retry; stale revision returns conflict;
expired lesson cannot add new activity; failed report remains retryable. Pause stops
local microphone/audio but **does not pause server billing** (`billingPause: false`).

UC-UX-05: select owned course-unit meanings → confirm missing/new senses explicitly →
choose smart pace or manual game → retain exact IDs and target language → server
issues/grades exercises → actual results and scoped history. Word study, known marking,
reading or teacher help do not manufacture independent skill evidence.

UC-UX-06: change UI preferences → owner profile PATCH → apply saved locale/text/motion/
sound → reload preserves preferences. Failed save keeps the choices and permits retry.

[SEQ-14](../uml/14-guided-lesson-dev.puml) defines the server activity and report
boundary. Existing SEQ-04 practice and SEQ-13 reading remain authoritative for grading,
publication and capture. KPIs still distinguish independent learning, assisted
coverage, review scheduling and actual weekly activity; no cosmetic progress is
substituted for backend evidence.

## Verification checkpoint

Backend: TypeScript typecheck/build, **228 fast tests and 67 PostgreSQL integration
tests** pass after preserving the latest matching repair. Tests cover wrong owner/app,
mixed language, normalized multiple meanings, active-but-expired sessions, concurrent
CAS, unchanged replay receipts, changed-body replay conflict, report cleanup/down,
runtime DDL denial, legacy UI preference merge and fixed/bounded voice preview.
Changed-file Prettier passes. Repository-wide formatting reports existing unrelated
drift (including checkout line-ending differences); no unrelated files are reformatted.

Live migration, runtime normalization/preflight, exact-SHA deployments, authenticated
smoke and real provider acceptance are **pending at this checkpoint**. A passing fake
provider test is not a real provider or physical-device acceptance result.

## DEV delivery gate

1. Preserve current user/other-task worktrees; use isolated feature branches.
2. Push source branch; sync this specification immediately after each source commit.
3. Verify DEV DB host `dpg-dar6fkp7lnhs73a7mspg-a`, database `gotit_dev`; apply forward
   migration only there using dedicated migration privileges, then runtime preflight.
4. Retarget only `srv-dar6ei7f3r2c73balbp0` and `srv-dar6dng473hc73a0ns1g` to the new
   branch and deploy Backend then Web. Core DEV origin remains separate.
5. Verify exact Render commit, readiness, served Web asset hashes, and authenticated
   learning/account/word scope smoke; record any provider/capability limits explicitly.
6. Record deployment evidence in this document and push the spec update to main.

## Backend security release gate follow-up

Backend release source is now [`43a429ceeed3a2cd4715724a4d78568f846ef4d0`](https://github.com/rbaseapp/gotIt-backend/commit/43a429ceeed3a2cd4715724a4d78568f846ef4d0), preserving the guided implementation above. Only locked `proxy-addr` 2.0.7 → 2.0.8 changes; existing numeric trusted-hop configuration remains unchanged. Two subnet regressions cover short mapped-IPv6 trust and normal/full mapped compatibility. Typecheck, **230 fast tests**, build and zero-finding npm audit pass. [Official advisory](https://github.com/advisories/GHSA-jqcg-44mw-7w3h). No production rollout is performed.

DEV pre-migration product data backup: 50 tables / 9,709 rows, read-only repeatable-read snapshot with per-file SHA256 manifest, stored locally at `C:\Users\Ori\AppData\Local\Temp\gotit-guided-dev-backup-2026-10-06\manifest.json`. This is a product-data JSON backup with constraint metadata, **not a full Core/database restore drill**. Directory access is limited to the workstation owner/System. Core DEV's existing administrator connection has been verified against the approved DEV host/database; DEV has administrator/runtime roles, not the dedicated migrator role used by disposable integration fixtures. No runtime elevation is planned. Migration/deployment are still pending here.

## Web checkpoint (pending)

Web source is [`2559d5bb22a928add4a56e53e74e9d514d0167fd`](https://github.com/rbaseapp/gotIt-front/commit/2559d5bb22a928add4a56e53e74e9d514d0167fd)
on `feat/figma-complete-dev`, preserving matching/touch repairs from `ffd766e7`.
Typecheck/lint, **224 unit tests**, production build, **20 gateway/security tests**,
changed-file formatting/diff checks and npm audit (zero findings) pass. The main
bundle retains its documented size warning. Nine added browser cases pass at
320/390/1487px; the complete 406-case browser gate and Linux CI are running.
Live Web deployment and authenticated provider smoke are pending at this checkpoint.

The committed [`design/screen-ledger.json`](https://github.com/rbaseapp/gotIt-front/blob/2559d5bb22a928add4a56e53e74e9d514d0167fd/design/screen-ledger.json)
maps 494 canonical desktop/mobile frames to routes, components and state conditions:
472 shared runtime states, 14 owner-deferred states and eight conceptual reward states.
This inventory is not individual visual acceptance of all 494 frames. Parent,
deletion and native Play remain deferred; concept rewards do not activate a new
economy. Catalog language options require actual published data.

### Web screens and navigation

| Screen/process | Entry and result | Authoritative data |
|---|---|---|
| SCR-02 / SCR-UX-01 | Home → program selector `/courses` → unit/personal map; independently choose word-only practice | Selected language/program per account, owned catalog and approved active plan |
| SCR-PC-00A/B/01/02 | Intake, preference review, draft approval and current-unit journey; full syllabus remains available | Existing owner/version/revision course contracts; readiness distinguishes independent evidence from help |
| SCR-10 | Pack/course preparation → teacher/support/answer mode → focused learn/try/chat or free conversation → report → homework/word practice | Server unit/activity, Core minutes, actual report/evidence; no fabricated progress or audio assessment |
| SCR-UX-04 | `/courses/:id/units/:unitKey/words` → select owned meanings → smart/manual game | Approved pair/version and explicit sense capture for missing/ambiguous meanings |
| SCR-UX-05 | `/learn/smart` → short/long/review-only pace → original scoped session; library and independent extension-word entry preserved | Server due/new algorithm, selected IDs/pack/language and daily cap |
| SCR-09 | Reading generation → word preview → reader → explicit save/quiz | Existing AI preview/publication quota, stable save UUID and actual selected language |
| SCR-UX-02 | `/history` → language/program filter → saved report or actual session resume | Pre-limit server filtering; course-only languages remain selectable |
| SCR-UX-06 / SCR-11 / SCR-13 | `/account` → settings/achievements/minutes; `/billing/minutes` → existing Core billing | Core tier/balance/expiry; account profile/UI preference persistence |
| SCR-01 / SCR-04 | Compact auth/recovery; focused study/recall/matching with clickable spelling keys | Existing auth and exercise grading; independent games do not require a plan |

Desktop/mobile use canonical Rubik, mint/white cards, sizes and reduced information
hierarchy. Native Figma lesson portraits/icons are source assets; responsive Hebrew
and other scripts retain their own direction. Advanced choices, full reports and
syllabus use explicit disclosures instead of removing features. Loading/empty,
owner scope failure, entitlement/quota lock, unavailable microphone/provider,
offline/retry and revision conflict remain state-specific and preserve drafts.

Teacher sample uses the real server endpoint. The personal-map read-aloud control
uses the device's available speech synthesis for the actual objective and target
language; it is not represented as a sample of the AI teacher. Unsupported device
speech hides this control. Typed lesson start captures no microphone; voice remains
an explicitly chosen channel. Guided closing automatically requests the report,
including disconnected closure; legacy sessions without activities retain their
previous explicit report button. Report generation failure remains retryable.

Regressions include failed command retry with unchanged UUID/body, corrected-review
retry/original preservation, translation/pause behavior, truthful actual summary
duration and deduplicated independent/assisted evidence, unit-word warmup return,
voice sample failure/retry/cleanup, unsupported/device-language playback, UI preference
failure/retry and exact scope. Browser fixtures pass the real response parser; fake
WebRTC/provider behavior does not certify real audio quality or physical devices.

## Backend DEV deployment and migration — 2026-10-06

Backend `43a429ceeed3a2cd4715724a4d78568f846ef4d0` is **Live** in Render deployment
`dep-db2fgvu7bikc73djr8rg`, service `srv-dar6ei7f3r2c73balbp0`, from
`feat/figma-complete-dev`. The service branch alone was changed. `/health` and
`/ready` return 200/ok and ready/database ok. The previous pending statements above
describe earlier checkpoints, superseded by this deployment.

Forward migration `1791280000000_guided-lesson-activities` was applied to verified
DEV `gotit_dev` on `dpg-dar6fkp7lnhs73a7mspg-a`. The ordinary repository runner
validated its immutable baseline, ordering and migration lock. Core DEV's existing
administrator connection was used because this DEV database has no separate migrator;
no credential, role or grant was changed. The downloaded exact-source archive was
verified with SHA256 `e8d73ce13aecf5ed04c046abf7214199c43c44a98599a3a992e14a4daad5f4c1`.

After migration, the actual `gotit_runtime` connection passed strict schema/privilege
preflight (`product-only`, 39 operational tables); the product schema contains 52
tables. The read-only normalization audit completed with zero mismatches. Existing
administrator default privileges already gave runtime DML on the new tables. Runtime
remains unable to perform DDL or general Core reads. Backup is the product snapshot
documented above; rollback retains additive schema and deploys compatible older code.

Web deployment, authenticated guided lesson/report/replay and real provider acceptance
remain pending. Server readiness alone does not prove these user flows.
