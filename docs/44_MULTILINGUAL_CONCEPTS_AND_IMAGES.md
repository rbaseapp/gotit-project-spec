# 44 — Multilingual concepts and shared study images

Date: 2026-10-16. Status: released to main and deployed; exact production evidence and verification limits are recorded below. This document owns the feature contract. Earlier local-check paragraphs describe pre-release phases.

## Outcome and scope

FR-CON-01: staff can associate expressions in any supported BCP-47 language with one reviewed lexical meaning. FR-CON-02: all uniquely matched expressions use one persistent image per application/concept/image revision, independent of language pair, learner and configured provider model. FR-CON-03: staff can manage meanings, translations and image lifecycle in Admin. Saving a concept does not create learning items, transfer mastery between languages or award evidence/XP.

`apple / תפוח / تفاحة / עפּל` can all identify the apple-fruit concept. Apple the company is a different meaning. Equivalence is curated, not inferred from identical spelling or provider-generated sense keys. There is no automatic grouping of the complete historical vocabulary catalog. The starter migration inserts the reviewed apple-fruit meaning in applications with existing product profiles, with English, Hebrew, Arabic, Yiddish, German, French, Spanish, Russian and Chinese expressions. New applications and further concepts are managed through Admin.

## Identity and resolution

The Backend owns three additive `product_gotit` tables in migration `1792191000000_multilingual-concepts.js`:

- `lexical_concepts`: application scope, immutable key, title, definition, visual description, optional reviewed English stock query, active/disabled status, optimistic revision and image revision. `is_seed` distinguishes untouched starter data for rollback protection.
- `concept_expressions`: application/concept foreign key, canonical exact language tag, display expression and capture-compatible NFKC/lowercase/whitespace-normalized lookup text. A concept requires at least two distinct languages; normalized duplicates within a language are rejected. Homonyms may belong to multiple concepts.
- `concept_image_assets`: one row per `(application_id, concept_id, image_revision)`, bounded binary data, provider/model/source attribution, generation claim token and expiry. Its composite foreign key preserves application boundaries.

Resolution intersects the concepts containing the exact source-language/expression and the exact translation-language/expression. Exactly one active result is required. Zero or multiple candidates retain the existing lexical-image path. No locale-base guessing or English pivot translation is performed. Existing learning item IDs, signed capture selections, semantic revisions, attempts and language-specific learning state are unchanged.

## Image lifecycle

Practice study images and catalog unit image GET/POST consult concepts before legacy per-item/per-pair images. A matched concept takes precedence over old lexical images. Read-only catalog GET returns its cached image or null and never calls a provider. A missing concept image can be created by the existing image provider in a learner request or explicitly through Admin. The curated visual description replaces incidental source context; private captured sentences are not shared or stored in the concept cache. An optional staff-approved English `stockSearchQuery` (up to 100 characters; stored as `stock_search_query`) retains the existing stock-first provider policy and tag relevance checks. Empty search skips stock lookup and uses illustration generation. The seeded apple has `apple fruit isolated`. Cached images remain available without any provider.

Image bytes and attribution are shared; alt text remains the requested source expression. Provider/model changes do not regenerate a concept image. Adding languages, renaming a concept or changing aliases keeps the image. Changing the definition/visual description/stock query or explicitly resetting it increments the image revision. Old media is retained but no longer used by current resolution. Disabling a concept prevents shared resolution and cached retrieval for it.

A persistent five-minute claim prevents simultaneous language pairs/processes from creating duplicate paid work. Generation occurs outside database transactions. A competing request returns cached data if ready, otherwise null; retry after the first request finishes. Failed generation releases its claim; a crashed worker's claim expires. Publication checks the current active image revision and claim token, preventing stale workers from publishing after a semantic edit. Practice also rechecks the learner item's revision before returning generated concept media. As with the existing providers, paid work interrupted after provider completion and before durable storage cannot guarantee exactly-once billing.

## Admin contracts and screen

SCR-ADM-CON: **מושגים ותמונות / Concepts** offers search by concept or expression, create/edit, multilingual expression rows, active/disabled selection, current image/attribution preview, image reset and quick explicit stock/AI replacement actions. The Hebrew guide explains ambiguity and when regeneration is necessary. The UI preserves the existing locked-editing notices and five-minute authenticator flow.

