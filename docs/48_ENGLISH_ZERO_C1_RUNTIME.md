# Structured English from zero to C1

Implementation date: 2026-10-21. Program `english-zero-c1`, immutable content version `2026-10-21.1`.

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

With no eligible words, Smart Practice now navigates to `/english-learning?view=study&unit=...&word=...`. It renders the existing memorization-card presentation with the target, meaning, authored example when available, ReadAloud and an explicit familiarity/continue button. Confirmation records that single exposure, then starts recognition automatically and navigates to the real server-issued question. Opening the study card alone never records exposure. An acknowledged introduction is not repeated when starting the attempt fails; retry preserves the same start operation UUID and revision. No client score or mastery is awarded by introduction.

The previous focus-only workaround was removed from `UnitWordBrowser`. Existing CSS and the word-list/map layouts are preserved. The revised regression follows the visible study card through explicit confirmation into the question, including a lost start response and identical retry, rather than treating a focus change as successful navigation.

Final verification: `npm run check` exited 0 with typecheck, lint, 386 tests in 62 files, build and 21 gateway/source-map cases passed; the focused learner/localization run passed 13 cases. Changed-file formatting, whitespace checks and existing CSS parity with `50ca36d` passed. Existing dependency-annotation and large-client-chunk warnings remain. Web `0642d898881712a38accec6253fe8aa0b5b1db7c` is Live on the existing DEV service: `dep-dbc8gdui0phs73anu6a0`, started 2026-10-21 12:39:03 GMT+3, succeeded in 1 minute 2 seconds. Published tree `04981a444e88a497aa91a8ee3fe5aaa614f50949` exactly matches local verified `19ef22be34a0b4c82b3fff4c6bd6a9f79648a9d9`, retained on its archive branch.

Authenticated live acceptance traversed the actual button from the unintroduced P01 word browser into the hello study card, started ReadAloud (the control changed to Stop), confirmed familiarity, and observed the server-issued recognition question with four choices. This intentionally recorded one initial exposure and created an unanswered attempt in the DEV learner account; no learner answer, score, mastery or completion was fabricated. Screenshot evidence is `smart-study-card.jpg` and `smart-practice-question.jpg`; `study-entry-release.json`, `smart-study-final-check.log` and `smart-study-focused.log` are stored outside Git alongside the previous DEV evidence. Backend/Core, published curriculum and database schema were unchanged. Full microphone/provider-quality and physical-device acceptance were not repeated.
