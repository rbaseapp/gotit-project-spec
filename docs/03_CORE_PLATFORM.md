# 03 — מפרט rbase Core

## 1. תפקיד השירות

Core הוא פלטפורמה משותפת למוצרי rbase. ב־GotIt הוא מקור האמת ל־application,
משתמש, זהות חיצונית, session, role, תוכנית חיוב, subscription ו־entitlements.
Core אינו מכיר learning items, תרגולים, תוכן קריאה או שיעורים פרטיים.

## 2. Stack ומבנה

- Node.js 24, TypeScript, Express 5.
- PostgreSQL דרך `pg`; migrations ב־`node-pg-migrate`.
- Zod validation, Pino logging, Helmet.
- Argon2id לסיסמאות, `jose` ל־JWT.
- Google auth library, Facebook Graph verification, Paddle SDK.

```text
src/
├─ modules/applications
├─ modules/users
├─ modules/auth
├─ modules/billing
└─ shared/{config,database,errors,http,logger,middleware,validation}
```

## 3. מודל Application ו־User

- application מזוהה באמצעות key כגון `gotit`.
- email ייחודי בתוך application בלבד.
- אותו email בשני מוצרים יוצר שני `application_users` בלתי תלויים.
- status: `active | disabled`.
- role: `user | admin`; נקרא מהמסד ב־`/auth/me`, לא מ־JWT או input.
- כל child auth row כולל `(application_id, application_user_id)`.

## 4. Password Auth

### Register

`POST /api/v1/auth/register`

- email נחתך, מאומת ומומר lowercase; עד 320 תווים.
- password באורך 12–128.
- hash ב־Argon2id: memory 19456, time 2, parallelism 1.
- user, credential ו־session נוצרים אטומית.
- `email_verified_at` נשאר null.
- חשבון Google-only קיים אינו מקבל password דרך register אנונימי.

### Login

`POST /api/v1/auth/login` מחזיר אותה שגיאת `INVALID_CREDENTIALS` לדוא״ל חסר
ולסיסמה שגויה, כדי לצמצם account enumeration.

### חסרים מחייבים לפני launch מלא

- אימות דוא״ל עם token חד־פעמי ו־expiry.
- forgot/reset password מאובטח.
- ספק email, templates, throttling ו־audit.

## 5. Google ו־Facebook

Google configuration נשמרת per application ו־client type (`web` או
`chrome_extension`). Web שולח ID token; התוסף שולח access token שהתקבל דרך
`chrome.identity`. Core מאמת signature/audience/issuer/expiry, `sub`, email ו־
`email_verified=true`.

Facebook App ID נשמר per application; App Secret נשאר ב־`FACEBOOK_APP_SECRETS`
בשרת. Core מבצע debug token, בודק app/user/scopes/expiry, ואז `/me` עם
`appsecret_proof`. access token חיצוני אינו נשמר.

קישור לזהות קיימת מותר רק לפי verified email באותו application. שינוי email
אצל provider אינו משנה אוטומטית את email המקומי.

## 6. Tokens ו־Sessions

### Access token

| מאפיין | ערך |
|---|---|
| סוג | JWT |
| אלגוריתם | HS256 |
| issuer | `rbase-core` |
| audience | application key |
| ברירת מחדל | 900 שניות |
| claims | `sub`, `application_id`, `sid`, `token_type=access`, `iat`, `exp` |

### Refresh token

פורמט: `<session UUID>.<32-byte random base64url secret>`. במסד נשמר SHA-256
של ה־secret בלבד. refresh נועל את הרשומה, מאמת application/user/status/expiry,
מסובב secret אטומית ומבטל שימוש חוזר בקודם. logout מסמן `revoked_at` באופן
idempotent ושומר audit history.

## 7. Billing

Core מנהל:

- תוכניות free/paid, מחיר, מטבע, interval, grace, trial ו־entitlements;
- checkout attempts עם UUID idempotency;
- customer/subscription/transaction projections;
- Paddle webhook events עם raw-body signature verification;
- portal sessions שנוצרים רק מזהי provider השמורים בשרת.

Paid access ניתן ל־`active`/`trialing`. `past_due` תקף עד סוף grace. `paused`
או `canceled` חוזר ל־product trial פעיל, ואם הסתיים — free. cancel scheduled
אינו מבטל access לפני שה־status משתנה בפועל.

### Webhooks

נתיב: `POST /api/v1/billing/webhooks/paddle`.

- raw body נשמר עד אימות חתימה.
- event IDs idempotent; failed event ניתן לניסיון חוזר.
- lifecycle updates ישנים אינם גוברים על חדשים.
- האירועים הנדרשים: subscription created/updated/canceled,
  customer created/updated, transaction completed.

## 8. API Core

| Method | Path | Auth | תפקיד |
|---|---|---|---|
| POST | `/api/v1/auth/register` | application header | הרשמה |
| POST | `/api/v1/auth/login` | application header | כניסה |
| POST | `/api/v1/auth/google` | application header | Google ID token |
| POST | `/api/v1/auth/google/access-token` | application header | Chrome Google token |
| POST | `/api/v1/auth/facebook` | application header | Facebook login |
| POST | `/api/v1/auth/refresh` | application header | rotation |
| POST | `/api/v1/auth/logout` | application header | revocation |
| GET | `/api/v1/auth/me` | Bearer + header | trusted identity |
| GET | `/api/v1/billing/plans` | Bearer + header | catalog ציבורי למשתמש |
| GET | `/api/v1/billing/status` | Bearer + header | tier ו־entitlements |
| POST | `/api/v1/billing/checkout` | Bearer + idempotency | hosted checkout URL |
| POST | `/api/v1/billing/portal` | Bearer | hosted portal URL |
| POST | `/api/v1/billing/webhooks/paddle` | Paddle signature | fulfillment |

בנוסף: `GET /health`, `GET /ready`, `GET /api/v1`.

## 9. תצורה

חובה: `DATABASE_URL`, `JWT_SECRET` (לפחות 32 תווים).  
Auth: `ACCESS_TOKEN_TTL_SECONDS`, `REFRESH_TOKEN_TTL_DAYS`,
`FACEBOOK_APP_SECRETS`.  
Billing: `PADDLE_ENVIRONMENT`, `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET`,
`BILLING_CHECKOUT_URL`.  
תפעול: `NODE_ENV`, `PORT`, `LOG_LEVEL`.

## 10. Definition of Done ל־Core

- migration קדימה ואחורה על DB חד־פעמי;
- isolation בין applications נבדק במסד אמיתי;
- register/login/OAuth/refresh/logout/me עוברים;
- refresh replay נדחה;
- role ו־billing נקראים מהמסד;
- webhook signature/idempotency/staleness עוברים;
- secrets אינם בלוגים או image;
- `/ready` נכשל כאשר DB לא זמין;
- תרחישי email verification/reset הושלמו לפני פתיחת password auth לציבור.

