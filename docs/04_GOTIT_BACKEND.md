# 04 — מפרט GotIt Backend

## 2026-10-05 - Selected-language practice

Practice validates declared language and compatible source script before queue limits and across legacy cards, images, prompts and distractors. Backend `e5f4817b8544b95da739ce4f462e95f50b99689c` is production verified on 2026-10-05; 209 fast and 62 PostgreSQL regressions passed. [Canonical behavior and production evidence](26_PRACTICE_LANGUAGE_ISOLATION.md).

## 2026-10-01 — Library reading guides (backend)

Source: `gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0`.
The owner-scoped `GET /api/v1/learning-items` list now includes nullable
`phoneticText` and `phoneticScheme` from the existing `learning_items` row.
`transliteration:he` identifies a Hebrew-script reading guide for an English
expression; `hebrew_niqqud` retains its existing meaning. The detail endpoint
already returned both fields. No migration, new route, entitlement or learning
evidence change is involved. PostgreSQL integration verified owner isolation.
The 84 active English items in the requested GotIt account were populated and
verified by a scoped read; this data operation is separate from deploying code.
The backend deployment for this commit is pending verification.

## עדכון 2026-09-30 — קורסים אישיים

נוסף `modules/courses`: סכמה, סילבוסים, ספק, repository, service ונתיבים. זהו שירות מוצר
בבעלות GotIt; Core ממשיך לספק זהות וזכאות. מודול השיעורים מקבל הקשר קורס מאושר ומייצר
חבילת בית לאחר למידה. [22](22_PERSONAL_COURSES_IMPLEMENTATION.md) הוא המקור לחוזים,
עסקאות, נתונים, גרסאות ומגבלות ספק. השינוי מקומי וטרם נפרס.

## 1. תפקיד ו־Stack

שירות מוצר עצמאי ב־Node.js 24, TypeScript ו־Express 5. הוא בעל דומיין הלמידה
וכל הנתונים ב־`product_gotit`. Core משמש רק לזהות והרשאות משותפות.

תלויות עיקריות: PostgreSQL/`pg`, Zod, Pino, Helmet, Google Auth Library,
node-pg-migrate. אין ORM. ברירת מחדל מקומית: `http://localhost:3001`.

## 2. Pipeline בקשה

```text
request-id → HTTP logger → Helmet → CORS → IP rate limit
→ body parser → route → Core authentication → user rate limit
→ entitlement/role guard → validation → service/repository
→ error handler
```

JSON כללי מוגבל ל־256KB; pronunciation audio JSON ל־1MB. ב־Production rate limit
ברירת מחדל: 240 בקשות IP ו־120 בקשות user בחלון המוגדר במימוש DB.

## 3. מודולים

### Profile

יוצר profile אוטומטית ב־GET/PATCH. שומר source/translation defaults, timezone,
daily goal, new items per day, translation method, enabled skills, שפות ורמות,
interests ומדדי הערכת רמה. עדכון profile/languages/interests טרנזקציוני.

### Capture ו־Enrichment

Preview פותר שפת מקור לפי input → profile → document hint → provider. שיטת
`auto | dictionary | ai` נפתרת לפי בקשה/העדפה/availability. registry מבודד
providers ומבצע retry מוגבל רק לכשל retryable ובתוך deadline כולל.

מועמד enrichment מכיל text, variants, part of speech, explanation, phonetics,
examples, contextUsed ו־provenance. הבחירה נחתמת ב־`ENRICHMENT_SIGNING_SECRET`.
שמירה מאמתת token, run, שפות ו־provider; manual נשמר כ־user provenance.

Sense policy:

- `auto`: מותר רק אם אין candidate sense קיים.
- `merge`: ה־item חייב להיות בבעלות המשתמש ולהתאים lexical scope.
- `create_new_sense`: יוצר item נפרד גם לאותו source spelling.

### Library ו־Tags

Cursor/page pagination מוגבל, search/filter/sort, optimistic concurrency דרך
`expectedUpdatedAt`, עריכה סמנטית, soft delete/restore, bulk, mastery override,
occurrences, translation history, examples ו־tags.

עריכת source/languages/translation מגדילה `learning_revision`, מאפסת evidence
עדכני ו־study image של revision ישן, אך שומרת attempts, XP והיסטוריה.

### Word Packs

Catalog היררכי Topic → Track/CEFR → Pack → Entries. התקנה יכולה לבחור עד 100
entries, לקשר item קיים עם אותה משמעות או ליצור חדש. הסרה מאפשרת לשמור מילים
או לארכב רק פריטים בלעדיים לחבילה שאין להם occurrence/pack פעיל אחר.

### Practice ו־Learning

השרת יוצר sessions, study cards, exercises ו־attempt receipts. בחירה חכמה
מתעדפת due urgency, weakness, failures, near mastery, priority ו־difficulty.
כאשר חסרה דרישת active recall, typed recall מקבל קדימות. skill אופציונלי שאינו
פעיל בפרופיל אינו חוסם learned.

סוגי scoring:

- typed recall/dictation: normalization והשוואה ל־accepted forms;
- multiple choice: opaque choice ID;
- flashcard: self-rating בלבד;
- matching: התאמות סמכותיות בשרת;
- pronunciation: ספק speech + equivalence logic;
- article quiz: exercise הקשור ל־reading snapshot.

### Dashboard ו־Gamification

מציג projections ולא מחשב מחדש בצד לקוח: counts, due/new, goal, recent
sessions, weekly activity, skill aggregates, XP, level ו־streak. level הוא
`floor(sqrt(xp/100)) + 1`.

