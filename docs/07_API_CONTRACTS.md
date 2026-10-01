# 07 — חוזי API

## 2026-10-01 — Known-word sense matching

`gotIt-backend@10bf19712bc9831a77dd9672c5f78701577a2966` preserves the `PUT /api/v1/word-packs/:id/known` request and response shape. Cross-unit propagation within the English path now requires equal normalized source and translation, so distinct senses of the same English spelling remain independent. The PostgreSQL regression covers `May` (month) versus `may` (possibility) and propagation between identical modal senses. Production deploy pending at this source checkpoint.

## 2026-10-01 — Known English-unit entries

`gotIt-backend@14012a0c6683dde3659bf9e239a7c016adef9a0b` adds protected `PUT /api/v1/word-packs/:id/known` (`vocabulary.write`). Strict body: `{"entryIds": [1..100 distinct UUIDs from this pack], "known": boolean}`; success 200 `{"packId": UUID, "knownCount": integer, "requestId": string}`. A foreign or missing pack returns 404; IDs outside that pack return 400; entitlement failure uses the existing write gate. Repeating the same request is state-idempotent. Within the English learning topic, the selected normalized source words are marked or unmarked in every unit containing them; other topics remain pack-local. `GET /word-packs` and `GET /word-packs/:id` add `progress.known` and `progress.completed` (known ∪ mastered), and detail entries add `known`. Existing progress fields remain. Pack-scoped practice omits known entries without changing mastery, evidence or XP. PostgreSQL regression covers isolation and full-unit marking. Production rollout pending.


## 2026-10-01 — Library list pronunciation fields

`gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0` adds nullable
`phoneticText` and `phoneticScheme` to each owned item in
`GET /api/v1/learning-items`. Existing clients can ignore these additive fields.
For a Hebrew reading guide to an English expression, the scheme is
`transliteration:he`; `hebrew_niqqud` remains a separate existing scheme.
`GET /api/v1/learning-items/:id` already includes both fields. The list
requires the same authenticated GotIt scope as before.

## תיקון רצף השיעור — 2026-09-30

תגובה ליצירת שיעור מוסיפה `realtime.continuationEvent` אופציונלי בלקוח. אירועי
`response.create` נושאים כעת הוראות מלאות והוראת תור; גבול הלקוח 128,000 תווים.
אין נתיב חדש. פרטי תאימות והקשר: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## תוספת מקומית 2026-09-30 — Courses

נוספו 12 נתיבים תחת `/api/v1/courses`; חוזה מלא, payloads ושגיאות נמצאים ב־
[22, סעיף 5](22_PERSONAL_COURSES_IMPLEMENTATION.md). פעולות כתיבה מקבלות `eventId`
ו־`revision`, עם replay של snapshot ו־CAS. תמלול הוא פעולה חולפת ללא receipt.
`courseId` אופציונלי נוסף לפתיחת שיעור; capability בשם `courses` נוספה.
קטלוג הקוד תוקן ל־68 נתיבים, כולל שבעת נתיבי השיעורים שנעדרו ממנו קודם.

## 1. כללים משותפים

### Headers

```http
Authorization: Bearer <Core access token>
X-Application-Key: gotit        # Core בלבד
X-Request-ID: <UUID>            # אופציונלי בלקוח; השרת מחזיר מזהה
Idempotency-Key: <UUID>          # במוטציות המסומנות
Content-Type: application/json
```

### Response ושגיאה

