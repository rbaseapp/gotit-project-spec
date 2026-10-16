# 42 — Settings design in DEV

Owner request on 2026-10-14: replace the settings page with the supplied Hebrew
reference. Owner explicitly selected the existing supported settings scope;
server-side email change, avatar upload and provider-account linking are excluded.

FR-SETTINGS-DEV-001 / SCR-11: `/settings` defaults to account/profile. Nine localized
categories expose profile, languages, teacher, goals, interface/accessibility,
extension guidance, notifications, privacy/security and subscription destinations.
Existing `#learning`, `#private-lessons`, `#interface`, `#notifications` and
`#reminders` entry points are preserved. Shared application chrome stays canonical.

FR-SETTINGS-DEV-002: timezone writes use the existing authenticated product profile
API. Display-name edits retain the current tab-local behavior with an explicit
label. Email is Core identity truth. Provider connection status is unavailable,
never inferred from a configured OAuth client or current email. Unsupported
email/avatar actions explain availability without a mutation.

FR-SETTINGS-DEV-003: settings editors load only the selected teacher/notification
resource and save only the relevant category. An initial resource error disables
save and offers retry. Profile errors block profile mutations. Failed saves retain
the draft. No cross-category write is triggered by saving notifications or teacher
preferences. Help/billing/privacy/transfer use existing destinations.

UC-SETTINGS-DEV-001: authenticated learner opens settings, chooses a category,
edits a supported preference and explicitly saves. Errors preserve inputs; retries
stay in the same category. Account dialogs use shared keyboard/focus restoration.

NFR-SETTINGS-DEV-001: modular page/profile/model plus existing editors; eight
locale catalogs, RTL/LTR and 320px layouts. Mobile uses a horizontally scrollable
category strip. Existing brand assets and library icons are bundled locally.
No new dependency, API contract, schema, migration, permission or provider cost.
Identity/billing remain Core-owned and learning remains Backend-owned.

Web checkout `../gotIt-front-settings-dev`, branch
`feat/settings-design-dev-20261014`, base DEV `2fa495a`.
Gate is DEV hostname or explicit loopback preview. Production retains the old view.
Rollback is the previous live DEV Web `edfdb63c3d64a6684cf09891fd980815940e2b0d`.

Local validation: 358 Vitest cases/59 files, 21 gateway/security cases, typecheck,
ESLint and build. Eight new regressions verify rollout/anchors, provider truth,
profile failure, failed timezone retry, notification reload and isolated saves,
and native locale content. Browser desktop Hebrew/320px Hebrew and English,
local-demo save and navigation pass without document overflow; client/scroll
305/305px at mobile width. No final browser error/warning logs. Existing large
bundle warning remains. Full historical Playwright sweep, physical devices and
live identity/provider writes were not performed. No DB suite is required.

Traceability: FR-001 -> settings-design hash/navigation + browser inspection;
FR-002 -> settings-design profile/provider/failure cases; FR-003 ->
settings-section-save resource retry/isolation; NFR-001 -> locale/rollout cases
and RTL/LTR browser evidence. Web `docs/settings/README.md`, `design-qa.md` and
`docs/settings/evidence/` own implementation and visual evidence. Deployment is
reported separately; local checks alone do not establish DEV live acceptance.

## DEV release - 2026-10-14

Web `71dba25204f3dbed69ab00296590b566731c831f` is Live on service
`srv-dar6dng473hc73a0ns1g`, deployment `dep-db7o6fu7bikc73biu66g` (1m03s).
Render reports Deploy succeeded / Live; `/ready` returns 200. Authenticated
account/profile, actual learning controls, notification preferences and teacher
preferences load successfully. Both remote editors enable save after the read.
Email-availability modal opens/closes; all four page images load, nine navigation
categories exist, and desktop document client/scroll widths are 1905/1905. No
browser error/warning logs. Live preference/provider/identity writes were not
performed; mutation/failure behavior is locally tested. Auto-deploy is disabled
and the configured service branch is unchanged. Production and all non-Web
services were not deployed. Web `docs/settings/evidence/release.json` owns exact
release evidence; live account screenshots are kept locally, not published.
