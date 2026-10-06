# Practice clarity and native reading guides — 2026-10-06

## Scope and current release state

Owner request: center/enlarge game meanings; order recall ratings good/hard/again in green/orange/red; readable pronunciation controls, meaning and automatic audio with replay; larger phrase-aware letter tiles; immediately visible Basic/Good/Advanced level choices; distinct typed recall and letter assembly; side-by-side source/meaning with native-alphabet pronunciation beneath source.

Work is based on the currently deployed DEV Figma branches. Release target clarification is pending because the standing main-delivery instruction differs from the existing DEV-only rollout baseline. No new source has been pushed or deployed. Do not merge the preceding DEV redesign into production implicitly.

## Backend source checkpoint

`gotIt-backend@061b1b67807d097491e5f3f9f48e9df12cffe0b7` implements `POST /api/v1/learning-items/reading-guides` with strict `{ids: UUID[1..30]}` and `vocabulary.write`. All requested items must belong to the authenticated application/user and be non-deleted; mixed/foreign batches return 404 before a provider call. Response: `{guides:[{id,phoneticText,phoneticScheme}],requestId}`. Native alphabet comes from profile `defaultTranslationLanguage`, falling back to the saved item's translation language; the client cannot choose an arbitrary provider language.

Existing `phonetic_text`/`phonetic_scheme` persist `transliteration:<language>`; no new table or migration. Existing matching guides are reused. Concurrent identical batches share work. Generated data writes only while source, source language, learning revision, native preference and owner remain unchanged. Guide metadata does not award progress/XP or edit source/meaning. Semantic edits already invalidate the fields.

Provider: existing server-only `OPENAI_API_KEY` and `OPENAI_TRANSLATION_MODEL`, Responses API with `store:false`, source expressions/language IDs only, no page content/audio/credentials. Strict bounded output validates IDs, duplicates, length and expected script for Hebrew/Arabic/Russian/Chinese; incomplete/refused/failed responses become `READING_GUIDE_UNAVAILABLE` (503). The existing `ai_translation` daily quota applies, with 20-second timeout and bounded response reader. Missing/unreliable results are omitted rather than replaced by translations. Generation remains conditional on provider availability and linguistic output quality.

Local evidence: typecheck/build/changed Prettier/diff checks passed; the new provider regressions and all 32 disposable PostgreSQL practice cases passed. The earlier 239-unit run passed before the API catalog was updated. Final-catalog rerun exposed one existing fixed-count assertion (88 routes versus expected 87); **this checkpoint does not pass the full unit gate**. That assertion is being corrected in the next source increment. The source commit's unit-count statement refers to the earlier run and is superseded by this precise checkpoint.

## Trace and acceptance

FR-PRAC-008 / UC-05 / P08 / SCR-04: readable centered language content; descending self-rating order including keyboard 1/2/3; pronunciation autoplay/replay without microphone permission; large grouped letters and typed recall distinction. FR-PATH-006 / UC-PATH-03 / SCR-16: three direct level choices preserve selected level and unit navigation. FR-LIB-009 / UC-13 / P06 / SCR-05/06: meaning beside source, native reading guide below source, asynchronous server completion and no fabricated fallback.

Backend trace: library routes/repository + reading-guide.ts + server wiring + API catalog -> reading-guide unit tests and practice PostgreSQL lifecycle tests (cache/concurrency/ownership/stale revision). Web source and local gates are recorded below. Exact deployments and authenticated live smoke remain pending.

## Deployment and rollback

Deploy Backend before Web on the confirmed target. No migration, new secret or permission grant. Verify exact source SHAs, `/ready`, native guides in an authenticated library, pronunciation playback/replay and all three level choices, plus desktop/mobile geometry. An older backend leaves optional guides unavailable without replacing the library. Rollback may redeploy previous code while preserving generated metadata and learning history. No deployed/provider-success claim at this checkpoint.

## Backend final local gate

Source `gotIt-backend@fc9279c241a14ae81bd85a5d640aec981ac09283` corrects the stale API catalog assertion and explicitly covers the new POST route (88 cataloged entries). All **239/239** unit tests now pass. The unchanged implementation passed all **32/32** disposable PostgreSQL lifecycle tests, typecheck/build and changed-file formatting. The preceding failed gate is resolved. Source publication and deployment remain pending target clarification.


## Web source and final local gates

`gotIt-front@47d80b612e4280f199e8571e5426d6a73e709ce6` implements the requested screens on `feat/figma-complete-dev`:

- Game prompts/meanings are centered and larger, including enlarged user text. Recall buttons run good/hard/again top-to-bottom in green/orange/red; keyboard 1/2/3 has the same order.
- Pronunciation retrieves the study meaning, starts source audio automatically, retains replay, and cancels stale playback when the exercise changes, recording starts or the screen unmounts. Microphone permission remains tied to recording. Natural-height hold labels reserve space for both states so Hebrew/English large text fits without shifting the button.
- Letter boxes/tiles have larger touch targets and wider gaps between phrase words. Ordinary recall uses native keyboard text input; explicit letter assembly retains the clickable alphabet and grouped boxes.
- The initial map displays all three level buttons. Selecting one opens its level directly and preserves unit navigation.
- Vocabulary places meaning beside source and native-alphabet pronunciation beneath source. Visible missing/mismatched guides use the new authenticated batch endpoint (up to 30 items); existing guides are reused and outdated async responses ignored. Missing/provider-failed guides stay absent, never masquerading as meanings or invented pronunciations.

Final local validation:

- Web typecheck, lint, production build, changed-file Prettier and Git whitespace checks pass. Vite retains its existing large-chunk warning.
- `npx vitest run --reporter=verbose`: **225/225**, 43 files. The existing ten-attempt smart round test intermittently exceeded five seconds under local load; its case-specific ceiling is now 15 seconds with assertions unchanged. Earlier interrupted/failed runs are superseded by this completed passing run.
- `npm run test:gateway`: **20/20**.
- Final isolated Playwright runs: **29/29** practice-clarity/press-to-talk/mobile scenarios (two existing mobile cases passed on retry after navigation/stability timeouts), plus **10/10** focused-learning/map cases. These cover Hebrew/English recording geometry, autoplay/replay simulation, large text, native guide placement, ordered ratings/keyboard, phrase gaps and typed/letter distinction at 320/390/1487px, with map checks also at 768px.
- Broad browser run: **419 passed / 5 failed**, started before the final test corrections. Three old recall tests still expected tiles without `input=letters`, one test title changed after collection, and one navigation timed out. All five affected behaviors passed in the final focused runs. This is not represented as one clean full-suite run on the final commit.
- Desktop/mobile screenshots were inspected. Final artifacts are under `%TEMP%/gotit-clarity-final` and `%TEMP%/gotit-clarity-map-final`; unit/build/gateway logs use `%TEMP%/gotit-clarity-*`.

No provider was called by mocked browser tests, no physical microphone/audio acceptance is claimed, and no source branch was pushed. Main is unchanged in the app repositories. The pending decision is DEV-only deployment versus promotion to main/production, since the deployed DEV base includes preceding unrelated redesign commits. Deploy Backend before Web after that decision; verify readiness, exact SHAs and authenticated live acceptance before changing this status.
