# 25 — תנועת אווטאר המורה

## Further lip calming — 2026-10-02

Source: `gotIt-front@3ec2d2899e4cf6504e65aba01f19e425c9a87942`. Locally verified; production pending.
Both tutors now use a 110 ms audio-envelope time constant for opening/closing
and a 160 ms eased mouth crossfade. This further reduces fast syllable flicker
following visual feedback. The 30 Hz update cadence and provider voice speed remain.
Regression: 60 ms onset stays below 0.45; alternating 32 ms amplitude pulses have
less than 0.21 range including startup; silence reaches closed pose within 420 ms
and exact zero by 550 ms. Browser verifies 160 ms transitions and reduced motion.
Web check passed: typecheck/lint, 173 Vitest, build, 16 gateway; avatar Playwright 2/2.

## Slower lip movement — 2026-10-02

Source: `gotIt-front@3fa4da4f31023682c9308d686fb04dbb0676b590`. Production verified: Render `dep-davom667bikc73ese7e0` is Live for this exact SHA (41.2s deploy).
Audio onset/release now use 75/85 ms time constants; mouth opacity uses a 110 ms
ease-out crossfade. Approximately 30 Hz publication remains. Rapid alternating
32 ms syllable amplitudes are attenuated; silence still closes the mouth.
This changes visual response only, not the provider voice speed.
Validation: Web check passed (173 Vitest, 16 gateway, typecheck/lint/build);
targeted avatar Playwright passed 2/2. Regression covers gentle onset, alternating
pulses, refresh-rate independence, silence recovery and CSS transition timing.

Production smoke at 2026-10-02T10:46:21Z passed: Web/Backend readiness, route,
delivered 110 ms CSS transition, delivered smoothing onset and alternating-pulse
regression, both component variants and pose/silence behavior, exact PNG hashes.
[Machine-readable evidence](evidence/avatar-motion-production-2026-10-02.json).
Live voice conversation was not tested in this follow-up.

## מקור וסטטוס — 2026-10-01

מקור: `gotIt-front@67034504f698e0c928ea1b703f5c35a116e5d0dd`.
ממומש, מאומת מקומית ונפרס ב־Production; smoke של הקוד והנכסים המוגשים עבר.
שיחה קולית חיה לא אומתה: השליטה בחלון בחירת חשבון Google נעצרה ב־timeout.
העדכון תצוגתי ב־Web: P12, SCR-10 וגם שיחת בניית קורס ב־SCR-PC-00A.
אין שינוי בחוזי API, בסיס נתונים, זכאות, מודל הקול, תמלול או רצף SEQ-07.

## ההתנהגות

- לגבר ולאישה שישה פריימים שקופים: האזנה, חשיבה, מצמוץ, דיבור רך,
  דיבור מעוגל ודיבור רחב. הפריים המעוגל נוסף לכל דמות באמצעות imagegen
  המובנה, על בסיס הדיוקן הקיים. פרומפטים ומקורות נשמרו
  ב־`gotIt-front/docs/TUTOR_AVATAR_ASSETS.md`; שני PNG נמצאים תחת
  `src/assets/private-lesson/` בשם `tutor-speaking-rounded.png`
  ו־`tutor-female-speaking-rounded.png`.
- הדיוקן המקורי נשאר בסיס קבוע; רק הפה משולב בזמן דיבור. מעבר בין שתי
  צורות סמוכות עם alpha לפי source-over מונע הצגת הפה הסגור מאחורי שתי
  תמונות פה פתוח. הפרמטרים הסמכותיים ב־`src/lib/avatarMotion.ts`.
- מעטפת השמע הנכנס מתעדכנת בערך 30 פעמים בשנייה, עם פתיחה מתונה
  וסגירה קצרה בתלות בזמן ולא בקצב רענון המסך. שתיקה, inactive וערכים
  לא סופיים סוגרים את הפה. זהו חיווי עוצמה, לא זיהוי פונמות.
- המצמוץ פועל גם בדיבור ומשפיע רק על העפעפיים. תנועת הנשימה עדינה
  ורציפה, ללא לולאת נדנוד מהירה שמתחילה מחדש בכל הפסקת דיבור.
- reduced motion מסתיר תנועת פה, מצמוץ ואנימציה דקורטיבית.
  התווית הנגישה ומצבי האזנה/חשיבה נשמרים; רוחב 320px נתמך.
