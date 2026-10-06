# 28 — GotIt UX 2.1 DEV implementation and release gate

## 2026-10-06 - Game-entry regression follow-up

Source `gotIt-front@9cff6a0f1de1c22da04e6d5ed285171d258457fb` follows
the Figma correction `e1948281adabe34d2ff6c4e4dc4f949e90c33436`.
Status: **locally verified; DEV deployment pending** on `feat/ux-2-1-dev`.

The CI failure below exposed a real initial RTL overflow: a fullscreen demo
game translated 14px horizontally during entry. A fast local browser could
check the loading view before the game mounted, incorrectly passing the old
test. Responsive cases now wait for the mounted game and freeze its entrance
animation at 0, 140 and 280ms before measuring the document. The 320px smart
case deterministically failed at 334px before the fix.

Only the fullscreen game frame changes to the existing opacity entrance;
normal pages retain the supplied 0.28s horizontal motion and letter-placement
motion is unchanged. FR-UX-007 includes containment throughout animation,
not only after it. Existing game actions, provider, scoring and persistence
contracts are unchanged.

Local verification: **84/84** game-route viewport cases (six routes across
14 widths, 320–1920px) passed. `npm.cmd run check` passed typecheck, lint,
**207 unit tests**, build and **20 gateway/security tests**. Changed-file
Prettier and diff checks passed; dependency audit found zero vulnerabilities.
The full 393-case local browser run is still running. No production change.
Exact DEV Live source, readiness, delivered CSS and final CI results remain
release gates and will be recorded here.

## 2026-10-06 - Figma fidelity correction (local checkpoint)

Source: `gotIt-front@e1948281adabe34d2ff6c4e4dc4f949e90c33436`, branch `feat/ux-2-1-dev`.
Status: **locally verified; DEV deployed and authenticated UI smoke verified**. The earlier deployed UX
was rejected by the owner as visually different from the approved design.
Its functional smoke was not design acceptance. This checkpoint corrects the
four reported screen families and their shared shell, rather than certifying
all 247 design states.

| Screen | Approved Figma nodes | Correction |
| --- | --- | --- |
| Program home / vocabulary-only home | `8:2`, `24:7265`, mobile `15:4274` | Correct illustration placement, large program hero, primary word illustration, two secondary cards, title/action hierarchy and compact mobile type. Actual resumable activity retains priority over a selected plan. |
| Programs | `15:647`, mobile `15:5502` | Language-localized groups, larger centered cards, corner selection badge, next actual unit, secondary-language compact row and responsive actions. Only available catalog/plans are shown. |
| Lesson preparation | `15:2010` | Sidebar-free focus header; mint lesson/start/warmup card before white preferences; current teacher opens a picker, advanced mode/topic settings remain in the adjustment dialog. |
| Active lesson | `15:2100`, master `43:6258` | Full viewport, unobscured 204px teacher beside a white current-message bubble; real conversation history and targets; centered continuous-microphone toggle, normal/slow transcript replay, existing translation/end actions. Sticky mobile responses remain reachable on narrow/short screens. |

The three existing local illustration PNGs were downloaded from the returned
Figma asset URLs and compared byte-for-byte: all match. `src/figma-review.css`
owns the corrected geometry while older feature styles remain in the repository.
Course maps retain their sidebar, matching the inspected personal-map frame
`13:348`. New copy is translated in all eight existing UI locales. Entry uses
0.28s horizontal motion; letter placement uses the supplied 0.6 -> 1.12 -> 1
scale. Existing audio-driven face animation, effects-off and reduced-motion
controls remain; the decorative audio badge no longer covers the teacher.

**Design/contract drift remains explicit:** the current lesson Figma frame still
contains a decorative three-stage bar and a text-teacher action, although the
approved 2.1 handoff excludes unsupported guided-stage claims and the existing
provider contract requires microphone access. Those are not fabricated in Web.
Independent written word practice remains available from preparation. Actual
names, counts, plans, transcript length and lesson readiness differ from example
content in Figma. No API, database, provider, billing or learning-rule change.

### Local evidence

- Failure-first browser cases reproduced the missing home illustration and the
  old sidebar-restricted lesson width at source `0e88da5`.
