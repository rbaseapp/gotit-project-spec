const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/Ori/Desktop/rbaseapp/gotIt-front/node_modules/@playwright/test');

const root = __dirname;
const fragment = fs.readFileSync(path.join(root, 'course-homework.html'), 'utf8');
new vm.Script(fragment.match(/<script>([\s\S]*?)<\/script>/)[1]);
assert(Buffer.byteLength(fragment) < 1000000);
assert(!fragment.includes('\\"'));
const specRoot = path.resolve(root, '../..');
let links = 0;
for (const file of ['docs/21_PERSONAL_COURSES_AND_HOMEWORK_PROPOSAL.md','docs/00_INDEX.md','docs/13_TRACEABILITY.md','CHANGELOG.md']) {
  const full = path.join(specRoot, file);
  for (const match of fs.readFileSync(full, 'utf8').matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^https?:/.test(target)) continue;
    assert(fs.existsSync(path.resolve(path.dirname(full), target)), `Missing link: ${file}: ${target}`);
    links++;
  }
}

(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const errors = [];
  const page = await browser.newPage({viewport:{width:760,height:950}});
  page.on('pageerror', e => errors.push(e.message));
  const url = pathToFileURL(path.join(root,'preview.html')).href;
  await page.goto(url);
  const f = page.frameLocator('iframe');
  await f.getByRole('heading',{name:'יסודות הדקדוק באנגלית'}).waitFor();
  assert.equal(await f.locator('details[data-unit]').count(),6);
  await f.locator('details[data-unit="5"] summary').click();
  await f.getByText('משימת סיום הקורס',{exact:true}).waitFor();
  await f.locator('#gotit-course-demo').screenshot({path:path.join(root,'course-desktop.png')});
  await f.getByRole('button',{name:'סיכום שיעור',exact:true}).click();
  await f.getByRole('heading',{name:'המשפטים הראשונים שלך'}).waitFor();
  await f.locator('#gotit-course-demo').screenshot({path:path.join(root,'summary-desktop.png')});
  await f.getByRole('button',{name:'מתחילים לתרגל',exact:true}).click();
  await f.getByRole('button',{name:'is',exact:true}).click();
  await f.getByRole('button',{name:'בדיקת תשובה',exact:true}).click();
  await f.getByRole('button',{name:'למשימה הבאה',exact:true}).click();
  await f.getByRole('button',{name:'רמז קצר',exact:true}).click();
  await f.getByLabel('המילה החסרה',{exact:true}).fill('are');
  await f.getByRole('button',{name:'אשלים אחר כך',exact:true}).click();
  await f.getByRole('button',{name:'המשך מהמקום ששמרנו',exact:true}).click();
  assert.equal(await f.getByLabel('המילה החסרה',{exact:true}).inputValue(),'are');
  await f.getByText('רמז: עם they משתמשים ב־are.',{exact:true}).waitFor();
  await f.getByRole('button',{name:'בדיקת תשובה',exact:true}).click();
  await f.getByRole('button',{name:'למשימה הבאה',exact:true}).click();
  await f.getByLabel('כתבו את המשפט עם We',{exact:true}).fill("We're at home.");
  await f.getByRole('button',{name:'בדיקת תשובה',exact:true}).click();
  await f.getByRole('button',{name:'לסיום התרגול',exact:true}).click();
  await f.getByText('2 מתוך 3 משימות נפתרו נכון ללא רמז.',{exact:true}).waitFor();
  await f.getByText('עם עזרה',{exact:true}).waitFor();
  await f.locator('#gotit-course-demo').screenshot({path:path.join(root,'homework-complete.png')});

  const mobile = await browser.newPage({viewport:{width:320,height:850},colorScheme:'dark'});
  mobile.on('pageerror', e => errors.push(e.message));
  await mobile.goto(url);
  const m = mobile.frameLocator('iframe');
  await m.getByRole('heading',{name:'יסודות הדקדוק באנגלית'}).waitFor();
  async function fits() {
    const overflow = await m.locator('.g-window').evaluate(el => {
      const bounds=el.getBoundingClientRect();
      return Array.from(el.querySelectorAll('*')).filter(x=>x.getClientRects().length && getComputedStyle(x).display!=='none').filter(x=>{const r=x.getBoundingClientRect();return r.left<bounds.left-1||r.right>bounds.right+1}).map(x=>x.tagName+'.'+x.className);
    });
    assert.deepEqual(overflow,[],`Mobile overflow: ${overflow.join(',')}`);
  }
  await fits();
  await m.locator('details[data-unit="0"] summary').click();
  await fits();
  await mobile.setViewportSize({width:320,height:1800});
  await m.locator('#gotit-course-demo').screenshot({path:path.join(root,'course-mobile-dark.png')});
  await mobile.setViewportSize({width:320,height:850});
  await m.getByRole('button',{name:'שיעורי הבית',exact:true}).click();
  await m.getByRole('button',{name:'am',exact:true}).click();
  await m.getByRole('button',{name:'בדיקת תשובה',exact:true}).click();
  await m.getByText('עם she משתמשים ב־is. נסו שוב.',{exact:true}).waitFor();
  await fits();
  await m.locator('#gotit-course-demo').screenshot({path:path.join(root,'homework-mobile-dark.png')});
  await m.getByRole('button',{name:'are',exact:true}).click();
  await m.getByRole('button',{name:'בדיקת תשובה',exact:true}).click();
  await m.getByText('המשימה תסומן לתרגול נוסף.',{exact:false}).waitFor();
  await m.getByRole('button',{name:'למשימה הבאה',exact:true}).click();
  await m.getByRole('button',{name:'דילוג על המשימה',exact:true}).click();
  await m.getByRole('button',{name:'דילוג על המשימה',exact:true}).click();
  await m.getByRole('heading',{name:'התרגול הסתיים חלקית'}).waitFor();
  await m.getByText('0 מתוך 3 משימות נפתרו נכון ללא רמז.',{exact:true}).waitFor();
  await fits();
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log(JSON.stringify({syntax:'passed',localLinks:links,unitsPreview:'6/6',flow:'correct, hint, pause/resume, accepted alternative, retry limit, skipped/partial',mobile320:'no overflow in checked states',pageErrors:errors.length}));
})().catch(e=>{console.error(e);process.exit(1);});
