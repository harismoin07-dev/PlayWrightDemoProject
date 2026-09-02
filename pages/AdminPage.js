class AdminPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByRole('link', { name: 'Admin' });
        this.searchInput = page.locator('input').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resultsRow = page.locator('.oxd-table-card').filter({
            has: page.getByText('Admin', { exact: true })
        }).first();
        this.outputUsername = this.resultsRow.locator('.oxd-table-cell').nth(1);
        this.outputUserrole = this.resultsRow.locator('.oxd-table-cell').nth(2);
    }

    async userNameText() {
        return await this.userName.textContent();
    }

    async search(term) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    async verifyOutputUsername() {
        return await this.outputUsername.textContent();
    }

    async verifyOutputUserrole() {
        return await this.outputUserrole.textContent();
    }

}

module.exports = { AdminPage };
