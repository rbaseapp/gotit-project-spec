# Admin curriculum workspace

Date: 2026-10-18. Scope: Backend and Admin implementation, deployed to DEV. Production was not changed; no production content writes or paid provider calls. See DEV evidence below.

## Product and process

FR-ADMIN-CURRICULUM-WORKSPACE extends FR-ADMIN-PROGRAM-CONTENT and SCR-ADMIN-PROGRAMS. P-ADMIN-CURRICULUM now follows program card -> searchable/paged units -> selected learning step -> edit words/material/practice/settings -> preview -> audited save. Template/learner drafts retain separate activation.

The prepared catalog is the default Programs tab. Six existing resources remain available with Hebrew names and URL-preserved selection. Program cards distinguish guided English programs from ordinary topic word packs. Program detail filters actual units by title/module/track and level, with twelve units per page and direct edit links. Scoped title overrides appear in this list.

The unit workspace shows all words and the actual server-defined teacher stations. Each station exposes its word batch, private meeting and linked practice, the cumulative word requirement, duration and predecessor preparation. An authored reading passage is part of its meeting, not an invented independent article node. Arbitrary new station types and independent article scheduling are not implemented by this change.

Words have inline, labelled word/translation/example cells, search and ten-row paging. Spreadsheet paste previews updates from the beginning of the selected word list, preserving IDs, concurrency markers, order and untouched entries. Catalog membership remains fixed. Lesson-specific word lists support bounded addition/removal.

Meetings expose activities, optional exact words, Realtime guidance, reading and a read-only assembled prompt preview. Origin labels distinguish authored content, shared/runtime generation and lesson-specific guidance over automatic material. Preview is illustrative: learner context/generated brief are resolved when the actual session starts. It makes no provider calls and exposes no provider credential.

Practice either explicitly says it is generated from the actual lesson, or opens a bounded 3-18-question editor with one selected task, type-specific fields, answer/hint/explanation/source editing, add/clone/remove and undo of removing authored practice. Saved historical assignments and attempts are not rewritten. Hidden station practice is validated before saving.

Templates and personal plans use a selected unit and selected lesson, collapsible metadata/preferences, named prerequisite selection, dependency-checked unit ordering and lesson ordering. Unit keys and syllabus coverage remain accessible under advanced details. Existing completed-content revision consent and owner validation remain authoritative.

A persistent save bar, audit reason, unsaved-navigation warning, explicit user/shared scope, source origins and revision badge accompany editing. The narrow layout stacks navigation/editor; selecting a step scrolls/focuses the editor on small screens. Existing authentication, permission/MFA checks, operation UUID reuse, revision conflicts and audit transactions remain in force.

## API, data and runtime

Existing admin catalog-unit and learner-unit GETs add `programId`, `programTitle`, and `learningPath: { enabled, stations }`. Stations come from the same helper as learner availability. Ordinary packs return disabled/empty stations. Catalog detail uses the application-scoped default title override; learner identity/progress is not disclosed by catalog reads.

Existing `content` in unit PATCH and unit preview accepts optional `stationSettings` keyed by `supported`, `midpoint`, `review`, each containing integer `requiredWords` (1-100, bounded to actual membership) and `durationMinutes` (2-20). Effective thresholds must be nondecreasing and review must require all entries. Historical content without settings keeps its previous defaults, including short ordinary packs. Saves reject settings for packs that do not support teacher stations. Extra fields remain rejected.

Settings persist inside existing `admin_unit_content.content` JSONB: no schema migration or new database privilege. Existing application/user override precedence applies to settings and material together. Learner pack DTOs, word-stage slices, private-session duration and admin preview consume the settings. Previous meeting/homework completion remains required; no score, mastery, XP or historical evidence is fabricated/reset by a scheduling edit. A duration is subject to existing wallet/legacy entitlement authority; the legacy fixed-duration allowance can still cap/replace the requested duration.

Deploy matching Backend before Admin. On an older server without path metadata, the new Admin exposes words and explicitly requests the Backend update; it does not invent a runtime path or submit unsupported settings. Existing learner and Chrome request schemas are unchanged. Source config can change the next path/read/meeting; existing personal overrides and saved assignment/session snapshots retain their precedence/history.

## Verification

- Admin `npm.cmd run check`: TypeScript, 54 Node tests and production build passed. Existing bundle-size warning remains.
- Backend TypeScript/build and 261 fast tests passed, including a fake-provider actual 7-minute session and preserved predecessor gates.
- Disposable Docker PostgreSQL: admin-program-content and unit-learning-path integration passed, seven tests including the parent/subtests. Checks include scoped config isolation, catalog-to-session settings, preview duration, audited replay/conflicts, semantic edits, answer privacy and persisted map prerequisites.
- Browser: isolated loopback fixture with 60 units/50 words per unit; program/unit navigation, word search/edit across sections, prompt preview/save, threshold/duration save/reload and a complete three-question authored practice save verified. Screenshots and remaining visual checks are recorded in `../../gotit-admin/design-qa.md`.
- Not exercised: production rollout/content mutation, physical device, microphone, real paid provider or global delayed-retention effects. Core, learner Web and Chrome source were not changed. Pre-existing Backend and specification changes remain preserved.

