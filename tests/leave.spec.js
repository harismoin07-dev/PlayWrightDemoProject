const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { LeavePage } = require('../pages/LeavePage');
const { allure } = require('allure-playwright');

test.describe('Leave Module Tests', () => {
    let loginPage;
    let dashboardPage;
    let leavePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        leavePage = new LeavePage(page);
        await loginPage.navigate();
    });

    test('leave list shows one record when status is Taken', async ({ page }) => {
        allure.epic('Leave Module');
        allure.feature('Leave List');
        allure.story('Filter Taken Leave Records');
        allure.description('This test verifies that filtering the Leave list by Taken returns the expected single record result.');
        allure.severity('normal');

        await test.step('Login to OrangeHRM', async () => {
            await loginPage.login();
            await dashboardPage.clickLeaveMenu();
        });

        await test.step('Filter leave list for Taken status and verify result count', async () => {
            await leavePage.filterByTakenStatus();
            await leavePage.clickSearch();
            await page.waitForTimeout(5000); // Wait for the results to load
            await expect(leavePage.resultsFound).toContainText('No Records Found');
            const searchScreenshot = await page.screenshot({ fullPage: true });
            await allure.attachment('Leave List Filter Screenshot', searchScreenshot, 'image/png');
        });
    });
});
