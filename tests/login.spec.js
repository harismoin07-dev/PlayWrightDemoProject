const { test, expect } = require('@Playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('login test', async ({ page }) => {
    await loginPage.login('Admin', 'admin123');
    });

    test('Invalid login test', async ({ page }) => {
    await loginPage.login('Admin', 'wrongpassword');
    });
});