import { expect, Locator, Page } from '@playwright/test';

/** /view_cart — tabela #cart_info_table. */
export class CartPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly proceedToCheckoutButton: Locator;
  /** Modal exibido a visitante em "Proceed To Checkout". */
  readonly checkoutLoginModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.locator('.check_out');
    this.checkoutLoginModal = page.locator('#checkoutModal');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /view_cart').toHaveURL(/\/view_cart$/);
  }

  rowName(row: Locator): Locator {
    return row.locator('.cart_description h4 a');
  }

  rowPrice(row: Locator): Locator {
    return row.locator('.cart_price p');
  }

  rowQuantity(row: Locator): Locator {
    return row.locator('.cart_quantity button');
  }

  rowTotal(row: Locator): Locator {
    return row.locator('.cart_total_price');
  }

  /**
   * "Proceed To Checkout" nao e link: navega por um handler jQuery inline no fim do HTML
   * (window.location = '/checkout'). Clicar antes do parse terminar nao faz nada (FLK-003).
   */
  async proceedToCheckout() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.proceedToCheckoutButton.click();
  }
}
