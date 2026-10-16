# 39 — Illustrated My Programs in DEV

Owner request: replace the DEV My Programs screen using `התוכניות שלי · גרסה ה (מוחי עם הדגל)@2x.png`; generate each cover from its program content and Mohi with the active language's flag and greetings. Source image is a visual reference, not runtime course data.

## Product and screen contract

`/courses` on `gotit-dev.rbaseapp.com` has the cream page, localized heading, language mascot, active-program panel, real progress/checkpoints, illustrated cards, all/in-progress/completed filters and creation tile. It retains the owner-approved fixed Today application header from Web `03aa2ab` (see 05); global navigation is not forked for this page. Existing program chooser and course/lesson/homework routes remain the actual flows. Production hostname retains the previous programs view.

Selection uses the existing account-scoped learning navigation store. Activating a card changes the hero, language, shared language selector and dashboard source together. Progress, daily goal, streak, pending homework and next lesson come from existing server resources. Week estimates use remaining lessons/days-per-week, visibly approximate. Checkmarks require coverage evidence; no placeholder dates, minutes or awards. Eight interface locales and RTL/LTR layouts are supported at 320 CSS pixels.

## Server/API contract

Authenticated and course-entitlement-gated POST `/api/v1/courses/artwork/lookup` and `/api/v1/courses/artwork/generate` accept exactly one of `{kind:"course",courseId:UUID}`, `{kind:"mascot",languageCode:BCP47}` or `{kind:"path"}`. Lookup never generates. Generation returns `{image:{dataUrl,fingerprint}}`; cache miss returns `{image:null}` only on lookup. Responses use `Cache-Control: no-store`.

Course briefs are derived on the server from the owned active/draft plan, goal, level/path and at most eight unit titles. Client-supplied prompts/subjects are rejected. Ownership is checked before cache/provider work and after generation; changed plans reject obsolete results. Shared English-path art has a canonical public subject. Mascot generation edits a canonical transparent brain raster with a language/region-specific flag and two native greetings (unregionalized Arabic uses Palestinian flag).

OpenAI image generation/editing uses existing server-only `OPENAI_API_KEY` / `OPENAI_IMAGE_MODEL`; `program-clay-v1` policy, medium WebP output, 100-second provider deadline. The existing daily `study_image_generation` quota applies only to misses. Same-key requests coalesce; server permits at most three concurrent image calls. Browser resolves hits concurrently and serializes misses. Gateway extends only this generation route to 110 seconds; client deadline is the existing 120-second course limit. Explicit loading/unavailable/retry UI is localized.

## Storage, privacy and invariants

No migration. Existing `product_gotit.study_image_assets` stores a distinct hashed namespace/model key. Course keys include application/user/course scope and bounded content; mascot keys include language. Raw goals are not persisted as cache metadata. Provider receives only the bounded subject and language, not credentials, contact identifiers, transcripts or learning evidence. Raster responses are byte/signature/dimension bounded, decoded with sharp, normalized to 900×600 covers or 1200×400 transparent mascot, then stored as WebP. Provider failures never create fake illustrations.

Viewing/selecting/filtering programs creates no lesson, attempt, library entry, mastery, XP or wallet mutation. Artwork generation consumes the existing image quota and cache only. Course creation/deletion preserve existing controls. No Core, Chrome, billing-plan, production or schema changes.

## Verification and release

Requirement/acceptance mapping:

| ID | Acceptance | Evidence |
| --- | --- | --- |
| FR-PROGRAMS-DEV-001 | Reference composition with real title/status/progress/next action | Seven Web model/component cases; desktop and mobile browser comparison |
| FR-PROGRAMS-DEV-002 | Program cover derives only from owned current content | Backend ownership/content invalidation tests and real PostgreSQL integration |
| FR-PROGRAMS-DEV-003 | Mohi language, flag and native greetings track selection | Explicit region/default mapping, language-separated cache; authenticated English/Arabic acceptance |
| NFR-PROGRAMS-DEV-001 | No cross-owner art or learning writes | Cache namespace, ownership recheck, restricted-role integration |
| NFR-PROGRAMS-DEV-002 | Bounded provider work, truthful error state | Quota/concurrency/dedup/deadlines, failure case, gateway regression |

