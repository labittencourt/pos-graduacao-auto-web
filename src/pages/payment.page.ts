import { expect, Locator, Page } from '@playwright/test';

export type Card = { nameOnCard: string; number: string; cvc: string; expiryMonth: string; expiryYear: string };

type SuccessSnapshot = { visible: boolean; text: string };

const SNAPSHOT_KEY = 'qa:payment-success-message';

/** /payment — formulario #payment-form. */
export class PaymentPage {
  readonly page: Page;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /payment').toHaveURL(/\/payment$/);
    // FLK-002: o handler de submit do site e um script inline no fim do HTML. Sem esperar o parse,
    // o teste podia preencher e enviar antes dele estar ligado (a URL muda no commit, nao no fim do parse).
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillCard(card: Card) {
    await this.nameOnCard.fill(card.nameOnCard);
    await this.cardNumber.fill(card.number);
    await this.cvc.fill(card.cvc);
    await this.expiryMonth.fill(card.expiryMonth);
    await this.expiryYear.fill(card.expiryYear);
  }

  /**
   * "Your order has been placed successfully!" so existe entre o submit e a troca de pagina (DIV-04).
   * Este ouvinte roda depois do handler do site e registra o estado da mensagem em sessionStorage,
   * que sobrevive a navegacao na mesma aba. So le — nao altera o comportamento do site.
   */
  async recordSuccessMessageOnSubmit() {
    await this.page.evaluate((key) => {
      document.getElementById('payment-form')!.addEventListener('submit', () => {
        const el = document.getElementById('success_message')!;
        const visible = getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
        sessionStorage.setItem(key, JSON.stringify({ visible, text: el.textContent!.trim() }));
      });
    }, SNAPSHOT_KEY);
  }

  async pay() {
    await this.payButton.click();
  }

  /** Estado da mensagem registrado no submit (ler depois da navegacao para /payment_done). */
  async recordedSuccessMessage(): Promise<SuccessSnapshot | null> {
    const raw = await this.page.evaluate((key) => sessionStorage.getItem(key), SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as SuccessSnapshot) : null;
  }
}

/** /payment_done/{total} — "Order Placed!". */
export class PaymentDonePage {
  readonly page: Page;
  readonly orderPlacedTitle: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderPlacedTitle = page.locator('[data-qa="order-placed"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /payment_done').toHaveURL(/\/payment_done\/\d+$/);
  }
}
