# Structured English from zero to C1

Implementation date: 2026-10-21. Program `english-zero-c1`, immutable content version `2026-10-21.1`.

## Introduction titles and postlesson participants — 2026-10-21

FR-LESS-INTRO-001 also covers the authored program. P01 is now titled **שלום, מציגים את עצמנו**;
both P01 lesson titles, map/dropdown labels, teaching phases and postlesson prompts use that
objective instead of a fictional learner name. P01 self-introduction exercises and A101
personal-profile tasks ask for the learner's own name/details. The tutor models their own
selected identity; comprehension questions about an actual third person remain text-based.

`assets/english-zero-c1/introduction-update.json` is a forward runtime correction layered over
the unchanged published import. Unit, lesson, target and enrollment identities and the original
migration/database snapshot remain intact. It changes 2 units and 4 lessons, retaining all
lesson/task counts and progress. `curriculumParticipants` resolves only the server-owned
`teacherName`/`teacherNameHe` slots. Unit views use the saved English tutor preference;
private voice lessons resolve the final requested tutor. Postlesson snapshots use the tutor
from the actual completed source lesson, with scoped preference/default fallback for old
text lessons or unavailable sources. A later tutor preference change cannot rewrite an
already-created question bank. Existing activity snapshots/receipts retain their original
wording and answer contract; newly created postlesson practice uses the correction.

P01-L2 postlesson comprehension includes the matching passage alongside its questions.
Question, passage, private anchor and audio text are resolved together before persistence.
The shared introduction acceptance policy also reaches the curriculum teacher/evaluator.
No new learner identity field, API shape, migration or grade/progress reset is introduced.

Local checks on the combined DEV source: 328 fast tests and build passed; 3 disposable
PostgreSQL integrations cover tutor identity/owner isolation, own-name answers, replay,
frozen postlesson questions, retained teacher completion, and the existing runtime and
multi-game practice. The new participant case passed again after the final content correction.
The combined source retains DEV completion fix `f56a85b` in addition to content commit `6c25221`.
Combined Backend `9de278698c51bf2ad3ca12444a2d5fd83b767cdf` is DEV Live on
`srv-dar6ei7f3r2c73balbp0`, deploy `dep-dbci9359fdbs73a0uaag` (45.8 seconds).
Backend/Web readiness returned 200 and unauthenticated unit access returned 401.
After reloading the existing authenticated unit map, its main title, both lesson titles,
unit selector and skip labels showed the correction; progress remained **5 of 14**.
No learner answer, attempt or live voice lesson was submitted in that account. Postlesson
answers and frozen tutor identity were verified in disposable PostgreSQL with provider fakes.
No migration, production deploy, service branch/Auto-Deploy change or frontend deployment
was required. Already-started attempts retain their stored content and replay contract.
[Exact deployment and acceptance evidence](evidence/2026-10-21-introduction-names/content-followup.json).

## Scope and source

The user authorised implementing the independently authored proposal in DEV, replacing the visible previous prepared English program while retaining its database records and learner history. The previous program is not the curriculum source. Core, production services and the user's dirty main worktrees are outside this release.

Backend starts from DEV commit `4925fad`; Web starts from DEV commit `50ca36d`. Implementation is isolated on `feat/english-zero-c1-dev-20261021` in each repository. The authored package is imported under Backend `assets/english-zero-c1/`, including attribution. This specification is maintained on the same named branch in a separate specification worktree.

The version contains 84 units: 6 Pre-A1, 12 A1, 12 A2 and 18 each B1/B2/C1. There are 168 authored teacher lessons, 2,016 postlesson tasks, 24 phonics sessions, 28 unseen forms and 3,424 core lexical target slots. Repeated spelling across target slots is not an additional unique word. The 957 NAWL academic electives use English definitions and do not gate graduation. The `descendent` definition has an explicit authored family-line fallback.

The curriculum is research-informed but the complete course, mastery thresholds and assessment forms have not been externally validated. C1 is a functional four-skill target, not native equivalence or official certification. Sources distinguish primary research, frameworks and vendor-reported outcomes. Dataset attribution and CC BY-SA 4.0 obligations remain with the assets.

## Runtime and data ownership

Migration `1792530000000_english-zero-c1-runtime.js` adds only product-owned tables:

