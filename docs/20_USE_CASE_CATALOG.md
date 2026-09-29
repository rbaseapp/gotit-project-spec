# 20 — קטלוג Use Cases

## UC-01 — יצירת session משתמש

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

