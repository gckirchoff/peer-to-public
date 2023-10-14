import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to your site template!' })).toBeVisible();
});

test('About page renders properly', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByText('This is the about me section.')).toBeVisible();
});

test('All resources for creating posts are present', async ({ page }) => {
	await page.goto('/dev/admin/post');

	await expect(page.getByLabel('Cover Photo:')).toBeVisible();
	await expect(page.getByPlaceholder('Title')).toBeVisible();
	await expect(page.getByPlaceholder('Description')).toBeVisible();
	await expect(page.getByTestId('multi-select-input')).toBeVisible();
	await expect(page.getByTestId('multi-select-input')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
});
