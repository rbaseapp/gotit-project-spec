# AGENTS.md — GotIt / rbase Complete AI Handoff

This file is the operating manual for any AI model or engineer working in the GotIt
multi-repository workspace. Read it completely before analyzing, planning or changing
the product. Its purpose is to prevent architectural drift, false status claims,
security regressions and loss of user-owned work.

Last specification update: **2026-09-30**.

---

## 1. Mission

GotIt is a contextual vocabulary-learning product. A learner captures a word or
phrase from the web or enters it manually, confirms the intended meaning and
language pair, and learns it through server-authoritative, evidence-based practice.
The product extends learning into generated reading and real-time private voice
lessons. rbase Core supplies shared application identity, authentication, sessions,
roles, billing and entitlements.

The product outcome is not “a list of translated words.” The intended closed loop is:

```text
Encounter → Capture context → Confirm sense → Save safely
→ Study → Active practice → Evidence → Scheduled review
→ Learned → Established retention → Apply in reading/speech
→ Measure and adapt
```

North-star outcome: reliably learned and retained learning items per active learner.

---

## 2. Workspace and Repositories

The workspace file is `../rbaseapp-workspace-code.code-workspace`.

| Folder | Responsibility | Default local port | May product work modify it? |
|---|---|---:|---|
| `../core-platform` | Shared applications, users, auth, roles, billing | 8080 | Only for explicit Core contract work |
| `../gotIt-backend` | GotIt product APIs and `product_gotit` domain | 3001 | Yes, for backend/domain work |
| `../gotIt-front` | Web SPA and production gateway | Vite / 10000 | Yes, for Web work |
| `../gotIt-chrome` | Manifest V3 capture extension | n/a | Yes, for extension work |
| `../gotit-project-spec` | Maintained as-built and operational specification | n/a | Update with material changes |
| `../rbaseapp_project_docs_updated` | Historical specifications and decision snapshots | n/a | Reference; do not treat all status as current |

Repositories are independent. Do not assume one Git root or one release cadence.
Do not move GotIt into Core or combine deployment processes without an explicit,
approved architecture change.

### Baseline commits inspected for this specification

```text
gotIt-backend  9f57e7eefbc9a8915539fb1de778b36904f1d0f8  2026-09-29
gotIt-front    c410a90cd407ed45112d7c0123c7b295b2e93a12  2026-09-29
core-platform  1e9d259ef141c17ee6c37c20596593d7267188ba  2026-09-27
gotIt-chrome   d6659b1e694301518b327e103918ae2628e8d979  2026-09-28
```

Always rerun `git status --short` and `git log -1` in every affected repository.
The commits above are a documentation baseline, not permission to reset later work.

### Known user-owned working-tree state on 2026-09-30

`gotIt-backend` contains an uncommitted transition of AI reading generation from
Anthropic to OpenAI, including a new `openai-reading.ts`, deletion of
`anthropic-reading.ts`, config/deployment/test changes and a proposed
`AI_READING_MODEL=gpt-6-luna`. `gotIt-chrome/README.md` has a related uncommitted
documentation edit. `gotIt-front` has matching uncommitted provider-error wording
changes in all eight locale catalogs. These changes belong to the user. Preserve them.
Do not revert, overwrite, complete, commit or describe them as deployed unless
explicitly asked.

---

## 3. Required Reading Order

Before any cross-component or product decision, read:

1. `README.md`
2. `docs/00_INDEX.md`
3. `docs/18_CURRENT_FEATURES.md`
4. `docs/19_REQUIREMENTS_CATALOG.md` and `docs/20_USE_CASE_CATALOG.md`
5. `docs/15_INDUSTRIAL_ENGINEERING_SPEC.md`
6. `docs/17_SCREEN_CATALOG.md`
7. `docs/02_SYSTEM_ARCHITECTURE.md`
8. the relevant component specification:
   - `docs/03_CORE_PLATFORM.md`
   - `docs/04_GOTIT_BACKEND.md`
   - `docs/05_WEB_FRONTEND.md`
   - `docs/06_CHROME_EXTENSION.md`
