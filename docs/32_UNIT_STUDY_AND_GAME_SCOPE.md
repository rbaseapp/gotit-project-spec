# Unit study media and game selection — 2026-10-06

## Current delivery update

### All unit smart entries and legacy resumes — 2026-10-06

The owner still observed unordered smart learning on the ori account. Read-only
inspection reproduced will/there/give in two already-open unit-1 tabs. One URL
lacked `batch=1`; the other also had a stale session created before the ordering
release. The previous fix depended on that URL marker and did not replace legacy
session pools.

Backend `c6d8a56ab9b51ed4d96c82dfb2a065e9cf93af41` now applies curriculum batching
by default to every smart-review pack session, including requests with no new
flag. The session DTO/receipt exposes `curriculumOrder`. Existing unordered
pack-smart sessions cannot issue further exercises; their stored attempts remain.
Web `0af392da26ca20ac20a3c36fc7cecc021cd3fc4a` requests order on every pack-smart
entry, skips the separate memorization deck there, and replaces an active legacy
resumed pool with a fresh ordered batch. Dashboard resume links preserve pack
scope. A legacy session is retained without deleting or rewriting its evidence.

Validation passes: 33 real PostgreSQL unit/lifecycle cases, nine focused backend
receipt/catalog contracts, 48 Web product/live cases including false/missing
resume markers, and eight browser cases including marker-free URLs at 320px and
1487px. Typechecks, Web lint/build, formatting and diff checks pass. The old
lifecycle assertion expected all ten eligible pack words for count=5; it now
expects the requested five-word batch. Both exact commits are confirmed Live in
DEV Render (Backend 45.8s, Web 53.9s); both readiness endpoints return 200.
Authenticated unit-button smoke loads the current unit context and daily-allowance
message. This account cannot start its next new word today, so a live completed
ordered round is not claimed. Direct smart-URL navigation/reload is blocked by
Chrome with ERR_BLOCKED_BY_CLIENT; navigating from the unit screen works.
The two stale empty game tabs were returned to the unit word page, preserving
their existing session evidence. Before/after evidence:
`C:/Users/Ori/AppData/Local/Temp/unit-order-legacy-before.png` and
`C:/Users/Ori/AppData/Local/Temp/unit-order-all-entries-dev.png`.
The user's daily new-word preference remains unchanged; production is excluded.

### Ordered unfinished unit batches and learned badges — 2026-10-06

This supersedes the review-priority ordering in the previous delivery. Backend
`47bbc2718810b179588bb995c6f0e2b01548b83d` and Web
`644efb7369a74c1b290367ac2bab752276d47a59` are confirmed Live in DEV. The unit
entry requests `curriculumOrder=true`. Both selection and actual game rounds keep
catalog order, regardless of review dates. A partially finished 10/20-word batch
reopens with its unfinished words; later batches start only when the current
batch is complete. Known/excluded entries remain excluded.

Unit detail now returns `learned` for a correct, scored unit-scoped game attempt
at the current learning revision (score >=85, excluding flashcard self-ratings).
The word list displays a learned badge and selected-word explanation, refreshed
on return/focus. General-library attempts do not complete a unit word. This
completion marker is separate from long-term mastery; no XP or mastery rewrite
and no migration is involved.

Verification: 34 relevant real PostgreSQL lifecycle/unit cases, 19 focused backend
contract/queue/study cases, 52 Web live/navigation tests, six browser cases across
320px and 1487px, and applicable typecheck/lint/build checks passed. The actual
game regression reverses review dates and still requires the first catalog words.
Real authenticated DEV confirms existing successful unit words have learned
badges, including have and need; no answers or fabricated progress were submitted.
Screenshot: `C:/Users/Ori/AppData/Local/Temp/unit-order-dev-verified.png`.

The live launch also exposed this account's exhausted daily new-word allowance.
The next curriculum word is still new; the game correctly does not skip ahead
to later review words. Follow-up Backend `da7ad8b03083aef60d6b83574c2397d112ce1383`
and Web `e5292a3fa9425b40c894ad98ab37ffd6b165c3e2` replace the generic empty-selection
message with `UNIT_DAILY_NEW_LIMIT`, explaining tomorrow/settings. The real
PostgreSQL unit regression and 11 Web product tests pass again with this guidance,
as do typechecks. Both exact follow-up commits are confirmed Live in Render
(Backend 43.8s, Web 46.3s deployment duration).
Both readiness endpoints return 200; a fresh authenticated unit-button launch
visibly shows the localized allowance explanation. Screenshot:
`C:/Users/Ori/AppData/Local/Temp/unit-order-daily-limit-dev.png`.
The account preferences were not changed. Production remains excluded.

