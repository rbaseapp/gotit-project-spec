# 08 — מודל נתונים ומיגרציות

## 2026-10-01 — English catalog data migration

`gotIt-backend@ba9ab573749d7a2705f44738c40b45d4d30c777a` adds migration `1790800006000_daily-english-catalog.js`: one `word_topics` row, three `word_tracks` rows, 60 `word_packs`, and 3,000 `word_pack_entries` for source `en` and translation `he`. No new table or column is introduced. The migration must run with the dedicated migrator; source presence is not evidence it ran in production. See [23_ENGLISH_LEARNING_PATH](23_ENGLISH_LEARNING_PATH.md).

## 2026-10-01 — Existing phonetic columns

`gotIt-backend@c138f5464de818552a54ca584c43ccdaee980da0` reuses
`product_gotit.learning_items.phonetic_text` and `phonetic_scheme` for the
initial English-to-Hebrew reading guides. The scheme `transliteration:he`
distinguishes them from existing `hebrew_niqqud` data. No migration occurred.
An owner-scoped data update populated 84 active English items in the requested
account; deleted items and non-English source items were excluded. A source
expression or source-language edit still clears both phonetic columns.

## תיקון רצף השיעור — 2026-09-30

תיקון הובלת השיעור אינו משנה טבלאות או ספי התקדמות. מצב דיבור/השמעה ותקציב
פניות נשמרים בזיכרון הלקוח בלבד ונמחקים ביציאה. ההקשר המאושר הקיים נשמר: [22, סעיף 9](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## עדכון מקומי 2026-09-30 — 39 טבלאות מוצר

מיגרציה additive `1789488019000_personal-courses.js` מוסיפה `learning_documents`,
`learning_commands` ו־`private_lesson_sessions.course_context`. המסמכים והקבלות
מבודדים ב־application/user עם FK מורכבים, revision ו־snapshot תוצאה.
הספירה הקודמת של 37 להלן היא baseline; מלאי המוצר לאחר המיגרציה הוא 39, ללא שינוי ב־Core.
[מבנה, פרטיות וקשר ליומן שיעורים ב־22](22_PERSONAL_COURSES_IMPLEMENTATION.md).

## 1. עקרונות

- PostgreSQL עם schemas לוגיים `core` ו־`product_gotit`.
- UUID primary keys; timestamps ב־UTC.
- כל נתון משתמש מוצרי scoped ב־`application_id` + `application_user_id`.
- foreign key מורכב מונע שיוך משתמש לאפליקציה אחרת.
- soft delete לפריטי לימוד; history ו־audit נשמרים.
- attempts/events הם מקור evidence; counters/scores הם projections.
- אין שינוי migration שכבר רץ; שינוי חדש = migration חדש.

## 2. Core — 13 טבלאות

| קבוצה | טבלה | תפקיד |
|---|---|---|
| tenancy | `core.applications` | products/applications |
| identity | `core.application_users` | user per application, status, role |
| auth config | `core.application_auth_providers` | provider config per app |
| auth config | `core.application_auth_provider_clients` | web/extension OAuth clients |
| credentials | `core.password_credentials` | Argon2 password hash |
| credentials | `core.oauth_identities` | Google/Facebook subject link |
| sessions | `core.auth_sessions` | refresh hash, expiry, revocation |
| billing | `core.billing_plans` | catalog, trial, grace, entitlements |
| billing | `core.billing_checkout_attempts` | idempotent checkout |
| billing | `core.billing_subscriptions` | provider subscription projection |
| billing | `core.billing_webhook_events` | webhook idempotency/audit |
| billing | `core.billing_customers` | provider customer mapping |
| billing | `core.billing_transactions` | transaction projection |

## 3. GotIt — 37 טבלאות

### Profile

| טבלה | תפקיד |
|---|---|
| `user_profiles` | defaults, timezone, daily goal, learning preferences |
| `user_language_proficiencies` | self/system/effective CEFR, ranges, confidence |
| `user_interests` | personalization interests |

### Vocabulary ו־Capture

| טבלה | תפקיד |
|---|---|
| `learning_items` | source/sense/status/revision/mastery/review/image |
| `item_translations` | accepted forms, primary/history/provenance |
| `item_occurrences` | capture context + idempotent receipt |
| `item_examples` | examples per semantic revision |
| `enrichment_runs` | provider trace, model, status, latency |
| `tags` | user tag catalog |
| `learning_item_tags` | item↔tag many-to-many |

### Practice ו־Learning

| טבלה | תפקיד |
|---|---|
| `item_skill_progress` | five-skill projections |
| `practice_sessions` | session scope/selection/receipt/summary |
| `practice_exercises` | private answers, expiry, consumption, revision |
| `practice_attempts` | immutable scored attempt + receipt |
| `attempt_skill_effects` | multi-skill effect per attempt |
| `learning_algorithm_events` | versioned transition audit |
| `api_rate_limits` | DB-backed buckets |

### Content, Images ו־Quota

| טבלה | תפקיד |
|---|---|
| `generated_contents` | opened reading + publication receipt |
| `generated_content_items` | reading target bindings/ranges |
| `study_image_assets` | shared binary asset by content hash |
| `ai_monthly_usage` | trial/month quota counters |

### Gamification

| טבלה | תפקיד |
|---|---|
| `user_gamification` | total XP, level, streak projection |
| `xp_events` | unique reward ledger |
| `user_daily_activity` | profile-calendar daily aggregates |

### Word Packs

| טבלה | תפקיד |
|---|---|
| `word_topics` | catalog topic |
| `word_tracks` | language pair + CEFR track |
| `word_packs` | versioned module |
| `word_pack_entries` | curated words/translations/examples |
| `user_word_packs` | installation/removal state |
| `learning_item_pack_entries` | link, exclusion, keep-by-user |

### Private Lessons

| טבלה | תפקיד |
|---|---|
| `private_lesson_sessions` | settings, transcript summary, continuity, report |
| `private_lesson_preferences` | per-language defaults |
| `private_lesson_roadmaps` | active goal plan |
| `private_lesson_milestones` | ordered plan milestones |
| `private_lesson_milestone_evidence` | lesson evidence/task completion |
| `private_lesson_skill_profiles` | skill estimate projection |
| `private_lesson_skill_evidence` | evidence history |

## 4. יחסים מרכזיים

```mermaid
erDiagram
  APPLICATIONS ||--o{ APPLICATION_USERS : owns
  APPLICATION_USERS ||--o{ LEARNING_ITEMS : owns
  LEARNING_ITEMS ||--o{ ITEM_TRANSLATIONS : meanings
  LEARNING_ITEMS ||--o{ ITEM_OCCURRENCES : captured_at
  LEARNING_ITEMS ||--o{ ITEM_SKILL_PROGRESS : projects
  PRACTICE_SESSIONS ||--o{ PRACTICE_EXERCISES : issues
  PRACTICE_EXERCISES ||--o| PRACTICE_ATTEMPTS : consumes
  PRACTICE_ATTEMPTS ||--o{ ATTEMPT_SKILL_EFFECTS : affects
  LEARNING_ITEMS ||--o{ LEARNING_ITEM_PACK_ENTRIES : linked
  WORD_PACKS ||--o{ WORD_PACK_ENTRIES : contains
  PRIVATE_LESSON_ROADMAPS ||--o{ PRIVATE_LESSON_MILESTONES : plans
  PRIVATE_LESSON_SESSIONS ||--o{ PRIVATE_LESSON_SKILL_EVIDENCE : yields
```

## 5. Learning Item Invariants

- lexical identity: normalized source + source language + translation language + sense.
- כמה senses לאותה כתיבה מותרים.
- primary current translation אחת לכל item.
- accepted current forms עד 100.
- `learning_revision > 0`; semantic edit מגדיל revision.
- exercise/occurrence/example/image קושרים revision רלוונטי.
- `user_status` ו־`learning_status` הם dimensions נפרדים.
- `deleted_at` אינו שקול ל־archived.
- `overall_mastery_score` הוא projection, לא evidence מקורי.

## 6. Idempotency Invariants

- key ייחודי בתוך user/action scope.
- request hash הוא SHA-256 קנוני.
- receipt מכיל version ו־resource IDs.
- replay מאמת שה־receipt עקבי עם השורה.
- key זהה + hash שונה = conflict.
- transaction/advisory lock מונע race לפני unique constraint.

## 7. Migration Ownership

מיגרציות Core ההיסטוריות שיצרו baseline מוצרי נשארות immutable. תוספות חדשות
לדומיין GotIt נמצאות ב־`gotIt-backend/migrations` ומשתמשות בטבלת metadata
`gotit_migrations.pgmigrations` וב־advisory lock משותף. runtime אינו מריץ migration
אוטומטית; migrator נפרד משתמש ב־`GOTIT_MIGRATION_DATABASE_URL`.

Core image הנוכחי מריץ `npm run migrate` לפני start. שינוי זה דורש credential עם
DDL; בהקשחת Production רצוי pre-deploy job נפרד כדי שה־runtime לא יחזיק DDL.

## 8. Backup ו־Restore

- לפני migration production: schema-only backup + backup מנוהל של הספק.
- preflight ו־normalization audit הם read-only.
- down migration רק על DB חד־פעמי; אינו rollback production אוטומטי.
- rollback אפליקטיבי חייב לתמוך ב־schema החדש או להתבצע אחרי restore מתוכנן.
- RPO/RTO ותרגיל restore רבעוני הם החלטה תפעולית פתוחה.
