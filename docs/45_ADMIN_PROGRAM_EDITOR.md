# Admin programs, lesson content and measured statistics

Date: 2026-10-16. Status: implemented and locally/integration verified in isolated release worktrees. Production migration, Backend and Admin deployment are verified below; learner Web release verification is recorded separately. Pre-existing overlapping work is preserved.

## Requirements, process and screens

FR-ADMIN-PROGRAM-CONTENT: staff can create/revise/publish a reusable course,
assign it, edit user-created or assigned personal courses, and edit words and
teaching content in prepared units for all application learners or one learner.
P-ADMIN-CURRICULUM: select scope → edit → preview → save with reason → explicitly
activate personal/template drafts → inspect measured learning results.

SCR-ADMIN-PROGRAMS adds shared-unit, learner-unit and lesson-statistics tabs to
Learning programs. Existing template/assignment forms gain expandable lesson
material and unit/lesson prompt selection. Existing catalog detail links to the
unit editor. A personal edit to previously learned course units requires the
explicit `reviseCompleted` option. Previous versions/evidence remain retained;
changed unit content cannot inherit old demonstrated-progress credit.

All writes retain existing Core permission/MFA enforcement, application scope,
operation receipts, audit reasons and revision conflicts. Form states include
locked/forbidden, loading, empty statistics, retryable read errors, validation,
save feedback and stale conflicts. Browser fixture verified saving a passage,
opening the station prompt, practice-form expansion, zero console errors and
320px layout without horizontal overflow.

## Authoritative content and compatibility

Optional course lesson `material` holds exact words, reading passage, teacher
activities, lesson-specific Realtime guidance and nullable prepared practice.
Practice supports 3–18 validated tasks with choices, ordering, listening,
expected/accepted answers, source quote, hint and explanation. Empty material
is normalized away in admin program saves so opening a form does not revise a
completed unit's meaning.

Prepared-unit overrides retain original catalog entry IDs and membership.
Global overrides are application-scoped, and learner overrides take precedence.
Global word corrections affect new installs; already installed items retain
their owned meanings. Personal word corrections invoke the existing library
semantic edit within the audited transaction, increment the learning revision,
reset current skill projections and preserve attempts. Edited words therefore
invalidate stale practice via the existing revision checks. Expected item update
timestamps prevent overwriting concurrent library corrections.

Lesson creation consumes the material snapshot from the active personal course
or selected teacher station. Authored reading/words/practice replace the need for
automatic teaching-brief generation. The same Realtime assembler handles preview
and live creation. Stored private solutions are omitted from learner course DTOs,
unit detail DTOs, public lesson context and Realtime instruction/turn templates.
After a qualifying actual lesson, its authored practice becomes the homework
snapshot with independent progress state; retries retain the original assignment.

Published course templates are returned as an additive `templates` array on
`GET /courses`. The current main/DEV chooser shows matching language-pair templates. The isolated Production backport shows shared templates with their language pairs on the existing `/courses` screen. `POST /courses/templates/:id/use` accepts `{eventId}` and creates
an active personal copy, with scoped replay/conflict protection. Existing course,
lesson and Chrome consumers retain their existing response fields.

Interaction: [program-content sequence](../uml/seq_admin_program_content.puml).

## API and persistence

Admin reads, under `/api/v1/admin`:

- `GET /catalog-units`, `GET /catalog-units/:id`: shared unit content.
- `GET /learner-units`, `GET /learner-units/:id`: installed user units, with IDs
  `<applicationUserId>_<packId>`.
- `GET /lessons`, `GET /lessons/:id`: paginated measured sessions and detailed reports.
  Search supports user/course/pack/template IDs, including compound owned-unit IDs.
  List `summary` aggregates the selected population independently of pagination.
- `POST /programs/preview`: preferences, plan, unitKey and lessonIndex.
- `POST /units/preview`: unitId, edited content and teacher station.
  Both preview routes authorize reads and make no provider calls or database writes.

`PATCH /catalog-units/:id` and `PATCH /learner-units/:id` accept operationId,
reason, expectedRevision and validated content. Existing assignment PATCH gains
optional `reviseCompleted`; activation honors only the marker stored on that draft.
Program/unit authoring requests are bounded to 2 MiB; their admin reads/previews
are bounded to 4 MiB, while other gateway limits are preserved.
Route catalog, gateway allowlists, response summary adapter and UI access mapping
cover the new resources. Public previews disclose configuration only to authorized staff.

Migration `1792190000000_admin-program-content.js` adds `admin_unit_content`
(application/pack/nullable-user unique scope, revision, content, updated_at) and
nullable `private_lesson_sessions.realtime_contract`. The latter stores the actual
credential-free session configuration and turn directives for newly created
sessions. No audio, provider key or temporary secret is retained. Historical sessions
are explicitly missing a snapshot, never reconstructed as if it had been recorded.

