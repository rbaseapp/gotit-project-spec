# Learning path fidelity and sequencing — DEV only

## Scope and source checkpoint — 2026-10-06

Owner explicitly requests DEV only, matching the existing Figma design branch. Code
stays on `feat/figma-complete-dev`; production source/main and production services
are excluded. Documentation is synchronized on main.

Backend source: [gotIt-backend@b3c1b737ea1385644bc114366dc2e46b0dd51146](https://github.com/rbaseapp/gotIt-backend/commit/b3c1b737ea1385644bc114366dc2e46b0dd51146).
Status: **Backend and Web exact source Live in DEV; authenticated desktop/mobile smoke verified**.
Web deployed source: `51b92b3f4c053b9f20e1859c138618fef8dc166b`, including the
main correction `914aa06b9e7220cda0cdc45140a49b7a395f701d` and full-session follow-up.
Final release evidence below
supersedes the intermediate source checkpoints. Production is unchanged.
Figma references: file kgMHTv0q4TJdwxCHYzUnSM, page 4:3, map 43:2557,
words 43:2725, activities 43:2900, levels 43:3083, meeting details 43:3801.

## Authoritative journey contract

FR-PATH-001 / UC-PATH-01: enter the program map, study words, then open an eligible
teacher station. A standard 50-word unit has first/half/end stations at 10/25/50
introduced entries, lasting 5/5/10 minutes. These thresholds implement the first
6–10 words / midway / end intent in Figma; 10 is the explicit implementation
assumption. This supersedes the previous optional teacher-at-zero behavior.

An introduced entry is explicitly declared known, or linked through an active pack
and active, unexcluded, undeleted learning item with learning/reviewing/mastered
status. Count distinct catalog entries, including known/practised overlap once.
Installation, page views, example views and cached images do not count. Known is
not independent mastery. SRS, XP and mastery algorithms remain unchanged.

GET word-packs and word-packs/:id add progress.introduced and teacherStations:
`{station,requiredWords,durationMinutes,available}`. Station enum adds midpoint.
GET private-lessons/units/:packId returns the same policy with unit context.
POST private-lessons/realtime-sessions accepts midpoint, rechecks authoritative
progress before any provider/minute allocation, and returns 409 UNIT_WORDS_REQUIRED
with requiredWords/introducedWords below threshold. Duration comes from the server.
Older saved lesson contexts without these additive fields remain readable.

FR-PATH-002 / UC-PATH-02: GET word-packs/:id/entries/:entryId/image is authenticated,
owner-scoped, private/no-store, read-only and does not generate an image or consume
provider quota. The catalog entry must belong to the visible pack. It returns only
an owned cached JPEG/PNG/WebP up to 3 MB at the current semantic revision with valid
kind/provider metadata, or image:null. Source attribution is retained. API catalog
has 87 routes. No schema migration, configuration or credential changes.

## Verification and traceability

FR-PATH-001 -> word-pack-journey.ts / WordPackRepository / PrivateLessonService ->
private-lesson-unit.test.ts and word-pack-journey.integration.test.ts. Below-boundary
0/9,24,49 requests fail before provider/wallet work; 10/25/50 open the intended
5/5/10-minute station. Installing 50 entries opens no station. Distinct evidence
and second-owner isolation are exercised in real disposable PostgreSQL.
FR-PATH-002 -> image route/repository -> owned/stale/wrong-entry/second-owner cache
integration checks. No client/provider evidence is substituted for DB state.

232 fast tests, typecheck, build and all 68 PostgreSQL integration tests passed.
Changed-file Prettier and git diff checks passed; full-repository Prettier reports
170 pre-existing formatting files, which were not included in this task. The image
integration was rerun successfully after the metadata guard adjustment.

## Rollout

Deploy Backend then Web on the existing DEV services srv-dar6ei7f3r2c73balbp0 and
srv-dar6dng473hc73a0ns1g. Require exact SHA, /ready and authenticated navigation/lock
smoke. No migrations. Roll back by redeploying the previous DEV source, preserving
progress. Production is untouched. New source publication alone is not deployment
evidence. The broader cross-unit adaptive checkpoint shown in meeting-detail Figma
is not introduced by this three-station unit contract.

## Web source checkpoint

Web [914aa06b9e7220cda0cdc45140a49b7a395f701d](https://github.com/rbaseapp/gotIt-front/commit/914aa06b9e7220cda0cdc45140a49b7a395f701d)
implements the requested program/map/words/activities/levels corrections. The map
entry no longer opens a word-management dialog; management is an explicit action
inside the words page. List/detail word selection, cached owned illustration,
read-aloud, example and known checkbox follow 43:2725; bulk known/add operations
remain. Map shows cumulative word/teacher thresholds and duration, with server
availability and a word-study hero at zero progress. Unit activities and general
history show real chronological records and selected details with preserved
language/unit resume scope and saved course lesson links. Levels expose three
levels, searchable units and selected unit details (43:3083/4033/4357).

Personal course words also use a list/detail layout while preserving explicit
sense selection/capture. New Program is a full page (43:2182), carries selected
languages into personal intake, and enables prepared paths only for a published
language pair. Spanish illustrative frames do not fabricate a published catalog.
Memorization centers the contained image and both independently directed language
blocks; the final follow-up preserves image size and allows vertical scrolling.

FR-PATH-003 / UC-PATH-03: Programs → map → words → map never opens stale dialogs.
FR-PATH-004 / UC-PATH-04: select word/activity and inspect its actual detail; resume
retains language/unit/return; no invented examples, images, lessons or progress.
FR-PATH-005 / UC-PATH-05: new-program language selection persists into intake and
unsupported prepared pairs remain disabled with an explanation.
Trace: EnglishLearningPathPage / UnitWordBrowser / UnitActivities / UnitLevels /
ProgramsPage / CourseUnitWordsPage / HistoryPage / path-review.css → learning-map,
figma-families, memorization-image, ux-navigation browser regressions and live tests.

Full Web check passed 224 existing unit tests, type/lint/build and 20 gateway/security
cases. The new localized UNIT_WORDS_REQUIRED regression also passes (225 total).
Latest targeted runs pass seven map/new-program/activity cases, three canonical
page-family cases, 12 image aspect/viewport cases and updated multiple-course entry.
A complete 413-case responsive sweep and exact-source CI were pending at this
source checkpoint; final Linux CI passed all 413 cases. Early parallel local tests hit load-related timeouts; isolated full
check passed. Old dialog/label assertions were corrected to the actual new flow.
Changed-file formatting and diff checks pass. Final type/lint/build were repeated
after the history language-scope preservation fix.

## Backend DEV deployment verified

Render service srv-dar6ei7f3r2c73balbp0 reports **Live** for exact source b3c1b73,
deployment dep-db2gsjmgekts73a2idl0 (auto deploy, 36.8s).
https://gotit-dev-backend.onrender.com/ready returns 200, database ok, request
1bb1189e-ec3f-44c3-aa5e-002a4dc4a898. No migration was necessary.
Web deployment and authenticated combined smoke are verified below.

## Final DEV rollout and authenticated smoke

Web service srv-dar6dng473hc73a0ns1g is **Live** at exact source
914aa06b9e7220cda0cdc45140a49b7a395f701d, deployment dep-db2h4g49v7es738it3rg.
https://gotit-dev.rbaseapp.com/ready returns 200 (request
73a540a0-f366-4699-a014-8f0c6c34c08a). Served CSS index-vQ6YihpW.css has SHA-256
`ab3ee13a1f9edd252b3e2a81da5b580670ed0bea74e3162bd8fe2c5c56c8f97e`, identical to
the local committed-source build. No production source or service was changed.

Authenticated DEV smoke on the deployed sources:

- Programs -> map renders the page with zero dialogs. Unit 1 shows real 1/50
  introduced entries, and Unit 2 shows 0/50; first/midpoint/final stations remain
  locked with correct remaining counts and 5/5/10-minute durations.
- Direct Unit 2 teacher preparation also disables Start and says 10 words remain.
  No provider or wallet session was started to test this lock.
- Word selection changes actual detail (you on desktop; where on mobile), and
  returning to the map does not open management. Missing stored examples are
  reported rather than fabricated. Bulk management stays an explicit action.
  Expanding the real unit list and selecting here also retrieves its owned cached
  Pixabay image and source credit through the new read-only image route.
- Activities display real completed teacher/practice records and selected teacher
  summary, correction and next plan. Historical pre-gating lessons remain readable.
- All three levels expose 20 real units; advanced Science search finds its unit
  and opens its map. At 390 CSS pixels map/word pages have no horizontal overflow.
- Desktop evidence used 1487 CSS pixels; mobile used 390, with temporary viewport
  override rather than changing the user's saved browser zoom.

Actual deployed-page screenshots:
[map at zero](evidence/2026-10-06-learning-path/dev-map-zero.jpg),
[word detail](evidence/2026-10-06-learning-path/dev-words-desktop.jpg),
[activity detail](evidence/2026-10-06-learning-path/dev-activities-desktop.jpg),
[locked teacher](evidence/2026-10-06-learning-path/dev-teacher-locked.jpg),
[mobile map](evidence/2026-10-06-learning-path/dev-map-mobile.jpg),
[mobile word](evidence/2026-10-06-learning-path/dev-words-mobile.jpg),
[mobile unit selection](evidence/2026-10-06-learning-path/dev-levels-mobile.jpg).

The local full browser sweep completed with 411 passes and two stale assertions
(old program dialog; Spanish label capitalization). Both assertions were repaired
before source commit and passed focused reruns (7 map cases and 1 course case).
Exact-source [Linux CI 37486984378](https://github.com/rbaseapp/gotIt-front/actions/runs/37486984378)
passes all 413 browser, 225 unit and 20 gateway cases, type/lint/build and audit
(zero vulnerabilities). Subsequent live acceptance exposed an image-shell issue
described in the follow-up below; the isolated image fixture did not reproduce it.
This evidence does not claim visual acceptance of every Figma frame, physical
mobile hardware or the separate cross-unit adaptive checkpoint.

## Memorization full-session follow-up

Web [51b92b3f4c053b9f20e1859c138618fef8dc166b](https://github.com/rbaseapp/gotIt-front/commit/51b92b3f4c053b9f20e1859c138618fef8dc166b)
addresses the issue observed during actual DEV smoke: the viewport-sized session
flex layout shrank the mobile image to about 61px high and clipped desktop replay.
The study card, image frame/image and copy now retain their intended size inside
the existing scrollable main. Image height is 260px desktop / 180px mobile;
short screens scroll vertically rather than compressing the illustration. The
attribution link inherits readable muted color instead of white on pale mint.

All 12 aspect/viewport regressions now include the full session shell, title,
progress, replay/start controls, skip and explanation. The 320px reproduction
failed before this fix and all 12 pass after. Assertions cover image size,
alignment, loading geometry, replay clipping and readable attribution. Full
`npm run check` passes 225 unit, 20 gateway, type/lint/build; changed-file format
and diff checks pass. Parent-source 413-case CI is separate evidence, not a claim
that this follow-up has already completed CI.

### Final memorization deployment and live measurements

Render dep-db2hc9favr4c73ao8ja0 is **Deploy succeeded / Live** at exact
51b92b3f4c053b9f20e1859c138618fef8dc166b. Web /ready returns 200 (request
e17312aa-7c69-4f8b-8342-5bb04b28dddd); Backend /ready returns 200 with database ok.
Served index-t3fLctbG.css has SHA-256
`83342d736991139cf62d2434e0bae3d72e6efa672103ea29ab024c1d39cc8d45`, identical to
the local final-source build. Served JS is index-QdjfeG2E.js.

Authenticated map -> words -> smart ready -> study shows the actual cached
`here / כאן` image at 260px high on a 1487px desktop viewport and 180px on a
390px mobile viewport. Hebrew alignment is center; replay is fully within its
copy container at both sizes. Attribution is rgb(80,99,139), not white. Mobile
scroll width is 390px, with no horizontal overflow. Both smoke sessions were
explicitly exited without submitting answers; existing introduced progress
remained 1/50. Browser viewport override was reset.

[Final desktop memorization](evidence/2026-10-06-learning-path/dev-memorization-desktop.jpg)
and [final mobile memorization](evidence/2026-10-06-learning-path/dev-memorization-mobile.jpg)
show the deployed result. These replace the defective pre-follow-up captures.
Final-source [CI 37489328053](https://github.com/rbaseapp/gotIt-front/actions/runs/37489328053)
completed successfully on exact source 51b92b3: 413 browser, 225 unit and 20
gateway/security tests, typecheck, lint, build and dependency audit all pass (zero
vulnerabilities). Local final-source check and all 12 image-shell tests also pass.
