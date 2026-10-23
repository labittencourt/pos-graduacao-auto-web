import { test as base } from '@playwright/test';
import { AccountStatusPage } from '../pages/account-status.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentDonePage, PaymentPage } from '../pages/payment.page';
import { Footer } from '../pages/footer.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { NavBar } from '../pages/nav-bar.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { ProductsPage } from '../pages/products.page';
import { SignupPage } from '../pages/signup.page';
import { createAccountViaApi, deleteAccountViaApi } from '../utils/account-api';
import { buildUser, User } from './factories/user.factory';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountStatusPage: AccountStatusPage;
  navBar: NavBar;
  footer: Footer;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
  /**
   * Dados de um usuario ainda nao cadastrado. O teste cadastra pela UI; o teardown exclui pela
   * API se a conta ainda existir (teste falhou antes de excluir) — garantido mesmo em falha.
   */
  newUser: User;
  /** Usuario ja cadastrado pela API no setup; excluido pela API no teardown. Nunca um usuario fixo. */
  registeredUser: User;
  blockThirdPartyAds: void;
  serverErrorAnnotation: void;
  evidenceScreenshot: void;
};

// Hosts de anuncio do Google AdSense observados no site (docs/reverse/produtos-us-reversa.md). A
// vignette de tela cheia intercepta cliques de navegacao (URL vira "#google_vignette") — interferencia
// de terceiro, fora do sistema sob teste. BLOCK_ADS=0 desliga o bloqueio (exploracao com anuncios reais).
const AD_HOSTS = /(^|\.)(googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com)$/;

/**
 * evidenceScreenshot roda automaticamente em todo teste (auto: true) — não
 * precisa ser declarado nos parâmetros do teste. Ao final de cada teste
 * (passou ou falhou), tira um screenshot de cada página/aba ainda aberta e
 * anexa via testInfo.attach(), visível no HTML report e no Allure. É o
 * equivalente, para frontend, dos anexos de request/response do stack de API.
 */
export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountStatusPage: async ({ page }, use) => {
    await use(new AccountStatusPage(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  paymentDonePage: async ({ page }, use) => {
    await use(new PaymentDonePage(page));
  },
  newUser: async ({ request }, use) => {
    const user = buildUser();
    await use(user);
    await deleteAccountViaApi(request, user);
  },
  registeredUser: async ({ request }, use) => {
    const user = buildUser();
    await createAccountViaApi(request, user);
    await use(user);
    await deleteAccountViaApi(request, user);
  },
  blockThirdPartyAds: [
    async ({ context }, use) => {
      if (process.env.BLOCK_ADS !== '0') {
        await context.route((url) => AD_HOSTS.test(url.hostname), (route) => route.abort());
      }
      await use();
    },
    { auto: true },
  ],
  // Triagem (docs/execucoes.md, 3a serie): uma navegacao que recebe 5xx (ex.: Cloudflare 520) e
  // problema de AMBIENTE. Anota o teste para a causa aparecer no relatorio — nao muda o resultado.
  serverErrorAnnotation: [
    async ({ page }, use, testInfo) => {
      const errors: string[] = [];
      page.on('response', (response) => {
        if (response.request().isNavigationRequest() && response.status() >= 500) {
          errors.push(`HTTP ${response.status()} em ${response.url()}`);
        }
      });
      await use();
      for (const error of errors) {
        testInfo.annotations.push({ type: 'ambiente', description: `Servidor do site respondeu ${error}` });
      }
    },
    { auto: true },
  ],
  evidenceScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();
      const pages = page.context().pages();
      for (let i = 0; i < pages.length; i++) {
        const target = pages[i];
        if (target.isClosed()) continue;
        try {
          const screenshot = await target.screenshot({ fullPage: true });
          const suffix = pages.length > 1 ? `-${i + 1}` : '';
          await testInfo.attach(`evidence${suffix}`, {
            body: screenshot,
            contentType: 'image/png',
          });
        } catch {
          // Page may have closed or be mid-navigation; skip it.
        }
      }
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