Owner user guide: [Admin program editor](../../gotit-admin/docs/PROGRAM_EDITOR.md). Earlier content/runtime contract: [45](45_ADMIN_PROGRAM_EDITOR.md).


## DEV deployment evidence ? 2026-10-18

- Admin: https://gotit-admin-dev.onrender.com ? commit `2528312ef4245962a5872f859b9af34722b5f0c9`, Render service `srv-dbael83bc2fs73b3u7f0`, deployment `dep-dbael8bbc2fs73b3u900`, Deploy succeeded/Live.
- Backend: https://gotit-dev-backend.onrender.com ? commit `4925fadd19676dd8c7f98f34899dfb681348b82f`, Render deployment `dep-dbaenck9v7es7387sfcg`, Deploy succeeded/Live. This release starts from the exact previous DEV commit `7d450427537f816050e3548d2ebba58bd7053932` and preserves its guided activities, course-word and unit-prerequisite behavior. Both repositories use branch `release/admin-curriculum-dev-20261018`.
- Existing Admin `gotit-admin.onrender.com` targets production despite being grouped under DEV in Render; it was not changed. The new free Admin service explicitly targets DEV Core and Backend, with automatic deployment disabled. Core and learner Web were not redeployed.
- DEV lacked the Admin API/schema foundation. Existing forward migrations `1792100000000_admin-operations` and `1792190000000_admin-program-content` were applied only to the verified `gotit_dev` database (33 -> 35 migrations), after a protected full backup and successful restore/migration rehearsal in disposable local PostgreSQL. Strict schema/DML/product-only role preflight passes with `gotit_runtime`. The workspace feature itself still requires no new schema migration.
- Exact DEV release validation: Admin 54 tests/typecheck/build; Backend 289 fast tests/typecheck/build and Linux Docker build. All 104 PostgreSQL cases passed across the full run and corrected focused practice rerun. Historical count/rollback assertions were updated for the extra DEV activity migration. Repository-wide formatting still reports pre-existing baseline formatting differences; edited feature source was formatted without unrelated cleanup.
- Live HTTP: Admin `/ready` 200, `/admin-api/auth/config` 200 with Google disabled, unauthenticated `/admin-api/status` 401; Backend `/health` and `/ready` 200, unauthenticated Admin endpoints 401. Browser shows the deployed password login page. Authenticated DEV editing and real provider sessions were not exercised; local browser/owner integration coverage is recorded above. Existing roles and MFA still govern access. Google login needs the new origin authorized in the OAuth client before enabling it.
- Evidence: `../../gotit-admin/output/curriculum-dev-20261018/backend-live.png` and `admin-login.png`. Rollback uses the previous Backend commit and retains additive schema/content.


### DEV Google login configuration follow-up ? 2026-10-18

The initial empty `GOOGLE_CLIENT_ID` caused the reported unavailable-login message. The existing public client ID `336996428812-1gi15gthgo0dt01gbg7rukilcod8lb9i.apps.googleusercontent.com` is now configured in the DEV service environment and the committed DEV blueprint (`c8a5b8e`, pushed to the same release branch). Render applied an environment deployment (`dep-dbaer8s9v7es7388c8ig`) using the existing application build `2528312`.

Live `/admin-api/auth/config` returns HTTP 200 with this public client ID. Browser DOM shows the actual Google sign-in button and no console errors/warnings. Full sign-in remains unverified: the browser connection ended when opening the sign-in flow. Google Cloud required interactive identity verification and then encountered the user's network filter during cross-site Google sign-in; the OAuth client origin list was not inspected or changed. No new OAuth scopes, secrets, Core permissions or account roles were introduced. Evidence: `../../gotit-admin/output/curriculum-dev-20261018/google-login-fix.json`.


After the owner completed Google identity verification, the exact existing GotIt web client was inspected in project `gotit-508211`. Its eight existing JavaScript origins did not include DEV Admin. With the owner's explicit confirmation, `https://gotit-admin-dev.onrender.com` was added as item 9, all eight existing origins were retained, and Google displayed `OAuth client saved`. Reopening the client confirmed the persisted ninth origin. Screenshot: `../../gotit-admin/output/curriculum-dev-20261018/google-origin-saved.png`. Full Admin login is still unverified because the browser connection ended again when opening Google sign-in. Google UI notes that origin updates may take five minutes to a few hours to propagate. No redirect URI, OAuth scope, client secret, or Core role was changed.
