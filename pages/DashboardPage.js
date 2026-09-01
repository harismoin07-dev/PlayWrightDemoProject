class DashboardPage {
    constructor(page) {
        this.page = page;
        this.profileMenu = page.getByRole('img', { name: 'Profile picture' });
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.sidepanelLabel = page.getByLabel('sidePanel').locator('span');
        this.leaveMenuItem = page.getByRole('link', { name: 'Leave' });
        this.leaveLink = page.getByRole('link', { name: 'Leave' });
    }

    async getDashboardHeaderText() {
        return await this.dashboardHeader.textContent();
    }

    async openProfileMenu() {
        await this.profileMenu.click();
    }

    async search(term) {
        await this.searchInput.fill(term);
    }

    async clickLeaveMenu() {
        await this.leaveLink.click();
    }

    async verifyLeaveVisible() {
        await this.leaveMenuItem.waitFor({ state: 'visible' });
        return await this.leaveMenuItem.textContent();
    }

    async isLeaveMenuVisible() {
        return await this.leaveMenuItem.isVisible();
    }

    async getSidepanelLabelText() {
        return await this.sidepanelLabel.textContent();
    }
}

module.exports = { DashboardPage };