9. `docs/07_API_CONTRACTS.md`
10. `docs/08_DATA_MODEL.md`
11. `docs/09_SECURITY_PRIVACY.md`
12. `docs/16_UML_SEQUENCE_CATALOG.md` and the relevant `uml/*.puml`
13. `docs/11_TESTING.md`, `docs/12_ROADMAP.md`, `docs/13_TRACEABILITY.md`

Then inspect current source code. Documentation is guidance and baseline; current code
is authoritative for what is implemented. Deployment evidence is authoritative for
what is live. Product approval is authoritative for intended behavior.

### Source-of-truth precedence

When sources disagree, do not silently choose. Use this order and surface the drift:

```text
Explicit current user instruction
→ approved product/architecture decision
→ current code + migration + tests
→ current maintained specification
→ deployed evidence/runbook
→ historical documents/README comments
```

“Current code” proves implementation, not production deployment. “Deployed evidence”
proves one observed environment/time, not universal correctness.

---

## 4. Status Vocabulary — Use Precisely

Use only these meanings:

- **Proposed**: idea/contract awaiting approval.
- **Approved**: decision accepted; implementation may not exist.
- **Implemented**: code exists in the current working tree or commit.
- **Locally verified**: named local quality gates passed on a stated commit/tree.
- **Integration verified**: real PostgreSQL or external boundary suite passed.
- **Staging verified**: acceptance passed in staging with stated configuration.
- **Production verified**: a dated live check exists for the exact release.
- **Conditional**: code exists but depends on configured credentials/provider/tier.
- **Partial**: meaningful part exists; required scope remains.
- **Blocked**: cannot proceed without named external input/authority.
- **Deprecated**: still accepted during a transition; removal plan required.

Never use “done,” “production-ready,” “working,” or “complete” without naming the
scope and evidence. Never turn historical claims into current claims.

---

## 5. Non-Negotiable Architecture

```text
Web Frontend ───────┐
                    ├──> rbase Core
Chrome Extension ──┤       applications, users, auth, sessions,
                    │       roles, billing, entitlements
                    │
                    └──> GotIt Backend
                            profile, capture, library, packs,
                            practice, learning, XP, reading,
                            speech, images, private lessons, transfer
```

### Boundaries

1. Core and GotIt Backend are separate services and repositories.
2. GotIt is not a module inside the Core process.
3. There is no global user in V1. Identity is application-scoped.
4. `application_id` is a security boundary, not merely an analytics field.
5. The same email in another application represents a separate application user.
6. Product data belongs in `product_gotit`, not generic Core tables.
7. Core owns billing state; GotIt consumes entitlements and owns no second billing system.
8. Provider secrets remain server-side. Web/Chrome receive only public identifiers or
   short-lived provider client secrets designed for browsers.
9. The Web gateway is a security boundary, not a generic unrestricted proxy.
10. The Chrome content script is untrusted and never receives session tokens.

### Trusted identity rule

Never accept `application_id`, `application_user_id`, role, tier or entitlements as
client authority. GotIt authenticates the Core JWT by calling Core `/api/v1/auth/me`
with `X-Application-Key: gotit`, then builds its request scope from the trusted response.

If Core is unavailable, protected GotIt operations fail closed. Do not add a bypass or
decode the JWT locally as a shortcut without an approved security redesign.

---

## 6. Current Product Capabilities

The full matrix is `docs/18_CURRENT_FEATURES.md`. The stable baseline includes:

### Identity and commercial access

- Email/password registration and login.
- Google login for Web and Chrome-specific OAuth clients.
- Facebook login for Web.
- Short-lived HS256 access JWT and opaque rotating refresh session.
- Application roles `user` and `admin` loaded from PostgreSQL.
- Free/trial/paid tiers, plans, entitlements, Paddle checkout/webhook/portal.
- Missing: email verification and password reset.

### Product domain

