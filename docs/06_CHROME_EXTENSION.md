# 06 — מפרט תוסף Chrome

## 2026-10-05 - Chrome verified email entry points

Source `gotIt-chrome@46dff89bbc974d932abc7228f09ce23198954a34` (1.4.5) routes popup Register/Forgot password to Web modes and rejects legacy direct registration before network access. Eight locales; no new permissions. Verify passed 41 tests and build/security checks; keyless archive packaged. Store upload/publication pending. [Canonical behavior and rollout](27_EMAIL_AUTH_RECOVERY.md).

## 1. מטרת התוסף

Manifest V3 client ללכידת מילה או ביטוי מתוך עמוד Web, preview של משמעות בהקשר,
בחירת סנס ושמירה ל־GotIt. התוסף אינו מנוע תרגום ואינו מחזיק provider secrets.

גרסה שנבדקה מקומית: `1.4.4`; יעד build: Chrome 127+.

## 2. רכיבים

```text
background service worker
├─ auth.ts       Core sessions + chrome.identity
├─ api.ts        GotIt requests and safe retry
├─ settings.ts   preferences + optional content registration
└─ index.ts      message router, context menu, pending capture

content script   selection UI, double click, inline preview/save
popup            auth, manual/selection capture, review/save
options          behavior, size, language and theme settings
```

## 3. Capture Entry Points

- context menu “Save to GotIt”.
- selection floating action.
- double-click instant translation.
- toolbar popup עם active-page selection.
- manual text entry.

Context כולל רק selected text, sentence, bounded paragraph, title, URL,
document language hint ו־timestamp. אין שליחת DOM/HTML מלא.

## 4. State Machine

```text
IDLE
 ├─ EXTRACTING_CONTEXT → IDLE | CONTEXT_FAILED
 └─ LOADING_PREVIEW → PREVIEW_READY | PREVIEW_FAILED
PREVIEW_READY → SAVING → SAVED | SAVE_FAILED
any relevant state → AUTH_REQUIRED | OFFLINE
```

שגיאה אינה מאבדת את capture payload. save retry משתמש באותו event ID.

## 5. Auth ו־Storage

- email register/login דרך Core.
- Google דרך `chrome.identity.getAuthToken`, ואז Core
  `/auth/google/access-token`.
- refresh token + public user ב־`chrome.storage.local`.
- access token + expiry ב־`chrome.storage.session`.
- storage access level מוגבל ל־`TRUSTED_CONTEXTS`; content script אינו קורא tokens.
- 401 אחד גורם refresh; כשל refresh מנקה session.
- logout מנקה Core session, Chrome cached tokens ואחסון מקומי.

הערת סיכון: refresh token persistent מקל שימוש לאחר restart אך מגדיל השפעת
compromise של extension context. ההגנה היא trusted contexts, CSP, no remote code,
review של permissions ו־session revocation.

## 6. Message Boundary

ה־background מאמת allowlist מדויק של message types ושדות לפני ביצוע:

- bootstrap/auth/logout;
- content config/context capture;
- inline preview/save;
- popup preview/save;
- saved item update/remove;
- profile/settings get/update.

UUIDs, enums ו־nested shapes נבדקים. message לא מוכר או עם שדה עודף נדחה.

## 7. Permissions

| Permission | שימוש |
|---|---|
| `storage` | settings ו־session material |
| `contextMenus` | שמירת בחירה |
| `activeTab` | extraction רק לאחר user gesture |
| `scripting` | הזרקה זמנית/רישום content feature |
| `identity` | Google OAuth |
| `http://*/*`, `https://*/*` | selection/inline features ו־API origins |

הרחבת content behavior צריכה להיות opt-in/מוסברת. אין broad persistent content
script במניפסט; registration מסונכרן לפי settings והרשאה.

## 8. Settings

- selection action ו־double-click translation בנפרד.
- close on outside click.
- popup size: small/medium/large.
- auto close after save.
- light/dark theme.
- default source/translation language וסימון צורך בסנכרון profile.
- onboarding completion.

## 9. API Behavior

רק service worker מבצע Core/GotIt fetch. timeout מוצר 30s. preview ו־save יכולים
retry פעם אחת על network או 502/503/504; save בטוח רק עם אותו idempotency key.
update/delete אינם מקבלים retry אוטומטי. כל בקשת מוצר נושאת Bearer ו־request ID.

## 10. Build ו־Identity

`npm run build` יוצר `dist`; `npm run package` יוצר
`artifacts/gotit-chrome-WEBSTORE-v<version>.zip` מתוך staging מבודד.
unpacked build כולל public key קבוע ל־extension ID יציב. Web Store package חייב
להשמיט `manifest.key`, כי החנות בעלת identity הייצור. אין לארוז ידנית את `dist`
או להעלות אותו לחנות. תהליך האריזה בודק את ה־manifest מתוך ה־ZIP הסופי,
מוודא שהמפתח חסר והגרסה תואמת, ומוחק ZIP שנכשל בבדיקה.

ברירות build:

- Core production: `https://rbase-core-api.onrender.com/api/v1`.
- GotIt production: `https://gotit-backend.onrender.com/api/v1`.
- override ציבורי: `CORE_API_BASE`, `GOTIT_API_BASE`, `GOOGLE_OAUTH_CLIENT_ID`.

אין להעביר provider key כ־build variable.

## 11. Localization ו־Accessibility

Chrome `_locales` וה־UI תומכים ar/de/en/es/fr/he/ru/zh. ה־popup וה־inline panel
חייבים direction נכון, focus order, labels, keyboard save/cancel, reduced motion
וטקסט שגיאה שלא תלוי בצבע בלבד.

## 12. Web Store Release Checklist

1. `npm ci && npm run verify && npm run package`.
2. העלאת `gotit-chrome-WEBSTORE-v<version>.zip` לפריט החנות הקיים; בדיקת ZIP
   שאין `manifest.key`, sourcemaps, secrets או artifacts מיותרים.
3. OAuth Chrome client קשור ל־Web Store item ID הקבוע.
4. אותו client רשום ב־Core ל־`gotit` כ־`chrome_extension`.
5. origins מדויקים מותרים ב־Core/GotIt policy.
6. Privacy URL ציבורי תואם `PRIVACY.md`.
7. acceptance אמיתי: email, Google, preview, merge, new sense, retry, logout.
8. review ידני של permissions ו־Store listing.
9. version bump ו־rollback package שמורים.

## 13. Definition of Done לתכונת Extension

- אין provider call או secret בצד תוסף.
- אין גישה ל־token מ־content context.
- request/message validation מלאה.
- עובד בעמוד רגיל, עמוד חסום, offline ו־auth expired.
- retry אינו יוצר כפילות.
- permission חדש מוצדק ומתועד.
- tests ל־state/messages/settings/i18n ו־`verify-build` עוברים.
- נבדק ידנית Chrome profile נקי ו־Web Store build.
