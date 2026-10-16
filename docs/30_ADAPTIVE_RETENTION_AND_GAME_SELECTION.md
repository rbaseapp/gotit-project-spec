# 30 — אלגוריתם שימור אדפטיבי, בחירת משחקים ומיקוד לימוד

Date: 2026-10-06.
Status: proposal — לא מומש. מחליף את סעיפים 14–15 ו־17.6 של
`14_GOTIT_PRODUCT_AND_LEARNING_SPEC.md` לאחר אישור.

## 0. מצב קיים (נקודת מוצא)

| רכיב | היום | מיקום |
|---|---|---|
| מרווחים | סולם קבוע `[1,3,7,14,30,60]` ימים לפי `review_stage` | `learning.policy.ts` → `decideProgress` |
| קידום stage | רק active recall (הקלדה) בציון ≥85, פעם ביום | `decideProgress`, `practice.service.ts` |
| כישלון | stage −1, חזרה מיידית (0 ימים) | `decideProgress` |
| תעדוף תור | `queue_score` ב־SQL (due, mastery, priority, hard, new) | `practice.service.ts` → `queueRows` |
| בחירת משחק | רצף קבוע matching→flashcards→pronunciation→recall→listening, ואז "ה־skill החלש" | `smartLearningSequence`, `nextExercise` |
| בחירת משתמש | `enabledSkills` בפרופיל, scope (pack/track/topic), משחק ידני | `profile.types.ts`, `practice.validation.ts` |

**הבעיות:**
1. המרווח זהה לכל מילה ולכל משתמש. מילה קלה ומילה שנכשלה 5 פעמים מקבלות אותו 7 ימים.
2. איחור לא נלקח בחשבון. הצלחה אחרי 20 יום באיחור שווה כמו הצלחה בזמן.
3. משחקים קלים (matching, בחירה) לא תורמים לשימור בכלל, ומשחק לא נבחר לפי רמת הקושי המתאימה כרגע.
4. אין למשתמש דרך להגיד "אני רוצה לעבוד על דיבור/האזנה/כתיבה", ואין התאמה של עוצמה או אורך.

## 1. עקרונות

