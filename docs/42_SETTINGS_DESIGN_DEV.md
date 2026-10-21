# 42 — Settings design in DEV

## Current contract — 2026-10-22

The owner's new request supersedes the 14 October exclusions for profile photos,
persisted display names, provider status/linking and reminders. The reference is
[Claude Design, all nine settings tabs](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-defebb575c72).
Implementation spans isolated Web, Backend and Core branches
`feat/settings-live-20261022`. Chrome has no code or permission change.
Production retains the existing settings screen; this redesign is gated to
`gotit-dev.rbaseapp.com` and explicitly enabled loopback previews.

### Requirements and owner contracts

- FR-SETTINGS-LIVE-001: authenticated Core `GET /api/v1/auth/methods` returns
  `{methods:[{provider,connected,available}]}` in Google/Facebook/Email order.
  Linked OAuth identities and password credentials determine connection status;
  enabled provider configuration determines availability. Apple is absent.
- FR-SETTINGS-LIVE-002: Core `POST /api/v1/auth/methods/google` accepts `{idToken}`;
  `/facebook` accepts `{accessToken}`. Both require the current authenticated
  application/user, existing provider verification, and the same verified email
  as that account. Linking never logs into another account or replaces the session.
  Foreign-owned identities and email mismatch fail. Web allowlists exactly these
  three routes. Provider credentials remain in Core; public app IDs remain public.
  Email setup/password recovery uses the existing verified mailbox flow.
- FR-SETTINGS-LIVE-003: product `GET/PATCH /api/v1/profile` adds nullable
  `displayName` (1–80 characters on update) and `avatarData`. The browser accepts
  PNG/JPEG up to 2 MB, decodes/crops to 256×256 JPEG and removes metadata before
  explicit Save. Server accepts bounded PNG/JPEG data URIs (maximum 180000 bytes,
  dimensions at most 512×512); null removes the photo. The authenticated profile
  stores the result and the shared account header displays it after reload.
  This does not change Core identity email; the email pencil explains that limit.
- FR-SETTINGS-LIVE-004: existing notification preference GET/PATCH adds `enabled`,
  `reminderMinute` (0–59), `reminderDays` (unique weekday numbers 0=Sunday to
  6=Saturday), `quietEnabled`, `quietStart/quietEnd` (local minutes 0–1439),
  `streakEmail/streakPush` and `weeklyEmail/weeklyPush`. Existing practice/system
  channel flags and `reminderHour` retain their meaning. Omitted fields survive
  partial updates. Profile IANA timezone is authoritative; no UTC/browser guess.
- FR-SETTINGS-LIVE-005: master switch, daily time/days, the four-by-two channel
  matrix and overnight quiet hours load/save real product preferences. Initial
  failure exposes retry without writable defaults; failed saves retain drafts.
  Push permission/subscription is requested only for a newly enabled Push channel.
  New channel consents default false, and upgrading preserves existing consents.
- FR-SETTINGS-LIVE-006: nine category compositions replace legacy editors in DEV.
  Language/level/interests, daily goals, lesson preferences and interface settings
  use their existing owner APIs. High contrast and text direction join persisted
  learning preferences. Password reset, transfer/history, help and billing portal
  use actual destinations. UI does not invent billing, extension installation or
  connection data. Teacher focus/mix/personal goals belong in Goals and Practice.

### Scheduling, delivery and privacy

The existing Backend worker runs every minute. Practice reminders require due
items and no practice that profile-calendar day. Streak alerts require practice
yesterday and none today. Weekly progress notifications require recent activity
and occur on Sunday. These kinds respect selected reminder days, time, master
switch and quiet window, including overnight windows. System notices remain
event-driven and respect consent/master/quiet hours. Occurrence keys, leases and
delivery outcomes prevent duplicate dispatch; a provider uncertainty is recorded
without automatic replay. The weekly message is currently a progress link, not
an emailed statistics report.

Resend is supported with `NOTIFICATION_RESEND_API_KEY` and
`NOTIFICATION_EMAIL_FROM`; existing SMTP remains supported. Links use
`NOTIFICATION_APP_URL/learn`. Web Push uses existing VAPID/subscription contracts;
missing/expired subscriptions cannot be marked successfully sent. Browser service
worker notification clicks also navigate to `/learn`. Capability availability
proves configuration, not mailbox delivery or OS permission.

No provider email, token, subject, key or secret is included in method responses.
Profile image bytes are private owner data, served through the authenticated
profile API; they are not uploaded to a public media host. No existing learner's
preferences, password, subscription or notification permission was changed in
release acceptance.

### Migration and operations

