# 20 — קטלוג Use Cases

## UC-04C - Corrected selected-word flow, 2026-10-01

Actor: authenticated learner with `vocabulary.write`. In the English unit preview, check one or more words and choose Add selected, I already know, or Undo known. Add sends the complete desired linked-ID selection while preserving existing unchecked links. Known/undo sends exactly the checked entry IDs with a boolean to `PUT /word-packs/:id/known`; the server owns known state and any same-sense propagation. Refresh detail/progress and clear checks on success. On API failure, show feedback and keep checks for retry. The former selected-word removal action is absent. Source: `gotIt-front@4512a93c648867af130c973867fdecfb09f96a1e`, locally verified; production smoke pending. The prior UC-04C text below describes the historical UI.

## UC-04C - Manage selected words in an English unit

Actor: authenticated learner with `vocabulary.write`. Trigger: open an English unit preview and check one or more words. Add flow: retain existing linked IDs and include checked IDs in the complete `POST /word-packs/:id/add` selection. Remove flow: omit only checked linked IDs; the empty array clears the last link while the unit remains installed. Refresh server detail/catalog and clear the checks on success. Alternatives: inapplicable action disabled, write in progress, billing restriction, or API error without clearing the selection. This changes pack inclusion, not known state or mastery. Sources: `gotIt-front@623202a3e1f5c51b71baf12bd1c78c4a0967860b` and `gotIt-backend@d8d930a7dfbeb01f8f951359c67a3b837fcc99f7`; local Web/PostgreSQL regressions passed, production smoke pending. Links FR-PACK-006 and SCR-16.

## 2026-10-01 — UC-04B distinct senses

When a learner marks a known word in a named English unit, the server marks matching entries in other units only if the English expression and Hebrew meaning are the same after normalization. A different meaning of the same spelling remains available to learn. `May` as a month and modal `may` are the tested alternative flow in `gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966`; local PostgreSQL verification passed, production smoke pending.

## 2026-10-01 — UC-04B Web flow implemented locally

On `/english-learning`, the learner may mark a named unit known directly from its card or inspect its preview and mark one English/Hebrew entry. The card/preview reload server state after each action; an entire known unit is complete, and the next unfinished unit advances. If the learner opens an incomplete unit, the install request contains only unknown IDs. Billing restrictions follow the existing `vocabulary.write` route; API errors use existing feedback. Local source `gotIt-front@cbc5bac2a374e150c3d1ef31e77041cba27f387e` passed flow and responsive regression; production smoke pending.


## UC-04B — Skip a known English word or unit

Actor: authenticated learner in the English/Hebrew path. Trigger: declare one preview entry or a whole 50-entry unit already known. The client sends the selected pack entry IDs to `PUT /word-packs/:id/known`; the server validates pack ownership and write entitlement, records the learner's declaration, propagates repeated English forms within the path, and reports known/completed counts. Subsequent pack practice excludes those words. Alternative: unmark reverses the declaration; wrong-pack IDs fail without partial writes; a billing restriction blocks the write; a pack with pre-existing learning evidence retains that evidence without awarding more. Backend source `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` locally and integration verified; Web/deploy pending. Links FR-PACK-005 and SCR-16.


## UC-13 — Read a source expression with a familiar script (pilot)

Actor: authenticated learner viewing owned vocabulary. Trigger: open SCR-05
or SCR-06. The client reads the owner-scoped library response and places a
stored `transliteration:<language>` guide below the source expression when
present. The primary translation remains a separate line. Without a guide,
or for `hebrew_niqqud`, the reading-guide line is omitted. The learner
may still use the existing reference audio separately. Current pilot data:
84 active English expressions in the requested account have Hebrew guides;
new words do not receive guides automatically. Requirement: FR-LIB-008.
Backend `c138f5464de818552a54ca584c43ccdaee980da0`; Web
`c585b8860756e739859137d6e391643c321c5282`. Locally tested; live
screen verification pending.

## תיקון רצף השיעור — 2026-09-30

חלופה ב־Private Lesson: המשתמש שותק אחרי תום ההשמעה; ה־Web ממתין לזמן חשיבה
ומבקש מהמורה רמז או משימה הבאה. ללא השתתפות חוזרת מופיע כפתור המשך במקום
פניות בלתי מוגבלות. דיבור, השתקה, offline וסיום משהים את המסלול. פרטים: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## UC-11 — בניית קורס עם המורה

Actor: לומד בעל זכאות. Preconditions: כניסה, זוג שפות ויכולת AI זמינה.
Flow: שאלה אחת בכל פעם → תשובות טקסט/קול → העדפות שמורות וניתנות לתיקון →
אישור העדפות → יצירת תוכנית מלאה → עיון ושינויים → אישור גרסה → שיעור ראשון.
Alternatives: אין מיקרופון → הקלדה; כשל ספק → retry; העדפות השתנו → אישור מחדש;
הקורס הקודם נשמר בזמן השינוי. Postcondition: רק גרסה שאושרה זמינה להתחלת קורס.
Mapping: FR-PC-001/002; SCR-PC-00A–02; SEQ-12.

