import { expect, Locator, Page } from '@playwright/test';
import { ProductList } from './product-list.component';

/** /products — lista "All Products" (sem data-qa; seletores por estrutura, docs/reverse/produtos-us-reversa.md). */
export class ProductsPage {
  readonly page: Page;
  readonly list: ProductList;
  // HTML "All Products"; o "ALL PRODUCTS" do TC e text-transform CSS.
  readonly title: Locator;
  readonly items: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.list = new ProductList(page);
    this.title = page.locator('.features_items h2.title');
    this.items = this.list.items;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /products').toHaveURL(/\/products$/);
    await expect(this.title, 'titulo "ALL PRODUCTS" deveria estar visivel').toHaveText(/all products/i);
  }

  /**
   * A lupa nao submete formulario: navega por um handler jQuery inline no fim do HTML
   * (window.location = '/products?search=...'). Clicar antes do parse terminar nao faz nada (FLK-003).
   */
  async search(term: string) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  /** Nome e link de detalhe de cada item listado agora. */
  async listedProducts(): Promise<{ name: string; href: string }[]> {
    const products: { name: string; href: string }[] = [];
    for (const item of await this.items.all()) {
      const name = (await this.itemName(item).textContent())!.trim();
      const href = (await this.itemViewProduct(item).getAttribute('href'))!;
      products.push({ name, href });
    }
    return products;
  }

  itemName(item: Locator): Locator {
    return this.list.itemName(item);
  }

  itemPrice(item: Locator): Locator {
    return this.list.itemPrice(item);
  }

  itemViewProduct(item: Locator): Locator {
    return this.list.itemViewProduct(item);
  }
}
