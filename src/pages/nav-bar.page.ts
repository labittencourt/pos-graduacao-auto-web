import { Locator, Page } from '@playwright/test';

/** Menu do topo (.shop-menu), presente em todas as paginas. */
export class NavBar {
  readonly page: Page;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAs: Locator;
  readonly loggedInUserName: Locator;

  constructor(page: Page) {
    this.page = page;
    const menu = page.locator('.shop-menu');
    // O site nao tem data-qa no menu; o href e o identificador estavel observado.
    this.productsLink = menu.locator('a[href="/products"]');
    this.cartLink = menu.locator('a[href="/view_cart"]');
    this.signupLoginLink = menu.locator('a[href="/login"]');
    this.logoutLink = menu.locator('a[href="/logout"]');
    this.deleteAccountLink = menu.locator('a[href="/delete_account"]');
    this.loggedInAs = menu.locator('li').filter({ hasText: 'Logged in as' });
    this.loggedInUserName = this.loggedInAs.locator('b');
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
