# Private lesson conversation room — 2026-10-07

Canonical owner for the approved conversation redesign of SCR-10, UC-07 and
P12/P13. Approved Figma file `kgMHTv0q4TJdwxCHYzUnSM`, desktop text `129:1240`,
desktop voice `129:1241`, mobile `129:1242`.

## Requirements and acceptance

FR-LESS-007: use the real lesson topic, language, level, selected teacher,
objective and chronological learner/tutor turns in a responsive conversation
room. Desktop has chat beside the teacher; mobile has a compact teacher above
the chat. The composer stays visible while the transcript scrolls. Guided stages
appear only for a server activity with guided interaction; free conversation
has no invented learn/try/chat progress.

FR-LESS-008: choose text before starting any supported lesson entry, including
legacy setup responses without interactionCapabilities. Text start must not
request a microphone. Learners can switch between voice and text in the room;
text mutes the actual input track. A denied microphone returns to text and
preserves the draft. Enter sends, Shift+Enter adds a line, IME composition does
not send. The 1,500-character bounded draft clears only after acceptance; failure
retains it for retry and duplicate in-flight submissions are blocked.

FR-LESS-009: preserve existing assistance, translation, replay, explicit resume,
pause disclosure, finish confirmation and actual server report. Finishing waits
for pending tutor generation. Explicit finish-and-save on the legacy connection
requests the report after wrap-up, including actual typed learner turns. Existing
timer/minute authority is unchanged; pausing the interface does not promise a
billing pause.

## Implementation and compatibility

Web `44f6f0a2865dcbb5aa72f9961fadf124433949c2`, branch
`feat/lesson-conversation-v3-dev`, in the isolated worktree
`gotIt-front-lesson-v3`. Prior commits `0ac9691` implement the room/controller and
`ed6845a` align teacher gender status keys across all eight locale catalogs.
`b2ebe8b` exposes text selection on all preparation entries even when legacy
setup has no capability fields. The final follow-up keeps the teacher connected
through wrap-up, interpolates the actual teacher name/gender in the transcript
status and allows drafting during teacher playback while blocking a premature
send instead of silently returning a rejected submission.

`LessonWorkspace.tsx` and `lesson-room.css` own layout, composer, transcript and
controls. `PrivateLessonPage.tsx` adapts the same workspace to both server-guided
activity and the currently deployed legacy Realtime conversation. Existing
teacher/avatar assets, audio level and Figma SVG icons are reused. No fabricated
provider message, simulated real-time level, stage or report is shown.

`privateLessonText.ts` sends a stable user conversation item over the existing
Realtime data channel, waits for that item's `.added`/`.created` acknowledgment,
records the actual learner turn once, requests the tutor response and waits for
`response.created`. A failed response retry reuses the accepted item instead of
inserting it twice. Errors and an eight-second acknowledgment timeout retain the
draft. Closing releases pending work. Late item acknowledgment is observed even
after timeout so a retry does not resend an already accepted item.

[SEQ-16](../uml/16-lesson-written-conversation.puml) documents this flow.
Guided lessons retain the existing stable UUID/revision activity commands and
server-owned evaluation; SEQ-14 remains authoritative for those transactions.

## API, data, security and process

No new product route, schema, migration, environment variable, provider model or
Core entitlement is introduced. Existing setup/session/complete/report contracts
and temporary transcript retention remain in force. Typed learner turns join
the same bounded completion payload already used for spoken turns. Provider
secrets remain server-owned; the existing short-lived WebRTC credential is used.
Drafts live in component memory; the redesign adds no durable transcript store.

UC-07 actor: authenticated learner with existing lesson access and a supported
WebRTC browser; microphone is required only when choosing voice. Main flow:
choose mode → start owned lesson → read/hear tutor → answer by voice or text →
receive actual tutor reply → finish and save → wrap-up → actual report. Alternate
flows cover denied microphone, provider timeout, retry, disconnect and report
failure. P12/P13 learning evidence, assessment confidence, minute allocation and
KPI definitions are unchanged. Improved usability has not been measured as a KPI.

