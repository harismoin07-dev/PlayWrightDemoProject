class BasePage {

    constructor(page) {
    this.page = page;
    this.username = process.env.APP_USERNAME;
    this.password = process.env.APP_PASSWORD;

    if (!this.username || !this.password) {
        const missingVariables = [
            !this.username && 'APP_USERNAME',
            !this.password && 'APP_PASSWORD'
        ].filter(Boolean).join(', ');
        throw new Error(`Missing required credential environment variable(s): ${missingVariables}. Set them locally or add them as GitHub Actions secrets.`);
    }


    }

   async navigate(path = 'web/index.php/auth/login') {
    const baseURL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
    await this.page.goto(`${baseURL}${path}`);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }
    async getText(locator) {
        return await locator.textContent();
    }


}

module.exports = { BasePage };