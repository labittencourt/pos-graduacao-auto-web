import type { Card } from '../../pages/payment.page';

// Suposicao do QA Q04 (docs/analysis/US-10/po-suggestions.md): cartao de TESTE publico, nunca dado
// real. 4111 1111 1111 1111 e o numero Visa de teste documentado por gateways de pagamento; o site
// aceita qualquer cartao preenchido. Validade futura em relacao a 2026.
export function buildCard(overrides: Partial<Card> = {}): Card {
  return {
    nameOnCard: 'QA Automation',
    number: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
    ...overrides,
  };
}
