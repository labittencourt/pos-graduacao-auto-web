import { Locator, Page } from '@playwright/test';

/** /account_created e /delete_account — mesma estrutura: titulo + "Continue". */
export class AccountStatusPage {
  readonly page: Page;
  // HTML: "Account Created!" / "Account Deleted!"; o TC cita a forma exibida em maiusculas (CSS).
  readonly accountCreatedTitle: Locator;
  readonly accountDeletedTitle: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountCreatedTitle = page.locator('[data-qa="account-created"]');
    this.accountDeletedTitle = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async continue() {
    await this.continueButton.click();
  }
}
