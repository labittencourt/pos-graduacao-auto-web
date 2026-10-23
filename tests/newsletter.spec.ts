import { test, expect } from '../src/fixtures';
import { epic, feature, story, severity, owner } from 'allure-js-commons';
import { buildUser } from '../src/fixtures/factories/user.factory';

// Epico C — Newsletter (docs/user-stories/README.md)

test.describe('Newsletter', { tag: ['@epico-newsletter'] }, () => {
  // US-09 · CT-09-01 — docs/analysis/US-09/test-scenarios.md
  test('TC10 Verify Subscription in home page', { tag: ['@TC10', '@smoke'] }, async ({ homePage, footer }) => {
    await epic('Newsletter');
    await feature('Assinatura');
    await story('US-09 Assinar a newsletter pelo rodapé da home');
    await severity('normal');
    await owner('QA Team');
    const { email } = buildUser(); // suposicao do QA Q04: e-mail unico e ficticio

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Scroll down to footer', async () => {
      await footer.scrollIntoView();
      await expect(footer.subscriptionTitle, '"SUBSCRIPTION" deveria estar visivel').toHaveText(/subscription/i);
    });

    await test.step('Subscribe with an email', async () => {
      await footer.subscribe(email);
      // A mensagem fica visivel so 1,5 s (subscription.js): a assertion comeca logo apos o clique
      // e repete ate a condicao valer — sem espera fixa.
      await expect(footer.successMessage, 'mensagem de sucesso deveria aparecer')
        .toBeVisible();
      await expect(footer.successMessage).toHaveText('You have been successfully subscribed!');
    });
  });

  // US-09 · extras aprovados em 2026-10-22 (docs/analysis/US-09/test-agreement.md).
  test.describe('US-09 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async ({ homePage, footer }) => {
      await epic('Newsletter');
      await feature('Assinatura');
      await story('US-09 Assinar a newsletter pelo rodapé da home — extras');
      await owner('QA Team');
      await homePage.goto();
      await footer.scrollIntoView();
    });

    // CT-09-02 — o oraculo e a validacao nativa (impede o envio); "mensagem escondida" sozinha nao
    // provaria nada, ja que ela comeca escondida.
    test('US09-EXTRA Malformed email is not subscribed', { tag: ['@validation'] }, async ({ footer }) => {
      await severity('normal');
      await footer.subscribe('qa-sem-arroba');

      const typeMismatch = await footer.subscriptionEmail.evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
      expect(typeMismatch, 'e-mail sem "@" deveria ser sinalizado como invalido').toBe(true);
      await expect(footer.successMessage, 'nao deveria mostrar sucesso para e-mail invalido').toBeHidden();
    });

    // CT-09-03 — afirma o correto (o e-mail chega ao site) e falha ate o site corrigir BUG-007.
    test('US09-EXTRA Subscription sends the email to the site (BUG-007)', {
      tag: ['@regression'],
      annotation: { type: 'issue', description: 'BUG-007 — docs/bug-report-2026-10-22-newsletter-nao-envia.md' },
    }, async ({ page, footer }) => {
      test.fail(true, 'BUG-007: o envio e cancelado no cliente; so a mensagem e exibida');
      await severity('normal');
      const { email } = buildUser();
      const sent: string[] = [];
      page.on('request', (request) => sent.push(`${decodeURIComponent(request.url())} ${request.postData() ?? ''}`));

      await footer.subscribe(email);
      // Sincroniza pelo ciclo completo da mensagem (aparece e some): o envio ja foi tratado. Sem espera fixa.
      await expect(footer.successMessage, 'pre-condicao: o envio foi tratado').toBeVisible();
      await expect(footer.successMessage, 'pre-condicao: ciclo da mensagem concluido').toBeHidden();

      expect(sent.some((entry) => entry.includes(email)), 'uma requisicao com o e-mail deveria ter sido enviada')
        .toBe(true);
    });
  });
});
