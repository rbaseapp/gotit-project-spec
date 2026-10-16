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
