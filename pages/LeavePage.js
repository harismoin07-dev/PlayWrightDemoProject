class LeavePage {
    constructor(page) {
        this.page = page;
        this.leaveTypeArrow = page.locator('.oxd-select-text').first();
        this.takenOption = page.getByRole('option', { name: 'Taken' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resultsFound = page.locator('#app');
    }

    async selectTakenLeave() {
        await this.page.locator('span').filter({ hasText: 'Pending Approval' }).locator('i').click();
        await this.leaveTypeArrow.click();
        await this.takenOption.click();
    }
    async clickSearch() {
        await this.searchButton.click();
    }

    async filterByTakenStatus() {
        await this.selectTakenLeave();
    }

    async hasRecordFound(count) {
        return await this.resultsFound.locator(`text=(${count}) Record Found`).isVisible();
    }
}

module.exports = { LeavePage };