- `structured_program_versions`: content and lexicon snapshots, immutable version and explicit catalog visibility; imported hidden by default.
- `structured_program_enrollments`: application/user/version scoped state and semantic revision.
- `structured_program_attempts`: private questions, answer anchors, audio/transcription provenance, grades, content revision and generation leases.
- `structured_program_commands`: scoped operation fingerprints and committed response receipts.
- `structured_program_catalog_overrides`: hides legacy topics from discovery without changing `is_active`, deleting packs or removing progress.

`private_lesson_sessions.curriculum_context` stores the authorised lesson script/version/cursor snapshot. Existing minute accounting, Core authentication, gateway allowlisting and entitlement ownership remain in their existing services. Learner catalog hiding applies to `daily-english` and `english-learning-path-en-he`; direct legacy pack detail and lesson history retain their data.

The new program's evidence is separate from legacy learning-item SRS and XP. No legacy word, unit or CEFR progress is fabricated as new-version evidence. Dashboard/program selection uses the new unit completion data. Existing personal vocabulary and historical lesson APIs retain their own contracts.

## Learning sequence and evidence

An initial oral strand runs alongside phonics. The learner chooses 10, 20, 30, 45 or 60 daily minutes and reports current reading ability. Higher entry requires separate diagnostic evidence in vocabulary, listening, speaking, reading and writing; decoding is checked separately. Placement opens the first unit of the demonstrated band and permits earlier-level remediation. It does not award word mastery or mark unobserved target senses learned.

New targets are introduced in groups of at most six, reduced to three when the last three sessions show poor independent performance or excessive review burden. Early recognition and word/meaning matching are alternatives, followed by recall, listening and contextual production. Per-target practice counters prevent newly introduced words from being skipped merely because older words completed a unit game. The server recommends the next activity and resumes an unfinished attempt before creating another.

Daily budgets are 4/5/1, 6/12/2 and 8/20/2 minutes for review/rotating activity/wrap at 10/20/30 minutes; 45 minutes allocates 10 review, 15 teacher, 10 postlesson, 8 input, 2 wrap; 60 allocates 12/20/10/15/3. They guide activity allocation and do not force the complete pipeline into every day.

Word states are introduced, acquiring, initially usable, retained and maintenance. Meaning, active recall, listening, contextual use and decoding remain distinct. Recognition, imitation and hints are not independent form retrieval. A model exposure imposes a proposed ten-minute anti-imitation window; a supported correction does not advance maturity. A supplied lexical form can support contextual-use evidence without advancing form-retrieval maturity.

Review intervals are `[1,3,7,14,30,60,90]` days from the preceding independent active retrieval. Initial introduction at day 0 followed by on-time independent recalls gives days 1, 4, 11, 25, 55, 115, 205. Only one calendar-day maturity advance is allowed, and a midnight boundary cannot bypass the due interval. Failed dimensions receive a short repair interval without erasing successful evidence in other dimensions. Queue priority is three times recent failures plus twice capped overdue ratio plus importance and weak-skill priority. This is an explicit product policy to validate, not a demonstrated universal optimum.

Initial usability requires retrieval across at least two days, two recall observations, a contextual-use observation and listening evidence. Retained/maintenance labels require later active evidence and meaningful lag. Passive exposure remains recorded; these labels do not claim exposure-free retention. Review time comes from bounded foreground server-time pulses. Active app time is not a measurement of cognitive effort. Idle gaps are not credited, and clock pulses do not invalidate answer revisions.

## Teacher, postlesson and reading

Each unit has two scoped authored AI lessons. The first introduces six communicative targets, teaches the language focus and rehearses the model. The second retrieves the first set, adds the next six, works with the unit text and sets a separate writing project. Postlesson tasks are the authored twelve-task sets; rehearsed roleplays and writing plans are labelled as practice, not novel transfer.

The written teacher serves one phase at a time and uses AI to respond to the learner's attempt or request for help. Private anchors/contrasts for retrieval stay hidden until an attempt. Two failed attempts move on with remediation rather than creating a repetition loop. Drafts and phase cursors persist. The voice teacher receives the same server-resolved script through the existing Realtime service and minute wallet. A scoped report/transcript, not call duration alone, determines the phase to resume. A completed teaching phase does not award word mastery.

