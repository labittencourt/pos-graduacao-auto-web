# US-11 — Comprar após entrar com uma conta existente (TC 16)

- **Épico:** D — Compra
- **Caso de origem:** TC 16 — Pedido: login antes do checkout
- **Stories de apoio:** US-03, US-06
- **Tags:** `@TC16` `@epico-compra`

**Como** cliente cadastrado, **quero** entrar e concluir um pedido, **para** comprar com os dados que já tenho no site.

## Critérios de aceitação

```gherkin
@TC16 @epico-compra
Cenário: Pedido com login antes do checkout
  Dado que tenho uma conta cadastrada
  Quando acesso "Signup / Login", informo e-mail e senha e clico em "Login"
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

- O TC 16 exclui a conta ao final; a conta do login não pode ser fixa e compartilhada. Cada execução cria a sua antes do login.

## Lacunas e perguntas em aberto

- Quais e quantos produtos adicionar. Sugestão: dois itens, validando o carrinho antes do checkout.
- Valores dos dados de cartão (fictícios).

Premissas transversais: ver [README.md](README.md#premissas-transversais).
