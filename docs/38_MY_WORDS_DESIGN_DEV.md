# Approved My Words design in DEV — 2026-10-12

Owner request: fully implement [Claude MyWordsV2 artboard ef360ce5746b](https://claude.ai/artifact/QxCJLacpzBzSSFVDuaotRV#artboard-ef360ce5746b), including card nuances. Canonical scope: SCR-05/06, UC-03, P06 and SEQ-13 (practice return context).

## Behavior and ownership

Web `/vocabulary` selects `DevMyWordsPage` on exact hostname `gotit-dev.rbaseapp.com`; loopback requires explicit preview flag. Production and demo retain the previous page. Supplied mascot and wave assets, original Rubik/Assistant type, green/gold palette, hero, goal/streak strip, bilingual cards, source chips, status badges, memory bars, next-review dates, search/filter/sort controls, category chips, grid/list, bulk toolbar and 440px drawer are implemented. Dynamic numbers and categories are server data, not seeded prototype values. Eight UI locales retain RTL/LTR support.

Card search is server-wide over source text, current translations and captured source sentences. Filters support multiple origins/POS/learning statuses together, challenge, user state, priority and due status. Existing seven sorts and paginated loading remain. Header/category counts use the language and user-status scope independent of search/category selection; topics count distinct linked items. Selecting words never changes evidence. Practice carries explicit selected IDs and language, and returns with filters, page and selection intact; changed searches reset pagination.

The drawer displays safely highlighted plain-text context and an http(s) source link, current-learning-revision correct/total attempts, next review and tag/program category. It invokes exact-word practice, existing manually mastered/return actions, tag PUT, recoverable deletion and the retained richer editor. Missing context is explicit. Add-word uses the existing preview/sense/save pipeline. Errors remain retryable; confirmations, entitlement and ownership stay authoritative on the server. Native browser speech uses actual source language; unavailable playback is explicit. No client grading or reward generation.

## API addition

Optional `GET /learning-items?view=cards` retains pagination and existing filters, adding per-item `partOfSpeech`, latest owned `source` (type/URL/title/sentence/paragraph/time), `tags`, active `program` (title/topic), and `answers` (correct/total non-skipped current-revision attempts). It adds `summary` with total/new/mastered/due counts and tag/topic count maps. The legacy list projection is unchanged.

Comma-separated `learningStatuses`, `origins` (`chrome_extension`, `web_manual`, `program`) and `partsOfSpeech` are strictly validated bounded enums. All subqueries retain application/user scope. LIKE wildcard escaping, cursor/filter binding, sorting and safe bulk contracts remain. No migration, Core, Chrome, billing, scoring-policy or environment-variable change.

## Source and validation

Backend source **`c66eb8d04a5e93594cf607c647b02e5c3afa768d`** is based on actual deployed `cc7019f`, preserving daily-task rewards and the prior focused-distractor correction. **257 fast tests, 34 disposable PostgreSQL practice integration tests, daily-task reward integration, typecheck and build passed.** Backend [deployment dep-db616c7lot8c738gd5c0](https://dashboard.render.com/web/srv-dar6ei7f3r2c73balbp0/deploys/dep-db616c7lot8c738gd5c0) is **Deploy succeeded | Live**, duration 39.8s, started 2026-10-12 01:52:32 Asia/Jerusalem.

Web source **`01bf9d10351d1b5e41b7d2ce0e52bd3adad047ca`**, based on actual DEV `7c87474`, preserves session-end animation and cloze audio fixes. Initial full gate passed 297 unit / 20 gateway tests; five focused word-screen regressions pass after a pagination/return correction. Final combined release gate and authenticated DEV acceptance follow below. Vitest's Windows thread pool stalled; the complete suite passed with fork workers, without changing test definitions.

Visual QA compares exported source and implementation at identical 1440px CSS width and separately inspects the drawer. Corrected header/account, hero/mascot/CTA, drawer title/CTA and context typography. 320px RTL / 390px LTR document widths fit without horizontal overflow; 390×700 drawer footer ends at y=700 and body scrolls independently. The supplied context is rendered as text and source links reject executable schemes. Local fixtures did not change real vocabulary or invoke paid providers. [Web design evidence](https://github.com/rbaseapp/gotIt-front/tree/feat/my-words-design-dev-20261012/docs/mywords-dev).

## Release scope and rollback

DEV Web service: `srv-dar6dng473hc73a0ns1g`; DEV Backend: `srv-dar6ei7f3r2c73balbp0`. Deploy exact reviewed commits manually while retaining tracked branches and disabled Auto-Deploy. No production release. Rollback Web to `7c874748408cac8254e8771b378bf45f6f57fc39` and Backend to `cc7019fd5313da88ee9066bd37a98e33977546b4`; no database rollback required.

## Final combined release gate

Exact Web source `01bf9d1` passed typecheck, lint, **300 unit tests / 51 files**, production build and **20 gateway/security tests**. The higher total includes tests from the current DEV baseline plus five new word-screen regressions. This release was fast-forwarded to Web `dev`; remote production main remains `778b3be97cd40b13283bcd446ff0697901945120`. Backend `/ready` returned 200 with database status ok after deployment. Web exact-source deployment and authenticated acceptance are recorded next.

Initial Web [deployment dep-db61c559fdbs73eeste0](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db61c559fdbs73eeste0) reached **Deploy succeeded | Live**, 51.7s, started 2026-10-12 02:04:52 Asia/Jerusalem. Authenticated acceptance displays real 130-word summary, nine paged cards, phonetic guides, program provenance and a real 5/6 correct-answer ratio. Source-word and Hebrew-translation searches both find the owned `come` card. Its bulk practice link carries exactly the checked UUID and safe language/return context; no practice session or vocabulary mutation was submitted during this acceptance.

Live acceptance prompted explicit `sourceLanguageCode` / `translationLanguageCode` query parameters for the category catalog, keeping it aligned with the selected library pair rather than depending on profile defaults. Corrective source **`8163860f7ebe9d293377a43f2358e15243b4d503`**, pushed to Web `dev`, passes typecheck/lint/build and **36 focused live-library/return-context tests** after the complete gate. This changes catalog request scoping only.

Final Web [deployment dep-db61el0473hc73cp1180](https://dashboard.render.com/web/srv-dar6dng473hc73a0ns1g/deploys/dep-db61el0473hc73cp1180) reached **Deploy succeeded | Live**, duration 1m12s, started 2026-10-12 02:10:12 Asia/Jerusalem, source `8163860`. Authenticated acceptance after reload confirms 130 total / 45 mastered / 75 due, real topic counts 47/24/12/12, business-category filtering to 24 items, grid/list switching, and pagination from 9 to 18 items. The add-word dialog opens and closes without submitting a translation or save. The final page is restored to the unfiltered nine-card grid. Captured console warnings/errors are empty. Web and Backend readiness return HTTP 200; the published word-screen CSS exactly matches the locally validated build. Remote production `main` remains unchanged.

Release evidence: [final DEV screen](evidence/2026-10-12-mywords/dev-final.png), [real word drawer](evidence/2026-10-12-mywords/dev-drawer.png), [selected-word practice destination](evidence/2026-10-12-mywords/dev-selected.png), and [release manifest](evidence/2026-10-12-mywords/release.json). No vocabulary mutation, practice session, paid-provider request or production deployment was submitted during authenticated acceptance.


## Navigation loading correction - 2026-10-13

My Words shares scoped short-lived snapshots and read-only route preloading with My Programs. Full query/account isolation and mutation/session invalidation retain server authority. [Canonical behavior and measured release evidence](39_PROGRAMS_DESIGN_DEV.md#navigation-loading-correction---2026-10-13).
