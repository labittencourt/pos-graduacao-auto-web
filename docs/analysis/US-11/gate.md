# Gate de qualidade — US-11 Comprar após entrar com uma conta existente (TC 16)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-11-comprar-apos-login.md](../../user-stories/US-11-comprar-apos-login.md)

<details>
<summary>Test Case 16: Place Order: Login before Checkout (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill email, password and click 'Login' button
6. Verify 'Logged in as username' at top
7. Add products to cart
8. Click 'Cart' button
9. Verify that cart page is displayed
10. Click Proceed To Checkout
11. Verify Address Details and Review Your Order
12. Enter description in comment text area and click 'Place Order'
13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
14. Click 'Pay and Confirm Order' button
15. Verify success message 'Your order has been placed successfully!'
16. Click 'Delete Account' button
17. Verify 'ACCOUNT DELETED!' and click 'Continue' button

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados: login (TC02 e extras da US-03/US-04), fluxo inteiro de compra (TC15, extras da US-10) e exclusão de conta (TC01, TC02, TC15). A US-11 é a US-10 com login no lugar do cadastro: reusa o helper `placeOrder` e a fixture `registeredUser`.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | Consistente com o TC 16 e com a US-10. |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro. Herda as lacunas da US-10 (produtos, cartão). |
| Testabilidade | 6 | Herda o problema da mensagem transitória (DIV-04) e dos oráculos de endereço/revisão, já resolvidos na US-10. |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | dependency-gap | Testabilidade | Medium | `Então vejo "Your order has been placed successfully!"` | Mesma mensagem transitória da US-10 (DIV-04): mesma captura no envio e mesma prova na página final. |
| F-02 | dependency-gap | Completude | Low | `Quando adiciono produtos ao carrinho` / `informo nome no cartão, número, CVC e validade` | Mesmas suposições do QA da US-10 (Q01, Q04). |
| F-03 | ambiguity | Testabilidade | Low | `Dado que tenho uma conta cadastrada` | A própria nota da story exige conta não fixa: criada pela API no setup (precedente US-02/US-03). |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
