# 22 — מימוש קורס אישי ושיעורי בית

תאריך: 2026-09-30. מצב: **ממומש במאגרים המקומיים של Backend ו־Web; לא בוצעה פריסה בסבב זה.**
מקור הדרישות: [אפיון 21, PC-01–PC-28](21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md).
נקודת ההתחלה בסבב זה: Backend `68176aa`, Web `090f410`. אין שינוי ב־Core או בתוסף.
בבדיקת הסיום HEAD היה `d01d100` ב־Backend ו־`05c9564` ב־Web, עם תיקוני סיום בעצי העבודה.

## 1. חוויית המשתמש

הכניסה לשיעורים פרטיים מציעה בניית קורס עם המורה ושומרת כניסה משנית לשיחה חופשית.
במסך הראשון יש רק בחירת שפה נלמדת ושפת הסברים, עם ברירות מחדל מהפרופיל.
לאחר מכן מוצגת שאלה אחת בכל פעם, עד שלוש תשובות מוצעות ואפשרות להקליד או לדבר.
השאלות מותאמות למטרה, לניסיון, לזמן, לתחומי עניין ולצורכי גיל וקריאה. המערכת מציעה
נקודת התחלה; המשתמש אינו נדרש לאבחן את רמת ה־CEFR או לבחור רשימת כללי דקדוק.

התהליך כולל שני אישורים נפרדים:

1. סקירת העדפות שמורות: שפות, מטרה, מסלול, קצב, ניסיון, גיל/קריאה, דברים שהמשתמש
   ציין והמלצות המורה. ניתן לערוך מטרה או לבקש תיקון בשיחה. רק אישור מפורש מאפשר בנייה.
2. עיון בתוכנית מלאה: כל היחידות, השיעורים, הדקדוק, אוצר המילים, התוצאה, התלויות,
   זמן משוער, דוגמת שיעורי בית ומשימת סיום. רק אישור גרסה זו מפעיל את הקורס.

כל היחידות נפתחות לעיון גם לפני שמגיע תורן. בקשת שינוי נשמרת; שינוי בהעדפות מחייב
סקירה מחודשת. יצירת גרסה חדשה אינה מפעילה אותה ואינה מוחקת את ההתקדמות הקודמת.
ניתן להמשיך בשיעור של התוכנית הפעילה בזמן עיון בהעדפות חדשות.

מפת הקורס מציגה פעולה ראשית לשיעור הבא. דף הבית ומסך הלמידה מציעים חזרה לקורס או
לחבילת תרגול פתוחה. מסכי הקורס והבית מצמצמים באנרים כלליים למשתמש משלם, ומשאירים
התראות זכאות נחוצות. קיימים תרגומים לכל שמונה שפות הממשק, RTL/LTR, גודל מגע מינימלי,
פירוט נפתח, מצבי המתנה/שגיאה, תמיכה במקלדת ובהפחתת תנועה.

## 2. מסלולים, תוכן והתקדמות

שלושה מסלולים: לימוד מקיף, דקדוק שיטתי או יעד ממוקד. קיימות רשימות כיסוי נפרדות
לאנגלית, עברית, ערבית, ספרדית, צרפתית, גרמנית, רוסית וסינית. הן מגדירות נושאים של
השפה עצמה; אין החלה של רשימת הזמנים באנגלית על שפות אחרות. מסלול מקיף/דקדוק חייב
לכלול את מפתחות הכיסוי; מסלול יעד יכול לבחור תת־קבוצה ולהצהיר על גבולותיו.

לשפות אחרות מתקבלת תוכנית מותאמת עם בסיס `generated_scope` והבהרה שההיקף זמני.
רשימות הכיסוי הן תוכן מוצר ראשוני בגרסה `2026-09-30.1`, **לא סילבוס שעבר אישור
בלשני חיצוני ולא הבטחה ללימוד כל שימוש אפשרי בשפה**. איכות הבנייה והמשוב מותנית בספק.
הסכמה מאפשרת 3–40 יחידות, 2–10 שיעורים ביחידה; ההנחיה הרגילה היא 12–24 יחידות
למסלול רחב. המספר והקצב הם הערכה, ולא התחייבות לסיום ברמת CEFR מסוימת.

