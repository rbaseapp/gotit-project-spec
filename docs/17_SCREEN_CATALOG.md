# 17 — קטלוג מסכים ותיאור UX

## Structured English zero-to-C1 ? 2026-10-21

SCR-C1 uses the original `/english-learning` route and existing map/word/lesson UI (`/english-zero-c1` is an alias): enrollment, the original three-group unit browser with six CEFR bands in its content, vocabulary/phonics, resumable teacher/postlesson work, personal readings, unseen and separate skill diagnostics. Program discovery and the DEV dashboard link here. Loading, locked, retry, draft and RTL states are covered in the canonical runtime contract. [Canonical implementation and DEV evidence](48_ENGLISH_ZERO_C1_RUNTIME.md).

## 2026-10-17 — SCR-ADM-WORD automatic completion

Words status and visible images refresh as automatic assignment completes. Concept editor help explains automatic multilingual grouping and optional staff review; it no longer describes only exact bilingual matching. [Behavior and authenticated live evidence](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#automatic-multilingual-reconciliation-and-workload-isolation--2026-10-17).

## Admin recent activity ? 2026-10-16

SCR-ADM-HOME replaces introductory module tiles/counters with seven independent recent-activity lists, pagination, detail/full-list links and loading/empty/error/unavailable states. [Canonical screen contract](46_ADMIN_ACTIVITY_DASHBOARD.md).


## 2026-10-16 ? Multilingual concepts and shared images

SCR-ADM-CON adds concept search, multilingual editing, shared image preview/generation/reset and locked/error states. [44 ? Multilingual concepts and shared images](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md).

## Admin editing visibility 0.3.1 — 2026-10-16

Applicable admin actions remain visible but disabled, with Hebrew explanations for permissions, MFA unlock, service availability and protected targets. [Canonical behavior, verification and rollout](43_ADMIN_CONSOLE_FOUNDATION.md#editing-visibility-correction-031-2026-10-16).

## Admin owner feedback 0.3 — 2026-10-16

Users gains role/permission and Free/Pro access actions; Programs gains prepared catalog and visible creation; prompt previews, policy helpers and Hebrew Guide explain field effects. [Canonical requirements, contracts, checks and rollout](43_ADMIN_CONSOLE_FOUNDATION.md#owner-feedback-completion-03-2026-10-16).

## 2026-10-12 — Fixed DEV application header

Goal/streak remain mounted and visible through same-language route handoffs, including pending/failed reads. [Lifecycle behavior and verification](05_WEB_FRONTEND.md#persistent-metrics-during-navigation).

All DEV live shell screens use the Today topbar and green status panel, with one
navigation order, labels, logo, account control, typography and responsive layout.
Only active-route indication and live data/control state vary. Page CSS cannot
restyle the chrome. Full-screen sessions retain session controls; page-specific
safe-return links remain below the header. [Acceptance and release](05_WEB_FRONTEND.md#owner-correction-one-fixed-today-design).

2026-10-11: SCR-04 Continue / Finish session primary labels retain white text. [Correction and evidence](37_FOCUS_GAMES_DEV.md#primary-button-text-correction--2026-10-11).

## 2026-10-11 — Fixed daily task rewards and answer Toasts (DEV)

Owner now selected fixed 100/75/50 XP completion bonuses. Server ledger awards once
per scoped profile day; Web displays server amounts/claimed state and persistent
green/red quick-review Toasts with success confetti. Additive dashboard contract;
existing XP tables, no migration, Core/billing or privacy expansion. Completion
criteria, cap separation, sequence, checks and rollout are owned by the
[canonical dashboard follow-up](35_DASHBOARD_DESIGN_DEV.md#fixed-task-rewards-and-answer-toasts--2026-10-11).

## 2026-10-11 — SCR-01 dashboard acceptance corrections

Header/green-strip controls align to viewport edges; the gift sits left of XP in
Hebrew and each daily-step action has an XP badge without a fixed reward promise.
Quick-review receipts retain highlighted answer choices and concise word-card
feedback for 900ms before automatic continuation/completion. Close failures offer
explicit retry. [Canonical behavior and evidence](35_DASHBOARD_DESIGN_DEV.md#owner-acceptance-corrections--2026-10-11).

## 2026-10-07 — New Program availability states

New Program (FR-PATH-005 / UC-PATH-05) uses its selected languages for discovery.
Pending catalog: status and disabled open; failed catalog: error/retry; successful
unsupported pair: explanation; supported pair: open enabled. Opening awaits pair
save and remains on the form if saving fails.
[Canonical contract and evidence](31_LEARNING_PATH_FIDELITY_DEV.md#2026-10-07--new-program-language-pair-discovery).

## 2026-10-07 — SCR-02 multilingual illustration

The home illustration cycles only its three captions across ten languages;
reduced motion uses a static interface-language caption, and hidden documents
pause rotation. Existing layout/mobile visibility and learning-language
selection remain unchanged. [Canonical behavior and local evidence](05_WEB_FRONTEND.md#2026-10-07--multilingual-home-illustration).

## 2026-10-07 — Signed-out login appearance

Keep the production login appearance until the owner approves its replacement:
compact inline form, visible social sign-in options, desktop green showcase and
mobile logo. Verification/recovery states remain supported. This restoration
must be included in the shared release source, rather than only one manually
deployed feature commit. [Canonical behavior and release evidence](05_WEB_FRONTEND.md#2026-10-07--production-login-retained-across-dev-releases).

## 2026-10-06 - Canonical complete Figma learning/account source

Web `2559d5bb22a928add4a56e53e74e9d514d0167fd` implements the canonical learning/account desktop/mobile families and shared states. Add SCR-UX-04 approved course-unit words, SCR-UX-05 scoped smart preparation, SCR-UX-06 account/minutes; preserve SCR-PC, SCR-01/04/09/10/11/13 and independent word games. Exact routes, entry/exit, state controls and source ledger are in [30](30_FIGMA_FULL_DEV.md#web-screens-and-navigation). Local 224 unit / 20 gateway / nine new browser cases pass; complete browser gate, CI and Web DEV acceptance pending. Backend is Live in DEV.

## 2026-10-06 - Meaning recognition rounds and touch repair

SCR-03/04: localized meaning-recognition title and shared green styling; session-wide progress, fresh repeated boards, finger-centered touch portal, tap alternative and scrollable four-row layout. [States, constraints and evidence](29_MEANING_MATCHING_ROUNDS.md).

## 2026-10-06 - Fullscreen game entry follow-up

Web `9cff6a0f1de1c22da04e6d5ed285171d258457fb` follows the Figma correction. Fullscreen game entry stays contained in RTL; regression now samples the mounted game at animation start/middle/end. 84 viewport cases and local check (207 unit / 20 gateway-security), formatting and zero-finding audit passed. **DEV Live at exact source; delivered CSS and readiness verified; 393/393 local browser cases passed. Linux CI passed 207 unit / 393 browser / 20 gateway-security cases, build/type/lint and zero-finding audit; production excluded.** [Canonical source, behavior and release gate](28_UX_2_1_DEV.md#2026-10-06---game-entry-regression-follow-up).

## 2026-10-06 - Figma fidelity correction, DEV Live

Web `e1948281adabe34d2ff6c4e4dc4f949e90c33436`. SCR-02/03/09 and SCR-UX-01: approved home variants/program cards, focus preparation and avatar/message lesson layout. Course maps retain navigation. New labels are localized; actual plans/progress/provider events remain authoritative. **DEV Web is Live at this source; authenticated home/program/preparation UI smoke and three DEV readiness endpoints passed. Active voice appearance is fixture-verified; no real provider call was started.** **Historical CI checkpoint: 333 browser passes / 60 initial demo-game overflow failures, resolved and verified by the 9cff6a0 follow-up above.** [Canonical changes and evidence](28_UX_2_1_DEV.md#2026-10-06---figma-fidelity-correction-local-checkpoint).

## 2026-10-06 - DEV screen acceptance

The UX release is Live in DEV at Web `0e88da53f679a142bf040a51b4c428b6652e0a72`. Actual dashboard, SCR-UX-01 Programs/chooser, map/unit words, library, independent games, lesson preparation and SCR-UX-02 History were inspected; writing letter insertion and server feedback passed. No blanket pixel-exact or live-provider acceptance is claimed. [Canonical DEV release and acceptance](28_UX_2_1_DEV.md#dev-web-release-and-authenticated-smoke-2026-10-06).

## 2026-10-05 - UX 2.1 DEV checkpoint

SCR-UX-01 `/courses` is the program selector; new intake remains `/courses?new=1`. SCR-UX-02 `/history` offers bounded history/report access and actual session resume. SCR-UX-03 `/achievements` is user-opened. Existing SCR-02/03/04/09/10 and SCR-PC screens receive shared responsive styles and flow refinements. No decorative task-stage or unsupported microphone-free teacher is enabled. [Canonical coverage, local verification and deployment blocker](28_UX_2_1_DEV.md).

## 2026-10-05 - Email verification and recovery

SCR-01 gains verification, resend countdown, password confirmation and forgot/reset steps, error/retry states and explicit return to login; implemented and locally verified at Web `da913168f85baddc844978412058cf888117e85c`; production pending. [Flow and status](27_EMAIL_AUTH_RECOVERY.md#process-screens-and-compatibility).

## 2026-10-05 - Selected-language practice

SCR-03 / SCR-04: retain the chosen language while loading/failing; unscoped launch waits and offers retry. Resume links carry selected language; validate active cards before rendering/issuing and explain mismatches with localized `game.languageMismatch`. Queues/cards/exercises exclude incompatible source scripts. Retained library counts can exceed the eligible practice subset. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-05 - SCR-X01 / SCR-X02 free Google results

An authenticated free learner can use the existing Google action to reach preview results through explicit `dictionary`. No extension UI/package change is required. Saving remains subscription-gated and AI retains its paid gate. See UC-02A and [rollout evidence](10_OPERATIONS.md#2026-10-05---free-google-preview-rollout).

## 2026-10-01 — SCR-10 / SCR-PC-00A אווטאר מורה

לשני המורים ארבע צורות פה במעברים רציפים, מצמוץ בדיבור ונשימה עדינה שאינה
מתחילה מחדש בהפסקות. שתיקה סוגרת את הפה; reduced motion מסתיר תנועות פנים.
FR-LESS-006; [מקור, בדיקות וסטטוס פריסה](25_TUTOR_AVATAR_MOTION.md).

## 2026-10-01 - SCR-16 readable bulk-action footer

`gotIt-front@5bb3f95e7bd16c252d5b57f1d8ec537c2217d99c` arranges the English unit preview's Add selected, I already know, Undo known, Close and full-unit practice controls in a responsive grid. The wider modal and minimum-width action columns avoid the narrow, vertical wrapping observed in authenticated production on `e519242`. The list of 50 words remains scrollable and the footer stays visible at 320px/568px, 525px/709px and desktop in local Playwright. Backend behavior is unchanged; production visual check of this layout commit pending.

## 2026-10-01 - SCR-16 Hebrew bulk-known copy correction

The first deployed bulk-known source `4512a93` rendered its four new Hebrew action/feedback strings as question marks. `gotIt-front@e5192422075850a7db6c64134a13565d3c3acf58` restores the intended Hebrew strings for mark-known, undo-known and both success messages, with exact-copy regression coverage. Local check passed; production redeployment and visual smoke pending at this source checkpoint.

## 2026-10-01 - SCR-16 selected-word known actions

`gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e` keeps labeled word checkboxes, select all/clear, selected count and Add selected in the English unit preview. The selected-word removal button is replaced by bulk "I already know" and "Undo known" controls, each enabled only when at least one checked word can change to that state. A successful action reloads known counts and row states, clears the checks and announces success; an API error leaves checks in place. Individual known and full-unit actions remain. The five footer actions fit the modal at 320px, 525px and desktop in the targeted Playwright regression. Locally verified; production smoke pending.

## 2026-10-01 - SCR-16 selected words

The English unit preview now offers a labeled checkbox per word, select all, clear selection, a selected count, and add/remove-selected buttons. Add includes already linked words in the full replacement payload; remove excludes only checked linked words. Actions are disabled without an applicable selection or during a write. Detail and progress refresh after success; API errors use the existing feedback UI. The known-word control and full-unit start remain available. Source `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b`; live-flow regression covers partial add, selective removal, clearing the last link and re-adding; Playwright covers 320px, 525px and desktop modal geometry. Backend dependency `d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`. Locally verified; production smoke pending.

## 2026-10-01 — SCR-16 production rollout observation

Render Web `dep-dav8pnk9v7es73fjv47g` is Live at `gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c`. Web `/ready`, `/english-learning` and changed CSS/JS assets returned 200. The browser opened at Login, so the 50-word preview was not visually inspected after deployment; local 320px/525px/desktop layout regression passed.

## 2026-10-01 — SCR-16 Hebrew path name and unit preview alignment

`gotIt-front@5dd490426768c983c8eef368e2f512ea2b9a780c` labels the Hebrew navigation item and path heading "לימוד שפה מאפס". The unit preview aligns English, Hebrew and the per-word known control in stable columns; at phone widths up to 420px the word pair and control stack. Fifty entries scroll inside the modal while its close and add/practice actions remain padded and visible at short viewport heights. The row control has a visible border. A component heading regression and 320px/525px/desktop Playwright layout checks passed locally. Production deployment and visual smoke are pending at this source checkpoint.

## 2026-10-01 — SCR-16 preview control readability

`gotIt-front@383482331ca895c1491123643138bd0973fd7395` keeps the one-click per-word known control on one line in the 50-entry preview at 320px and desktop widths. The English/Hebrew pair wraps in the remaining row space. Component and Playwright layout regressions passed locally; production Web deploy and visual smoke pending at this source checkpoint.

## 2026-10-01 — SCR-16 named units and prior knowledge

`gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` shows the server-supplied theme name alongside each unit number and level. Each card has a one-click mark/unmark-whole-unit control and a known count; the preview offers per-entry mark/unmark. Known or truly mastered entries count toward path completion, but only mastery comes from scored evidence. Starting a unit sends only unknown entry IDs; a fully known unit is treated as complete. Existing loading, unavailable, error/retry, billing, modal and pack-practice states remain. Hebrew copy was authored and six other non-English locale catalogs have English fallback text. A live-flow regression and 374 responsive Playwright checks passed locally; production smoke pending. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 - SCR-00 shell level placement

`gotIt-front@d2d59437d57580ba3e9db5b8cdc933baf798b2db` shows the latest completed lesson assessment only in the top bar, linked to `/private-lesson?view=level`; the duplicate sidebar card is removed. The generic live-account notice is removed from standard screens. Demo labeling and the Free read-only notice remain. This affects desktop sidebar and mobile drawer in RTL/LTR; navigation and account data are unchanged. `test/app-shell.test.tsx` covers the regression, and 374 responsive Playwright checks passed locally.

Render deployment `dep-dav3tlnpn0mc73a0fp90` reports `Deploy succeeded | Live` for the exact source SHA. Production Web `/ready` returned HTTP 200. An authenticated `/dashboard` browser reload showed the English A2-B2 assessment in the top bar, no sidebar assessment card, and no generic live-account notice.

## 2026-10-01 — SCR-16 unit level context

`gotIt-front@66767de` places the translated level name within each `/english-learning` unit card. The level remains identifiable when a learner scrolls beyond its section heading and sees another unit with the same number. This addresses a report that `satellite` appeared in Basic unit 5; production catalog readback places it in Advanced unit 5. No catalog or API data changes. Basic/Advanced card regression and the complete local Web check passed. Render deployment `dep-dav2m90jo6nc73f7uefg` is Live for that SHA; authenticated production smoke showed the labels and opened the Advanced unit 5 preview containing `satellite`.

## 2026-10-01 — SCR-05/06 mixed-direction placement

`gotIt-front@adb2011869d851c3e01dc0dfa247e06084604dbe` keeps the
English expression and Hebrew reading guide in a shared reading group in
SCR-05 and SCR-06. This corrects a live-observed RTL layout where the two
lines were on opposite sides of the row. Local regression checks the group
and direction; production visual recheck is pending.

## 2026-10-01 — SCR-05/06 pronunciation guide

In the live vocabulary list (SCR-05), a saved reading guide appears in smaller
text immediately below the source expression and above its meaning. The item
detail (SCR-06) repeats the guide below the title. The guide is shown only for
`phoneticScheme=transliteration:<learner-language>`; missing guides and
`hebrew_niqqud` data leave the existing layout intact. The text has the
guide language and automatic direction. Source:
`gotIt-front@c585b8860756e739859137d6e391643c321c5282`.
Locally verified by `test/live.test.tsx`; live browser verification is pending.

## תיקון רצף השיעור — 2026-09-30

במסך השיעור הפעיל נוספו מצב „ממשיכים עם המורה…” וכפתור „נמשיך בשיעור”
רק כאשר מוצה תקציב הפניות או נדרש ניסיון ידני. לא נוסף טופס. זמינות הפעולה
מכבדת מיקרופון, דיבור, השמעה וסיום. מפרט התזמון: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## מסכי קורס חדשים — 2026-09-30

| מסך        | נתיב                             | תוכן/פעולה מרכזית                                          |
| ---------- | -------------------------------- | ---------------------------------------------------------- |
| SCR-PC-00A | `/courses`, `/courses/:courseId` | בחירת זוג שפות, שאלה אחת, תשובה בכתב/קול ותמלול לעריכה     |
| SCR-PC-00B | `/courses/:courseId`             | העדפות שמורות, הבחנה בין דיווח להמלצה, תיקון ואישור לבנייה |
| SCR-PC-01  | `/courses/:courseId`             | תוכנית מלאה כטיוטה, אישור נפרד, בקשת שינויים ומיקום נוכחי  |
| SCR-PC-02  | בתוך SCR-PC-01                   | יחידה נפתחת עם שיעורים, דקדוק, מילים, תלות, יעד ודוגמת בית |
| SCR-PC-03  | `/homework/:homeworkId`          | משימה אחת, בדיקה, משוב, רמז, דילוג ושמירה להמשך            |
| SCR-PC-04  | בסיום SCR-PC-03                  | תוצאה קצרה, מוקד חזרה ופתיחת פירוט                         |

SCR-10 מציג הכנה קצרה לשיעור קורס וסיכום תמציתי עם כפתור בית; שיחה חופשית נשמרת.
מצבי loading/error/empty, הקלטה/תמלול, כשל ספק, שינוי בגרסה, טיוטה ותוכנית פעילה
מפורטים ב־[22](22_PERSONAL_COURSES_IMPLEMENTATION.md). זכאות, RTL/LTR ו־320px נבדקו
בדפדפן עם fixtures; אין טענת נגישות מלאה או בדיקת מכשיר פיזי.

## 1. מטרת המסמך

זהו אפיון מסכים As-Built המבוסס על routes ורכיבי UI קיימים. הוא מתאר מה המשתמש
רואה, מה הוא יכול לבצע, מאין הנתונים מגיעים ומהם מצבי הקצה. התרשימים הם wireframes
לוגיים ולא עיצוב pixel-perfect.

## 2. מפת ניווט

```mermaid
flowchart TD
  AUTH[Auth] --> DASH[Dashboard]
  DASH --> LEARN[Learn]
  DASH --> VOC[Vocabulary]
  DASH --> LESSON[Private Lesson]
  LEARN --> SESSION[Game Session]
  LEARN --> PACKS[Word Packs]
  VOC --> DETAIL[Item Detail]
  VOC --> CAPTURE[Add Word]
  DASH --> READ[Reading]
  DASH --> SETTINGS[Settings]
  DASH --> TRANSFER[Transfer]
  DASH --> BILLING[Billing]
  BILLING --> CHECKOUT[Checkout]
  DASH --> HELP[Help]
  HELP --> LEGAL[Terms / Privacy / Refund]
```

## 3. מעטפת גלובלית — SCR-00 App Shell

```text
┌──────────── Sidebar ────────────┬──────────── Top bar ─────────────┐
│ Logo                            │ Menu / page title / level / user │
│ [+ New word / Upgrade]          ├──────────────────────────────────┤
│ Dashboard                       │ Subscription / mode banner       │
│ Learn                           │                                  │
│ Private lesson                 │          Page content            │
│ Vocabulary / Packs / Reading   │                                  │
│ Transfer / Settings / Billing  │                                  │
│ Tip / Help / Legal      │                                  │
└─────────────────────────────────┴──────────────────────────────────┘
```

| מאפיין     | תיאור                                                      |
| ---------- | ---------------------------------------------------------- |
| Actor      | משתמש demo/live; admin/user                                |
| מטרות      | ניווט עקבי, סטטוס חשבון, פעולת capture גלובלית             |
| נתונים     | profile, subscription, latest lesson assessment            |
| וריאנטים   | desktop sidebar; mobile drawer+scrim; RTL/LTR              |
| בקרות      | liveOnly routes, entitlement write, profile load error     |
| מצבים      | demo/live/free/trial/paid/admin; sidebar open/closed       |
| Acceptance | controls 44×44 במובייל, no horizontal overflow, focus תקין |

## 4. SCR-01 — Auth

On Web startup after closing and reopening the browser, a valid saved refresh session restores live mode without displaying the login form (`gotIt-front@9fb80b2`). Explicit logout or an invalid/expired session shows this screen. A transient startup request failure may show the signed-out screen with an error while preserving the saved token for retry on reload. Core's default absolute session lifetime remains 30 days. Locally verified and deployed at the exact SHA; production browser restart smoke pending.

Route: כל route לא־משפטי כאשר `mode=signed-out`.

```text
┌──────────────────────────────┐
│ GotIt value proposition      │
│ [ Login | Register ]         │
│ Email                        │
│ Password                     │
│ [Continue]                   │
│ ─── or ───                   │
│ [Google] [Facebook]          │
│ [Try demo] if enabled        │
└──────────────────────────────┘
```

| נושא                                 | אפיון                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| מטרה                                 | יצירת/חידוש זהות וגישה למוצר                                                 |
| פעולות                               | login/register, Google, Facebook, demo                                       |
| Validation                           | email תקין, password 12–128; provider token bounded                          |
| הצלחה                                | tokens נשמרים, identity/profile נטענים, מעבר ל־Dashboard                     |
| שגיאות                               | invalid credentials, existing user, disabled, provider config/token, network |
| Email verification / forgot password | Implemented in current task; [release status](27_EMAIL_AUTH_RECOVERY.md)     |

Facebook button failure state (`gotIt-front@af299153dde90879aafa0aa3a42e1ae8a8d2469d`): after a user click, the button is busy while the Meta SDK login callback is pending. If no callback arrives within 60 seconds, it becomes available again and displays a localized message instructing the user to close the Facebook window and retry. A late callback from the expired attempt cannot create a Core session. This state is locally verified by `test/facebook.test.tsx` and deployed with a passing public asset smoke; the 60-second production UI state and real Meta login remain unverified.

## 5. SCR-02 — Dashboard

### 2026-10-07 — Desktop home fits the viewport

Follow-up Web source `57c8160` (based on `660dd21`): the live `/dashboard` keeps
the same full-width illustrated continuation card above two side-by-side
secondary cards across desktop viewport heights. The previous below-700px
side layout is removed. The home fills the viewport minus its outer padding,
and the primary card grows into the height remaining after actual content is
laid out, instead of using a fixed maximum height or fixed height subtraction.
Content width, typography, illustrations and controls also scale up on larger
desktops to retain balanced proportions rather than stretching only the hero.
Short windows use compact typography, spacing and inline word actions; the
sidebar retains its compact navigation. The greeting/language selector, two
secondary cards, free conversation, reading, achievements and collapsed
progress entry fit the resting desktop view with no oversized bottom gap.
Mobile keeps its existing vertical layout.
Content remains in normal document flow: expanded progress, expanded errors,
unusually long content and accessibility text/zoom can grow and scroll; content
is never cropped or hidden to force a viewport fit. API/data/learning rules are
unchanged. Local browser coverage includes vocabulary, selected and resumed
programs, a language selector, sidebar overflow, Hebrew/English/Arabic and
600–1440px desktop viewport heights, full-width primary artwork above the
secondary cards and footer placement within the outer padding of the viewport
bottom. No live deployment acceptance performed for this follow-up.

Route: `/dashboard`; רכיבים נפרדים ל־demo ול־live.

```text
┌ Greeting + Start learning ─────────────────────┐
│ Due │ New │ Mastered │ XP/Level │ Streak       │
├ Daily goal ───────────┬ Library snapshot ──────┤
├ Five skills chart ────┴ Your week ─────────────┤
├ Installed packs / Strengthen items ────────────┤
└ Recent practice sessions ──────────────────────┘
```

| נושא   | אפיון                                                       |
| ------ | ----------------------------------------------------------- |
| מטרה   | לתת תמונת מצב ו־next best action                            |
| Data   | `/dashboard`, `/dashboard/activity`, `/gamification`, packs |
| פעולות | start smart review, open pack/item/session history          |
| States | loading/error/empty/new user/active learner/read-only       |
| Rules  | live metrics מהשרת בלבד; demo projections מקומיים מסומנים   |
| KPI UI | daily goal, due count, skill weakness, weekly time/XP       |

## 6. SCR-03 — Learn Hub

Route: `/learn`.

```text
┌ Smart review ───────────────────────────────┐
│ Due/new summary          [Start smart]      │
├ Choose activity ────────────────────────────┤
│ Flashcards │ Recall │ Listening │ Matching  │
│ Pronunciation │ Private lesson │ Packs      │
├ Next words / Queue ─────────────────────────┤
└ Session history ────────────────────────────┘
```

| נושא       | אפיון                                            |
| ---------- | ------------------------------------------------ |
| Data       | capabilities, learning queue, sessions           |
| פעולות     | smart session, manual game, selected items/scope |
| Gating     | `practice.play`; speech modes לפי capability     |
| Empty      | אין active words → capture/packs CTA             |
| Locked     | subscription required → Billing CTA              |
| Acceptance | אין התחלת exercise אם session creation נכשל      |

## 7. SCR-04 — Practice Session

Route: `/learn/session/:type`.

המסך הוא stateful workflow ולא עמוד סטטי:

```text
Study intro → Exercise → Submit → Feedback → Next → Session summary
```

### 7.1 Study state

```text
┌ Progress / Exit ──────────────────────┐
│ image (optional)                      │
│ source expression                    │
│ primary translation                  │
│ [audio]                         [Next]│
└───────────────────────────────────────┘
```

### 7.2 Exercise state

מוצג לפי type: typed field/letter boxes, multiple choices, draggable matching,
audio+dictation, flashcard self-rating או microphone recording.

### 7.3 Feedback/summary

מציג result, server score, expected/corrected form לפי receipt, XP, mastery change,
next review ו־session totals.

| בקרה             | דרישה                                                              |
| ---------------- | ------------------------------------------------------------------ |
| Answer authority | הלקוח אינו מחשב score ב־live                                       |
| Retry            | submit retry משתמש באותו UUID                                      |
| Exit             | session active מקבל confirm/abandon semantics                      |
| Audio            | tracks נעצרים ביציאה/כשל                                           |
| Accessibility    | keyboard לכל controls; matching alternative                        |
| Errors           | exercise expired/consumed → recover/new exercise, לא local success |

## 8. SCR-05 — Vocabulary Library

Route: `/vocabulary`.

```text
┌ Title / count / Add word ────────────────────┐
│ Search │ status │ language │ tag │ sort      │
│ Bulk selection + action toolbar              │
├──────────────────────────────────────────────┤
│ Source │ Translation │ Status │ Due │ Actions│
│ ... paginated rows/cards ...                 │
└ Pagination / load more ──────────────────────┘
```

| נושא       | אפיון                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| Filters    | search, source/target, user/learning status, hard, priority, due, practiced, tag, pack |
| Sort       | alphabetic, recent, status, weakest/strongest, due, most practiced                     |
| Actions    | edit, practice, pause/resume, archive/delete/restore, mastery, priority, hard, tags    |
| Gating     | reads ב־free; writes require `vocabulary.write`                                        |
| Empty      | מותאם למסנן לעומת ספרייה ריקה                                                          |
| Pagination | bounded; cursor/page לא יחד                                                            |

## 9. SCR-06 — Learning Item Detail/Edit

נפתח מתוך הספרייה כ־modal/drawer.

תוכן:

- source, primary translation, variants, language pair, type/POS.
- user/learning/retention status, mastery requirements ו־five skills.
- due/last practiced/attempt counts.
- occurrences עם context/URL/time.
- examples, tags ו־translation provenance/history.
- semantic edit fields ו־status actions.

בקרות: `expectedUpdatedAt` ל־optimistic conflict; semantic edit מציג אזהרת reset
של evidence נוכחי; deletion הוא soft; URL חיצוני נפתח באופן בטוח.

## 10. SCR-07 — Add Word / Live Capture Modal

נפתח מכפתור global Add Word.

```text
Input → Preview loading → Candidate selection
→ Existing sense decision → Save → Success
```

שדות: source, source/target languages, translation method, sentence/context.
Preview מציג candidate meanings, variants, POS, explanation, phonetics, examples
ו־existing senses. המשתמש יכול לערוך ולבחור merge/new sense. modal אינו נסגר
אוטומטית בזמן pending mutation; retry שומר event ID.

## 11. SCR-08 — Word Packs

Route: `/word-packs`.

| אזור      | תוכן                                                                  |
| --------- | --------------------------------------------------------------------- |
| Explorer  | topics, tracks, levels, language pair                                 |
| Pack card | title, description, word count, installed/progress                    |
| Detail    | entries עם source/translation/example ו־selection                     |
| Actions   | add selected, practice scope, remove/archive/keep                     |
| States    | no matching profile language, no results, locked write, loading/error |

Acceptance: בחירה אינה מעל 100; entries שלא נבחרו מסומנים excluded; remove מציג
בבירור אם מילים יישמרו או יאורכבו.

## 12. SCR-09 — Reading

Route: `/reading`.

```text
┌ Create reading ──────────────────────────────┐
│ Topic │ Language │ CEFR │ Type │ Length      │
│ Vocabulary: smart or selected               │
│ Quota status                [Generate]       │
├ Preview (not persisted) ─────────────────────┤
│ Title + highlighted target expressions      │
│ [Open / Save] [Discard]                     │
├ Opened reading / Article quiz ───────────────┤
└ History list / detail / delete ──────────────┘
```

מצבים: provider unavailable/auth/billing/rate/timeout, quota exhausted, target
repair warning, loading, preview, opened, history empty. preview token נשאר transient.

## 13. SCR-10 — Private Lesson

Route: `/private-lesson`; המסך כולל כמה subviews.

### 13.1 Setup

- Teacher selection uses the existing Rachel/Mike portraits at 80px inside the
  portal dialog, with the teacher name beside each portrait and the selected
  border retained. The audio-level badge is hidden here so it cannot cover the
  face; voice samples remain separate buttons. Local Web source `660dd21`
  verified HE/EN at 320/390/1280px, loaded portraits, no horizontal overflow,
  teacher selection and Escape/focus restoration. `npm.cmd run check` passes
  (236 unit tests, 20 gateway/security tests, typecheck, lint, build). This is
  local fixture evidence; deployment and physical-device checks were not run.
- target/support language ו־absolute beginner rule.
- level, duration, teacher voice/speed.
- focus areas/custom focus.
- correction/vocabulary mode.
- roadmap selection והעדפות שמורות.

### 13.2 Live lesson

```text
┌ Timer / finish / pause ───── Topic / context ┐
│ Full chronological chat    │ Selected tutor │
│ Hint / translate / replay  │ Actual state   │
│ Scrollable transcript     │ Lesson goal    │
│ Voice / text + composer   │ Target words   │
└────────────────────────────────────────────┘
```

Mobile uses a compact teacher above the chat and a persistent composer. Text
start works with both guided and legacy sessions without microphone permission;
the full state/acceptance owner is [33](33_PRIVATE_LESSON_CONVERSATION_DEV.md).

### 13.3 Completion report

strengths, corrections, grammar, vocabulary, suggestions, next step, save suggested
words, review now, assessment range/confidence/skills.

### 13.4 History/Level/Roadmap

רשימת lessons, פתיחת report, מחיקה, language filter, current roadmap/milestones
ו־level evidence. מצב report pending/failed מאפשר retry.

## 14. SCR-11 — Settings

Route: `/settings`.

Sections קיימים:

- interface language.
- personal/profile identity display.
- default source and translation languages.
- learning languages + self-assessed CEFR.
- interests.
- daily goal type/value ו־new items/day.
- translation preference.
- enabled learning skills.
- reminders UI section.

ב־live, save שולח profile patch validated. ב־demo נשמר local. אין להציג reminder
delivery כפעיל ללא backend/email/browser implementation מאומת.

## 15. SCR-12 — Transfer

Route: `/transfer`.

| אזור    | פעולה                                                      |
| ------- | ---------------------------------------------------------- |
| Export  | איסוף כל העמודים והורדת JSON versioned                     |
| Import  | בחירת file ≤ client limit, parse/validate preview          |
| Results | success/failed per event, partial 207, retry failures only |

המסך אינו מייבא attempts/XP. file error ממופה ל־validation/format/size ולא נשלח
לפני parse בסיסי.

## 16. SCR-13 — Billing

Route: `/billing`.

```text
Current plan / tier / trial days / subscription status
Entitlements summary
Selectable plan cards: Pro / AI Tutor subscriptions / one-time minutes pack
[Upgrade] [Manage subscription]
```

מצבים: admin, free, active trial, paid, past_due grace, paused/canceled, billing not
configured, portal/checkout error. אין הצגת provider customer/subscription IDs.
Free מוצגת רק בסיכום התוכנית הנוכחית כשהיא הוקצתה בידי Core; היא אינה כרטיס
לבחירה גם אם היא מופיעה בקטלוג התוכניות.

## 17. SCR-14 — Checkout Handoff

Route: `/billing/checkout` ציבורי לרינדור return/handoff.

מצבים: missing transaction, runtime config unavailable, Paddle loading, ready/open,
completed/canceled/error. client token ו־price IDs מגיעים מ־`/runtime-config`; הם
public identifiers. API key/webhook secret אינם מגיעים למסך.

## 18. SCR-15 — Help ו־Legal

`/help` מסביר meaning/senses, practice, account/privacy ו־feature availability.
Terms, Privacy ו־Refund זמינים בכמה aliases ונגישים ללא session. שינוי משפטי
דורש review; עצם קיום העמוד אינו אישור שהמדיניות מכסה כל rollout חדש.

## 19. Chrome — SCR-X01 Popup

```text
Signed out: Email/Password + Google
Signed in:
  Capture context/manual text
  Languages + compact settings
  Preview candidates/existing senses
  Edit / audio / save decision
  Success + practice invitation
```

ה־popup נע בין small/medium/large, light/dark ו־RTL/LTR. badge מציין pending
capture כאשר Chrome אינו מאפשר לפתוח popup אוטומטית.

## 20. Chrome — SCR-X02 Inline Translation

נפתח ליד selection/double-click בתוך Shadow DOM. מציג source, translation,
candidate meanings, AI action, audio, saved state, quick save/remove ו־practice CTA.
close-on-outside-click ניתן להגדרה. content script אינו מקבל tokens/provider keys.

## 21. Chrome — SCR-X03 Options

כולל onboarding, selection action, double-click, outside close, popup size,
auto-close after save, theme ושפות default. שינוי feature שדורש broad origins
מתאם optional permission/content registration ומציג rationale.

## 22. מטריצת מצבים רוחבית

כל מסך נתונים חייב לתכנן לפחות:

| מצב                  | התנהגות                                    |
| -------------------- | ------------------------------------------ |
| Initial loading      | skeleton/status ללא layout jump חמור       |
| Empty                | הסבר + CTA אפשרי, לא טבלה ריקה             |
| Validation           | שדה מסומן + summary נגיש לפי צורך          |
| Network              | retry בטוח; mutation שומר UUID             |
| Unauthorized         | refresh אחד ואז sign-in                    |
| Forbidden/locked     | הסבר tier/capability + Billing CTA         |
| Provider unavailable | feature-specific; core library נשארת פעילה |
| Partial success      | פירוט per item; לא “הכול נכשל”             |
| Stale/conflict       | reload/preview מחדש; אין overwrite שקט     |
| Offline              | state נשמר ככל שניתן, בלי success מזויף    |

## 23. Definition of Done למסך חדש

1. מזהה SCR, actor, goal ו־entry/exit.
2. wireframe ואנטומיית רכיבים.
3. data/API ownership ו־entitlements.
4. כל מצבי הטבלה לעיל.
5. RTL/LTR, keyboard, focus, labels, announcements.
6. 320px, mobile landscape, tablet ו־desktop.
7. analytics event מינימלי ומאושר אם נדרש.
8. component/route tests ו־acceptance criteria.
9. עדכון App routing, i18n, Help, Current Features ו־Traceability.

## SCR-16 — English learning path

Route: `/english-learning` (live Web). Actor: authenticated learner with an English-source/Hebrew-translation profile. Entry: primary navigation or a link from SCR-08. Goal: work through Basic, Good and Advanced in ordered 50-entry units. The screen shows server-reported mastery, next unfinished unit, a preview of all entries, and actions to install/start or resume pack-scoped smart practice. Exit: smart practice or another navigation destination. Data owner: existing GotIt word-pack APIs; entitlement: `vocabulary.write` to install, practice entitlement checked by the session route. States: loading, error/retry, no compatible catalog, preview, installing, billing restriction, installed, partial, mastered. Modal focus follows the shared modal component. Layout uses responsive unit grids and supports RTL/LTR and 320px. Acceptance: no 1,000-entry bulk installation; 50 IDs are submitted for one unit; existing SCR-08 excludes course units and links here. Source: `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af`. Production smoke pending.

# Canonical Figma learning/account scope — 2026-10-06

`kgMHTv0q4TJdwxCHYzUnSM` pages 4:3–4:9 replace the historical design reference. Preparation, guided activity, replay, review, summary, unit words, smart launch, scoped history and account interface states consume the contracts in [30](30_FIGMA_FULL_DEV.md). Web final verification is pending; 494 source frames are an inventory, not 494 verified browser screens. Owner-deferred parent/child relationships, deletion and native Play states are not active application features.

## 2026-10-06 — DEV learning-path correction

SCR path/map/words/activities/levels: Figma fidelity corrections in progress; Backend eligibility verified. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).

FR-PATH-003/004/005: explicit map vs bulk dialog, real word/activity detail, levels and full new-program flow. [Exact source, behavior and release evidence](31_LEARNING_PATH_FIDELITY_DEV.md).

## 2026-10-06 — Practice clarity / native reading guides

[Canonical behavior, exact source commits, API/provider/data bounds and verification evidence](32_PRACTICE_CLARITY.md). Backend and Web are implemented and locally verified; source publication and deployment remain pending release-target clarification. No new deployment verified.

## 2026-10-06 — Unit study source checkpoint

SCR-16 adds independent image/example loading/error states, known-state explanation and unit game chooser. Web verification/release pending. [Contract, source and verification](32_UNIT_STUDY_AND_GAME_SCOPE.md).

## 2026-10-07 - Private lesson conversation room

SCR-10 uses chronological chat, a persistent text/voice composer, desktop teacher panel and compact mobile teacher. Actual guided stages are conditional on server activity. [Contract and evidence](33_PRIVATE_LESSON_CONVERSATION_DEV.md).

## 2026-10-07 ? Temporary DEV practice hub restoration

SCR-03 `/learn` restores the production smart-session panel, six game cards, next-word queue and paginated history while retaining DEV language/unit/word scope and its existing shell. [Behavior and verification](34_PRACTICE_HUB_RESTORATION_DEV.md).

## 2026-10-11 ? SCR-03 replacement design in DEV

The owner approved the Claude ??? ????? 3? practice layout for DEV only. Original illustrations, live session/goal data and explicit unavailable modes are implemented. [Source, behavior and release evidence](36_PRACTICE_DESIGN_DEV.md).

## 2026-10-11 - Focus games in DEV

SCR-04: DEV flashcards, matching, drag, listening, pronunciation, inter-game transitions and animated completion; keyboard, RTL/LTR and reduced-motion states. [Canonical contract and evidence](37_FOCUS_GAMES_DEV.md).

## 2026-10-11 - Owner game-design corrections (local)

SCR-04 exit matches the original compact mascot dialog; flashcards restore rating/deck motion; matching adds live dashed preview; completion opens over the retained game in a scrollable modal. [Canonical behavior and verification](37_FOCUS_GAMES_DEV.md#owner-game-design-corrections--2026-10-11-local-unreleased).

### DEV practice alignment — 2026-10-12

SCR-04: retryable incorrect answers, per-letter listening, over-game transitions and fullscreen five-phase completion. See [canonical scope and evidence](37_FOCUS_GAMES_DEV.md#owner-plan-versus-dev-alignment--2026-10-12).

### Session-end video correction ? 2026-10-12

SCR-04: corrected five-phase completion geometry/timing and original accessories; cloze audio stays disabled until the active exercise has a successful receipt. [Canonical behavior, scope and evidence](37_FOCUS_GAMES_DEV.md#session-end-reference-video-and-cloze-audio--2026-10-12).

## 2026-10-12 — SCR-05/06 My Words design

The selected MyWordsV2 artboard is implemented in DEV, including card waves, bilingual alignment, status/source/POS/memory/review metadata, drawer and bulk actions. Category membership/counts are actual server data. [Canonical behavior, API, validation and DEV release evidence](38_MY_WORDS_DESIGN_DEV.md).

## 2026-10-12 - Illustrated My Programs (DEV)

DEV programs now derive card content/progress from existing resources, generate scoped AI covers and language-specific Mohi, and preserve the fixed shared header. API, cache/privacy invariants, responsive QA, checks and rollout are owned by [39 - Programs design DEV](39_PROGRAMS_DESIGN_DEV.md).

## 2026-10-13 - My Programs / My Words navigation latency

Authenticated DEV navigation now preloads both route modules and read-only data. Owner/query-scoped memory snapshots coalesce requests, stay fresh for 30 seconds, and retain visible content during background refresh. Successful mutations/profile changes invalidate reads; logout/session expiry removes private snapshots and discards late responses. Artwork warmup performs lookup only, with generation remaining on screen demand. No API, database or learning-authority change. [Implementation and measured release evidence](39_PROGRAMS_DESIGN_DEV.md#navigation-loading-correction---2026-10-13).

## 2026-10-13 - DEV program chooser

The screenshot-based, dynamic new-program chooser is implemented and locally verified in Web. Final desktop/mobile/browser QA passed after reconnection; the new chooser is now deployed and authenticated navigation is verified in DEV. See [canonical behavior and evidence](40_PROGRAM_CHOOSER_DEV.md).

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

## Operational administration, 2026-10-16

The owner requested completing all eight Admin capabilities, including editing and
program creation. The cross-service implementation, requirements, API/data/security
boundaries, browser states and rollout evidence are maintained in
[the canonical Admin release](43_ADMIN_CONSOLE_FOUNDATION.md#operational-administration-02-2026-10-16).
This records local implementation and verification; production deployment is a
separate explicitly recorded release step. Existing learner Web/Chrome contracts
remain compatible.

## Admin user details — 2026-10-16

SCR-ADM-USR: Users row -> `/users/:id/show`; Hebrew card, effective access summary, 15 paginated history tabs, course roadmaps and separate account/product-preference editors. Loading/empty/owner-error/retry/locked/conflict states and narrow tables are required. [Behavior](44_ADMIN_USER_DETAILS.md).

## All-user vocabulary and quick image replacement - 2026-10-16

SCR-ADM-WORD: responsive word cards, language/user/deletion filters, image-first detail, paginated histories and quick shared replacement; unavailable/pending/error/conflict states remain explicit. [Canonical contract and verification](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#all-user-vocabulary-and-quick-image-replacement--2026-10-16).

## Quick word-card images and automatic backfill - follow-up 2026-10-16

FR-CON-07/08 removes manual setup from image replacement: cards offer an inline Pixabay gallery and one-click GPT with editable prompt. Migration 1792192000000 derives exact bilingual image identities and reuses existing pictures; learning state is preserved. New unlinked words are prepared within the authorized action. [Current contract, process and production evidence](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#quick-card-actions-and-automatic-historical-linking-follow-up-2026-10-16).

## 2026-10-16 — Modular prompt and Realtime management

FR-ADMIN-PROMPT-001–004: editable instructions/modules, live-lesson sections/stages, supported session parameters and synthetic browser → Backend → OpenAI previews. Existing version/audit/permission boundaries remain authoritative. API, data, privacy, acceptance and exact validation evidence are owned by [44 — AI prompt management](44_AI_PROMPT_MANAGEMENT.md). No live rollout is claimed.

## Admin program and lesson editor - 2026-10-16

Application-scoped shared and personal unit content, full course revision,
published learner templates, Realtime previews/snapshots and measured lesson
statistics are owned by [45 - Admin program editor](45_ADMIN_PROGRAM_EDITOR.md).
This is local/integration implementation evidence; shared-environment migration
and deployment remain separate.

## Automatic concept assignment - 2026-10-16

SCR-ADM-WORD now shows automatic waiting/checking/retry states and refreshes list/detail every ten seconds. [Canonical contract](44_MULTILINGUAL_CONCEPTS_AND_IMAGES.md#automatic-assignment---2026-10-16).
