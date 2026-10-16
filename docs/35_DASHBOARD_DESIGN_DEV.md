# Dashboard design in DEV — 2026-10-11

## Fixed task rewards and answer toasts — 2026-10-11

This owner follow-up supersedes the earlier XP-only badges and the earlier choice
to avoid fixed task amounts. The owner now explicitly selected **fixed rewards
per task**. Gifts, free teacher minutes and streak protection remain excluded.

- **FR-DASH-DEV-006 / SCR-01:** The three small-step rows display server-supplied
  **+100 XP** for a structured course/unit lesson, **+75 XP** for a free teacher
  conversation and **+50 XP** for reading plus its quiz. After earning the reward,
  a green check and the amount replace the plus sign; the tooltip says it was
  already earned today. Buttons still open the existing activities.
- Backend owns these fixed completion bonuses, once per application/user/profile
  calendar day/task, shared across languages and programs. Structured and free
  lessons are exclusive categories. A saved completed lesson report must have
  nonzero duration and usable evidence (`lessonPerformance.evidenceQuality`
  other than `insufficient`). An article quiz must be closed completed after a
  non-skipped answer for every distinct item. Opening, previewing, abandoning,
  partially answering, insufficient reports and rejected requests do not qualify.
- The existing `xp_events` ledger stores `source_type=daily_task`, reason
  `lesson|conversation|reading` and key `daily-task:v1:<profile-day>:<task>`.
  Completion, award, total/level and daily-XP projection commit atomically under
  the existing scoped `practice-user` lock. Replays and simultaneous completions
  award once. These fixed daily bonuses are additional to ordinary practice XP;
  they neither consume nor undergo its soft cap/reduced rate. The practice
  algorithm version identifies this reward-policy revision as `v1.4-daily-tasks`.
  No mastery, score, billing entitlement or free-minute change. No migration.
- Additive API response: `gamification.dailyTaskRewards` on `/dashboard` and
  `/gamification` contains `lesson`, `conversation`, `reading`, each `{xp,
  completed}`. Web validates it optionally for older-server compatibility and
  renders amounts from the server. Existing session `xpEarned` includes a reading
  completion bonus when awarded. Existing Chrome parsers ignore additional fields.
- **FR-DASH-DEV-004 / UC-05:** Every acknowledged quick-review answer displays a
  centered bottom Toast for four seconds, surviving the 900ms automatic advance.
  Correct answers use green, the actual receipt XP (including zero), a check and
  a 28-piece, finite 1.6s confetti burst. Incorrect answers use red, an alert icon
  and the server's expected answer, without confetti. The toast can be dismissed,
  announces its result, respects reduced motion and clears on navigation. On
  narrow screens it sits above bottom navigation. Network failures keep explicit
  retry and do not celebrate. The expected choice remains highlighted on the card.

Implementation checkouts: `gotIt-front-dashboard-fixes` and
`gotIt-backend-dashboard-rewards`. Core and Chrome source, schema and credentials
are unchanged. Original dirty workspace/spec changes are preserved.

Local verification: Web `npm.cmd run check` passed typecheck, lint, 286 unit tests,
build and 20 gateway/security tests. Backend typecheck, 257 fast tests, build and
focused formatting passed; the two real disposable PostgreSQL files passed all
34 tests, covering concurrent rewards, rollback, scoped ownership, profile-day
reset, insufficient reports, lesson/conversation classification, incomplete
reading, exact reading reward and replay. An old assertion equating total XP with
practice-cap consumption was updated for the new explicitly separate bonuses.
The existing nonfatal focus-game CSS and bundle-size warnings remain.
Local browser fixtures verified actual green/red Toast colors, surviving auto
advance, confetti animation, numeric/claimed badges and 320px Hebrew layout.
Provider-backed lesson/reading generation and real microphone calls were not run.

