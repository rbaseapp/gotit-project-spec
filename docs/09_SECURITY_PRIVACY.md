# 09 — אבטחה ופרטיות

## 2026-10-01 — Product-only migrator boundary for known state

The first migration attempt failed because the dedicated GotIt migrator correctly lacks Core schema privileges. `gotIt-backend@8db500a5594fbc99c1d3e104701b31bd37c372b0` uses the existing scoped GotIt profile FK instead of widening the migrator's Core grants. A first known action inserts only standard profile defaults for its Core-authenticated owner; compound ownership and cascade deletion remain. A fresh-user PostgreSQL regression passed; production retry pending.


## 2026-10-01 — Declared known-word ownership

The new known-entry write is authorized with the existing Core-authenticated application/user scope and `vocabulary.write`; clients cannot submit owner IDs. Requested entry IDs must belong to the selected accessible pack before any insert/delete. Repeated English words propagate only within the same learning-path topic and owner scope. Known rows store catalog IDs and a timestamp, not a new source of user text or inferred mastery. The integration suite checked a second user's known count stays zero and rejects unrelated entry IDs. Source: `gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b`; production rollout pending.


## תיקון רצף השיעור — 2026-09-30

תורות Realtime יזומים כוללים כעת את הקשר השיעור המלא של המשתמש; אין לשלוח
או לתעד מפתח ספק שרתי. שתיקה ופניות המורה אינן מוסיפות ראיות למידה. אין שמירת
אודיו חדשה או הרשאה נוספת. הגבולות והצמצום: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## עדכון קורסים — 2026-09-30

