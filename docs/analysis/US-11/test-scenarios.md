# Cenários de teste — US-11 Comprar após entrar com uma conta existente (TC 16)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- É a US-10 com login no lugar do cadastro. Os oráculos de carrinho, endereço, revisão e pedido são os mesmos (helper `placeOrder`).

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | O pedido não é concluído | `Então vejo "Your order has been placed successfully!"` |
| 2 | Consistência interna | Mensagem de sucesso sem pedido | (DIV-04) |
| 3 | Integridade dos dados | O endereço do checkout não é o da conta criada pela API | `para comprar com os dados que já tenho no site` |
| 4 | Consistência cruzada | O carrinho montado antes do login se perde | (ausência) |
| 5 | Determinismo | Mensagem transitória perdida; conta compartilhada entre execuções | `a conta do login não pode ser fixa` |
| 6 | Limites | sem risco identificado nesta US: os limites do pagamento já estão na US-10 | — |
| 7 | Tratamento de erro | sem risco identificado nesta US: os erros de login estão na US-04 | — |
| 8 | Autorização entre perfis | Visitante conclui checkout sem conta | `Dado que tenho uma conta cadastrada` |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | home → login → "Logged in as `<nome>`" |
| AC1 | Produtos no carrinho; "Cart" mostra o carrinho |
| AC2 | "Proceed To Checkout" mostra endereço e revisão |
| AC3 | Comentário, "Place Order", cartão, "Pay and Confirm Order" → "Your order has been placed successfully!" |
| AC4 | Excluir a conta (US-06) |

### CT-11-01 — Pedido com login antes do checkout (TC 16)
```gherkin
@TC16 @epico-compra
Cenário: Pedido com login antes do checkout
  Dado que tenho uma conta cadastrada (criada pela API)
  E estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login", informo e-mail e senha e clico em "Login"
  Então vejo "Logged in as <nome>" no topo
  Quando adiciono os 2 primeiros produtos da home ao carrinho e clico em "Cart"
  Então a página do carrinho mostra esses 2 produtos, com o preço da home e quantidade 1
  Quando clico em "Proceed To Checkout"
  Então os endereços de entrega e cobrança mostram os dados da conta
  E a revisão lista os 2 produtos e o total igual à soma
  Quando escrevo um comentário e clico em "Place Order"
  E informo nome no cartão, número, CVC e validade
  E clico em "Pay and Confirm Order"
  Então vejo "Your order has been placed successfully!" no envio
  E a página final mostra "Order Placed!"
  Quando clico em "Delete Account"
  Então vejo "ACCOUNT DELETED!" e a conta deixa de existir
  E clico em "Continue"
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna, Integridade dos dados, Determinismo · Oráculo: AC0–AC4 + suposições da US-10

### CT-11-02 — Carrinho de visitante mantido após o login — **EXTRA**
```gherkin
Cenário: Carrinho antes do login
  Dado que, como visitante, adicionei um produto ao carrinho
  Quando faço login
  Então o carrinho ainda tem esse produto
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada · Oráculo: consistência com o propósito (o cliente não perde o que escolheu ao entrar); observado ao vivo · **Extra aprovado** → `US11-EXTRA Guest cart is kept after login`. Observado: passa.

### CT-11-03 — Checkout de visitante exige login — **EXTRA**
```gherkin
Cenário: Checkout sem login
  Dado que, como visitante, tenho um produto no carrinho
  Quando clico em "Proceed To Checkout"
  Então vejo "Register / Login account to proceed on checkout."
  E continuo no carrinho
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Autorização entre perfis · Oráculo: propósito da story ("comprar com os dados que já tenho no site" pressupõe conta); observado ao vivo · **Extra aprovado** → `US11-EXTRA Guest checkout asks for login`. Observado: passa.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0–AC4 | CT-11-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato · Consistência interna · Integridade · Determinismo | CT-11-01 |
| Consistência cruzada | CT-11-02 (extra) |
| Autorização entre perfis | CT-11-03 (extra) |
| Limites · Tratamento de erro | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Com o produto: o fluxo depois do login deve ser idêntico ao da US-10.

## Seção 5 — Riscos não cobertos
- Os mesmos da US-10 (cartão recusado, "Download Invoice").

## Seção 6 — Charters
```
Explore o carrinho de visitante com vários produtos e quantidades e depois o login em uma conta que já tem itens no carrinho, com o objetivo de descobrir como o site mescla os dois carrinhos.
Duração sugerida: normal (60 min).
Pré-condição: conta criada pela API com itens no carrinho.
Sinal de parada: 3 combinações registradas.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-11-02 e CT-11-03 serão automatizados?
