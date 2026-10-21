# 05 — מפרט Web Frontend

## Shared application header — 2026-10-12

### Persistent metrics during navigation

The owner observed goal/streak chips disappearing when navigating from practice
to My Words. `a3a3065` fixed the design and position but its page-owned portals
still unmounted the visible status bar on route changes; each new `useResource`
started without data. A React render alone does not require removing DOM nodes.

Web `03aa2ab2f89c9b082d5150f86fb3191f9cc2f8fa` replaces that portal lifecycle
with one shell-owned `PersistentLearningStatusBar`. `LearningStatusSource`
controllers publish existing data/actions through a stable context. A provider
retains the last successful server goal/streak while the next same-language
controller loads or fails. Resolved zero values replace the previous values.
Language changes discard old metrics; the provider resets by auth mode,
application and user. During controller gaps the language select is disabled;
page scope callbacks and entitlement rules stay with their owners. My Words tags
responses by language to prevent stale data being published under a new selection.
The selected language remains an option during language-list loading. No new
API, persistent metric cache, duplicated request or backend/schema change.

317 unit tests in 53 files, 20 gateway checks, lint and typecheck/build passed.
22 focused checks passed after the selected-option safeguard. Tests navigate
between distinct route controllers and assert bar/progress/streak DOM identity;
mutation records confirm no removal during pending refresh or controller gaps.
Additional tests cover zero, language isolation and authenticated-owner reset.
A browser fixture delays dashboard responses by 2000ms: all four route handoffs
retain the metrics, including observed dashboard/practice loading states.
[Pending navigation observations](evidence/2026-10-12-persistent-header/local-pending-navigation.json).

Exact commit `03aa2ab` is serving DEV after Render deployment
[`dep-db6jf10n74is73aa107g`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db6jf10n74is73aa107g)
reported `Deploy succeeded` (50.8s). Authenticated navigation across practice,
My Words, programs and Today retained one bar, 17/20 words and a 2-day streak.
Practice and My Words were explicitly observed while their page content was
loading with both header metrics still present. No console errors/warnings were
captured. `/ready`, the four routes and new `/assets/index-BD9WvqyD.js` return 200.
No scored answers/provider actions were submitted. Production/`main` are unchanged;
auto-deploy remains disabled. Previous live source/rollback is `a3a3065`.
[Release evidence](evidence/2026-10-12-persistent-header/release.json),
[live navigation observations](evidence/2026-10-12-persistent-header/live-navigation.json) and
[DEV screenshot](evidence/2026-10-12-persistent-header/dev-vocabulary.png).

### Owner correction: one fixed Today design

The initial `bf55d86` extraction reused code but kept different visuals, labels,
navigation orders and page CSS. The owner rejected that result and selected
the Today screen as the fixed design for every DEV shell screen.

Web `a3a3065f59302fc9021cc8c8dfc5ef0c40c51909` removes page variants from the
status bar and navigation, deletes the three page stylesheets' header overrides,
and gives `Topbar.css` sole ownership of the DEV header. `AppShell` hosts the
green bar immediately below the topbar, outside page padding/styles, through a
`LearningStatusTarget` portal. The three existing pages retain their data and
language callbacks; other shell routes get `DefaultLearningStatusBar` using
existing read projections. Selection changes synchronize mounted language
consumers. The common account menu retains Add word and its entitlement check;
safe return links appear in page content. Full-screen sessions keep their own
controls. No API, schema, Core or Chrome change.

314 unit tests in 52 files, 20 gateway checks, typecheck, lint and build passed;
19 focused checks passed after the last CSS adjustment. Local browser fixtures
cover dashboard/practice/vocabulary/programs at 1440px Hebrew, 320px Hebrew and
390px English. All 12 cases have identical topbar/status/language/account
rectangles and computed styles per viewport/locale, exactly one status bar,
no horizontal overflow and no negative header offset. The common stable
scrollbar gutter prevents page height from shifting the header horizontally.
Source reuse and verification contract: Web `docs/shared-app-header.md`.
Published to `dev` and deployed as exact Web `a3a3065` on 2026-10-12.
Render [`dep-db6hg2om7kps73dulqjg`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db6hg2om7kps73dulqjg)
reported `Deploy succeeded | Live` (65s). Authenticated DEV dashboard, practice,
vocabulary and programs have identical header/status/language/account rectangles
and computed styles, one status bar and no horizontal overflow. Live values are
17/20 unique words and a 2-day streak; no answers were submitted. No console
errors/warnings were captured. `/ready` and all four routes return 200. Served
CSS matches the local build by SHA256. Production and `main` are unchanged;
automatic deploy remains disabled. Rollback source is `bf55d86`.
[Release evidence](evidence/2026-10-12-uniform-header/release.json),
[live layout comparison](evidence/2026-10-12-uniform-header/live-layout.json),
[Today screenshot](evidence/2026-10-12-uniform-header/dev-dashboard.png) and
[My Words screenshot](evidence/2026-10-12-uniform-header/dev-vocabulary.png).