UC-PROGRAMS-DEV-001: authenticated learner opens programs, sees cached images or explicit generation state, activates a card/language, follows the server-derived next step or overview. Alternatives: empty list/filter, draft setup, completed review, missing provider with retry. Operational indicators are provider miss/failure latency and cache reuse; viewing never changes learning completion or grants rewards.

Backend 262 fast tests passed; five artwork tests cover ownership, strict input, deduplication, content invalidation, failure/retry and localized mascot reference. One disposable PostgreSQL integration verifies durable restart reuse, foreign ownership denial and absence of learning writes. Typecheck/build and dependency audit passed.

Web 324 unit/component tests passed, including seven new program cases; typecheck/lint/build passed, 21 gateway tests passed including the bounded artwork deadline. Browser comparison uses the supplied source and real component in a development-only fixture; `docs/programs-dev/design-qa.md` final result passed. Desktop comparison and 320px RTL/LTR screenshots accompany that report. Runtime never imports fixture art or sample courses.

Source: Backend `c74dcfb3af815f757597c060985f265f023e0fec` from deployed `c66eb8d`; Web `aaa7e27a18b7d49f7ea241e1ca30f91fb4155d71` from deployed `03aa2ab`, fast-forwarded to remote `dev`. Render manual exact-commit deployments target only Backend `srv-dar6ei7f3r2c73balbp0` and Web `srv-dar6dng473hc73a0ns1g`. Live acceptance details follow after deployment.

Acceptance follow-up: Web `9020e936cf9454da51233fbb140fbad2d2675438` corrects the official-path level translation key; seven focused cases and typecheck pass again. Live Render Web release is `dep-db6k780m7kps73b8t8g0`. Initial Backend release `dep-db6k4m7f3r2c73cm9od0` passed readiness and generated all real course covers. Visual acceptance found an English mascot with an incorrect flag; Backend `941f59e9ece2a51e7d85eec2c2e83a8a6961c03f` explicitly binds country/flag description to the BCP-47 region or language default, removes unrelated flag examples, and adds `mohi-language-flag-v2` to the mascot subject to bypass those cached results without regenerating valid course covers. Regression now checks Spanish, Arabic/PS, English/GB and en-US; all 262 fast tests, the PostgreSQL case, typecheck/build pass again.

Formatting: all changed Backend files pass Prettier; repository-wide `format:check` reports 218 pre-existing unchanged files. Web production dependency audit: zero vulnerabilities. These existing formatting findings were not broadly rewritten.

Rollback: redeploy Web `03aa2ab` and Backend `c66eb8d` through the respective DEV services. Existing art cache may remain; no learning data rollback is needed.

### Final authenticated DEV acceptance — 2026-10-12

Backend `941f59e` is Live in Render `dep-db6k98o473hc739vru10`; Web `9020e93` is Live in `dep-db6k780m7kps73b8t8g0`. Backend `/ready` returns ready/database ok. All four real program illustrations load. Corrected English mascot was visually checked with Union Jack and “Hello! / How are you?”; Arabic mascot with Palestinian flag and “مرحباً / كيف حالك؟”. Switching language changes the active course, progress/checkpoints, next action, homework link and language-scoped goal. Fresh navigation/reload reuse all cached images. The creation tile opens the existing chooser, and overview opens the existing English map. Empty completed filter remains usable.

Live 320px acceptance with long Arabic/Hebrew course titles: document scroll width equals client width, all five visible images complete, no overflow or browser error/warning logs. Local 320px LTR and RTL fixture acceptance also passed. Browser viewport override reset after testing. No lesson, homework submission, course deletion, learning evidence or billing action was performed for acceptance. Real microphone/device/payment flows and production rollout are outside this screen change.

