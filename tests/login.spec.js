const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/DashboardPage');


test.describe('Login Tests', () => {

    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('login test', async ({ page }) => {
    await loginPage.login();
    const dashboardHeaderText = await dashboardPage.getDashboardHeaderText();
    expect(dashboardHeaderText).toBe('Dashboard');

    });

    test('Invalid login test', async ({ page }) => {
    await loginPage.login('Admin', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Invalid credentials');   


});
});