השרת בודק מפתחות ייחודיים, ידע מקדים שמופיע קודם, וכיסוי נדרש. יחידות שכבר נלמדו
נשמרות בדיוק ובאותו סדר יחסי בעת שינוי התוכנית. תוצאה מאוחרת משיעור בגרסה ישנה
אינה מקדמת תוכן שהוחלף בגרסה החדשה. התוכנית כוללת יעד לכל שיעור, ולא רצף משפטים מקריים.

השיעור הבא מקבל snapshot מאושר של הקורס, יעד השיעור, דקדוק, אוצר מילים ותוצאות
של עד שלוש חבילות קודמות. אי־ביצוע שיעורי בית אינו חוסם אותו. בשיעור רגיל שפת
התמיכה זמינה לבקשת עזרה או תרגום; במסלול מתחילים מאפס היא שפת ההסברים.
ילד ויכולת קריאה הם שדות נפרדים מרמת השפה. פירוט התיקון בסעיף 9.

כיסוי חומר ויכולת עצמאית נספרים בנפרד. התקדמות לשיעור הבא דורשת משימה שהושלמה,
בטחון שאינו נמוך, עצמאות של לפחות 80 ואיכות ראיות moderate/strong בדוח השיעור.
זהו סף מוצר ראשוני, שאינו הסמכה ואינו שינוי באלגוריתם אוצר המילים. שימור לטווח ארוך
מסומן `not_assessed`: לא מומש בסבב זה מנוע חזרה מרווחת נפרד לכללי קורס. תור החזרות
הקיים של אוצר המילים נשמר. בדיקת ידע לצורך דילוג אוטומטי על יחידה עדיין אינה זרימה נפרדת.

## 3. סיכום שיעור ושיעורי בית

הדוח מציג עד שתי נקודות חוזקה, נקודה אחת לשיפור, המשך וכפתור תרגול. הדוח המפורט
נמצא באזור נפתח. לאחר שיעור עם עדות לפעילות לימודית נוצרת חבילה במצב pending;
כניסה אליה מכינה את המשימות ומציגה מצב הכנה אמיתי. שיחת פתיחה שנקטעה ללא למידה
אינה מייצרת חומר כאילו נלמד. כשל בהכנה מאפשר ניסיון נוסף.

החבילה קשורה לשיעור ולגרסת יחידה. כל משימה חייבת לצטט מקטע אמיתי מן השיעור.
הנחיית הספק מגבילה את התרגול לחומר שנלמד; בדיקת הציטוט לבדה אינה הוכחה פדגוגית
שכל פריט שנוצר אכן מתאים, ולכן נדרש גם QA תוכן לפני שחרור.

סוגי המשימות: בחירה, השלמה, סידור משפט, שינוי מבנה, תשובה פתוחה והאזנה.
מוצגת משימה אחת בכל פעם. המשוב נשאר עד לחיצה על המשך. ניתן לקבל רמז, לנסות שוב,
לדלג או לשמור להמשך. לאחר שתי תשובות שגויות מוצגת דוגמה. תשובה עמומה אינה נחשבת
טעות; כשל בספק אינו צורך ניסיון. ניסוח שקול נבדק מול חלופות שמורות או שיפוט מותאם ליעד.

הלקוח שולח תשובה בלבד, ללא ציון/XP. תשובות צפויות אינן נשלחות לפני סיום המשימה.
רמז, בחירה, סידור והאזנה עם חלופת טקסט אינם נרשמים כהפקה עצמאית. דילוג אינו מוסיף
ראיית הצלחה או כישלון. תוצאות הבית מספקות הקשר לשיעור הבא, ואינן מעניקות CEFR/XP
או mastery של פריט במערכת התרגול הקיימת.