- `npm run check`: typecheck/lint, **207/207 Vitest**, build and **20/20 gateway/security** passed. Final typecheck/lint/build also passed after the layout refinements.
- The initial full **393-case** browser run passed 392; the remaining case expected
  English group names in Hebrew UI. Its locator now expects localized names and
  the multilingual grouping case passed. Subsequent targeted home/program cases
  passed (3/3); final HE/EN lesson viewport cases passed (8/8), including 320px,
  390px, 844px landscape and 1440px desktop. Mobile controls were corrected after
  a regression exposed their loss of visibility on short screens.
- Browser fixtures intercept APIs and provider events; they do not prove a real
  microphone/teacher call or billing. Existing chunk-size/Zod warnings remain.

Rendered local fixtures (synthetic account/provider events):

- [Program home desktop](evidence/2026-10-06-figma-fidelity/figma-program-home-1487.png)
- [Program home mobile](evidence/2026-10-06-figma-fidelity/figma-program-home-390.png)
- [Vocabulary home desktop](evidence/2026-10-06-figma-fidelity/figma-words-desktop.png)
- [Preparation desktop](evidence/2026-10-06-figma-fidelity/lesson-prep-he-1440.png)
- [Preparation mobile](evidence/2026-10-06-figma-fidelity/lesson-prep-he-390.png)
- [Active lesson desktop](evidence/2026-10-06-figma-fidelity/lesson-resume-he-1440.png)
- [Active lesson mobile](evidence/2026-10-06-figma-fidelity/lesson-resume-he-390.png)

### DEV delivery and authenticated UI smoke

Render auto-deployed exact source `e1948281adabe34d2ff6c4e4dc4f949e90c33436`
to DEV Web `srv-dar6dng473hc73a0ns1g`, deployment
`dep-db2bc0vf3r2c73feepb0`: **Live**, duration **53.5 seconds**.
The feature branch has the same SHA; app main remains
`da913168f85baddc844978412058cf888117e85c`. No app-main merge, production
deployment, Core/Backend change or schema migration was performed.

All three DEV readiness endpoints returned HTTP 200 on 2026-10-06:
Web `ok`, Backend `ready` with database `ok`, Core `ready`.
Public HTML and its delivered assets returned HTTP 200:

| Asset | SHA-256 |
| --- | --- |
| `/assets/index-yRAmCjT7.js` | `5b02612baaa8310bfa318bb038a6491cf4b8c52ff315f5a054f39e6cf3958899` |
| `/assets/index-B87vZkWE.css` | `3ecca927b98e5693a439666943ab901da418f3032a5c78cce6f904b729c0eb82` |

The delivered CSS contains the new lesson-dialogue rules and its name matches
the local source build. The delivered JS filename matches the build output in this exact source's
Render deploy log. It differs from the local default build's filename; no
byte-equivalence claim is made for the JS. Render reports service live at
11:50:00 Asia/Jerusalem. The exact Live source and authenticated rendered UI
are the release authority.

The signed-in owner's DEV tab was reloaded. Actual home data remained 80 words,
71 due, 11/20 unique words today and its existing resumable practice session.
That session correctly takes priority over the selected English course; it was
not consumed, stopped or replaced to stage a different dashboard variant.
The word illustration loaded successfully. The desktop account menu opens
from the sidebar and Escape closes it. Programs displays the selected English
zero-start course and the owner's existing personal course; the four-way new
program chooser opens and closes without creating data.

Preparation displays the focus header, lesson/start/warmup before editable
preferences, the real recommendation and an empty real lesson-history state.
The current-teacher picker opened; Mike selection updated the displayed teacher,
then Rachel was restored. The advanced adjustment dialog exposes beginner mode,
support language, duration, topic, grammar, focus skills and personal goal;
it was canceled without starting a conversation. Both English and Hebrew
support options were present. No live microphone/provider session, article
generation or billing action was initiated.

Responsive DOM smoke checked programs at effective CSS width 390px, dashboard
at 445px and preparation at 367px: document scroll width equaled viewport width.
The four root learning destinations remained available; focus preparation
omitted the sidebar/root tabs. Browser zoom changed the effective width produced
by viewport overrides, so these are measured widths, not claims that every live
screen was checked at exactly 390px. The override was reset. CDP screenshots
under the narrow override had timeout/tiled-capture artifacts; those captures
are excluded. The clean 390px fixture screenshots above remain the mobile
visual evidence. Physical devices and screen readers were not tested.

Authenticated DEV screenshots, with actual account data:

