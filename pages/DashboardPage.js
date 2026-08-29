class DashboardPage {
    constructor(page) {
        this.page = page;
        this.profileMenu = page.getByRole('img', {name : 'Profile picture'});
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        
    }
 
    async getDashboardHeaderText() {
        return await this.dashboardHeader.textContent();
    }

    async openProfileMenu() {
        await this.profileMenu.click();
    }
}

module.exports = { DashboardPage };