תשובות שנשלחו ורמזים נשמרים בשרת. כפתור שמירה להמשך שומר גם תשובה שטרם נשלחה.
בזמן הקלדה נשמרת טיוטה זמנית ב־sessionStorage, לפי משתמש/חבילה/משימה, עם הסבר
שהטיוטה טרם סונכרנה; היא נמחקת לאחר שליחה. היסטוריית שיחה שנשלחה והעדפות נשמרות
בשרת, אך טקסט היכרות שטרם נשלח אינו נשמר אוטומטית.

## 4. קול ויכולות

הקלטה מתחילה בלחיצה, מוגבלת ל־15 שניות ומוצגת כטקסט לעריכה לפני שליחה.
השרת מאמת WAV מונו 16kHz ומעביר תמלול ל־OpenAI; אין אחסון קול גולמי.
בכשל נשמרת חלופת הקלדה. שאלות/משוב זמינים להקראה באמצעות קול תואם שפה של הדפדפן.
לילדים וללומדים שקריאתם מתפתחת יש גם כפתור הקראה נפרד לכל אפשרות במשימת בחירה.
אם אין קול תואם, אין הבטחת הקראה; משימת האזנה מציעה גם טקסט.
המימוש לילד שאינו קורא תלוי בזמינות קול ובדיקת שימושיות במכשיר בפועל.
מסלול התמלול אינו מעניק ציון הגייה מתוך טקסט.

המימוש משתמש במשתנים הקיימים `OPENAI_API_KEY`, `OPENAI_TRANSLATION_MODEL`
ו־`OPENAI_REALTIME_TRANSCRIPTION_MODEL`. יצירת תוכן משתמשת ב־Responses עם
Structured Outputs, אימות Zod ו־`store:false`; שגיאה/סירוב/תוצאה חלקית אינם תוכנית.
timeout: יצירת תוכן 65 שניות, תמלול 20 שניות, בקשת לקוח 75 שניות.
השרת אינו מבצע retry סמוי של פעולת AI. יש rate limit קיים לפעולות ספק; לא נוספה
מכסת חיוב חודשית חדשה. קובץ `course.provider.ts` מכיל את החוזה ואת צמצום המידע.

