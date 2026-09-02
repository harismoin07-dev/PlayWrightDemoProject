const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { allure } = require('allure-playwright');

test.describe('Login Module', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('login test', async ({ page }) => {
        allure.epic('Login Module');
        allure.feature('Login');
        allure.story('Valid Login');
        allure.description('This test verifies that a user can log in with valid credentials.');
        allure.severity('critical');

        await test.step('Perform login with valid credentials', async () => {
            await loginPage.login();
            await expect(dashboardPage.dashboardHeader).toBeVisible();
            const screenshot = await page.screenshot();
            await allure.attachment('Login Step Screenshot', screenshot, 'image/png');
        });

        await test.step('Verify dashboard heading', async () => {
            await expect(dashboardPage.dashboardHeader).toBeVisible();
            const dashboardHeader = await dashboardPage.getDashboardHeaderText();
            expect(dashboardHeader).toBe('Dashboard');
            const dashboardScreenshot = await page.screenshot();
            await allure.attachment('Dashboard Heading Verification Screenshot', dashboardScreenshot, 'image/png');
        });
    });

    test('invalid credentials show error', async ({ page }) => {
        allure.epic('Login Module');
        allure.feature('Login');
        allure.story('Invalid Login');
        allure.description('This test verifies that an error message is displayed when logging in with invalid credentials.');
        allure.severity('normal');

        await test.step('Perform login with invalid credentials', async () => {
            await loginPage.login('Admin', 'wrongpassword');
            await expect(loginPage.errorMessage).toBeVisible();
            const invalidLoginScreenshot = await page.screenshot();
            await allure.attachment('Invalid Login Step Screenshot', invalidLoginScreenshot, 'image/png');
        });

        await test.step('Verify error message is displayed', async () => {
            await expect(loginPage.errorMessage).toBeVisible();
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toBe('Invalid credentials');
            const invalidLoginScreenshot = await page.screenshot();
            await allure.attachment('Error Message Verification Screenshot', invalidLoginScreenshot, 'image/png');
        });
    });
});