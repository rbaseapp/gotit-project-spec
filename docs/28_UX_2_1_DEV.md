# 28 — GotIt UX 2.1 DEV implementation and release gate

## Source and status

- Source repository: `gotIt-front`, current release commit `0e88da53f679a142bf040a51b4c428b6652e0a72` (redesign implementation `a535a880c3ee8746ebb49d65ce714ed0fcfd8a70`).
- Branch: `feat/ux-2-1-dev`; DEV-only owner instruction overrides app-main/production delivery.
- Status: implemented and locally verified; **not deployed**. Production source/services/data were not changed by this task.
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
Tests use API and Realtime event fixtures. No real provider, microphone, billing or DEV product mutation was tested.
Build retains the existing large-main-chunk and Zod annotation warnings. Physical devices, screen readers and production acceptance were not run.

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

**Frontend release remains pending.** The owner saved the corrected DEV runtime
connection and Backend is observed Live. Core readiness, fresh running targets
and authenticated DEV integration still require verification; workstation network
failures currently block those checks. Do not perform product mutations until
running isolation is verified. See the latest dated checkpoint above. No production
service/environment/database was changed by this task.

Read-only inspection also confirmed that Core DEV uses `gotit_dev` and that DEV Web's
Core/Backend proxy targets and public origin all point to their DEV services. Core's
existing connection uses the DEV administrator role; no Core credential or database
privilege was changed by this task. Backend's corrected connection is saved and
its release is Live; Core/network and fresh integration verification remain pending.

After the owner completes the credential handoff, verify DEV Backend/Core runtime
database targets and readiness, configure only DEV Web to this release branch,
check `CORE_API_PROXY_TARGET`, `GOTIT_API_PROXY_TARGET` and `PUBLIC_APP_ORIGIN`, deploy
the exact commit and smoke authenticated learning against isolated DEV data.
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
