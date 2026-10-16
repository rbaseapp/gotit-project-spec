# Approved practice design in DEV — 2026-10-11

## Scope and source

SCR-03 / UC-05 / P08 replaces the temporary production-style DEV practice hub with the owner's selected [Claude artboard](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-63d9452f2a66), “דף תרגול 3 · לפי ההדמיה”. The owner explicitly requested DEV only. The source HTML ZIP and PNG were exported through Claude; all ten original illustrations are reused unchanged.

Web source: `6740e1642a63b2b6f6fb63782ac3fe08d0629a1f`, based on the previously deployed DEV source `778b3be97cd40b13283bcd446ff0697901945120`. Isolated worktree: `gotIt-front-practice-dev`, branch `feat/practice-design-dev-20261011`. A normal fast-forward push advanced remote `dev` to this source; remote `main` remains `778b3be`. The original `feature/landing-page` checkout and its untracked onboarding files were preserved.

`practiceDesignEnabled` enables `DevPracticePage` and its scoped horizontal shell only on exact hostname `gotit-dev.rbaseapp.com`. Local previews additionally require `VITE_PRACTICE_DESIGN=true` and a loopback hostname. Production and demo retain the existing practice page.

## Behavior and integration

The source hero, eight game cards, recent carousel, daily-goal panel, font families, colors, image masks and responsive layouts are reproduced. All eight locale catalogs and RTL/LTR are preserved. Large-text headers use the accessible menu at widths where full navigation would overlap.

- Flashcards, writing/recall, drag/drop, mixed practice and listening use existing session routes. Matching, pronunciation and letter spelling remain available through additional-game controls.
- Sentence completion, dialogue and picture matching retain their design cards with explicit coming-soon badges and an availability explanation; there is no invented practice implementation.
- `learning/queue`, `practice/sessions`, `capabilities`, `word-packs`, `dashboard` and `dashboard/languages` are consumed unchanged. No Backend, Core, Chrome, schema, gateway, provider, scoring, scheduling, XP or billing change.
- Selected items/pack/reading, actual pack language and safe return destination are retained. Invalid/uninstalled packs remain blocked. Language changes discard stale data before starting.
- Recent active sessions resume their recorded ID and pack/language scope. Completed/abandoned entries open filtered history. Responsive carousel pagination preserves reachability of all returned entries and cursor pages.
- Daily progress and streak come exclusively from server data. Goal units remain items/minutes/attempts, rather than fabricated completed games. Viewing or starting the page records no progress.
- Subscription and speech/skill availability remain enforced; loading, empty, retry and unavailable states are explicit.

## Local verification

`npm.cmd run check` passed typecheck, ESLint, 261 unit tests in 49 files, build, and 20 gateway/source-map security tests. Focused practice/i18n verification: 12 passed. Production dependency audit: zero vulnerabilities. Full browser regression CI was not part of local verification.

Browser fixtures verified the source comparison at 1280px desktop width, 390×844 mobile, English LTR at 900×600 with the actual large-text preference, mobile menu focus, carousel advance and availability dialog. Document width remained within the viewport. Original asset bytes are unchanged. The Web root `design-qa.md` contains full/focused comparison evidence and reports `final result: passed`.

No real learning attempt, paid provider call, direct database operation or migration was performed for this frontend change.

## DEV release

Source publication, exact-source manual deployment and read-only authenticated DEV acceptance are verified below. Target service: `gotIt--dev-front`, environment `dev`, ID `srv-dar6dng473hc73a0ns1g`, URL `https://gotit-dev.rbaseapp.com/learn`. Existing tracked branch and disabled Auto-Deploy remain unchanged. Rollback source: `778b3be`.


### Verified deployment and acceptance

[Render deployment dep-db5o9fnavr4c739ghdn0](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db5o9fnavr4c739ghdn0) reports **Deploy succeeded|Live**, exact source `6740e1642a63b2b6f6fb63782ac3fe08d0629a1f`, duration 54.2 seconds, manually started 2026-10-11 15:44:46 GMT+3. [Deployment screenshot](evidence/2026-10-11-practice/render-live.jpg).

Public DEV `/ready` returned HTTP 200 with status `ok`. The existing authenticated account rendered the new practice hero/navigation and all eight cards; all ten original illustrations loaded. Actual account values were English, 5/20 unique words and a one-day streak. Recent active links retain their server IDs and language; completed sessions point to filtered history. Loaded stylesheet: `DevPracticePage-Cshm3LjR.css`. No browser error/warning logs were reported during the deployed read-only check. The desktop document stayed within its available viewport width. [Live screen](evidence/2026-10-11-practice/dev-desktop.jpg).

Mobile and large-text acceptance retain their explicit local fixture evidence in the Web QA report. No live game was started or scored, no program/language preference was changed, and no provider call was triggered during deployment acceptance. Temporary viewport/zoom settings were restored. The production service and Web `main` were not changed.
