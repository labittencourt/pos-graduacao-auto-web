import { test, expect } from '../src/fixtures';
import { epic, feature, story, severity, owner } from 'allure-js-commons';
import type { APIRequestContext } from '@playwright/test';
import { buildCard } from '../src/fixtures/factories/card.factory';
import type { User } from '../src/fixtures/factories/user.factory';
import type { CartPage } from '../src/pages/cart.page';
import type { CheckoutPage } from '../src/pages/checkout.page';
import type { HomePage } from '../src/pages/home.page';
import type { NavBar } from '../src/pages/nav-bar.page';
import type { PaymentDonePage, PaymentPage } from '../src/pages/payment.page';
import type { AccountStatusPage } from '../src/pages/account-status.page';
import { accountExists } from '../src/utils/account-api';

// Epico D — Compra (docs/user-stories/README.md)

test.describe('Purchase', { tag: ['@epico-compra'] }, () => {
  // US-10 · CT-10-01 — docs/analysis/US-10/test-scenarios.md
  test('TC15 Place Order: Register before Checkout', { tag: ['@TC15', '@smoke'] }, async ({
    request,
    homePage,
    loginPage,
    signupPage,
    accountStatusPage,
    navBar,
    cartPage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    newUser,
  }) => {
    await epic('Compra');
    await feature('Checkout');
    await story('US-10 Comprar logo após criar a conta');
    await severity('blocker');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Register a new account (US-01)', async () => {
      await navBar.goToSignupLogin();
      await loginPage.signup(newUser.signupName, newUser.email);
      await signupPage.expectLoad();
      await signupPage.fillAccountInformation(newUser);
      await signupPage.checkSubscriptions();
      await signupPage.fillAddressInformation(newUser);
      await signupPage.createAccount();
      await expect(accountStatusPage.accountCreatedTitle, '"ACCOUNT CREATED!" deveria estar visivel')
        .toHaveText(/account created!/i);
      await accountStatusPage.continue();
      await expect(navBar.loggedInUserName, '"Logged in as" deveria exibir o Name').toHaveText(newUser.name);
    });

    await placeOrder({ homePage, navBar, cartPage, checkoutPage, paymentPage, paymentDonePage }, newUser);

    await deleteAccount({ request, navBar, accountStatusPage }, newUser);
  });

  // US-11 · CT-11-01 — docs/analysis/US-11/test-scenarios.md. Conta criada pela API (nunca fixa).
  test('TC16 Place Order: Login before Checkout', { tag: ['@TC16', '@smoke'] }, async ({
    request,
    homePage,
    loginPage,
    accountStatusPage,
    navBar,
    cartPage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    registeredUser,
  }) => {
    await epic('Compra');
    await feature('Checkout');
    await story('US-11 Comprar após entrar com uma conta existente');
    await severity('blocker');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Log in with email and password', async () => {
      await navBar.goToSignupLogin();
      await loginPage.login(registeredUser.email, registeredUser.password);
      await expect(navBar.loggedInUserName, '"Logged in as" deveria exibir o nome cadastrado').toHaveText(registeredUser.name);
    });

    await placeOrder({ homePage, navBar, cartPage, checkoutPage, paymentPage, paymentDonePage }, registeredUser);

    await deleteAccount({ request, navBar, accountStatusPage }, registeredUser);
  });

  // US-11 · extras aprovados em 2026-10-22 (docs/analysis/US-11/test-agreement.md).
  test.describe('US-11 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Compra');
      await feature('Checkout');
      await story('US-11 Comprar após entrar com uma conta existente — extras');
      await owner('QA Team');
    });

    // CT-11-02 — o carrinho de visitante sobrevive ao login.
    test('US11-EXTRA Guest cart is kept after login', { tag: ['@ux'] }, async ({
      homePage,
      loginPage,
      navBar,
      cartPage,
      registeredUser,
    }) => {
      await severity('normal');

      const productName = await test.step('Add a product to the cart as a guest', async () => {
        await homePage.goto();
        const item = homePage.products.items.first();
        const name = (await homePage.products.itemName(item).textContent())!.trim();
        await homePage.addToCart(item);
        return name;
      });

      await test.step('Log in', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, registeredUser.password);
        await expect(navBar.loggedInUserName, 'pre-condicao: login').toHaveText(registeredUser.name);
      });

      await test.step('Check the cart still has the product', async () => {
        await navBar.goToCart();
        await cartPage.expectLoad();
        await expect(cartPage.rows, 'o carrinho deveria manter o produto de visitante').toHaveCount(1);
        await expect(cartPage.rowName(cartPage.rows.first())).toHaveText(productName);
      });
    });

    // CT-11-03 — visitante nao chega ao checkout.
    test('US11-EXTRA Guest checkout asks for login', { tag: ['@security'] }, async ({
      page,
      homePage,
      navBar,
      cartPage,
    }) => {
      await severity('normal');

      await test.step('Add a product to the cart as a guest', async () => {
        await homePage.goto();
        await homePage.addToCart(homePage.products.items.first());
        await navBar.goToCart();
        await cartPage.expectLoad();
      });

      await test.step('Try to proceed to checkout', async () => {
        await cartPage.proceedToCheckout();
      });

      await test.step('Check login is required', async () => {
        await expect(cartPage.checkoutLoginModal, 'modal de login deveria aparecer')
          .toContainText('Register / Login account to proceed on checkout.');
        await expect(page, 'visitante deveria continuar no carrinho').toHaveURL(/\/view_cart$/);
      });
    });
  });

  // US-10 · extras aprovados em 2026-10-22 (docs/analysis/US-10/test-agreement.md).
  test.describe('US-10 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async ({ loginPage, navBar, registeredUser }) => {
      await epic('Compra');
      await feature('Checkout');
      await story('US-10 Comprar logo após criar a conta — extras');
      await owner('QA Team');
      await test.step('Log in with an account created by API', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, registeredUser.password);
        await expect(navBar.loggedInUserName, 'pre-condicao: login').toHaveText(registeredUser.name);
      });
    });

    // CT-10-02 — o pedido consome o carrinho.
    test('US10-EXTRA Cart is empty after the order', { tag: ['@ux'] }, async ({
      homePage,
      navBar,
      cartPage,
      checkoutPage,
      paymentPage,
      paymentDonePage,
      registeredUser,
    }) => {
      await severity('normal');
      await placeOrder({ homePage, navBar, cartPage, checkoutPage, paymentPage, paymentDonePage }, registeredUser);

      await test.step('Open the cart after the order', async () => {
        await navBar.goToCart();
        await cartPage.expectLoad();
        await expect(cartPage.rows, 'o carrinho deveria estar vazio depois do pedido').toHaveCount(0);
      });
    });

    // CT-10-03 — numero do cartao e obrigatorio (atributo required observado).
    test('US10-EXTRA Payment without card number is blocked', { tag: ['@validation'] }, async ({
      page,
      homePage,
      navBar,
      cartPage,
      checkoutPage,
      paymentPage,
    }) => {
      await severity('normal');

      await test.step('Reach the payment page with one product', async () => {
        await homePage.goto();
        await homePage.addToCart(homePage.products.items.first());
        await navBar.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.expectLoad();
        await checkoutPage.placeOrder('QA Automation order comment');
        await paymentPage.expectLoad();
      });

      await test.step('Pay with an empty card number', async () => {
        await paymentPage.fillCard(buildCard({ number: '' }));
        await paymentPage.pay();
      });

      await test.step('Check the payment was not submitted', async () => {
        const valueMissing = await paymentPage.cardNumber.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
        expect(valueMissing, 'numero do cartao vazio deveria ser sinalizado como obrigatorio').toBe(true);
        await expect(page, 'deveria continuar em /payment').toHaveURL(/\/payment$/);
      });
    });
  });
});