- [Dashboard desktop](evidence/2026-10-06-figma-fidelity/dev-dashboard-desktop.jpg)
- [Preparation desktop](evidence/2026-10-06-figma-fidelity/dev-preparation-desktop.jpg)
- [Preparation review crop](evidence/2026-10-06-figma-fidelity/dev-preparation-review.jpg)

CI run `37438662578`, job `112186683559` completed with **333 browser passes
and 60 failures**. All failures are initial document overflow on demo game routes
at widths 320?820px (e.g. 332px in a 320px viewport); retries reproduce the issue.
Typecheck, lint and 207 unit tests passed; CI build/gateway/audit were skipped
after the failed browser gate, while their local results remain as stated above.
The new horizontal entry animation translates a full-viewport RTL game frame
during its first 0.28 seconds. A deterministic animation-start regression and
a follow-up fix are required before delivery. The real-account UI smoke remains
valid for the reported home/program/preparation families, but it does not close
this release gate. Active lesson appearance is verified with deterministic
Realtime fixtures, rather than represented as a real provider acceptance.

## Source and status

- Source repository: `gotIt-front`, current release commit `e1948281adabe34d2ff6c4e4dc4f949e90c33436` (prior rollout `0e88da53f679a142bf040a51b4c428b6652e0a72`, initial redesign `a535a880c3ee8746ebb49d65ce714ed0fcfd8a70`).
- Branch: `feat/ux-2-1-dev`; DEV-only owner instruction overrides app-main/production delivery.
- Status: **DEV deployed and authenticated UI smoke verified** on 2026-10-06; current fidelity-correction evidence is above. The sections below retain earlier rollout history. Production source/services/data were not changed by this task.
- Report/route coverage is below. Design-only proposed capabilities are explicitly excluded from active-server claims.

## Local verification

`npm.cmd run check` passed typecheck, lint, **206 Vitest tests**, build and **17 gateway tests**.
`npm.cmd run test:responsive -- --workers=4 --reporter=json` passed **391/391** cases with no failures/skips/flaky cases.
These full-browser counts apply to redesign commit `a535a880c3ee8746ebb49d65ce714ed0fcfd8a70`.
For dependency-only release `0e88da53f679a142bf040a51b4c428b6652e0a72`, check passed
again with 206 unit tests and **20 gateway/security tests**; the audit returned
zero findings. CI run `37429705998`, job `112157439937`, completed successfully on
2026-10-06 with **206 unit / 391 browser / 20 gateway-security cases**, build,
typecheck, lint and zero dependency audit findings.
Automated tests use API and Realtime event fixtures. The live DEV practice mutation is recorded separately below; real teacher, microphone, article generation and billing acceptance were not exercised.
Build retains the existing large-main-chunk and Zod annotation warnings. Physical devices, screen readers and production acceptance were not run.

## DEV Web release and authenticated smoke (2026-10-06)

This checkpoint supersedes the historical network/login and release blockers below.
After the owner restarted the workstation, all three DEV `/ready` endpoints returned
HTTP 200: Web `ok`, Core and Backend `ready`. The owner reported successful DEV
sign-in. Its earlier `UPSTREAM_UNAVAILABLE` root cause was not established; no user
Google token was replayed or retained.

Fresh Render inspection confirmed DEV Web was still Live at `da913168f85baddc844978412058cf888117e85c`
on `main`, explaining why the owner saw the old interface. Only service
`srv-dar6dng473hc73a0ns1g` was switched to `feat/ux-2-1-dev`. This triggered deployment
`dep-db2al4m0tbcc738i0g6g`, exact source `0e88da53f679a142bf040a51b4c428b6652e0a72`.
Render reports **Deploy succeeded | Live**, duration 1m19s, started 11:00:18
Asia/Jerusalem; logs report service live at 11:01:38. The remote branch has the same SHA.
No app-main merge/push, production setting or production deployment was performed.

Before live product writes, current saved targets were inspected without recording
credentials: Backend uses DEV external host `dpg-dar6fkp7lnhs73a7mspg-a.frankfurt-postgres.render.com`,
`gotit_dev`, `gotit_runtime`, `sslmode=verify-full`; its Core origin is
`https://rbase-dev-core-platforms.onrender.com`. Core uses the same DEV database host
and `gotit_dev`, existing administrator role `gotit_dev_user`; no Core privileges
were changed. DEV Web Core/Backend proxy origins and public origin all point to
DEV. Backend/Core Live sources remain `e5f4817b8544b95da739ce4f462e95f50b99689c` /
`b2e46bd5bfc95f2da994675492f59571d6fa81b3`.

