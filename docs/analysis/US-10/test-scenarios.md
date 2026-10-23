# Cenários de teste — US-10 Comprar logo após criar a conta (TC 15)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- A mensagem de sucesso é transitória e aparece antes da confirmação do servidor (F-01, F-05). Ela é capturada no envio; o pedido é provado na página final.
- "Endereço" e "revisão" sem oráculo (F-02): oráculos de conteúdo nas suposições Q02–Q03.

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | O pedido não é concluído | `Então vejo "Your order has been placed successfully!"` |
| 2 | Consistência interna | A mensagem de sucesso aparece, mas o pedido não é criado | (F-05) |
| 3 | Integridade dos dados | Endereço do checkout diferente do cadastrado | `vejo os detalhes de endereço` |
| 4 | Consistência cruzada | Carrinho/revisão com produto, preço ou total diferentes do que foi adicionado | `adiciono produtos ao carrinho` / `revisão do pedido` |
| 5 | Determinismo | A mensagem transitória é perdida pela checagem | (observado) |
| 6 | Limites | Pagamento com campo de cartão vazio aceito | `informo nome no cartão, número, CVC e validade` |
| 7 | Tratamento de erro | Carrinho continua cheio depois do pedido | (ausência) |
| 8 | Autorização entre perfis | sem risco identificado nesta US: um único cliente | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | home → cadastro (US-01) → "ACCOUNT CREATED!" → "Logged in as `<nome>`" |
| AC1 | Produtos no carrinho; "Cart" mostra a página do carrinho |
| AC2 | "Proceed To Checkout" mostra endereço e revisão do pedido |
| AC3 | Comentário + "Place Order" + dados do cartão + "Pay and Confirm Order" → "Your order has been placed successfully!" |
| AC4 | Excluir a conta (US-06) |

### CT-10-01 — Pedido com cadastro antes do checkout (TC 15)
```gherkin
@TC15 @epico-compra
Cenário: Pedido com cadastro antes do checkout
  Dado que estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login" e concluo o cadastro (US-01)
  Então vejo "ACCOUNT CREATED!"
  Quando clico em "Continue"
  Então vejo "Logged in as <nome>" no topo
  Quando adiciono os 2 primeiros produtos da home ao carrinho e clico em "Cart"
  Então a página do carrinho mostra esses 2 produtos, com o preço da home e quantidade 1
  Quando clico em "Proceed To Checkout"
  Então os endereços de entrega e cobrança mostram os dados do cadastro
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
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna, Integridade dos dados, Consistência cruzada, Determinismo · Oráculo: AC0–AC4 + Q01–Q06

### CT-10-02 — Carrinho esvaziado depois do pedido — **EXTRA**
```gherkin
Cenário: Carrinho depois do pedido
  Dado que concluí um pedido
  Quando abro "Cart"
  Então o carrinho está vazio
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro, Consistência interna · Oráculo: consistência com o propósito (o pedido consumiu o carrinho); observado ao vivo · **Extra aprovado** → `US10-EXTRA Cart is empty after the order`. Observado: passa.

### CT-10-03 — Pagamento com número do cartão vazio — **EXTRA**
```gherkin
Cenário: Campo de cartão obrigatório
  Dado que estou no pagamento
  Quando preencho tudo exceto o número do cartão e clico em "Pay and Confirm Order"
  Então continuo em "/payment" e o navegador sinaliza o campo como obrigatório
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Limites · Oráculo: atributo `required` observado no campo · **Extra aprovado** → `US10-EXTRA Payment without card number is blocked`. Observado: passa.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0–AC4 | CT-10-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato · Consistência interna · Integridade · Consistência cruzada · Determinismo | CT-10-01 |
| Tratamento de erro | CT-10-02 (extra) |
| Limites | CT-10-03 (extra) |
| Autorização entre perfis | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Interna: a mensagem de sucesso não prova o pedido, porque é exibida antes da resposta (F-05).
- Entre regras: o endereço do checkout deve ser o do cadastro da US-01.

## Seção 5 — Riscos não cobertos
- Cartão recusado pelo servidor: não foi possível provocar (o site aceita qualquer cartão preenchido). Se existisse, a mensagem de sucesso já teria aparecido (F-05).
- "Download Invoice" na página final: fora do TC.

## Seção 6 — Charters
```
Explore o carrinho com quantidades maiores que 1 e remoção de item antes do checkout, com o objetivo de descobrir inconsistências de total entre carrinho, revisão e página final.
Duração sugerida: normal (60 min) — várias combinações.
Pré-condição: conta criada pela API e login.
Sinal de parada: 3 combinações conferidas nas três telas.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-10-02 e CT-10-03 serão automatizados?