type PurchasePages = {
  homePage: HomePage;
  navBar: NavBar;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
};

/** Passos 8–16 do TC 15 (e 10–18 do TC 16): carrinho → checkout → pagamento → confirmacao. */
async function placeOrder(pages: PurchasePages, user: User) {
  const { homePage, navBar, cartPage, checkoutPage, paymentPage, paymentDonePage } = pages;

  const added = await test.step('Add the first two home products to the cart', async () => {
    // Suposicao do QA Q01: os 2 primeiros produtos da home, conferidos no carrinho.
    await homePage.goto();
    const products = [];
    for (const index of [0, 1]) {
      const item = homePage.products.items.nth(index);
      const name = (await homePage.products.itemName(item).textContent())!.trim();
      const price = (await homePage.products.itemPrice(item).textContent())!.trim();
      await homePage.addToCart(item);
      products.push({ name, price });
    }
    return products;
  });

  await test.step('Open the cart and check its content', async () => {
    await navBar.goToCart();
    await cartPage.expectLoad();
    await expect(cartPage.rows, 'o carrinho deveria ter os 2 produtos adicionados').toHaveCount(added.length);
    for (const [index, product] of added.entries()) {
      const row = cartPage.rows.nth(index);
      await expect(cartPage.rowName(row), `linha ${index + 1}: produto`).toHaveText(product.name);
      await expect(cartPage.rowPrice(row), `linha ${index + 1}: preco da home`).toHaveText(product.price);
      await expect(cartPage.rowQuantity(row), `linha ${index + 1}: quantidade`).toHaveText('1');
    }
  });

  await test.step('Proceed to checkout and check address details', async () => {
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoad();
    await expect(checkoutPage.addressDetailsTitle, '"Address Details" deveria estar visivel').toBeVisible();
    // Suposicao do QA Q02: entrega e cobranca com os dados do cadastro.
    for (const [label, address] of [['entrega', checkoutPage.deliveryAddress], ['cobranca', checkoutPage.invoiceAddress]] as const) {
      for (const expected of [
        `${user.title}. ${user.firstName} ${user.lastName}`,
        user.company,
        user.address1,
        user.address2,
        `${user.city} ${user.state} ${user.zipcode}`,
        user.country,
        user.mobileNumber,
      ]) {
        await expect(address, `endereco de ${label} deveria conter "${expected}"`).toContainText(expected);
      }
    }
  });

  await test.step('Review the order', async () => {
    await expect(checkoutPage.reviewOrderTitle, '"Review Your Order" deveria estar visivel').toBeVisible();
    // Suposicao do QA Q03: os itens adicionados e o total igual a soma.
    await expect(checkoutPage.reviewItems, 'a revisao deveria ter os 2 produtos').toHaveCount(added.length);
    for (const [index, product] of added.entries()) {
      await expect(checkoutPage.reviewItems.nth(index), `revisao: item ${index + 1}`).toContainText(product.name);
    }
    const sum = added.reduce((total, product) => total + Number(product.price.replace(/\D/g, '')), 0);
    await expect(checkoutPage.totalAmount, 'total deveria ser a soma dos itens').toHaveText(`Rs. ${sum}`);
  });

  await test.step('Place order and pay', async () => {
    await checkoutPage.placeOrder('QA Automation order comment');
    await paymentPage.expectLoad();
    await paymentPage.fillCard(buildCard());
    await paymentPage.recordSuccessMessageOnSubmit();
    await paymentPage.pay();
    await paymentDonePage.expectLoad();
  });

  await test.step('Check the order was placed', async () => {
    // DIV-04: a mensagem do TC so existe no submit — registrada la e lida aqui.
    const message = await paymentPage.recordedSuccessMessage();    expect(message?.visible, '"Your order has been placed successfully!" deveria aparecer no envio').toBe(true);
    expect(message?.text).toBe('Your order has been placed successfully!');
    // A mensagem aparece antes da resposta do servidor (F-05): a prova do pedido e a pagina final.
    await expect(paymentDonePage.orderPlacedTitle, '"Order Placed!" deveria estar visivel').toHaveText(/order placed!/i);
  });
}

/** Passos 17–18 do TC 15 (US-06): excluir a conta, com prova pela API (AUD-002). */
async function deleteAccount(
  { request, navBar, accountStatusPage }: { request: APIRequestContext; navBar: NavBar; accountStatusPage: AccountStatusPage },
  user: User,
) {
  await test.step('Delete account', async () => {
    await navBar.deleteAccount();
    await expect(accountStatusPage.accountDeletedTitle, '"ACCOUNT DELETED!" deveria estar visivel')
      .toHaveText(/account deleted!/i);
    expect(await accountExists(request, user.email), 'a conta deveria ter sido excluida').toBe(false);
    await accountStatusPage.continue();
  });
}
