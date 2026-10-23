import { Locator, Page } from '@playwright/test';

/**
 * Grade de produtos (.features_items), igual na home e em /products. Sem data-qa: seletores por
 * estrutura (docs/reverse/produtos-us-reversa.md, docs/reverse/compra-us-reversa.md).
 */
export class ProductList {
  readonly page: Page;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.features_items .product-image-wrapper');
  }

  itemName(item: Locator): Locator {
    return item.locator('.productinfo p');
  }

  itemPrice(item: Locator): Locator {
    return item.locator('.productinfo h2');
  }

  itemViewProduct(item: Locator): Locator {
    return item.locator('a[href^="/product_details/"]');
  }

  /** O botao de .productinfo — ha um identico no overlay (.product-overlay). */
  itemAddToCart(item: Locator): Locator {
    return item.locator('.productinfo a.add-to-cart');
  }
}

/** Modal "Added!" exibido depois de "Add to cart". */
export class CartModal {
  readonly root: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.root = page.locator('#cartModal');
    this.continueShoppingButton = this.root.locator('button.close-modal');
  }
}
