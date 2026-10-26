# 49 — Curriculum studio and monthly editing verification

2026-10-26. **Admin/Core/Backend deployed to DEV; learner Web changes remain local.** Extends the
[curriculum workspace](47_ADMIN_CURRICULUM_WORKSPACE.md),
[program editor](45_ADMIN_PROGRAM_EDITOR.md) and
[adaptive lesson contract](48_ADAPTIVE_PRIVATE_LESSONS_PROPOSAL.md).

## Product flow and acceptance

Actor: an authorized application administrator. Processes P12/P13 and admin
curriculum authoring; screens: the existing prepared-program, unit and template
editors, plus the learner unit map. Core owns staff authentication; GotIt Backend
owns content, lesson execution, reading acknowledgements and published history.
Admin remains a client and gateway. No Chrome or billing contract change.

- **FR-STUDIO-01:** edit the objective, excluded topics, opening, precise questions,
  order within the activity bank, core/support/extension routes, required words,
  expected duration, private answer criteria and closing of a lesson.
- **FR-STUDIO-02:** `authored_only` with an explicit teaching plan executes that
  approved bank directly. Structural sufficiency is checked. `within_objective`
  preserves the approved opening, closing and core activities; the shared planner
  prepares support/extension. Existing material without a teaching plan retains
  its previous planning behavior. Exact plans do not receive a new semantic AI
  review on every opening; the editor offers a separate semantic review.
- **FR-STUDIO-03:** practice questions can reference `sourceActivityId`. Adaptive
  homework uses authored questions only when their referenced activity has an
  actual non-skipped outcome. At least three eligible questions are required;
  otherwise homework is generated from actual saved lesson evidence. An approved
  plan alone is not evidence that every question was taught.
- **FR-STUDIO-04:** AI proposals have before/after field selection, staleness
  detection and undo. Explicit duration proposals update station settings or the
  selected course lesson's optional `durationMinutes`, together with its material.
  Other lessons retain their existing duration. Batch proposals support up to six selected lessons per run;
  prepared catalogs can load up to five selected units. Batch catalog application
  saves drafts individually and reports completed units; it is not an atomic
  cross-unit publication. Templates apply to the current unsaved plan.
- **FR-STUDIO-05:** JSON lesson export/import is versioned `gotit-lesson-v1`.
  Import validates against the owner schema before offering changes. Unit drafts
  and immutable published snapshots can be loaded back into the form. Loading is
  not publication; current learner-entry conflict timestamps are retained.
- **FR-STUDIO-06:** text rehearsal uses the actual adaptive planner, answer
  assessment and director with an ephemeral store. A single-question practice
  trial uses `CourseService.homeworkAction` with an ephemeral document store.
  Neither creates learner sessions, attempts, XP or minute-wallet charges. AI
  calls use existing provider configuration and quotas. Rehearsal does not test
  microphones, Realtime audio, actual learner history or entitlement-shortened
  durations. Reading text has its own preview.
- **FR-STUDIO-07:** unit `readingSteps` are independent articles, positioned after
  a named words/meeting/homework step, with title, passage, estimated minutes and
  reflection questions. They are displayed in the learner map, ordered by their
  placement. Their completion is an explicit reading acknowledgement, not a
  scored comprehension result, XP award or mastery. Navigation completion includes
  these acknowledgements; existing teacher/practice next-action semantics remain
  compatible. Reflection questions are not graded exercises.
- **FR-ADMIN-EDIT-30D:** one authenticator verification trusts the browser for
  30 days, surviving reloads, tab closure and a subsequent login to the same
  account. Explicit logout or manual lock clears that browser's verification.
  Core still verifies application, account, staff access and credential revision
  for every write. Staff changes that increment the MFA revision invalidate old
  verification. Ordinary login and refresh rules remain unchanged.

## Contracts and authority