Public DEV HTML and assets returned HTTP 200 after deployment:

| Asset | SHA-256 |
| --- | --- |
| `/assets/index-G-ZLoewX.js` | `21e36a9022dd906a2b89d05cdc6a60df88628c14a636f22f12d594bde356629e` |
| `/assets/index-CmDwgK0o.css` | `df2a9e26df290ec7963e1ac6ae989f52cf109d3bdbea2b8c6b4dce556acf6afb` |

The JS asset name matches this exact source's Render build output. The authenticated
owner's DEV tab was reloaded and displayed the new navigation and dashboard with
real library/progress data. Programs and its chooser, English map/unit words,
library, independent seven-game hub, teacher preparation and activity history
loaded. The four mobile root destinations and no horizontal overflow were checked;
the dashboard/library had an effective CSS viewport width of 390px. Browser zoom
made the capability's requested width differ from effective CSS width; the actual
DOM width was inspected. The temporary viewport override was reset.

A new independent spelling/recall session was created in DEV. Two clicks on `a`
produced `aa` in the real input and two filled answer boxes. Delete returned `a`,
clear returned empty. The visible Hebrew prompt was answered with `crippling`
through the letter buttons; at nine-character capacity letter buttons disabled.
Submission returned real server feedback **correct, 100%, +10 XP**. Explicit exit
marked the test session stopped; `/history` displayed that entry. This smoke wrote
one DEV attempt/progress/XP receipt; it did not alter production or complete a course.
Existing prior sessions were retained.

Screenshots of the actual authenticated DEV release (not fixtures):

- [Desktop dashboard](evidence/2026-10-06-ux-dev/dashboard-desktop.jpg)
- [390px dashboard](evidence/2026-10-06-ux-dev/dashboard-mobile.jpg)
- [Letter-button writing](evidence/2026-10-06-ux-dev/letters-mobile.jpg)

CI run `37429705998` verifies this source with 206 unit, 391 browser and 20
gateway/security cases, typecheck/lint/build and zero audit findings. No application
code changed during this deployment turn, so those gates were not unnecessarily
repeated. This smoke is not a pixel-by-pixel certification of 247 design variants,
physical-device acceptance, a complete ten-word round, fresh Google OAuth exchange,
live teacher/microphone, AI article generation/publication or billing verification.

## Operational inspection (read-only, 2026-10-05)

Historical checkpoint; the 2026-10-06 follow-up below supersedes the Backend connection state.