### Reading

Anthropic adapter מייצר תוכן structured לפי target expressions ומשמעויות
מאושרות. preview token מוצפן/חתום; רק open נשמר. אם ביטויים חסרים מבוצע repair
מוגבל ואז binding מקומי. quota reserve משתחרר בכשל provider.

### Speech

Google הוא ברירת deployment נוכחית ל־TTS/STT; Azure adapter תומך native
pronunciation assessment. audio קלט מאומת כ־WAV, transient ולא נשמר. ללא ספק
מוגדר מוחזרת שגיאת unavailable ולא score מלאכותי.

### Study Images

Pixabay ראשון: safe search, lexical tag match, cache, download מקומי ו־attribution.
OpenAI image הוא fallback אופציונלי: expression הוא הנושא הראשי והקשר משמש רק
להבהרת סנס. התוצאה נשמרת לפי `learning_revision`; asset זהה ניתן לשיתוף בטבלת
hash ייעודית.

### Private Lessons

OpenAI Realtime session משלב profile, roadmap, milestone, vocabulary ו־continuity.
API תומך setup, preferences, roadmap, create, list, detail, complete ו־delete.
completion מקבל עד 200 turns ו־40,000 תווים, מסכם, מחלץ evidence ומעדכן skill
profiles ורמת CEFR. client secret קצר ואינו נשמר.

### Transfer

Export מחזיר `learning_library_v1` בעמודים. Import מקבל עד 100
`capture_requests_v1`, שומר event ID לכל רשומה ומחזיר 207 כאשר ההצלחה חלקית.
Import אינו מקבל XP, attempts או mastery מהלקוח.

## 4. מדיניות Idempotency

| פעולה | key | receipt |
|---|---|---|
| capture save | UUID header/body | occurrence `capture_receipt` |
| create practice session | UUID header | session `response_receipt` |
| submit attempt | UUID header | attempt `response_receipt` |
| pronunciation assessment | UUID header | attempt receipt |
| publish reading | UUID header | generated content receipt |
| import row | `eventId` | capture receipt |

אותו key עם payload שונה מחזיר conflict. receipt נשמר עם request hash ומאומת
לפני replay. legacy event ללא receipt אינו משוחזר באופן ספקולטיבי.

## 5. Provider Matrix

| יכולת | ספק/Adapter | תצורה מרכזית | fallback |
|---|---|---|---|
| ordinary translation | Google Basic v2 | `GOOGLE_TRANSLATION_API`, key | manual |
| contextual AI translation | OpenAI Responses | key + model + signing secret | profile-defined |
| reading | Anthropic | key, workspace, model | unavailable |
| study photo | Pixabay | API key | OpenAI image או null |
| generated study image | OpenAI Image | API key + model | null |
| private lesson | OpenAI Realtime | key/model/voice/transcription | unavailable |
| speech | Google or Azure | provider credentials/mappings | unavailable |

## 6. תצורה

Core/DB: `DATABASE_URL`, `CORE_API_BASE_URL`, `CORE_APPLICATION_KEY`,
`CORE_AUTH_TIMEOUT_MS`.  
Security: `CORS_ORIGINS`, `TRUST_PROXY_HOPS`, `ENFORCE_PAID_ENTITLEMENTS`,
`ENRICHMENT_SIGNING_SECRET`.  
Learning: `LEARNING_POLICY_JSON`.  
Providers: משתני OpenAI, Anthropic, Google, Azure ו־Pixabay המתועדים ב־README.

כל config נבדק ב־startup. זוגות תלויים כגון OpenAI key+model חייבים להופיע יחד.

## 7. Health ו־Shutdown

- `/health`: liveness, ללא DB.
- `/ready`: `SELECT 1`; בזמן draining מחזיר 503.
- startup בודק schema נדרש והרשאות runtime ב־Production.
- SIGTERM/SIGINT מפסיקים readiness, ממתינים לבקשות, סוגרים HTTP ו־pool.
- Core אינו dependency של readiness כדי למנוע cascading deploy failure.

## 8. Definition of Done ל־Backend feature

1. Zod input contract ו־bounded output.
2. auth/entitlement/ownership לפני גישה לנתון.
3. transaction ו־locks כאשר יש כמה projections.
4. idempotency ל־mutation שניתן ל־retry.
5. migration forward/down על disposable DB.
6. unit + HTTP + integration isolation tests.
7. API catalog ופרויקט האפיון מעודכנים.
8. provider failure classes ו־timeouts מוגדרים.
9. logs ללא תוכן רגיש.
10. rollout ו־rollback מתועדים.

2026-10-06: standalone matching rounds now prefer unseen session items before recycling after review dates move. API payloads and scoring are unchanged. [Source, regression and rollout status](29_MEANING_MATCHING_ROUNDS.md#backend-follow-up-unseen-words-across-standalone-rounds).
# Guided learning checkpoint — 2026-10-06

Backend `0404c8cc72bbb4f32a125f4c9e255318beff9a60` adds owner-scoped guided activity, command receipts, original-turn replay, transcript correction review, course-unit word resolution and fixed teacher voice samples. Profile UI fields and history/smart selection extend existing contracts compatibly. Locally/integration verified; deployment pending. [Canonical contracts and release status](30_FIGMA_FULL_DEV.md).


## 2026-10-06 — DEV learning-path correction

Authoritative introduced-entry count and teacher meeting eligibility. See [canonical contract and exact source](31_LEARNING_PATH_FIDELITY_DEV.md).
