import { test, expect } from '@playwright/test';

test('frogs', async ({ page }) => {
  await page.goto('https://www.lutanho.net/play/frogs.html');
  
  var solutionFound = false;
  while (!solutionFound) {
    const frogs = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
    const brownFrogs = await page.locator('img[src="https://www.lutanho.net/play/frog1.gif"]').count();
    const greenFrogs = await page.locator('img[src="https://www.lutanho.net/play/frog2.gif"]').count();
    for (let i = 3; i > 3 - brownFrogs; i--) {
      frogs[i] = 'B';
    }
    for (let i = 5; i < 5 + greenFrogs; i++) {
      frogs[i] = 'G';
    }

    const moves = solveFrogs(frogs.join(' '));
    for (let step of moves)
    {
      solutionFound = true;
      await page.locator('td > img').nth(step-1).click();
      await page.waitForTimeout(250);
    }
    if (moves.length == 0)
    {
      await page.getByRole('button', { name: 'NEW GAME' }).click();
    }
  }
  page.pause();
});

function solveFrogs(frogs : string) {
  var answer = '';
  switch(frogs) {
    case '_ _ _ B _ G G G G':
      answer = '';
      break;
    case '_ _ B B _ G G G G':
      answer = '46427645634864986';
      break;
    case '_ B B B _ G G G G':
      answer = '';
      break;
    case 'B B B B _ G G G G':
      answer = '';
      break;
    case '_ _ _ B _ G G G _':
      answer = '';
    break;
    case '_ _ B B _ G G G _':
      answer = '464276435875';
    break;
    case '_ B B B _ G G G _':
      answer = '';
    break;
    case 'B B B B _ G G G _':
      answer = '';
    break;
    case '_ _ _ B _ G G _ _':
      answer = '646';
    break;
    case '_ _ B B _ G G _ _':
      answer = '6468346';
    break;
    case '_ B B B _ G G _ _':
      answer = '646834657235';
    break;
    case 'B B B B _ G G _ _':
      answer = '64683465476246924';
    break;
    case '_ _ _ B _ G _ _ _':
      answer = '45';
    break;
    case '_ _ B B _ G _ _ _':
      answer = '464';
    break;
    case '_ B B B _ G _ _ _':
      answer = '';
    break;
    case 'B B B B _ G _ _ _':
      answer = '45';
    break;
  }
  const movesStringArray = answer.split('');
  var moves = movesStringArray.map(Number);
  return moves;
}