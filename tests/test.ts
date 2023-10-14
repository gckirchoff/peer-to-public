import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to your site template!' })).toBeVisible();
});

test('About page renders properly', async ({ page, userAgent }) => {
	await page.goto('/about');
	await expect(page.getByText('This is the about me section.')).toBeVisible();
});

// test('Can Create Post', async ({ page }) => {
// 	await page.goto('/dev/admin/post');

// 	await page.getByPlaceholder('Title').fill('automated test post');
// 	await page.getByPlaceholder('Description').fill('Automated test description');
// 	await page.getByTestId('multi-select-input').fill('automated-tag');
// 	await page.getByTestId('multi-select-input').focus();
// 	await page.getByTestId('multi-select-input').press('Enter');
// 	await page.getByRole('button', { name: 'Save' }).click();
// });
