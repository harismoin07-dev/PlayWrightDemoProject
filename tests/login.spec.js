const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { allure } = require('allure-playwright');

test.describe('Login Tests', () => {

    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('login test', async ({ page }) => {
    allure.epic('Login Tests');
    allure.feature('Login Feature');
    allure.story('Valid Login Test');
    allure.description('This test verifies that a user can log in with valid credentials.');
    allure.severity('critical');

    // Step 1: Perform login with valid credentials
    await test.step('Perform login with valid credentials', async () => {
        await loginPage.login();
        await expect(dashboardPage.dashboardHeader).toBeVisible();
        const screenshot = await page.screenshot(); 
        await allure.attachment('Login Step Screenshot', screenshot, 'image/png');
    });

    // Step 2: Verify dashboard heading
    await test.step('Verify dashboard heading', async () => {
        await expect(dashboardPage.dashboardHeader).toBeVisible();
        const dashboardHeader = await dashboardPage.getDashboardHeaderText();
        expect(dashboardHeader).toBe('Dashboard');
        const dashboardScreenshot = await page.screenshot();
        await allure.attachment('Dashboard Heading Verification Screenshot', dashboardScreenshot, 'image/png');
    });
    });

    test('Invalid login test', async ({ page }) => {
    allure.epic('Login Tests');
    allure.feature('Login Feature');
    allure.story('Invalid Login Test');
    allure.description('This test verifies that an error message is displayed when logging in with invalid credentials.');
    allure.severity('high');

    // Step 1: Perform login with invalid credentials
    await test.step('Perform login with invalid credentials', async () => {
        await loginPage.login('Admin', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
        const invalidLoginScreenshot = await page.screenshot();
        await allure.attachment('Invalid Login Step Screenshot', invalidLoginScreenshot, 'image/png');
    });

    // Step 2: Verify error message is displayed
    await test.step('Verify error message is displayed', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe('Invalid credentials');
        const invalidLoginScreenshot = await page.screenshot();
        await allure.attachment('Error Message Verification Screenshot', invalidLoginScreenshot, 'image/png');
    });
    });
});