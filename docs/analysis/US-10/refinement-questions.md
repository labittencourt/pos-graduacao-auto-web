# Perguntas de refinamento — US-10 (TC 15)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | Quais e quantos produtos adicionar? | `Quando adiciono produtos ao carrinho` | Carrinho trivial que não exercita soma | Suposição do QA: os 2 primeiros da home, conferidos no carrinho |
| Q02 | O que conferir em "detalhes de endereço"? | `vejo os detalhes de endereço` | Oráculo ausente | Suposição do QA: entrega e cobrança com nome, endereço, cidade/estado/CEP, país e celular do cadastro |
| Q03 | O que conferir em "revisão do pedido"? | `e a revisão do pedido` | Oráculo ausente | Suposição do QA: os produtos adicionados e o total = soma dos itens |
| Q04 | Quais dados de cartão usar? | `informo nome no cartão, número, CVC e validade` | Dado real ou recusado | Suposição do QA: cartão de teste público 4111 1111 1111 1111, CVC 123, validade 12/2030 |
| Q05 | Quando a mensagem de sucesso aparece? | `Então vejo "Your order has been placed successfully!"` | Teste instável por timing | Observar → no `submit`, antes da resposta; some com a navegação (DIV-04) |
| Q06 | O que prova que o pedido foi criado? | `Your order has been placed successfully!` | A mensagem aparece em qualquer envio | Observar → `/payment_done/<total>` com "Order Placed!" e carrinho esvaziado |
| Q07 | Como "Add to cart" se comporta? | `adiciono produtos ao carrinho` | Botão encoberto, modal não fechado | Observar → modal "Added!" com "View Cart" / "Continue Shopping" |