| Method | Backend route | Contract |
| --- | --- | --- |
| GET | `/api/v1/admin/concepts` | Existing strict paging/search/sort; list metadata, expression count and hasImage; no binary payload |
| GET | `/api/v1/admin/concepts/:id` | Scoped detail, expressions and current image or null |
| POST | `/api/v1/admin/concepts` | Strict operationId, reason, expectedRevision:null, resetImage, document |
| PATCH | `/api/v1/admin/concepts/:id` | Same envelope; current numeric expectedRevision; immutable key |
| POST | `/api/v1/admin/concepts/:id/generate` | Strict operationId, reason, expectedRevision; ensure current image, reuse existing bytes |

The document contains key, title, definition, visualDescription, status and 2–200 `{languageCode,text}` expressions across at least two languages. Reads require independently verified administrator access. Every write/action requires Core-owned `content.write` and MFA, plus owner-side validation, optimistic conflicts, audit reason and persistent operation receipts. Audit resource is `concepts`; actions are `concept.save` and `concept.image.request`. Image requests are audited before external work, then complete outside the short command transaction. Retrying the same operation/payload ensures the same cached image. Changed payloads conflict; provider unavailability returns `CONCEPT_IMAGE_UNAVAILABLE`, never simulated success.

Admin's gateway has fixed concept resource paths and strict commands. Only concept, word and word-image detail responses allow up to 4.3 MB to accommodate the existing 3 MB binary limit encoded in JSON; all ordinary responses retain the 1 MiB bound. The generate action retains the existing explicit 120-second gateway deadline. No new browser credentials, direct DB access, Core changes, Web/Chrome request fields or learner API response fields are introduced.

## Rollout and operations

Apply the additive migration with the explicit GotIt migrator credential before deploying the new Backend; startup does not migrate. Deploy the Backend before the Admin UI so capability discovery remains accurate. Existing runtime grants must cover the three new product tables; updated preflight checks their required columns. The down migration refuses rollback when authored/edited concepts or image work exist. Prefer application rollback retaining schema/data; never discard authored concepts to make a production rollback pass.

Release preparation used isolated worktrees from current remote main, preserving the already-published program editor and learner-details releases. Original user-owned working trees were retained. The production migration/deployment record below supersedes earlier local-only status.

## Evidence and traceability

FR-CON-01 → concepts schema/service and composite FKs → normalization, exact-pair intersection, ambiguity, cross-application isolation and two-language validation tests.

FR-CON-02 → `ConceptImagesService`, PracticeService and WordPackStudyService → PostgreSQL tests for four languages sharing identical bytes, service restart, provider-free reads, concurrent claims, failed claims, semantic reset/stale publication and preservation of learning state.

FR-CON-03 → ConceptAdmin/owner routes, Admin resource allowlist, ConceptEditor and guide → permission/MFA/replay/conflict/audit tests, fixed gateway route/body/size tests, and local browser edit/save and desktop/mobile screenshots. UI fixtures never call external services.

Verification is local: Backend fast tests/typecheck/build; real disposable PostgreSQL regressions; Admin check (typecheck, gateway tests, build). Final local checks passed: 239 Backend fast tests, 103 PostgreSQL integration tests and 46 Admin gateway/config tests; Backend/Admin typecheck and builds passed. The final claim-publication query was then rechecked with all 8 focused concept integration cases. Browser checks covered create and edit/save at desktop and 390px mobile widths with zero console errors; artifacts are in `gotit-admin/output/playwright/concepts-*.png`. The existing Admin bundle-size warning remains. Paid provider quality and authenticated deployed acceptance remain unverified.

## All-user vocabulary and quick image replacement — 2026-10-16

This follow-up implements FR-CON-04 (browse every user's saved word in every language within the trusted application), FR-CON-05 (inspect recorded word details and paginated translations/examples/occurrences/tags), and FR-CON-06 (replace a reviewed meaning's image through an explicit stock or AI source). SCR-ADM-WORD adds a Hebrew responsive card list with lazy image reads, text/translation search, exact BCP-47 source/translation language filters, user UUID filter and all/non-deleted/deleted/unlinked filters. Each card represents a learner item; matching words from different users remain distinct records. Detail puts image actions first, followed by word properties and histories. Unlinked words can open concept creation with the source and primary translation prefilled, or search existing concepts. Staff still reviews the meaning and adds equivalent language expressions; historical words are not automatically merged.

