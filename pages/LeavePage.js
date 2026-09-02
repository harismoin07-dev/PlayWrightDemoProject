const { BasePage } = require('./BasePage');

class LeavePage extends BasePage {
    constructor(page) {
        super(page);
        this.leaveTypeArrow = page.locator('.oxd-select-text').first();
        this.takenOption = page.getByRole('option', { name: 'Taken' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resultsFound = page.locator('#app');
    }

    async selectTakenLeave() {
        await this.page.locator('span').filter({ hasText: 'Pending Approval' }).locator('i').click();
        await this.click(this.leaveTypeArrow);
        await this.click(this.takenOption);
    }
    async clickSearch() {
        await this.click(this.searchButton);
    }

    async filterByTakenStatus() {
        await this.selectTakenLeave();
    }

    async hasRecordFound(count) {
        return await this.resultsFound.locator(`text=(${count}) Record Found`).isVisible();
    }
}

module.exports = { LeavePage };
