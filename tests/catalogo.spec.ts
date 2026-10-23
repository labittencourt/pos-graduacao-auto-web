import { test, expect } from '../src/fixtures';
import { epic, feature, story, severity, owner } from 'allure-js-commons';
import type { Locator } from '@playwright/test';
import type { ProductsPage } from '../src/pages/products.page';

// Epico B — Catalogo de Produtos (docs/user-stories/README.md)

test.describe('Catalog', { tag: ['@epico-catalogo'] }, () => {
  // US-07 · CT-07-01 — docs/analysis/US-07/test-scenarios.md
  test('TC08 Verify All Products and product detail page', { tag: ['@TC08', '@smoke'] }, async ({
    homePage,
    navBar,
    productsPage,
    productDetailPage,
  }) => {
    await epic('Catálogo de Produtos');
    await feature('Produtos');
    await story('US-07 Consultar a lista de produtos e o detalhe de um produto');
    await severity('critical');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Products', async () => {
      await navBar.goToProducts();
      await productsPage.expectLoad();
    });

    const first = productsPage.items.first();
    const listed = await test.step('Check the products list is visible', async () => {
      // Suposicao do QA Q02: ao menos um item, com nome, preco e "View Product".
      await expect(first, 'ao menos um produto deveria estar visivel').toBeVisible();
      await expectNonEmpty(productsPage.itemName(first), 'nome do primeiro produto');
      await expectNonEmpty(productsPage.itemPrice(first), 'preco do primeiro produto');
      await expect(productsPage.itemViewProduct(first), '"View Product" do primeiro produto').toHaveText('View Product');
      return {
        name: (await productsPage.itemName(first).textContent())!.trim(),
        price: (await productsPage.itemPrice(first).textContent())!.trim(),
      };
    });

    await test.step('Open the first product', async () => {
      await productsPage.itemViewProduct(first).click();
      await productDetailPage.expectLoad();
    });

    await test.step('Check it is the detail of that product', async () => {
      // Suposicao do QA Q03 — "desse produto": mesmo nome e mesmo preco do item clicado.
      await expect(productDetailPage.name, 'nome do detalhe deveria ser o do item clicado').toHaveText(listed.name);
      await expect(productDetailPage.price, 'preco do detalhe deveria ser o do item clicado').toHaveText(listed.price);
    });

    await test.step('Check all product details are shown', async () => {
      // Suposicao do QA Q04: cada rotulo com valor nao vazio.
      await expect(productDetailPage.category, 'categoria com valor').toHaveText(/^Category:\s*\S/);
      await expect(productDetailPage.availability, 'disponibilidade com valor').toHaveText(/^Availability:\s*\S/);
      await expect(productDetailPage.condition, 'condicao com valor').toHaveText(/^Condition:\s*\S/);
      await expect(productDetailPage.brand, 'marca com valor').toHaveText(/^Brand:\s*\S/);
    });
  });

  // US-08 · CT-08-01 — docs/analysis/US-08/test-scenarios.md. "Relacionado" = termo no nome ou na
  // categoria (observado, DIV-03); "all" = nenhum produto do catalogo com o termo no nome fica de fora.
  test('TC09 Search Product', { tag: ['@TC09', '@smoke'] }, async ({
    homePage,
    navBar,
    productsPage,
    productDetailPage,
  }) => {
    await epic('Catálogo de Produtos');
    await feature('Busca');
    await story('US-08 Buscar produtos por nome');
    await severity('critical');
    await owner('QA Team');
    const term = 'Top'; // suposicao do QA Q01
    const hasTerm = (text: string) => text.toLowerCase().includes(term.toLowerCase());

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    const expected = await test.step('Go to Products and note the products named with the term', async () => {
      await navBar.goToProducts();
      await productsPage.expectLoad();
      // Oraculo relativo ao catalogo desta execucao — nao a uma lista fixa (o catalogo e publico).
      return (await productsPage.listedProducts()).filter((p) => hasTerm(p.name));
    });

    await test.step(`Search for "${term}"`, async () => {
      await productsPage.search(term);
      await expect(productsPage.title, '"SEARCHED PRODUCTS" deveria estar visivel').toHaveText(/searched products/i);
    });

    const results = await test.step('Check every product named with the term is listed', async () => {
      const found = await productsPage.listedProducts();
      expect(found.length, 'a busca deveria trazer ao menos um produto').toBeGreaterThan(0);
      const foundHrefs = found.map((p) => p.href);
      for (const product of expected) {
        expect(foundHrefs, `"${product.name}" tem o termo no nome e deveria estar nos resultados`).toContain(product.href);
      }
      return found;
    });

    await test.step('Check every result is related by name or category', async () => {
      for (const product of results.filter((p) => !hasTerm(p.name))) {
        await productDetailPage.goto(product.href.split('/').pop()!);
        await expect(productDetailPage.category, `"${product.name}" deveria ter o termo na categoria`)
          .toHaveText(new RegExp(term, 'i'));
      }
    });
  });

  // US-08 · extras aprovados em 2026-10-22 (docs/analysis/US-08/test-agreement.md).
  test.describe('US-08 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Catálogo de Produtos');
      await feature('Busca');
      await story('US-08 Buscar produtos por nome — extras');
      await owner('QA Team');
    });

    // CT-08-02 — a busca nao diferencia maiusculas.
    test('US08-EXTRA Search is case-insensitive', { tag: ['@boundary'] }, async ({ productsPage }) => {
      await severity('normal');
      const reference = await searchedHrefs(productsPage, 'Top');
      expect(reference.length, 'pre-condicao: "Top" deveria trazer resultados').toBeGreaterThan(0);

      expect(await searchedHrefs(productsPage, 'top'), '"top" deveria trazer o mesmo que "Top"').toEqual(reference);
      expect(await searchedHrefs(productsPage, 'TOP'), '"TOP" deveria trazer o mesmo que "Top"').toEqual(reference);
    });

    // CT-08-03 — termo inexistente: titulo de busca e nenhum produto.
    test('US08-EXTRA Search with no match shows no products', { tag: ['@validation'] }, async ({ productsPage }) => {
      await severity('normal');
      await productsPage.goto();
      await productsPage.search(`qa-sem-resultado-${Date.now()}`);

      await expect(productsPage.title, '"SEARCHED PRODUCTS" deveria estar visivel').toHaveText(/searched products/i);
      await expect(productsPage.items, 'nenhum produto deveria ser exibido').toHaveCount(0);
    });

    // CT-08-04 — afirma o correto (convencao de mercado) e falha ate o site corrigir BUG-006.
    test('US08-EXTRA Search ignores leading spaces (BUG-006)', {
      tag: ['@boundary', '@regression'],
      annotation: { type: 'issue', description: 'BUG-006 — docs/bug-report-2026-10-22-busca-sem-trim.md' },
    }, async ({ productsPage }) => {
      test.fail(true, 'BUG-006: a busca nao remove espacos a esquerda do termo');
      await severity('minor');
      const reference = await searchedHrefs(productsPage, 'Top');
      expect(reference.length, 'pre-condicao: "Top" deveria trazer resultados').toBeGreaterThan(0);

      expect(await searchedHrefs(productsPage, ' Top'), '" Top" deveria trazer o mesmo que "Top"').toEqual(reference);
    });
  });

  // US-07 · extras aprovados em 2026-10-22 (docs/analysis/US-07/test-agreement.md).
  test.describe('US-07 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Catálogo de Produtos');
      await feature('Produtos');
      await story('US-07 Consultar a lista de produtos e o detalhe de um produto — extras');
      await owner('QA Team');
    });

    // CT-07-02 — todo item completo, com link exclusivo. Nao fixa a quantidade (suposicao do QA Q05).
    test('US07-EXTRA Every listed product is complete with a unique detail link', { tag: ['@boundary'] }, async ({
      productsPage,
    }) => {
      await severity('normal');
      await productsPage.goto();
      await productsPage.expectLoad();

      const items = await productsPage.items.all();
      expect(items.length, 'a lista deveria ter ao menos um produto').toBeGreaterThan(0);

      const links: string[] = [];
      for (const [index, item] of items.entries()) {
        await expect(productsPage.itemName(item), `produto ${index + 1}: nome`).toHaveText(/\S/);
        await expect(productsPage.itemPrice(item), `produto ${index + 1}: preco no formato "Rs. N"`).toHaveText(/^Rs\. \d+$/);
        const href = await productsPage.itemViewProduct(item).getAttribute('href');
        expect(href, `produto ${index + 1}: link de detalhe`).toMatch(/^\/product_details\/\d+$/);
        links.push(href!);
      }
      expect(new Set(links).size, 'cada produto deveria ter um link de detalhe exclusivo').toBe(links.length);
    });

    // CT-07-03 — afirma o correto e falha ate o site corrigir BUG-005.
    test('US07-EXTRA Nonexistent product is not offered for sale (BUG-005)', {
      tag: ['@validation', '@regression'],
      annotation: { type: 'issue', description: 'BUG-005 — docs/bug-report-2026-10-22-produto-inexistente.md' },
    }, async ({ productDetailPage }) => {
      test.fail(true, 'BUG-005: produto inexistente aparece "In Stock" com "Add to cart"');
      await severity('minor');

      await productDetailPage.goto(99999);

      await expect(productDetailPage.addToCartButton, 'produto inexistente nao deveria ter "Add to cart"').toBeHidden();
      await expect(productDetailPage.availability, 'produto inexistente nao deveria aparecer "In Stock"')
        .not.toHaveText(/In Stock/);
    });
  });
});

/** Links de detalhe dos resultados da busca, ordenados — identificam os produtos sem depender da ordem. */
async function searchedHrefs(productsPage: ProductsPage, term: string): Promise<string[]> {
  await productsPage.goto();
  await productsPage.search(term);
  await expect(productsPage.title, `busca por "${term}" deveria mostrar "SEARCHED PRODUCTS"`).toHaveText(/searched products/i);
  return (await productsPage.listedProducts()).map((p) => p.href).sort();
}

async function expectNonEmpty(locator: Locator, what: string) {
  await expect(locator, `${what} deveria ter valor`).toHaveText(/\S/);
}