- Profile, languages, CEFR self/system estimates, goals, enabled skills, interests.
- Manual and Chrome contextual capture.
- Provider preview with signed provenance, explicit merge/new-sense decision.
- Idempotent save and stable receipts.
- Vocabulary library, filters, sorting, pagination, semantic edits, bulk operations,
  tags, examples, occurrences, translations and soft deletion/restore.
- Topic/track/CEFR word packs and safe installation/removal.
- Smart/manual practice sessions, study cards and generated/reused study images.
- Flashcard, recall, listening/spelling, matching, pronunciation and article quiz.
- Five-skill evidence, learned/established retention, scheduling, XP/level/streak.
- Dashboard, activity and gamification projections.
- AI reading preview/publication/history/quota/quiz.
- TTS/STT/pronunciation through configured Google/Azure adapters.
- OpenAI Realtime private lesson, preferences, roadmap, report and level evidence.
- Paginated export and idempotent capture-request import.

### Clients

- Web live and demo modes are distinct. Demo state is not server truth.
- Web routes/screens are cataloged in `docs/17_SCREEN_CATALOG.md`.
- Chrome entry points: context menu, selection action, double-click inline translation,
  popup/manual capture and options.
- Eight UI locales: Arabic, German, English, Spanish, French, Hebrew, Russian, Chinese.

---

## 7. Product and Learning Invariants

### Learning item and sense

- A learning item is one source expression, source language, translation language and
  intended sense. Same spelling may have multiple items/senses.
- `user_status` (`active|paused|archived`) and `learning_status`
  (`new|learning|reviewing|mastered`) are independent.
- Soft deletion is represented separately by `deleted_at`.
- Semantic edits increment `learning_revision` and reset current evidence/projections
  while preserving historical attempts, occurrences, XP and provenance.
- There is exactly one current primary translation; accepted current forms are bounded.

### Practice authority

- Clients submit only an answer, opaque choice, self-rating or skip.
- Clients never submit trusted score, result, XP, mastery or next-review time.
- Exercises bind owner, session, item, revision, type, private expected answer, expiry
  and consumption state.
- Foreign, expired, consumed or stale-revision exercises cannot score.
- Attempt, exercise consumption, skill effects, item projections, review transition,
  XP, daily activity, algorithm event and receipt commit atomically.
- Skip does not award progress, streak or XP.

### Learned and established baseline

Default policy requires at least:

```text
3 scored attempts overall
2 successful active-recall attempts with score >= 85
those successes on 2 profile-calendar days
active-recall mastery >= 80
latest scored answer passing
review_stage >= 2
no 2 active-recall failures in the latest 3 active-recall attempts
```

`mastered` with stages 2–3 is `learned`; stage 4+ is `established`. Manual mastery is
allowed and marked `mastery_source=user`, but it does not fabricate attempts/evidence.
Policy values may be configured and are exposed with an `algorithmVersion`.

### Rewards

Unique XP ledger keys prevent replay farming. Default daily full-rate cap is 200 XP;
after that, the default rate is 25%, rounded to whole XP. Do not duplicate the XP
formula in clients.

---

## 8. API Rules

Read `docs/07_API_CONTRACTS.md` before modifying any route.

### Common expectations

- Product API prefix: `/api/v1`.
- Core application header: `X-Application-Key: gotit`; it is public routing context,
  not a secret.
- Protected requests use `Authorization: Bearer <Core access token>`.
- Every request/response should retain a correlation/request ID.
- Zod boundary objects are strict where defined; do not add undocumented fields.
- Return stable error codes; clients localize codes and must not depend on raw messages.
- Never expose SQL, stack traces, provider bodies, prompts, keys or internal IDs that
  have not been approved as public.

### Idempotency-required operations

Use a stable UUID and stored receipt for:

- capture save;
- practice session creation;
- attempt submission;
- pronunciation assessment;
- reading publication/open;
- each import entry;
- billing checkout in Core.

The same key and canonical request hash must replay the original committed receipt.
The same key with a different request must return a conflict. A client timeout does
not mean the mutation failed; retry with the same key and unchanged payload.

### Known API documentation drift

