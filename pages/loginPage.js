
const { BasePage } = require('./BasePage');
class LoginPage extends BasePage {
    constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: /Login/i });
    this.errorMessage = page.getByText('Invalid credentials');
    
    }


    async login(username = this.username, password = this.password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    }
    async getErrorMessage() {
        // Ensure the error message is visible and return its text
  ;
        return await this.errorMessage.textContent();
    }
}
module.exports = { LoginPage };