| Surface | Evidence | Release consequence |
| --- | --- | --- |
| DEV Web `srv-dar6dng473hc73a0ns1g` | Source still `main`, live `da913168f85baddc844978412058cf888117e85c`; proxy targets are DEV Core/Backend, public origin `https://gotit-dev.rbaseapp.com` | Select only the DEV branch after backend isolation; no production-main push. |
| DEV Backend `srv-dar6ei7f3r2c73balbp0` | DATABASE_URL points to production host `dpg-dagov2pt0dsc73a37me0-a`, database `rbase_core_db`, role `gotit_runtime` | **Block product writes and this release deployment** until retargeted and verified. |
| DEV Core `srv-dar6gp942hec73d6b8bg` | Separate host `dpg-dar6fkp7lnhs73a7mspg-a`, database `gotit_dev`, existing role `gotit_dev_user` | Isolated DB target confirmed; credential/privilege was not changed. |
| Separate DEV database | Prior migration catch-up and unverified direct runtime login are recorded in [operations](10_OPERATIONS.md#2026-10-04---dev-database-migration-catch-up) | Retarget with an appropriate DEV runtime credential; do not infer runtime login from SET ROLE/admin inspection. |

The owner was asked to complete credential entry/submission in Render. Computer-use requires handoff before changing authentication credentials; no new DB secret was entered. Secret values and full connection strings are absent from this evidence. No Render setting or deployment was changed.

## DEV connection follow-up (2026-10-06)

Read-only inspection after the owner's configuration save confirms Backend
`CORE_API_BASE_URL` targets `https://rbase-dev-core-platforms.onrender.com` and
`DATABASE_URL` targets DEV host `dpg-dar6fkp7lnhs73a7mspg-a`, database `gotit_dev`.
The saved database role is `gotit_dev_user`, the administrator, rather than the
dedicated product runtime role. The owner's Backend deployment
`dep-db29rjgm7kps73e2lptg`, source
`e5f4817b8544b95da739ce4f462e95f50b99689c`, reports **Deploy failed** (48.4 seconds)
with startup code `GOTIT_DEDICATED_RUNTIME_ROLE_REQUIRED`.

The configured target is now DEV, but a successful running deployment using the
new target is **not verified**. Do not infer isolation of an older live process
from a saved environment value. Frontend UX source remains
`a535a880c3ee8746ebb49d65ce714ed0fcfd8a70`, not deployed by this task.

The owner reported that a runtime connection was unavailable and requested its
preparation. A verified-TLS read of the DEV database confirmed the existing
`gotit_runtime` login role, no superuser/create-role/create-database/bypass-RLS
flags, and zero active connections for that role. A fresh random password was
set for that existing DEV role through the terminal; no grants or privileges
were expanded. A direct login with the new credential confirmed database
`gotit_dev`, user `gotit_runtime`; `verifyRuntimeSchema(...,{strictRole:true})`
returned `schema: ok`, `privileges: ok`, `role: product-only`, 17 operational
tables. The new connection was saved in a user-only local temporary directory
outside Git. The temporary administrator connection file was removed after use.

Next required input is the owner's entry/submission of the prepared connection
in Backend Render Environment, followed by a successful deployment and readiness
verification. Browser credential changes require owner handoff. Changing only
the username while retaining the administrator password is invalid; use the
prepared complete connection. Do not disable the startup privilege gate. No
password or complete connection string is recorded here. The task changed no
Backend source, role privileges, Render setting or production deployment during
this follow-up; the DEV runtime password was changed as described above.

Frontend CI run `37366721586`, attempt 1, could not acquire a GitHub hosted runner.
Attempt 2 was triggered through the existing authorized GitHub UI. Install,
typecheck, lint, all 206 unit/391 browser/17 gateway cases and build passed.
The audit step failed for `source-map-js@1.2.1`, advisory
[GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).
Local `npm audit --omit=dev --audit-level=high --json` reproduced one high-severity
finding; a patched compatible transitive dependency update is pending. This
checkpoint does not claim final remote CI success.

## Dependency patch and corrected TLS handoff (2026-10-06)

Web commit `0e88da53f679a142bf040a51b4c428b6652e0a72` updates only the transitive
`source-map-js` lock entry from 1.2.1 to 1.2.2 and adds three dependency regressions
to `test:gateway`. Oversized section offsets and excessive cumulative nested
offsets failed with 1.2.1 and passed with 1.2.2; normal indexed source-map lookup
passed with both. Typecheck, lint, 206 unit tests, build and 20 gateway/security
tests passed; production dependency audit reported zero vulnerabilities.
There is no UI, API, schema, provider or learning-policy change in this patch.

The owner's next Backend deployment `dep-db2a1gmi0phs73dtjdc0` failed in 30.8
seconds with `PREFLIGHT_DATABASE_UNAVAILABLE`. The initial prepared Render URL
omitted TLS configuration; a direct connection without TLS reproduced database
code `28000`, `SSL/TLS required`. This was a preparation error in this task.
The same local connection file was corrected to the DEV external hostname with
`sslmode=verify-full`. A direct connection using the same pg connection-string
configuration as Backend (without custom SSL overrides or disabling certificate
validation) passed strict schema/privilege preflight: `schema: ok`,
`privileges: ok`, `role: product-only`, 17 operational tables. No second password
rotation or privilege change was made. Owner-controlled entry/submission of that
corrected connection and a successful running DEV deployment remain pending.

## Backend Live and Google-login diagnosis (2026-10-06)

The owner completed the corrected credential save. Render Backend deployment
`dep-db2a6ajtqb8s73cluji0`, source
`e5f4817b8544b95da739ce4f462e95f50b99689c`, is observed **Deploy succeeded | Live**,
duration 39.4 seconds, started 10:28:42 Asia/Jerusalem. Logs show the Backend
listening at 10:29:14 and service live at 10:29:22. Startup reached listening after
its strict schema/role preflight; no Backend source was changed by this task.

The owner's DEV Web Google request returned `UPSTREAM_UNAVAILABLE`, response
request ID `b62ba7b1-37c6-4c5d-8a31-ce8665528729`. Source inspection confirms
this gateway code represents failed Core readiness or a Render infrastructure
response; it is not evidence that Google rejected the token. The token was not
replayed or stored in the specification. Core runtime readiness, fresh proxy
configuration and authenticated DEV acceptance remain unverified.

Independent checks from the workstation failed before receiving HTTP responses:
Node returned `ECONNRESET`, curl reported TLS handshake failure, and a fresh Chrome
Render dashboard tab reported `ERR_CONNECTION_CLOSED`. Existing Backend deploy
UI remained readable, but the service switcher could not load. These local network
failures do not establish the cause of the owner's server-side login error. Core
DEV `/ready` response and latest error logs were requested to continue diagnosis.
Frontend UX branch selection/deployment and product mutations remain pending;
successful CI does not prove DEV-server acceptance or production release.

## Scope and source

- Source of decisions: `GotIt-Consolidated-Review-and-Development-Spec-HE-v1.1.md`
  in the owner's `gotit-ux-v2-2026-10-05` delivery, superseding 2.0.
- Editable design: [Figma 2.1](https://www.figma.com/design/kgMHTv0q4TJdwxCHYzUnSM/GotIt-UX?node-id=56-2).
- Motion reference: owner-supplied `GotIt-Animations/GotIt-Animations.html`.
- Delivery branch: `feat/ux-2-1-dev`. **Do not merge or push this release to main**:
  production follows main. This request authorizes DEV only.
- Existing Core, Backend, Chrome and database contracts are retained. No migration.

## Screen/flow coverage

| Design families                                              | Live route or component                       | Implementation                                                                                                                                                                                    |
| ------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HOME, WORDS_HOME, NO_WORDS                                   | `/dashboard`                                  | One next action, actual active session, explicitly chosen program, due/new words, optional metrics and achievements. No auto-selection of a course.                                               |
| PROGRAMS, NEW_PROGRAM                                        | `/courses`, program chooser                   | Language groups, active/completed views, explicit selection, independent words/free conversation, existing course deletion confirmation.                                                          |
| WELCOME, INTAKE, PREF_REVIEW, PLAN_APPROVAL                  | `/courses?new=1`, `/courses/:id`              | Existing intake, separate preference/plan approvals, current message with expandable prior conversation, full plan and edit/version controls.                                                     |
| PERSONAL_MAP, MAP, UNIT_WORDS                                | `/courses/:id`, `/english-learning`           | Version-specific evidence, next lesson, collapsed levels/units, real unit words, preserved known/undo/add controls. Structured English catalog remains the current catalog pilot.                 |
| ACTIVITIES, HISTORY, SESSION_DETAILS                         | `/history`                                    | Practice pagination/language filter, actual active-session resume, read-only details, lesson-report links, homework. Lesson list uses existing bounded 50-record contract.                        |
| GAME_HUB, WARMUP, FILTERS                                    | `/learn`                                      | Existing server queue, independent games, explicit word/pack selection, capability gates, return context.                                                                                         |
| WORD_STUDY, RECALL, SPELLING, LISTEN, MATCH, DRAG, PRONOUNCE | `/learn/session/:type`                        | Existing study imagery/audio and authoritative exercises/attempts. Writing uses a full answer-language alphabet with repeat/delete/clear and normal keyboard/IME. No answer-derived letter bank.  |
| SMART_FEEDBACK, PRACTICE_SUMMARY                             | live session feedback/results                 | Existing server scores/XP, animations, optional effects, reduced motion, learned-word summary and restart/return.                                                                                 |
| LIBRARY, SAVEWORD                                            | `/vocabulary`, existing capture/detail modals | Smart/manual entry, selected-word games, preserved search/filter/page/selection on return, expandable row learning metrics, all existing advanced actions.                                        |
| READING_READER, READING_SAVE_FAILED                          | `/reading`                                    | Generated text readable immediately, automatic publication of the same preview, stable publication intent on retry, quiz after publication.                                                       |
| LESSON_PREP, CHAT_SETUP, TEACHERS, PREFS                     | `/private-lesson`, `?course=…`                | Actual teacher choices, existing preferences/support-language rules, independent warmup; scoped 30-minute preparation draft restored on explicit return.                                          |
| CHAT_LESSON, LESSON, HELP, RECONNECT, LESSON_SUMMARY         | existing private lesson flow                  | Current teacher message, expandable history, transcript speech at normal/slow rate, existing translation request, mute/end/disconnect/report/save states. No invented task/stage/resume protocol. |
| ACHIEVEMENTS and loading/error states                        | `/achievements`                               | User-opened server XP/level/streak/daily goal/weekly activity; learning retention separate. No invented gift, rank, badge or bonus rules.                                                         |
| Account/settings/billing/transfer/help                       | existing routes/account menu                  | Shared tokens, touch/type improvements, account status and secondary navigation; commercial banners on account-related pages.                                                                     |

The 247 canonical design states are review variants, not 247 independent features.
This checkpoint does **not** certify every variant as an independently implemented
server capability or every legacy screen as a pixel-exact design replica.

## Important behavior and limits

- Target, translation/support and UI languages are separate. The alphabet follows
  each server study card's language pair, not `prompt.languageCode` or a guessed
  English default. Ordinary writing retains only language metadata from study.
- Languages without a defined alphabet keep native text/IME input; they do not
  receive an unrelated letter keyboard. Letter clicks and native typing submit the
  same existing `answerText`; scores/scheduling/XP remain server-owned.
- Library return URL carries bounded presentation context, never resource authority.
  Preparation drafts are session-local, validated, user/application/language/course
  scoped and expire after 30 minutes. They are not lesson sessions or evidence.
- Replay synthesizes the **same transcript text using browser TTS**. It is not an
  archived recording of the teacher's original audio. Native voice availability
  varies; unsupported replay reports unavailable. Existing support-language
  translation uses the provider contract and does not advance a fabricated task.
- A teacher without microphone is not supported by the existing contract. The UI
  labels its alternative as independent written word practice, not text AI teaching.
- Guided task/stage snapshots, billing pause, durable voice-session resume,
  readiness-based teacher stations, per-skill channel capabilities, native Android
  sharing/billing and new reward economies remain separate proposed extensions.
- Hebrew/English new UX copy is authored. Root navigation is localized for the
  other six existing UI locales; many new helper strings use English fallback.
- Motion uses entry/fade/sheet/press/letter/feedback/XP/recording cues from the supplied
  reference. Existing teacher audio-driven animation is preserved; decorative
  timing never produces learning evidence. Reduced motion and game effects-off
  suppress movement while preserving feedback/actions.

## Verification and DEV release gate

Run `npm.cmd run check` and `npm.cmd run test:responsive -- --workers=4`.
Regressions cover hidden alphabet metadata in ordinary games, multilingual letters,
IME fallback, repeating letters, grouped spaces/capacity, stable article-publication
retry, context restoration, expired/cross-owner drafts, mobile navigation/focus,
course approvals/versioning, actual provider event fixtures and touch scrolling.
Browser fixtures intercept API calls; they do not prove real provider, microphone,
database or billing acceptance. Physical-device/zoom/screen-reader acceptance remains
separate from automated viewport coverage.

**Frontend release is Live in DEV at `0e88da53f679a142bf040a51b4c428b6652e0a72`.**
Current readiness, target-isolation inspection, served-asset evidence and authenticated
practice smoke are recorded above. Earlier dated blockers are retained as history.
No production service/environment/database was changed by this task.

For the next DEV release, retain the DEV branch and verify Core/Backend database
and proxy targets before product-write acceptance. Use the existing strict role and
verified-TLS connection; never weaken its startup gates.
The Vite fallback proxies point at production: for local manual work set explicit
safe targets; the automated tests use intercepted APIs.

Rollback is a DEV-only deployment of the prior Web commit/branch. No database down
migration is required. Test evidence and final source SHA are tracked in the separate
this specification checkpoint.


## Fixture screenshots

These are actual rendered local Web screens with synthetic data, not DEV-server acceptance.

- [Writing](evidence/2026-10-05-ux-dev/letters-mobile.png)
- [Programs](evidence/2026-10-05-ux-dev/programs-mobile.png)
- [Home](evidence/2026-10-05-ux-dev/home-mobile.png)

## Traceability

FR-UX-001–006 map to UC-UX-01–04, SCR-02/03/04/09/10, SCR-PC-00A/B/01/02/03 and new SCR-UX-01/02/03. See catalogs and [SEQ-13](../uml/13-ux-context-reading.puml). No endpoint schema, provider, migration or learning/XP policy changed.