Backend migration `1792645000000_settings-profile-and-reminders` adds profile
columns and notification columns/checks; it creates no additional table. Apply
with the dedicated `GOTIT_MIGRATION_DATABASE_URL`, before deploying Backend.
The down migration removes the new fields and suppresses pending new delivery
kinds, preserving historical delivery audit rows. Do not run down on a live
environment as application rollback: retain additive schema and forward-fix.

DEV migration was applied to verified database `gotit_dev` with TLS verification.
DEV mail and VAPID configuration was added server-side. DEV Facebook provider and
its existing application secret were configured using the current public Meta
app; production configuration was read only and was not changed. Normal provider
login/linking still depends on the provider's origin policy and user consent.
Auto-deploy and configured service branches were not changed.

### Verification and evidence

Backend: typecheck/build and 331 fast tests passed; 12 focused profile/notification
PostgreSQL integration cases passed on disposable data. An additional disposable
down/up migration rehearsal preserved legacy consent and sent delivery audit,
suppressed pending weekly events, and restored safe defaults on reapplication.
It ran no down migration in DEV. Core: typecheck/build and
35 tests passed, including application scoping, verified proof and link conflicts.
Web integrated the concurrent DEV program-map release `10e7c9d`; typecheck, lint,
425 cases in 68 files, build and 23 gateway/security cases passed. Existing bundle
size and dependency annotation warnings remain. Four isolated Playwright cases
cover all nine categories at 1920/320px, zero horizontal document overflow/page
errors, actual PNG decoding/photo preview/save, and keyboard reminder controls.

Live acceptance uses a disposable DEV fixture, normal password login and the
deployed authenticated APIs. Both direct services and the public same-origin Web
gateway returned 200 for method reads, profile/name/photo write/read/removal,
notification configuration, and minute/day/master/quiet preference round trips.
All three methods report available; Email reports connected for the fixture and
Google/Facebook unconnected. Fixture sessions/profile/identity are removed in a
finally block. No real mail, Push or OAuth link was sent/performed. These provider
end-to-end checks and physical device receipt are not claimed verified.

Visual QA is partial against literal 1:1 fidelity: source and implementation were
inspected together and profile-card height, typography, spacing and teacher/goal
composition corrected. Existing branded/teacher illustrations remain; source
25-minute lessons/free vocabulary mix, recovery-email editing, logout-all,
history purge/account deletion, extension switches and inline billing invoices
are not all supported by current owner contracts. Current UI uses supported
controls/destinations rather than fictional success. This is **not** approval to
describe all nine tabs as pixel-identical. New strings are Hebrew/English with
English fallback in six other locale catalogs; complete native translations are
not claimed. Web `docs/settings/README.md`, `design-qa.md` and dated release
evidence own exact commits, deployment IDs and screenshots.

Traceability: FR-001/002 -> Core auth-methods tests + Web settings-design tests;
FR-003 -> Backend settings-profile/profile integration + Web avatar/browser cases;
FR-004/005 -> Backend notifications/settings-delivery + PostgreSQL scheduling and
Web failure/retry/browser cases; FR-006 -> nine-category responsive browser sweep.
UC-SETTINGS-LIVE-001: open profile -> read true methods -> explicitly verify/link
provider or recover password; failed linking keeps the same account.
UC-SETTINGS-LIVE-002: choose photo -> decode/preview -> Save -> reload persisted
profile/header, or remove and Save. UC-SETTINGS-LIVE-003: read reminder config ->
choose consent/time/days/quiet hours -> permission if opting into Push -> Save ->
worker checks local calendar and consent before claiming/sending a unique event.

### Live DEV release — 2026-10-22

| Owner | Live commit | Render deployment |
| --- | --- | --- |
| Core | `4d8ec3efa0e1059aa6fb9eeb8dd0b4a5709f1e3c` | `dep-dbcjf3t9fdbs73a2o2pg` |
| Backend | `05411acd751af48b9c5993fc4985df229caa687e` | `dep-dbcjchnb9u1s73bsig6g` |
| Web | `fdb5ac63db6903b744b1cd90591690fb071a2f89` | `dep-dbcjjdgm7kps73bucnng` |

All three Render deployments are Live and `/ready` returns 200. Final authenticated
same-origin acceptance passed after the Web follow-up deployment; zero disposable
acceptance fixtures remain. Browser read-only acceptance confirms actual owner's
Google connected, Facebook/Email unconnected with connect actions, no Apple,
nine categories and loaded lesson preferences. Owner preference changes made
outside acceptance are not attributed to this release test. Backend test-only
follow-up `31b88ec` adds the passed migration rehearsal without changing runtime
source. [Sanitized release evidence](settings-live-dev-20261022-release.json).
Previous live runtime commits for code rollback: Web `10e7c9d`, Backend `9de2786`,
Core `bdef15e`; retain the additive schema and stable server keys on rollback.
No production service was deployed.

## Historical scope — 2026-10-14

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
