import { expect, Locator, Page } from '@playwright/test';

/** /checkout — "Address Details" e "Review Your Order". */
export class CheckoutPage {
  readonly page: Page;
  readonly addressDetailsTitle: Locator;
  readonly reviewOrderTitle: Locator;
  readonly deliveryAddress: Locator;
  readonly invoiceAddress: Locator;
  /** Linhas de produto da revisao (exclui a linha "Total Amount"). */
  readonly reviewItems: Locator;
  readonly totalAmount: Locator;
  readonly comment: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDetailsTitle = page.getByRole('heading', { name: 'Address Details' });
    this.reviewOrderTitle = page.getByRole('heading', { name: 'Review Your Order' });
    this.deliveryAddress = page.locator('#address_delivery');
    this.invoiceAddress = page.locator('#address_invoice');
    this.reviewItems = page.locator('#cart_info tbody tr[id^="product-"]');
    this.totalAmount = page.locator('#cart_info tbody tr').filter({ hasText: 'Total Amount' }).locator('.cart_total_price');
    this.comment = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a[href="/payment"]');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /checkout').toHaveURL(/\/checkout$/);
  }

  async placeOrder(comment: string) {
    await this.comment.fill(comment);
    await this.placeOrderButton.click();
  }
}