## Verification and release evidence

- Final `npm run check` passes typecheck, lint, 234/234 unit tests in 44 files,
  production build and 20/20 gateway/security tests. `npm audit --omit=dev
  --audit-level=high` reports zero vulnerabilities; formatting/diff checks pass.
- Final targeted browser gate passes 14/14: six focused cases cover geometry
  and stable command retry at 320/390/1487px, actual track mute/resume and draft
  preservation, denied microphone/390×430 keyboard viewport, and legacy setup
  without capabilities accepting text without microphone and including the turn
  in completion/report. Eight HE/EN legacy playback/resume viewport cases pass
  in that same final run. Browser HTTP/provider/microphone fixtures do not
  substitute for actual physical-device acceptance.
- GitHub room source `ed6845a` run [37605260894](https://github.com/rbaseapp/gotIt-front/actions/runs/37605260894)
  passes type/lint/233 unit and 438/440 browser cases; all lesson cases pass.
  Remaining failures are the 320px touch drop and learning-map overflow. Both
  fail identically on the baseline main run [37604169351](https://github.com/rbaseapp/gotIt-front/actions/runs/37604169351)
  (empty drop target and 345px document width at a 320px viewport). Their test and
  product source is unchanged in this release. The text-entry source `b2ebe8b`
  run [37606025331](https://github.com/rbaseapp/gotIt-front/actions/runs/37606025331)
  also passes all 438 other browser cases with exactly those same two failures.
  The final follow-up's full Linux
  CI is pending; do not label the repository-wide browser gate green.
- Actual authenticated DEV provider smoke at `b2ebe8b`: start in text without
  microphone permission, receive actual opening audio/transcript, submit a
  library routine/current-action contrast, observe one learner turn and cleared
  draft, receive context-specific tutor feedback, translate it into Hebrew,
  explicitly finish and save, and receive the persisted report and homework.
  The report identifies that actual independent answer and explicitly does not
  claim pronunciation evidence. Initial AI_SESSION_ACTIVE blocked the shared
  test account; the prior session ended normally before retry. No other session
  or database record was cancelled by this task.
- Actual desktop proof: [written exchange](evidence/2026-10-07-lesson-room/dev-written-conversation.jpg),
  [translation](evidence/2026-10-07-lesson-room/dev-translation-desktop.jpg),
  [completed report](evidence/2026-10-07-lesson-room/dev-completed-report.jpg).
  Fixture proof: [390px writing](evidence/2026-10-07-lesson-room/fixture-writing-390.png),
  [keyboard viewport](evidence/2026-10-07-lesson-room/fixture-keyboard-390.png),
  [1440px voice](evidence/2026-10-07-lesson-room/fixture-voice-1440.png).
  Browser viewport override did not alter the live tab's measured 2400px layout;
  it was reset. Live mobile-device acceptance and physical microphone/audio
  hardware have not been verified; local mobile geometry and track behavior are
  verified with the browser fixtures.

DEV frontend service `srv-dar6dng473hc73a0ns1g` follows the dedicated feature
branch. Its baseline `7492251` is tree-identical to concurrently merged main
`b1389fd`; unrelated working-tree edits were preserved. Backend remains the
observed live `02957c3`; no Backend/Core/Chrome release is required for this room.
This task does not push application main or deploy production. Final Render
deploy [dep-db31sh7f3r2c738664a0](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db31sh7f3r2c738664a0)
reports `Deploy succeeded|Live`, source `44f6f0a`, duration 50 seconds,
trigger Auto-Deploy, started 2026-10-07 13:26:12 Asia/Jerusalem. A fresh
authenticated page load exposes text selection and the persisted independent
answer report in history. Live URL: https://gotit-dev.rbaseapp.com/private-lesson.

Rollback: use the prior observed DEV baseline commit from Render deploy history
if needed, then restore the intended DEV source branch. Do not change production
or discard concurrent local work. Physical microphone/device audio acceptance is
still a separate check.
