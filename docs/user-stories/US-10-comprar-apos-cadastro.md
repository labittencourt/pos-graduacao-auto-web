# US-10 — Comprar logo após criar a conta (TC 15)

- **Épico:** D — Compra
- **Caso de origem:** TC 15 — Pedido: cadastro antes do checkout
- **Stories de apoio:** US-01, US-06
- **Tags:** `@TC15` `@epico-compra`

**Como** novo cliente, **quero** concluir um pedido logo depois do cadastro, **para** comprar sem precisar entrar de novo.

## Critérios de aceitação

```gherkin
@TC15 @epico-compra
Cenário: Pedido com cadastro antes do checkout
  Dado que estou na home do site
  Quando acesso "Signup / Login" e concluo o cadastro (US-01)
  Então vejo "ACCOUNT CREATED!"
  Quando clico em "Continue"
  Então vejo "Logged in as <nome>" no topo
  Quando adiciono produtos ao carrinho e clico em "Cart"
  Então a página do carrinho é exibida
  Quando clico em "Proceed To Checkout"
  Então vejo os detalhes de endereço e a revisão do pedido
  Quando escrevo um comentário e clico em "Place Order"
  E informo nome no cartão, número, CVC e validade
  E clico em "Pay and Confirm Order"
  Então vejo "Your order has been placed successfully!"
  E excluo a conta (US-06)
```

## Notas

- O cadastro segue a [US-01](US-01-cadastrar-nova-conta.md) e a exclusão segue a [US-06](US-06-excluir-propria-conta.md).

## Lacunas e perguntas em aberto

- Quais e quantos produtos adicionar. Sugestão: dois itens, validando o carrinho antes do checkout.
- Valores dos dados de cartão (fictícios).

Premissas transversais: ver [README.md](README.md#premissas-transversais).