The GotIt static API catalog reports 49 routes, while current code mounts 56 product
handlers. Seven newer private-lesson management routes are missing from the catalog.
Backend and Extension READMEs also contain older route/table counts. Treat
`docs/13_TRACEABILITY.md` as the drift register and fix catalog/tests with the next
authorized contract change.

---

## 9. Data Model and Migration Rules

The schema inventory is `docs/08_DATA_MODEL.md`.

- Current migration-derived inventory: 13 Core tables and 37 `product_gotit` tables.
- Every user-owned product row must be scoped by application and application user.
- Use compound foreign keys/queries to preserve isolation.
- Use parameterized SQL; dynamic identifiers/orderings require allowlists.
- Attempts/events are evidence; counters and mastery are projections.
- Historical migrations that ran are immutable. Never “fix” an old migration.
- Add a new forward/down migration and test it on a disposable database.
- GotIt startup does not run migrations. Use a dedicated migrator credential and
  `GOTIT_MIGRATION_DATABASE_URL`; do not fall back to runtime `DATABASE_URL`.
- Runtime production role should have product DML only, no DDL and no general Core read.
- Before production schema work: backup, normalization audit, preflight, rehearsal,
  grant verification and rollback/forward-fix decision.
- Do not run destructive down migrations against production as an automatic rollback.

---

## 10. Provider and AI Rules

Providers are conditional dependencies, not guaranteed capabilities.

| Workload | Stable committed adapter | Notes |
|---|---|---|
| Ordinary translation | Google Cloud Translation Basic v2 | Server key, lexical translation |
| Contextual AI translation | OpenAI Responses | Strict structured output, signed selections |
| Reading | Anthropic in committed baseline | Local user-owned transition to OpenAI is in progress |
| Study photo | Pixabay | Safe search, lexical tag relevance, downloaded/cache |
| Generated study image | OpenAI Image | Fallback, literal subject, revision-bound |
| Private lesson | OpenAI Realtime + report model | Short-lived browser client secret |
| Speech | Google or Azure | Conditional by credentials/language mapping |

Rules:

1. Never put provider secrets in Web, Extension, docs, logs or repository files.
2. Treat topics, contexts, words, prior drafts and transcripts as untrusted data, not
   instructions. Preserve system/developer separation in prompts.
3. Validate provider response size, schema, enums and counts before domain writes.
4. Bound request timeout, aggregate retry budget and response size.
5. Authentication, billing, permission and invalid-request failures are not generic
   retryable errors. Timeout/rate/upstream may receive bounded retry.
6. Never fabricate translation, pronunciation score, reading or image when unavailable.
7. Record bounded provenance/latency/status, never raw credentials or full sensitive body.
8. Provider/model changes affect quality, cost, privacy, tests, config, deployment and
   documentation. They are not a one-line string change.

---

## 11. Client Rules

### Web

- React 19 + TypeScript + Vite; strict response validation.
- Keep pages/UI separate from API and domain adapters in `src/lib`.
- Access token is memory-only; refresh token is tab `sessionStorage`.
- One concurrent refresh promise; retry a 401 only through the authorized API layer.
- Do not store publication/selection/provider tokens persistently.
- Live screens use server truth. Do not fallback to demo seed after a live failure.
- Same-origin gateway routes are `/core-api` and `/gotit-api`.
- Gateway Core proxy is allowlisted. Do not turn it into an open proxy.
- Any new screen must cover loading, empty, error, unauthorized, forbidden, offline,
  partial success and stale/conflict states as applicable.
- RTL/LTR, keyboard access, focus restoration, announcements, reduced motion and
  320px layouts are release requirements.

### Chrome

- Manifest V3; no remote code, `eval` or provider requests.
- Only the service worker performs Core/GotIt requests.
- `chrome.storage.local`/`session` access is restricted to trusted contexts.
- Content scripts receive only feature configuration and bounded result/context data.
- Validate every runtime message with an exact allowlist and reject extra fields.
- `activeTab` and scripting are user-gesture or configured-feature driven.
- Unpacked builds keep the committed public key for stable development identity.
- Web Store packages omit `manifest.key`; the Store owns production identity.
- A new permission requires explicit rationale, privacy review, UI explanation and
  package verification.

