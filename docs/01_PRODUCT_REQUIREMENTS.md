# 01 — דרישות מוצר וחוויית משתמש

## 1. חזון

GotIt הופך מפגש אקראי עם מילה או ביטוי לתהליך למידה מדיד: לכידה בהקשר,
בחירת משמעות, תרגול פעיל, חזרה מרווחת ושימוש טבעי בקריאה ובשיחה.

### הצעת הערך

- שמירת מילה מהירה בלי להעתיק עמוד שלם.
- משמעות מותאמת להקשר, עם שליטה סופית של המשתמש.
- הפרדה בין אותה כתיבה למשמעויות שונות.
- תרגול שמודד מיומנויות ולא רק מספר חזרות.
- שקיפות: המשתמש רואה למה פריט נחשב חדש, נלמד או חלש.
- רצף בין Web, תוסף Chrome ושיעור קולי.

## 2. קהלי יעד

| Persona | צורך | מסלול עיקרי |
|---|---|---|
| לומד עצמאי | לבנות אוצר מילים מתוך תוכן אמיתי | Chrome → Preview → Save → Practice |
| לומד שיטתי | תוכנית יומית ומדדי התקדמות | Dashboard → Smart Review |
| לומד לפי נושא/רמה | להתחיל מחבילה מסודרת | Word Packs → Study → Practice |
| לומד בשיחה | לתרגל דיבור ולקבל תיקון | Private Lesson → Report → Roadmap |
| משתמש מתקדם | לנהל, לייבא ולייצא ספרייה | Vocabulary → Bulk/Tags/Transfer |

## 3. Jobs to be Done

1. כשאני פוגש ביטוי לא מוכר, אני רוצה לשמור אותו יחד עם המשפט שבו הופיע.
2. כשיש כמה משמעויות, אני רוצה לבחור משמעות קיימת או ליצור סנס חדש.
3. כשאני מתרגל, אני רוצה שהמערכת תבחר מה חשוב עכשיו ותסביר התקדמות.
4. כשאני רוצה שליטה, אני רוצה לבחור משחק, פריטים, חבילה או נושא.
5. כשאני קורא, אני רוצה טקסט ברמה שלי שמשלב מילים שאני לומד.
6. כשאני מדבר, אני רוצה שיעור שממשיך מההיסטוריה ומתקן לפי העדפותיי.
7. כשאני מפסיק לשלם, אני רוצה לשמור גישה לקריאה של הנתונים שלי.

## 4. מסעות משתמש

### 4.1 הרשמה וכניסה

1. המשתמש בוחר דוא״ל/סיסמה, Google או Facebook.
2. Core יוצר או מאתר `application_user` תחת application `gotit`.
3. Core מחזיר access token קצר ו־refresh token מסתובב.
4. הלקוח טוען profile ו־billing status.
5. חשבון חדש מקבל trial לפי תוכנית Core המוגדרת.

קריטריוני קבלה:

- אין זליגת זהות בין applications.
- כשל כניסה אינו חושף אם דוא״ל קיים.
- refresh ישן נדחה לאחר rotation.
- משתמש חסום אינו מקבל session.

### 4.2 לכידה ושמירה

1. מקור: בחירה בעמוד, double click, תפריט הקשר, popup, Web manual, API או import.
2. נאספים טקסט נבחר, משפט, כותרת, URL, רמז שפה וזמן.
3. `POST /captures/preview` מחזיר שפה, מועמדי תרגום, provenance וסנסים קיימים.
4. המשתמש מאשר תרגום, שפות וסנס.
5. `POST /captures` נשמר עם UUID יציב ב־`Idempotency-Key`.
6. השרת יוצר learning item או occurrence נוסף ומחזיר receipt.

קריטריוני קבלה:

- HTML מלא של העמוד אינו נשלח.
- source ו־target אינם אותה שפת בסיס.
- אם קיימים סנסים, מצב `auto` אינו ממזג ללא אישור.
- retry בטוח מחזיר אותה קבלה ואינו יוצר כפילות.
- selection token מספק הוכחת provenance חתומה לתוכן ספק.

### 4.3 ספרייה

המשתמש יכול לסנן, לחפש, למיין, לערוך, לתייג, להשהות, לארכב, למחוק
רכות, לשחזר, לסמן כקשה או בעדיפות, ולבצע פעולות bulk עד 100 פריטים.

מצב משתמש: `active | paused | archived` ובנפרד `deleted_at`.  
מצב למידה: `new | learning | reviewing | mastered`.  
רמת שימור נגזרת: `acquiring | learned | established`.

### 4.4 תרגול ולמידה

סוגי session:

- `smart_review`
- `flashcards`
- `recall`
- `listening_spelling`
- `matching`
- `pronunciation`
- `article_quiz`
- `manual`

חמש מיומנויות: recognition, recall, listening, spelling, pronunciation.

