class LoginPage {
    constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: /Login/i });
    this.errorMessage = page.getByText('Invalid credentials');
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    }

    async navigate() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async getErrorMessage() {
        // Ensure the error message is visible and return its text
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.textContent();
    }
    async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    }
}

module.exports = { LoginPage };