# 43 — Independent GotIt Admin foundation

Current approved scope includes the [owner feedback completion for 0.3](#owner-feedback-completion-03-2026-10-16).
Earlier foundation and Google sections below are retained as dated history.

## Owner feedback completion 0.3, 2026-10-16

The owner confirmed the deployed console works, then requested role promotion,
visible/changeable Pro or Free/Basic access, explanation of empty prompt instructions,
the prepared English-from-zero program, program creation and clear field guidance.
The owner clarified that **Basic is another name for Free**. These follow-ups are
within the approved full operational scope. The 0.2 acceptance is owner-reported;
0.3 is locally verified and requires its own ordered deployment.

| Requirement | Implemented behavior and acceptance |
| --- | --- |
| FR-ADM-09 | Users has Change role & permissions. Core independently requires `staff.write`, MFA, revision and reason; targets must be active/verified for promotion. Permissions are explicit. Self changes are rejected. Role/permission changes revoke target sessions and invalidate MFA verification; audit and replay are atomic. |
| FR-ADM-10 | Users shows the actual effective plan/source and provider subscription status. Change Free / Pro access selects an existing active plan, until changed or optional expiry within 90 days. Restore normal access clears it. Billing status and Admin use the same Core resolver. Charges and prepaid minutes are unchanged. |
| FR-ADM-11 | Prompt detail shows build-derived base templates, dynamic placeholders, current active additional guidance and the editable draft separately. Empty additional guidance is valid. Source freshness is checked; no learner input or provider call is used to build previews. |
| FR-ADM-12 | Programs has Prepared catalog, including English from zero and its actual units, alongside Templates and Learner programs. Catalog is shared read-only curriculum, with no learner progress exposed. Create program remains visible while locked; saving requires the existing content permission/MFA. |
| FR-ADM-13 | Hebrew sidebar guide, expandable section help and policy labels/helpers describe field units, bounds, consumers, draft/activation flow, permissions and billing effects. Existing learning algorithms and historical evidence remain unchanged. |

### Contracts, ownership and controls

Core adds POST `/api/v1/admin/users/:id/staff` with
`{operationId,reason,expectedRevision,role,permissions}` and POST
`/api/v1/admin/users/:id/plan` with
`{operationId,reason,expectedRevision,planId,endsAt}`. Null plan/expiry restores
normal access; a non-null plan with null expiry persists until changed. Identity
editing remains separately protected. The gateway has fixed action routes and
action-specific permissions; `users.write` cannot promote staff or change plans.

Core forward migration `1792200000000_admin-staff-and-plan-overrides.js` adds
`core.admin_plan_overrides` with scoped user/plan FKs and extends the staff
permission CHECK to include `staff.write`. It does not seed any grants, roles,
plans or overrides. Its down path refuses populated settings/permission grants.
Billing access precedence is administrator → explicit override → qualifying
provider subscription → manual grant → trial → Free. Provider payment state and
minute grants remain independent. Access source and optional override expiry are
additive billing status fields, compatible with existing Web/Chrome parsers.

Product adds GET `/api/v1/admin/catalog-programs` and `/:id`; it verifies the
current Core administrator, then reads the same shared catalog used by learner
discovery. Topics/tracks/packs/entry counts and ordered unit summaries are shown,
without learner-specific joins. Product schema is unchanged. API catalog now has
124 routes. Prompt references are generated from real source during build, shipped
with compiled code and compared to source in a fast test. Supplemental guidance
injection remains unchanged; no simulated or disconnected default is written to DB.

P-ADM-02: inspect effective plan/role → unlock → select explicit role/permissions
or access plan → confirm reason → scoped Core transaction → revoke target sessions
for staff changes → audit/receipt → refreshed effective access. Staff commands
serialize before actor locks, avoiding cross-demotion deadlocks. The acting staff
manager cannot remove their own role/permission, preserving an active manager.
The [owner interaction sequence](../uml/seq_admin_operations.puml) includes these
Core commands. Role, access and learning-evidence authority stay in their owners.

### Verification and rollout

Core typecheck/build and 32 fast tests; Backend typecheck/build, 228 fast tests,
88 real disposable PostgreSQL integration tests; Admin typecheck/build and 42
gateway/config tests passed during implementation. Focused DB tests verify staff
permission separation, scoped promotion/demotion, session revocation, idempotency,
actual Free/Pro billing access including permanent/expired/reset overrides, unchanged
provider subscription rows, real catalog counts, prompt base/active/draft separation
and guarded Core migration down/up. Local Chrome exercised program creation,
generation, activation, assignment and learner-specific edits, catalog discovery,
Free/Pro selection/reset, staff promotion/demotion and Hebrew help. Fixture provider
generation was used; no paid AI call, Google credential or Paddle mutation was made.

Patch-only lockfile updates remove npm-audit findings in Core/Backend dependencies
`proxy-addr` and Core `brace-expansion`; no API/dependency major upgrade. Production
audit reports zero vulnerabilities in all three repos. Backend's unrelated baseline
format failures remain recorded; changed files are checked separately. Admin retains
the existing bundle-size advisory. Production rollout of 0.3 is pending; no production
role/permission or plan mutation was performed in this follow-up.

Deploy Core (existing `npm run migrate` pre-deploy), then Backend and Admin. Once
all are Live, explicitly bootstrap `staff.write` for the existing owner through
Core Shell; older 0.2 parsers reject the new permission value, so do not bootstrap
it before updating consumers. No new Product migration, Google configuration or
Admin environment variable is required. Use the [Admin runbook](../../gotit-admin/docs/OPERATIONS.md#upgrade-from-the-working-02-deployment).
Then sign in, unlock and verify the new actions using authorized acceptance records.

Published 0.3 heads on `codex/admin-console-operations`: Core
`02243669c713b2266ecf50221ae8341d0018e6ae`, Backend
`a615611984682dbaa8b7419cf3a6fe78dda6a0eb`, Admin
`d586068d7e4666e8cf6efc8bf3a39eebed139b05`. Existing draft PRs 5/9/1
were updated around final behavior. [Admin CI 38829995865](https://github.com/rbaseapp/gotit-admin/actions/runs/38829995865)
passed on the published head. [Backend CI 38829616084](https://github.com/rbaseapp/gotIt-backend/actions/runs/38829616084)
fails at the retained repository formatting gate; local changed-file format passes,
with 50 unrelated baseline files still failing. Core has no Actions run at this head.
Both production Docker targets build with zero npm audit findings. The local release
clone, Core and Backend are clean; source was guardedly synchronized into the original
Admin working directory without changing its independent Git history.

Final Chrome checks verified permanent paid-plan access and 320px help. A closing
mobile Drawer could retain an invisible modal after resizing/navigation; the console
now unmounts a closed mobile sidebar and uses an idempotent close action. The guide
uses semantic field/description pairs that stack on narrow screens. Final clean
browser console reports zero messages. No production migration or grant was run here.

### Post-deploy visibility check, 2026-10-16

The owner reported no visible changes after deployment. Public read-only checks
confirm the Admin origin serves `/assets/index-BbNO4q8s.js`, SHA-256
`c7055aa43afdcc5d165beb13eee9056512b02b8997a2c96b9a0636a17249b1eb`,
exactly matching the locally verified 0.3 release asset. It includes staff/plan
actions, base prompt preview, prepared catalog and the Hebrew Guide. The HTML
response uses `Cache-Control: no-cache`. Backend's public API catalog now exposes
124 routes, including both prepared-catalog reads. All three readiness endpoints
return HTTP 200. This proves the new UI asset and catalog API are deployed, not
the owner's current loaded tab, Core migration/permission state or authenticated
write acceptance. Requested a full browser reload and the visible Guide indicator
to distinguish a retained old SPA from editing-permission/MFA visibility.

### Editing visibility correction 0.3.1, 2026-10-16

The owner confirmed Guide is visible, editing actions are missing and the app bar
says Unlock editing. This identifies unverified editing as the immediate visibility
condition; the owner's specific staff grants remain unverified. Existing deployed
0.3 already enables granted actions after authenticator verification. Admin 0.3.1
keeps applicable actions visible and disabled with Hebrew reasons rather than
hiding them. Reasons distinguish loading, owner availability, missing permission,
MFA, protected self-role changes and administrators' fixed full learning access.
Missing-permission notices remain visible after MFA. Expiry also disables confirmation
in an already open action dialog. No role/permission grant, MFA bypass, owner API,
schema or provider change is introduced. Only Admin requires a new deployment.

FR-ADM-13 / ADM-USERS, PROMPTS, PROGRAMS, BILLING and USAGE: users can discover an
applicable operation and understand its unlock requirement without confusing a
locked button with a missing feature. Existing action-specific gateway/Core/Product
authorization remains authoritative. The initial Staff grant stays operator-owned.

0.3.1 verification: `npm run check` passes typecheck, 42 existing gateway/config
tests and production build. Local Chrome used real disposable Core/Product/Admin
services to verify visible disabled user actions, real TOTP unlock, re-disabling
after five-minute browser-clock advancement and disabling an already open dialog's
confirmation. A read-only browser capability fixture removed only `staff.write` to
verify its explanation stays separate from billing access after MFA; it did not
change server grants. Prompt activation stays discoverable after expiry. Browser
console has zero errors/warnings. No production account mutation was performed.

## Operational administration 0.2, 2026-10-16

After authenticating, the owner reported all areas still showed Awaiting API and
explicitly selected completing every requested capability, including editing and
creating programs. This authorizes the required Core/Product APIs and independent
Admin implementation; it does not make earlier foundation screens operational by
configuration alone.

### Requirements, process and screens

BR-ADM-01: authorized staff manage GotIt users, commercial access, AI guidance,
learning configuration and support without becoming a second domain authority.
P-ADM-01: sign in -> inspect trusted capabilities -> choose an explicit target ->
verify editing with an authenticator -> save a reasoned command -> owner validates
permission/scope/revision -> commit audit/receipt -> display persisted result.
Conflicts require review/reload; uncertain retries retain UUID/payload. KPIs are
successful authorized commands, rejected stale/unauthorized commands and owner
availability. Learning effectiveness remains measured by product evidence.

| Requirement | Screen/behavior | Owner and acceptance evidence |
| --- | --- | --- |
| FR-ADM-01 | ADM-USERS search/detail; edit learner email/name/status | Core; application isolation, protected staff/self identities, revision conflicts, session/old-login revocation |
| FR-ADM-02 | ADM-BILLING subscriptions; temporary grants/revocation and provider portal | Core; replay once, max 90-day expiry, no fabricated provider subscription/charge |
| FR-ADM-03 | ADM-USAGE provider token events, monthly reading usage and credits | Product; provider-only measurements, deduplication, trial unchanged, concurrent quota enforcement |
| FR-ADM-04 | ADM-PROMPTS saved guidance drafts and explicit activation/rollback | Product; immutable published bodies, exact active revision, bounded provider instrumentation |
| FR-ADM-05 | ADM-PROGRAMS template creation/manual lesson editor/AI generation/activation/assignment | Product; actual personal-course snapshots, durable generation replay, no repeat paid request after uncertainty |
| FR-ADM-06 | ADM-ASSIGNMENTS learner-specific program edit/draft activation | Product; composite learner/course IDs, scoped equal course IDs, completed-unit and evidence preservation |
| FR-ADM-07 | ADM-SUPPORT tickets, private notes, learner-visible replies and resolution | Product; optimistic/replay-safe commands; own-ticket learner API filters private notes and staff IDs |
| FR-ADM-08 | ADM-POLICIES validated learning parameters/activation/rollback | Product; request-scoped policy across consumers; incompatible pending practice sessions/exercises rejected |
| FR-ADM-09 | ADM-AUDIT separate Product/Core histories | Each owner; actor/target/action/reason/time and bounded metadata; no provider/session secrets |
| NFR-ADM-01 | ADM-SECURITY Google/password login, authenticator setup/unlock and five-minute editing | Core; explicit staff permissions, encrypted TOTP, one-use codes, session/app/user/revision binding |

All areas have pending/empty/error states, permission-gated buttons, server-owned
saves and explicit conflict/retry messages. Reading/edit forms remain available
after verification expires; commands fail closed. The dashboard counts confirmed
owner capabilities, excluding auxiliary plan/quota/assignment/audit resources.
The gateway never accesses SQL or owns pricing/learning truth. No impersonation,
account promotion, unrestricted SQL, external support email or fabricated costs
is introduced.

### Contracts and schema

Core owns `/api/v1/admin/access`, users/plans/subscriptions/audit reads, explicit
user updates, temporary access grants/revoke, Paddle portal, and MFA enroll/verify.
Product owns `/api/v1/admin/access`, prompt/policy/program/assignment/support/usage/
quota/audit reads and guarded commands. Learner support lives at
`/api/v1/support/tickets` with scoped create/read/reply. Browser commands use
`/admin-api/resources/...` and `/admin-api/security/...`; origins, destinations,
methods, bodies, response sizes and deadlines are allowlisted/bounded.

Core additive migration `1790000011000_admin-operations.js` adds five scoped
admin tables and user display-name/revision fields. Product migration
`1792100000000_admin-operations.js` adds seven operational tables and removes the
historical hard cap of four from recorded monthly reading usage so explicit credits
can be consumed. It refuses down if restoring the cap would discard real usage.
Neither migration grants roles or staff permissions. Runtime Product credentials
retain no Core-table access; operator migration credentials remain separate.

Commands atomically commit domain updates, owner audit and replay receipts. UUID
reuse with changed content conflicts. Activation additionally compares the prior
active revision. Published prompt/policy/template bodies are retained. Template
updates do not rewrite assigned learner courses; edits create independent learner
drafts, preserving touched units/evidence and language pair. JSONb object-key order
does not falsely invalidate unchanged learned content. Real provider token events
start at rollout; historical cost and streaming totals remain unknown. Retention,
cohort simulation and pricing snapshots remain separate governance/extensions.

### Verification and rollout status

Local Core typecheck/build and 32 fast tests passed. Backend typecheck/build,
227 fast tests, all 85 disposable PostgreSQL integration tests and production
Docker build passed. Admin typecheck/build, 39 gateway/config tests and official
Render Blueprint schema passed. New real-DB coverage includes permissions/MFA,
atomic user changes/revocation/replay, concurrent edits, manual grants, immutable
activation/rollback, real assignments, owner isolation, learner draft edits,
policy semantic rejection, support privacy, actual quota reservation, provider
measurement/deduplication and bounded large-image response handling.

Loopback Chrome used actual Core, Product and Admin APIs with disposable database,
dummy accounts and a fixture course generator. Verified 8/8 modules, MFA setup/
unlock, user editing, prompt/policy save/activation, support creation/internal note,
temporary grant/revocation, reading credits, template generation/activation/
assignment, learner-specific draft edit/activation and learner course retrieval.
No production data, Google credentials, Paddle payments or paid AI calls were
used. The preview/OTP helper is never mounted by production entry points.

Repository-wide Backend formatting still reports pre-existing style issues;
changed files pass targeted formatting. Those unrelated files were preserved.
Build retains the React-admin bundle-size advisory. These are recorded limits,
not hidden passes.

Core release source is `63b89e8a825152091cffb7668ff2871ab1cfc2b2` on
`codex/admin-console-operations`. Backend CI pins that new Core baseline.
The implementation requires ordered rollout: backup/verified target -> Core
migration/service -> Product migration/runtime grants/service -> explicit owner
staff permissions -> Admin -> owner authenticator and authenticated acceptance.
At this record the operations release is **not deployed**; Render account access
was requested so existing services can be updated. Detailed operator commands,
configuration, recovery and rollback are in the Admin
[operational runbook](../../gotit-admin/docs/OPERATIONS.md).

Publication: [Core PR #5](https://github.com/rbaseapp/rbase-core-platforms/pull/5),
[Backend PR #8](https://github.com/rbaseapp/gotIt-backend/pull/8),
[Admin PR #1](https://github.com/rbaseapp/gotit-admin/pull/1), all drafts for the
ordered operational rollout. Core `63b89e8`; Backend `250e5c7` (preserves the
owner's intermediate `85f55ac` commit); Admin operational code `eefede1`, with
documentation follow-up `50472fa`. [Admin CI 38822144503](https://github.com/rbaseapp/gotit-admin/actions/runs/38822144503)
passed. [Backend CI 38821940686](https://github.com/rbaseapp/gotIt-backend/actions/runs/38821940686)
stopped at `Run npm run format:check`; local targeted formatting passes and the
51 pre-existing unrelated formatting files were preserved. No merge or operations
production deployment has occurred. Original Admin source was synchronized with
the release checkout while preserving its independent local Git history and
ignored artifacts; no force push was used.

Final additional evidence: all 85 Backend integration tests passed after adding
concurrent prompt-activation and Core migration down/up rehearsal on disposable
data. At 320 x 740, dashboard/users/usage/programs/support have no horizontal
document overflow; tables scroll within their own container. Fresh browser
console has zero errors/warnings. [Owner interaction sequence](../uml/seq_admin_operations.puml).

Final Admin release branch head is `5be6d95cb7f3a66945f08ecc50871efb670b8677`;
[CI 38822606291](https://github.com/rbaseapp/gotit-admin/actions/runs/38822606291)
passed. The original Admin working directory also passed typecheck, 39 tests and
build after guarded source synchronization. The interaction sequence passed the
official PlantUML v1.2026.8 `-checkonly` parser; the downloaded tool's SHA-256
matched the digest in the official release metadata. It remains an ignored local
verification tool, not a project/runtime dependency. Render connection is still
pending; the user was given the connection-card instructions without requesting
passwords or secrets in the conversation.

### Live availability recheck, 2026-10-16

The owner reported Admin still unavailable. Read-only checks confirm the live
Admin serves the earlier `index-BRl1cSal.js`, with public health/readiness/Google
configuration reachable. Core `/api/v1/admin/access` returns 404, so the new
Core owner API is not deployed. Backend readiness returns 200; its unauthenticated
admin-access request returns 401, which does not establish that its admin API or
new schema is deployed.

GitHub confirms Backend PR #8 was merged into main `d35dd3152e78116ea86fba386ea9b38cc0083720`,
while Core PR #5 and Admin PR #1 remain open drafts and their main branches retain
the earlier source. A follow-up Backend draft [PR #9](https://github.com/rbaseapp/gotIt-backend/pull/9)
contains the additional concurrency/Core rollback tests after that merge; it is
not needed to expose a new runtime API. Render plugin discovery still reports
not installed/connected, and no Render process API key/deploy hook or CLI is
available. No merge, deployment, production migration or staff permission change
was performed during this recheck. The owner was asked whether the Render
connection card is visible, with Dashboard guidance offered as the alternative.

### Core deployed and Product migration applied, 2026-10-16

The owner selected manual Render Dashboard deployment. The supplied Core Settings
screenshot showed a blank Docker Command, `npm run migrate` pre-deploy command and
Auto-Deploy Off. The owner then confirmed completing deployment of Core
`63b89e8a825152091cffb7668ff2871ab1cfc2b2` and the explicit existing-owner permission
bootstrap. Independent public probes now return 200 for Core readiness and 401
`AUTHENTICATION_REQUIRED` for `/api/v1/admin/access` with application routing,
replacing the earlier 404. This proves route availability, not an authenticated
permission/MFA acceptance result; permission bootstrap is owner-reported.

Existing local `.env.production.generated` migration/runtime configuration was
used without exposing credentials. Read-only inspection confirmed both roles
address the same database, the five new Core tables are present, and the only
pending Product migration was `1792100000000_admin-operations.js`. Product's
baseline was `1791280000000_guided-lesson-activities`, with 52 tables, completed
normalization audit and no detected normalization or attempt-sequence conflicts.
Runtime had no DDL, elevated role, or general Core-table access. Preflight rejected
the expected missing new Product schema before migration.

Created a full logical backup of `product_gotit` schema and data, verified its
archive inventory and SHA-256, then applied only the reviewed pending Product
migration through its owning runner and separate migration credential. Backup:
`../gotIt-backend/.local-backups/gotit-admin-before-2026-10-15T23-36-14-155Z.dump`,
25,568,907 bytes; SHA-256
`1db4bc8c6c0548ffed599aa4bdd2f8fa02ff1024bf6edec811eb406d43c500ad`.
The archive inventory was verified; no full production-backup restore was
performed. Migration rehearsal had already passed on disposable PostgreSQL.

Post-migration production preflight passed schema, all required runtime DML
grants and strict product-only role checks. Read-only inspection reports 59
Product tables, no normalization/attempt-sequence conflicts, and no runtime
Core-table access or DDL. No account/learning records were rewritten. No down
migration was executed; rollback retains additive schema and uses previous
application code or a reviewed forward fix. Ignored local evidence is stored in
`../gotIt-backend/.local-backups/admin-rollout-prepared.json` and
`admin-rollout-applied.json`; backups and credentials must never be committed.

At this checkpoint Backend and Admin runtime deployment are still owner actions:
Render manual exact commits `250e5c731a18a5d7e490ca0cc7da8aa79c95b1c6` then
`5be6d95cb7f3a66945f08ecc50871efb670b8677`, each awaited to Live. Admin's empty
`ADMIN_ENABLED_RESOURCES` selects capability discovery. Final authenticated 8/8
module and owner-device MFA/write acceptance remain outstanding after both
runtime deployments.

Date: 2026-10-14. Owner requested a new administration project and private GitHub repository under `rbaseapp`, prepared for deployment as a Render Web Service.

## Scope and ownership

New local sibling repository: `../gotit-admin`; intended remote: `https://github.com/rbaseapp/gotit-admin`.

The foundation is a React-admin/TypeScript SPA served by a Node/Express gateway. It reuses Core's login, refresh, logout and trusted `/auth/me` contracts. Active, email-verified GotIt administrators are checked server-side for each protected request. Existing Core, product Backend, learner Web and Chrome code are unchanged by this setup.

Core remains owner of identity, account fields, subscriptions and entitlements. GotIt Backend remains owner of product profile, prompts, programs, learning policy and usage. Proposed admin APIs are documented in the new repository and are not claimed to exist in either owner service.

## Implemented and deferred

Implemented locally: administrator login/refresh/logout adapter, responsive navigation, overview and eight module connection states; explicit read-only resource routing, origin/redirect/time/size limits; health/readiness endpoints; CI and `render.yaml` for one Node 24 Web Service. All resource reads default to disabled; all administrative writes remain disabled.

Deferred: service-owned user/subscription reads and writes, actual token/cost instrumentation, support tickets, prompt revision registry, program-template assignment, learning-policy activation, granular staff permissions and MFA. Existing `admin` billing access is not treated as a complete staff authorization model.

This foundation adds no database, migrations, provider credentials, direct SQL access or live product-data mutation. Browser-QA fixtures are loopback-only and isolated from the production entry point. Tokens follow existing Web storage practice: access in memory, rotating refresh in tab sessionStorage. Audit collection/retention must be designed with each future operation in its owning service.

## Local evidence and release limits

`npm run check`: TypeScript, 23/23 gateway/config tests and production build passed. Production dependency audit: 0 vulnerabilities after a fixed transitive dependency override. `npm run validate:render`: Blueprint passed the official published JSON schema. Local Chrome fixture verified admin login, dashboard, module states, refresh restoration and 320px layout without horizontal overflow.

Canonical ongoing architecture/contracts/backlog/verification are maintained in the new repository's `docs/` directory. This evidence does not establish real Core integration, deployed management APIs, a Render deployment or production acceptance. GitHub publication evidence will be recorded after successful push; repository creation alone is insufficient.

## GitHub publication evidence

Published all 34 tracked source files to the private `rbaseapp/gotit-admin` main branch through the already-authenticated rbaseapp Chrome profile. Remote commit: `f3e78540c258d73b108f8b536a52875272caeef4`. Downloaded the authenticated source archive and compared SHA-256 for every file against the locally verified source: 34/34 identical, no missing or extra files. [GitHub CI run 38575053485](https://github.com/rbaseapp/gotit-admin/actions/runs/38575053485) completed successfully. Production entry-point smoke: `/health` and `/ready` returned 200, unauthenticated admin status returned 401, using placeholder upstream origins without external requests.

GitHub publication used web-editor commits because the owner selected the existing Chrome profile instead of CLI authentication. The initial local commit `6ad07eb` and remote commit history are independent; use an authenticated fresh clone for normal future Git push/fetch, and do not force-push the local root commit over remote main. Existing global Git identity/credentials were not changed. Render deployment remains unperformed; the Blueprint requires explicit application/Core/GotIt HTTPS origins.

Final CI maintenance: upgraded checkout/setup-node to v6 (Node 24 runtime) and pinned Ubuntu 24.04. Remote final commit `0f6afa822e2bf79fab7b1116c4a2ddd9545c0396`; local final commit `5c5adc0`. [Final CI run 38575662721](https://github.com/rbaseapp/gotit-admin/actions/runs/38575662721) passed. A second authenticated archive comparison confirmed all 34 final files still match byte-for-byte.

## Google administrator sign-in, local update 2026-10-16

The owner requested Google authentication for the Admin service. The new Admin working-tree change adds Google Identity Services, public runtime `GOOGLE_CLIENT_ID` configuration and an allowlisted `/admin-api/auth/google` exchange through Core's existing `/api/v1/auth/google` contract. Core still verifies the provider identity; the gateway independently checks `/auth/me` for an active, email-verified `admin`, revoking rejected issued sessions on a best-effort basis. Core and learner clients were not changed; no account was promoted.

Local verification: TypeScript, 31/31 gateway/config tests and production build passed; official Render Blueprint schema passed. Loopback Chrome with a mocked Google SDK and fake Core verified login, refresh restoration, logout, displayed rejection without retained session, retry and 320px layout. See `../gotit-admin/docs/VERIFICATION.md` for precise boundaries. This is not real Google/Core integration evidence.

Initially this update could not be published because Git/GitHub access to the private rbaseapp repository was unavailable. The owner supplied `https://gotit-admin.onrender.com/#/login`; its origin is `https://gotit-admin.onrender.com`. Pre-publication checks on 2026-10-16 returned 200 for `/health`, `/ready` and `/`, while `/admin-api/auth/config` returned 401 and the root referenced the earlier build `index-DB9VIXs-.js`. The access block was subsequently resolved as recorded below. Activation requires that exact Admin origin registered in the web OAuth client's Authorized JavaScript origins and an existing authorized Core admin account. Exact setup values are in `../gotit-admin/docs/GOOGLE_SETUP.md`. Management APIs and writes remain deferred as above.

## Google publication and live check, 2026-10-16

The owner completed Git Credential Manager authentication for `rbaseapp`. A fresh authenticated clone at `../gotit-admin/output/publish-google-20261016` preserved the published history. Applied the reviewed source patch there, installed locked dependencies, and passed `npm run check` (TypeScript, 31/31 tests, production build) and `npm run validate:render`. Pushed `238687eb6546977ccef7a4d0bb1c923e92ca9881` to remote main; [CI run 38808768359](https://github.com/rbaseapp/gotit-admin/actions/runs/38808768359) passed.

Render subsequently served the new `index-BRl1cSal.js`, with `/health`, `/ready` and public `/admin-api/auth/config` all returning 200. A real Google SDK browser check displayed the Google button but returned `The given origin is not allowed for the given client ID`. A browser-only test with Google's recommended referrer policy still produced that error, so the owner was asked to register the exact origin on the existing web client. No Google/production account was accessed or promoted.

Follow-up commit `5aa468c8dc990567c4888b831f9efbe8c5091d9e` sets the documented `strict-origin-when-cross-origin` policy when Google is enabled, retaining `no-referrer` when disabled; both header modes are covered in the existing gateway tests. TypeScript, 31/31 tests and production build passed again; the follow-up was pushed to main. End-to-end Google login and Core account-role acceptance remain unverified until the provider accepts the origin and the owner signs in.

Final follow-up evidence: [CI run 38809131776](https://github.com/rbaseapp/gotit-admin/actions/runs/38809131776) passed for `5aa468c8dc990567c4888b831f9efbe8c5091d9e`. Render returned 200 for public Google configuration with `Referrer-Policy: strict-origin-when-cross-origin`, confirming the server follow-up is live. The owner then added the Admin origin in Google. A fresh unmodified browser reload rendered Google's actual iframe button without console errors; clicking it opened the official Google account sign-in page, and the earlier origin-denial error was gone. The isolated QA browser has no Google account, so no credentials were submitted or user session created; full account login and Core admin-role acceptance remain owner acceptance. The empty-account FedCM message during that isolated click does not establish an origin or account-role failure. Screenshot: `../gotit-admin/output/playwright/google-live-login-authorized.png` (local ignored QA artifact).
