# Catalogo de testes

Gerado automaticamente pelo reporter (`src/reporters/console.reporter.ts`) apos cada execucao que valida (roda) o teste — nao editar manualmente, o conteudo e mesclado a cada corrida de `npm test` ou de qualquer script `test:*`.

| Suite | Teste | Arquivo | Status | Ultima execucao |
|---|---|---|---|---|
| Catalog | TC08 Verify All Products and product detail page | tests\catalogo.spec.ts | ✅ passou | 2026-10-23 |
| Catalog | TC09 Search Product | tests\catalogo.spec.ts | ✅ passou | 2026-10-23 |
| US-07 extras | US07-EXTRA Every listed product is complete with a unique detail link | tests\catalogo.spec.ts | ✅ passou | 2026-10-23 |
| US-07 extras | US07-EXTRA Nonexistent product is not offered for sale (BUG-005) | tests\catalogo.spec.ts | ❌ falhou | 2026-10-23 |
| US-08 extras | US08-EXTRA Search ignores leading spaces (BUG-006) | tests\catalogo.spec.ts | ❌ falhou | 2026-10-23 |
| US-08 extras | US08-EXTRA Search is case-insensitive | tests\catalogo.spec.ts | ✅ passou | 2026-10-23 |
| US-08 extras | US08-EXTRA Search with no match shows no products | tests\catalogo.spec.ts | ✅ passou | 2026-10-23 |
| Purchase | TC15 Place Order: Register before Checkout | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| Purchase | TC16 Place Order: Login before Checkout | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| US-10 extras | US10-EXTRA Cart is empty after the order | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| US-10 extras | US10-EXTRA Payment without card number is blocked | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| US-11 extras | US11-EXTRA Guest cart is kept after login | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| US-11 extras | US11-EXTRA Guest checkout asks for login | tests\compra.spec.ts | ✅ passou | 2026-10-23 |
| Account | TC01 Register User | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| Account | TC02 Login User with correct email and password | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| Account | TC03 Login User with incorrect email and password | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| Account | TC04 Logout User | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| Account | TC05 Register User with existing email | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-01 extras | US01-EXTRA Account form has no critical a11y violations (BUG-001) | tests\conta.spec.ts | ❌ falhou | 2026-10-23 |
| US-01 extras | US01-EXTRA Malformed email blocks signup | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-01 extras | US01-EXTRA Password field is masked | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-01 extras | US01-EXTRA Required field empty blocks account creation | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-02 extras | US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002) | tests\conta.spec.ts | ❌ falhou | 2026-10-23 |
| US-03 extras | US03-EXTRA Login accepts email with uppercase domain (BUG-002) | tests\conta.spec.ts | ❌ falhou | 2026-10-23 |
| US-03 extras | US03-EXTRA Session persists when navigating | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-04 extras | US04-EXTRA Password is case-sensitive | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-04 extras | US04-EXTRA Password is not echoed back after failed login (BUG-003) | tests\conta.spec.ts | ❌ falhou | 2026-10-23 |
| US-04 extras | US04-EXTRA Wrong password for existing email shows the same generic error | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-05 extras | US05-EXTRA Browser back after logout does not restore the session | tests\conta.spec.ts | ✅ passou | 2026-10-23 |
| US-05 extras | US05-EXTRA Delete account page without session does not claim deletion (BUG-004) | tests\conta.spec.ts | ❌ falhou | 2026-10-23 |
| Newsletter | TC10 Verify Subscription in home page | tests\newsletter.spec.ts | ✅ passou | 2026-10-23 |
| US-09 extras | US09-EXTRA Malformed email is not subscribed | tests\newsletter.spec.ts | ✅ passou | 2026-10-23 |
| US-09 extras | US09-EXTRA Subscription sends the email to the site (BUG-007) | tests\newsletter.spec.ts | ❌ falhou | 2026-10-23 |
