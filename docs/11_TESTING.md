# 11 — אסטרטגיית בדיקות ואיכות

## 1. פירמידת בדיקות

| שכבה | מטרה | דוגמאות |
|---|---|---|
| Unit | חוקים טהורים וקצוות | scoring, policy, normalization, state machine |
| Contract/HTTP | route, validation, status/errors | Supertest, gateway tests |
| Integration DB | constraints/transactions/isolation | PostgreSQL אמיתי |
| Component | UX/state/accessibility | Testing Library |
| Browser/E2E | routing/layout/browser APIs | Playwright/manual Chrome |
| Live acceptance | providers, OAuth, billing, deploy | staging/production checklist |

## 2. Core Coverage חובה

- application context ו־cross-product rejection.
- register/login generic errors, password hash parameters.
- Google web/extension audience ו־Facebook app binding.
- verified email linking ואי־קישור בין applications.
- JWT claims, expiry, wrong audience/application.
- refresh rotation, replay, expiry, logout, disabled user.
- role מהמסד.
- billing plans/status/trial/grace/cancel.
- checkout idempotency.
- webhook signature, duplicate, failed retry, stale event.

## 3. Backend Coverage חובה

- malformed/large JSON, CORS, request ID, rate limit.
- Core unavailable/invalid identity ו־client spoof rejection.
- profile defaults/transaction/isolation.
- capture languages, provider failures, token tampering, senses, receipts.
- library pagination/filter/sort/edit revision/bulk/tags/restore.
- pack install/link/remove invariants.
- exercise secrecy/expiry/ownership/revision/consume.
- server scoring בכל mode, attempt replay ו־transaction rollback.
- mastery thresholds, calendar days, demotion, enabled skills.
- XP cap/ledger/streak/timezone.
- reading target binding, repair, token, quota reserve/release.
- speech WAV validation, no storage, provider mappings.
- image relevance/cache/attribution/fallback.
- private lesson prompt/setup/preferences/roadmap/summary/evidence/isolation.
- export cursor/import partial/idempotency.

## 4. Frontend Coverage חובה

- token hydrate/refresh concurrency/expiry/logout.
- strict parsing ו־localized error codes.
- live/demo separation.
- capture payload lock, sense selection ו־retry ID.
- library pagination/actions/modal focus.
- exercise rendering/submit/reconnect/no client scoring.
- microphone permission/track cleanup.
- reading Unicode ranges ו־publication state.
- Paddle config/checkout return states.
- legal routes, deep links, gateway allowlist/security headers.
- RTL/LTR, keyboard, reduced motion ו־responsive matrix.

## 5. Extension Coverage חובה

- context extraction boundaries.
- message parser reject unknown/extra/malformed payload.
- capture state transitions/error recovery.
- auth refresh/storage/logout/Google cancel.
- safe retry status and stable UUID.
- settings migration/sync/optional content registration.
- inline/popup i18n, direction, size/theme.
- generated manifest permissions, key rules ו־package contents.

## 6. Test Data

- synthetic emails/domains בלבד.
- UUIDs deterministic כשנדרש.
- provider/OAuth fakes ב־CI; אין live call.
- DB חדש לכל integration suite או schema/database מבודד.
- test role נפרד מ־admin/migrator.
- cleanup מאומת גם בכשל.
- fixtures כוללים Unicode, RTL, emoji, combining characters ו־long text.

## 7. Quality Gates

PR לא עובר אם אחד נכשל:

1. typecheck.
2. lint/format לפי repo.
3. unit/contract tests.
4. build production.
5. integration tests לשינוי DB/domain.
6. gateway/extension package verification כאשר רלוונטי.
7. docs + traceability לחוזה/ארכיטקטורה.

Release מוסיף: dependency audit, migration rehearsal, browser/device matrix,
provider/OAuth/Paddle acceptance, smoke after deploy ו־rollback readiness.

## 8. בדיקות לא־פונקציונליות

- load: capture preview/save, queue, dashboard ו־Core auth.
- concurrency: duplicate captures/attempts/webhooks ו־pool exhaustion.
- resilience: Core/DB/provider latency ו־shutdown באמצע mutation.
- security: IDOR, header/origin/path, token replay, prompt injection, secret scan.
- accessibility: axe/manual keyboard/screen reader.
- cost: AI quota, image reuse, provider retries ו־lesson duration.

## 9. ראיות מצב

הקוד כולל suites בכל ארבעת המאגרים. מסמך זה אינו קובע pass לפי שמות קבצים;
תוצאת הרצה מתוארכת נרשמת ב־[13_TRACEABILITY](13_TRACEABILITY.md) וב־CHANGELOG.
בדיקות live אינן מוחלפות ב־mock או jsdom.

