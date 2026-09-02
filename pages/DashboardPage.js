const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.profileMenu = page.getByRole('img', { name: 'Profile picture' });
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.sidepanelLabel = page.getByLabel('sidePanel').locator('span');
        this.leaveMenuItem = page.getByRole('link', { name: 'Leave' });
        this.adminMenuItem = page.getByRole('link', { name: 'Admin' });
        this.leaveLink = page.getByRole('link', { name: 'Leave' });
    }

    async getDashboardHeaderText() {
        return await this.getText(this.dashboardHeader);
    }

    async openProfileMenu() {
        await this.click(this.profileMenu);
    }

    async search(term) {
        await this.fill(this.searchInput, term);
    }

    async clickLeaveMenu() {
        await this.click(this.leaveLink);
    }

    async verifyLeaveVisible() {
        await this.leaveMenuItem.waitFor({ state: 'visible' });
        return await this.getText(this.leaveMenuItem);
    }
    async clickAdminMenu() {
        await this.click(this.adminMenuItem);
    }
    async isLeaveMenuVisible() {
        return await this.leaveMenuItem.isVisible();
    }

    async getSidepanelLabelText() {
        return await this.getText(this.sidepanelLabel);
    }
}

module.exports = { DashboardPage };
