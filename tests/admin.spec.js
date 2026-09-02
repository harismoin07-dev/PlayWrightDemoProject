const { test, expect } = require('../fixtures');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdminPage } = require('../pages/AdminPage');
const { allure } = require('allure-playwright');

test.describe('Admin Module', () => {
    test('admin user details are displayed correctly', async ({ loggedInPage }) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        const adminPage = new AdminPage(loggedInPage);

        allure.epic('Admin Module');
        allure.feature('User Management');
        allure.story('Display Admin User Details');
        allure.description('This test verifies that the admin user details are displayed correctly.');
        allure.severity('normal');

        await expect(dashboardPage.dashboardHeader).toBeVisible();

        await dashboardPage.clickAdminMenu();
        await expect(loggedInPage).toHaveURL(/admin\/viewSystemUsers/);

        await adminPage.search('Admin');

        await expect(adminPage.outputUsername).toBeVisible();
        await expect(adminPage.outputUserrole).toBeVisible();
        expect(await adminPage.verifyOutputUsername()).toBe('Admin');
        expect(await adminPage.verifyOutputUserrole()).toBe('Admin');
    });
});