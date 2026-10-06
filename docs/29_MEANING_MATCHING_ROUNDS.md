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
- DEV candidate: check passed 214 Vitest, typecheck/lint/build and 20 gateway tests; 29 practice browser cases passed. Source: `ffd766e7b5211acc35f572694837374e00a4f0aa` on `feat/ux-2-1-dev`. DEV formatting uses a different configuration and needs normalization before push; deployment remains pending.

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
