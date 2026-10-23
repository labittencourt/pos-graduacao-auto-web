# Gate de qualidade — US-10 Comprar logo após criar a conta (TC 15)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-10-comprar-apos-cadastro.md](../../user-stories/US-10-comprar-apos-cadastro.md)

<details>
<summary>Test Case 15: Place Order: Register before Checkout (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados: cadastro inteiro (TC01, US-01), "Logged in as" e "Delete Account" (TC01, TC02, TC04), página de detalhe/lista de produtos (TC08). A US-10 reusa `LoginPage`, `SignupPage`, `AccountStatusPage`, `NavBar` e a fixture `newUser`, sem duplicar.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 8 | Consistente com o TC 15. A mensagem de sucesso que o TC exige aparece no **envio**, antes de o servidor responder (observado), então ela não prova o pedido. |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro (cartão inválido, carrinho vazio). A própria story deixa lacunas: quais produtos, quantos, dados do cartão. |
| Testabilidade | 6 | "Vejo os detalhes de endereço e a revisão do pedido" não diz o que conferir. A mensagem final é transitória (só existe entre o clique e a troca de página). |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | untestable | Testabilidade | High | `Então vejo "Your order has been placed successfully!"` | A mensagem é exibida por um handler de `submit` e some com a navegação para `/payment_done` (DIV-04). Captura determinística: ouvinte que registra o estado da mensagem no envio (`sessionStorage`). Prova do pedido: página `/payment_done` com "Order Placed!". |
| F-02 | untestable | Testabilidade | Medium | `Então vejo os detalhes de endereço e a revisão do pedido` | Oráculo: os endereços de entrega e cobrança mostram os dados do cadastro, e a revisão lista os produtos adicionados com o total igual à soma. |
| F-03 | missing-criteria | Completude | Medium | `Quando adiciono produtos ao carrinho` | Quais e quantos não definidos (lacuna da story). Suposição do QA: os dois primeiros produtos da home, conferidos no carrinho (sugestão da própria story). |
| F-04 | missing-criteria | Completude | Low | `E informo nome no cartão, número, CVC e validade` | Valores não definidos (lacuna da story). Suposição do QA: cartão de teste público (`4111 1111 1111 1111`), nunca dado real. |
| F-05 | contradiction | Coerência | Medium | `Então vejo "Your order has been placed successfully!"` | A mensagem aparece em qualquer envio do formulário, antes da resposta do servidor. É uma promessa feita antes da confirmação (GAP da US reversa, não bug: nenhum caso de falha de pagamento foi observado). |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