---

## 12. Security and Privacy Rules

Read `docs/09_SECURITY_PRIVACY.md` for the threat model.

Never log or commit:

```text
Authorization/Cookie/Set-Cookie values
access or refresh tokens
passwords or password hashes
JWT/provider/Paddle secrets
database URLs/private keys/service-account JSON
raw request bodies containing user context
raw user audio or full provider prompts/responses
```

Privacy defaults:

- Store selected text and sentence only after explicit save.
- Do not collect or send full page HTML.
- URL/title may be stored with the user-initiated occurrence.
- User pronunciation audio is transient and not stored.
- Reading preview is not persisted as opened content until publication.
- Private lesson audio and provider secret are not persisted by GotIt.
- Lesson completion turns/report are bounded and stored according to the journal contract.
- Permanent deletion/retention/account deletion remain incomplete P0 governance work.

Any feature that expands collected data, recipients, retention, permissions or analytics
requires privacy/security review before implementation or rollout.

---

## 13. Screen and Process Rules

Business processes are in `docs/15_INDUSTRIAL_ENGINEERING_SPEC.md`. Screen IDs and
states are in `docs/17_SCREEN_CATALOG.md`. UML sequences are in `uml/*.puml`.

For a new or changed feature, update all applicable layers:

```text
Business outcome / KPI
→ Process P-ID and control points
→ Screen SCR-ID and user states
→ UML sequence
→ API contract
→ Data model/migration
→ Security/privacy analysis
→ Tests and operational rollout
→ Current feature status and traceability
```

Do not implement an API with no user/process owner, or a screen whose authoritative
data/business rule is undefined.

---

## 14. Required Work Procedure for AI Agents

### Step 1 — Classify the request

Determine whether it is:

- analysis/review only;
- bug diagnosis;
- UI-only implementation;
- backend/domain change;
- Core identity/billing change;
- schema/migration change;
- provider/config/deployment change;
- cross-repository feature;
- documentation/status update.

Do not expand authorization from one class to another. A request to review does not
authorize code changes. A frontend request does not authorize backend/migration changes
unless the contract truly must change and the user requested the complete implementation.

### Step 2 — Inspect before planning

1. Read this file and the required documents.
2. Run `git status --short` in every potentially affected repo.
3. Read current routes/schemas/types/tests, not only READMEs.
4. Identify user-owned/uncommitted overlapping work.
5. State current behavior, requested behavior and evidence gap.

### Step 3 — Impact analysis

For every requested change answer:

```text
Who is the actor and what outcome changes?
Which P-ID and SCR-ID change?
Which service owns the rule?
Which clients consume it?
Does API shape/status/error/enum change?
Does schema/data migration change?
Does auth/entitlement/role change?
Does privacy, provider data or cost change?
What is backward compatibility, especially for the Chrome Store lag?
What is the rollout and rollback strategy?
What evidence proves completion?
```

If a missing decision materially changes the result, surface it. Otherwise make the
smallest safe assumption, document it and proceed.

### Step 4 — Implement in coherent increments

- Preserve existing unrelated changes.
- Prefer current repository patterns over introducing new frameworks.
- Keep controllers/routes thin, business logic in services, persistence in repositories.
- Validate boundaries and make writes transactional where projections must agree.
- Add idempotency before adding automatic mutation retries.
- Never duplicate backend learning/billing rules in clients.
- Add only necessary dependencies and explain them.
- Update tests and docs with the same change, not as future cleanup.

### Step 5 — Verify proportionally

Use the relevant commands in Section 16. Database/provider/browser changes require
integration/live/manual evidence beyond unit tests. Record what was and was not run.

### Step 6 — Hand off clearly

Final handoff must include:

- outcome and changed files/repos;
- exact behavior and contracts changed;
- migrations/config/deployment actions;
- tests run and results;
- tests not run and why;
- risks, compatibility, open decisions and next safe step;
- whether any user-owned changes were preserved.

Never claim a deployment, provider call, migration or production verification that did
not occur.

---

## 15. Change-Specific Checklists

### API change

- route authentication and entitlement defined;
- Zod request/response limits and strictness;
- error codes/status semantics;
- ownership/isolation test;
- idempotency/retry semantics;
- Web and Extension parser compatibility;
- static API catalog and `docs/07_API_CONTRACTS.md` updated;
- Chrome Store backward-compatibility window considered.

### Schema change

- owner schema and runtime/migrator roles;
- additive/backfill/constraint/index sequence;
- lock/downtime/row count impact;
- forward/down disposable DB test;
- old/new application compatibility;
- backup, rollout, rollback/forward-fix;
- `docs/08_DATA_MODEL.md` updated.

### Screen change

- SCR-ID, actor, goal, entry/exit and wireframe;
- loading/empty/error/locked/offline/partial/conflict states;
- keyboard/focus/labels/announcements;
- RTL/LTR and long multilingual text;
- 320px, landscape, tablet, desktop;
- feature/capability/tier gating;
- component and browser tests;
- `docs/17_SCREEN_CATALOG.md` updated.

### Learning change

- authoritative evidence and exercise type;
- active-recall implications;
- review-stage/mastery/demotion effects;
- XP/anti-gaming/daily cap;
- policy/algorithm version change;
- replay of old receipts and semantic revisions;
- offline evaluation and migration of projections if any.

### Provider/model change

- supported capability and fallback chain;
- secret/config validation;
- prompt/data minimization and privacy;
- structured response validation;
- timeout/retry/error taxonomy;
- cost/quota/observability;
- fakes/unit tests and live acceptance;
- deployment variables/runbook/current-features status.

### Billing change

- Core remains owner;
- plan/catalog and provider price mapping;
- checkout idempotency;
- raw-body webhook signature and event idempotency;
- lifecycle staleness, grace, trial and cancellation;
- entitlement consumers in Backend/Web/Chrome;
- sandbox then live reconciliation;
- finance/legal/refund/tax review.

---

## 16. Commands and Quality Gates

Use `npm.cmd` in Windows PowerShell if `npm.ps1` is blocked.

### GotIt Backend

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run test:integration
npm.cmd run audit:normalization
npm.cmd run preflight
```

Fast tests do not replace PostgreSQL integration tests for transactions/isolation.
Provider tests should use fakes in CI; live provider acceptance is separate.

### Web

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run test:responsive
```

`check` includes typecheck, lint, Vitest, production build and gateway tests. The current
build passes with a warning that the main client chunk is over 500KB; this is recorded
as performance work, not a hidden failure.