Statistics include sessions/completions/learners, actual duration, report-derived
average independence and homework tasks/completions/attempts. Per-session detail
includes the original assessment/report and practice progress. Measurements and
historical attempts are read-only. Unmeasured cost/audio-token usage and delayed
retention remain unknown. See [security boundaries](09_SECURITY_PRIVACY.md).

## Verification and release

- Backend TypeScript, production build and 239/239 fast tests passed; focused authored-practice tests cover exact
  assignment, replay, private-answer omission and strict bounds.
- Disposable PostgreSQL: `admin-program-content.integration.test.ts` covers default
  versus personal scope, permissions, receipt replay, stale conflicts, semantic
  revision/reset, published-template discovery/import, completed-content revision,
  preserved historical evidence, previews and lesson-statistics isolation.
- Combined existing admin-operations and new program-content integration: 27/27 passed.
- Exact new migration down/up rehearsed empty on disposable PostgreSQL. Production forward migration applied after verified product-schema/data backup.
- Admin `npm run check`: TypeScript, 44/44 gateway tests and production build passed.
- Web `npm run check`: TypeScript, lint, 255/255 tests, production build and 20/20 gateway tests passed.
- Isolated Chrome fixture screenshots: `../gotit-admin/output/playwright/program-content-320.png`
  and `program-content-preview.png`; fixture data is explicitly synthetic.

The dedicated product migrator applied the migration; existing default privileges grant runtime DML, and runtime preflight passed before application deployment.
Keep additive schema on code rollback; migration down refuses to erase authored
content/snapshots. Actual teacher behavior, microphone and authenticated deployed
acceptance remain unverified. The capability list governs availability on older
servers; no successful writes or statistics are simulated in production.

User guide: [Admin program editor](../../gotit-admin/docs/PROGRAM_EDITOR.md).


## Production release evidence - 2026-10-16

- Backup: product_gotit schema and data, 25,585,481 bytes; custom archive inventory verified. SHA-256 `7a4993883cf60c49c1da05bf7adf3ebdaeb6c038ceb68e4a64f34103020e5e7a`. Kept only in Backend ignored `.local-backups`.
- Migration `1792190000000_admin-program-content` applied at 09:53:41 UTC. Product table count 59 -> 60; runtime preflight schema/privileges/product-only role passed; normalization mismatches and duplicate attempt-sequence groups remain zero. The migrator has no Core schema access; the new nullable user FK targets scoped product user_profiles.
- Backend [c3d90d8](https://github.com/rbaseapp/gotIt-backend/commit/c3d90d89e3fee1b08fcbe9081c7fad6f496e4bfd), [Render Live deployment](https://dashboard.render.com/web/srv-dak3h50jo6nc73bc43h0/deploys/dep-db8v8m49v7es73e0hi80). `/health` and `/ready` returned 200; database dependency is healthy.
- Admin [ff6e654](https://github.com/rbaseapp/gotit-admin/commit/ff6e654c9a94f329a9c86380366d9ca3ef331550), [Render Live deployment](https://dashboard.render.com/web/srv-db8jhsdfii8s739jaji0/deploys/dep-db8v9cdg1s2s738pndcg). `/ready` returned 200.
- Main/DEV learner patch [bcd2cd0](https://github.com/rbaseapp/gotIt-front/commit/bcd2cd024d83b39b0149a2a6e2706508cc961e9f) is pushed and locally verified (255 Vitest + 20 gateway cases), not deployed to Production: that would also release unrelated pending features. A separate backport onto observed live baseline ffcebc8 retains the current Production application and gateway.
- Production Web backport [ea487b8](https://github.com/rbaseapp/gotIt-front/commit/ea487b81668338f1acedaa910ec0605a9f107ad0) is committed and pushed on `release/program-editor-prod-20261016`. `npm run check` passed TypeScript, lint, 188 Vitest tests, build and 16 gateway cases. Added UI regressions verify using published programs when AI generation is unavailable and reusing the operation UUID after an ambiguous failure. Deployment is pending: the connected Chrome session disappeared before starting this service's deployment. Render service `srv-dal8smbm8hqs73fabfng` still reported ffcebc8 Live at the last observation. Resume with Manual Deploy -> Deploy a specific commit -> ea487b81668338f1acedaa910ec0605a9f107ad0; verify Live, `/health`, `/ready` and course bundle.
- Authenticated live Admin read acceptance: all six program tabs appeared, and the shared-unit API returned 90 actual catalog units. No content was changed for this check. Live save/activation, learner template import and a paid Realtime call were not exercised in Production.
- `seq_admin_program_content.puml` passed PlantUML 1.2026.8 `-checkonly`.
- Code rollback retains additive schema and original content/evidence; no production down or restore was run. No provider/microphone acceptance call was made.
