const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
});