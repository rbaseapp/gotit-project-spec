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
