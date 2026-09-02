const base = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

exports.test = base.test.extend({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login();
        await page.waitForURL(/dashboard\/index/);
        await use(page);
    }
});

exports.expect = base.expect;
