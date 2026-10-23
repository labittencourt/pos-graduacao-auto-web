import { expect, Locator, Page } from '@playwright/test';
import { CartModal, ProductList } from './product-list.component';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly slider: Locator;
  readonly products: ProductList;
  readonly cartModal: CartModal;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.logo img');
    this.slider = page.locator('#slider');
    this.products = new ProductList(page);
    this.cartModal = new CartModal(page);
  }

  /** "Add to cart" do item e fecha o modal "Added!" com "Continue Shopping". */
  async addToCart(item: Locator) {
    await this.products.itemAddToCart(item).click();
    await expect(this.cartModal.root, 'modal "Added!" deveria aparecer').toBeVisible();
    await this.cartModal.continueShoppingButton.click();
    await expect(this.cartModal.root, 'modal deveria fechar').toBeHidden();
  }

  async goto() {
    await this.page.goto('/');
  }

  /** Oraculo de "home visivel" (suposicao do QA Q04): URL raiz + logo + carrossel. */
  async expectLoad() {
    await expect(this.page, 'home deveria estar na URL raiz').toHaveURL(/\/$/);
    await expect(this.logo, 'logo da home deveria estar visivel').toBeVisible();
    await expect(this.slider, 'carrossel da home deveria estar visivel').toBeVisible();
  }
}