Phonics provides grapheme/sound models, blending, segmentation, dictation, oral reading, direction choices and illustrated comprehension. Picture orders/choice IDs are randomised. Learners can record answers before typing is appropriate. Synthetic isolated phoneme audio requires linguistic listening QA; automated transcription is not a pronunciation assessment. Four authored picture sets and randomised new object-position scenes are rendered as native SVG.

An ordinary unit gate requires the two teacher lessons and their postlesson practice, introduction of all assigned unit targets, the relevant foundation-reading stages when needed, at least six of eight unaided sampled recalls, and two successful productions meeting the message plus at least three of four criteria. Weak introduced words remain in review; the unit does not wait for 30-day retention. Transfer prompts are generated fresh within the unit scope. Every three units an unseen checkpoint precedes the next block. Repeating a completed unseen/exit attempt generates a new parallel form rather than presenting exposed answer keys as a new assessment.

Personal readings require both target dose and active time since the preceding contextual reading:

| Band | Targets / active minutes | Text length | Selected target subset |
|---|---|---|---|
| Pre-A1 | 6 / 30 | 20–40 words | up to 4 |
| A1 | 12 / 60 | 70–110 | up to 6 |
| A2 | 18 / 90 | 140–220 | up to 8 |
| B1 | 24 / 120 | 250–400 | up to 10 |
| B2 | 30 / 150 | 450–700 | up to 12 |
| C1 | 30 / 180 | 700–1200 | up to 12 |

Advanced placement can replace a new-target dose with two new successful use/paraphrase tasks. Generation checks length, selected target spans and sense instructions, then performs an AI editorial check for grammar, naturalness and grounded questions. A conservative observed-form coverage estimate recommends independent or supported reading; missing knowledge evidence is not itself recorded as actual assistance. Audio or explicit hints are recorded separately. Long listening inputs are split into short audio parts, while a complete presentation serves the related question set. Six comprehension questions keep their keys private.

These are structured lesson readings under the existing AI entitlement, analogous to course lesson material. Dedicated product safety ceilings allow 120 curriculum text generations, 120 audio generations and 80 transcriptions per user/day so a 60-minute program session does not share the personal-course 40-call bucket. Cached audio and closed-answer scoring do not generate another paid text response. Standalone Reading's four-per-month/trial credit contract and existing personal-course limits are unchanged; no Core billing entitlement is expanded. Reaching a provider or entitlement limit remains an honest saved-work failure, not fabricated output.

