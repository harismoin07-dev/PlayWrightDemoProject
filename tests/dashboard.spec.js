const { test, expect } = require('../fixtures');
const { DashboardPage } = require('../pages/DashboardPage');
const { allure } = require('allure-playwright');

test.describe('Dashboard Module', () => {
    test('dashboard search is available and leave menu exists', async ({ loggedInPage }) => {
        const dashboardPage = new DashboardPage(loggedInPage);

        allure.epic('Dashboard');
        allure.feature('Dashboard Search');
        allure.story('Search and navigation validation');
        allure.description('This test verifies that the dashboard search box is available and the Leave menu is present on the dashboard.');
        allure.severity('normal');

        await test.step('Verify dashboard is loaded', async () => {
            await expect(dashboardPage.dashboardHeader).toBeVisible();
        });

        await test.step('Verify dashboard search field', async () => {
            await expect(dashboardPage.searchInput).toBeVisible();
            await dashboardPage.search('Leave');
            await expect(dashboardPage.searchInput).toHaveValue('Leave');
            const searchScreenshot = await loggedInPage.screenshot();
            await allure.attachment('Dashboard Search Screenshot', searchScreenshot, 'image/png');
        });

        await test.step('Verify leave menu exists', async () => {
            await expect(dashboardPage.leaveMenuItem).toBeVisible();
            const leaveText = await dashboardPage.verifyLeaveVisible();
            expect(leaveText.trim()).toBe('Leave');
            const leaveScreenshot = await loggedInPage.screenshot();
            await allure.attachment('Leave Menu Verification Screenshot', leaveScreenshot, 'image/png');
        });
    });
});