## UC-12 — שיעור והמשך תרגול באפליקציה

Actor: לומד. Flow: יעד השיעור הבא → הוראה/תרגול → סיכום קצר → כפתור בית →
משימה אחת בכל פעם, משוב והמשך → חזרה לקורס. רמז, דילוג, קול/טקסט ושמירה להמשך
זמינים. אין יצירת בית ללא פעילות לימודית; כשל ספק אינו תשובה שגויה. תוצאות הבית
מועברות לפתיחת השיעור הבא; אי־ביצוע אינו חסם. Mapping: FR-PC-003–005; SCR-10,
SCR-PC-03–04; SEQ-07/12. [פרטי המימוש והחריגים ב־22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## UC-01 — יצירת session משתמש

Web continuation (`gotIt-front@9fb80b2`): on reopening the browser, the client reads its saved rotating refresh token, exchanges it with Core, and hydrates the live account. A legacy tab token is migrated when read. An expired/revoked token leads to signed-out state and local credential cleanup; explicit logout clears both browser stores. A transient Core/network error leaves the saved token for a later retry. Core's default 30-day absolute expiry still bounds this flow. Locally verified and deployed; production restart smoke pending. Maps FR-AUTH-011 / SCR-01.

| שדה | ערך |
|---|---|
| Actor ראשי | משתמש לא מזוהה |
| מערכות | Web/Chrome, Core, OAuth provider |
| Preconditions | application `gotit` פעילה; provider configured לפי המסלול |
| Trigger | בחירת Register/Login/Google/Facebook |
| Postcondition הצלחה | user פעיל + auth session + tokens בלקוח |
| Postcondition כשל | אין session חדש; אין מידע עודף על החשבון |

Main flow: המשתמש מספק credential → Core מאמת application/input → מאמת credential
או provider identity → יוצר/מחדש user identity → יוצר refresh session → חותם JWT
→ הלקוח שומר tokens לפי המדיניות וטוען identity/profile.

Alternate flows: user קיים, סיסמה שגויה, provider email חסר/לא verified, wrong audience,
user disabled, provider/Core/network unavailable, Google popup canceled.

קישורים: FR-AUTH-001–008; SCR-01; SEQ-01/02.

## UC-02 — לכידת מילה ושמירת משמעות

| שדה | ערך |
|---|---|
| Actor ראשי | משתמש מזוהה עם `vocabulary.write` |
| Trigger | selection/double-click/context menu/manual input |
| Preconditions | session תקף; טקסט 1–500; target language ניתנת לפתרון |
| הצלחה | item חדש/סנס חדש/occurrence ממוזג + receipt |

Main flow:

1. הלקוח אוסף טקסט והקשר bounded.
2. Preview פותר שפות ושיטת תרגום.
3. השרת מפעיל provider אם configured, מאמת תוצאה, שומר trace וחותם candidates.
4. הלקוח מציג candidates וסנסים קיימים.
5. המשתמש בוחר translation ו־sense decision.
6. save עם UUID יציב מאמת provenance, locks ו־scope.
7. השרת יוצר/ממזג ומחזיר receipt.

Alternate: אין target/source language, provider unavailable, manual translation,
existing senses require choice, stale merge, invalid/expired token, retry/replay,
same key different payload, subscription required.

קישורים: FR-CAP-001–007; SCR-07/X01/X02; SEQ-03.

## UC-03 — עריכת פריט לימוד

Actor: owner עם write entitlement.  
Preconditions: item קיים ולא שייך למשתמש אחר; detail כולל `updatedAt`.  
Trigger: edit בפרטי item.

Main flow: המשתמש משנה source/languages/translation/type → UI מזהה semantic change
ומזהיר → PATCH עם `expectedUpdatedAt` → השרת נועל, מאמת ומגדיל revision → שומר
history, מאפס evidence עדכני ו־study image → מחזיר detail חדש.

Alternate: concurrent update → 409; same-base languages → validation; lost entitlement;
item deleted/not found; non-semantic status/priority update ללא revision reset.

קישורים: FR-LIB-002–005; SCR-05/06; SEQ-05.

## UC-04 — התקנת חבילת מילים

Actor: משתמש עם write access.  
Preconditions: profile language pair תואם; pack/track/topic פעילים.  
Trigger: בחירת entries ולחיצה Add.

Main flow: list/detail → בחירת 1–100 entries → lock pack/user → upsert membership →
לכל entry חיפוש item same-sense → link/reuse/restore או create → exclude unselected →
receipt totals → CTA לתרגול.

Alternate: entry אינו ב־pack, pack לא תואם/לא קיים, reinstallation, remove keep words,
remove archive exclusive תוך שמירת item עם occurrence/pack אחר/user keep.

קישורים: FR-PACK-001–003; SCR-08; SEQ-09.

## UC-05 — תרגול וניקוד

Actor: משתמש עם `practice.play`.  
Preconditions: active current-revision items; capability נדרש זמין.  
Trigger: smart/manual game.

Main flow: create idempotent session → optional study cards → issue private exercises
→ render prompt → submit exactly one answer mode with stable UUID → server verifies
exercise → scores → atomic attempt/effects/projections/review/XP/activity/receipt → UI
מציג feedback וממשיך → session completed/abandoned.

Alternate: empty scope, skill disabled, provider unavailable, exercise expired/consumed,
stale revision, network timeout/replay, skip, pronunciation permission denied.

קישורים: FR-PRAC-001–004, FR-LEARN-001–004, FR-GAME-001; SCR-03/04; SEQ-04.

## UC-06 — יצירת ופתיחת קריאה

Actor: משתמש עם `reading.ai`.  
Preconditions: quota זמין, provider configured, target language/items תקינים.  
Trigger: Generate במסך Reading.

Main flow: quota check/reserve → resolve targets → provider structured generation →
validate/bind exact targets → optional one repair → signed publication token → preview
לא שמור → user opens → idempotent publication → history/detail → optional article quiz.

Alternate: quota exhausted, provider auth/billing/permission/rate/timeout, missing targets,
invalid response, quota release on failure, expired/tampered publication token.

קישורים: FR-READ-001–005; SCR-09; SEQ-06. ספק הקריאה נמצא ב־WIP מקומי;
בדוק working tree לפני שינוי.

## UC-07 — שיעור פרטי והערכת רמה

Actor: משתמש עם practice access ומיקרופון נתמך.  
Preconditions: Realtime provider configured; absolute beginner כולל support language.  
Trigger: Start lesson.

Main flow: load setup → preferences/roadmap → create short-lived Realtime session →
WebRTC audio/data → timer/mute/translate → wrap-up/goodbye → complete with bounded turns
→ structured report → save continuity/evidence/skill profiles/roadmap → report/level display.

Alternate: permission denied, WebRTC/codec/provider failure, disconnect, user stop, report
timeout/failure/retry, insufficient evidence (range/provisional, no global overclaim).

קישורים: FR-LESS-001–005; SCR-10; SEQ-07.

## UC-08 — רכישת מנוי ועדכון גישה

Actor: משתמש free/trial; Paddle.  
Preconditions: paid plan ו־Paddle config קיימים.  
Trigger: Upgrade.

On the billing screen, a Core-assigned Free plan appears in the current-plan summary.
The offer grid contains purchasable plans only; Free cannot be selected from it.

Main flow: checkout UUID → Core creates/replays hosted transaction → Web opens Paddle →
Paddle sends signed event → Core verifies raw body/idempotency/staleness and updates
projections → billing status derives paid entitlements → clients refresh access.

Alternate: duplicate/failed/stale webhook, past_due grace, cancel scheduled, paused/canceled,
portal unavailable, plan/provider misconfiguration, admin bypass.

קישורים: FR-BILL-001–005; SCR-13/14; SEQ-08.

## UC-09 — Export ו־Import

Actor: משתמש מזוהה.  
Export: הלקוח אוסף עמודים עד `nextCursor=null`, מאמת ומוריד
`learning_library_v1`.  
Import: file local parse ל־`capture_requests_v1`, עד 100 entries, כל entry מקבל
event UUID, השרת מפעיל save/replay ומחזיר 200/207; UI מציג result ומאפשר retry
רק לנכשלים.

Alternate: file גדול/JSON/format לא תקין, entry invalid, deadline partial, lost write
entitlement. אין import ל־score/attempt/XP/mastery.

קישורים: FR-TRN-001/002; SCR-12; SEQ-10.

## UC-10 — שחרור גרסה

Actor: Release Owner/Ops.  
Preconditions: commits מדויקים, approvals, test plan, backup ו־rollback/forward-fix.

Main flow: CI gates → backup → read-only audit/preflight → dedicated migration → deploy
compatible Core/Backend/Web → package Extension candidate → readiness/smoke/metrics →
record evidence and status.

Alternate: dirty/unapproved tree, test failure, migration failure, readiness failure,
provider config mismatch, smoke regression; stop/rollback compatible images/forward-fix.
אין destructive production down אוטומטי.

קישורים: NFR-OPS-001/002, NFR-COMP-001; P16; SEQ-11.

## UC-04A — Follow the English learning path

Actor: authenticated English-source/Hebrew-translation learner. Preconditions: the two English catalog migrations have run and compatible packs are returned by the existing API. Trigger: open `/english-learning` from navigation or SCR-08. Main flow: view three ordered levels and server progress, open the next 50-entry unit, inspect English/Hebrew pairs, install those 50 IDs through the existing add operation, then enter pack-scoped smart practice; revisit the path to see authoritative mastery. Alternatives: catalog unavailable, different profile language pair, API failure/retry, missing vocabulary write entitlement, existing installed unit, or incomplete practice. No progress is inferred from viewing or installing. Source `gotIt-front@4da34116f8b5c6242d5e7ace61f63493ebf185af`; local Web gates passed, production smoke pending. Links FR-PACK-004 and SCR-16.