Evidence: [English final page](evidence/2026-10-12-programs/dev-programs.png), [Arabic desktop](evidence/2026-10-12-programs/dev-desktop-ar.png), [Arabic mobile](evidence/2026-10-12-programs/dev-mobile-ar.png), [release record](evidence/2026-10-12-programs/release.json). `dev-programs.png` crops only the screenshot tool's blank right/bottom padding; page content is unchanged. The specification checkout already contained unrelated edits; they were preserved.

## Navigation loading correction - 2026-10-13

NFR-NAV-DEV-001 / My Programs and SCR-05/06: remove the recurring network wait
when navigating between already loaded screens. Web `c8dae713a6112ba86a724ec6e8c14a9099e0cf92`
and `81798c0c8ce5bea0844d9f700d82e490fa85fe1b` add shared, validated server snapshots
and DEV route/data/artwork preloading. See Web `docs/navigation-loading-dev.md`
for implementation details.

Snapshots are memory-only and scoped by authenticated application/user and full
query, including language, filters and page. Freshness is 30 seconds; an inactive
snapshot is discarded when revisited after five minutes. Inactive completed
entries are evicted at 100 entries. Concurrent consumers share one request.
Stale mounted content stays visible during background refresh, with errors shown.
Successful writes/profile changes invalidate reads; active consumers revalidate
without unmounting their content. Session clearing removes data and fences late
responses. Practice session/exercise issuance and artwork reads do not invalidate
learning projections. Answer/completion and library/course writes still do.

The authenticated DEV shell preloads the two route modules and their initial
read resources. Artwork warmup calls lookup only; paid generation stays on actual
screen demand. Cached artwork is visible on the first render and is scoped by
owner, session and course revision. No backend/API shape, schema, migration,
provider setting, entitlement or learning-authority change is involved.

Local verification passed: TypeScript, ESLint (zero warnings), production build,
334 Vitest tests in 56 files (`--pool=forks --maxWorkers=4 --fileParallelism`),
21 gateway/security tests, and production dependency audit (zero vulnerabilities).
Ten new cache/artwork cases cover immediate remount, coalescing, stale refresh,
refresh failure, query/owner isolation, mutation invalidation and session races.
Existing dashboard practice tests verify answer visibility during refresh.

Authenticated browser timings measure click-to-visible active-program heading or
first real word card in the same Chrome session, including automation overhead.
Before: Programs 2772/1231 ms; Words 2642/1735 ms in two alternating rounds.
Cold browser/session entry continues to require authentication and network data;
this change does not guarantee zero latency for that case.

Production was not deployed. Backend/Core/Chrome, PostgreSQL integration, paid AI
acceptance and the full responsive browser suite are outside this frontend-only
loading correction. User-owned specification changes were preserved.
DEV Web is Live on `81798c0c8ce5bea0844d9f700d82e490fa85fe1b`, deployment
`dep-db6l9q8473hc73do96t0` on `srv-dar6dng473hc73a0ns1g`.
The `dev` branch is fast-forwarded to that commit; manual exact-SHA deployment
was used and auto-deploy remains disabled. Backend is unchanged.

After deployment, three alternating rounds measured Programs 249/245/247 ms and
Words 224/216/219 ms. A later Words remount after the 30-second freshness window
measured 1146 ms including browser automation overhead, with nine real cards and
no loading/error message. All five program illustrations were complete; no
artwork loading placeholders or console errors remained. The screenshots and
machine-readable measurements are [local release evidence](evidence/2026-10-13-navigation-loading/release.json),
[Programs](evidence/2026-10-13-navigation-loading/programs-dev.png) and
[Words](evidence/2026-10-13-navigation-loading/words-dev.png).