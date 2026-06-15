class PracticeLoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('[type="password"]');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
        this.productTitles = page.locator('.card h4');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await this.page.waitForLoadState('networkidle');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.termsCheckbox.check();
        await this.signInButton.click();
    }

    async waitUntilShopPage() {
        await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 15000 });
        await this.page.waitForLoadState('networkidle');
    }

    async isProductPresent(productName) {
        const titles = await this.productTitles.allTextContents();
        return titles.some(title => title.trim().toLowerCase() === productName.trim().toLowerCase());
    }
}

module.exports = { PracticeLoginPage };