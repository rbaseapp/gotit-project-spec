# 29 — Recurring meaning-recognition boards and mobile dragging

Date: 2026-10-06. Source: `gotIt-front@600aafd41667d7ac8af8c394002fc7fa00449f59`.
Status: locally verified on main; server deployment pending.

## Behavior and scope

FR-PRAC-007 / UC-05 / P08 / SCR-03–04: the learner sees the explicit
learning objective, “Meaning recognition · Word matching” (localized in all
eight UI languages), using the existing green, neutral surface and typography
tokens. Recognition remains recognition evidence; it does not claim recall mastery.

The standalone drag-and-drop game requests ten words by default, bounded by
the available server session. It continues through fresh boards instead of
ending after the first three words. Smart practice alternates recognition
boards and ordinary server-selected exercises until the requested scope is
covered. For ten words the requests are 3 matching, 3 ordinary, 4 matching.
The final four-word board avoids an invalid single-card matching request.
Smaller smart pools use ordinary exercises when fewer than two remain.
Pack sessions retain the pack size. Existing smart mistake repair still follows
the main rounds. Progress is session-wide; completion and restart are preserved.

The backend remains responsible for selecting eligible words, preferring unseen
items, creating opaque choices, scoring, skill evidence, mastery and XP. Web uses
the existing session/exercise/attempt contracts; no API shape, database migration,
provider, entitlement or scoring-policy change is introduced.

## Touch and accessibility

The touch card is a React portal under `document.body`, positioned at client
viewport coordinates and centered on the finger. A transformed or animated
practice card cannot offset it. The ghost ignores pointer hit testing.
Pointer cancellation/lost capture clears the drag without placing a word;
release outside a current target does not reuse an old hovered target.
Tap-select/tap-place and desktop native drag remain available. Synthetic clicks
after dragging placed cards are suppressed. Four rows and long translations
remain reachable by scrolling on small and landscape screens.

## Regression evidence

- `test/drag-drop.test.tsx`: portal coordinate boundary, pointer updates,
  cancellation, lost capture, release outside and subsequent tap placement.
- `test/live.test.tsx`: complete ten-answer standalone and smart sessions;
  fresh board state, 3/3/4 issuance, return to matching after ordinary practice,
  no early completion and final summary. Existing five-word and draft/swap cases
  remain covered.
- `test/e2e/drag-drop.spec.ts`: actual browser touch events at 320×568,
  390×844, 844×390 and 1280×900; persistent ancestor transform, ghost center
  within two pixels of the finger, successful drop, four rows, long copy,
  reachable controls and no horizontal overflow.
- Focused Vitest: 45/45 passed. Focused touch browser suite: 4/4 passed.
- Main `npm.cmd run check`: typecheck, lint, 189 Vitest, production build and 17 gateway tests passed. The final additional tap-replacement test passed with all five touch unit cases.
- Full main browser run: 384/385 passed. The unrelated press-to-talk fixture omitted the required language response; after repairing the fixture, all five affected touch/voice browser cases passed.
- DEV candidate: check passed 214 Vitest, typecheck/lint/build and 20 gateway tests; 29 practice browser cases passed. Source: `ffd766e7b5211acc35f572694837374e00a4f0aa` on `feat/ux-2-1-dev`. DEV line-ending normalization produced no tracked changes; final formatting and typecheck passed. Source is pushed; deployment remains pending.

Browser touch emulation is not physical iOS/Android device verification.
The separate demo-session scheduler is unchanged; these round changes apply to
server-backed practice. Shared demo titles/colors also consume the updated copy/CSS.

## Rollout

Web-only release, no environment or database changes. Production currently runs `e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0`. Main also contains the pending email-auth change `da91316`; [27](27_EMAIL_AUTH_RECOVERY.md) explicitly gates its deployment on provider/Core preparation. Therefore production will receive a release branch based on the current live SHA with this repair only, while main retains the fix and DEV retains its redesign. Do not deploy main directly until the independent auth gate is cleared. Push the reviewed source
under the repository branch rules, deploy the corresponding Render Web service,
verify the exact source commit, readiness and delivered assets, then check the
authenticated board and continuation. Keep the DEV redesign isolated from `main`;
only this targeted repair may be applied to its feature branch.

Rollback uses the previous Web commit. Deployment and authenticated smoke evidence
will be recorded here after observation; local fixtures are not server evidence.

Production release source: `gotIt-front@ffcebc80edb6818f2f4e4f0baf3447b89c0893cb` on `fix/meaning-matching-production`, based on the observed live `e3cab2e` with the matching repair only. Its full check (typecheck/lint/Vitest/build/16 gateway) and 14 targeted touch/results/voice browser cases passed. Deployment remains pending.

## Backend follow-up: unseen words across standalone rounds

Source: `gotIt-backend@ae2ae7f358a9d0b01fa6dcdcb4141b25431a96f1` (2026-10-06).
Status: locally and PostgreSQL integration verified; deployment pending.
Live DEV acceptance exposed premature repeated words because successful attempts
change review-date ordering while standalone matching previously used an issued-count
offset. Matching sessions now reuse smart review's unseen-first ranking, then failed
and successful items, retaining review-date order within each group. Explicit item
selection for repairs is unchanged. Pools may recycle only after unseen candidates
are exhausted; identical meanings still obey the existing distinct-choice filter.
No route/payload/schema/scoring changes.

`test/integration/practice.integration.test.ts` reproduces the old failure and
passes on the repair: ten distinct items in 3/3/4 matching boards, successful
attempts moving review dates, ten persisted attempts and completed session.
Typecheck, build, 209 fast tests, all 63 PostgreSQL integration tests, changed-file
Prettier and diff check passed. Full formatting reports 36 unchanged baseline
files. Local production preflight and normalization commands could not connect;
this does not affect disposable PostgreSQL tests. Live startup/readiness remains
a deployment gate, and no live normalization audit is claimed.
