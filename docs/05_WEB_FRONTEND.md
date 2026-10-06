# 05 — מפרט Web Frontend

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
