# 26 - Practice language isolation

## 2026-10-05 - Backend source checkpoint

Source: `gotIt-backend@e5f4817b8544b95da739ce4f462e95f50b99689c`. Status: implemented, locally verified and integration verified; production deployment pending.

Incident: the authenticated production Learn screen selected English but showed Arabic expressions such as `إليك` and `عناوين`. Read-only inspection of those specific displayed items found `source_language_code=en`; this was mislabeled vocabulary, not evidence that the existing language query parameter was ignored. A separate Web loading race can overwrite a stored language selection with the profile default before languages arrive. Its repair is currently in the Web working tree and is not yet committed or deployed.

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
