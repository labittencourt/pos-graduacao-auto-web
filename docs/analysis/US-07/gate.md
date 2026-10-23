# Gate de qualidade — US-07 Consultar a lista de produtos e o detalhe de um produto (TC 8)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-07-lista-e-detalhe-de-produto.md](../../user-stories/US-07-lista-e-detalhe-de-produto.md)

<details>
<summary>Test Case 8: Verify All Products and product detail page (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible
7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that detail detail is visible: product name, category, price, availability, condition, brand

</details>

## Alerta de impacto (passo 0.5b)
Só o link "Products" do menu é compartilhado (US03-EXTRA Session persists when navigating). Novo épico (B — Catálogo), sem impacto em outros fluxos.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | Consistente com o TC 8. |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro (produto inexistente não é tratado). Falta o passo 3 (home). |
| Testabilidade | 7 | "Lista visível" e "detail visible" não dizem o que conta como visível; "desse produto" exige comparar com o item clicado. |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | untestable | Testabilidade | Medium | `E vejo nome, categoria, preço, disponibilidade, condição e marca` | "Ver" um rótulo vazio não é ver o dado. Oráculo: cada rótulo presente **com valor não vazio**. |
| F-02 | ambiguity | Testabilidade | Medium | `Então estou na página de detalhe desse produto` | "Desse produto": o nome e o preço do detalhe devem ser os do primeiro item da lista. |
| F-03 | untestable | Testabilidade | Low | `E a lista de produtos está visível` | Oráculo: ao menos um item visível, cada um com nome, preço e "View Product". |
| F-04 | missing-criteria | Completude | Low | `Dado que estou na home do site` | Passo 3 do TC (home), como nas US anteriores. |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
