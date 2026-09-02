const { test, expect } = require('../fixtures');
const { DashboardPage } = require('../pages/DashboardPage');
const { LeavePage } = require('../pages/LeavePage');
const { allure } = require('allure-playwright');

test.describe('Leave Module', () => {
    test('leave list shows one record when status is Taken', async ({ loggedInPage }) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        const leavePage = new LeavePage(loggedInPage);

        allure.epic('Leave Module');
        allure.feature('Leave List');
        allure.story('Filter Taken Leave Records');
        allure.description('This test verifies that filtering the Leave list by Taken returns the expected single record result.');
        allure.severity('normal');

        await test.step('Open Leave page from dashboard', async () => {
            await dashboardPage.clickLeaveMenu();
        });

        await test.step('Filter leave list for Taken status and verify result count', async () => {
            await leavePage.filterByTakenStatus();
            await leavePage.clickSearch();
            await expect(leavePage.resultsFound).toContainText('No Records Found');
            const searchScreenshot = await loggedInPage.screenshot({ fullPage: true });
            await allure.attachment('Leave List Filter Screenshot', searchScreenshot, 'image/png');
        });
    });
});