### Initial extraction and deployment (superseded visual variants)

Web refactor on `gotIt-front-mywords-dev`, integrated above DEV `85351ec`, extracts
`Topbar`, `TopbarAccountMenu`, `useTopbarAssessment` and `appNavigation` from
`AppShell`. Desktop/mobile brand markup and route definitions have one owner.
`DevDashboardPage`, `DevPracticePage` and `DevMyWordsPage` now render one controlled
`LearningStatusBar` and its shared CSS, with visual variants. Pages retain server
requests, selected-language persistence, URL scope, pagination and selection resets.
Header rollout gates, entitlement actions, safe return destinations, live/demo
separation and dedicated full-screen game controls remain as before. No API,
schema, Core or Chrome change.

The component contract and reuse example are in Web `docs/shared-app-header.md`.
Local typecheck, lint, production build, 311 unit tests using fork workers and
20 gateway tests passed. Browser fixtures compare old/new dashboard, practice and
word-page headers at 1440px Hebrew, 320px Hebrew and 390px English: no document
horizontal overflow and matching header/strip heights.

Published to `dev` and deployed on 2026-10-12 as Web
`bf55d8609da19007cd3e2064bbd5a092235b8e32`. Render deployment
[`dep-db6h5r0473hc73de2v5g`](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db6h5r0473hc73de2v5g)
reported `Deploy succeeded | Live` (49.2s). Authenticated DEV `/dashboard`, `/learn`
and `/vocabulary` each render one Topbar and one shared status bar with the correct
variant, live goal/streak/language data and no document horizontal overflow.
No console errors/warnings were captured. `/ready` and all three routes return 200;
served shared status-bar CSS matches the local build. No scored answers were submitted.
Production and `main` are unchanged; automatic deploy remains disabled. Rollback
source is the previous live Web `85351ec78823e34afef69a8e8bf3df7c1aa88917`.
[Release evidence](evidence/2026-10-12-shared-header/release.json) and
[DEV screenshot](evidence/2026-10-12-shared-header/dev-shared-header.png).

## 2026-10-07 — New-program pair correction