`LessonMaterial` adds optional `objective`, `prohibitedTopics`, `teachingPlan`.
Course lesson definitions/context add optional `durationMinutes` (2–20); absent
values retain the course preference. Provider-generated course plans keep their
previous strict schema; the editable duration field is applied by authoring.
The teaching plan is the existing `adaptive-v1` bank schema, now shared from
`courses/teaching-plan.schema.ts`. Tasks add optional `sourceActivityId`.
Unit validation rejects references to missing activities and scripted required
words outside that station's preparation prefix. The learner's actual introduced
flags are preserved. Authored scope selection does not fabricate prior knowledge.
Public prepared-unit responses omit `material` and `materials`, keeping private
criteria and expected answers on the server.

| Owner route under `/api/v1` | Behavior |
| --- | --- |
| POST `/admin/authoring` | strict `action`, context, material and operation/reason envelope; suggest/review/validate/start/act/practice |
| GET `/admin/units/:id/history` | scoped metadata for the latest 30 snapshots; optional numeric `version` returns one content snapshot |
| POST `/admin/units/:id/drafts` | validated draft snapshot; stable operation receipt; no activation or learner semantic edit |
| PATCH `/admin/catalog-units/:id` / `/admin/learner-units/:id` | existing publication path, now also records immutable history and the initial baseline |
| POST `/private-lessons/units/:id/readings/:readingId` | accepts current `contentHash`; idempotently acknowledges that version; stale content returns 409 |

Gateway destinations are fixed. Authoring requires `content.write` and verified
editing at both gateway and owner. Provider jobs reuse scoped generation claims
and completed receipts; an ambiguous retry preserves UUID and body. Changed
payloads conflict. Explicit retries of failed operations require a new operation.
Provider work runs outside database transactions. Audit events contain action and
operation metadata, never provider keys. Content review is advisory, not a claim
of empirically validated learning quality.

Core issues purpose `admin-browser-write`, valid for 2,592,000 seconds and scoped
to application, account and current MFA revision. Unlike the legacy five-minute
`admin-write` proof, the browser proof is not tied to one login session. Legacy
proofs remain session-bound. Admin gateway holds the proof in a host-only,
HttpOnly, SameSite=Strict cookie scoped to `/admin-api`, Secure on HTTPS. It never
returns the proof to new browser code. Cookies supplement the independently
required bearer login; origin checks still protect all mutations. No proof is
stored in localStorage/sessionStorage or managed by a 30-day JavaScript timer.

## Data, rollout and rollback

Forward migration: Backend `1792970000000_curriculum-studio.js`.

- `admin_unit_history`: scoped immutable draft/published snapshots, actor, reason,
  base revision and creation time. History lists return metadata; content is loaded
  separately to keep gateway responses bounded. Existing in-flight lessons and
  already assigned homework retain their original snapshots.
- `unit_reading_progress`: application/user/pack/reading/content-hash key. Hash
  changes preserve historical acknowledgements while the revised article becomes
  unread. These rows do not enter vocabulary evidence or mastery projections.

Before deployment, apply the migration through the dedicated migrator, then grant
the runtime role SELECT/INSERT on the new tables and USAGE/SELECT on the history
identity sequence. Run normal preflight. Deploy compatible Core and Backend before
Admin/Web. No new provider key or Core migration is required. The initial implementation did not migrate a shared database. The subsequent
authorized DEV migration is recorded below; production was not changed. Down refuses to remove populated history
or reading acknowledgements; prefer retaining the schema on code rollback.

## Verification evidence and limits

- Core typecheck, 33 fast tests and build passed, including the 30-day lifetime,
  a new login session, wrong account/application, credential revocation, forged
  token and expiration.
- Admin typecheck, 56 tests and build passed; gateway regressions
  cover HttpOnly cookie restoration, manual lock/logout, CSRF and fixed routing.
- Backend studio unit regressions cover exact authored execution, core order,
  homework links, performed-only homework and reading fingerprints. PostgreSQL
  integration uses a disposable Docker PostgreSQL 17 instance: seven checks passed
  for authoring, scope, drafts/history, reading versions and generation replay.
- Web check passed: typecheck, lint, 281 existing tests, build and 21 gateway checks.
  Two additional reading component checks passed separately.
- Desktop 1440×1000 and phone 390×844 Admin screenshots were inspected using a
  loopback-only synthetic fixture. Proposal → selective apply → text rehearsal →
  answer progression and draft-only saving were exercised. Phone document width
  equaled viewport width. This is UI evidence, not a live AI-provider result.