רוב תשובות JSON כוללות `requestId`. שגיאה תקנית:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": { "fields": [{ "path": "item.sourceText", "code": "custom" }] }
  },
  "requestId": "uuid"
}
```

אין לבנות UX על `message`; הלקוח ממפה `code` לטקסט מקומי. 5xx אינו חושף SQL,
provider response, stack או secret.

### HTTP semantics

- `200`: הצלחה או replay.
- `201`: משאב/receipt חדש.
- `207`: import חלקי.
- `400`: shape/validation/selection שגויים.
- `401`: session חסר/לא תקף.
- `403`: role/entitlement/origin.
- `404`: משאב לא קיים או לא בבעלות המשתמש.
- `409`: conflict/idempotency/stale semantic state.
- `413`: body גדול.
- `429`: rate/quota.
- `503`: DB/Core/provider זמנית לא זמינים.

## 2. Core API

כל auth/billing route למעט webhook דורש `X-Application-Key: gotit`.

| Method | Path | Body/Query | Response עיקרי |
|---|---|---|---|
| POST | `/auth/register` | `{email,password}` | user + tokens |
| POST | `/auth/login` | `{email,password}` | user + tokens |
| POST | `/auth/google` | `{idToken}` | user + tokens |
| POST | `/auth/google/access-token` | `{accessToken}` | user + tokens |
| POST | `/auth/facebook` | `{accessToken}` | user + tokens |
| POST | `/auth/refresh` | `{refreshToken}` | rotated tokens |
| POST | `/auth/logout` | `{refreshToken}` | success |
| GET | `/auth/me` | Bearer | `{user}` עם role |
| GET | `/billing/plans` | Bearer | `{plans}` ללא provider secret IDs |
| GET | `/billing/status` | Bearer | tier/access/plan/entitlements/subscription/trial |
| POST | `/billing/checkout` | `{planKey}` + UUID | `{url}` |
| POST | `/billing/portal` | — | `{url}` |
| POST | `/billing/webhooks/paddle` | raw Paddle event | processed/ignored/duplicate |

Auth result:

```json
{
  "user": { "id": "uuid", "email": "user@example.com", "emailVerified": false },
  "accessToken": "jwt",
  "refreshToken": "session.secret",
  "expiresIn": 900
}
```

## 3. GotIt API Inventory

כל הנתיבים להלן תחת `/api/v1` ודורשים Bearer, למעט `GET /api/v1` עצמו.

### Profile ו־Capabilities

| Method | Path | Contract |
|---|---|---|
| GET | `/profile` | יוצר/מחזיר profile |
| PATCH | `/profile` | לפחות שדה אחד; עדכון transactional |
| GET | `/capabilities` | role, configured modules, enabled skills per language |

Profile patch fields: `defaultSourceLanguage`, `defaultTranslationLanguage`,
`timezone`, `dailyGoal`, `defaultNewItemsPerDay`, `translationMethodPreference`,
`learningPreferences.enabledSkills`, `languages[]`, `interests[]`.

### Capture

| Method | Path | Auth נוסף | Contract |
|---|---|---|---|
| POST | `/captures/preview` | `vocabulary.write`; paid ל־AI | preview |
| POST | `/captures` | `vocabulary.write` + idempotency | save/merge receipt |

Preview input:

```json
{
  "selectedText": "bank",
  "sourceText": "bank",
  "sourceLanguageCode": "en",
  "translationLanguageCode": "he",
  "documentLanguageHint": "en",
  "translationMethod": "auto",
  "translationDetail": "expanded",
  "context": {
    "sentenceText": "We sat on the river bank.",
    "paragraphText": null,
    "pageTitle": "Example",
    "pageUrl": "https://example.com/page"
  }
}
```

Save דורש `item`, `translation`, `context`, `senseDecision` ו־UUID אופציונלי
ב־body שחייב להתאים ל־header. text limits: source 500, translation 1000,
sentence 4000, paragraph 12000, title 500, URL 2048.

### Library ו־Tags

| Method | Path | קלט מרכזי |
|---|---|---|
| GET | `/learning-items` | pagination, search, status, flags, tag/pack, sort |
| GET | `/learning-items/:id` | full detail |
| PATCH | `/learning-items/:id` | semantic/status/priority edit |
| DELETE | `/learning-items/:id` | soft delete |
| POST | `/learning-items/:id/restore` | restore |
| POST | `/learning-items/:id/mastery` | `{mastered:boolean}` |
| POST | `/learning-items/bulk` | עד 100 IDs + action |
| PUT | `/learning-items/:id/tags` | עד 50 tag IDs |
| GET | `/learning-items/:id/occurrences` | cursor, limit ≤100 |
| GET | `/learning-items/:id/translations` | cursor, historical flag |
| GET/PUT | `/learning-items/:id/examples` | עד 20 examples |
| GET | `/learning-items/:id/audio` | binary audio; entitlement |
| GET/POST/PATCH/DELETE | `/tags[/:id]` | paginated CRUD |

Sort: `recent | alphabetical | learning_status | weakest | strongest |
due_next | most_practiced`. Bulk actions: pause, resume, archive, delete, restore,
mark/return mastery, priority normal/high, hard/clear.

### Word Packs

| Method | Path | Contract |
|---|---|---|
| GET | `/word-packs` | catalog + installed/progress |
| GET | `/word-packs/:id` | pack + entries |
| POST | `/word-packs/:id/add` | `{entryIds:[1..100]}` |
| PUT | `/word-packs/:id/known` | `{entryIds:[1..100],known:boolean}`; returns known count |
| DELETE | `/word-packs/:id?mode=` | `archive_exclusive | keep_words` |

### Practice ו־Learning

| Method | Path | Contract |
|---|---|---|
| GET | `/practice/sessions` | history |
| POST | `/practice/sessions` | idempotent create |
| GET | `/practice/sessions/:id` | detail |
| GET | `/practice/sessions/:id/study` | cards ללא evidence |
| GET | `/practice/sessions/:id/study/:itemId/image` | cached/generated image descriptor |
| PATCH | `/practice/sessions/:id` | completed/abandoned |
| POST | `/practice/sessions/:id/exercises` | issue 1–100 private exercises |
| POST | `/practice/attempts` | idempotent authoritative scoring |
| GET | `/learning/queue` | limit ≤100 |

`GET /learning/queue` keeps its response shape. Algorithm `gotit-v1.3` orders eligible words by the last successful current-revision matching attempt: no success first, then oldest success. Queue score breaks ties. A newly created smart review session snapshots this order; explicit item selections retain their supplied scope.
| GET | `/learning/config` | policy + algorithmVersion |

Session input מאפשר `sessionType`, עד 100 item IDs, `readingId`, scope יחיד
`pack|track|topic`, ו־count. scope אינו משולב עם explicit items. article quiz
מחייב readingId.

Attempt input מחייב בדיוק אחד: `answerText`, `choiceId`, `selfRating` או
`skipped=true`; בנוסף `hintsUsed` ו־`responseTimeMs`.

### Dashboard ו־Gamification

| Method | Path | Query |
|---|---|---|
| GET | `/dashboard` | `recentPage`, `recentLimit≤20` |
| GET | `/dashboard/activity` | `days≤366` |
| GET | `/gamification` | — |

### Reading

| Method | Path | Contract |
|---|---|---|
| GET | `/reading/quota` | current quota |
| POST | `/reading/preview` | generation preview + publication token |
| POST | `/reading` | idempotent open/persist |
| GET | `/reading` | history |
| GET | `/reading/:id` | detail |
| DELETE | `/reading/:id` | delete owned reading |

Preview input: target language, optional topic/CEFR, content type
`article|essay|news_style|story|other`, length `short|medium|long`, ועד 20 items.
Publish body: `{publicationToken}` עד 130,000 תווים.

### Pronunciation

`POST /pronunciation/assessments` דורש entitlement, UUID idempotency, `exerciseId`,
optional language code ו־base64 WAV עד 666,668 תווים. התשובה כוללת receipt סמכותי;
audio אינו נשמר.

### Private Lessons

| Method | Path | Contract |
|---|---|---|
| GET | `/private-lessons/setup` | `targetLanguageCode` |
| POST | `/private-lessons/roadmaps` | language + goal kind/key |
| PUT | `/private-lessons/preferences` | full preferences |
| POST | `/private-lessons/realtime-sessions` | create secret/session |
| GET | `/private-lessons` | list, limit ≤50 |
| GET | `/private-lessons/:id` | journal/report |
| POST | `/private-lessons/:id/complete` | duration, reason, turns |
| DELETE | `/private-lessons/:id` | remove owned journal |

Duration: 1/5/10/15. Voice: male/female. Rate: very_slow/slow/normal/fast/very_fast.
Focus: speaking/vocabulary/grammar/fluency/pronunciation/listening. absolute beginner
מחייב support language שונה משפת היעד.

### Transfer

| Method | Path | Contract |
|---|---|---|
| GET | `/export` | paginated `learning_library_v1` |
| POST | `/import` | עד 100 `capture_requests_v1`; 200/207 |

## 4. שגיאות דומיין מרכזיות

| Code | משמעות/פעולת לקוח |
|---|---|
| `VALIDATION_ERROR` | תקן שדות; אין retry זהה |
| `INVALID_ACCESS_TOKEN` / `UNAUTHORIZED` | refresh פעם אחת או כניסה מחדש |
| `CORE_AUTH_UNAVAILABLE` | retry מאוחר; אין bypass |
| `SUBSCRIPTION_REQUIRED` | הצג billing/read-only |
| `IDEMPOTENCY_CONFLICT` | אל תחליף payload לאותו UUID |
| `SENSE_SELECTION_REQUIRED` | הצג merge/new sense |
| `MERGE_ITEM_CHANGED` | preview חדש |
| `ENRICHMENT_SELECTION_INVALID` | preview חדש; token פג/לא מתאים |
| `EXERCISE_EXPIRED/CONSUMED` | הנפק exercise חדש; לא score מקומי |
| `AI_MONTHLY_LIMIT_REACHED` | הצג quota/reset |
| `SPEECH_NOT_CONFIGURED/UNAVAILABLE` | השבת feature זמנית |
| provider auth/billing/permission | אין retry אוטומטי; תפעול נדרש |
| provider timeout/rate/upstream | retry bounded לפי מדיניות שרת |

## 5. Versioning ושינוי חוזה

- breaking change דורש `/api/v2` או תקופת backward compatibility מפורשת.
- הוספת שדה response היא non-breaking רק אם כל הלקוחות דוחים/מתעלמים באופן בטוח.
- enum חדש עלול להיות breaking ללקוח strict ולכן דורש תיאום.
- שינוי scoring/learning policy אינו API version, אך מחייב `algorithmVersion` חדש.
- API catalog, מסמך זה, parsers ובדיקות contract חייבים להתעדכן באותו change set.
