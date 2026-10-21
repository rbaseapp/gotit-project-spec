# 41 — Program map design in DEV

Owner request, 2026-10-13: replace the existing prepared-program map with the
supplied Hebrew screenshot while retaining live data, modularity and DEV scope.
Web checkout `../gotIt-front-map-design-dev`, branch
`feat/program-map-design-dev-20261013`, base `7f4978f`.

FR-MAP-DEV-001: `/english-learning?unit=<id>` presents a localized unit hero,
progress/continuation, completed/current/future timeline and word/goal sidebar.
The existing canonical shared header is retained. The `programsDesignEnabled`
gate limits the new view to DEV and explicit loopback previews; production keeps
the existing `EnglishUnitMap`.

FR-MAP-DEV-002: `programMapModel` projects each real server teacher station into
word range, meeting and preparation steps. Introduced-word thresholds,
`meetingCompleted`, `preparationComplete`, `available` and `nextAction` remain
the evidence/availability source. Progress is completed navigation steps divided
by actual steps (nine for the current three-station catalog), not mastery or XP.
The reference's 20 stages, 70%, titles and minutes are illustrative, not fixtures
in the live application. Words use the existing stage-scoped `path.words` response.

UC-MAP-DEV-001: learner opens a unit, continues its actual next action, expands
completed or future stages, opens its words/activities/all units and changes unit
without losing scope. Homework uses the existing assignment ID and unit return;
completed work retains the existing review mode. Opening/expanding the map causes
no provider call, homework generation, learning attempt, evidence or reward write.

NFR-MAP-DEV-001: modular model/timeline/sidebar, eight locales, bidi-isolated
numeric ranges, keyboard disclosures, 320px RTL/LTR, explicit loading/error/retry
and completion states. Hero is a static compressed transparent WebP generated
from the supplied artwork; no runtime image generation or new dependency.

No Backend/Core/Chrome, API, schema, migration, entitlement or billing change.
Existing preparation/scoring/meeting enforcement remains on the server. Rollback
is the previous live DEV Web `06b1764883f8cef69d9dcac08713e3fa2699a868`.

Local verification: 350 Vitest cases/57 files (nine new focused cases), 21 gateway
checks, typecheck, ESLint and build passed. Desktop reference comparison and 320px
Hebrew/English browser inspection passed with no horizontal overflow; keyboard,
completed/future disclosures, word and selector callbacks checked. Clean final
load has no browser errors/warnings. Existing large-bundle warning remains.
Full Playwright sweep, physical devices, paid-provider/lesson acceptance and
production deployment were not performed. No backend change requires a DB suite.

Web `docs/program-map/README.md`, `design-qa.md` and
`docs/program-map/evidence/` own detailed behavior, asset provenance and screenshots.
## Final DEV release — 2026-10-13

Web `edfdb63c3d64a6684cf09891fd980815940e2b0d` is Live on DEV service
`srv-dar6dng473hc73a0ns1g`, deployment `dep-db75pess728c73dhlo9g`.
Render reports Deploy succeeded / Live (1m03s), deployed at 19:30:51 Jerusalem time.
`/ready` returned 200. Auto-deploy remains disabled; configured branch unchanged.

Final authenticated unit-1 map shows actual 4/9 navigation steps, its pending
homework action, real stage words, localized first title and loaded compressed
mascot. Words navigation and return passed without a lesson/provider/evidence
write. Desktop container uses the corrected 1448px limit; 320px client/scroll
width is 305px. No error/warning browser logs. Null homework estimates are omitted,
not replaced with fictional minutes; its focused regression passes. Actual
loading/retry locale keys are used. The full stylesheet fixture now reproduces
legacy shell specificity, which was corrected after live visual inspection.

Known data limitation: selecting Unit 2 returns a response rejected by the
unchanged strict unit-path parser, including after explicit read retry. The map
renders localized error/retry and withholds progress/actions. No fake fallback or
relaxed parser hides this. Full-catalog live acceptance is not claimed. Backend
contract/data diagnosis remains separate from this Web design delivery.

Web docs/program-map/evidence/release.json and dev-desktop-final.png /
dev-mobile-final.png own exact local release observations. Production, Backend,
Core, Chrome and database were unchanged. Existing specification edits preserved.

## 2026-10-22 - Quiet secondary step selection