### Direct daily unit batches — 2026-10-06, Live in DEV

This supersedes the chooser flow below. The unit button now reads "Practice unit
words" and navigates straight to smart games with pack, language, count, batch=1,
ready=1, and the originating unit return URL. There is no game chooser, ready
confirmation, or separate memorization deck on this entry path. Installation is
skipped when the unknown unit entries are already linked, and navigation no longer
waits for a redundant catalog reload. Other smart-practice entry paths retain their
existing preparation and memorization flow.

The saved user/language short or long pace selects a 10- or 20-word batch; without
a saved pace, the profile's daily new-word preference supplies a 10–20 batch limit.
The saved review-only preference excludes new words. Server daily allowances still
apply: fewer eligible words produce a smaller batch, never unrelated vocabulary.
Scoped smart queues continue in-progress unit words before introducing the next
new words in catalog order, rather than random learning-item UUID order. Targets
and answer options stay within the selected unit batch; known entries are omitted.

Backend `a12fe0e3998f9556d89e09c7935b18dd998661fb` and Web
`1a2e6de85b0aabecccb97c01d454aaa08cc93673` are confirmed Live in their DEV Render
services. Both readiness endpoints return 200. Validation: 33 disposable PostgreSQL
lifecycle/unit tests, 52 live/navigation component tests, and four browser tests
pass, including one-click launch at 320px and 1487px. Applicable typecheck, lint,
build and diff checks pass. Real authenticated DEV smoke: the renamed button
opened the game automatically with count=10 and unit 1 scope. The server selected
seven eligible words for this existing account; its profile new-word preference is
10. No answers were submitted during the smoke. Screenshot:
`C:/Users/Ori/AppData/Local/Temp/unit-batch-direct-dev.png`.
No schema/configuration change or production rollout is part of this delivery.

### Final DEV scope repair — verified

Backend `5111096e4320676f0feaa975da721bf9f1aeb410` is Live at
`dep-db2irac9v7es738jj3q0`. A second investigation found that smart-game target
selection was scoped, but the multiple-choice distractor query still expanded
from the general library. It now restricts choices to the scoped session pool;
unscoped library practice keeps its existing behavior. The corrected regression
fails against the original query and passes with the fix. All 33 real PostgreSQL
lifecycle/unit-study tests, typecheck and build pass. Earlier target-only scope
evidence did not cover this distractor path.

Web `54275f440c55d48bdd2396174edad6c313a49c25` is Live at
`dep-db2iroqjnfac73f12k70`. It includes the visible unit title and guards both
resumed and newly created sessions against a mismatching/general scope before
loading cards or exercises. All 34 live component tests, typecheck, lint and
production build pass on the merged source, preserving concurrent DEV work.
Both DEV readiness endpoints return 200. A fresh authenticated browser follows
the actual unit button to the chooser and game, with unit 1 title and pack/language
parameters retained. The corrected I illustration depicts a person pointing to
their chest, with a real example sentence. Old tabs can encounter a retired lazy
chunk during deployment; open a fresh tab or reload to load current assets.
Production is not changed by this delivery. The remaining entries below are
historical checkpoints, superseded by this verification.

Backend delivery merge `207275d83a2b16a10193270d6fc877f4852f93b8` preserves concurrent
DEV reading-guide release `19ca338` and the pronoun repair `417a7be`. The merge is
clean and passes typecheck and all 243 combined fast tests; the media/scope real
PostgreSQL regression already passed on the repair. No added schema/config changes.
Web follow-up `7b82902` is published to DEV; final exact deployments remain to verify.

Web follow-up `7b829029f82e2fba64bfb1c6b3727c20ee2e7ef5` displays the server unit
title and unit-only practice explanation during launch and active play, and routes
image reads through the catalog study authority so pronoun cache policy applies.
The 320px regression failed before and passed after; all four unit-study browser
cases plus press-to-talk, typecheck, lint and build pass. Follow-up deployment is
pending. Backend push encountered an independently advanced DEV branch; integrate
its changes without force-push before delivery.

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
