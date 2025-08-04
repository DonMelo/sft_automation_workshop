import { test, expect } from '@playwright/test';

test('make 66.6% circle', async ({ page }) => {
  await page.goto('https://neal.fun/perfect-circle/');
  await page.getByRole('button', { name: 'Manage options' }).click();
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.locator('button.on').click();

  const coordinates = getCircleCoordinates(688, 340, 100, 4);
  await page.mouse.move(coordinates[0].x, coordinates[0].y);
  await page.mouse.down();
  for (const { x, y } of coordinates) {
    await page.mouse.move(x, y);
  }

  await page.mouse.up();
  await page.pause();
});

test('make worst circle', async ({ page }) => {
  await page.goto('https://neal.fun/perfect-circle/');
  await page.getByRole('button', { name: 'Manage options' }).click();
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.locator('button.on').click();

  const coordinates = getCircleCoordinates(640, 340, 300, 5);
  await page.mouse.move(740, 340);
  await page.mouse.down();
  for (const { x, y } of coordinates) {
    await page.mouse.move(x, y);
  }

  await page.mouse.up();
  await page.pause();
});

test('make best circle', async ({ page }) => {
  await page.goto('https://neal.fun/perfect-circle/');
  await page.getByRole('button', { name: 'Manage options' }).click();
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.locator('button.on').click();

  const coordinates = getCircleCoordinates(640, 340, 300, 7);
  await page.mouse.move(coordinates[0].x, coordinates[0].y);
  for (const { x, y } of coordinates) {
    await page.mouse.down();
    await page.mouse.move(x, y);
  }

  await page.mouse.up();
  await page.pause();
});

function getCircleCoordinates(centerX: number, centerY: number, radius: number, steps: number = 36) {
    const coordinates: {x: number, y: number}[] = [];
    
    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        coordinates.push({x, y});
    }
    
    return coordinates;
}