Owner-selected visual: [UnitStartHere board](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#play-491bf3f68d1b).
Implemented locally in Web branch `feat/program-map-uiux-20261022`, based on
observed live DEV `9a95e23` and preserving the independently released summary fix
`6ef43ba`. The initial review was local; the authorized DEV release is recorded below.

Exact local Web implementation commit: `10e7c9d`.

FR-MAP-CHOICE-001: only the current step and its matching hero continuation use
the yellow primary action. Other available unfinished steps have an outlined
green-text action revealed on hover or keyboard focus. At narrow widths or on
touch pointers, entry is offered through the existing stage options menu. A
contextual instruction explains where to find it. Locked postlesson practice
retains its source dependency and explanation, without a disabled entry CTA.

UC-MAP-CHOICE-001: selecting a different step opens the shared accessible modal.
Cancellation or Escape restores trigger focus and causes no navigation or write.
Confirmation invokes the existing scoped activity callback or route. Current
availability is re-resolved from the latest model before opening. Existing
explicit skip/restore actions remain available. As approved in [49](49_LEARNING_PATH_CHOICES.md),
opening content does **not** silently skip earlier work; the dialog states this
instead of reproducing the mock's automatic-skip claim. Completed reviews and
all server evidence/availability rules remain unchanged.

NFR-MAP-CHOICE-001: eight localized instruction/dialog catalogs, reduced-motion
support, 44px secondary/touch targets, actual RTL browser checks at viewport
widths 320/390/768/1490. Client and scroll widths match (305/375/753/1475 after
scrollbar gutters). The map-only body minimum-width override fixes 320px overflow.
Goal and hero remaining counts both exclude explicitly skipped steps; completed
progress remains based on actual completed steps.

Evidence: Web `design-qa.md`, `docs/program-map/uiux-20261022/verification.json`
and the adjacent source, comparison, desktop/mobile and confirmation captures.
27 focused cases, typecheck, lint, build and 23 gateway checks passed. Full Vitest
reported 420 passes and one lazy-loading failure in the dedicated English-path
case of `test/live.test.tsx`; the same failure was reproduced on unmodified
`9a95e23`. No full-green suite or authenticated DEV acceptance is asserted.
Local Playwright CLI acceptance (explicitly authorized after CUA disconnected)
verified hover, responsive menus, confirmation/cancel focus, protected practice,
explicit skip/restore and unchanged completion, with no new console errors.

The local `/design-preview/` entry uses the real shared component with clearly
labeled in-memory fixtures, has no API/provider writes, and is excluded from the
normal production build. The existing product shell, fonts and branded WebP
are retained; this is an interaction/design adaptation, not a pixel-identical
copy of the mock's header, illustration or illustrative content. No Backend,
Core, Chrome, API, database, configuration or migration changes are required.

### DEV deployment - 2026-10-22

User explicitly authorized DEV deployment after local review. Exact Web commit
`10e7c9da2506f2d14d22ca38c635c82762c81af9` was pushed to
`feat/program-map-uiux-20261022` and deployed with Render's specific-commit flow
on existing DEV service `srv-dar6dng473hc73a0ns1g`. Deployment
`dep-dbcj2fgm7kps73bsma20` reports **Deploy succeeded**; the frontend listened
on port 10000 and Render reported live at 2026-10-22 00:41:21 Asia/Jerusalem
(2026-10-21T21:41:21Z). Configured branch and disabled Auto-Deploy were retained.

Authenticated acceptance on `/english-learning?view=map&unit=P01` verified the
new instruction/secondary entry, updated own-name titles, locked postlesson
practice without an entry CTA, and the different-step confirmation followed by
explicit cancellation. Progress stayed **5/14 (36%)**; hero/sidebar remaining
counts both read **7**. Browser error/warning logs were empty. No lesson, provider
or skip/restore mutation was started during live acceptance. Existing local
responsive and skip/restore evidence remains applicable to the identical commit.

`/ready` and `/` returned 200. The live map-loaded stylesheet
`/assets/StructuredEnglishPage-CgFozJlH.css` returned 200 and contains both the
secondary-action and scoped minimum-width rules; SHA-256
`ac7234a785789ff717a2d66723020d65dac915fadd82afc261d6bce74958d0b0`.
Exact release observations and screenshots are retained in
[release.json](evidence/2026-10-22-program-map-uiux/release.json).
Previous DEV release was `9a95e23` / `dep-dbci0j3jremc73flqd0g`.
Production, Backend, Core, Chrome, database and environment settings were unchanged.
