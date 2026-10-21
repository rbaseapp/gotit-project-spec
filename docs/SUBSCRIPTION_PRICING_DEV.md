# Subscription plan selection ? DEV, 2026-10-22

Owner: Web. P14 / UC-08 / SCR-13 / FR-BILL-007.
Reference: https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-2a786bd673d2.

The authenticated `/billing` page follows the selected Pricing artboard: mascot header, annual-default period selector, three subscription cards with a highlighted recommendation, assurance row, expanded comparison table, green tutor-minute panel and four expandable FAQs. The existing application header and real account state are retained.

## Commercial truth and behavior

Core's active catalog owns names, prices, intervals, minute allowances and entitlements. Current families are Pro, AI Tutor 60 and AI Tutor 3x/Week, with a separate one-time 60-minute pack. Free remains current-status-only; no invented selectable Free offer or extra packs are shown. Missing periods are explicitly unavailable; a quarterly selection cannot silently buy a monthly Pro plan.

Paddle PricePreview supplies localized totals and currency. Monthly equivalents divide the selected period total by 1, 3 or 12. Full period charges are shown separately. Savings compare matching family/currency/source monthly quotes. Currency minor-unit precision uses Intl rather than assuming cents. Invalid/incomplete previews fall back to catalog pricing; final taxes and total remain in Paddle. No illustrative 15% pack discount, monthly minute reset or unconditional refund promise is copied from the artboard.

Existing subscriptions use the hosted customer portal for changes/cancellation. New subscriptions and packs retain server-created transactions, checkout idempotency and Paddle overlay flow. Minute banks and balance stay server-authoritative. Loading, empty, unavailable interval, offline, API/portal/checkout errors and retry states are explicit; mutations remain disabled when authoritative status/catalog is unavailable. Successful checkout reloads status and minute balance.

No API, schema, entitlement, gateway, provider configuration or Core/Backend behavior changes. No migration. Hebrew and English copy are authored; the other six supported locales use the existing English fallback for the added pricing copy, with their existing billing translations preserved. RTL/LTR, 320px stacking, keyboard-native disclosure controls and reduced motion are supported.

## Evidence and rollout

Isolated Web branch: `feat/subscription-pricing-dev-20261022`, based on deployed DEV commit `fdb5ac63db6903b744b1cd90591690fb071a2f89`, rather than the older `origin/dev`. Unrelated dirty worktrees remain untouched.

- Typecheck, ESLint, production build and 23 gateway/security tests passed.
- 20 focused billing/checkout/Paddle/localization tests passed (14 billing/provider cases plus 6 localization cases).
- Full fast run: 429/430 passed; one English-path DOM wait failed under parallel load. All 29 tests in that file passed separately on both baseline and changed tree. A repeated single-worker full run stalled and was stopped. Do not report the complete `npm run check` as passed.
- Browser comparison and 320px RTL checks: see Web `design-qa.md` and `output/pricing-evidence/`. Local fixture checks do not establish live payments.
- Full responsive suite, real payment completion, physical devices and DB integration were not run; no DB or provider contract changed.
- DEV deployment: Render `dep-dbck1r29lscs73e5liv0`, Live at `d9d11230ea19f9bb463c031c5ae6423bdaa81823`, completed 2026-10-22 01:48:11 Asia/Jerusalem. [Deployment](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-dbck1r29lscs73e5liv0).
- `/ready` and `/billing` returned 200, served billing chunk `BillingPage-DMH-PNIc.js` contains the new component.
- Authenticated DEV browser: real Core catalog/status/minute balance and localized Paddle ILS quotes loaded; month/quarter/year switching and quarterly Pro disabling passed. Console: no errors/warnings. Existing subscription actions remain portal-based. No checkout/payment submitted during live acceptance.
- Local evidence is in Web `output/pricing-evidence/dev-deployment.json`, `dev-acceptance.json`, `dev-pricing.png` and `design-qa.md`. Account screenshots remain local, not published to Git.

Rollback: redeploy `fdb5ac63db6903b744b1cd90591690fb071a2f89` to the same DEV frontend service. Production rollout is outside this release.