- אין ספק חדש בזמן ריצה או איסוף/שמירת קול חדש. הפריימים סטטיים;
  מד השמע משתמש בהשמעה הקיימת ומנקה RAF ו־AudioContext בסיום.

## קבלה ורגרסיה

FR-LESS-006: לומד רואה את המורה שנבחר עם תנועת פה רציפה לפי מעטפת
ההשמעה, מצמוץ עצמאי וסגירה בשתיקה, ללא החלפת גוף/שיער בין פריימי דיבור.
מיפוי: UC-07/UC-11, P12, SCR-10/SCR-PC-00A; אין שינוי במדדי למידה.

ראיות מקומיות למקור:

- `npm.cmd run check`: TypeScript, ESLint, ‏172/172 Vitest, build ו־16/16 gateway.
- לאחר הרחבת רגרסיית החיבור: 8/8 בדיקות ממוקדות בשלושת קובצי avatar/audio,
  וכן lint ו־Prettier עברו.
- `npm.cmd run test:responsive -- test/e2e/teacher-avatar.spec.ts test/e2e/private-lesson-flow.spec.ts`:
  ‏10/10 עברו, כולל עברית/אנגלית, 320px, טלפון, landscape, דסקטופ ו־reduced motion.
- `test/avatar-motion.test.ts`: תרומות צורות סמוכות ללא דליפת פה סגור,
  פתיחה מתונה, סגירה בהפסקה ועקביות בין 30Hz ו־144Hz.
- `test/private-lesson-connection.test.ts`: שלושה עדכוני מד בתוך 96ms,
  דעיכה לשתיקה וניקוי; קצב 70ms הקודם נכשל במקרה זה.
- `test/teacher-avatar.test.tsx`: נכסי שתי הדמויות, invalid/inactive/silence;
  `test/private-lesson.test.tsx`: הצורה המעוגלת דרך חיווי השמעת השיעור.
- בדיקת הדפדפן טוענת את רכיב React האמיתי ו־48 התמונות בשמונה דיוקנאות.
  צילום `gotIt-front/test-results/avatar-poses.png` נבדק חזותית: שתי הדמויות
  במנוחה, דיבור רך, מעוגל ורחב.

לא נבדקו בנקודת מקור זו: שיחה קולית חיה ב־Production או מכשיר פיזי.
אזהרת bundle גדול מ־500KB היא האזהרה הקיימת של build, לא כשל בדיקה.

## פריסה

Render Web `dep-davbpls9v7es73f6nk7g` הראה `Deploy succeeded | Live` עבור
SHA המקור המדויק, בפריסה ידנית של ענף `main` שנמשכה 47.8 שניות.
אימות ב־2026-10-01, ‏23:07 שעון ישראל:

- Web ו־Backend `/ready` החזירו 200; `/private-lesson?free=1` החזיר 200.
- bundle `index-Cds8iNPC.js`, CSS `index-CWtajhUS.css` ורכיב
  `TeacherAvatar-DT-q3uoZ.js` החזירו 200 וכוללים את ההתנהגות החדשה.
- שני הפריימים המעוגלים החזירו 200; SHA-256 של כל קובץ שהוגש זהה לקובץ
  שנוצר ונכלל ב־commit. שמות ו־hashes ב־[ראיית smoke](evidence/avatar-motion-production-2026-10-01.json).
- smoke הוריד את רכיב האווטאר וה־helper המוגשים והפעיל את הפונקציות הטהורות
  ב־Node VM, עם stub לבניית JSX ולאייקון בלבד. שתי הדמויות החזירו שש תמונות
  ואת מצבי פה סגור/רך/מעוגל/רחב הצפויים. שתיקה, inactive ו־NaN סגרו את הפה.
  CSS כולל מסכת עפעפיים ומצמוץ פעיל בדיבור, וה־bundle כולל עדכון 32ms.
- לא בוצע migration או שינוי תצורה. לא שונתה העדפת מורה בחשבון.

בדיקה זו מאמתת את הקוד והנכסים שהשרת מגיש, בשילוב בדיקות הדפדפן המקומיות.
חלון Google הראה חשבון קיים אבל פעולות הבחירה נכשלו ב־CDP timeout;
לא הושגה כניסה חדשה, ולא התחילה שיחה קולית חיה. לכן איכות התנועה בזמן שיחה
אמיתית ב־Production ומכשיר פיזי עדיין לא אומתו. אין להציג smoke פונקציות כבדיקת קול חיה.