1. **מודל זיכרון לכל מילה:** כל מילה מחזיקה הערכה של מה הסיכוי שהמשתמש זוכר אותה *עכשיו*.
2. **מרווח = הזמן עד שהסיכוי יורד לסף היעד.** לא סולם קבוע.
3. **משחק נבחר כך שהסיכוי להצליח בו יהיה ~80–90%** (desirable difficulty): קשה מספיק כדי ללמד, קל מספיק כדי לא לתסכל.
4. **משקל הראיה תלוי במשחק.** הצלחה במשחק קשה שווה יותר. כישלון במשחק קל אומר יותר.
5. **כללי המוצר נשמרים:** ה־gates של `LEARNED` (2 הצלחות active recall ב־2 ימים וכו') ו־`mastery_source` לא משתנים. המודל מחליף רק את *מתי* ו*איזה משחק*.

## 2. מודל הזיכרון (FSRS)

ממליצים על **FSRS** (Free Spaced Repetition Scheduler, open source, ברירת המחדל של Anki).
יש לו מימוש TypeScript מוכן: `ts-fsrs` (MIT). לא כותבים מאפס.

לכל (מילה × skill) נשמרים שלושה משתנים:

| משתנה | משמעות | טווח |
|---|---|---|
| **S — Stability** | מספר הימים שבהם הסיכוי לזכור יורד ל־90% | 0.1 … 36500 |
| **D — Difficulty** | עד כמה המילה קשה *למשתמש הזה* | 1 … 10 |
| **R — Retrievability** | הסיכוי לזכור עכשיו. נגזר מ־S ומהזמן שעבר, לא נשמר | 0 … 1 |

### 2.1 נוסחאות

```text
R(t) = (1 + F · t / S) ^ C          F = 19/81, C = −0.5,  t = ימים מאז השליפה האחרונה
interval(r) = (S / F) · (r^(1/C) − 1)  → כאשר r = 0.90, interval = S
```

אחרי כל שליפה מחושבים S ו־D חדשים לפי הציון (Again/Hard/Good/Easy) ולפי R ברגע השליפה:
- **הצלחה כש־R נמוך** (נזכר למרות שכמעט שכח) → S קופץ הרבה. זה בדיוק מה שהסולם הקבוע מפספס.
- **הצלחה כש־R גבוה** (חזרה מוקדמת מדי) → S עולה מעט. אין טעם "לחרוש".
- **כישלון** → S יורד, אבל לא לאפס. מילה שנשכחה אחרי 60 יום חוזרת מהר יותר ממילה חדשה.
- **D** עולה בכל Again/Hard ויורד ב־Easy. מילים קשות מקבלות מרווחים קצרים יותר.

### 2.2 יעד שימור (desired retention)

ברירת מחדל **90%**. המשתמש בוחר עוצמה (ראו §5.3):

| עוצמה | יעד | השפעה |
|---|---|---|
| קלה | 85% | ~30% פחות חזרות, שכחה מעט גבוהה יותר |
| רגילה | 90% | ברירת מחדל |
| אינטנסיבית (לפני מבחן/נסיעה) | 95% | פי ~2 חזרות |

### 2.3 מיפוי תוצאת משחק לציון FSRS

| משחק | Again (1) | Hard (2) | Good (3) | Easy (4) |
|---|---|---|---|---|
| typed recall / listening_spelling / cloze | שגוי או דילוג | 70 (שגיאת הקלדה) או hint | 100 | 100, בלי hint, מהיר* |
| multiple choice (recall/recognition) | שגוי | נכון ואיטי* | נכון | — (לא קיים) |
| flashcards (דירוג עצמי) | again | hard | good | — |
| matching | שיבוץ שגוי | נכון אחרי ניסיון שני | נכון בניסיון ראשון | — |
| pronunciation | ציון ספק < 50 | 50–79 | ≥ 80 | — |

\* "מהיר"/"איטי" = ביחס לחציון `responseTimeMs` **של המשתמש עצמו** באותו משחק (מתחת ל־P40 = מהיר, מעל ל־P80 = איטי). זמן תגובה הוא כבר שדה ב־attempt.

### 2.4 משקל ראיה לפי משחק (התאמה שלנו מעל FSRS)

FSRS מניח שכל שליפה היא recall אמיתי. אצלנו לא, ולכן העדכון ממושקל:

```text
S_new = S + strength · (S_fsrs − S)
```

| משחק | strength בהצלחה | strength בכישלון | נימוק |
|---|---|---|---|
| typed recall | 1.0 | 1.0 | הראיה החזקה ביותר |
| listening_spelling | 0.9 | 0.7 | כישלון יכול לנבוע מאודיו |
| cloze (חדש) | 0.9 | 0.9 | שליפה בהקשר |
| MC recall | 0.5 | 1.0 | הצלחה יכולה להיות ניחוש או אלימינציה; כישלון אומר הרבה |
| flashcards | 0.5 | 0.8 | דירוג עצמי אופטימי |
| MC recognition | 0.3 | 1.0 | זיהוי קל מ־recall |
| matching | 0.2 | 0.8 | הקשר הלוח מקל |
| pronunciation | 0.4 | 0.3 | רעש ASR; עדכון בעיקר ל־skill ההגייה |

הערכים האלה הם **ערכי פתיחה**. מכיילים אותם מהנתונים (§7, שלב 4).

### 2.5 אותו יום (learning steps)

- רק **השליפה הראשונה ביום** של skill מסוים מעדכנת את S במלואה. זה משמר את הכלל הקיים "קידום פעם ביום".
- מילה חדשה או שנכשלה חוזרת **בתוך הסשן**: אחרי 2–4 פריטים אחרים, ושוב בסוף הסשן (repair round, קיים).
- אם המילה נכשלה ולא תוקנה בסשן → `due` בעוד 4–8 שעות ("עוד היום"), אחרת מחר.

### 2.6 עומס יומי ופיזור

- **Fuzz:** מוסיפים ±5% אקראיות למרווח (ל־interval > 3 ימים) כדי שמילים שנלמדו יחד לא יחזרו כגוש.
- **ויסות מילים חדשות:** `new_today = defaultNewItemsPerDay × clamp(1 − backlog / (2 × daily_capacity), 0, 1)`.
  כשיש הרבה חזרות באיחור, לא מוסיפים מילים חדשות עד שהעומס יורד.
- **תעדוף due באיחור:** קודם מה שבסיכון הגבוה ביותר, `(target − R_now)` בסדר יורד.
  אחר כך הבונוסים הקיימים: `user_priority`, `manual_hard`.
- **חזרה מוקדמת** (המשתמש רוצה לתרגל מילים שעוד לא הגיע זמנן): מותרת. FSRS מעניש אותה אוטומטית ב־S קטן, כך שהיא לא מזיקה.

### 2.7 מילים "תקועות" (leeches)

מילה עם ≥ 6 lapses (כישלון אחרי שכבר נלמדה) מסומנת `leech`:
- עוברת לסולם משחקים תומך: תמונה (`study_image`), משפט הקשר, ו־hint אוטומטי.
- אופציונלי: מנמוניק מ־AI (בכפוף ל־quota הקיים).
- המשתמש מקבל הצעה: "המילה הזו קשה. לפצל, להשהות או לסמן?"

### 2.8 קשר למצבים הקיימים

`learning_status`, `review_stage`, `retentionLevel` נשמרים ל־UI ול־API, ונגזרים מ־S:

| S (ימים) | review_stage | retentionLevel (אם MASTERED) |
|---|---|---|
| < 1 | 0 | — |
| 1–3 | 1 | — |
| 3–10 | 2 | learned |
| 10–30 | 3 | learned |
| ≥ 30 | 4+ | established |

`next_review_at` במילה = המוקדם מבין ה־due של ה־skills שבמיקוד הפעיל (§5).

## 3. קטלוג המשחקים

| משחק | skill עיקרי | ease** | אורך לפריט | דרישות | סטטוס |
|---|---|---|---|---|---|
| **introduce** (כרטיס היכרות: מילה, תרגום, תמונה, אודיו, הקשר) | — (חשיפה, ללא ציון) | — | 8 ש' | — | חדש |
| matching | recognition | +0.25 | 4 ש' | ≥ 2 פריטים, ≥ 2 משמעויות שונות | קיים |
| MC recognition (מילה → תרגום) | recognition | +0.20 | 4 ש' | ≥ 4 משמעויות | קיים (recall kind=MC, כיוון הפוך) |
| flashcards | recognition | +0.10 | 5 ש' | — | קיים |
| MC recall (תרגום → מילה) | recall | +0.10 | 5 ש' | ≥ 4 מילים | קיים |
| listening choice (שומע → בוחר משמעות) | listening | +0.10 | 5 ש' | speech | חדש |
| cloze (משפט הקשר עם חור) | recall | 0.00 | 8 ש' | context sentence | חדש (יש `hideAnswers`) |
| typed recall | recall | −0.05 | 8 ש' | — | קיים |
| pronunciation | pronunciation | −0.10 | 10 ש' | speech, מיקרופון | קיים |
| listening_spelling | listening + spelling | −0.15 | 10 ש' | speech | קיים |
| speed round (רצף מהיר, 3 ש' לפריט) | recall | −0.10 | 3 ש' | רק למילים established | חדש, אופציונלי |
| article_quiz | recognition בהקשר | 0.00 | — | reading | קיים, נשאר מסלול נפרד |

\*\* **ease** = כמה המשחק קל ביחס ל־typed recall, ביחידות הסתברות. ערכי פתיחה, מכוילים מנתונים.

## 4. בחירת משחק — מה מופיע ומתי

### 4.1 שלבי מילה וסולם המשחקים

| שלב | תנאי | משחקים מותרים |
|---|---|---|
| **0. חדשה** | אין attempts | introduce → matching / MC recognition |
| **1. רכישה** | S < 1 | MC recognition, flashcards, MC recall, ובסוף הסשן typed recall |
| **2. ביסוס** | 1 ≤ S < 7 | typed recall, cloze, listening_spelling, MC recall (כ־scaffold) |
| **3. נלמדה** | 7 ≤ S < 30 | typed recall, cloze בלי hint, pronunciation, listening_spelling |
| **4. מבוססת** | S ≥ 30 | typed recall יחיד או speed round (maintenance) |
| **leech** | lapses ≥ 6 | introduce מחדש עם תמונה והקשר → MC → typed עם hint |

מילה לא מדלגת משלב 0 ישר ל־typed recall. זה ממשיך את `smartLearningSequence` הקיים.

### 4.2 הכלל המרכזי: יעד הצלחה

לכל פריט ב־smart session:

```text
1. focusSkills  = ה־skills של המיקוד הפעיל (§5), שזמינים (speech וכו')
2. targetSkill  = argmax over focusSkills of  focusWeight[s] · (targetRetention − R_now[s])
                  ← ה־skill שבסיכון הגבוה ביותר, ממושקל לפי המיקוד
3. candidates   = משחקים שמאמנים את targetSkill, מותרים בשלב (§4.1), ושהדרישות שלהם מתקיימות
4. לכל משחק g:  p(g) = clamp(R_now[targetSkill] + ease[g], 0.05, 0.99)
5. score(g)     = |p(g) − 0.85|
                + 0.15 אם g הופיע ב־2 הפריטים הקודמים        (גיוון)
                + 0.30 אם g הופיע 3 פעמים ברצף                (חסימה רכה)
                − 0.10 אם g מאמן גם skill נוסף מהמיקוד       (יעילות)
6. בחר min score(g)
```

**ההשפעה בפועל:**
- מילה שעברה הרבה זמן (R = 0.6) → מקבלת MC recall (p ≈ 0.7) במקום typed recall (p ≈ 0.55). קודם scaffold, ומיד אחריו typed.
- מילה שהגיעה בזמן (R = 0.9) → typed recall (p ≈ 0.85).
- מילה מבוססת מאוד → speed round.
- **gate של mastery** (`masteryGateRecall` הקיים): אם חסרה הצלחת active recall להיום, typed recall נכפה, כמו היום.

### 4.3 הרכב סשן

```text
חימום   (~15%)  פריטי due עם R גבוה, משחקים קלים       → הצלחה מהירה
ליבה    (~70%)  due בסיכון + חדשות, משולבים (interleaved)
                יחס חדשות:חזרות לפי מיקוד, ברירת מחדל 1:4
                matching כלוח של 3–4 פריטים (המנגנון הקיים במסמך 29)
תיקון   (~15%)  פריטים שנכשלו בסשן, שוב, במשחק קל יותר בדרגה אחת
סיום            תמיד בהצלחה; אם הפריט האחרון נכשל, מוסיפים פריט קל
```

אורך הסשן נקבע לפי זמן (§5.3) ולפי אורך המשחקים בטבלה §3, לא רק לפי מספר פריטים.

## 5. מיקוד — המשתמש בוחר על מה לעבוד

שלוש בחירות עצמאיות במסך "התחל ללמוד". לכולן יש ברירת מחדל, כך שלחיצה אחת מספיקה.

### 5.1 מה (תוכן)

| אפשרות | מקור | קיים? |
|---|---|---|
| הכל (ברירת מחדל) | כל המילים הפעילות | כן |
| חבילה / מסלול / נושא | `scope: pack/track/topic` | כן |
| רק חזרות שהגיע זמנן | `due ≤ now` | חדש (פילטר) |
| רק מילים חדשות | `status = new` | חדש (פילטר) |
| מילים קשות | `manual_hard` או D ≥ 7 או leech | חדש (פילטר) |
| טעויות אחרונות | נכשלו ב־7 הימים האחרונים | חדש (פילטר) |
| מילים שתפסתי (תוסף/קריאה) | `item_occurrences` | חדש (פילטר) |

### 5.2 מיקוד skill

| מיקוד | משקלי skill (recog/recall/listen/spell/pron) | משחקים בולטים | due נספר עבור |
|---|---|---|---|
| **מאוזן** (ברירת מחדל) | 1 / 1.5 / 0.5 / 0.5 / 0.5 | כל הסולם | recall + recognition |
| **הבנה** (קריאה) | 1.5 / 1 / 0 / 0 / 0 | matching, MC, cloze, article_quiz | recognition + recall |
| **דיבור** | 0.5 / 1.5 / 0.5 / 0 / 2 | typed recall → pronunciation | recall + pronunciation |
| **האזנה** | 0.5 / 0.5 / 2 / 1 / 0 | listening choice, listening_spelling | listening |
| **כתיבה ואיות** | 0 / 1.5 / 0.5 / 2 / 0 | typed recall, cloze, listening_spelling | recall + spelling |

- המשקלים נכנסים ל־`focusWeight` ב־§4.2. משחקים של skill עם משקל 0 לא מופיעים.
- `enabledSkills` הקיים נשאר כ"כיבוי קשיח" (למשל אין מיקרופון). המיקוד הוא העדפה רכה מעליו.
- אם skill במיקוד לא זמין (אין speech לשפה), מציגים הודעה ונופלים ל"מאוזן".
- **"due נספר עבור"** קובע אילו skills יוצרים חזרות. מי שבחר "דיבור" יקבל חזרות הגייה עם מרווחים משלהן, ומי שלא בחר לא יוצף בהן.

### 5.3 אורך ועוצמה

| בחירה | ערכים | שימוש |
|---|---|---|
| אורך סשן | 3 / 5 / 10 / 20 דק' | מחשב מספר פריטים לפי אורכי המשחקים |
| עוצמה | קלה / רגילה / אינטנסיבית | יעד שימור 85/90/95% (§2.2) |
| משחק ידני | אחד מהקטלוג | קיים; גם אז הפריטים נבחרים לפי §2.6 |

## 6. שינויי נתונים ו־API

**`item_skill_progress`** (קיימת), עמודות חדשות:
`stability float8, difficulty float8, last_retrieval_at timestamptz, due_at timestamptz, reps int, lapses int, memory_state text ('new','learning','review','relearning')`.

**`practice_attempts`**, עמודות חדשות (חיוניות לכיול):
`fsrs_grade smallint, predicted_retrievability float8, evidence_strength float8, memory_model_version text`.

**`learning_items`**: `is_leech boolean`. העמודה `next_review_at` נשארת כ־projection (§2.8).

**פרופיל** `learningPreferences`:
```ts
{ enabledSkills: Skill[];                      // קיים
  focus?: 'balanced'|'comprehension'|'speaking'|'listening'|'writing';
  retentionTarget?: 0.85 | 0.9 | 0.95;
  sessionMinutes?: 3 | 5 | 10 | 20;
  memoryParameters?: number[];                 // FSRS weights אישיים, §7 שלב 4
}
```

**`POST /practice/sessions`**, שדות אופציונליים חדשים:
`focus`, `contentFilter: 'due'|'new'|'hard'|'recent_mistakes'|'captured'`, `minutes`.
אלה תואמים לאחור: בלי השדות, ההתנהגות זהה לברירות המחדל.

**`GET /practice/queue`**: מוסיף `retrievability`, `stabilityDays`, `dueAt` לכל פריט (ל־dashboard: "X מילים בסיכון").

**מיגרציית נתונים:** מריצים (replay) את כל היסטוריית ה־attempts הקיימת דרך המודל כדי לחשב S/D התחלתיים. זה מדויק יותר מהמרת `review_stage`.
Fallback למילה בלי היסטוריה: `S = intervalsDays[stage]`, `D = 5`.

## 7. Rollout

| שלב | תוכן | שינוי התנהגות |
|---|---|---|
| **1. Shadow** | מוסיפים עמודות, מחשבים S/D/R בכל attempt ושומרים `predicted_retrievability`. התזמון נשאר הישן | אין |
| **2. תזמון** | `next_review_at` מ־FSRS, ויסות חדשות, leech. feature flag לפי משתמש, השוואה מול קבוצת ביקורת | כן |
| **3. משחקים ומיקוד** | §4.2, משחקים חדשים (introduce, cloze, listening choice), מסך מיקוד §5 | כן, כולל frontend |
| **4. כיול** | job אופליין: אופטימיזציית FSRS weights אישיים אחרי ≥ 1,000 שליפות למשתמש (ts-fsrs/fsrs-rs optimizer); כיול `ease` ו־`strength` ברגרסיה לוגיסטית על כל ה־attempts | שקוף |

**מדדי הצלחה:**
- **True retention:** % הצלחה בשליפה הראשונה של פריט due. היעד הוא קרוב ל־retentionTarget.
- **Calibration:** ממוצע `predicted_retrievability` מול הצלחה בפועל, לפי דליים.
- חזרות ליום למשתמש (עומס), זמן עד `LEARNED`, ושימור משתמשים (D7/D30).

## 8. החלטות פתוחות

1. **יעד שימור ברירת מחדל:** 90% (מומלץ) או 85% (פחות עומס למתחילים)?
2. **due לפי מיקוד או לכל ה־skills?** מומלץ לפי מיקוד (§5.2), כדי שמשתמש לא יוצף בחזרות הגייה שלא ביקש.
3. **משחקים חדשים בשלב 3:** introduce + cloze הכרחיים. listening choice ו־speed round אופציונליים.
4. **leech:** הצעה בלבד, או השהיה אוטומטית אחרי 8 lapses?
5. **התראות:** "X מילים יירדו מתחת ליעד עד מחר" בשעה הרגילה של המשתמש. נשען על מודול notifications הקיים.
