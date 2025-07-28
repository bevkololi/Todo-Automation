const { test, expect } = require('../fixtures/test-fixtures');
const { SELECTORS } = require('../utils/test-helpers');

/**
 * Authentication Tests
 * Tests login, logout, and error scenarios
 */
test.describe('Authentication', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('User can see login form', async ({ page }) => {
        await expect(page.locator('.login-container')).toBeVisible();
        await expect(page.locator('.login-header h1')).toHaveText('Welcome Back');
        await expect(page.locator('.login-form')).toBeVisible();
    });

    test('User can login with valid credentials', async ({ page, pageHelper }) => {
        await pageHelper.login('admin', 'admin');

        await expect(page.locator(SELECTORS.SIDE_MENU)).toBeVisible();
        await expect(page.locator('.content-header h2')).toHaveText('My Todo List');

        await pageHelper.waitForBanner('Login successful!', 'success');
    });

    test('User should see error with invalid credentials', async ({ page }) => {
        await page.fill('input[name="username"]', 'invalid');
        await page.fill('input[name="password"]', 'invalid');
        await page.click('button[type="submit"]');

        await expect(page.locator('.banner.error')).toBeVisible();
        await expect(page.locator('.banner')).toContainText('Invalid credentials');
    });

    test('User can logout successfully', async ({ page, pageHelper }) => {
        await pageHelper.login();

        await expect(page.locator(SELECTORS.SIDE_MENU)).toBeVisible();

        await page.click(SELECTORS.LOGOUT_BUTTON);

        await expect(page.locator('.login-container')).toBeVisible();
        await pageHelper.waitForBanner('Logged out successfully', 'success');
    });

    test('User should remain logged in after page refresh', async ({ page, pageHelper }) => {
        await pageHelper.login();

        await expect(page.locator(SELECTORS.SIDE_MENU)).toBeVisible();

        await page.reload();

        await expect(page.locator(SELECTORS.SIDE_MENU)).toBeVisible();
        await expect(page.locator('.content-header h2')).toHaveText('My Todo List');
    });

    test('User can see demo credentials', async ({ page }) => {
        await expect(page.locator('text=Demo Credentials:')).toBeVisible();
        await expect(page.locator('text=Username: admin')).toBeVisible();
        await expect(page.locator('text=Password: admin')).toBeVisible();
    });
}); 