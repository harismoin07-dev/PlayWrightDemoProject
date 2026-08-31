const { test, expect } = require('@Playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {
    test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    });

    test('Invalid login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'wrongpassword');
    });
});