- The full Backend run initially passed 277/283. One source-derived prompt-reference
  mismatch was resolved by regenerating the reference during build. Five known
  station availability/prerequisite failures predate this work (recorded in the
  adaptive contract); their product behavior was not changed to satisfy stale tests.
  Final full rerun: 279/284 passed, with only those five pre-existing failures.
  The additional duration regression verifies that a seven-minute authored course
  lesson reaches execution without changing its sibling. The final Web course and
  reading subset passed 23 tests; all updated applications built successfully.
- No live provider, microphone/device, hosted environment or production acceptance
  was performed, and no empirical retention improvement is claimed.

Existing uncommitted work in Backend, Admin, Web and the specification was retained.

UI evidence: [desktop](evidence/2026-10-26-curriculum-studio/curriculum-studio-desktop.png),
[phone](evidence/2026-10-26-curriculum-studio/curriculum-studio-mobile.png).

## Authorized Admin DEV rollout — 2026-10-26

The owner requested deployment in Admin. Existing Render configuration confirms
`gotit-admin-dev` points to DEV Core and DEV Backend. Each release branches from
the actual live source, retaining the newer profile/reminder, introduction,
lesson-completion, legacy-session and planner-repair fixes. Original dirty working
trees were preserved; no main branch or production service was changed.

| Service | Source | Render deploy | Result |
| --- | --- | --- | --- |
| Core | `1e5a70e` | [dep-dbfjnm29lscs73addsdg](https://dashboard.render.com/web/srv-dar6gp942hec73d6b8bg/deploys/dep-dbfjnm29lscs73addsdg) | Live |
| Backend | `26d700d` | [dep-dbfjoq2jnfac73cl1lc0](https://dashboard.render.com/web/srv-dar6ei7f3r2c73balbp0/deploys/dep-dbfjoq2jnfac73cl1lc0) | Live |
| Admin | `3e30ebe` | [dep-dbfjol1srm7s73f86neg](https://dashboard.render.com/web/srv-dbael83bc2fs73b3u7f0/deploys/dep-dbfjol1srm7s73f86neg) | Live |

Release gates passed: Core typecheck/build and 36 tests; Admin check and 56 tests;
Backend build, 336 fast tests, seven disposable PostgreSQL checks and Docker build.
The API catalog assertion was updated for the four added routes. The release
planner keeps its existing bounded repair/review loop while preserving authored
core questions, and homework receives actual activity evidence.

A fresh DEV backup (24,840,508 bytes, archive inventory verified) preceded dedicated
migrator execution of `1792970000000_curriculum-studio`. Runtime grants are limited
to SELECT/INSERT on the two new product tables and USAGE/SELECT on the history
sequence. Runtime preflight and explicit new-object permission checks passed.
No Core migration, new provider key, permission grant or content publication was
performed. Rollback uses the previous source commits in the evidence file, retaining
the additive schema and history.

All three services became Live; all three `/ready` endpoints returned 200. The
hosted Admin JavaScript matches the locally checked build byte for byte. Anonymous
authoring/history requests return 401. The live login screen loaded. Authenticated
hosted editing, first MFA unlock, remembered-cookie behavior and real AI generation
were not accepted end to end in this rollout; local/integration evidence does not
replace those checks. Learner Web/reading-card code remains local, outside this
Admin deployment. No learner content was changed by deployment.

Open [Admin DEV](https://gotit-admin-dev.onrender.com), then Programs → Prepared
catalog → program → unit to edit words, meeting plans, practice and readings.
The first editing unlock still requires the existing authenticator code; the new
proof lasts 30 days unless explicitly locked, logged out, revoked or expired.

Exact deployment, backup checksum, database permission and smoke evidence:
[release.json](evidence/2026-10-26-curriculum-studio/release.json).

Post-Live Render error-log queries since 11:43 UTC returned zero entries for all
three services. The full Backend formatting gate reports 292 files, including
unchanged DEV baseline files; broad formatting cleanup was not included.