בעלות נגזרת מ־Core, זכאות `practice.play`, סכמה strict, CAS, receipts ומפתחות תשובות
פרטיים מגינים על כתיבות הקורס והבית. קלטי שיחה הם תוכן בלתי מהימן להנחיות הספק.
נוספו שמירת העדפות ושיחת היכרות מוגבלת, מקטעי לימוד, תשובות ו־snapshots של receipts;
אין שמירת קול גולמי או תמליל שיעור מלא במודול. טיוטת בית מקומית ב־sessionStorage
מסומנת כלא מסונכרנת. [רשימת מידע, מגבלות מחיקה ו־retention ב־22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. נכסים רגישים

- סיסמאות ו־password hashes.
- JWT, refresh tokens ו־OAuth tokens.
- Paddle API/webhook secrets ונתוני subscription.
- OpenAI/Anthropic/Google/Azure/Pixabay credentials.
- תוכן לכידה: מילה, משפט, URL וכותרת.
- היסטוריית למידה, attempts, רמה ודו״חות שיעור.
- audio transient ומיקרופון.

## 2. Trust Boundaries

```text
Untrusted: browser UI, extension popup/content script, page DOM, user input
Boundary: Web gateway / extension service worker / API validation
Trusted service: Core and GotIt Backend
Privileged: migrator/admin job
External: OAuth, Paddle, AI, Translation, Speech, Image providers
```

כל נתון מהלקוח, provider או DB JSON receipt מאומת לפני שימוש. client-provided
IDs נבדקים מול scope; אין trust ב־application user, role, tier, score או XP מהלקוח.

## 3. Identity ו־Authorization

- Core מאמת audience + application ID בכל access token.
- GotIt מקבל זהות דרך Core `/auth/me` ולא מ־claims שהלקוח מספק.
- כל query משתמש ב־application + user scope.
- role נטען מהמסד; admin אינו claim סמכותי ב־JWT.
- entitlement guard לפני write/practice/reading/speech.
- 404 מועדף על חשיפת קיום משאב של משתמש אחר.

## 4. Session Security

- access token קצר; refresh token random ומסובב.
- במסד נשמר רק hash של refresh secret.
- Web: access בזיכרון, refresh ב־sessionStorage, ללא cookies.
- Extension: access ב־session storage, refresh ב־local trusted context.
- logout/revocation idempotent.
- אין להדפיס Authorization, Cookie, Set-Cookie, tokens או request bodies ללוג.

סיכון שיורי: XSS ב־Web יכול לגשת ל־sessionStorage. mitigations: CSP, no inline
scripts ככל האפשר, runtime validation, dependency audit, same-origin gateway ו־
React escaping. מעבר עתידי ל־HttpOnly cookie דורש CSRF design ואינו שינוי נקודתי.

## 5. Input ו־Output Controls

- Zod strict objects: שדות עודפים נדחים בגבולות קריטיים.
- Unicode NFKC ו־whitespace normalization; control chars נדחים.
- BCP-47 canonicalization; IANA timezone validation.
- URL רק HTTP/HTTPS, ללא credentials.
- length/count caps לכל text/array.
- SQL parameterized; dynamic sort/filter מתוך allowlist.
- response parsers strict ב־Web וב־Extension.

## 6. Idempotency ו־Integrity

- key הוא UUID ולא מספר רציף.
- request hash מונע reuse עם payload שונה.
- receipt DB הוא מקור replay; לא recompute לאחר semantic edit.
- exercise כולל private expected answer, scope, expiry, revision ו־consumed state.
- XP ledger unique keys מונעים farming/replay.
- provider selection token חתום, bounded וקשור לשפות/run/candidate.

## 7. Provider Security

- keys ב־server environment בלבד.
- data minimization: רק טקסט/הקשר נדרש נשלח.
- context נחשב untrusted prompt data, לא instruction.
- provider errors מסווגים; auth/billing/permission אינם retryable.
- deadlines ו־response schema מגינים מתגובה תלויה/גדולה/שגויה.
- OpenAI Realtime מקבל short-lived client secret ולא server API key.
- redirect/provider URL אינם נפתחים אוטומטית ללא allowlist/validation.

## 8. Web Gateway Controls

- canonical HTTPS origin ב־Production.
- origin check למוטציות API.
- Core route allowlist.
- path decoding/traversal/backslash/dot-segment rejection.
- body size/type limits ו־rate limiting.
- CSP, HSTS, X-Frame-Options, nosniff, referrer ו־permissions policy.
- microphone מותר ל־self; camera/geolocation חסומים.
- upstream redirect נדחה כדי למנוע credential forwarding.

## 9. Extension Controls

- MV3, no `eval`, no remote code.
- content script מקבל רק feature flags ו־bounded context.
- background message allowlist ו־shape validation.
- storage access `TRUSTED_CONTEXTS`.
- `activeTab` ו־temporary injection לאחר user gesture.
- build verification בודק manifest identity/package contents.

## 10. פרטיות ו־Retention

| מידע | ברירת מחדל |
|---|---|
| selected text + sentence | נשמר ב־occurrence אחרי save |
| paragraph | נתמך bounded; יש לבחון אם נדרש ברירת מחדל |
| page URL/title | נשמרים כי המשתמש יזם capture |
| full HTML/page | לא נאסף |
| user pronunciation audio | transient, לא נשמר |
| lesson raw audio | לא נשמר על ידי GotIt |
| lesson turns/report | נשמרים בעת complete לפי journal contract |
| unseen reading preview | לא נשמר כתוכן פתוח |
| provider traces | metadata bounded; לא secret/token |
| soft-deleted item | נשמר עד מדיניות מחיקה קבועה |

לפני launch יש להגדיר: retention לפי סוג נתון, permanent deletion SLA, account
deletion/export, lawful basis/consent, provider subprocessors, age policy ו־DPA.

## 11. Threat Checklist

| איום | הגנה נוכחית | פעולה נוספת |
|---|---|---|
| IDOR | compound scope + ownership | integration tests לכל route חדש |
| token theft | short access, rotation, CSP | incident revocation tooling |
| brute force | rate limit + generic login error | account/email throttling מלא |
| replay mutation | UUID + hash + receipt | metrics על conflicts |
| XP tampering | server scoring | anomaly detection עתידי |
| prompt injection | bounded data + prompt separation | adversarial provider evals |
| malicious page → extension | message validation/trusted storage | permission review בכל release |
| webhook forgery | raw signature verification | alert על failures |
| migration credential abuse | role separation | secret rotation ו־job isolation |
| sensitive logs | redaction/no body | centralized scanning/retention |

## 12. Security Release Gate

- dependency audit ללא high production finding לא מאושר;
- secret scan ו־artifact inspection;
- auth/ownership/entitlement negative tests;
- CSP ו־OAuth origins מול domain סופי;
- Paddle webhook simulation;
- backup/restore ו־migration rollback review;
- privacy/legal review;
- incident owner, rotation runbook ו־contact מוגדרים.
