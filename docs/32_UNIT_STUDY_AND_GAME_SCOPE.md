# Unit study media and game selection — 2026-10-06

## Current delivery update

Backend follow-up `417a7be16cdf7c8e54c3e8ce909a2fc20011d66d`: real DEV acceptance
showed an unrelated stock seal for the pronoun I. Seven English personal pronouns
now use explicit grammatical-referent visual briefs, skip ambiguous stock searches
and old owned image caches, and use a versioned shared asset key. Existing provider
quota/privacy/no-learning-write rules remain. All 236 fast tests, the real PostgreSQL
unit media/cache/six-mode-scope test, typecheck/build/format/diff pass. Follow-up
deployment is pending; initial Backend 48ec269 / Web 935e17b are already Live.
Actual unit game smoke returned here/without/do, all catalogued in unit 1; pack and
language remained in the game URL. The game lacked a visible unit title, being
corrected in the companion Web follow-up. No cross-unit selection was observed.

2026-10-06: the owner clarified that the changes must appear in DEV and requested
faster delivery. DEV-only deployment is now authorized; the earlier pending-target
notes below are historical. Backend `48ec269` is fast-forwarded to the configured
DEV branch. Web merge `935e17b4e82be37df4162bd59c86d4d1607ba2fd` combines the tested
`7c66148` correction with current remote DEV `810406f`; it changes no application
code relative to the tested fix and preserves four existing press-to-talk test
lines. Its tree equals remote fix merge `42a723d`. Deploy and live smoke are running.
Production main has been changed independently since the earlier checkpoint;
this delivery neither modifies nor deploys production.

## Scope and source

The reported screen belongs to the Figma DEV branch, not production main. Work is
isolated on `fix/unit-study-context` to preserve existing uncommitted DEV work.
Release destination clarification is pending; neither main nor a service has
been changed by this task at this checkpoint.

