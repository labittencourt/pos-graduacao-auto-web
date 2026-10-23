import { Locator, Page } from '@playwright/test';

/** Rodape (#footer), presente em todas as paginas — assinatura da newsletter. */
export class Footer {
  readonly page: Page;
  readonly root: Locator;
  // HTML "Subscription"; o "SUBSCRIPTION" do TC e text-transform CSS.
  readonly subscriptionTitle: Locator;
  // O id tem a grafia do proprio site ("susbscribe").
  readonly subscriptionEmail: Locator;
  // Botao so com icone de seta, sem nome acessivel — o id e o identificador estavel.
  readonly subscribeButton: Locator;
  /** Fica visivel por 1,5 s depois do envio (static/js/subscription.js). */
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#footer');
    this.subscriptionTitle = this.root.locator('h2');
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.successMessage = page.locator('#success-subscribe');
  }

  async scrollIntoView() {
    await this.root.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscribeButton.click();
  }
}