### Core

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run test:integration
```

### Chrome

```powershell
npm.cmd ci
npm.cmd run verify
npm.cmd run package
```

Verify the unpacked identity, Web Store omission of `manifest.key`, permissions, CSP,
assets and absence of secrets.

### Documentation

- Ensure all relative Markdown links resolve.
- Validate workspace JSON.
- Render or syntax-check changed PlantUML diagrams.
- Update `CHANGELOG.md`, `docs/13_TRACEABILITY.md` and baseline/status evidence.

---

## 17. Current Verification Evidence

On the clean commit baselines inspected on 2026-09-29:

```text
GotIt Backend: typecheck, 140/140 fast tests, build passed.
Web: typecheck, lint, 97/97 Vitest, build, 13/13 gateway tests passed.
Core: typecheck, 26/26 fast tests, build passed.
Chrome: typecheck, 28/28 tests, build and package verification passed.
```

Not included in that run: PostgreSQL integration suites, the full responsive Playwright
suite, physical-device tests or live OAuth/Paddle/AI/Speech acceptance. Do not broaden
the evidence beyond exactly what is stated. The later dirty reading-provider working
tree requires re-verification after the user completes or authorizes that work.

---

## 18. Common Failure Modes to Avoid

Never:

- describe GotIt as a Core module;
- query users by email without application scope;
- trust a client-provided user ID, role, tier, score, XP or mastery;
- merge same-spelling items without explicit sense rules;
- retry a mutation with a new UUID after an ambiguous timeout;
- return expected answers inside an exercise prompt;
- treat an untried optional skill as failed evidence;
- advance learning merely because a reading was viewed;
- store user pronunciation audio;
- put OpenAI/Google/Azure/Paddle secrets in clients;
- let the gateway proxy arbitrary Core paths or redirects;
- expose Chrome storage to untrusted content contexts;
- edit historical production migrations;
- run a destructive down migration as an automatic rollback;
- overwrite a dirty worktree or “clean up” user changes without authorization;
- update only code while leaving API/screen/process/status documents stale;
- equate a passing mock test with live provider or production verification;
- invent a missing production URL, credential, metric, provider behavior or decision.

---

## 19. Known Gaps and Open Decisions

P0 governance/release gaps:

- email verification and password reset;
- generated/synchronized API catalog;
- production provider acceptance for the exact configured models;
- Paddle live reconciliation and finance/legal completion;
- permanent deletion, retention and account-deletion workflow;
- monitoring, alerting, on-call ownership and SLOs;
- backup restore drill and approved RPO/RTO;
- consistent separation of migration and runtime credentials.

Open product/learning decisions:

- final AI reading quota by plan;
- final mastery/XP/review intervals after real cohort data;
- primary pronunciation assessment provider and claim wording;
- calibrated CEFR evaluation and public wording;
- paragraph capture default;
- supported browser/device matrix;
- long-term provider/model routing and fallback policy.

Do not close these decisions implicitly through implementation defaults.

---

## 20. Documentation Maintenance Contract

For any material change, update the minimum affected set:

- `docs/18_CURRENT_FEATURES.md` — implemented/current status;
- `docs/19_REQUIREMENTS_CATALOG.md` — BR/FR/NFR and acceptance;
- `docs/20_USE_CASE_CATALOG.md` — actors, flows and alternatives;
- `docs/17_SCREEN_CATALOG.md` — user-facing screen/state behavior;
- `docs/15_INDUSTRIAL_ENGINEERING_SPEC.md` — process/control/KPI impact;
- `docs/16_UML_SEQUENCE_CATALOG.md` and `uml/*.puml` — interaction flow;
- `docs/07_API_CONTRACTS.md` — routes/payloads/errors;
- `docs/08_DATA_MODEL.md` — tables/relations/migrations;
- `docs/09_SECURITY_PRIVACY.md` — threats/data/permissions;
- `docs/10_OPERATIONS.md` — config/deployment/runbook;
- `docs/11_TESTING.md` — evidence strategy;
- `docs/12_ROADMAP.md` — gap/decision/milestone;
- `docs/13_TRACEABILITY.md` — requirement-to-test mapping;
- `CHANGELOG.md` — dated summary.

Do not copy temporary facts into multiple files without a clear owner. Prefer links and
one canonical definition for thresholds, routes and table inventories.

---

## 21. Required AI Response Format for Project Work

When handing work back, use a compact evidence-based structure:

```text
Outcome
- What now works or what was determined.

Changed
- Repository/file groups and contract/process/screen effects.

Verified
- Exact commands/tests and pass/fail counts.

Not verified
- Integration, device, provider, staging or production checks not performed.

Risks / follow-up
- Migrations, configuration, compatibility, rollout and open decisions.
```

Lead with the outcome. Do not force the reader to infer whether the task was completed.

---

## 22. Compact Mental Model

If context is limited, retain these truths:

```text
Core owns identity and money.
GotIt Backend owns learning truth.
Web and Chrome are untrusted clients.
PostgreSQL constraints and transactions protect integrity.
Provider output is untrusted and conditional.
The user confirms meaning; the server confirms learning.
Retries require stable identities and receipts.
Code proves implementation; evidence proves verification; deployment proves only itself.
Preserve dirty work and update the specification with every material change.
```