Backend source: [48ec269adcec0c43fe73ddee62161b5f026128f5](https://github.com/rbaseapp/gotIt-backend/commit/48ec269adcec0c43fe73ddee62161b5f026128f5).
Status: **implemented and locally/integration verified; deployment pending**.
Web source: [7c661486dae2d602fc6d4c549bd5ec65097f54a9](https://github.com/rbaseapp/gotIt-front/commit/7c661486dae2d602fc6d4c549bd5ec65097f54a9).
Status: **implemented and locally/browser/CI verified; deployment pending**.
Both source changes remain isolated from main and are pushed
to `origin/fix/unit-study-context` in their respective repositories.

## Problem and behavior

SCR-16 / P07-P09 / FR-UNIT-001 / UC-UNIT-01: opening a unit's words previously read
only an owned learning item's existing image and nullable catalog example. A new
word therefore had neither. Study now supports catalog media before installation,
without creating a learning item, session, attempt, known marker, mastery or XP.

FR-UNIT-002 / UC-UNIT-02: the Web change sends the unit practice action to the game
chooser with `pack`, source language and a return URL to that unit's words. Every
game and smart launch preserves that scope. Known words are explicitly explained
as excluded from unit practice and counted as familiar, not independently proven
mastery or points. All-known units disable launch and explain how to undo a marker.
The existing Backend scope contract already isolates selection; real PostgreSQL
regression covers all six session types and no fallback for all-known units.
The observed old live CTA also retained pack scope on its smart-ready URL; this
does not prove a backend cross-unit leak. The new chooser makes individual games
available directly with explicit unit context.

## API and provider contract

Existing authenticated GET `/word-packs/:id/entries/:entryId/image` remains a
read-only owned-cache lookup. Two additive POST routes accept only `{}`:

| Route under `/api/v1` | Result | Control |
|---|---|---|
| `/word-packs/:id/entries/:entryId/image` | `{image: StudyImage|null, requestId}` | Existing owned cache, then shared sense asset, then configured study image provider |
| `/word-packs/:id/entries/:entryId/example` | `{exampleText: string|null, generated: boolean, requestId}` | Catalog example, then bounded cache, then configured OpenAI translation model |

Both use existing trusted Core identity, `practice.play`, rate limiting, UUID
validation, empty strict body and `private, no-store`. Pack visibility and entry
membership are checked before cache/provider use. Wrong pack/entry is 404; malformed
input is 400; existing auth, entitlement and quota errors remain. Provider absence
can return null; Web exposes missing/error/retry states separately for each medium.
API catalog now has 89 routes; old clients remain compatible.

The example request uses existing `OPENAI_API_KEY`/`OPENAI_TRANSLATION_MODEL`,
15-second timeout, bounded JSON parsing, structured output, `store:false`, and
existing `ai_translation` daily quota. Only public catalog text and language pair
go upstream, not learner identity/context. Output is at most 300 characters,
contains the exact word/phrase and excludes markup/newlines. Cache is in-memory,
maximum 1,000 senses, 24-hour lifetime; it is not a permanent catalog backfill.
Concurrent requests for the same sense share in-flight work. Existing image
provider selection and daily image/brief quotas remain. No new secret or model
configuration is required.

## Data and privacy

No migration, owner permissions or learning-policy changes. Images reuse
`study_image_assets`, keyed by source/translation languages, normalized sense and
provider policy. Only public catalog-derived assets are shared. Owned image reads
remain scoped/current-revision. Image bytes/type/provenance are checked before
returning or storing; maximum 3 MB. Examples live only in the bounded process cache.
Viewing the screen can invoke existing providers and quotas; it is not evidence of
learning. No user text collection, audio storage or new recipients are introduced.

## Verification and traceability

- Backend `word-pack-study.test.ts`: exact-word validation, response bounds,
  prompt data minimization, quota, structured response and entitlement rejection.
- `unit-study.integration.test.ts`: real disposable PostgreSQL, uninstalled-word
  media, cache reuse across service instances, no learning writes, wrong-unit
  rejection, six session types limited to unit IDs, known exclusion, all-known
  rejection even when other-unit vocabulary exists.
- 235 fast tests and all 69 PostgreSQL integration tests pass. Typecheck, build,
  changed-file Prettier, diff check and dependency audit pass; zero audit findings.
- Web browser tests pass four new cases at 320/1487 pixels, known-state
  explanation/exclusion, scoped game requests, all-known lock and provider retry.
  Seven existing learning-map browser cases also pass. The 32 live component
  tests pass in isolation; typecheck, lint, production build, all 20 gateway
  tests, changed-file formatting and zero-finding dependency audit pass.
- The full 225-test Web unit run encountered timing failures under concurrent
  browser/build load. The isolated rerun passed all 225 tests with
  `vitest run --pool=forks --testTimeout=15000 --retry=1`. Exact-source Linux CI
  also passed the ordinary `npm test`, typecheck, lint, full browser suite,
  production build, gateway tests and dependency audit.
  [CI run](https://github.com/rbaseapp/gotIt-front/actions/runs/37495492209).
  The initial broad responsive sweep was stopped to remove competing load;
  the subsequent complete local run passed **417/417 browser cases** using
  `E2E_PORT=4186 npm run test:responsive -- --workers=2` (10.9 minutes).
- No live provider acceptance or exact-source deployment is claimed yet.

## Release and rollback

The existing DEV targets are Backend `srv-dar6ei7f3r2c73balbp0` and Web
`srv-dar6dng473hc73a0ns1g`. After release scope is resolved, publish Backend before
Web; verify exact SHAs, both `/ready` endpoints, actual new-word image/example and
game launch with unit scope. Roll back by redeploying previous compatible sources;
no down migration or progress reset is needed. Record final deployment evidence here.

The requested screen is absent from production main. At this checkpoint the full
source branch differs from main by 11 Web commits / 115 files and 5 Backend commits
/ 47 files. Merging the whole branch into main would release unrelated DEV design
and API work. The pending owner question is DEV-only delivery versus approval for
that broader production release; no silent whole-branch promotion is authorized.