ProgramsPage requests the selected catalog pair, renders loading/error/retry
separately from unsupported pairs, and awaits saving that pair before opening
the prepared path. New-account and different-default regressions are included.
[Canonical contract and verification](31_LEARNING_PATH_FIDELITY_DEV.md#2026-10-07--new-program-language-pair-discovery).

## 2026-10-07 — Multilingual home illustration

Local Web working tree adds `LearningHero` to SCR-02 `/dashboard`. The original
English illustration is retained. Every four seconds, its book greeting, mug
caption and note caption rotate through English, Arabic, French, Spanish,
Chinese, Japanese, Portuguese, Russian, Hebrew and German. The original scene
is fixed; a shared textless asset is applied only within lettering masks and
self-hosted handwritten glyph subsets render the translations. Both hearts
remain in the original image. The English frame uses the exact original asset.

Before the patch asset loads, the original remains visible; a failed load leaves
that frame intact. Hidden documents pause the timer. Reduced motion selects a
static caption in the interface language (English fallback) and removes the
fade. The illustration remains decorative and the existing mobile visibility
and dashboard layout are retained. These illustration languages do not expand
the supported interface locales. No API, data, provider runtime or deployment
configuration changes.

Local evidence: 239/239 Vitest cases with `--maxWorkers=2 --testTimeout=15000`,
including three new timer/loading/reduced-motion regressions; 10/10 existing
dashboard viewport browser cases; 20/20 gateway/security cases. Typecheck,
lint and production build passed. The first default-concurrency run timed out
in an unrelated smart-practice case; a separate retry encountered a transient
English-path loading failure. The reduced-concurrency full run passed. All ten
illustration variants were rendered and visually inspected in Chrome. Physical
devices and deployed acceptance were not performed; this is local evidence.

Source: `gotIt-front/src/components/LearningHero.tsx`, its stylesheet, the
original/textless hero assets, bundled font subsets/licenses and
`test/learning-hero.test.tsx`. Image-generation prompt is preserved in
`src/assets/ux/learning-hero.prompt.txt`. No publication or deployment performed
by this illustration task.

## 2026-10-07 — Production login retained across DEV releases

The owner requires the existing production login until a replacement is approved.
The first restore (`16c13a4`) was deployed to DEV and later incorporated into
`feat/lesson-conversation-v3-dev`, but remained absent from `main`. A subsequent
manual DEV deployment of `660dd21` therefore restored the unwanted `auth-review`
layout. This was release-source drift, not browser cache or an authentication failure.

Web checkpoint `8025168` combines the original restore history with the latest
desktop home update (`57c8160`) and the live practice hub restore (`006482d`).
Both `main` and the configured DEV release branch must contain the restoration.
Signed-out users receive the compact form, desktop green showcase, mobile logo,
visible Google/Facebook options and password visibility control. Email verification
and recovery continue through the existing EmailAuthForm/API flows.

`test/e2e/auth-layout.spec.ts` guards provider visibility, the 430px form limit,
an inline submit button, password visibility and no overflow in HE/EN at
320/390/1280px. It fails on the uncorrected main tree and passes on the restored tree.
The 13 targeted browser cases (layout, email recovery and focused learning) pass.
The full Web quality gate passed (236 unit and 20 gateway/security cases,
typecheck, lint and build). Broader home/navigation coverage passed 40 cases;
three 30s navigation timeouts passed when rerun sequentially with a 60s limit.
The final combined release passed a fresh build, lint, 29 live-page unit tests
and all 19 targeted browser cases (login, email recovery, focused learning and
smart-practice scope). Both remote release branches point at `8025168`.
DEV Render deployment is **Live at the exact `8025168` source**. Signed-out
browser smoke on the service hostname confirms the restored showcase, inline
form and visible providers. The custom DEV domain returns HTTP 200 for `/ready`
and `/login`, and serves `index-B-cOhvfm.css` containing `.auth-production`.
Screenshot evidence: Web worktree `test-results/login-release/dev-login-desktop.jpg`.
No Core, Backend, Chrome, API or database change is required.

Future DEV releases must descend from the shared source containing this restore;
do not use a stale feature branch or a pre-restore SHA as the release baseline.

## 2026-10-06 - Fullscreen game entry follow-up

Web `9cff6a0f1de1c22da04e6d5ed285171d258457fb` follows the Figma correction. Fullscreen game entry stays contained in RTL; regression now samples the mounted game at animation start/middle/end. 84 viewport cases and local check (207 unit / 20 gateway-security), formatting and zero-finding audit passed. **DEV Live at exact source; delivered CSS and readiness verified; 393/393 local browser cases passed. Linux CI passed 207 unit / 393 browser / 20 gateway-security cases, build/type/lint and zero-finding audit; production excluded.** [Canonical source, behavior and release gate](28_UX_2_1_DEV.md#2026-10-06---game-entry-regression-follow-up).

## 2026-10-06 - Figma fidelity correction, DEV Live

Web `e1948281adabe34d2ff6c4e4dc4f949e90c33436`. Home/programs use approved Figma hierarchy and assets. Private-lesson preparation and active conversation use a focus shell; teacher preferences stay editable through a picker, and short-screen voice controls remain reachable. **DEV Web is Live at this source; authenticated home/program/preparation UI smoke and three DEV readiness endpoints passed. Active voice appearance is fixture-verified; no real provider call was started.** **Historical CI checkpoint: 333 browser passes / 60 initial demo-game overflow failures, resolved and verified by the 9cff6a0 follow-up above.** [Canonical changes and evidence](28_UX_2_1_DEV.md#2026-10-06---figma-fidelity-correction-local-checkpoint).

## 2026-10-06 - UX release active in DEV

Web UX `0e88da53f679a142bf040a51b4c428b6652e0a72` is deployed only to DEV, on `feat/ux-2-1-dev`, with served assets and authenticated letter-input acceptance. [Canonical DEV release and acceptance](28_UX_2_1_DEV.md#dev-web-release-and-authenticated-smoke-2026-10-06).

## 2026-10-05 - UX 2.1 DEV checkpoint

Web `a535a880c3ee8746ebb49d65ce714ed0fcfd8a70` adds four root destinations, compact mobile shell, Programs/History/Achievements, scoped next action, independent games, interactive spelling alphabets, preserved library/preparation context and readable-before-publication articles. Existing domain APIs/authority remain. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Web email verification and recovery

Web source `da913168f85baddc844978412058cf888117e85c` adds EmailAuthForm login/register/verify/forgot/reset modes, eight-locale copy and exact gateway routes. The accepted registration response is a challenge, never a session. Verification/reset returns to login; ?auth=register and ?auth=reset carry only the mode. Locally verified; production pending. [Canonical behavior and evidence](27_EMAIL_AUTH_RECOVERY.md).

## 2026-10-05 - Selected practice language

Web `e3cab2ef89ed2424c71ae961b6a6cbd44399c1e0` preserves selection during language-list loading/failure, waits before unscoped launch and validates resumed language before cards/exercises. 179 Web, 16 gateway and 15 browser checks passed on an isolated tree. Production verified with English/Arabic smart-session smoke on 2026-10-05. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-01 — תנועת מורה טבעית יותר

`gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd` מוסיף צורת פה מעוגלת
לגבר ולאישה, שילוב צורות סמוכות, מד קול מהיר ומצמוץ בזמן דיבור.
ממומש, מאומת מקומית ונפרס; smoke של קוד ונכסים מוגשים עבר. שיחה קולית חיה
טרם אומתה. [התנהגות וראיות](25_TUTOR_AVATAR_MOTION.md).

## 2026-10-01 - English preview action layout

`gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` gives the English unit preview a 700px maximum width and a three-column action grid, switching to two columns on narrow phones. The full-unit practice action spans two columns; each footer button has flexible width and wrapped copy. The word list still scrolls independently. No route, data, entitlement or known-state contract changes. Local Web check and phone/tablet/desktop modal regression passed; production deploy pending.

## 2026-10-01 - Bulk known state in English unit preview

`gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` keeps the existing checkboxes, select all/clear and Add selected. The former Remove selected control is replaced by I already know the selected words and Undo known for selected words. Each sends exactly the checked IDs to the existing `PUT /word-packs/:id/known` with `known: true` or `false`; the action is disabled when no selected entry needs the requested change. Pack detail/catalog refresh and checks clear on success. An API failure retains selection for retry. No API, database or pack-link removal occurs in this Web change. The write still requires `vocabulary.write`. Local Web and modal layout regressions passed; production deployment pending.

## 2026-10-01 - Multiword unit preview

`gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` adds independently checked word rows in `/english-learning` and bulk add/remove controls. The client computes the full desired pack selection from server detail plus the checked IDs before sending `POST /word-packs/:id/add`, preserving unrelated linked entries. After success it refetches detail and catalog, clears the checkboxes, and reports the result. The controls keep the existing `vocabulary.write` gate, known-word action and full-unit start. Hebrew and English copy are authored; other supported catalogs contain English fallback strings. Web check and targeted responsive regressions passed locally; deployment pending.

## 2026-10-01 — English learning path

`gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af` adds live route `/english-learning` to the main navigation and links it from `/word-packs`. `EnglishLearningPathPage` reads the existing catalog API, filters the English/Hebrew path, orders three levels and modules, displays server progress and next unit, previews a unit, installs all 50 entries through the existing add endpoint, and enters smart practice. The generic pack explorer omits those course units. Loading, unavailable catalog, error/retry, billing restriction, installing, and installed states are represented. Hebrew and English strings are authored; six other UI locales use English fallback strings. The Web check passed locally; deploy and authenticated smoke remain open.

## 2026-10-01 — Mixed-direction guide alignment correction

`gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe` groups the source
expression and its reading guide in one left-to-right layout in both the live
library list and detail. The guide keeps its own language and automatic text
direction, so Hebrew letters remain readable directly beneath English text.
The initial live smoke exposed separated alignment in the RTL page; the fix
passed `npm.cmd run check` locally and awaits deployment and repeat smoke.

## 2026-10-01 — Vocabulary reading guides

Source: `gotIt-front@c585b8860756e739859137d6e391643c321c5282`.
The live vocabulary list and detail show a stored pronunciation guide directly
below the source expression when `phoneticScheme` starts with
`transliteration:`. The suffix supplies the guide's `lang` attribute and
`dir=auto` handles its script. The API parser tolerates older list responses
without these additive fields. `hebrew_niqqud` is not shown as a transliteration.
The Web check passed locally; deployment and browser smoke remain to be verified.

## עדכון 2026-09-30 — חוויית קורס ותרגול

נוספו CoursePage, HomeworkPage, CourseComposer וכרטיס המשך בדף הבית/למידה.
`/courses`, `/courses/:courseId`, `/homework/:homeworkId` נטענים באופן עצל ודורשים
live וזכאות. כניסת `/private-lesson` מציעה קורס, עם שיחה חופשית נגישה.
פעולה ראשית אחת, שאלה אחת, תמלול לעריכה, סקירת העדפות, אישור תוכנית, יחידות נפתחות
ותרגול מדורג מחליפים טפסים ודוח ארוך. [החוזה והמצבים ב־22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. Stack ופריסה

- React 19, TypeScript strict, Vite 7, React Router 7.
- i18next, Lucide, Zod, Paddle.js.
- Vitest + Testing Library; Playwright לרספונסיביות.
- Production image בונה SPA ומריץ Node gateway ב־port 10000.
- ברירת מחדל API: same-origin `/core-api` ו־`/gotit-api`.

## 2. מצבי אפליקציה

`loading | signed-out | demo | live`.

- `loading`: ניסיון hydrate מ־refresh token.
- `signed-out`: AuthPage בלבד, לצד עמודים משפטיים ציבוריים.
- `demo`: seed מקומי ו־localStorage; פעיל רק אם `VITE_DEMO_MODE=true`.
- `live`: Core identity + profile + APIs אמיתיים.

אסור לערבב demo data ב־live. ב־live, dashboard/progress/scoring מגיעים מהשרת.

## 3. Routes ומסכים

| Route | מסך | מקור נתונים |
|---|---|---|
| `/dashboard` | מטרות, התקדמות, פעילות | dashboard/gamification |
| `/learn` | queue, משחקים, sessions, packs | learning/practice |
| `/learn/session/:type` | תרגול מלא | practice/exercises/attempts |
| `/vocabulary` | library, filters, bulk, details | learning-items/tags |
| `/reading` | יצירה, פתיחה והיסטוריה | reading/quota |
| `/private-lesson` | Realtime lesson/report | private-lessons |
| `/word-packs` | catalog והתקנה | word-packs |
| `/settings` | profile/languages/preferences | profile |
| `/transfer` | export/import | export/import |
| `/billing` | תוכניות, status, portal | Core billing |
| `/billing/checkout` | handoff ל־Paddle | runtime config + Paddle |
| `/help` | עזרה | static/i18n |
| legal aliases | terms/privacy/refund | static |

## 4. Auth ו־Token Lifecycle

- access token נשמר בזיכרון בלבד.
- Web refresh token: `localStorage` key `gotit.refresh`; existing `sessionStorage` value migrates on first use. Core default expiry is 30 days from issue.
- `api.token()` מרענן 30 שניות לפני expiry.
- refresh מקביל מאוחד ל־promise אחד.
- 401 לאחר retry מנקה session ומשדר `gotit:session-expired`.
- logout מנסה revoke ב־Core ובכל מקרה מנקה local state.
- `credentials: omit`; אין cookie auth.

Google client ID ו־Facebook App ID הם מזהים ציבוריים. secrets אינם חלק מה־bundle.

## 5. שכבת API

כל בקשה מוסיפה `x-request-id`; Core מקבל `X-Application-Key: gotit`; בקשה
מוגנת מקבלת Bearer. mutation idempotent מקבל UUID. response parsing נכשל
ב־`INVALID_RESPONSE` ולא מאפשר shape לא צפוי להתפשט ל־UI.

Timeouts נוכחיים:

- Core: עד 95s עקב cold start/login.
- product רגיל: 20s.
- pronunciation: 60s.
- reading/import: 75s.
- study image: 120s.

mutation אינו מקבל retry אוטומטי בצד הלקוח אלא דרך פונקציה שמחזיקה אותו event ID.

## 6. State ו־Data Ownership

- `AppContext`: identity, profile ו־demo-only state.
- `SubscriptionContext`: plans/status/entitlements וטיפול ב־admin.
- `useResource`: loading/error/refetch למשאב server.
- feature libraries (`practice`, `reading`, `privateLesson`, `transfer`, `product`)
  עוטפות API/validation; pages אינן משכפלות business rules.
- transient tokens כגון publication token ו־provider selection נשארים ב־component
  state ואינם נשמרים קבוע.

## 7. מסך Capture ידני

AddWordModal אוסף source, translation, שפות והקשר. ב־live הוא מריץ preview,
מציג existing senses ומחייב החלטת merge/new sense. save ננעל ל־payload ול־UUID;
לאחר timeout המשתמש יכול לנסות שוב עם אותו UUID.

## 8. תרגול

ה־UI מציג prompt לפי exercise שנחתם על ידי השרת. הוא אינו מכיל expected answer
ל־typed exercises. לאחר submit, ה־receipt הוא המקור ל־score, result, XP,
progress ו־next review. microphone tracks נסגרים ביציאה ובכשל.

Study mode יכול לטעון cards ותמונה לכל item לפני scored exercises. matching
ו־drag/drop תומכים keyboard/pointer; letter boxes לא מניחים code unit אחד לאות.

## 9. שיעור פרטי Realtime

הלקוח:

1. טוען setup/preferences/roadmap.
2. מבקש short-lived Realtime session מהשרת.
3. מקים WebRTC מול OpenAI עם client secret זמני.
4. מנהל timer, audio state, data-channel events ותרגום on-demand.
5. שולח opening/wrap-up events לפי חוזה.
6. ממתין לסיום recap/goodbye עם timeout חסום.
7. שולח transcript turns מסוננים ל־complete ומציג report.

כשל permission, codec, WebRTC או provider מוצג במפורש; אין מעבר שקט ל־demo.

## 10. Internationalization ונגישות

- locales: עברית, אנגלית, ערבית, גרמנית, ספרדית, צרפתית, רוסית וסינית.
- `dir` נקבע לפי locale; שדות source/translation יכולים לקבל direction עצמאי.
- controls עם labels, focus restoration, Escape ו־status/error announcements.
- reduced motion; contrast ו־hover/focus מובחנים.
- mobile navigation controls 44×44 לפחות.

## 11. Responsive Standard

מטריצת Playwright מכסה 14 viewports מ־320×568 עד 1920×1080 וכן landscape.
איסורים: document horizontal overflow, primary action מחוץ למסך, modal רחב
מה־viewport, card overlap או fixed header חתוך. scroll פנימי מותר רק בתבנית
מכוונת כגון טבלת vocabulary.

## 12. Production Gateway

ה־gateway הוא BFF/security boundary:

- מאפשר `/api/v1` ל־GotIt וכלל allowlist מצומצם ל־Core;
- מעביר Authorization, content headers, request/idempotency IDs נדרשים בלבד;
- דוחה body לא תואם, path traversal, origin אחר ו־upstream redirects;
- CSP מאפשר רק Google GIS, Facebook, Paddle, OpenAI Realtime ו־self הנדרשים;
- prewarm ל־Core עם backoff; ready מחכה ל־Core כאשר מופעל;
- runtime billing config מוחזר ללא server secrets.

## 13. משתני סביבה

Build: `VITE_GOOGLE_CLIENT_ID`, `VITE_FACEBOOK_APP_ID`, `VITE_DEMO_MODE`.  
Gateway: `CORE_API_PROXY_TARGET`, `GOTIT_API_PROXY_TARGET`, `PUBLIC_APP_ORIGIN`,
`TRUST_PROXY_HOPS`.  
Billing public config: `PADDLE_CLIENT_TOKEN`, `PADDLE_ENVIRONMENT`,
`PADDLE_PRO_MONTHLY_PRICE_ID`, `PADDLE_PRO_YEARLY_PRICE_ID`.

## 14. Definition of Done למסך

- loading, empty, error, retry, forbidden ו־offline states;
- keyboard, screen-reader labels ו־RTL/LTR;
- 320px, tablet ו־desktop ללא overflow;
- runtime response validation;
- אין business rule סמכותי כפול;
- unit/component test; route קריטי גם ב־Playwright;
- mutation retry שומר idempotency key;
- analytics/privacy event מוגדר אם נאסף;
- תרגומים לכל locale או fallback מאושר.


Program family correction and scoped history/list detail. [Exact source, behavior and release evidence](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 — Practice clarity / native reading guides

[Canonical behavior, exact source commits, API/provider/data bounds and verification evidence](32_PRACTICE_CLARITY.md). Backend and Web are implemented and locally verified; source publication and deployment remain pending release-target clarification. No new deployment verified.


## Unit study and game scope (2026-10-06)

Web source 7c661486dae2d602fc6d4c549bd5ec65097f54a9 adds catalog media loading/retry, familiar-word explanation and a unit-scoped game chooser. See [canonical behavior, regression evidence and pending release](32_UNIT_STUDY_AND_GAME_SCOPE.md).



## 2026-10-07 - Private lesson conversation room

LessonWorkspace now supports the same chat/composer UI for guided and legacy sessions; legacy typed turns use the existing Realtime data channel. [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).


## 2026-10-11 — DEV dashboard design

SCR-01 / UC-05 / UC-06 / FR-DASH-DEV-001–005: the approved program and personal-word dashboards reuse existing server mechanisms, with an exact DEV hostname boundary. [Canonical behavior, tests and release status](35_DASHBOARD_DESIGN_DEV.md).


## 2026-10-11 ? DEV practice design

SCR-03 `/learn` uses `DevPracticePage` under the exact DEV hostname gate; production/demo keep the existing page. [Canonical source, integration and evidence](36_PRACTICE_DESIGN_DEV.md).


## 2026-10-11 - Focus games in DEV

The exact DEV hostname gate routes new focus sessions to DevFocusGamePage/useFocusSession. Production, demo and legacy active sessions retain existing behavior. [Canonical contract and evidence](37_FOCUS_GAMES_DEV.md).


## 2026-10-12 — Approved My Words screen

SCR-05/06 uses the exact-host DEV-only page with supplied assets, real card metadata/counts, grid/list, filters and accessible drawer. [Canonical behavior, API, validation and DEV release evidence](38_MY_WORDS_DESIGN_DEV.md).


## 2026-10-12 - Illustrated My Programs (DEV)

DEV programs now derive card content/progress from existing resources, generate scoped AI covers and language-specific Mohi, and preserve the fixed shared header. API, cache/privacy invariants, responsive QA, checks and rollout are owned by [39 - Programs design DEV](39_PROGRAMS_DESIGN_DEV.md).


## 2026-10-13 - My Programs / My Words navigation latency

Authenticated DEV navigation now preloads both route modules and read-only data. Owner/query-scoped memory snapshots coalesce requests, stay fresh for 30 seconds, and retain visible content during background refresh. Successful mutations/profile changes invalidate reads; logout/session expiry removes private snapshots and discards late responses. Artwork warmup performs lookup only, with generation remaining on screen demand. No API, database or learning-authority change. [Implementation and measured release evidence](39_PROGRAMS_DESIGN_DEV.md#navigation-loading-correction---2026-10-13).


## 2026-10-13 - Prepared program map design (DEV)

The supplied screenshot is implemented as a dynamic, modular prepared-unit map
under the existing DEV gate. Server progression/locks and the canonical shared
header are retained. Behavior, acceptance, source and exact release evidence are
owned by [41 - Program map DEV](41_PROGRAM_MAP_DESIGN_DEV.md).


## 2026-10-14 - Settings reference design in DEV

SCR-11 now has the approved category navigation and profile layout in Web DEV,
with existing supported settings, isolated category saves, eight locales and
320px RTL/LTR. Unsupported account actions remain explicitly unavailable per
owner selection. No API/schema/Core/Backend/Chrome change. Local validation and
exact deployment status are owned by the [canonical settings contract](42_SETTINGS_DESIGN_DEV.md).

## Settings live contracts - 2026-10-22

FR-SETTINGS-LIVE-001..006 / UC-SETTINGS-LIVE-001..003 supersede the historical
settings exclusions for provider methods, persisted name/photo and reminder
scheduling. Core owns verified same-account linking; Product owns private profile
bytes, schedule/consents and delivery; Web owns nine DEV category compositions.
Migration, bounded payloads, configuration, privacy, worker semantics, verification,
DEV release and remaining exact-design gaps are owned by the
[current settings contract](42_SETTINGS_DESIGN_DEV.md#current-contract--2026-10-22).


## 2026-10-22 ? Subscription plan selection (DEV)

FR-BILL-007 / P14 / UC-08 / SCR-13: reference-based pricing UI, Core/Paddle catalog truth, period-specific checkout, comparison and minute packs. [Canonical behavior, validation and release evidence](SUBSCRIPTION_PRICING_DEV.md).
