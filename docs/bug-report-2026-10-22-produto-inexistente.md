# BUG-005 — Produto inexistente é exibido como "In Stock" com "Add to cart"

**Data:** 2026-10-22 · **US:** US-07 (extra CT-07-03) · **Severidade:** Low · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
`GET https://www.automationexercise.com/product_details/<id inexistente>`, por exemplo `/product_details/99999`.

## Como reproduzir
1. Acessar `/product_details/99999` diretamente.

## Esperado
Uma resposta de "produto não encontrado" (HTTP 404, ou uma página que diga isso), sem oferecer o item para compra. Oráculo: consistência com o propósito da US-07 ("decidir o que comprar"): não se oferece o que não existe.

## Observado
- HTTP 200, título "Automation Exercise - Product Details".
- Bloco de detalhe: nome, categoria e marca **vazios**, preço vazio, mas "Availability: **In Stock**", "Condition: **New**" e o botão "**Add to cart**" visível.
- Print: [03-product-not-found.png](reverse/produtos-screenshots/03-product-not-found.png).

## Tratamento na suíte
Teste `US07-EXTRA Nonexistent product is not offered for sale (BUG-005)` em `tests/catalogo.spec.ts`, em `test.fail()` (decisão do usuário, 2026-10-22).