מקורות API שנבדקו לצורך המימוש: [Speech to text](https://developers.openai.com/api/docs/guides/speech-to-text)
ו־[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
בדיקת תיעוד ובדיקת fake אינן אישור שהמודל המוגדר בחשבון החי תומך בכל החוזה.

## 5. חוזה HTTP

כל הנתיבים תחת `/api/v1/courses`, דורשים זהות Core והרשאת `practice.play` בהתאם
להגדרת אכיפת הזכאות הקיימת. בעלות מגיעה מה־middleware בלבד. תשובות משתמשות ב־
`{course}`, `{homework}` או `{text}`; הרשימה מחזירה `{courses,homework,available}`.

| Method | נתיב יחסי | קלט/פעולה |
|---|---|---|
| GET | `/` | קורסים וחבילות של הבעלים, עד 100 מכל סוג |
| POST | `/intake` | `eventId,targetLanguageCode,supportLanguageCode` |
| POST | `/transcribe` | `audioBase64,languageCode` |
| GET | `/:id` | מצב הקורס, טיוטה/גרסה פעילה, שיעור הבא וראיות רלוונטיות |
| POST | `/:id/turns` | `revision,eventId,message,channel,mode` |
| PUT | `/:id/preferences` | `revision,eventId,preferences` |
| POST | `/:id/preferences/approve` | `revision,eventId` |
| POST | `/:id/plan` | `revision,eventId` |
| POST | `/:id/activate` | `revision,eventId,version` |
| GET | `/homework/:id` | מצב חבילה ציבורי ללא מפתח תשובות עתידיות |
| POST | `/homework/:id/prepare` | `revision,eventId` |
| POST | `/homework/:id/actions` | `revision,eventId,taskIndex,action,answer,channel` |

`channel=text|voice`; `mode=preferences|plan`; `action=answer|hint|skip|draft`.
סכמות גבול strict. `POST /private-lessons/realtime-sessions` מקבל גם `courseId`
אופציונלי; ההקשר והיעד נגזרים מחדש בשרת. `GET /capabilities` כולל `courses`.
קטלוג ה־API תוקן ל־68 נתיבים: 12 חדשים ו־7 נתיבי שיעורים שהיו חסרים בקטלוג.

שגיאות עיקריות: 401 ללא זהות; 402 ללא זכאות; 404 לבעלות זרה/חסר;
409 `COURSE_CHANGED`, העדפות לא מאושרות, אין שיעור הבא או מגבלת גרסאות;
400 שפה/קלט לא תקינים; 503 ספק לא זמין, תוכנית לא תקינה או מקור משימה לא תקין.
`x-request-id` נשמר. מגבלת JSON לתמלול: 700KB בשרת, 1MB ב־gateway.

## 6. נתונים, אטומיות ופרטיות

מיגרציה חדשה בלבד: `1789488019000_personal-courses.js`. לאחריה 39 טבלאות מוצר:

| שינוי | תוכן |
|---|---|
| `learning_documents` | aggregate JSONB מסוג course/homework, revision, תאריכים ובעלות מורכבת |
| `learning_commands` | UUID פעולה, fingerprint, snapshot התוצאה וקישור למסמך, באותה עסקה |
| `private_lesson_sessions.course_context` | snapshot מאושר של ההקשר בעת פתיחת שיעור |

FK מורכב לפרופיל ו־FK מורכב מקבלה למסמך מגינים על הבעלות. שמירה נעשית ב־compare-and-swap
על revision. יצירת AI נעשית מחוץ לעסקת DB; תשובה ישנה נכשלת בעת שמירה ולא דורסת עריכה.
חזרה על eventId עם אותו תוכן משחזרת את התוצאה שנשמרה; תוכן שונה מחזיר 409.
כל כתיבה נוספת עדיין בודקת revision, גם לאחר replay. אין תופעת לוואי כפולה.

מזהה שיעורי הבית הוא מזהה השיעור; רישום ראיות שיעור בודק שהמזהה טרם נרשם.
קישור החבילה והשלמת יומן השיעור ניתנים לחזרה בטוחה, אך אינם עסקה משותפת אחת.
כשל לפני השלמת היומן מאפשר retry של אותה השלמה. התקדמות אוצר המילים/XP לא שונתה.

נשמרים עד 40 פריטי שיחת היכרות, snapshots וגרסאות, בקשות שינוי, דוח שיעור,
עד 12 מקטעי לימוד של 500 תווים, תוכן משימות ותשובות/רמזים/ניסיונות.
מפתחות תשובות נשארים בשרת עד סיום המשימה. קול גולמי ותמליל שיעור מלא אינם נשמרים
במודול זה. נתוני בקשה אינם נכתבים ללוג. קבלות פעולה מכילות snapshot ויש לכלול אותן
במדיניות המחיקה/retention העתידית; מחיקת פרופיל מפעילה cascade.
מחיקה רכה של דוח שיעור במסלול הישן אינה מוחקת את היסטוריית הקורס/חבילת הבית.
מדיניות retention מלאה ומחיקת חשבון נשארות פער הפרויקט הקיים.

## 7. עקיבות ובדיקות

| דרישות | מימוש | ראיות |
|---|---|---|
| PC-01–04, 19, 21–25 | CoursePage, CourseService, curriculum | component tests, אישורים/שינויים/כיסוי/היסטוריה ב־courses.test.ts |
| PC-05–07, 18 | summary, recordLesson, prepareHomework | דוח מצומצם, ציטוט מקור, אין למידה בשיחת פתיחה; integration |
| PC-08–12, 17 | homeworkAction, HomeworkPage, repository | ניסיון ראשון, רמזים, ספק עמום, כפילויות, שמירה וחזרה |
| PC-13–14 | lessonContext, private lesson prompt | הקשר בית ליעד הבא; אין תנאי חסימה על השלמת בית |
| PC-15 | CSS, סמנטיקה וקטלוגי שפה | 37 בדיקות Edge ב־he/en, רוחב 320/390/1440 ומקלדת, ועוד 4 בדיקות tablet/landscape; בדיקת תמונות |
| PC-16, 20, 27 | גיל/קריאה נפרדים, CourseComposer, WAV/STT | חוזה קול ו־fallback ממומשים; בדיקת הקראת אפשרויות עם fake; קבלת ספק/מכשיר וילדים עדיין נדרשת |
| PC-26, 28 | revisions, receipts, pendingPlanChange | PostgreSQL אמיתי, מרוץ כתיבות, replay, דחיית generation ישן |

בדיקות אוטומטיות משתמשות ב־fake לספקים. בדיקות הדפדפן מריצות את ה־Web האמיתי
עם fixtures ל־API, ואינן מוצגות כבדיקת E2E חיה מול ספק. תוצאות הפקודות הסופיות
מפורטות בעדכון הבדיקות ב־[11](11_TESTING.md). צילומי המסך נוצרו ב־
`gotIt-front/test-results/course-*.png` (תוצרי בדיקה מקומיים).

## 8. הפעלה וגבולות אימות

לפני הפעלה בסביבה משותפת: backup, הרצת המיגרציה עם תפקיד migrations, preflight
עם תפקיד runtime, פריסת Backend ואחריו Web ובדיקת עשן. אין משתני סביבה חדשים;
יש לוודא תמיכה בפועל של המודלים שכבר הוגדרו. ה־gateway והשרת צריכים את מגבלת
גוף התמלול המעודכנת. המיגרציה additive; down נבדק רק במסד disposable ומוחק את
נתוני התכונה. אין לבצע down אוטומטי בייצור.

לא בוצעו פריסה, מיגרציית production, קריאת ספק בתשלום, הקלטה ממכשיר פיזי או
מחקר שימושיות עם ילדים. כיול ההערכה, ביקורת סילבוסים, מדידת שימור מאוחר,
רשימת יכולות קול לפי שפה/מכשיר ותקציב ספקים הם תנאי איכות להרחבת השחרור.
ה־Web build עדיין מציג אזהרה קיימת על chunk ראשי גדול מ־500KB; מסכי הקורס עצמם נטענים ב־lazy loading.

## 9. תיקון איכות השיעור והובלת השיחה — 2026-09-30

בעקבות דיווח על פתיחה בעברית בשיעור אנגלית, חזרה על משפטים ללא הסבר ושתיקה,
נמצאו בקוד הנחיות סותרות: פתיחת קורס בשפת העזר, הגבלת כל תגובה לשני משפטים,
ותרגול חופשי כשאין מילים שמורות גם כאשר הוגדר יעד דקדוק. לא נקרא תמליל המפגש
שעליו דווח, ולכן אלה ממצאי קוד ולא שחזור של אותו שיעור.

**PLQ-01 — שפה עקבית:** שיעור רגיל, כולל קורס, נפתח ומתנהל בשפה הנלמדת.
עזרה/תרגום בשפת התמיכה ניתנים לבקשה מפורשת ולתור אחד. מתחילים מאפס מקבלים
ברכה קצרה בשפה הנלמדת עם פירוש מיידי, ואחריה הוראה נגישה בשפת התמיכה.
אותו כלל חל על כל צמד שפות, ולא רק אנגלית/עברית.

**PLQ-02 — הוראה לפני הפקה:** יעד השיעור מוביל את הפתיחה: משמעות ושימוש,
תבנית ושתי דוגמאות, בדיקת הבנה, תרגול מודרך ואז שימוש עצמאי. הסבר חדש יכול
להשתמש בעד שישה משפטים קצרים; משוב שיחתי נשאר קצר. מבחן יחידה עצמאי אינו
מקבל את התשובה מראש. קורס עם אוצר מילים שמור ריק עדיין מקבל את היעד שאושר.
שחזור משיעור קודם מוגבל לנקודה רלוונטית; חומר קל נבדק בקצרה ומתקדם.

**PLQ-03 — התקדמות והובלה:** תשובה נכונה מובילה לדוגמה חדשה או יישום עצמאי.
אחרי שני ניסיונות שלא הצליחו מחליפים הסבר או מפשטים משימה. אין ברירת מחדל
של חזרה אחרי המורה. בכל תור לימודי ניתנת פעולה אחת ברורה להמשך; שבח בלבד
אינו מסיים את התור. דוגמאות חדשות נשארות בתוך יעד הקורס. העתקה ושתיקה אינן
ראיה לשליטה, ולא שונו ספי ההערכה או כללי ההתקדמות במסד.

**PLQ-04 — מניעת המתנה ללא הכוונה:** ב־Web בקר `PrivateLessonFlow` מתחיל
זמן חשיבה לאחר סיום השמעת הקול, ולא רק לאחר `response.done`. הוא צורך אירועי
דיבור משתמש, התחלה/סיום/ניקוי שמע, סיום תגובה ומד עוצמת שמע כגיבוי. לאחר
15 שניות פעילות שקטה, או 20 במצב מתחילים/קצב איטי, נשלח `continuationEvent`
עם ההקשר הקיים: רמז חדש למשימה שלא נענתה, או השלב הבא אם נענתה.
המערכת ממתינה בזמן הפקה/השמעה/דיבור, השתקה, לשונית נסתרת, offline וסיום שיעור.
חזרה מהשהיה מתחילה זמן חשיבה חדש. לכל היותר שתי פניות אוטומטיות ללא השתתפות;
לאחר מכן מופיע „נמשיך בשיעור”. תקלה בשליחה או תגובה שנכשלה מאפשרות ניסיון
ידני, בלי לולאת retries. מזהה אירוע מונע משגיאת בקשה אחרת לשחרר תגובה פעילה.
סגירה/איפוס/יציאה מנקים את הבקר והטיימרים ומתעלמים מאירועים מאוחרים.
כפתור ההמשך תופס שורה ברורה מעל פעולות התרגום והסיום. בפריסה קצרה לרוחב,
הכותרת נשארת בשורה מלאה והעמודות מתכווצות בלי לדחוף את המילים מעל הפקדים.

**PLQ-05 — שימור ההקשר בכל תור יזום:** ב־Realtime, שדה
`response.create.response.instructions` מחליף את הנחיות ה־session לתגובה זו.
לכן פתיחה, תרגום, סיום והמשך מכילים את מלוא ההנחיות וההקשר המאושר, ובסופם
הוראת התור. אין הסתמכות על משפט „פעל לפי ההנחיות” כשהן אינן באותו prompt.
חוזה התגובה מוסיף `realtime.continuationEvent`; בלקוח הוא אופציונלי לתאימות
לשרת ישן. סכמת הוראות התור מאפשרת עד 128,000 תווים במקום 1,000. אין נתיב,
מיגרציה, מודל ספק, הרשאה או משתנה סביבה חדש בתיקון זה. אין שמירת אודיו חדשה.
הדפדפן מקבל את הקשר השיעור השייך למשתמש בלבד, לא מפתח ספק שרתי.

מקור ההתנהגות של override: [OpenAI Realtime client events](https://developers.openai.com/api/reference/resources/realtime/client-events).
סמנטיקת VAD: [Voice activity detection](https://developers.openai.com/api/docs/guides/realtime-vad).
נשמר `semantic_vad`; לא הוסף אליו `idle_timeout_ms` שאינו נתמך במצב זה.

בדיקות רגרסיה מקומיות מכסות חוזי שפה והקשר, רצף אירועי Realtime עם שעון מדומה,
גבול פניות, מרוץ VAD/בקשה, השמעה ארוכה, דיבור, השתקה, שגיאה, סיום ויציאה.
בדיקות UI משתמשות בספק מדומה. פרטי הרצות ב־[11](11_TESTING.md).
הוראות פדגוגיות הן הנחיות מודל ולא הבטחת התנהגות דטרמיניסטית; נדרש עדיין
שיעור קבלה חי עם הקול והמודל המוגדרים כדי לאמת איכות הסבר, קצב והגייה.
לא בוצעה פריסה בסבב התיקון. התמיכה האוטומטית בהמשך מתייחסת ל־Web, לא לדף
הדמו הפנימי של Backend. חיבור שאינו מחזיר עוד אירועים אינו מתוקן באמצעות
יצירת תגובות מקבילות; סגירת החיבור מטופלת במסלול הניתוק הקיים.


## 2026-10-12 - Illustrated My Programs (DEV)

DEV programs now derive card content/progress from existing resources, generate scoped AI covers and language-specific Mohi, and preserve the fixed shared header. API, cache/privacy invariants, responsive QA, checks and rollout are owned by [39 - Programs design DEV](39_PROGRAMS_DESIGN_DEV.md).


## Homework source identifiers and safe provider diagnostics - 2026-10-17

The DEV homework prepare incident was reproduced against the actual saved lesson and
configured OpenAI model. The original request `86317539-c251-4f77-9743-c16e19de77cd`
returned 503 after 424 ms. A read-only scoped diagnostic reproduced HTTP 400
`invalid_json_schema`, parameter `text.format.schema`: a newline in a saved excerpt
was rejected as a strict-schema string literal in `tasks.items.sourceQuote`.
This is a schema-construction defect, not evidence of an unavailable AI service.

`CourseService.prepareHomework` now sends only server-generated `source_1`, etc.
identifiers in the provider task schema (`sourceId`). The request data contains the
identifier-to-exact-excerpt mapping in `source.quotes`, alongside the existing saved
turns, taught grammar examples and corrected forms. The service validates membership,
resolves identifiers locally, preserves Unicode/control characters and surrounding
whitespace exactly, and supplies the original quotes to the existing independent
quality review. Repair drafts use the same identifier mapping throughout the request.
Unknown identifiers fail before saving content, progress, revision or command receipts.
The rule covers both 3-6-task unit follow-up and 12-18-task daily homework.

Public request/response/error contracts, persisted `sourceQuote`, meeting guards,
revision/replay behavior, answer privacy, quotas, models and quality review remain
compatible. Existing prepared/attempted homework does not require rewriting. There is
no migration, new environment variable, frontend or Core change.

The provider accepts an injected diagnostic logger and optional request-ID resolver.
Failures record bounded model/operation, stage, elapsed time, provider HTTP status and
request ID, and a safe category (authentication, invalid request, upstream, timeout,
incomplete, refusal or invalid response). It never logs the error object, provider
body, schema literals, prompts, learner data or credentials. Public failures retain
`COURSE_AI_UNAVAILABLE`; deterministic HTTP rejection is not automatically retried.
Main resolves the existing request context; the older DEV baseline records provider
request IDs without importing newer Admin modules.

### Evidence and release boundary

- Local Backend main baseline: `8a09d8b`; typecheck, 256 fast cases, build and
  repository-wide formatting pass. The focused personal-course PostgreSQL suite also
  passes against its disposable Docker database.
- Live diagnostic: DEV Backend `srv-dar6ei7f3r2c73balbp0`, deployed commit
  `941f59e9ece2a51e7d85eec2c2e83a8a6961c03f`, verified `gotit_dev` database,
  dedicated `gotit_runtime`, DEV Core, configured model `gpt-6-sol`.
- A temporary in-memory diagnostic adapter applied the same identifier protocol to
  the deployed service and actual saved lesson. Two generation/review rounds returned
  four HTTP 200 responses; the final four-task, three-minute practice passed existing
  structural and independent quality checks in 29,145 ms. SQL used
  `default_transaction_read_only=on`; save was replaced with an in-memory result.
  No account progress, database content, running service source or configuration was
  changed. This proves live provider acceptance of the protocol, not deployment of
  the local patch or authenticated browser acceptance after release.
- Regression cases cover multiline Hebrew/English, CR/LF/tab/NUL, quote/backslash and
  surrounding whitespace, both practice sizes, report-derived evidence, invalid
  source IDs, receipt replay and privacy-safe failure diagnostics.
- A separate worktree/branch `fix/homework-source-ids-dev-20261017` is based on the
  exact deployed DEV commit and contains only this fix and its tests. Main includes
  unrelated newer Admin/database work, so it is not the proposed DEV release source.
  Prepared local release commit: `f0233a3`. DEV branch typecheck, all 272 fast cases,
  build, changed-file formatting and focused disposable PostgreSQL course integration
  pass. Its repository-wide format check flags 228 files in the older checkout
  (including pre-existing CRLF formatting); unrelated files were left unchanged.
  Source was published and deployed to DEV after the owner explicitly requested
  releasing all prepared changes; completed release evidence follows. Production is
  outside this incident release. Retain saved work on rollback.


### Completed DEV deployment and authenticated acceptance

The owner authorized DEV deployment in the follow-up. Branch
`fix/homework-source-ids-dev-20261017` was pushed normally to GitHub, and exact commit
`f0233a37263ef7dcab28c4fb0304e38ef3231a2b` was manually deployed to the existing
DEV Backend service. [Render deployment dep-db9s60bncjis73afnc40](https://dashboard.render.com/web/srv-dar6ei7f3r2c73balbp0/deploys/dep-db9s60bncjis73afnc40)
reported **Deploy succeeded | Live**, duration 48.7 seconds. It started on
2026-10-17 at 21:48:33 and became Live at 21:49:22, Jerusalem time. The existing
manual deployment policy and configured branch were preserved. No schema migration,
new environment variable, credential/grant change, Web/Core deployment or production
release was required or performed.

After deployment, Backend `/health` and `/ready` and Web `/ready` returned HTTP 200;
Backend readiness explicitly reported the database as healthy. The live affected
homework prepare request `f64ad344-110f-47f1-b7e3-42b782338a90` returned HTTP 200 in
15,662 ms and created four tasks. A concurrent older preparation returned the
expected 409 `COURSE_CHANGED` after learner actions had advanced its revision;
it did not overwrite progress. A fresh authenticated browser read resumed task 3
of 4, with two completed tasks and the saved-answer notice. No answers, hints or
skips were submitted by the deployment verification; observed task advancement came
from concurrent learner activity.

The browser acceptance used the query-free homework URL. The previously open
URL with an encoded `return` query displayed the existing gateway `INVALID_PATH`
response; this separate deep-link behavior was not changed by the provider fix.
Normal in-app preparation and saved homework resume were verified after release.

[Successful DEV deployment screenshot](evidence/2026-10-17-homework-source-ids/dev-deployment.jpg).
[Authenticated homework resume screenshot](evidence/2026-10-17-homework-source-ids/dev-homework-resume.jpg).

Backend main retains the equivalent uncommitted source fix in the user workspace;
only the isolated DEV release branch was published/deployed. Main's newer Admin
request-context adapter is preserved locally. The prepared DEV patch contains all
source-ID, exact-evidence, safe-diagnostic and regression changes supported by its
actual deployed baseline. Production main was not pushed by this task.


## 2026-10-21 - Free learning paths and reversible skips

FR-PATH-CHOICES / UC-PATH-CHOICES / P-LEARNING-NAVIGATION: prepared programs and personal courses allow direct content selection, with reversible skips stored separately from completed learning. Backend/Web ownership, exact API/data contracts, invariants, acceptance and DEV release evidence are maintained in the [canonical feature contract](49_LEARNING_PATH_CHOICES.md).