השרת מנפיק exercise פרטי וקצוב בזמן. הלקוח מחזיר רק תשובה, choice,
self-rating או skip. השרת מחשב score, skill effects, review stage, mastery ו־XP
בטרנזקציה אחת. exercise משומש, זר, ישן או מגרסה סמנטית קודמת אינו ניתן לניקוד.

### 4.5 כלל למידה V1.2

פריט הופך ל־`mastered/learned` רק כשכל התנאים מתקיימים:

- לפחות 3 ניסיונות מדורגים;
- לפחות 2 הצלחות active recall בציון 85 ומעלה;
- ההצלחות התרחשו בשני ימי לוח לפי timezone של הפרופיל;
- recall mastery לפחות 80;
- התשובה האחרונה עוברת;
- review stage לפחות 2;
- אין שתי כשלונות recall מתוך שלושת האחרונים.

Stage 4 ומעלה מייצג `established`. סימון ידני מותר, נשמר כ־`mastery_source=user`
ואינו ממציא evidence. שני כשלונות recall מתוך שלושה יכולים להחזיר ל־reviewing.

### 4.6 Dashboard ו־Gamification

ה־Dashboard מציג לפחות: due, new, active, mastered, paused, פעילות יומית,
streak, XP, level, זמן למידה, sessions אחרונים וחולשה לפי skill.

XP ניתן על פעולה לימודית משמעותית. ברירת מחדל: 10 לתשובה נכונה, 3 לחלקית,
5 ל־self-rating, 10 לסיום session, 20 ל־mastery ו־10 להשלמת יעד יומי.
עד 200 XP ביום ניתן rate מלא; לאחר מכן 25%, מעוגל ל־XP שלם. skip אינו מעניק XP.

### 4.7 קריאה מותאמת

המשתמש בוחר שפה, רמה, סוג, אורך, נושא ופריטים או בחירה חכמה. preview אינו
נשמר כתוכן פתוח. `POST /reading` מפרסם רק לאחר שימוש ב־publication token חתום.
המערכת מאמתת שהמילים שולבו ומבצעת repair מוגבל. קריאה בלבד אינה evidence;
article quiz כן.

מכסה נוכחית בקוד: trial אחד לכל תקופת הניסיון, paid ארבעה בחודש. המדיניות
דורשת החלטה עסקית מפורשת לפני launch רחב.

### 4.8 שיעור פרטי

השיעור תומך ב־1/5/10/15 דקות, קול מורה, חמש מהירויות, מצב standard או
absolute beginner, תחומי מיקוד, תיקון (`critical_only | recast | deep_explanation`)
ושילוב אוצר מילים. השרת יוצר short-lived Realtime client secret; הלקוח מנהל
WebRTC, timer, פתיחה וסיכום. בסיום נשמר journal מסוכם, evidence, roadmap ומדדי
רמה — לא אסימון הספק ולא audio גולמי.

### 4.9 חיוב והרשאות

- tier: `free | trial | paid`.
- admin מקבל גישה מוצרית מורחבת לפי מדיניות השרת.
- entitlements מרכזיים: `vocabulary.read`, `vocabulary.write`, `practice.play`,
  `dashboard`, `reading.ai`, `speech.audio`, `speech.pronunciation`.
- free/read-only חייב לשמור יכולת לצפות בנתונים ובהתקדמות.
- checkout ו־portal נוצרים ב־Core; פרטי כרטיס אינם עוברים ב־GotIt.

## 5. דרישות לא־פונקציונליות

- תמיכה מלאה ב־RTL/LTR ובשמונה locales: ar, de, en, es, fr, he, ru, zh.
- מסכים שמישים מ־320px ועד desktop; touch targets מרכזיים לפחות 44×44.
- כל גבול API נבדק; JSON כללי עד 256KB, audio endpoint עד 1MB.
- פעולות קריטיות idempotent, מבודדות משתמש ומוגבלות בזמן.
- זמני תגובה ארוכים מותרים רק ל־AI/image/speech עם feedback ברור.
- אין fallback שממציא נתוני ספק, תרגום, קול או score.
- נתונים אישיים ו־tokens אינם נרשמים ללוג.
- כל feature חדש כולל contract, migration אם נדרש, tests ו־rollout plan.

## 6. מדדי הצלחה

North Star: מספר learning items שהגיעו ל־learned באופן אמין למשתמש פעיל.

מדדי משנה:

- weekly active learners;
- capture → first practice conversion;
- אחוז השלמת sessions;
- review adherence;
- זמן ומספר ניסיונות עד learned;
- retention ב־stage 4+;
- accuracy לפי skill ו־game;
- שימוש והשלמת AI reading/article quiz;
- שיעור completion ו־repeat של private lessons;
- conversion מ־trial ל־paid ו־churn.

