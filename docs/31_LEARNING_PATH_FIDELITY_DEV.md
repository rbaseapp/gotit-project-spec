# Learning path fidelity and sequencing — DEV only

## Scope and source checkpoint — 2026-10-06

Owner explicitly requests DEV only, matching the existing Figma design branch. Code
stays on `feat/figma-complete-dev`; production source/main and production services
are excluded. Documentation is synchronized on main.

Backend source: [gotIt-backend@b3c1b737ea1385644bc114366dc2e46b0dd51146](https://github.com/rbaseapp/gotIt-backend/commit/b3c1b737ea1385644bc114366dc2e46b0dd51146).
Status: **Locally verified / integration verified; exact DEV deploy pending**.
Web implementation is in progress and is not yet a committed or deployed result.
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
blocks; landscape may shrink the frame to keep content within the available height.

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
A complete 413-case responsive sweep and exact-source CI are pending at this
checkpoint. Early parallel local tests hit load-related timeouts; isolated full
check passed. Old dialog/label assertions were corrected to the actual new flow.
Changed-file formatting and diff checks pass. Final type/lint/build were repeated
after the history language-scope preservation fix.

## Backend DEV deployment verified

Render service srv-dar6ei7f3r2c73balbp0 reports **Live** for exact source b3c1b73,
deployment dep-db2gsjmgekts73a2idl0 (auto deploy, 36.8s).
https://gotit-dev-backend.onrender.com/ready returns 200, database ok, request
1bb1189e-ec3f-44c3-aa5e-002a4dc4a898. No migration was necessary.
Web deployment and authenticated combined smoke remain pending.
