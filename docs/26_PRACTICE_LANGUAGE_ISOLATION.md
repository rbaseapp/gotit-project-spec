# 26 - Practice language isolation

## 2026-10-05 - Backend source checkpoint

Source: `gotIt-backend@e5f4817b8544b95da739ce4f462e95f50b99689c`. Status: implemented, locally verified and integration verified; production verified together with the Web source below on 2026-10-05.

Incident: the authenticated production Learn screen selected English but showed Arabic expressions such as `إليك` and `عناوين`. Read-only inspection of those specific displayed items found `source_language_code=en`; this was mislabeled vocabulary, not evidence that the existing language query parameter was ignored. A separate Web loading race can overwrite a stored language selection with the profile default before languages arrive. Its repair is committed and locally verified as `gotIt-front@e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0`; production verification is recorded below.

### Authoritative behavior

The existing exact BCP-47 `sourceLanguageCode` filter remains authoritative. Practice also rejects letters incompatible with the declared source script for the eight UI languages and the common additional source languages enumerated in `practice.language.ts`. Explicit supported script subtags override defaults. Arabic/Hebrew vowel marks, Latin combining accents, regional codes, punctuation and numbers remain valid. Unicode script checking is deterministic and makes no provider call. It cannot distinguish English from French, or Arabic from Persian, when they share a script; unsupported script/language mappings retain existing code-based behavior.

Filtering runs inside the existing scoped PostgreSQL queries before queue ranking and limiting. It applies to automatic sessions, explicit item/scope validation, old session study cards, images, exercise targets and additional multiple-choice distractors. A valid English word is not displaced from a limited queue by a higher-priority Arabic word mislabeled English. An explicitly selected incompatible item receives HTTP 400 `VALIDATION_ERROR`; empty automatic selections receive HTTP 409 `NO_ELIGIBLE_ITEMS`. Legacy study cards omit incompatible items, and an entirely incompatible legacy selection returns the same 409. A direct image request for an excluded item returns existing 409 `ITEM_INCOMPLETE`.

No schema, migration, environment, API payload, authorization, provider, scoring, learning-policy or XP change. Historical vocabulary and evidence are retained; this change does not silently relabel or delete them. Library language counts may still include mislabeled items, while practice excludes them. Repairing their actual language/sense should use the existing semantic-edit workflow rather than rewriting history directly. Rollback is the prior compatible source deployment, with no production down migration.

### Verification

- Backend: `npm.cmd test` 209/209; `npm.cmd run test:integration` 62/62 on disposable PostgreSQL; typecheck, build, changed-file Prettier and diff checks passed.
- Failure-first: the new English/Arabic incident integration regression fails against the original service, then passes with the fix.
- Regression covers filtering before limit, no fallback to another selected language, explicit rejection, new and legacy cards, excluded images, exercises/distractors and an entirely invalid legacy session.
- PostgreSQL cases cover native vowel marks, accents, regional language tags, Latin/Cyrillic/Han/Japanese/Korean, and `sr-Latn` overriding Serbian's usual Cyrillic script.

### Delivery

Deploy the exact Backend source to production Render `srv-dak3h50jo6nc73bc43h0`, then the validated Web fix to `srv-dal8smbm8hqs73fabfng`. Observe both exact Live SHAs and readiness, then run authenticated English and Arabic queue/study smoke. Deployment, served-version and functional evidence must be recorded below after observation.

## 2026-10-05 - Web source checkpoint

Source: `gotIt-front@e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0`. Preserve the stored selection through loading, failure and remount. Persist a fallback only after a successful language response; unscoped practice cannot start until the language resolves, with retry on error. Existing explicit item/pack/reading launches retain their scope. Learn resume links include the selected source language; active-session study cards are fetched and validated before displaying words or issuing exercises. An incompatible resume shows localized `game.languageMismatch` in all eight UI languages.

Verified on an isolated tree excluding concurrent email-auth changes: `npm.cmd run check` passed typecheck, lint, 179 Vitest tests, production build and 16 gateway tests. Fifteen practice-results, dashboard and vocabulary Playwright checks passed across desktop and mobile; changed-file Prettier and diff checks passed. Failure-first hook tests reproduced the old overwrite. Regressions include English selection with an Arabic profile default, pending/failed list, remount, removed selection, exactly one English session creation and Arabic resume rejection before memorization or exercises. Browser fixtures now provide the language list required by safe launch.

Backend deployment `dep-db1u2fu7bikc73bmt580` on `srv-dak3h50jo6nc73bc43h0` was observed Live at the exact source SHA on 2026-10-05. Backend `/health` and `/ready`, and Web `/ready`, returned 200. Authenticated English queue contained ten English words and Arabic queue three Arabic words. Web rollout and combined smart-session smoke were subsequently verified as recorded below.

## 2026-10-05 - Production verification

- Backend [Render deployment](https://dashboard.render.com/web/srv-dak3h50jo6nc73bc43h0/deploys/dep-db1u2fu7bikc73bmt580): `dep-db1u2fu7bikc73bmt580`, exact `e5f4817b8544b95da739ce4f462e95f50b99689c`, observed `Deploy succeeded|Live`, 37.5 seconds, 20:41:19 GMT+3.
- Web [Render deployment](https://dashboard.render.com/web/srv-dal8smbm8hqs73fabfng/deploys/dep-db1u7cbncjis73avbj5g): `dep-db1u7cbncjis73avbj5g`, exact `e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0`, observed `Deploy succeeded|Live`, 48 seconds, 20:51:45 GMT+3.
- Backend `/health`, `/ready` and `https://gotit.rbaseapp.com/ready` returned HTTP 200 after rollout. Served Web entry `index-CGrp06_4.js` references fixed `useLearningLanguage-I5vUJ_vx.js`, `LiveLearnPage-CEydTcTM.js`, `LiveGameSessionPage-DFBSrQFL.js`; public asset inspection found storage/list handling, language-bearing resume links and `game.languageMismatch`/source-language validation. Local and Render asset hashes differ by build environment, so exact release identity is established by Render checkout/Live SHA and behavioral smoke rather than claimed byte equality.
- Authenticated English selection survived a full reload. Queue and all ten smart-study source words were English: vague, abroad, child, find, use, gold, fertilizers, notably, violet, team. First drag/drop exercise used fertilizers, notably and team, with Hebrew meanings and no Arabic source expression.
- After selecting Arabic, queue and all three study words were Arabic: the three source expressions shown in the Arabic evidence image below. First drag/drop exercise used the same three Arabic sources with Hebrew meanings, and no English source expression.
- Both smoke sessions were stopped through normal confirmed Exit. History showed stopped, zero attempts and zero XP. No answers, learning evidence or scores were submitted. Selection was restored to English. Screen images include no account credentials or email.
- [English smart-review evidence](evidence/2026-10-05-practice-language/english-review.jpg) and [Arabic smart-review evidence](evidence/2026-10-05-practice-language/arabic-review.jpg) capture the observed first exercises. Automated tests cover the malformed legacy and cross-language resume cases; those historical cases were not recreated in production. Provider/voice/billing flows and the entire unrelated responsive suite were outside this change; fifteen affected browser checks were run.

Production verified for the selected-language queue, study and first exercise boundaries. Unsupported-script and shared-script ambiguity remains as stated above. Stored mislabeled vocabulary is retained and can be repaired separately using semantic edit. The Backend, Web and documentation source commits are on main; concurrent unrelated email-auth working-tree changes were excluded from this delivery.