P-ADM-CON now runs: search/filter vocabulary → inspect meaning → authorize image replacement → reserve an unused image revision → fetch provider output outside the transaction → atomically publish if the meaning revision still matches. A stock replacement is one action after opening the word; AI opens an editable prompt and requires one further action. Existing content permission and authenticator verification remain mandatory. Audit reasons default to the explicit chosen action. The image editor is also used on the existing concept edit screen. Provider availability is returned as `imageSources: {stock,ai}` in concept detail and unavailable actions remain visibly disabled.

| Method | Backend route | Contract |
| --- | --- | --- |
| GET | `/api/v1/admin/words` | Strict existing paging, plus optional q/sourceLanguageCode/translationLanguageCode/applicationUserId/state; state=all is default. Sort allowlist: id/sourceText/sourceLanguageCode/translationLanguageCode/applicationUserId/createdAt. Metadata only, no image bytes. |
| GET | `/api/v1/admin/words/:id` | Application-scoped lexical/learning properties and the unique active concept, expressions and current shared image when matched. |
| GET | `/api/v1/admin/word-images/:id` | Cached concept image, otherwise a current-revision item image or null. Never generates an image. |
| GET | `/api/v1/admin/words/:id/:section` | Strict translations/examples/occurrences/tags allowlist; independently paginated data/total. Historical translations and examples remain inspectable. |
| POST | `/api/v1/admin/concepts/:id/regenerate` | operationId, reason, expectedRevision, source=stock\|ai, optional prompt (500 chars), searchQuery (100 English chars). Success returns data with id, revision and imageRevision. |

Admin routes are `/admin-api/resources/words`, `/admin-api/resources/word-images/:id`, `/admin-api/words/:id/:section` and the existing fixed concept action routing for `regenerate`. Ordinary response bounds remain 1 MiB; word, word-image and concept detail may use 4.3 MB. Regeneration has the existing 120-second action deadline. The old `/generate` ensure-image contract remains supported for compatibility.

The explicit source never falls back to another source: stock uses the configured Pixabay adapter, preserves relevance/safesearch/attribution and excludes the currently published photo URL; AI calls the existing OpenAI adapter with the reviewed definition plus the edited visual prompt and no captured user context. A missing source or unsuitable/no provider image returns `CONCEPT_IMAGE_UNAVAILABLE`. Existing server quota, prompt configuration and measured OpenAI usage remain in effect. Credentials stay server-side. No new external recipient, collected data category or retention policy is introduced; administrator reads expose already-stored scoped capture context.

No new migration is required beyond the existing concepts migration `1792191000000`. Replacement reserves a null-data row in `concept_image_assets` with an unused revision and a persistent command receipt. Current concept/image pointers remain unchanged during generation and failure. A five-minute claim and per-concept advisory claim lock prevent simultaneous replacement work. Publication locks the concept, checks its active status/revision and the claim token, stores validated bytes/attribution, advances the concept revision/image pointer and writes `concept.image.published` audit in one transaction. The request audit is `concept.image.replace`. Semantic resets allocate beyond all reserved revisions, avoiding collisions with unfinished requests. Failed claims release for retry; placeholders and previous images are retained under existing retention. Completed same-operation retries return the original reservation result without another provider call or overwriting later edits. Changed payloads conflict. A lost provider response before storage can still incur another paid call on retry; exactly-once external billing is not claimed.

Traceability: FR-CON-04/05 → WordAdmin + owner/gateway routes + Words UI → scoped PostgreSQL search/language/user/deletion/paging and section tests, gateway fixed-route/unknown-field tests. FR-CON-06 → regenerateConcept + ConceptImage + Pixabay exclusions → MFA/permission/replay, shared multilingual bytes, pending/failure retention, stale publication, revision allocation, audit and stock exclusion tests. Sequence: [all-user words and replacement](../uml/seq_admin_words.puml).

Locally verified in the existing dirty Backend/Admin working trees: 241 Backend fast tests; 37 focused PostgreSQL cases across admin-words, concepts and admin-operations; 48 Admin tests (gateway/config plus real production query-decoder bundling); typechecks and builds. Browser fixture checks cover word browsing, stock replacement, edited AI prompt submission, prefilled concept creation and mobile layout. No paid provider calls, shared/live migration, deployment or production acceptance was performed. The existing Admin bundle-size warning remains. Deploy matching Backend before Admin; configure the existing PIXABAY_API_KEY / OPENAI_API_KEY and OPENAI_IMAGE_MODEL for the required sources. Existing unrelated in-progress changes remain preserved and retain their own rollout prerequisites.


