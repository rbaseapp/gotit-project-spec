# Temporary production practice hub in DEV — 2026-10-07

The owner requested restoring DEV `/learn` to the current production “Learn”
page until a replacement is specified. SCR-03 / UC-05 / P08 uses the production
heading, green smart-session panel, six individual game cards in their original
order, next-word queue and paginated session history. The reference is the
authenticated production page and its original `LiveLearnPage` at `e3cab2e`.

Web implementation: isolated `gotIt-front-learn-restore` worktree on
`fix/restore-production-learn-dev`, based on `660dd21`, the exact DEV source
observed on Render service `srv-dar6dng473hc73a0ns1g`. Existing unrelated local
home-layout/test changes are preserved in their original checkout.

The restored page keeps selected-language filtering, pending/error/retry and
subscription/provider availability. Scoped word/pack/reading links retain their
scope and validated return route; scoped views omit the unrelated general queue
and session list. History resume links retain a recorded pack scope. Existing
DEV word selection, letter-spelling and history shortcuts remain below the main
content. Scoped packs retain the installed-pack check and unit explanation.

`learn-restored.css` isolates the restored typography, colors and compact game
grid from the DEV game-hub styles, with 320px responsive layout. The existing DEV
shell, home, learning map, lesson conversation and game implementations remain
the baseline. Existing `learning/queue`, `practice/sessions`, `capabilities`,
`word-packs` and course APIs are consumed unchanged. No Backend, Core, Chrome,
database, provider, scoring, evidence, XP or billing contract changes occur.

Verification and release evidence will be recorded below. Frontend-only DEV
delivery is authorized; application `main` and production rollout are excluded.
Rollback uses the previous observed DEV source `660dd21`.


## Locally verified source

Web source `006482de4d49b31928a282704216cb7c090ccc39` is pushed only to
`fix/restore-production-learn-dev`. `npm.cmd run check` passes typecheck, ESLint,
236/236 unit tests in 44 files, production build and 20/20 gateway/security
checks. Targeted live/language/navigation tests independently pass 47/47.
Formatting and Git diff checks pass.

Targeted browser run: 32/33 passed initially across the Figma account/course/game
family, UX navigation, unit study and smart scope suites. The single 1024?600 home
height assertion then passed in an isolated run on both clean baseline `660dd21`
and changed source, with no home source change. All 33 cases have passing evidence;
this is not a claim that the full repository browser suite was run. Restored card
count, direct smart entry, selected items/language, absence of unrelated queue in
scoped view, 320/390/1487px geometry and HE/EN/AR navigation are covered.

No live scoring mutation, paid provider call, migration or physical-device test is
needed for this page restoration; those boundaries were not changed or verified.


## DEV delivery and acceptance

Render deployment [dep-db35qpp42hec738m4v5g](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db35qpp42hec738m4v5g)
reports `Deploy succeeded|Live` at exact source `006482d`, duration 54.3s,
manual specific-commit deployment started 2026-10-07 17:55:35 Asia/Jerusalem.
The existing service branch and disabled auto-deploy setting remain in place.
Public DEV `/ready` returned 200 with service status `ok`.

Authenticated live `/learn` read-only smoke displays the original heading, green
smart panel with the real 10-item queue/version, six original game cards, actual
homework continuation, next words, ten history rows and pagination. An active
pack session resume carries its pack ID and language. The existing DEV shell
and navigation remain present. No practice session was created or resumed by
this acceptance check. Live desktop screenshot was visually inspected in the
browser. The family suite reran with 3/3 passing cases for retained artifacts:
[1487px scoped layout](evidence/2026-10-07-practice-hub/fixture-games-1487.png),
[320px scoped layout](evidence/2026-10-07-practice-hub/fixture-games-320.png).
These saved images use local HTTP fixtures; they are not authenticated live
screenshots. Live DEV acceptance and local browser fixture evidence remain
separate. No production deployment was performed.


## 2026-10-11 ? Subsequent approved replacement

The owner subsequently selected a new practice design for DEV. This document remains the historical restoration checkpoint; [36](36_PRACTICE_DESIGN_DEV.md) owns the replacement and its release evidence.