External reading is an optional extension. The verified [British Council C1 reading collection](https://learnenglish.britishcouncil.org/free-resources/reading/c1) links to authentic-style reading activities. Opening an external page is not recorded as completed learning.

## Exit and contracts

After required units/unseen checks or documented earlier-band placement waivers, four separate exit activities test reading, listening, speaking and writing. Listening has no visible transcript. Speaking requires server-transcribed audio provenance; typing cannot award independent speaking. Writing requires a written 250–400-word response; a dictated answer cannot establish C1 writing. The threshold is internal product policy, with score and assistance retained per skill. Completion is not a CEFR certificate.

Learner APIs are under `/api/v1/structured-english`: catalog, enrollment/settings, units, exposures, work, heartbeats, attempts, hints, answers, transcriptions/audio, phonics, unseen, teacher phases/turns and generated readings. The existing private-lesson input accepts `curriculumLessonId` mutually exclusively with pack/course contexts. Primary Web route: `/english-learning`; `/english-zero-c1` remains a compatible alias. All response schemas project learner-safe fields; source keys, future model answers and generation credentials remain server-side. Speaking WAVs are bounded to 90 seconds in this route only; existing 15-second speech callers keep their bound.

Answer receipts bind scope, exact payload and content version. Paid AI work runs outside SQL transactions with bounded claims/leases. Retries reuse the same UUID and payload; changed payloads conflict. A refreshed page resumes its current question, teacher phase or writing draft. Audio/transcription IDs are owner/cursor scoped. Data revision changes cannot overwrite newer progress.

## Verification and release

Pre-release verification includes source counts, interval/date behavior, private-key projections, real PostgreSQL migrations, old catalog preservation/detail access, owner isolation, answer replay, hint evidence, per-word game order, resume, teacher retry after provider failure, reading cadence and reading replay. Web tests cover six-word groups, inaccessible future game steps, delayed answer disclosure and identical UUID/revision reuse after a lost response. Provider and DEV browser evidence are recorded separately below.

The 2026-10-21 backup rehearsal restored the isolated DEV database to local PostgreSQL 17 and preserved 90 packs, 170 learning items, 14 private lessons and 5 installed packs across the additive migration. Later backup/rehearsal evidence supersedes this snapshot if live DEV changes before migration. Backup material and credentials stay outside Git under the user's local application data.

Release status: implemented and activated in isolated DEV on 2026-10-21 (Asia/Jerusalem), with the exact release evidence below. Production and Core were not deployed or modified.

- Backend `626e053d810182c8effb27680ff5a8ae6abafc97` is Live on `srv-dar6ei7f3r2c73balbp0`; Render deployment `dep-dbbv6hu1egvs73euf8jg` succeeded in 57.6 seconds.
- Web initial release `b712468343f0d72f976b8f3d80a6d67f25e033d0` succeeded in 1 minute 6 seconds (`dep-dbbv6p6q1p3s73f2m3g0`). Final Web commit `0e63ff5672dae94be55a1725ece2ced33178e12a` is Live on `srv-dar6dng473hc73a0ns1g`; deployment `dep-dbbv986q1p3s73f30l9g` succeeded in 4 minutes 24 seconds. The display correction removes author-only phonics notes and uses the existing localised retry label. The focused Web cases, build and lint passed again. Live asset verification at `2026-10-20T23:14:31.305Z` confirmed the new learner chunk includes the corrected label and excludes the teacher-note fields.
- Forward migration completed at `2026-10-20T22:58:53.142Z`. Atomic activation completed at `2026-10-20T23:05:22.419Z`: version `2026-10-21.1` is visible, and both legacy topic overrides are hidden. Exact before/after hashes of all 90 packs, 170 learning items, 14 private lessons and 5 installations matched. No legacy history was deleted or converted.
- Local Backend typecheck/build, 293 fast cases and 105 real PostgreSQL integration cases passed. Backend Docker build passed. Web typecheck/build/lint, all 376 tests in 61 files and 21 gateway/source-map cases passed. Changed-file formatting and Git whitespace checks passed. Existing large-client-chunk build warnings remain.
- Real-provider acceptance at `2026-10-20T22:39:07.472Z` used synthetic data and the restored loopback database: `gpt-6-sol` text teaching, natural reading generation/editorial review, TTS, synthetic-audio transcription and Realtime session creation passed. This did not test a complete microphone conversation or expert phoneme listening quality.
- Live DEV `/health` and `/ready` returned 200, with database ready; the public API catalog exposes 164 routes including the new runtime. Authenticated browser checks verified the foundation chooser opens `/english-zero-c1`, enrollment resumes the 84-unit map, later units/exit work remain locked, six-word batches preserve order, and phonics F01 loads its mappings/script. The new course appears as the active program in My Programs and its Continue button returns to the new path. Starting a teacher before introducing the assigned words correctly returns a localised prerequisite message. A fresh 20-minute beginner enrollment was created for this check; no learner answers, mastery or level outcomes were fabricated.
- Desktop RTL and narrow browser rendering were inspected. The viewport capability requested 320 pixels but the observed CSS viewport was 400 pixels; no horizontal content overflow was observed there. This is not a verified physical-device or exact 320-pixel result. Temporary viewport overrides were reset. Screenshot evidence is retained outside Git with the DEV backup material.

Open validation limits: the complete curriculum has not undergone external CEFR calibration, a longitudinal learner study, expert review of all generated/phoneme outputs, or exhaustive manual completion of every lesson. Automated state/ownership/progression tests and real provider acceptance establish the stated engineering boundaries, not a guaranteed learner outcome.

DEV-only rollout order: verified fresh backup → local restore/migration rehearsal → explicit owner connection to `gotit_dev` on `dpg-dar6fkp7lnhs73a7mspg-a.frankfurt-postgres.render.com` → forward migration and runtime permission verification → Backend/Web deploys to their existing DEV services → atomic catalog activation/hiding → authenticated visual/API verification. Never target production host `dpg-dagov2pt0dsc73a37me0-a`.

Rollback visibility without deleting progress: hide `english-zero-c1` and set the two legacy topic overrides to false, then redeploy the prior DEV commits if required. The down migration refuses whenever the program is published, an enrollment exists or a curriculum voice-session snapshot exists. Only an unpublished, unused import can be removed and reimported, allowing disposable historical migration rehearsals without erasing learner evidence. Restore the full backup only as a separately assessed recovery action because later learner writes may exist.


## Original UI restoration - 2026-10-21

The user rejected the separate curriculum interface and explicitly required the previous UI/UX with new educational content. The UI baseline is Web DEV `50ca36d`. The correction reuses the actual existing `ProgramUnitMap`, `ProgramMapSidebar`, `UnitLevels`, `UnitWordBrowser`, original unit lesson preparation markup and existing homework styles. It removes `structured-english.css`, the separate statistics dashboard, custom unit-card grid and five-tab curriculum navigation. Existing CSS/assets, the program chooser, personal-program layout and dashboard presentation are preserved. Only content, evidence projections and activity destinations are adapted.

Display adapters are not word packs or learning evidence: their identifiers must not be sent to legacy word-pack media, installation or known-word APIs. The supplied-content word browser bypasses those APIs and uses authored examples; an introductory checkbox creates exposure only, never mastery. Core, Backend curriculum policy, published content version, database history, receipts and progress are unchanged. The usual program route `/english-learning` now hosts the new content; old pack identifiers fall back to the current new-program unit without interpreting historical progress as new evidence. The brief `/english-zero-c1` URL remains compatible.

Corrected release and verification:

- Web commit `c0a28bb04fc4b5ffd273495f1dbec2e6951ffa64` is Live on the existing DEV service `srv-dar6dng473hc73a0ns1g`. Render deployment `dep-dbbvukom7kps73av95d0` started at 2026-10-21 02:54:59 GMT+3 and succeeded in 1 minute 2 seconds. Backend remains `626e053d810182c8effb27680ff5a8ae6abafc97`; no database mutations or production deployment were required for this correction.
- The complete Web check passed: typecheck, lint, build, 381 tests in 62 files, and 21 gateway/source-map cases. Additional targeted runs passed 16 map/entry/curriculum cases, 25 private-lesson cases and 29 existing live-flow cases. Changed-source formatting and Git whitespace checks passed. All existing CSS files match baseline `50ca36d` exactly; only the separate curriculum stylesheet was removed. The existing large-client-chunk warning remains.
- Authenticated desktop DEV acceptance verified the illustrated original map, sidebar, progress and collapsed roadmap with the new P01 content; the original six-word browser/detail layout with authored examples; and the original three broad level groups containing all 84 curriculum units. My Programs retains its existing active-program/personal-program layout, and Continue opens `/english-learning`. These checks did not submit learner answers, introduce additional words or award progress.
- The original private-lesson preparation markup is covered by targeted rendering/navigation regressions. A complete microphone lesson and exhaustive manual completion of every activity were not repeated for this presentation correction. Existing homework styling is reused; this release does not claim an exhaustive pixel comparison of every game screen.
- Git CLI publication could not acquire its existing credential noninteractively, and the connected integration lacked write access. The already-authenticated owner GitHub UI published the exact tested source to the existing DEV feature branch. The published Git tree `99b3847d843fae97072f317a9e8ee19db2bbed2c` exactly matches verified local commit `4179d09ecab1f062934648c7066c33449fb62cda`, retained on an archive branch. No access permissions were expanded.
- Screenshot and check logs are retained outside Git under the isolated DEV backup folder (`restored-program-map.jpg`, `ui-restore-release.json`, and the UI restoration check logs). The live user entry point is https://gotit-dev.rbaseapp.com/english-learning.

### Smart-practice entry correction

The restored word-page CTA was disabled whenever no game had eligible words. A fresh learner therefore encountered an unexplained dead end before explicitly confirming initial exposure. The initial correction kept the CTA available but only focused the first unintroduced word's checkbox. The user reported that this still appeared to do nothing. That focus-only behavior is superseded by the visible study-card flow below. Attempt resume, eligible recommended-mode selection and future-unit locks remain.

Regression coverage checks the introduction-to-practice transition, absence of implicit exposure, unfinished-attempt resume, invalid recommended-mode fallback and future-unit locking. The final Web gates passed: typecheck, lint, 386 tests in 62 files, build and 21 gateway/source-map cases; the focused learner/localization run passed 13 cases. Existing dependency-annotation and large-client-chunk build warnings remain. All existing CSS still matches `50ca36d`.

Web `c30a4ea0453b6434d8f2b28bc6075e8b2c4a90d0` was initially deployed to DEV: deployment `dep-dbc86qm1egvs739r0450`, started 2026-10-21 12:18:35 GMT+3, succeeded in 59.2 seconds on `srv-dar6dng473hc73a0ns1g`. Its tree `4f5111882dee8f0458598f151896c0163ca6a90a` exactly matches verified local commit `7547acbbc1d6acff03baa9fcf4c2d237ff857b5a` (archived before aligning the feature branch). The existing owner GitHub UI published the files because of the previously documented CLI/integration credential limits; permissions were unchanged.

Authenticated live acceptance at `/english-learning?view=words&unit=P01` verified an enabled CTA with no introduced words, the explanation, and focus on the existing unchecked and enabled introduction checkbox after pressing the CTA. No exposure, learner answer or mastery was submitted during this live check. Confirmation-to-practice and attempt resume are covered by the automated cases; full manual lesson/provider acceptance was not repeated. Screenshot `smart-practice-fixed.jpg`, `smart-practice-release.json` and the final/focused check logs are retained outside Git in the same isolated DEV backup folder. Backend, Core, the published curriculum version and database contents were unchanged.

### Visible study-card entry

This interim navigation-only correction was rejected by the user: it still entered the separate one-question vocabulary activity instead of the existing smart game path. The current intended behavior is defined in **Existing smart game path for unit vocabulary** below. The release evidence here is historical.

With no eligible words, Smart Practice now navigates to `/english-learning?view=study&unit=...&word=...`. It renders the existing memorization-card presentation with the target, meaning, authored example when available, ReadAloud and an explicit familiarity/continue button. Confirmation records that single exposure, then starts recognition automatically and navigates to the real server-issued question. Opening the study card alone never records exposure. An acknowledged introduction is not repeated when starting the attempt fails; retry preserves the same start operation UUID and revision. No client score or mastery is awarded by introduction.

The previous focus-only workaround was removed from `UnitWordBrowser`. Existing CSS and the word-list/map layouts are preserved. The revised regression follows the visible study card through explicit confirmation into the question, including a lost start response and identical retry, rather than treating a focus change as successful navigation.

Final verification: `npm run check` exited 0 with typecheck, lint, 386 tests in 62 files, build and 21 gateway/source-map cases passed; the focused learner/localization run passed 13 cases. Changed-file formatting, whitespace checks and existing CSS parity with `50ca36d` passed. Existing dependency-annotation and large-client-chunk warnings remain. Web `0642d898881712a38accec6253fe8aa0b5b1db7c` is Live on the existing DEV service: `dep-dbc8gdui0phs73anu6a0`, started 2026-10-21 12:39:03 GMT+3, succeeded in 1 minute 2 seconds. Published tree `04981a444e88a497aa91a8ee3fe5aaa614f50949` exactly matches local verified `19ef22be34a0b4c82b3fff4c6bd6a9f79648a9d9`, retained on its archive branch.

Authenticated live acceptance traversed the actual button from the unintroduced P01 word browser into the hello study card, started ReadAloud (the control changed to Stop), confirmed familiarity, and observed the server-issued recognition question with four choices. This intentionally recorded one initial exposure and created an unanswered attempt in the DEV learner account; no learner answer, score, mastery or completion was fabricated. Screenshot evidence is `smart-study-card.jpg` and `smart-practice-question.jpg`; `study-entry-release.json`, `smart-study-final-check.log` and `smart-study-focused.log` are stored outside Git alongside the previous DEV evidence. Backend/Core, published curriculum and database schema were unchanged. Full microphone/provider-quality and physical-device acceptance were not repeated.

### Existing smart game path for unit vocabulary

The user's recording showed the vocabulary CTA entering a one-question hello activity and returning to the map. The request is to reuse the established games, interactions and smart path with the new unit content. The primary CTA now opens `/learn/session/smart?language=en&curriculumUnit=P01&count=12&return=...` (with the actual selected unit/count). It uses the existing `DevFocusGamePage` and `useFocusSession`: flashcards, matching boards, word building/recall, listening and optional pronunciation according to existing capabilities, preferences and consent. Stage transitions, difficult-word review, feedback, animation, rewards, saved checkpoints and exit behavior are reused. No CSS or game artwork is changed. Separate authored postlesson, reading and context exercises remain separate activities.

The original `/api/v1/practice/sessions` accepts additive `curriculumUnitId`, mutually exclusive with pack/track/topic, explicit-item and reading scope, and restricted to supported English vocabulary modes. The server requires the owner's enrollment and an unlocked authored unit, then includes **every target in that unit** (12 in P01, at most 61 in the current core curriculum). A requested count of one cannot silently reduce the unit path to one word. Due words are prioritized, with authored order retained afterward. Existing matching disambiguation can omit indistinguishable meanings from that board; other stages retain their original item pool.

On first entry, a version/target/owner mapping in enrollment JSON (`practiceItems`) creates dedicated normal learning items with authored current meanings/examples and five skill rows. Existing library items, packs and their history are not repurposed or credited to the new program. Subsequent rounds reuse that mapping. No new SQL table, migration, provider or Core change is needed. The mapping is internal: public session DTOs expose only optional `curriculumUnitId`/`curriculumTitle`; private selected-target mappings remain server-side. Edited, deleted or foreign mapped items fail explicitly rather than silently changing authored meaning.

All questions, scoring, item revisions, XP and receipts use the original practice service. In the **same attempt transaction**, real non-skipped encounters update the curriculum exposure/progression projection. Successful matching maps to recognition; recall and listening retain their distinct modes. Self-rating, hints and cued reconstruction do not become independent retrieval. Corrective feedback refreshes exposure so immediate reconstruction cannot manufacture delayed retention. The existing curriculum gates and delayed evidence remain conservative and separate from participation/XP.

`GET /structured-english` projects the latest owned active smart session per unit as `practiceSessions`. The CTA resumes that game session and its existing checkpoint instead of an old questionnaire attempt. Resume validates the returned unit identity; a curriculum resume uses the same game renderer even without a local checkpoint. Existing foreground heartbeat credit continues while the unit game is active, preserving reading-dose accounting as app time, not proof of cognitive effort. Legacy `/english-learning?view=study` links return to the word page.

Verified DEV release on 2026-10-21:

- Backend `ca2f36035a514c4977f57f2731146745d6b9b77a` is Live on `srv-dar6ei7f3r2c73balbp0`: deployment `dep-dbc956ss728c73edco4g`, started 13:23:23 GMT+3, succeeded in 58.1 seconds. `/ready` returned ready with database ok. Web `e4aa25ca15e9ab2552c14a081766550f24d06d5a` is Live on `srv-dar6dng473hc73a0ns1g`: deployment `dep-dbc9658ae00c73913nq0`, started 13:25:25 GMT+3, succeeded in 1 minute 12 seconds. Backend was deployed and verified first. No migration, configuration, Core or production deployment was required.
- Backend typecheck, 293 fast cases, build and 36 real disposable PostgreSQL integration cases passed. The integration run covers the new bridge, current curriculum and original practice lifecycle. Web `npm run check` passed typecheck, lint, 387 tests in 62 files, build and 21 gateway/source-map cases. Regression tests traverse all five game modes and cover every selected word across flashcards and multiple matching boards. Changed-source formatting and Git whitespace passed; all CSS remains byte-identical to baseline `50ca36d`. Existing dependency-annotation and large-client-chunk warnings remain.
- The owner-authenticated GitHub upload UI published the tested files using existing access. Backend tree `029de49e06cee93a0dd3c3bd1b3cccd2f190843f` equals locally verified `c0f72467f043bca0a31474cd540471a0c3e90ad2`; Web tree `263ddde20fbaa52b02e43ecb0a0fe0e49f2d7124` equals locally verified `be77568d66951e126f4f33432b2ed1136325a859`. Local verified commits remain on archive branches before alignment with the identical published trees.
- Authenticated live acceptance at 13:26-13:28 GMT+3 followed the real P01 word-page CTA into the original full-screen flashcard game. The route includes `curriculumUnit=P01&count=12`; the game visibly shows card 1 of 12 with 0 XP. Its original exit dialog states game 1 of 5 and card 1 of 12. Saving/exiting and pressing the unit CTA again reopened the same owned session `cad82116-a896-4e51-94f4-cbe66b9e315c` and first-card checkpoint. Creating the session materialized the dedicated normal unit learning items; this check submitted no answers, self-ratings, mastery or XP. Existing learner history was preserved.
- Screenshots `unit-smart-games-dev.jpg` and `unit-smart-games-resume-dialog.jpg`, `unit-games-release.json` and named Backend/Web/integration logs are retained outside Git under `C:/Users/Ori/AppData/Local/gotit-dev-backups/english-zero-c1-20261021`. The live check establishes entry, displayed full scope and resume. All-five-stage completion is automated coverage, not a claim of completing five games in the live owner account. Microphone/provider quality, physical devices, longitudinal retention and external CEFR calibration were not repeated or established by this correction.

### Scoped teacher entry correction

After completing smart practice, the user reached the correct next teacher stage but saw the personal-course catalog. The map already sent the correct `/private-lesson?curriculum=P01-L1&language=en&minutes=10&return=...` link. The root application entry recognized course, pack, free-practice and view parameters but omitted curriculum. Consequently a paid learner with practice access was sent to `CoursePage` before `PrivateLessonPage` could consume the authored scope.

The root entry now recognizes the `curriculum` query parameter using `URLSearchParams`. It renders the existing private lesson preparation/tutor with the same lesson id, time budget and return URL. Existing preparation loads the server-approved lesson title, phase and word context, selects Hebrew support for Pre-A1/A1, and submits `curriculumLessonId` to the existing lesson service. The service retains ownership, introduced-word and previous-lesson gates, the authored script/version/cursor, minute accounting and report progression. No CSS, Backend, schema, content version, provider configuration, entitlement policy or production change is required.

The actual-application paid-user route regression failed before the fix for P01-L1, P01-L2 and C101-L1, displaying Course page. All three pass after the fix. Existing free-user and generic paid-course entry cases remain. The preparation regression also verifies the start request contains P01-L1, guided interaction, en/he, absolute_beginner, support teaching language, 10 minutes and no generic vocabulary scope; a synthetic provider rejection stops before a real connection.

Verification and DEV release on 2026-10-21:

- Web `npm run check` exited 0: typecheck, lint, 390 tests in 62 files, build and 21 gateway/source-map cases passed. The focused entry/preparation/curriculum run passed 36 cases. Changed-file Prettier and Git whitespace checks passed; all CSS remains identical to `50ca36d`. Existing build dependency-annotation and large-client-chunk warnings remain. No Backend or database code changed, so their previous engineering checks were not rerun for this route-only fix.
- Web `481631a2e1e5b8dcbf4e027b030c47fcdfe95b2f` is Live on existing DEV service `srv-dar6dng473hc73a0ns1g`, deployment `dep-dbca2m2fngtc739hgkfg`, started 14:26:16 GMT+3 and succeeded in 59.5 seconds. Published tree `aa568e2ecd32845bddfaa5b2212bdd1b44852769` exactly equals locally verified commit `1c5de2f1b20aecbfa1c074a2d59c2b5d9c16eb55`, retained on an archive branch. Existing owner GitHub UI access published the files; no access expansion was needed. Backend remains `ca2f36035a514c4977f57f2731146745d6b9b77a`.
- Authenticated live acceptance at 14:27-14:28 GMT+3 repeated the actual P01 map's Continue to stage 2 action. It opened the original preparation UI at `curriculum=P01-L1&language=en&minutes=10` with the authored title, hello/hi/goodbye/I/you preview, Hebrew help and Start with teacher button. The same action before deployment reproduced the personal-course catalog at that URL. The live account displayed 0 available minutes; no real lesson/provider connection was initiated, no minutes were consumed, and no learner answers/completion were fabricated during this acceptance. Full microphone/provider quality and physical-device acceptance were not repeated.
- Screenshot `curriculum-tutor-fixed-dev.png`, release record `curriculum-tutor-release.json`, reproduction log `curriculum-tutor-routing-before.log`, focused log `curriculum-tutor-focused.log` and full check log `curriculum-tutor-web-check.log` are retained outside Git in `C:/Users/Ori/AppData/Local/gotit-dev-backups/english-zero-c1-20261021`.


## 2026-10-21 - Free learning paths and reversible skips

FR-PATH-CHOICES / UC-PATH-CHOICES / P-LEARNING-NAVIGATION: prepared programs and personal courses allow direct content selection, with reversible skips stored separately from completed learning. Backend/Web ownership, exact API/data contracts, invariants, acceptance and DEV release evidence are maintained in the [canonical feature contract](49_LEARNING_PATH_CHOICES.md).