Browser follow-up: language filtering reproduced a pre-existing query-string 7 / ESM decoder namespace crash. A narrow build/dependency-optimizer interop plugin preserves the installed patched decoder version and normalizes its default export. A real Vite production-bundle regression covers Hebrew/Arabic filter roundtrips and paging. Final browser QA also checks filtered/deep-linked reload, empty results, explicit read-error recovery, 320px/390px layouts and zero horizontal overflow. No dependency versions were changed.


## Production release ? 2026-10-16

The user explicitly authorized publication and deployment to main. Isolated release worktrees were based on current remote main rather than dirty historical local branches; the existing published program editor and learner details remain included. No unrelated Core/Web/Chrome service was deployed. Original user-owned working trees were preserved.

| Component | Exact main commit | Deployment evidence |
| --- | --- | --- |
| Backend | `424c149a076964c0453a2c2b844c0dbe66e822fa` | Render `srv-dak3h50jo6nc73bc43h0`, `dep-db8vvj3l550s73fd2ckg`; manual exact-commit deployment initiated at 13:43 Jerusalem succeeded; production `/health` and `/ready` returned 200, database ready. |
| Admin | `029ccf945bab01bf31002b748f56d7d18c19672e` | Render `srv-db8jhsdfii8s739jaji0`, `dep-db9004jbc2fs73ccsm9g`; manual exact-commit deployment Live at 13:45 Jerusalem. The Render workspace groups this existing service under dev; its deployed gateway is the existing production-data Admin target. HTTP 200 serves `index-Brldv-Nh.js`, matching its build. |

Existing manual-deploy policy was retained. Backend deployed before Admin. OpenAI/Pixabay server credentials were already configured; no key values were exposed or changed.

Before migration, a validated custom PostgreSQL archive backed up `product_gotit` and `gotit_migrations`: 25,610,969 bytes, 404 archive entries, SHA-256 `4773dd644ec5d28a99530bc8bf6f8fe7921e6aad80d5db58793b47f6a9b1bc81`. The archive/report remain in the original Backend ignored `.local-backups` directory, outside Git. The dedicated migrator applied the only pending migration `1792191000000`; runtime preflight confirmed schema and product-only privileges. Readback found one starter concept, ten expressions and zero generated concept images. Read-only normalization audit covered 264 learning items and 324 translations with zero mismatches. Runtime migration-metadata isolation was retained. Roll back application code while retaining this additive schema if necessary; do not execute destructive down migrations.

Release-worktree quality gates: Backend typecheck/build, 241/241 fast tests, 109/109 disposable PostgreSQL integration tests against pinned Core `3c99ec6130140b37adb2e4ee83b51b6a004cacbf`, repository-wide format check and Docker build passed. Admin check passed with 48/48 tests; production dependency audit reported zero vulnerabilities. The existing 1.35 MB Admin client bundle warning remains.

Admin [GitHub CI #12](https://github.com/rbaseapp/gotit-admin/actions/runs/38889147135) passed. Backend [GitHub CI #130](https://github.com/rbaseapp/gotIt-backend/actions/runs/38888660633) passed formatting, typecheck, all fast tests and build, then failed fetching the private Core repository (`Repository not found`); integration and Docker CI steps did not execute. Their full local gates passed against the identical pinned Core commit. Restore the intended existing read-only `CORE_PLATFORM_READ_TOKEN` access for hosted CI; no permissions or security boundaries were broadened to hide the failure.

Authenticated production acceptance on `https://gotit-admin.onrender.com/#/words`: all 264 learner items loaded, saved image reads displayed existing cached images, source-language `en` filtering returned 225 items, filtered URL reload worked, empty search state displayed, and a real word detail loaded lexical/learning fields plus independently paginated translations/examples/occurrences/tags. Editing remained locked behind the existing authenticator flow. No browser console errors were observed. The seeded multilingual concept editor loaded ten expressions and displayed the stock/AI actions locked by MFA. Screenshot: local `gotit-admin/output/playwright/words-production-list.jpg`. Relative Markdown links resolved and the new sequence passed PlantUML `-checkonly`.

No paid Pixabay/OpenAI generation or live shared-image replacement was executed during release acceptance. Provider quality/billing acceptance and an authenticated write after MFA are separate from the verified deployment; local fixtures and transactional integration tests cover replacement behavior. No learner data was changed beyond the additive migration and reviewed starter concept.

Documentation publication limit: the release specification is committed in the isolated local specification worktree. Its Git push could not obtain an existing local credential, and the connected GitHub integration returned 403 for repository writes. No access was broadened. Backend/Admin main publication and live deployments above succeeded independently.