Evidence: [numeric rewards and success Toast](evidence/2026-10-11-dashboard-fixes/local-success-rewards.png),
[red mobile Toast](evidence/2026-10-11-dashboard-fixes/local-error-toast-mobile.png),
[mobile confetti](evidence/2026-10-11-dashboard-fixes/local-confetti-mobile.png).
Sequence: [daily completion reward](../uml/seq_daily_task_rewards.puml).
Release: Backend `cc7019fd5313da88ee9066bd37a98e33977546b4` is Live on
`gotIt-dev-backend` / `srv-dar6ei7f3r2c73balbp0`, manual deployment
[`dep-db5s4vnlk1mc73b27cmg`](https://dashboard.render.com/web/srv-dar6ei7f3r2c73balbp0/deploys/dep-db5s4vnlk1mc73b27cmg),
2026-10-11 20:08:14 Asia/Jerusalem, duration 40.3s. Web
`ccfd2aa909357ddb63b274eb2b1cc5a52c752dfa` is Live on `gotIt--dev-front` /
`srv-dar6dng473hc73a0ns1g`, manual deployment
[`dep-db5s582jnfac73bi5plg`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db5s582jnfac73bi5plg),
20:08:48, duration 56.5s. Existing tracked branches/disabled Auto-Deploy settings
were preserved. Web `/ready` returned HTTP 200 / `status: ok`; Backend `/ready`
returned HTTP 200 / `status: ready`, database `ok`.

Authenticated DEV acceptance confirms all three numeric server rewards. A real
correct `acquisition` answer displayed green `נכון` and actual **0 XP**, with 28
animated confetti pieces; a real incorrect `escalation` answer displayed a red
Toast with `תשובה: הסלמה` and no confetti. Both advanced automatically. Mobile
390px had 375px document width (scrollbar), no horizontal overflow. The fixed
task awards themselves were verified on disposable PostgreSQL; no live paid AI
lesson or article generation was initiated to earn a bonus. Local English/LTR
at actual 320px also showed the numeric badges, success Toast and confetti without
horizontal overflow. Final narrow-screen Toast spacing/build and answer-label
follow-up were rechecked with the 13 dashboard regressions and production build.

Web remote `dev` points to `ccfd2aa`; Backend source is published on
`feat/dashboard-task-rewards-dev-20261011`. Production `main` remains Web
`778b3be`, Backend `8c09440`; neither production service was deployed. Rollback
sources: Web `e5760cc`, Backend `22ac2cb`. Existing awarded XP remains valid ledger
history if source is rolled back; rollback must not delete earned user points.
Evidence: [Backend Live](evidence/2026-10-11-dashboard-fixes/render-backend-rewards-live.png),
[DEV numeric rewards and green Toast](evidence/2026-10-11-dashboard-fixes/dev-live-success-rewards.png),
[DEV red mobile Toast](evidence/2026-10-11-dashboard-fixes/dev-live-error-toast-mobile.png),
[English 320px](evidence/2026-10-11-dashboard-fixes/local-english-toast-mobile.png).
The real five-question DEV round reached `5/5` and closed automatically with a
server session receipt of **3 XP**. Both Toast outcomes and final completion were
verified against the real DEV Backend. [Completed round](evidence/2026-10-11-dashboard-fixes/dev-live-round-completed.png),
[Web Live](evidence/2026-10-11-dashboard-fixes/render-front-rewards-live.png).

## Scope and approval

Implement the two Dashboard artboards supplied by the owner:

- [Program dashboard](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-27ca34afaafc).
- [Personal vocabulary dashboard](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-0ab8b5cb52ca), including its capture-active and three-day-inactive presentation states.

The owner originally approved **design with existing mechanisms; gifts later**.
The fixed daily task bonuses above are subsequently approved. Do not add a
300-XP gift economy, streak protection or free teacher minutes.
The reference's “הדגמת מצב” control is a prototype annotation and is omitted.
Future onboarding is outside this release.

## Behavior and ownership

Web owns this implementation. Backend, Core, schema, entitlements and learning
policy are unchanged. `DevDashboardPage`, `DashboardQuickReview`,
`DashboardArticle` and scoped `dashboard-design.css` implement the new UI. The
mascot uses the original PNG and the reference's float, breathe, blink, shadow,
hover tilt and click-hop animations, with reduced-motion support.

- **FR-DASH-DEV-001 / SCR-01:** Enable only on exact hostname
  `gotit-dev.rbaseapp.com`. Local loopback hosts require
  `VITE_DASHBOARD_DESIGN=true`. Other hosts retain `LiveDashboardPage`, even when
  that flag is set. Demo mode retains its existing dashboard.
- **FR-DASH-DEV-002:** Reuse the existing account/language-scoped program choice.
  An approved active personal course displays its server progress, next lesson
  and plan. The existing prepared English path is also supported. An absent,
  stale or other-language choice displays personal-word practice instead.
  Future onboarding must persist its choice through this existing context or
  replace it with an explicitly approved server contract.
- **FR-DASH-DEV-003:** Daily goal, streak, due/new counts and XP come from the
  language-scoped dashboard API. A known newest saved item at least 72 hours old
  enables the capture reminder. Unknown, loading and failed capture history do
  not claim inactivity. This uses elapsed hours, not profile calendar days.
- **FR-DASH-DEV-004 / UC-05:** Quick review loads a playable question on Dashboard
  entry when vocabulary and practice entitlement are available. It creates a
  scoped-language recall session through existing APIs (new words included) and
  requests source-to-translation exercises with exactly four choices. Opaque server choice IDs are
  submitted; receipts supply results and XP. Ambiguous answer/session creation
  retries reuse their event ID and payload. No automatic scoring or fabricated
  distractors. Unsupported exercises or insufficient distractors surface an
  error and the full-practice link remains available. Updating dashboard totals
  preserves the current answered exercise.
  The primary button always opens full smart review. After a server receipt,
  inline answer feedback stays visible for 900ms, then advances automatically;
  the last answer automatically closes the round. A failed close offers explicit
  retry without resubmitting the answer. StrictMode does not create duplicate sessions.
- **FR-DASH-DEV-005 / UC-06:** Select personal words and a topic, then explicitly
  request an existing short article preview. Preview remains transient until
  the learner saves it using the existing publication-token endpoint. Ambiguous
  save retries reuse the publication token and event ID. A saved article opens
  its existing article quiz. Existing quota/entitlement failures remain visible.

The horizontal desktop navigation and mobile drawer reuse AppShell routes and
account actions. Hebrew/Arabic use RTL; the other existing locales use LTR. All
eight catalogs include the new strings and preserve interpolation placeholders.
Layout supports mobile, desktop and the existing large-text preference.
The account control is at the inline end (left in RTL), with a readable account
label and circular initial. Daily steps show a gift icon separated from actual
today XP; this is a visual change and does not introduce gift rewards.

## Owner acceptance corrections — 2026-10-11

Web `e5760cc00978a8ed4803b2a676ad8736f42a1cb6`, isolated checkout
`gotIt-front-dashboard-fixes`, corrects SCR-01 / FR-DASH-DEV-004:

- Header and green-strip controls use viewport edge padding (24px desktop,
  16px narrow mobile), while the dashboard body retains its centered content width.
  Logo/account and goal/language controls mirror correctly in RTL/LTR.
- Quick review retains and disables all four choices after acknowledgement,
  highlights the expected answer and incorrect selected choice, and replaces the
  question hint with concise receipt-based feedback. Correct cards have a green
  outline; incorrect cards briefly shake, respecting reduced motion. After 900ms
  both outcomes advance automatically; completion closes once. Navigation cancels
  the pending timer. Dashboard refreshes preserve the acknowledged question.
- In Hebrew, the gift is to the left of actual today XP. Each daily-step row
  shows a gold XP badge beside its action. The owner explicitly selected existing
  activity-based XP rather than fixed prototype amounts (100/75/50); no new
  bonus, gift economy or server scoring rule is introduced.

Source pushed to remote `dev`; production `main` remains `778b3be`.
`npm.cmd run check` passed typecheck, lint, 286 unit tests / 50 files, production
build and 20 gateway/security tests. The initial check caught a test label mismatch
(`להתחיל` versus existing `מתחילים`); corrected and the complete check rerun passed.
Pre-existing focus-game CSS-minifier and bundle-size warnings remain.
Browser fixtures verified correct/incorrect feedback, automatic next word and final
completion, 1440px desktop, and Hebrew/English at actual 320px without horizontal
overflow. Local fixtures make no live learning/scoring claim.

Evidence: [desktop](evidence/2026-10-11-dashboard-fixes/local-desktop.png),
[answer feedback](evidence/2026-10-11-dashboard-fixes/local-feedback.png),
[mobile](evidence/2026-10-11-dashboard-fixes/local-mobile.png),
[English mobile](evidence/2026-10-11-dashboard-fixes/local-english-mobile.png).
Render deployment
[`dep-db5rpt2jnfac73bh296g`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db5rpt2jnfac73bh296g)
is **Deploy succeeded | Live** for exact Web `e5760cc`, started 2026-10-11
19:44:36 Asia/Jerusalem, duration 59.5s. Existing tracked branch and disabled
Auto-Deploy were preserved. `/ready` returned 200 / `status: ok`.
Authenticated DEV reload confirms four real choices, three task XP badges,
gift left of XP, account/language controls 24px from the left edge and
logo/goal controls 24px from the right content edge at 1440px. At 390px there
is no horizontal document overflow. No live answer was submitted in this
acceptance; authoritative scoring/retry/automatic progression were exercised by
local tests and fixtures. No Backend/Core/schema/config changes or production
deployments. Rollback source: Web `5d9d3fe`.
Evidence: [Render Live](evidence/2026-10-11-dashboard-fixes/render-live.png),
[DEV desktop](evidence/2026-10-11-dashboard-fixes/dev-live-desktop.png),
[DEV mobile](evidence/2026-10-11-dashboard-fixes/dev-live-mobile.png).

## Source and verification

Follow-up corrections on 2026-10-11 were committed and pushed to Web `main` as
`41dee04c5e68be532774837f3420cd98e0387a7c` (`fix(dashboard): show inline quiz and
restore live mascot`). The exact remote ref was verified. `npm.cmd run check`
passed: typecheck, lint, 255 unit cases, build and 20 gateway/security cases.
New regressions cover immediate four-choice loading, StrictMode duplicate
prevention, stable creation/answer retry, empty banks and insufficient choices.
This supersedes the original explicit-start interaction documented at launch.

Live acceptance of `41dee04` exposed a contract difference from the older local
Backend checkout: deployed Backend `76cee7df1a336362fd5a638eec936550c09f1192`
rejects `includeNewItems` on recall sessions (smart-review-only field). Web
`778b3be97cd40b13283bcd446ff0697901945120` removes that field, preserving the
server's default queue behavior. The exact creation-payload regression and all
11 Dashboard tests passed, followed by typecheck/build. Backend was inspected
at its deployed Git object and was not changed or redeployed.

Final follow-up DEV release: Render deployment
[`dep-db5jtt7lk1mc73a954i0`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db5jtt7lk1mc73a954i0)
reports **Deploy succeeded | Live** for Web `778b3be`, started 2026-10-11
10:47:00 Asia/Jerusalem, duration 45.6 seconds. Authenticated DEV acceptance
confirmed an automatically loaded real word with four server choices, the full
smart-review link, an account control at the left in RTL, a 14px gap between gift
and XP, and live mascot animation including a keyboard-triggered hop returning
to breathing. Desktop 1440px and mobile 390px had no horizontal document
overflow; the mobile drawer focused its close button and opened/closed correctly.
No real answer was submitted during live acceptance; scoring/retry/receipt behavior
was exercised by local regressions. `/ready` returned HTTP 200 with `status: ok`.
Screenshots: [live desktop](evidence/2026-10-11-dashboard/dashboard-corrections-live.png),
[live mobile](evidence/2026-10-11-dashboard/dashboard-corrections-mobile.png).
Existing claimed user tabs did not accept viewport/capture overrides reliably;
responsive acceptance and screenshots used a new tab in the same correct Chrome
profile. The temporary viewport override was reset afterward.

The owner subsequently requested publication to the Git `dev` branch. A normal
fast-forward push advanced `origin/dev` from `23c1966` to `778b3be`; both remote
`dev` and `main` were verified at the exact final SHA. A fresh authenticated DEV
reload still showed four choices, the smart-review link, the account on the left
in RTL, the gift icon with a 14px XP gap, active breathing animation and no alerts.
Render remained Live at the same final commit and `/ready` remained healthy.

Working branch: `feat/dashboard-design-dev-20261011` in
`gotIt-front-dashboard-dev`, based on `origin/main` at
`4847cab73879123e499e2f14bb09c650edb910b6`, the last documented DEV release.
Unreleased changes from `feature/new-design` are excluded.

Local checks and deployment status are recorded below as they complete. Local
fixtures do not prove authenticated DEV learning, provider or quota acceptance.
No real AI generation, practice scoring or subscription purchase was performed
against a shared environment during local visual verification.

Source published at Web `56434dafa596425f336e74a59e815b89017e0ad0` in
[draft PR #14](https://github.com/rbaseapp/gotIt-front/pull/14). The isolated Web
worktree is clean. The user's original `feature/landing-page` checkout and its
untracked onboarding design files were preserved.

The owner subsequently requested commit and push to `main`. A normal
fast-forward push advanced remote Web `main` from `4847cab` to `56434da`; the
remote ref was verified with `git ls-remote`. It includes only `3fd3105`
(dashboard implementation) and `56434da` (article-link contrast correction).
This confirms source publication, not Render deployment.

Locally verified:

- `npm.cmd run check`: typecheck, ESLint, 252 Vitest cases, production build,
  and 20 gateway/source-map security cases passed.
- Final targeted dashboard/i18n suite: 14 passed, followed by build and lint. The CSS-only article-link contrast follow-up at `56434da` also passed the production build.
- `npm.cmd audit --omit=dev --audit-level=high`: zero vulnerabilities.
- Chrome local fixtures: Hebrew program and vocabulary dashboards at 1440×1000;
  inactive vocabulary state at 390×844; English LTR; 900×600 with the actual
  large-text preference (scale 1.2). No horizontal document overflow observed.
  Mobile navigation opens as a dialog and focuses its close button.
- Screenshots: [program](evidence/2026-10-11-dashboard/program-desktop.jpg),
  [words](evidence/2026-10-11-dashboard/words-desktop.jpg),
  [inactive mobile](evidence/2026-10-11-dashboard/words-inactive-mobile.jpg).

Full browser regression CI completed in
[Frontend checks #268](https://github.com/rbaseapp/gotIt-front/actions/runs/38088970107).
Typecheck, lint and all unit tests passed. Browser results were **465 passed,
2 failed**: drag/drop at 320x568 (`drag-drop.spec.ts:141`) and learning-map overflow
at 320px (`learning-map.spec.ts:445`, 345px document width). Both failures and their
assertion values match the exact base SHA `4847cab` in
[Frontend checks #262](https://github.com/rbaseapp/gotIt-front/actions/runs/37691225887/job/113031610849).
No browser tests were suppressed. CI skipped build, gateway and audit after the
browser failure; their successful local results are recorded separately above.

## DEV deployment — 2026-10-11

The owner corrected the browser profile to `ori@rbaseapp.com`; Render was already
signed in there. The earlier GitHub authorization/create-account flow belonged to
the other browser profile and was not a missing DEV service account.

Verified service `gotIt--dev-front`, environment `dev`, ID
`srv-dar6dng473hc73a0ns1g`, public URL `https://gotit-dev.rbaseapp.com`. Before
deployment its live source was `4847cab`. Manually deployed the exact reviewed
Web SHA `56434dafa596425f336e74a59e815b89017e0ad0` without changing the service's
tracked branch (`feat/lesson-conversation-v3-dev`) or disabled Auto-Deploy setting.
No production service was deployed or configured during this task.

[Render deployment](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db5jk8navr4c73ddos80)
reported **Deploy succeeded | Live**, duration 50.9 seconds, started
2026-10-11 10:26:26 Asia/Jerusalem and logged live at 10:27:17.
[Deployment screenshot](evidence/2026-10-11-dashboard/render-live.jpg).

Post-deployment acceptance:

- Public Web `/ready` returned HTTP 200 with `status: ok`.
- The existing authenticated DEV account rendered the new horizontal navigation,
  original mascot, real prepared English path (unit 1 of 60, 0%) and next-unit
  link. Loaded dashboard stylesheet: `DevDashboardPage-DkPk7kp1.css`.
- Switching to Arabic rendered the existing personal course (lesson 1 of 36,
  3%) and its actual course/teacher destination. At CSS 390x844 the document
  stayed within the viewport and the mobile dialog focused its close button.
- CSS 1440x1000 also had no document-level horizontal overflow. Original English
  language choice and browser viewport were restored after the checks.
- Both available languages in this account already have a selected program.
  The words-only/inactive states therefore retain their separate local fixture
  evidence; no program selection, learning data or course was removed to force
  that state. No real scoring, article generation/publication or teacher session
  was triggered during this deployed smoke check.
