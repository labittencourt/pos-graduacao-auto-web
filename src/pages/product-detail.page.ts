import { expect, Locator, Page } from '@playwright/test';

/** /product_details/{id} — bloco .product-information (sem data-qa). */
export class ProductDetailPage {
  readonly page: Page;
  readonly name: Locator;
  readonly price: Locator;
  readonly category: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const info = page.locator('.product-information');
    this.name = info.locator('h2');
    this.price = info.locator('span > span');
    // Cada dado e um <p> "Rotulo: valor" — o rotulo e o identificador estavel observado.
    this.category = info.locator('p').filter({ hasText: 'Category:' });
    this.availability = info.locator('p').filter({ hasText: 'Availability:' });
    this.condition = info.locator('p').filter({ hasText: 'Condition:' });
    this.brand = info.locator('p').filter({ hasText: 'Brand:' });
    this.addToCartButton = info.locator('button.cart');
  }

  async goto(productId: number | string) {
    await this.page.goto(`/product_details/${productId}`);
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar numa pagina de detalhe de produto').toHaveURL(/\/product_details\/\d+$/);
  }
}
